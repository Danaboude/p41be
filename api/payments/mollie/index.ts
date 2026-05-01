import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/prisma';
import { createMollieClient } from '@mollie/api-client';
import { Resend } from 'resend';

const mollieClient = process.env['MOLLIE_API_KEY'] ? createMollieClient({ apiKey: process.env['MOLLIE_API_KEY'] }) : null;
const resend = process.env['RESEND_API_KEY'] ? new Resend(process.env['RESEND_API_KEY']) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const method = req.method;

  if (method === 'POST') {
    try {
      // WEBHOOK HANDLING
      if (req.body && req.body.id && req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        const paymentId = req.body.id;
        console.log(`[Webhook] Received payment update for ID: ${paymentId}`);
        const payment = await mollieClient.payments.get(paymentId);
        if (payment.status === 'paid') {
          console.log(`[Webhook] Payment ${paymentId} is PAID. Processing...`);
          const purchaseParams = {
              status: 'PAID',
          };
          const purchase = await prisma.purchase.findFirst({ where: { molliePaymentId: paymentId } });
          
          if (purchase && purchase.status !== 'PAID') {
             await prisma.purchase.update({
               where: { id: purchase.id },
               data: purchaseParams
             });

             // SEND EMAIL
             if (resend) {
                console.log(`[Webhook] Sending confirmation email to ${purchase.email}...`);
                const course = await prisma.course.findUnique({ where: { id: purchase.courseId } });
                try {
                  const emailData = await resend.emails.send({
                     from: `${process.env['FROM_NAME'] || 'Academy'} <${process.env['FROM_EMAIL'] || 'noreply@p41.be'}>`,
                     to: purchase.email,
                     subject: `Your Course Access: ${course?.title}`,
                     html: `
                       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                         <div style="text-align: center; padding: 20px;">
                           <img src="https://p41.be/logo.jpg" alt="Logo" style="max-height: 80px;" />
                         </div>
                         <h2 style="color: #D4A843; text-align: center;">Welcome to the Course!</h2>
                         <p>Dear ${purchase.name},</p>
                         <p>Thank you for enrolling in <strong>${course?.title}</strong>. Your payment has been successfully processed.</p>
                         <div style="text-align: center; margin: 30px 0;">
                           <a href="${process.env['VERCEL_URL'] ? `https://${process.env['VERCEL_URL']}` : 'http://localhost:3000'}/academy/access/${purchase.id}" style="background-color: #D4A843; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                             Access My Course Materials
                           </a>
                         </div>
                         <p>If you have any questions, feel free to contact us.</p>
                         <br/>
                         <p>Best regards,<br/>Ives De Saeger</p>
                       </div>
                     `
                  });
                  console.log(`[Webhook] Email sent successfully:`, emailData);
                } catch (emailErr) {
                  console.error(`[Webhook] Error sending email:`, emailErr);
                }
             } else {
                console.warn(`[Webhook] Resend client not initialized. Check RESEND_API_KEY.`);
             }
          }
        }
        return res.status(200).send('OK');
      }

      // PAYMENT CREATION
      const { courseId, name, email, phone, address, vatCompany, vatAddress } = req.body;
      if (!courseId || !name || !email || !phone) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const course = await prisma.course.findUnique({ where: { id: courseId } });
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      // Parse price safely, filtering all non-numeric characters except dot/comma.
      // We will handle 1,290 as 1290 and 1,290.50 as 1290.50
      let rawPrice = course.price.replace(/[^\d.,]/g, '');
      let parsedValue = '0.00';
      if (rawPrice) {
         if (rawPrice.match(/,\d{2}$/)) {
           // format 1.290,00
           rawPrice = rawPrice.replace(/\./g, '').replace(',', '.');
         } else if (rawPrice.match(/\.\d{2}$/)) {
           // format 1,290.00
           rawPrice = rawPrice.replace(/,/g, '');
         } else {
           // format 1,290 or 1.290 or 1290 (no decimals)
           rawPrice = rawPrice.replace(/[.,]/g, '');
         }
         parsedValue = parseFloat(rawPrice).toFixed(2);
      }

      // Vercel deployment URL or localhost fallback
      const baseUrl = process.env['VERCEL_URL'] ? `https://${process.env['VERCEL_URL']}` : 'http://localhost:3000';

      const isActuallyFree = course.isPaid === false || parsedValue === '0.00';

      // 1. Save Purchase Context FIRST to get our own ID
      const purchase = await prisma.purchase.create({
        data: {
          courseId,
          name,
          email,
          phone,
          address,
          vatCompany,
          vatAddress,
          status: isActuallyFree ? 'PAID' : 'PENDING'
        }
      });

      // Handle Free Course
      if (isActuallyFree) {
         console.log(`[FreeEnrollment] Processing free enrollment for ${email}...`);
         if (resend) {
            try {
               await resend.emails.send({
                  from: `${process.env['FROM_NAME'] || 'Academy'} <${process.env['FROM_EMAIL'] || 'noreply@p41.be'}>`,
                  to: email,
                  subject: `Your Free Course Access: ${course.title}`,
                  html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                      <div style="text-align: center; padding: 20px;">
                        <img src="https://p41.be/logo.jpg" alt="Logo" style="max-height: 80px;" />
                      </div>
                      <h2 style="color: #D4A843; text-align: center;">Welcome to the Course!</h2>
                      <p>Dear ${name},</p>
                      <p>You have successfully enrolled in <strong>${course.title}</strong> for free.</p>
                      <div style="text-align: center; margin: 30px 0;">
                        <a href="${baseUrl}/academy/access/${purchase.id}" style="background-color: #D4A843; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                          Access My Course Materials
                        </a>
                      </div>
                      <p>If you have any questions, feel free to contact us.</p>
                      <br/>
                      <p>Best regards,<br/>Ives De Saeger</p>
                    </div>
                  `
               });
               console.log(`[FreeEnrollment] Email sent successfully.`);
            } catch (emailErr) {
               console.error(`[FreeEnrollment] Email failed:`, emailErr);
            }
         }
         return res.status(200).json({ status: 'free_success' });
      }

      if (!mollieClient) {
          return res.status(500).json({ error: 'Mollie is not configured' });
      }

      const paymentPayload: any = {
        amount: {
          currency: 'EUR',
          value: parsedValue,
        },
        description: `Enrollment: ${course.title}`,
        redirectUrl: `${baseUrl}/academy/${course.id}?payment=success&id=${purchase.id}`,
        metadata: {
          courseId,
          email,
          purchaseId: purchase.id
        },
      };

      if (!baseUrl.includes('localhost')) {
         paymentPayload.webhookUrl = `${baseUrl}/api/payments/mollie`;
      }

      const payment = await mollieClient.payments.create(paymentPayload);

      // 3. Update Purchase with Mollie ID
      await prisma.purchase.update({
        where: { id: purchase.id },
        data: { molliePaymentId: payment.id }
      });

      return res.status(200).json({ checkoutUrl: payment._links.checkout?.href });
    } catch (e: any) {
      console.error(e);
      return res.status(500).json({ error: e.message || 'Server error' });
    }
  }

  if (method === 'GET') {
    try {
      const { id } = req.query;
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Missing payment ID' });
      }

      if (!mollieClient) return res.status(500).json({ error: 'Mollie is not configured' });

      console.log(`[StatusCheck] Checking internal record for ID: ${id}`);
      const purchase = await prisma.purchase.findUnique({ where: { id } });
      
      if (!purchase || !purchase.molliePaymentId) {
        return res.status(404).json({ error: 'Purchase not found or missing payment mapping' });
      }

      console.log(`[StatusCheck] Fetching status from Mollie for: ${purchase.molliePaymentId}`);
      const payment = await mollieClient.payments.get(purchase.molliePaymentId);
      
      if (payment.status === 'paid') {
        if (purchase && purchase.status !== 'PAID') {
           await prisma.purchase.update({
             where: { id: purchase.id },
             data: { status: 'PAID' }
           });

           // SEND EMAIL (Fallback trigger)
           if (resend) {
              console.log(`[StatusCheck] Sending fallback confirmation email to ${purchase.email}...`);
              const course = await prisma.course.findUnique({ where: { id: purchase.courseId } });
              try {
                const emailData = await resend.emails.send({
                   from: `${process.env['FROM_NAME'] || 'Academy'} <${process.env['FROM_EMAIL'] || 'noreply@p41.be'}>`,
                   to: purchase.email,
                   subject: `Your Course Access: ${course?.title}`,
                   html: `
                     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                       <h2 style="color: #D4A843;">Welcome to the Course!</h2>
                       <p>Dear ${purchase.name},</p>
                       <p>Thank you for enrolling in <strong>${course?.title}</strong>. Your payment has been successfully processed.</p>
                       <div style="margin: 30px 0;">
                         <a href="${process.env['VERCEL_URL'] ? `https://${process.env['VERCEL_URL']}` : 'http://localhost:3000'}/academy/access/${purchase.id}" style="background-color: #D4A843; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                           Access My Course Materials
                         </a>
                       </div>
                      </div>
                   `
                });
                console.log(`[StatusCheck] Email sent successfully:`, emailData);
              } catch (emailErr) {
                console.error(`[StatusCheck] Error sending email:`, emailErr);
              }
           }
        }
        return res.status(200).json({ status: 'paid' });
      } else {
        return res.status(200).json({ status: payment.status });
      }
    } catch (e: any) {
      console.error(`[StatusCheck] Error:`, e);
      return res.status(500).json({ error: e.message || 'Server error' });
    }
  }

  res.setHeader('Allow', ['POST', 'GET']);
  return res.status(405).end(`Method ${method} Not Allowed`);
}

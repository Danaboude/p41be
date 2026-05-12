import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'en' | 'nl';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly STORAGE_KEY = 'p41_lang';
  private currentLang = signal<Lang>(this.getInitialLang());

  lang = this.currentLang.asReadonly();

  private getInitialLang(): Lang {
    if (typeof window === 'undefined') return 'en';

    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved === 'en' || saved === 'nl') return saved;

    // Default to browser language if available
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'nl' ? 'nl' : 'en';
  }

  private translations: Record<Lang, any> = {
    en: {
      nav: {
        home: 'Home',
        consultancy: 'Consultancy',
        academy: 'Academy',
        blog: 'Blog',
        about: 'About',
        contact: 'Contact',
        demo: 'Request a Demo'
      },
      blog_section: {
        tag: 'Insights',
        title: 'Industrial',
        title_accent: 'Intelligence',
        desc: 'Deep dives into Industry 4.0, workflow optimization, and the future of manufacturing.',
        cta: 'View All Articles'
      },
      blog_detail: {
        back: 'Back to Home',
        author_desc: 'Industrial engineer with 25+ years of experience. Author, speaker, and founder of P41 — helping companies implement Industry 4.0 technologies.',
        tags_label: 'Tags:',
        more_title: 'More',
        more_accent: 'Articles',
        loading: 'Retrieving Industrial Intelligence...',
        not_found_title: 'Post Not Found',
        not_found_desc: 'The article you\'re looking for doesn\'t exist.'
      },
      blog_page: {
        tag: 'Insights & Wisdom',
        title: 'Our',
        title_accent: 'Blog',
        desc: 'Get weekly inspiration for free! Explore our latest thoughts on industrial excellence.',
        loading: 'Reading Industrial Insights...',
        article_tag: 'Article',
        read_more: 'Read More',
        newsletter_title: 'Want more industrial wisdom?',
        newsletter_desc: 'Subscribe to our newsletter to receive the latest insights directly in your inbox.',
        email_placeholder: 'Your work email',
        subscribe: 'Subscribe Now'
      },
      hero: {
        tag: 'Industry 4.0 Leader',
        title: 'Industrial Intelligence.',
        subtitle: 'Redefined.',
        description: 'Optimizing time, eliminating error, and perfecting flow. We bridge the gap between heavy industrial heritage and futuristic digital management.',
        cta_start: 'Get Started',
        cta_methods: 'Our Methods'
      },
      home: {
        vision: {
          heading1: 'Transforming industrial complexity',
          heading2: 'into',
          heading3: 'operational clarity.',
          desc: 'We architect the systems that bridge the gap between human intuition and digital speed, ensuring your facility is ready for the future.',
          cta: 'DISCOVER THE MISSION'
        },
        hero: {
          years: 'Years of',
          excellence: 'Excellence',
          founder_role: 'Founder & Lead Expert'
        },
        teasers: {
          consultancy: {
            title1: 'Consultancy &',
            title2: 'Engineering',
            desc: 'Complete efficiency audits and Industry 4.0 implementation strategies for high-performance facilities.',
            cta: 'Explore Services'
          },
          about: {
            title1: 'The Visionary',
            title2: 'Behind P41',
            desc: "Learn about Ives De Saeger's journey and how we integrated 25 years of expertise into the P41 framework.",
            cta: 'Meet the Founder'
          }
        },
        capabilities: {
          tag: 'Expertise',
          title: 'Our Core',
          subtitle: 'Capabilities',
          desc: 'Tailored solutions designed to optimize flow and ensure long-term industrial excellence.',
          read_more: 'Read More',
          learn_more: 'Learn More',
          explore_training: 'Explore Training'
        },
        cta: {
          title: 'Ready to Evolve?',
          desc: 'Contact our consultants for a complimentary efficiency audit of your current operations.',
          form: {
            name: 'Full Name',
            email: 'Business Email',
            subject: 'Project Inquiry',
            placeholder: 'Tell us about your industrial challenges...',
            submit: 'Send Inquiry'
          }
        },
        blog: {
          tag: 'Insights & Wisdom',
          title1: 'Our',
          title2: 'Blog',
          desc: 'Get weekly inspiration for free! Explore our latest thoughts on industrial excellence.',
          view_all: 'View All Posts',
          article_tag: 'Article',
          read_more: 'Read More',
          posts: [
            {
              title: 'Getting back to basics',
              excerpt: 'We are looking at the year 1910. More than 113 years ago! A brilliant analyst called Frank B Gilbreth started using film cameras to look for waste in motions...',
            },
            {
              title: 'Where should companies focus on to stay competitive?',
              excerpt: 'A straight forward answer would be to offer the lowest price which convinces customers to buy the product. However I think there is more to focus on...',
            },
            {
              title: 'Why Doing a Lot of Improvements Might Work Against You!',
              excerpt: 'Clarifying some misunderstandings about doing too many improvements in your company. Doing a lot of improvements does NOT mean that you save money...',
            }
          ]
        },
        books: {
          tag: 'Publications',
          title1: 'Read my books & start',
          title2: 'innovating',
          desc: 'Two landmark books on cross-sector innovation and leadership translated into actionable frameworks your company can implement immediately.',
          order_cta: 'Order Your Copy',
          author_role: 'Author · CEO at Aeriez, AI product recognition and improving flow between departments · Speaker'
        }
      },
      services: {
        title: 'Core Services',
        description: 'Tailored solutions for the modern industrial landscape, from strategic board-level shifts to hands-on floor optimization.',
        consultancy: {
          title: 'Consultancy',
          desc: 'Strategic navigation through the digital transformation of your production assets and supply chain logistics.',
          link: 'Explore Service'
        },
        workshops: {
          title: 'Workshops',
          desc: 'Immersive, collaborative sessions designed to solve immediate bottlenecks using our proprietary sprint methodology.',
          link: 'Book a Session'
        },
        training: {
          title: 'Online Training',
          desc: 'Scale your organization\'s IQ with on-demand modules covering Lean 4.0, IoT integration, and predictive maintenance.',
          link: 'Start Learning'
        }
      },
      why_p41: {
        title: 'The Architectural Engine:',
        subtitle: 'Why P41?',
        exp: {
          title: 'Deep Experience',
          desc: 'Decades of combined expertise on factory floors across three continents. We know what fails before it happens.'
        },
        methods: {
          title: 'Novel Methods',
          desc: 'Moving beyond the standard Agile. We apply high-performance physics-based modeling to industrial human workflows.'
        },
        knowledge: {
          title: 'Gathering Knowledge',
          desc: 'We don\'t just optimize; we build a living knowledge base for your company to evolve independently.'
        },
        stats: {
          years: 'Years Experience',
          waste: 'Avg. Waste Reduction',
          facilities: 'Active Facilities',
          data: 'Data Points Analyzed'
        }
      },
      footer: {
        desc: 'Industrial Intelligence for the next generation of global manufacturing. Redefining flow, error, and time.',
        nav: 'Navigation',
        company: 'Company',
        newsletter: 'Newsletter',
        newsletter_desc: 'Receive our monthly \'State of Industry\' report directly in your inbox.',
        rights: '© 2024 P41 Industrial Intelligence. All rights reserved.'
      },
      vision: {
        title: 'Founder\'s Vision',
        name: 'Ives De Saeger',
        role: 'Founder & Lead Consultant',
        quote: 'Industrial Intelligence is not just about machines; it\'s about the symphony of human expertise and digital precision.',
        desc: 'With decades of experience in the field, Ives has been at the forefront of the Industry 4.0 revolution, helping companies transition from legacy systems to future-ready ecosystems.'
      },
      contact: {
        title: 'Let\'s Connect',
        subtitle: 'Reach out to our experts for a detailed efficiency audit or any industrial inquiries.',
        form: {
          name: 'Full Name',
          email: 'Business Email',
          subject: 'Subject',
          message: 'Your Message',
          submit: 'Send Message',
          success: 'Your message has been sent successfully!'
        },
        info: {
          address: 'Address',
          email: 'Email Us',
          phone: 'Call Us',
          social: 'Social Media'
        }
      },
      about: {
        tag: 'About P41',
        title1: 'Architecting',
        title2: 'Industrial Excellence',
        vision_desc2: 'At P41, we believe that the future of industry lies in the perfect synchronization of human intuition and digital speed. Our mission is to provide the architectural framework that makes this possible for every facility we touch.',
        cta_tag: 'Take the Next Step',
        cta_title: "Let's Build the Future",
        cta_desc: 'Join the ranks of high-performance industrial leaders. Our consultants are ready to audit your operations and architect your evolution.',
        cta_button: 'Contact Our Experts'
      },
      about_p41: {
        tag: 'About P41',
        title1: 'Start implementing the technologies',
        title2: 'that are out there',
        title3: 'in your company',
        p1: 'If your company is not taking advantage of the available technologies, then it\'s time to change that now. It\'s a well-known fact that a lot of (industrial) businesses are lagging behind in the application of the newest technologies, which results in a <strong class="text-on-surface font-bold">competitive disadvantage.</strong>',
        p2: 'Both incremental and fundamental improvements can be made through the application of new technologies. The collective name of these technologies? <strong class="text-primary font-bold text-lg">Industry 4.0.</strong>',
        p3: 'It is my expertise to consult companies in the implementation of the technologies that Industry 4.0 has to offer. Using time study, error quality analysis and throughput to visualise flow, direct results can be obtained.',
        p4: 'Many companies require to set the basics right first for cycle time, flow and quality. Once we know where the money is going, smart investments can be made. So, if you\'re the CXO of a company facing problems with the implementation of new technologies <strong class="text-on-surface font-bold">let\'s chat.</strong>',
        cta_chat: 'Let\'s Chat',
        cta_scan: 'i4.0 Scan',
        video_title: 'Watch: Industry 4.0 Explained',
        video_cta: 'Click to play',
        roi_badge: '10x ROI Guaranteed',
        tech_tag: 'Technologies we implement',
        academy_tag: 'Still curious?',
        academy_title: 'Check out the Academy sessions for free.',
        academy_button: 'Free Academy Sessions',
        stats: {
          years: 'Years Experience',
          facilities: 'Facilities',
          continents: 'Continents',
          roi: 'Typical ROI'
        },
        technologies: {
          lean: 'Lean 4.0',
          flow: 'Flow Architecture',
          smart: 'Smart Manufacturing',
          iot: 'Industrial IoT',
          quality: 'Quality Safeguarding',
          logistics: 'Smart Logistics',
          training: 'Workforce Upskilling',
          ai: 'Industrial AI'
        }
      },
      consultancy_page: {
        tag: 'Consultancy & Engineering',
        title1: 'Industrial',
        title2: 'Architecture',
        title3: 'For the Future.',
        desc: "We don't just solve problems; we architect scalable systems that turn industrial complexity into operational clarity.",
        cta1: 'Book an Efficiency Audit',
        joined: 'Joined by 150+ facilities',
        gap_title1: 'Bridging the gap between',
        gap_title2: 'Human Intuition & Digital Speed.',
        gap_desc: 'The industrial landscape is changing faster than ever. Companies that lag behind in implementing Industry 4.0 technologies face a significant competitive disadvantage.',
        cycle_title: 'Cycle Time Analysis',
        cycle_desc: 'Visualizing flow to identify bottlenecks and hidden costs.',
        error_title: 'Error Quality Analysis',
        error_desc: 'Implementing systematic safeguards to ensure 100% precision.',
        final_cta_title: 'Ready to architect your future?',
        final_cta_desc: 'Schedule a discovery call with Ives De Saeger and find out how we can optimize your production flow.',
        final_cta_button: 'Start Your Efficiency Audit'
      },
      why_choose: {
        tag: 'Our Advantage',
        title: 'Why Choose',
        desc: 'We combine decades of hands-on expertise with cutting-edge methods to deliver measurable results.',
        free_course: {
          tag: 'Free Course',
          title: 'Request a',
          subtitle: 'Free Course',
          desc: 'Take the first step towards industrial excellence. Our experts will reach out to discuss the perfect training program for your team.',
          benefits: [
            'No obligation, 100% free consultation',
            'Tailored to your industry & team size',
            'Industry 4.0 certified trainers',
            'Follow-up support included'
          ],
          success_title: "You're on the list!",
          success_desc: "We'll be in touch shortly to schedule your free course."
        },
        form: {
          first_name: 'First Name',
          last_name: 'Last Name',
          email: 'Email Address',
          phone: 'Phone Number',
          address: 'My Address',
          subject: 'Subject',
          submit: 'Request Free Course',
          sending: 'Sending...'
        },
        features: [
          {
            title: 'Deep Floor Experience',
            desc: 'We don\'t just theorize. We\'ve spent thousands of hours on factory floors across three continents, understanding the grit of daily production.'
          },
          {
            title: 'Proprietary Sprint Method',
            desc: 'Our Lean 4.0 methodology isn\'t from a textbook. It\'s a battle-tested framework for solving bottlenecks in days, not months.'
          },
          {
            title: 'Knowledge First Approach',
            desc: 'We don\'t create dependency. We build a living knowledge base within your company so you can evolve independently long after we leave.'
          }
        ]
      },
      privacy_page: {
        back: 'Back to Home',
        title1: 'Privacy',
        title2: 'Statement',
        intro: 'P41 cares a great deal about your privacy and respects your rights under applicable data protection laws.',
        contents: 'Contents',
        nav: {
          who: 'Who is P41?',
          data: 'What we collect',
          usage: 'How we use it',
          rights: 'Your rights'
        },
        sections: {
          intro: 'We have developed this privacy policy to inform you how we collect, store, use and process your Personal Data. Please carefully read this privacy policy before providing Personal Data to Us. Our website (www.P41.be) makes use of cookies and similar technologies; to learn more on this, please also read our Cookie Policy.',
          who: {
            title: 'Who is P41?',
            p1: 'P41 (“We” or “Us”) is a Belgian company with registered seated at Frans Blocklaan 14, 2620 Hemiksem, BELGIUM, registered in the Belgian Crossroad Bank for Enterprises under n° 0 894 236 070 (RPR Antwerpen).',
            p2: 'You know Us as a provider of projects, seminars, educational sessions, and information on future ways of working and doing business. If you provide Personal Data to us, we will in general be considered as Data Controller.'
          },
          data: {
            title: 'Which of your personal data do we collect?',
            intro: 'We collect various types of information including but not limited to:',
            list: [
              'Personal identification data (first name, last name, phone number, address, e-mail address)',
              'Personal details (gender, education)',
              'Professional experience (e.g., from CV uploads)',
              'Data collected through media usage (mobile, desktop, social media, chatbot)',
              'Interests in our product offering through content downloads',
              'Electronical identification data (IP address, cookies, connections)'
            ]
          },
          how_collect: {
            title: 'How do we collect your personal data?',
            list: [
              'Subscribing to marketing content',
              'Visiting the website',
              'Completing website forms',
              'Incoming and outgoing correspondence via online channels',
              'Requesting a quote',
              'Exchange of business cards'
            ]
          },
          how_use: {
            title: 'How do we use and process your personal data?',
            intro: 'We process personal data to comply with legal requirements and for our legitimate interests, including:',
            list: [
              'Sending targeted marketing, advertising, updates and promotional offers',
              'Conducting customer satisfaction studies and market research',
              'Drawing up quotes and performing contracts (administration, invoicing, payments)',
              'Evaluating applicants during the hiring process'
            ],
            notice_title: 'Important Notice',
            notice_desc: 'P41 will never sell your personal data. We do not hire or sell your data to third parties for their own use, unless you explicitly opt for this yourself and give your consent.'
          },
          storage: {
            title: 'How long do we store your personal data?',
            intro: 'We store your personal data only for the period necessary to achieve the specific purpose, unless a longer period is required by law:',
            list: [
              'Contractual relationships: Up to 10 years after the end of the contract.',
              'Prospects: Held for 5 years from last contact.',
              'Applicants: Stored for 2 years following the closure of the hiring process.'
            ]
          },
          rights: {
            title: 'What are your rights?',
            intro: 'According to applicable data protection laws, you have the following rights:',
            list: [
              'Right to access: Request a copy of the personal data we hold about you.',
              'Right to rectification: Correct any inaccurate or incomplete data.',
              'Right to erasure: Request that we delete your personal data ("Right to be forgotten").',
              'Right to object: Object to processing for direct marketing or based on our legitimate interests.',
              'Right to portability: Request the transfer of your data to another controller.'
            ]
          },
          complaints: {
            title: 'Questions or Complaints?',
            intro: 'If you have any questions regarding this statement or you wish to exercise your rights, please contact us at:',
            last_updated: 'Last updated: April 2026. We may change our policy regularly to comply with legal changes or technological updates.'
          }
        }
      },
      seo: {
        home: {
          title: 'P41 Industrial Intelligence | Industry 4.0 Leader',
          description: 'P41 Industrial Intelligence redefines industrial flow, error reduction, and time optimization through strategic consultancy and digital transformation.'
        },
        about: {
          title: 'About P41 | Our Vision & Methods',
          description: 'Learn about P41\'s mission to bridge the gap between industrial heritage and digital management. Meet our founder Ives De Saeger.'
        },
        consultancy: {
          title: 'Industrial Consultancy | P41 Services',
          description: 'Strategic navigation through digital transformation for production assets and supply chain logistics.'
        },
        academy: {
          title: 'P41 Academy | Online Industrial Training',
          description: 'Scale your organization\'s IQ with on-demand modules covering Lean 4.0, IoT integration, and predictive maintenance.'
        },
        blog: {
          title: 'Industry Insights Blog | P41 Industrial Intelligence',
          description: 'Latest insights, trends, and case studies on Industry 4.0, digital transformation, and industrial efficiency.'
        },
        contact: {
          title: 'Contact P41 | Get Your Efficiency Audit',
          description: 'Connect with our experts for a detailed efficiency audit or any industrial inquiries. Let\'s optimize your flow.'
        },
        privacy: {
          title: 'Privacy Policy | P41 Industrial Intelligence',
          description: 'Our commitment to protecting your privacy and managing your data securely.'
        }
      }
    },
    nl: {
      nav: {
        home: 'Home',
        consultancy: 'Consultancy',
        academy: 'Academie',
        blog: 'Blog',
        about: 'Over ons',
        contact: 'Contact',
        demo: 'Vraag een Demo aan'
      },
      blog_section: {
        tag: 'Inzichten',
        title: 'Industriële',
        title_accent: 'Intelligentie',
        desc: 'Diepgaande artikelen over Industrie 4.0, workflow-optimalisatie en de toekomst van de productie.',
        cta: 'Bekijk Alle Artikelen'
      },
      blog_detail: {
        back: 'Terug naar Home',
        author_desc: 'Industrieel ingenieur met 25+ jaar ervaring. Auteur, spreker en oprichter van P41 — helpt bedrijven bij het implementeren van Industrie 4.0-technologieën.',
        tags_label: 'Tags:',
        more_title: 'Meer',
        more_accent: 'Artikelen',
        loading: 'Industriële Intelligentie Ophalen...',
        not_found_title: 'Bericht Niet Gevonden',
        not_found_desc: 'Het artikel dat u zoekt bestaat niet.'
      },
      blog_page: {
        tag: 'Inzichten & Wijsheid',
        title: 'Onze',
        title_accent: 'Blog',
        desc: 'Krijg wekelijks gratis inspiratie! Ontdek onze nieuwste gedachten over industriële uitmuntendheid.',
        loading: 'Industriële Inzichten Lezen...',
        article_tag: 'Artikel',
        read_more: 'Lees Meer',
        newsletter_title: 'Wilt u meer industriële wijsheid?',
        newsletter_desc: 'Meld u aan voor onze nieuwsbrief om de nieuwste inzichten rechtstreeks in uw inbox te ontvangen.',
        email_placeholder: 'Uw zakelijke e-mail',
        subscribe: 'Nu Inschrijven'
      },
      hero: {
        tag: 'Leider in Industrie 4.0',
        title: 'Industriële Intelligentie.',
        subtitle: 'Hergedefinieerd.',
        description: 'Optimaliseren van tijd, elimineren van fouten en perfectioneren van flow. Wij overbruggen de kloof tussen zwaar industrieel erfgoed en futuristisch digitaal management.',
        cta_start: 'Begin nu',
        cta_methods: 'Onze Methoden'
      },
      home: {
        vision: {
          heading1: 'Transformeren van industriële complexiteit',
          heading2: 'naar',
          heading3: 'operationele helderheid.',
          desc: 'Wij ontwerpen de systemen die de kloof overbruggen tussen menselijke intuïtie en digitale snelheid, zodat uw faciliteit klaar is voor de toekomst.',
          cta: 'ONTDEK DE MISSIE'
        },
        hero: {
          years: 'Jaar',
          excellence: 'Uitmuntendheid',
          founder_role: 'Oprichter & Hoofdexpert'
        },
        teasers: {
          consultancy: {
            title1: 'Consultancy &',
            title2: 'Engineering',
            desc: 'Volledige efficiëntie-audits en Industrie 4.0-implementatiestrategieën voor hoogwaardige faciliteiten.',
            cta: 'Ontdek Diensten'
          },
          about: {
            title1: 'De Visionair',
            title2: 'Achter P41',
            desc: "Lees meer over de reis van Ives De Saeger en hoe we 25 jaar expertise hebben geïntegreerd in het P41-raamwerk.",
            cta: 'Ontmoet de Oprichter'
          }
        },
        capabilities: {
          tag: 'Expertise',
          title: 'Onze Kern',
          subtitle: 'Capaciteiten',
          desc: 'Oplossingen op maat die zijn ontworpen om de flow te optimaliseren en industriële uitmuntendheid op lange termijn te garanderen.',
          read_more: 'Lees Meer',
          learn_more: 'Leer Meer',
          explore_training: 'Ontdek Training'
        },
        cta: {
          title: 'Klaar om te Evolueren?',
          desc: 'Neem contact op met onze consultants voor een gratis efficiëntie-audit van uw huidige activiteiten.',
          form: {
            name: 'Volledige Naam',
            email: 'Zakelijk E-mailadres',
            subject: 'Projectaanvraag',
            placeholder: 'Vertel ons over uw industriële uitdagingen...',
            submit: 'Aanvraag Verzenden'
          }
        },
        blog: {
          tag: 'Inzichten & Wijsheid',
          title1: 'Onze',
          title2: 'Blog',
          desc: 'Krijg wekelijks gratis inspiratie! Ontdek onze nieuwste gedachten over industriële uitmuntendheid.',
          view_all: 'Bekijk Alle Berichten',
          article_tag: 'Artikel',
          read_more: 'Lees Meer',
          posts: [
            {
              title: 'Terug naar de basis',
              excerpt: 'We kijken naar het jaar 1910. Meer dan 113 jaar geleden! Een briljante analist genaamd Frank B Gilbreth begon filmcamera\'s te gebruiken om te zoeken naar verspilling in bewegingen...',
            },
            {
              title: 'Waar moeten bedrijven zich op richten om concurrerend te blijven?',
              excerpt: 'Een eenvoudig antwoord zou zijn om de laagste prijs aan te bieden die klanten overtuigt om het product te kopen. Ik denk echter dat er meer is om op te focussen...',
            },
            {
              title: 'Waarom veel verbeteringen doen tegen u kan werken!',
              excerpt: 'Enkele misverstanden ophelderen over het doen van te veel verbeteringen in uw bedrijf. Veel verbeteringen doen betekent NIET dat u geld bespaart...',
            }
          ]
        },
        books: {
          tag: 'Publicaties',
          title1: 'Lees mijn boeken & begin met',
          title2: 'innoveren',
          desc: 'Twee grensverleggende boeken over sectoroverschrijdende innovatie en leiderschap vertaald naar bruikbare raamwerken die uw bedrijf onmiddellijk kan implementeren.',
          order_cta: 'Bestel Uw Exemplaar',
          author_role: 'Auteur · CEO bij Aeriez, AI-productherkenning en verbetering van flow tussen afdelingen · Spreker'
        }
      },
      services: {
        title: 'Kerncijfers',
        description: 'Oplossingen op maat voor het moderne industriële landschap, van strategische verschuivingen op bestuursniveau tot praktische optimalisatie op de werkvloer.',
        consultancy: {
          title: 'Advies',
          desc: 'Strategische navigatie door de digitale transformatie van uw productiemiddelen en supply chain logistiek.',
          link: 'Ontdek Service'
        },
        workshops: {
          title: 'Workshops',
          desc: 'Meeslepende, gezamenlijke sessies ontworpen om onmiddellijke knelpunten op te lossen met onze eigen sprint-methodologie.',
          link: 'Boek een Sessie'
        },
        training: {
          title: 'Online Training',
          desc: 'Vergroot het IQ van uw organisatie met on-demand modules over Lean 4.0, IoT-integratie en voorspellend onderhoud.',
          link: 'Begin met Leren'
        }
      },
      why_p41: {
        title: 'De Architecturale Motor:',
        subtitle: 'Waarom P41?',
        exp: {
          title: 'Diepe Ervaring',
          desc: 'Decennia aan gecombineerde expertise op fabrieksvloeren over drie continenten. We weten wat er misgaat voordat het gebeurt.'
        },
        methods: {
          title: 'Nieuwe Methoden',
          desc: 'Verder gaan dan de standaard Agile. We passen hoogwaardige op fysica gebaseerde modellering toe op industriële menselijke workflows.'
        },
        knowledge: {
          title: 'Kennis Verzamelen',
          desc: 'We optimaliseren niet alleen; we bouwen een levende kennisbank zodat uw bedrijf onafhankelijk kan evolueren.'
        },
        stats: {
          years: 'Jaar Ervaring',
          waste: 'Gem. Verspilling Vermindering',
          facilities: 'Actieve Faciliteiten',
          data: 'Datapunten Geanalyseerd'
        }
      },
      footer: {
        desc: 'Industriële Intelligentie voor de volgende generatie wereldwijde productie. Herdefiniëren van flow, fouten en tijd.',
        nav: 'Navigatie',
        company: 'Bedrijf',
        newsletter: 'Nieuwsbrief',
        newsletter_desc: 'Ontvang maandelijks ons \'State of Industry\' rapport direct in v uw inbox.',
        rights: '© 2024 P41 Industriële Intelligentie. Alle rechten voorbehouden.'
      },
      vision: {
        title: 'Visie van de Oprichter',
        name: 'Ives De Saeger',
        role: 'Oprichter & Lead Consultant',
        quote: 'Industriële Intelligentie gaat niet alleen over machines; het gaat over de symfonie van menselijke expertise en digitale precisie.',
        desc: 'Met decennia aan ervaring in het veld staat Ives in de voorhoede van de Industrie 4.0-revolutie en helpt hij bedrijven de overstap te maken van legacy-systemen naar toekomstbestendige ecosystemen.'
      },
      contact: {
        title: 'Laten we contact opnemen',
        subtitle: 'Neem contact op met onze experts voor een gedetailleerde efficiëntie-audit of industriële vragen.',
        form: {
          name: 'Volledige Naam',
          email: 'Zakelijk E-mailadres',
          subject: 'Onderwerp',
          message: 'Uw Bericht',
          submit: 'Bericht Verzenden',
          success: 'Uw bericht is succesvol verzonden!'
        },
        info: {
          address: 'Adres',
          email: 'E-mail ons',
          phone: 'Bel ons',
          social: 'Sociale Media'
        }
      },
      about: {
        tag: 'Over P41',
        title1: 'Architecteren van',
        title2: 'Industriële Uitmuntendheid',
        vision_desc2: 'Bij P41 geloven we dat de toekomst van de industrie ligt in de perfecte synchronisatie van menselijke intuïtie en digitale snelheid. Onze missie is om het architecturale raamwerk te bieden dat dit mogelijk maakt voor elke faciliteit die we aanraken.',
        cta_tag: 'Zet de Volgende Stap',
        cta_title: 'Laten we de Toekomst Bouwen',
        cta_desc: 'Sluit u aan bij de rangen van hoogwaardige industriële leiders. Onze consultants staan klaar om uw activiteiten te auditeren en uw evolutie te architecteren.',
        cta_button: 'Neem Contact op met Onze Experts'
      },
      about_p41: {
        tag: 'Over P41',
        title1: 'Start met het implementeren van de technologieën',
        title2: 'die er beschikbaar zijn',
        title3: 'in uw bedrijf',
        p1: 'Als uw bedrijf geen gebruik maakt van de beschikbare technologieën, dan is het tijd om dat nu te veranderen. Het is een bekend feit dat veel (industriële) bedrijven achterlopen in de toepassing van de nieuwste technologieën, wat resulteert in een <strong class="text-on-surface font-bold">concurrentienadeel.</strong>',
        p2: 'Zowel incrementele als fundamentele verbeteringen kunnen worden aangebracht door de toepassing van nieuwe technologieën. De collectieve naam van deze technologieën? <strong class="text-primary font-bold text-lg">Industrie 4.0.</strong>',
        p3: 'Het is mijn expertise om bedrijven te adviseren bij de implementatie van de technologieën die Industrie 4.0 te bieden heeft. Door gebruik te maken van cyclustijdanalyse, foutkwaliteitsanalyse en throughput om flow te visualiseren, kunnen directe resultaten worden behaald.',
        p4: 'Veel bedrijven moeten eerst de basis op orde brengen voor cyclustijd, flow en kwaliteit. Zodra we weten waar het geld naartoe gaat, kunnen er slimme investeringen worden gedaan. Dus, als u de CXO bent van een bedrijf dat problemen ondervindt bij de implementatie van nieuwe technologieën <strong class="text-on-surface font-bold">laten we praten.</strong>',
        cta_chat: 'Laten we Praten',
        cta_scan: 'i4.0 Scan',
        video_title: 'Kijk: Industrie 4.0 Uitgelegd',
        video_cta: 'Klik om te spelen',
        roi_badge: '10x ROI Gegarandeerd',
        tech_tag: 'Technologieën die we implementeren',
        academy_tag: 'Nog steeds nieuwsgierig?',
        academy_title: 'Bekijk de Academy-sessies gratis.',
        academy_button: 'Gratis Academy-sessies',
        stats: {
          years: 'Jaar Ervaring',
          facilities: 'Faciliteiten',
          continents: 'Continenten',
          roi: 'Typische ROI'
        },
        technologies: {
          lean: 'Lean 4.0',
          flow: 'Flow Architectuur',
          smart: 'Smart Manufacturing',
          iot: 'Industriële IoT',
          quality: 'Kwaliteitswaarborging',
          logistics: 'Slimme Logistiek',
          training: 'Opscholing Personeel',
          ai: 'Industriële AI'
        }
      },
      consultancy_page: {
        tag: 'Consultancy & Engineering',
        title1: 'Industriële',
        title2: 'Architectuur',
        title3: 'Voor de Toekomst.',
        desc: 'Wij lossen niet alleen problemen op; wij ontwerpen schaalbare systemen die industriële complexiteit omzetten in operationele helderheid.',
        cta1: 'Boek een Efficiëntie-audit',
        joined: 'Aangesloten bij 150+ faciliteiten',
        gap_title1: 'De kloof overbruggen tussen',
        gap_title2: 'Menselijke Intuïtie & Digitale Snelheid.',
        gap_desc: 'Het industriële landschap verandert sneller dan ooit. Bedrijven die achterblijven bij de implementatie van Industrie 4.0-technologieën hebben een aanzienlijk concurrentienadeel.',
        cycle_title: 'Cyclustijdanalyse',
        cycle_desc: 'Flow visualiseren om knelpunten en verborgen kosten te identificeren.',
        error_title: 'Foutkwaliteitsanalyse',
        error_desc: 'Systematische waarborgen implementeren om 100% precisie te garanderen.',
        final_cta_title: 'Klaar om uw toekomst te architecteren?',
        final_cta_desc: 'Plan een kennismakingsgesprek met Ives De Saeger en ontdek hoe we uw productieflow kunnen optimaliseren.',
        final_cta_button: 'Start Uw Efficiëntie-audit'
      },
      why_choose: {
        tag: 'Ons Voordeel',
        title: 'Waarom Kiezen voor',
        desc: 'Wij combineren decennia aan praktijkervaring met baanbrekende methoden om meetbare resultaten te leveren.',
        free_course: {
          tag: 'Gratis Cursus',
          title: 'Vraag een',
          subtitle: 'Gratis Cursus aan',
          desc: 'Zet de eerste stap naar industriële uitmuntendheid. Onze experts nemen contact met u op om het perfecte trainingsprogramma voor uw team te bespreken.',
          benefits: [
            'Vrijblijvend, 100% gratis adviesgesprek',
            'Afgestemd op uw branche & teamgrootte',
            'Industrie 4.0 gecertificeerde trainers',
            'Inclusief vervolgondersteuning'
          ],
          success_title: 'U staat op de lijst!',
          success_desc: 'We nemen binnenkort contact met u op om uw gratis cursus te plannen.'
        },
        form: {
          first_name: 'Voornaam',
          last_name: 'Achternaam',
          email: 'E-mailadres',
          phone: 'Telefoonnummer',
          address: 'Mijn Adres',
          subject: 'Onderwerp',
          submit: 'Vraag Gratis Cursus aan',
          sending: 'Verzenden...'
        },
        features: [
          {
            title: 'Diepe Praktijkervaring',
            desc: 'Wij theoretiseren niet alleen. We hebben duizenden uren doorgebracht op fabrieksvloeren over drie continenten, waarbij we de dagelijkse productie door en door begrijpen.'
          },
          {
            title: 'Eigen Sprint-methode',
            desc: 'Onze Lean 4.0-methodologie komt niet uit een tekstboek. Het is een beproefd raamwerk voor het oplossen van knelpunten in dagen, niet maanden.'
          },
          {
            title: 'Kennis-eerst Aanpak',
            desc: 'Wij creëren geen afhankelijkheid. We bouwen een levende kennisbank binnen uw bedrijf, zodat u onafhankelijk kunt blijven evolueren lang nadat wij weg zijn.'
          }
        ]
      },
      privacy_page: {
        back: 'Terug naar Home',
        title1: 'Privacy',
        title2: 'Verklaring',
        intro: 'P41 geeft veel om uw privacy en respecteert uw rechten onder de toepasselijke wetgeving inzake gegevensbescherming.',
        contents: 'Inhoud',
        nav: {
          who: 'Wie is P41?',
          data: 'Wat we verzamelen',
          usage: 'Hoe we het gebruiken',
          rights: 'Uw rechten'
        },
        sections: {
          intro: 'We hebben dit privacybeleid opgesteld om u te informeren over hoe we uw persoonsgegevens verzamelen, opslaan, gebruiken en verwerken. Lees dit privacybeleid zorgvuldig door voordat u persoonsgegevens aan ons verstrekt. Onze website (www.P41.be) maakt gebruik van cookies en soortgelijke technologieën; lees voor meer informatie ook ons Cookiebeleid.',
          who: {
            title: 'Wie is P41?',
            p1: 'P41 (“Wij” of “Ons”) is een Belgisch bedrijf met maatschappelijke zetel te Frans Blocklaan 14, 2620 Hemiksem, BELGIË, geregistreerd in de Belgische Kruispuntbank van Ondernemingen onder n° 0 894 236 070 (RPR Antwerpen).',
            p2: 'U kent Ons als aanbieder van projecten, seminars, educatieve sessies en informatie over toekomstige manieren van werken en zakendoen. Als u persoonsgegevens aan ons verstrekt, worden wij in het algemeen beschouwd als Verwerkingsverantwoordelijke.'
          },
          data: {
            title: 'Welke van uw persoonsgegevens verzamelen wij?',
            intro: 'Wij verzamelen verschillende soorten informatie, inclusief maar niet beperkt tot:',
            list: [
              'Persoonlijke identificatiegegevens (voornaam, achternaam, telefoonnummer, adres, e-mailadres)',
              'Persoonlijke details (geslacht, opleiding)',
              'Professionele ervaring (bijv. van CV uploads)',
              'Gegevens verzameld via mediagebruik (mobiel, desktop, sociale media, chatbot)',
              'Interesse in ons productaanbod via content downloads',
              'Elektronische identificatiegegevens (IP-adres, cookies, verbindingen)'
            ]
          },
          how_collect: {
            title: 'Hoe verzamelen wij uw persoonsgegevens?',
            list: [
              'Abonneren op marketingcontent',
              'Bezoeken van de website',
              'Invullen van websiteformulieren',
              'Inkomende en uitgaande correspondentie via online kanalen',
              'Aanvragen van een offerte',
              'Uitwisseling van visitekaartjes'
            ]
          },
          how_use: {
            title: 'Hoe gebruiken en verwerken wij uw persoonsgegevens?',
            intro: 'Wij verwerken persoonsgegevens om te voldoen aan wettelijke vereisten en voor onze gerechtvaardigde belangen, waaronder:',
            list: [
              'Verzenden van gerichte marketing, reclame, updates en promotionele aanbiedingen',
              'Uitvoeren van klanttevredenheidsonderzoeken en marktonderzoek',
              'Opstellen van offertes en uitvoeren van contracten (administratie, facturering, betalingen)',
              'Evalueren van sollicitanten tijdens het wervingsproces'
            ],
            notice_title: 'Belangrijke Mededeling',
            notice_desc: 'P41 zal uw persoonsgegevens nooit verkopen. Wij verhuren of verkopen uw gegevens niet aan derden voor eigen gebruik, tenzij u hier zelf expliciet voor kiest en uw toestemming geeft.'
          },
          storage: {
            title: 'Hoe lang bewaren wij uw persoonsgegevens?',
            intro: 'Wij bewaren uw persoonsgegevens alleen voor de periode die nodig is om het specifieke doel te bereiken, tenzij een langere periode wettelijk vereist is:',
            list: [
              'Contractuele relaties: Tot 10 jaar na het einde van het contract.',
              'Prospects: Bewaard gedurende 5 jaar vanaf het laatste contact.',
              'Sollicitanten: Bewaard gedurende 2 jaar na het sluiten van het wervingsproces.'
            ]
          },
          rights: {
            title: 'Wat zijn uw rechten?',
            intro: 'Volgens de toepasselijke wetgeving inzake gegevensbescherming heeft u de volgende rechten:',
            list: [
              'Recht op inzage: Vraag een kopie aan van de persoonsgegevens die wij over u bewaren.',
              'Recht op rectificatie: Corrigeer onjuiste of onvolledige gegevens.',
              'Recht op gegevenswissing: Verzoek om verwijdering van uw persoonsgegevens ("Recht om vergeten te worden").',
              'Recht op bezwaar: Maak bezwaar tegen verwerking voor direct marketing of op basis van onze gerechtvaardigde belangen.',
              'Recht op overdraagbaarheid: Verzoek om overdracht van uw gegevens naar een andere verwerkingsverantwoordelijke.'
            ]
          },
          complaints: {
            title: 'Vragen of Klachten?',
            intro: 'Als u vragen heeft over deze verklaring of als u uw rechten wilt uitoefenen, neem dan contact met ons op via:',
            last_updated: 'Laatst bijgewerkt: april 2026. We kunnen ons beleid regelmatig wijzigen om te voldoen aan wettelijke wijzigingen of technologische updates.'
          }
        }
      },
      seo: {
        home: {
          title: 'P41 Industriële Intelligentie | Leider in Industrie 4.0',
          description: 'P41 Industriële Intelligentie herdefinieert industriële flow, foutreductie en tijdoptimalisatie via strategische consultancy en digitale transformatie.'
        },
        about: {
          title: 'Over P41 | Onze Visie & Methoden',
          description: 'Lees meer over de missie van P41 om de kloof te overbruggen tussen industrieel erfgoed en digitaal management. Maak kennis met onze oprichter Ives De Saeger.'
        },
        consultancy: {
          title: 'Industriële Consultancy | P41 Diensten',
          description: 'Strategische navigatie door digitale transformatie voor productiemiddelen en supply chain logistiek.'
        },
        academy: {
          title: 'P41 Academie | Online Industriële Training',
          description: 'Vergroot het IQ van uw organisatie met on-demand modules over Lean 4.0, IoT-integratie en voorspellend onderhoud.'
        },
        blog: {
          title: 'Industry Insights Blog | P41 Industriële Intelligentie',
          description: 'De nieuwste inzichten, trends en casestudies over Industrie 4.0, digitale transformatie en industriële efficiëntie.'
        },
        contact: {
          title: 'Contact P41 | Vraag uw Efficiëntie-audit aan',
          description: 'Neem contact op met onze experts voor een gedetailleerde efficiëntie-audit of industriële vragen. Laten we uw flow optimaliseren.'
        },
        privacy: {
          title: 'Privacybeleid | P41 Industriële Intelligentie',
          description: 'Onze toewijding aan het beschermen van uw privacy en het veilig beheren van uw gegevens.'
        }
      }
    }
  };

  t = computed(() => this.translations[this.currentLang()]);

  setLang(lang: Lang) {
    this.currentLang.set(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, lang);
    }
  }
}

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
        products: 'Tools',
        timeStudy: 'Time Study',
        timeStudyTagline: 'Line balancing & costing',
        teamPlanner: 'TeamPlanner',
        teamPlannerTagline: 'Field crew scheduling',
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
        author_desc: 'Industrial engineer with 31+ years of experience. Author of three books, MTM-UAS & TRIZ Expert, holder of 3 patents. Founder of P41 helping companies implement Industry 4.0 technologies.',
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
        tag: 'Industrial Efficiency Expert',
        title: 'Less Errors.',
        subtitle: 'More Output.',
        description: 'We analyse how work really happens on your shop floor — through time study and error analysis — and show you exactly where you can gain at least 10% within 3 months.',
        cta_start: 'Request a Free Audit',
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
            desc: "Learn about Ives De Saeger's journey and how 31 years of expertise was built into the P41 framework.",
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
        products: {
          tag: 'Our Tools',
          title1: 'Software built from',
          title2: '31 years on the floor.',
          desc: 'Two purpose-built tools, born out of real consultancy work on real factory floors and job sites not generic SaaS templates.',
          time_study: {
            title: 'Time Study',
            desc: 'Line balancing, takt time, BSI-3375 allowances, and unit costing from one activity dataset.',
            cta: 'Explore Time Study'
          },
          teamplanner: {
            title: 'TeamPlanner',
            desc: 'Workforce scheduling for field crews plan jobs, staff them, track attendance, and invoice real cost.',
            cta: 'Explore TeamPlanner'
          }
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
          desc: 'Three landmark books on industrial efficiency, leadership and cross-sector innovation: <em>Grenzeling</em>, <em>De Puberende Leider</em>, and <em>The Customer\'s Truffle</em> — each translated into actionable frameworks your company can implement immediately.',
          order_cta: 'Order Your Copy',
          author_role: 'Author · MTM-UAS Expert · TRIZ Expert · 3 Patents · Industrial Engineer & Speaker'
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
        rights: '© 2026 P41 Industrial Intelligence. All rights reserved.'
      },
      vision: {
        title: 'Founder\'s Vision',
        name: 'Ives De Saeger',
        role: 'Founder & Lead Expert | P41',
        quote: 'Industrial Intelligence is not just about machines; it\'s about understanding how work really happens — and then making it measurably better.',
        desc: 'With 31 years of hands-on experience, Ives is a certified MTM-UAS Expert, TRIZ Expert, and holds 3 patents. Author of three books, he has helped more than 100 companies since 1995 achieve measurable efficiency gains — at least 10% within 3 months, with payback periods under one year.'
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
        title1: 'Less Errors.',
        title2: 'More Output.',
        title3: 'Without Big Investments.',
        desc: 'We analyse how work really happens on your shop floor — through time study and error analysis — and show you exactly where you can gain at least 10% within 3 months.',
        cta1: 'Request a Free Audit',
        joined: 'Trusted by 100+ companies since 1995',
        gap_title1: 'We understand how work',
        gap_title2: 'Really Happens on Your Floor.',
        gap_desc: 'Most consultants start with theory. We start with a stopwatch and a clipboard. Time study, error analysis, and throughput measurement give us a precise picture of where your losses are — before we recommend anything.',
        cycle_title: 'Cycle Time & Time Study',
        cycle_desc: 'Visualizing real work flow to identify bottlenecks, balance loss, and hidden costs per unit.',
        error_title: 'Error Quality Analysis',
        error_desc: 'Systematic safeguards that identify root causes and reduce recurring defects at the source.',
        final_cta_title: 'Ready to find your 10%?',
        final_cta_desc: 'Schedule a discovery call with Ives De Saeger. Bring a real work breakdown and we will show you where the gains are.',
        final_cta_button: 'Request a Free Efficiency Audit'
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
      time_study_page: {
        tag: 'Industrial Engineering Software',
        title1: 'From stopwatch to',
        title2: 'standard cost,',
        title3: 'in one workbench.',
        desc: 'Time Study replaces spreadsheets and disconnected time-study tools with one system that balances your line, scores rest & personal allowance per international standards, and prices the unit all from the same activity data.',
        cta1: 'Book a Demo',
        cta2: 'See It On Your Own Line',
        trust: 'Built on real, published ergonomic standards (BSI-3375)',
        video_tag: 'See It In Action',
        video_title: 'Watch: Time Study, station by station',
        video_desc: 'A walkthrough of building a study, balancing a line, and turning it into a defensible standard cost using the same tool your engineers will use.',
        what_tag: 'What It Is',
        what_title1: 'One activity dataset,',
        what_title2: 'four connected outputs.',
        what_desc: "Time Study is where an industrial engineer builds a study activity-by-activity, using a reusable, standardized time-code library. Change an activity once, and everything downstream updates with it.",
        what_points: [
          { icon: 'bar_chart', title: 'Station Balance & Takt Time', desc: 'Groups activities into workstations and computes takt time and balance loss per station, live as you edit.' },
          { icon: 'health_and_safety', title: 'R&PV Allowance Scoring', desc: "Scores each activity's rest & personal allowance against the published BSI-3375 standard, instead of a flat guessed percentage." },
          { icon: 'payments', title: 'Full Costing Engine', desc: 'Turns the balanced line directly into a personnel/machine/material cost model and a sales price, per unit, pack, or carton.' },
          { icon: 'fact_check', title: 'Work Instructions', desc: 'Publishes the result as reorderable, media-rich, operator-facing work instructions exportable to PDF for the shop floor.' }
        ],
        features_tag: 'What We Offer',
        features_title1: 'Built for the',
        features_title2: 'real shop floor.',
        features_desc: 'Every capability below is real and shipped pick the ones that matter to your line.',
        features: [
          { icon: 'bar_chart', title: 'Station Balance & Takt Time', desc: 'A live bar chart of every station against the takt line, color-coded by balance-loss severity. Models helpers sharing a task, named operators working in parallel, and fully duplicated parallel lines as three distinct, separately-calculated scenarios.' },
          { icon: 'library_books', title: 'Standardized Time-Code Library (UAS)', desc: 'A reusable, predetermined-time-system library verb/object/level codes, walking/bending/sitting motions, composable elements. The same element always carries the same time, across every study.' },
          { icon: 'health_and_safety', title: 'R&PV Allowance Engine (BSI-3375)', desc: 'Score force, posture, temperature, and monotony factors from the BSI-3375-5 / ILO point tables, and the system looks up the correct rest-and-personal allowance automatically.' },
          { icon: 'payments', title: 'Full Costing Engine', desc: 'Personnel, machine, and material costs roll up from the same balanced-line data. Personnel cost splits into productive and paid balance-loss time, reconciling exactly with the total norm time per unit.' },
          { icon: 'fact_check', title: 'Work Instructions & PDF Export', desc: 'Drag-and-drop to reorder instruction groups and steps, attach images/videos/PDFs per step, and export a real standalone PDF not a print-to-PDF hack. A lightweight Operator app confirms completion on the floor.' },
          { icon: 'call_split', title: 'Variants & Multi-Model Lines', desc: 'Model optional build options as variants with their own occurrence %, and sequence a real production mix to see whether a high-time variant gets absorbed before it stalls the line.' },
          { icon: 'insights', title: 'Workforce Planning & Sensitivity', desc: 'Dedicated tabs for headcount/shift planning, deeper analysis, and sensitivity analysis to stress-test takt and volume assumptions before committing capital.' },
          { icon: 'compare_arrows', title: 'Compare Studies', desc: 'Put two balance studies side by side to evaluate a proposed change before rolling it out on the floor.' }
        ],
        diff_tag: "Why We're Different",
        diff_title1: 'Three things',
        diff_title2: 'competitors get wrong.',
        diff: [
          { icon: 'verified', title: 'Standards-based allowances, not guesses', desc: 'The R&PV / BSI-3375 scoring engine is a real, auditable ergonomic standard. Most competing tools use a flat guessed percentage instead.' },
          { icon: 'hub', title: 'One system, not three spreadsheets', desc: 'Time study, line balance, cost, and work instructions all share one activity dataset. Change an activity once takt, cost, and the printed instruction all update together.' },
          { icon: 'precision_manufacturing', title: 'Real shop-floor scenarios, modeled correctly', desc: 'Helpers sharing a task, genuinely different operators on one station, and fully duplicated parallel lines are three different situations with three different formulas Time Study tells them apart.' }
        ],
        final_cta_title: 'Ready to see your own line balanced?',
        final_cta_desc: "Bring a real work breakdown and we'll show you takt time, balance loss, and unit cost on your own line.",
        final_cta_button: 'Book a Demo',
        cross_link_text: 'Looking for field-crew workforce scheduling instead?',
        cross_link_cta: 'Explore TeamPlanner'
      },
      teamplanner_page: {
        tag: 'Field Service & Workforce Scheduling',
        title1: 'Workforce scheduling',
        title2: 'built for crews',
        title3: 'who work in the field.',
        desc: 'Plan jobs, staff them with the right people and vehicles, track who actually showed up, and invoice what it really cost all from one board.',
        cta1: 'Book a Demo',
        cta2: 'Talk to Us',
        trust: 'Multi-tenant & multi-language (Dutch/English) from day one',
        what_tag: 'What It Is',
        what_title1: 'One board,',
        what_title2: 'not a spreadsheet and a group chat.',
        what_desc: "Instead of juggling a spreadsheet, a group chat, and a driver's memory of who's in which van, a planner builds a job, assigns a crew and a vehicle, and the system checks automatically whether that assignment is actually valid.",
        who_tag: "Who It's For",
        who_title: 'Built for the people who run the schedule.',
        who: [
          { icon: 'event_note', title: 'Planners & Office Managers', desc: "Build the week's or month's job schedule and need to know, before they commit, whether a crew assignment will actually work." },
          { icon: 'groups', title: 'Coaches & Team Leads', desc: "Run a crew day-to-day and need a fast way to see who's present, who's not, and who needs to be moved." },
          { icon: 'payments', title: 'Owners & Managers', desc: 'Need accurate job costing and invoicing without re-keying hours and materials into a separate spreadsheet.' },
          { icon: 'badge', title: 'HR', desc: "Onboard temporary or future-dated staff without them cluttering today's planner." }
        ],
        features_tag: 'Differentiators',
        features_title1: "Why it's",
        features_title2: 'different.',
        features: [
          { icon: 'drag_indicator', title: 'Drag-and-Drop, Not Form-Filling', desc: 'Moving someone off a job, or covering for someone at short notice, is a drag from one job card to another. The system re-validates in real time and flags conflicts immediately.' },
          { icon: 'rule', title: 'A Rule Engine That Enforces Only What You Want', desc: 'Four independent checks competence, presence, hours, vehicle capacity each opt-in per company, configurable in Settings, blocking or just flagging a violation.' },
          { icon: 'diversity_3', title: 'Built Around Real Crew Structures', desc: 'Real Coaches with a declared team and van, Empty/Leave Coach placeholders for slots that change day to day, and interns or future-dated staff scheduled correctly from day one.' },
          { icon: 'today', title: 'Two Honestly Different Views of "Who\'s Working"', desc: "Today's board turns green the moment someone is present and on a job. Future views show who's scheduled, in a distinct shading a planning view, not a pretend attendance record." },
          { icon: 'event_repeat', title: 'Flexible, Intelligent Job Repetition', desc: "Build a weekly, biweekly, or seasonal cadence in one step skipping weekends and holidays automatically, and telling you exactly which dates couldn't be created and why." },
          { icon: 'receipt_long', title: 'Costing Built From What Actually Happened', desc: 'A live breakdown personnel, machines, materials, flat costs, vehicle costs, overhead, margin up to a selling price. Invoices freeze a snapshot at invoice time.' }
        ],
        checks_tag: 'The Rule Engine',
        checks_title: 'Four checks, each one optional.',
        checks: [
          { name: 'Competence', desc: 'Is this person actually trained/qualified for this task, at what skill level?' },
          { name: 'Presence', desc: 'Are they marked present today, or for future dates do they even work that day?' },
          { name: 'Hours', desc: 'Would this assignment push them past their daily hour cap, or overlap another job?' },
          { name: 'Vehicle Capacity', desc: 'Is there still a free seat in the van or bus assigned to this job?' }
        ],
        how_tag: 'How It Works',
        how_title: 'Plan → Staff → Track → Invoice.',
        how: [
          { step: '01', title: 'Plan a job', desc: 'Build it on the calendar with real ISO week numbers, weekend/holiday-aware repeats.' },
          { step: '02', title: 'Staff it', desc: 'Assign a crew and vehicle the rule engine checks it before it goes out.' },
          { step: '03', title: 'Track attendance live', desc: "See who's present and on a job, drag people between jobs in seconds." },
          { step: '04', title: 'Cost & invoice automatically', desc: 'A full cost breakdown feeds a frozen-snapshot invoice no re-keying.' }
        ],
        final_cta_title: 'Ready to see your own crews on the board?',
        final_cta_desc: "Bring a real week's schedule and we'll show you how the rule engine, attendance board, and costing work together.",
        final_cta_button: 'Book a Demo',
        cross_link_text: 'Looking for line balancing & time study instead?',
        cross_link_cta: 'Explore Time Study'
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
        },
        timeStudy: {
          title: 'Time Study Software | Line Balancing, Takt Time & Costing | P41',
          description: 'Time Study is an industrial engineering workbench for line balancing, BSI-3375 allowance scoring, production costing, and work instructions all from one activity dataset.'
        },
        teamPlanner: {
          title: 'TeamPlanner | Field Crew Scheduling & Workforce Planning Software | P41',
          description: 'TeamPlanner is workforce scheduling built for field crews: plan jobs, staff them with a 5-dimension rule engine, track attendance live, and invoice real cost all from one board.'
        }
      }
    },
    nl: {
      nav: {
        home: 'Home',
        products: 'Tools',
        timeStudy: 'Time Study',
        timeStudyTagline: 'Lijnbalancering & kostprijs',
        teamPlanner: 'TeamPlanner',
        teamPlannerTagline: 'Planning voor veldploegen',
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
        author_desc: 'Industrieel ingenieur met 31+ jaar ervaring. Auteur van drie boeken, MTM-UAS & TRIZ Expert, houder van 3 octrooien. Oprichter van P41 die bedrijven helpt bij het implementeren van Industrie 4.0-technologieën.',
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
        tag: 'Industrieel Efficiëntie-expert',
        title: 'Minder Fouten.',
        subtitle: 'Meer Output.',
        description: 'We ontleden hoe het werk vandaag echt gebeurt op uw werkvloer — via tijdstudie en foutanalyse — en tonen exact waar u binnen 3 maanden minstens 10% kan winnen.',
        cta_start: 'Vraag een Gratis Audit aan',
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
            desc: "Lees meer over de reis van Ives De Saeger en hoe 31 jaar expertise is verwerkt in het P41-raamwerk.",
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
        products: {
          tag: 'Onze Tools',
          title1: 'Software gebouwd uit',
          title2: '31 jaar werkvloerervaring.',
          desc: 'Twee doelgerichte tools, ontstaan uit echt consultancywerk op echte fabrieksvloeren en werven geen generieke SaaS-sjablonen.',
          time_study: {
            title: 'Time Study',
            desc: 'Lijnbalancering, takttijd, BSI-3375-toeslagen en eenheidskostprijs vanuit één activiteitendataset.',
            cta: 'Ontdek Time Study'
          },
          teamplanner: {
            title: 'TeamPlanner',
            desc: 'Personeelsplanning voor veldploegen plan jobs, bemand ze, volg aanwezigheid en factureer de echte kost.',
            cta: 'Ontdek TeamPlanner'
          }
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
          desc: 'Drie grensverleggende boeken over industriële efficiëntie, leiderschap en sectoroverschrijdende innovatie: <em>Grenzeling</em>, <em>De Puberende Leider</em> en <em>The Customer\'s Truffle</em> — elk vertaald naar bruikbare raamwerken die uw bedrijf onmiddellijk kan implementeren.',
          order_cta: 'Bestel Uw Exemplaar',
          author_role: 'Auteur · MTM-UAS Expert · TRIZ Expert · 3 Octrooien · Industrieel Ingenieur & Spreker'
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
        rights: '© 2026 P41 Industriële Intelligentie. Alle rechten voorbehouden.'
      },
      vision: {
        title: 'Visie van de Oprichter',
        name: 'Ives De Saeger',
        role: 'Oprichter & Hoofdexpert | P41',
        quote: 'Industriële Intelligentie gaat niet alleen over machines; het gaat over begrijpen hoe het werk echt gebeurt — en het daarna meetbaar beter maken.',
        desc: 'Met 31 jaar praktijkervaring is Ives een gecertificeerd MTM-UAS Expert, TRIZ Expert en houder van 3 octrooien. Auteur van drie boeken en geholpen bij meer dan 100 bedrijven sinds 1995 — met een aantoonbare efficiëntiewinst van minstens 10% binnen 3 maanden.'
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
        title1: 'Minder Fouten.',
        title2: 'Meer Output.',
        title3: 'Zonder Grote Investeringen.',
        desc: 'We ontleden hoe het werk vandaag echt gebeurt op uw werkvloer — via tijdstudie en foutanalyse — en tonen exact waar u binnen 3 maanden minstens 10% kan winnen.',
        cta1: 'Vraag een Gratis Audit aan',
        joined: 'Vertrouwd door 100+ bedrijven sinds 1995',
        gap_title1: 'Wij begrijpen hoe het werk',
        gap_title2: 'Echt Gebeurt op Uw Werkvloer.',
        gap_desc: 'De meeste consultants starten met theorie. Wij starten met een stopwatch en een klembord. Tijdstudie, foutanalyse en doorvoermetingen geven ons een nauwkeurig beeld van waar uw verliezen zitten — voordat we iets aanbevelen.',
        cycle_title: 'Cyclustijd & Tijdstudie',
        cycle_desc: 'Echte werkflow visualiseren om knelpunten, balansverliezen en verborgen kosten per eenheid te identificeren.',
        error_title: 'Foutkwaliteitsanalyse',
        error_desc: 'Systematische waarborgen die oorzaken identificeren en terugkerende defecten aan de bron verminderen.',
        final_cta_title: 'Klaar om uw 10% te vinden?',
        final_cta_desc: 'Plan een kennismakingsgesprek met Ives De Saeger. Breng een echte werkopsplitsing mee en we tonen u waar de winst zit.',
        final_cta_button: 'Vraag een Gratis Efficiëntie-audit aan'
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
      time_study_page: {
        tag: 'Software voor Industriële Techniek',
        title1: 'Van stopwatch tot',
        title2: 'standaardkost,',
        title3: 'in één workbench.',
        desc: 'Time Study vervangt spreadsheets en losse tijdstudietools door één systeem dat uw lijn balanceert, rust- en persoonlijke toeslag scoort volgens internationale normen, en de eenheid prijst alles vanuit dezelfde activiteitendata.',
        cta1: 'Boek een Demo',
        cta2: 'Bekijk het op uw eigen lijn',
        trust: 'Gebouwd op echte, gepubliceerde ergonomische normen (BSI-3375)',
        video_tag: 'In de Praktijk',
        video_title: 'Bekijk: Time Study, station per station',
        video_desc: 'Een doorloop van het opbouwen van een studie, het balanceren van een lijn, en het omzetten ervan naar een verdedigbare standaardkost met dezelfde tool die uw engineers zullen gebruiken.',
        what_tag: 'Wat Het Is',
        what_title1: 'Eén activiteitendataset,',
        what_title2: 'vier gekoppelde resultaten.',
        what_desc: 'Time Study is waar een industrieel ingenieur een studie activiteit per activiteit opbouwt, met een herbruikbare, gestandaardiseerde tijdcodebibliotheek. Pas één activiteit aan, en alles stroomafwaarts werkt automatisch mee.',
        what_points: [
          { icon: 'bar_chart', title: 'Lijnbalancering & Takttijd', desc: 'Groepeert activiteiten in werkstations en berekent takttijd en balansverlies per station, live tijdens het bewerken.' },
          { icon: 'health_and_safety', title: 'R&PV Toeslagberekening', desc: 'Scoort de rust- en persoonlijke toeslag van elke activiteit tegen de gepubliceerde BSI-3375-norm, in plaats van een geraden vast percentage.' },
          { icon: 'payments', title: 'Volledige Kostprijsmotor', desc: 'Zet de gebalanceerde lijn rechtstreeks om in een personeels-/machine-/materiaalkostmodel en een verkoopprijs, per eenheid, pack of karton.' },
          { icon: 'fact_check', title: 'Werkinstructies', desc: 'Publiceert het resultaat als herordenbare, mediarijke werkinstructies voor de operator exporteerbaar naar PDF voor de werkvloer.' }
        ],
        features_tag: 'Wat We Bieden',
        features_title1: 'Gebouwd voor de',
        features_title2: 'echte werkvloer.',
        features_desc: 'Elke functie hieronder is echt en operationeel kies de functies die voor uw lijn belangrijk zijn.',
        features: [
          { icon: 'bar_chart', title: 'Lijnbalancering & Takttijd', desc: 'Een live staafdiagram van elk station tegenover de taktlijn, kleurgecodeerd op ernst van balansverlies. Modelleert helpers die een taak delen, verschillende operatoren die parallel werken, en volledig gedupliceerde parallelle lijnen als drie afzonderlijke, apart berekende scenario\'s.' },
          { icon: 'library_books', title: 'Gestandaardiseerde Tijdcodebibliotheek (UAS)', desc: 'Een herbruikbare, vooraf bepaalde tijdsysteembibliotheek werkwoord/object/niveau-codes, loop-/buig-/zitbewegingen, samenstelbare elementen. Hetzelfde element draagt altijd dezelfde tijd, in elke studie.' },
          { icon: 'health_and_safety', title: 'R&PV Toeslagmotor (BSI-3375)', desc: 'Score kracht-, houding-, temperatuur- en monotoniefactoren uit de BSI-3375-5 / ILO-puntentabellen, en het systeem zoekt automatisch de correcte rust- en persoonlijke toeslag op.' },
          { icon: 'payments', title: 'Volledige Kostprijsmotor', desc: 'Personeels-, machine- en materiaalkosten rollen op uit dezelfde gebalanceerde-lijndata. Personeelskost splitst zich in productieve tijd en betaalde balansverlies-tijd, die exact aansluit op de totale normtijd per eenheid.' },
          { icon: 'fact_check', title: 'Werkinstructies & PDF-export', desc: 'Sleep instructiegroepen en stappen in de juiste volgorde, voeg per stap afbeeldingen/video\'s/PDF\'s toe, en exporteer een echt zelfstandig PDF-document geen print-naar-PDF-truc. Een lichte Operator-app bevestigt de uitvoering op de vloer.' },
          { icon: 'call_split', title: 'Varianten & Multi-Model Lijnen', desc: 'Modelleer optionele bouwopties als varianten met hun eigen voorkomstpercentage, en sequenceer een echte productiemix om te zien of een variant met hoge tijd wordt opgevangen voordat de lijn stilvalt.' },
          { icon: 'insights', title: 'Personeelsplanning & Sensitiviteit', desc: 'Aparte tabbladen voor bezetting-/shiftplanning, diepgaandere analyses en sensitiviteitsanalyse om takt- en volume-aannames te testen vóór u kapitaal investeert.' },
          { icon: 'compare_arrows', title: 'Studies Vergelijken', desc: 'Zet twee balansstudies naast elkaar om een voorgestelde wijziging te evalueren voordat u ze op de vloer uitrolt.' }
        ],
        diff_tag: 'Waarom Wij Anders Zijn',
        diff_title1: 'Drie dingen die',
        diff_title2: 'concurrenten fout doen.',
        diff: [
          { icon: 'verified', title: 'Op normen gebaseerde toeslagen, geen giswerk', desc: 'De R&PV/BSI-3375-scoringsmotor is een echte, controleerbare ergonomische norm. De meeste concurrerende tools gebruiken in plaats daarvan een geraden vast percentage.' },
          { icon: 'hub', title: 'Eén systeem, geen drie spreadsheets', desc: 'Tijdstudie, lijnbalancering, kostprijs en werkinstructies delen allemaal één activiteitendataset. Pas één activiteit aan takt, kostprijs en de afgedrukte instructie werken allemaal automatisch mee.' },
          { icon: 'precision_manufacturing', title: 'Echte scenario\'s van de werkvloer, correct gemodelleerd', desc: 'Helpers die een taak delen, echt verschillende operatoren op één station, en volledig gedupliceerde parallelle lijnen zijn drie verschillende situaties met drie verschillende formules Time Study maakt het onderscheid.' }
        ],
        final_cta_title: 'Klaar om uw eigen lijn gebalanceerd te zien?',
        final_cta_desc: 'Breng een echte werkverdeling mee en wij tonen u takttijd, balansverlies en eenheidskost op uw eigen lijn.',
        final_cta_button: 'Boek een Demo',
        cross_link_text: 'Op zoek naar personeelsplanning voor veldploegen?',
        cross_link_cta: 'Ontdek TeamPlanner'
      },
      teamplanner_page: {
        tag: 'Planning voor Veldwerk & Personeel',
        title1: 'Personeelsplanning',
        title2: 'gebouwd voor ploegen',
        title3: 'die op het veld werken.',
        desc: 'Plan jobs, bemand ze met de juiste mensen en voertuigen, volg wie er echt was, en factureer wat het écht kostte alles vanaf één bord.',
        cta1: 'Boek een Demo',
        cta2: 'Neem Contact Op',
        trust: 'Multi-tenant & meertalig (Nederlands/Engels) vanaf dag één',
        what_tag: 'Wat Het Is',
        what_title1: 'Eén bord,',
        what_title2: 'geen spreadsheet en groepschat.',
        what_desc: 'In plaats van te jongleren met een spreadsheet, een groepschat en het geheugen van een chauffeur over wie in welke bus zit, bouwt een planner een job, wijst een ploeg en een voertuig toe, en controleert het systeem automatisch of die toewijzing wel degelijk geldig is.',
        who_tag: 'Voor Wie',
        who_title: 'Gebouwd voor de mensen die de planning draaien.',
        who: [
          { icon: 'event_note', title: 'Planners & Kantoormanagers', desc: 'Bouwen de planning van de week of maand op en moeten vooraf weten of een ploegtoewijzing echt zal werken.' },
          { icon: 'groups', title: 'Coaches & Teamleiders', desc: 'Runnen een ploeg dag in dag uit en hebben een snelle manier nodig om te zien wie aanwezig is, wie niet, en wie verplaatst moet worden.' },
          { icon: 'payments', title: 'Eigenaars & Managers', desc: 'Hebben nauwkeurige jobkostprijs en facturatie nodig zonder uren en materialen opnieuw in te tikken in een aparte spreadsheet.' },
          { icon: 'badge', title: 'HR', desc: 'Nemen tijdelijk of toekomstig personeel op zonder de planning van vandaag te verstoren.' }
        ],
        features_tag: 'Onderscheidende Factoren',
        features_title1: 'Waarom het',
        features_title2: 'anders is.',
        features: [
          { icon: 'drag_indicator', title: 'Slepen, geen formulieren', desc: 'Iemand van een job halen wegens afwezigheid, of op korte termijn vervangen, is een sleep van de ene jobkaart naar de andere. Het systeem valideert onmiddellijk opnieuw en meldt conflicten meteen.' },
          { icon: 'rule', title: 'Een regelmotor die enkel afdwingt wat u wilt', desc: 'Vijf onafhankelijke controles competentie, conflict, aanwezigheid, uren, voertuigcapaciteit elk optioneel per bedrijf, instelbaar, blokkerend of louter signalerend.' },
          { icon: 'diversity_3', title: 'Gebouwd rond echte ploegstructuren', desc: 'Echte coaches met een vaste ploeg en bus, "Lege/Verlof"-coach-plaatshouders voor slots die dagelijks wisselen, en stagiairs of toekomstig personeel correct ingepland vanaf dag één.' },
          { icon: 'today', title: 'Twee eerlijk verschillende weergaven van "wie werkt"', desc: 'Het bord van vandaag wordt groen zodra iemand aanwezig is en op een job staat. Toekomstige weergaven tonen wie ingepland staat, in een aparte schakering een planningsweergave, geen nagebootste aanwezigheidsregistratie.' },
          { icon: 'event_repeat', title: 'Flexibele, slimme jobherhaling', desc: 'Bouw een wekelijks, tweewekelijks of seizoensgebonden ritme in één stap weekends en feestdagen automatisch overgeslagen, en exact aangegeven welke data niet konden worden aangemaakt en waarom.' },
          { icon: 'receipt_long', title: 'Kostprijs gebouwd op wat er echt gebeurde', desc: 'Een live overzicht personeel, machines, materialen, vaste kosten, voertuigkosten, overhead, marge tot een verkoopprijs. Facturen bevriezen een momentopname op factuurmoment.' }
        ],
        checks_tag: 'De Regelmotor',
        checks_title: 'Vijf controles, elk optioneel.',
        checks: [
          { name: 'Competentie', desc: 'Is deze persoon effectief opgeleid/gekwalificeerd voor deze taak, op welk niveau?' },
          { name: 'Conflict', desc: 'Heeft deze persoon een gekend persoonlijk of werkconflict met iemand die al op de ploeg staat?' },
          { name: 'Aanwezigheid', desc: 'Staat de persoon vandaag als aanwezig genoteerd, of voor toekomstige data werkt hij/zij die dag überhaupt?' },
          { name: 'Uren', desc: 'Zou deze toewijzing de dagelijkse urenlimiet overschrijden, of overlappen met een andere job?' },
          { name: 'Voertuigcapaciteit', desc: 'Is er nog een vrije plaats in de bus of het busje dat aan deze job is toegewezen?' }
        ],
        how_tag: 'Hoe Het Werkt',
        how_title: 'Plannen → Bemannen → Opvolgen → Factureren.',
        how: [
          { step: '01', title: 'Plan een job', desc: 'Bouw het op in de kalender met echte ISO-weeknummers, weekend-/feestdagbewuste herhalingen.' },
          { step: '02', title: 'Bemand ze', desc: 'Wijs een ploeg en voertuig toe de regelmotor controleert het voordat het de deur uitgaat.' },
          { step: '03', title: 'Volg aanwezigheid live op', desc: 'Zie wie aanwezig is en op een job staat, versleep mensen tussen jobs in seconden.' },
          { step: '04', title: 'Kost & factureer automatisch', desc: 'Een volledig kostenoverzicht voedt een bevroren-momentopname-factuur geen herwerk.' }
        ],
        final_cta_title: 'Klaar om uw eigen ploegen op het bord te zien?',
        final_cta_desc: 'Breng een echte weekplanning mee en wij tonen u hoe de regelmotor, het aanwezigheidsbord en de kostprijsberekening samenwerken.',
        final_cta_button: 'Boek een Demo',
        cross_link_text: 'Op zoek naar lijnbalancering & tijdstudie?',
        cross_link_cta: 'Ontdek Time Study'
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
        },
        timeStudy: {
          title: 'Time Study Software | Lijnbalancering, Takttijd & Kostprijs | P41',
          description: 'Time Study is een workbench voor industrieel ingenieurs voor lijnbalancering, BSI-3375 toeslagberekening, productiekostprijs en werkinstructies alles vanuit één activiteitendataset.'
        },
        teamPlanner: {
          title: 'TeamPlanner | Planningssoftware voor Veldploegen & Personeel | P41',
          description: 'TeamPlanner is workforce scheduling gebouwd voor veldploegen: plan jobs, bemand ze met een regelmotor op 5 dimensies, volg aanwezigheid live op en factureer de echte kost alles vanaf één bord.'
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

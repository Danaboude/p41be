import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'en' | 'nl';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = signal<Lang>('en');

  lang = this.currentLang.asReadonly();

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
      hero: {
        tag: 'Industry 4.0 Leader',
        title: 'Industrial Intelligence.',
        subtitle: 'Redefined.',
        description: 'Optimizing time, eliminating error, and perfecting flow. We bridge the gap between heavy industrial heritage and futuristic digital management.',
        cta_start: 'Get Started',
        cta_methods: 'Our Methods'
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
        demo: 'Demo aanvragen'
      },
      hero: {
        tag: 'Leider in Industrie 4.0',
        title: 'Industriële Intelligentie.',
        subtitle: 'Hergedefinieerd.',
        description: 'Optimaliseren van tijd, elimineren van fouten en perfectioneren van flow. Wij overbruggen de kloof tussen zwaar industrieel erfgoed en futuristisch digitaal management.',
        cta_start: 'Begin nu',
        cta_methods: 'Onze Methoden'
      },
      services: {
        title: 'Kerncijfers',
        description: 'Oplossingen op maat voor het moderne industriële landschap, van strategische verschuivingen op bestuursniveau tot praktische optimalisatie op de werkvloer.',
        consultancy: {
          title: 'Consultancy',
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
      }
    }
  };

  t = computed(() => this.translations[this.currentLang()]);

  setLang(lang: Lang) {
    this.currentLang.set(lang);
  }
}

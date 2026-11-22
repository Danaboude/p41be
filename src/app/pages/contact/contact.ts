import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';
import { DataService } from '../../core/services/data.service';

// Extra page copy (EN + NL). Only facts that are on the site already.
const EXTRA = {
  en: {
    error: 'Sorry, your message could not be sent. Please email ives@p41.be or call +32 496/16.65.54.',
    topics_title: 'What we can talk about',
    topics_desc: 'You talk directly with Ives De Saeger, founder of P41, in Dutch or English.',
    topics: [
      { icon: 'timer', title: 'Time study & error analysis', text: 'How work really happens on your shop floor, and where you lose time and money.', link: '/consultancy' },
      { icon: 'bar_chart', title: 'Time Study software', text: 'Line balancing, takt time, cost price per unit and work instructions from one dataset.', link: '/time-study' },
      { icon: 'groups', title: 'TeamPlanner', text: 'Day planning for crews in the field: people, teams and vans on one card.', link: '/teamplanner' },
      { icon: 'school', title: 'P41 Academy', text: 'Courses on time study, lean and industrial engineering.', link: '/academy' }
    ]
  },
  nl: {
    error: 'Sorry, uw bericht kon niet worden verzonden. Mail naar ives@p41.be of bel +32 496/16.65.54.',
    topics_title: 'Waarover we kunnen praten',
    topics_desc: 'U spreekt rechtstreeks met Ives De Saeger, oprichter van P41, in het Nederlands of Engels.',
    topics: [
      { icon: 'timer', title: 'Tijdstudie & foutanalyse', text: 'Hoe het werk echt gebeurt op uw werkvloer, en waar u tijd en geld verliest.', link: '/consultancy' },
      { icon: 'bar_chart', title: 'Time Study software', text: 'Lijnbalancering, takttijd, kostprijs per eenheid en werkinstructies vanuit één dataset.', link: '/time-study' },
      { icon: 'groups', title: 'TeamPlanner', text: 'Dagplanning voor ploegen op het terrein: mensen, ploegen en busjes op één kaart.', link: '/teamplanner' },
      { icon: 'school', title: 'P41 Academy', text: 'Opleidingen over tijdstudie, lean en industriële techniek.', link: '/academy' }
    ]
  }
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './contact.html'
})
export class ContactComponent {
  private translationService = inject(TranslationService);
  private dataService = inject(DataService);
  t = this.translationService.t;
  x = computed(() => EXTRA[this.translationService.lang()]);

  submitted = signal(false);
  sending = signal(false);
  failed = signal(false);
  errorText = computed(() => this.x().error);

  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const value = (k: string) => String(data.get(k) ?? '').trim();

    this.sending.set(true);
    this.failed.set(false);
    this.dataService.submitLead({
      source: 'contact',
      firstName: value('name'),
      lastName: '',
      email: value('email'),
      subject: value('subject'),
      message: value('message'),
      website: value('website')
    }).subscribe({
      next: () => {
        this.sending.set(false);
        this.submitted.set(true);
        form.reset();
        setTimeout(() => this.submitted.set(false), 8000);
      },
      error: () => {
        this.sending.set(false);
        this.failed.set(true);
      }
    });
  }
}

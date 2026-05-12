import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../../../core/services/translation.service';
import { DataService } from '../../../../core/services/data.service';

interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

@Component({
  selector: 'app-why-choose',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './why-choose.html',
  styleUrls: ['./why-choose.css']
})
export class WhyChooseComponent {
  private translationService = inject(TranslationService);
  private dataService = inject(DataService);
  t = this.translationService.t;

  formSubmitted = false;
  formLoading = false;

  form = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    subject: ''
  };

  features = computed<Feature[]>(() => {
    const tFeatures = this.t().why_choose.features;
    return [
      {
        icon: 'history_edu',
        title: tFeatures[0].title,
        description: tFeatures[0].desc,
        color: 'from-blue-500/10 to-primary/5'
      },
      {
        icon: 'bolt',
        title: tFeatures[1].title,
        description: tFeatures[1].desc,
        color: 'from-violet-500/10 to-primary/5'
      },
      {
        icon: 'school',
        title: tFeatures[2].title,
        description: tFeatures[2].desc,
        color: 'from-emerald-500/10 to-primary/5'
      }
    ];
  });

  benefits = computed(() => this.t().why_choose.free_course.benefits);

  submitForm() {
    if (!this.form.firstName || !this.form.email) return;
    this.formLoading = true;
    
    this.dataService.submitLead(this.form).subscribe({
      next: () => {
        this.formLoading = false;
        this.formSubmitted = true;
      },
      error: (err) => {
        console.error('Lead submission failed:', err);
        this.formLoading = false;
        alert('Something went wrong. Please try again later.');
      }
    });
  }
}

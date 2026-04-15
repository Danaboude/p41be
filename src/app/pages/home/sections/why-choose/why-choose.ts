import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  features: Feature[] = [
    {
      icon: 'history_edu',
      title: 'Experience',
      description: 'Utilize over 25 years of experience with our team! Doing time study, analyse errors to find technology to decrease them. Utilise throughput solutions to visualise flow.',
      color: 'from-blue-500/10 to-primary/5'
    },
    {
      icon: 'bolt',
      title: 'Novel Methods',
      description: 'We work faster than any consultancy firm because of our own quick methods. Straight to the point!',
      color: 'from-violet-500/10 to-primary/5'
    },
    {
      icon: 'school',
      title: 'Gather Own Knowledge!',
      description: 'We transfer knowledge and skills to your teams and follow up every day after a project! Check out our training programs at different institutes.',
      color: 'from-emerald-500/10 to-primary/5'
    }
  ];

  submitForm() {
    if (!this.form.firstName || !this.form.email) return;
    this.formLoading = true;
    // Simulate submit
    setTimeout(() => {
      this.formLoading = false;
      this.formSubmitted = true;
    }, 1200);
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  image: string;
  content: string[];  // array of paragraphs
  readTime: string;
}

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-detail.html',
  styleUrls: ['./blog-detail.css']
})
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  post: BlogPost | null = null;
  allPosts: BlogPost[] = [];

  private readonly posts: BlogPost[] = [
    {
      id: 'getting-back-to-basics',
      title: 'Getting back to basics',
      date: 'January 2, 2023',
      author: 'Ives De Saeger',
      tags: ['time study', 'MTM-UAS', 'therbligs', 'gilbreth'],
      image: 'blog1.png',
      readTime: '5 min read',
      content: [
        'We are looking at the year 1910. Can you imagine that? More than 113 years ago! A brilliant analyst called Frank B Gilbreth started using film cameras to look for waste in motions. This micro-motion analysis gave birth to predetermined time study and later developed variants like MTM-1, MTM-MEK, MTM-UAS, V-rex, MOST, Modapts, Ready Work Factor.',
        'Basically the motion was analyzed, coded with time study elements and improvements were being created. Strangely most of these "old and apparently obsolete" analyses are still very much required today. I\'m doing a time study at several plants and the basic principles of motion seem to have vanished over the years.',
        'In those days the camera was something special and only a few people were using them in contrast to today — everybody today has Xk video resolution. Despite these common video tools, hardly nobody seems to take the time to really look at how people are performing the tasks when now with the energy, wage index, climate and corona crises we seem to be needing more productivity than ever.',
        'As the soundless movie shows you — and please take the time to look at it — you\'ll see that optimal usage of left and right hand and feet can result in enormous increase in output. Trying to improve the natural flow of actions with abrupt changes. The principles have been defined by Barnes as the "principles of motion economy". By applying you can quickly improve from 10 to 30%. Why wait to start now using these basic insights?',
        '"A better name for scientific management is \'measured functional management.\' It is not sufficient to call it \'labor saving management\' for it deals with more than labor and labor saving. It is a way for obtaining methods of least waste. It not only saves useless labor, but it improves labor conditions; improves quality of product; prolongs the period of the worker\'s productivity; conserves, teaches and transfers skill and experience." — Frank Bunker Gilbreth, Sr., 1913',
        'Want to know more about the easy and quick result solutions? Follow a course about time study to learn more!'
      ]
    },
    {
      id: 'where-should-companies-focus-on-to-stay-competitive',
      title: 'Where should companies focus on to stay competitive?',
      date: 'November 20, 2022',
      author: 'Ives De Saeger',
      tags: ['flow', 'i4.0', 'MTM-UAS', 'time study'],
      image: 'blog2.png',
      readTime: '4 min read',
      content: [
        'A straight forward answer would be to offer the lowest price which convinces customers to buy the product. It is a strong argument in these times of rising prices, insufficient amounts of resources and a shortage on experienced employees.',
        'However I think there is more to focus on. From the top of my head:',
        '1. Maintain and invest in experienced employees (and thus reduce an endless loop of training new employees that do not stay).\n2. Consolidate improvements.\n3. Higher output from machines, IoT and people so that data is accessible and connected with various aspects of a company.\n4. More efficiently use the available capacity of employees.\n5. Reduce waste (including energy costs).\n6. Reduce existing stock stored in every plant.',
        'All these aspects are linked with quality, innovation and customer satisfaction.',
        'On which one should companies focus the most? Or are there any other important aspects I missed?'
      ]
    },
    {
      id: 'why-doing-a-lot-of-improvements-might-work-against-you',
      title: 'Why Doing a Lot of Improvements in your Company Might Work Against You!',
      date: 'January 8, 2021',
      author: 'Ives De Saeger',
      tags: ['CI', 'flow', 'MTM-UAS', 'new normal', 'SMED', 'time study'],
      image: 'blog3.jpg',
      readTime: '6 min read',
      content: [
        'Because I have been doing a lot of improvements for companies the past couple of decades, I thought it was time to clarify some misunderstandings about doing too many improvements in your company. And also share some tips what to do instead.',
        'These are the most common misunderstandings regarding having a large network. I get you out of the illusion right away:',
        'Doing a lot of improvements does NOT mean that you save money.\nDoing a lot of improvements does NOT mean that employees are more concerned about your business.\nDoing a lot of improvements does NOT mean that your customers are served better.\nDoing a lot of improvements does NOT mean that you are innovating.\nDoing a lot of improvements does NOT mean that your people understand the problem and find a good solution for it (but a temporal one!)\nAllocating improvements to departments does NOT mean that you will actually solve it.',
        'Before I dive into the reasons why and share a few tips, we need to take a step back. At the foundation of these misunderstandings there is usually the desire to reach a certain goal. These are the most important ones: Acquiring more customers, Decreasing costs, Improving employee involvement.',
        'The reasoning is: the more projects I do, the faster or easier I can reach my goal of a good company. The first fallacy or misinterpretation is in the sentence "the more projects I do." Because it isn\'t about how many projects you do, but to tackle those projects that have the biggest financial return and the number customers are increasing!',
        'I call that the scalability factor of the improvement projects. It boils down to the fact that before you decide you will start a project, these three conditions need to be sufficiently fulfilled:',
        'Customer increase: will this improvement project help my customers with time or quality savings, so this will lead to attract more customers?\nOverall investment: will this project bring me more money than I put into it?\nCulture: does this project create trust within the population of employees and will they trust that you treat others with respect?',
        'Misunderstanding 1: "The more projects I do, the more gain I will have." This is probably the most widespread misunderstanding because it is contra-intuitive. In fact the more projects you do you\'ll lead the focus of the company away and do more so-called improvement than you will have losses.',
        'Misunderstanding 2: "The more projects I do mean that employees are more concerned about your business." Unfortunately, people are not motivated by something exterior and being obliged doesn\'t help at all!',
        'Misunderstanding 3: "The more projects I do the better customers are served." If a project is successful, it usually is a decrease of costs and not a gain for customers.',
        'Misunderstanding 4: "It is not because I do improvements I innovate!" What is often overlooked is that taking a project improvement lacks the possibility of innovation because the question is not deeply enough examined.',
        'Misunderstanding 5: "Allocating projects to departments will bring good solutions and speed!" Many departments will try to find a solution they can tackle inside their department, thus creating a local solution.',
        '10 Tips What To Do Instead:\n\n1. Reflect on what you have learned in a project and look for a fit with another one, calculate every project with money gained!\n2. Try to analyze deeper how something works — use more elegant function models and RCA+ that are elements from TRIZ.\n3. First make an overview of how many resources you put in what process.\n4. Think of value in your projects first — what will be the benefit for the customer?\n5. Analyze how many mistakes does the process deliver?\n6. Understand throughput — how long does it take for an order to pass the company?\n7. Does every customer want the same?\n8. How can I connect the solutions to a broader understanding of my company?\n9. What technology can scale up this production process?\n10. Many of the old ways of thinking can be replaced with an Industry 4.0 solution that will scale up.',
        'So don\'t take the internal improvements to its maximum — you can gain more with increase of revenue than decreasing costs. Look for the "right" project to tackle instead of as much as possible.',
        'Don\'t imitate, innovate!'
      ]
    }
  ];

  ngOnInit() {
    this.allPosts = this.posts;
    const slug = this.route.snapshot.paramMap.get('slug');
    this.post = this.posts.find(p => p.id === slug) ?? null;
  }

  get otherPosts(): BlogPost[] {
    return this.allPosts.filter(p => p.id !== this.post?.id);
  }
}

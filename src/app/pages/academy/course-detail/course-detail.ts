import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface CourseModule {
  title: string;
  duration: string;
  description: string;
}

interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string[];
  image: string;
  duration: string;
  level: string;
  modules: CourseModule[];
  price: string;
  tags: string[];
  instructor: string;
  rating: number;
  students: number;
  whatYouLearn: string[];
  prerequisites: string[];
}

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-detail.html',
  styleUrls: ['./course-detail.css']
})
export class CourseDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  course: Course | null = null;
  allCourses: Course[] = [];
  expandedModule: number | null = null;

  private readonly courses: Course[] = [
    {
      id: 'lean-manufacturing-4-0',
      title: 'Lean Manufacturing 4.0',
      subtitle: 'From Classic Lean to Digital Lean',
      description: 'Master the evolution of Lean principles in the era of Industry 4.0.',
      longDescription: [
        'This comprehensive program bridges the gap between traditional Lean Manufacturing and the digital revolution sweeping through modern industry. You will learn how the foundational principles established by Toyota have evolved to incorporate IoT sensors, machine learning, and real-time analytics.',
        'Every module is built around real factory data from our consulting projects. You won\'t just learn theory — you\'ll analyze actual production lines, identify waste using both traditional Gemba walks and digital dashboards, and design improvement strategies that leverage the full power of connected manufacturing.',
        'By the end of this course, you will have a complete digital Lean toolkit and the confidence to lead transformation projects in any industrial setting. You\'ll understand how to build a culture of continuous improvement that is amplified by technology, not replaced by it.'
      ],
      image: 'CrossRoads-22-1-scaled-1.jpg',
      duration: '8 weeks',
      level: 'Intermediate',
      modules: [
        { title: 'The Evolution of Lean: From TPS to Industry 4.0', duration: '45 min', description: 'Trace the journey from Toyota Production System to smart factories. Understand how each industrial revolution has shaped Lean thinking.' },
        { title: 'Value Stream Mapping in Connected Factories', duration: '60 min', description: 'Learn to create value stream maps that incorporate data flows alongside material flows. Use IoT sensor data to create living VSMs.' },
        { title: 'Digital Waste Identification with Sensor Analytics', duration: '55 min', description: 'Go beyond the 7 wastes. Discover how real-time data reveals hidden waste patterns that traditional observation misses.' },
        { title: 'Smart Kanban and Pull Systems', duration: '50 min', description: 'Design intelligent pull systems that adapt in real-time based on demand signals, inventory levels, and production capacity.' },
        { title: 'Predictive Maintenance Integration', duration: '65 min', description: 'Implement a predictive maintenance framework that reduces unplanned downtime and integrates with your Lean flow.' },
        { title: 'Visual Management 2.0 — Digital Andon', duration: '45 min', description: 'Build digital visual management systems that provide instant transparency across multi-site operations.' },
        { title: 'Kaizen Events with Data-Driven Decisions', duration: '70 min', description: 'Run improvement events powered by analytics. Learn to set KPIs, track progress in real-time, and validate results statistically.' },
        { title: 'Standard Work in Automated Environments', duration: '50 min', description: 'Develop standard work procedures for human-robot collaborative workstations. Balance flexibility with precision.' },
        { title: 'Quality at the Source with AI Vision Systems', duration: '55 min', description: 'Implement AI-powered quality inspection that catches defects in milliseconds, reducing rework and customer complaints.' },
        { title: 'Building Your Digital Lean Roadmap', duration: '60 min', description: 'Create a phased implementation plan for your facility. Prioritize investments and build the business case for digital Lean.' },
        { title: 'Change Management for Digital Transformation', duration: '45 min', description: 'Navigate the human side of technology adoption. Build buy-in from the shop floor to the boardroom.' },
        { title: 'Capstone Project: Your Factory Blueprint', duration: '90 min', description: 'Apply everything you\'ve learned to design a comprehensive digital Lean transformation plan for a real or simulated factory.' }
      ],
      price: '€1,490',
      tags: ['Lean', 'Industry 4.0', 'IoT'],
      instructor: 'Ives De Saeger',
      rating: 4.9,
      students: 342,
      whatYouLearn: [
        'Apply Lean principles in digitally connected factory environments',
        'Create data-driven Value Stream Maps using IoT sensor data',
        'Design smart pull systems and digital visual management boards',
        'Implement predictive maintenance within a Lean framework',
        'Run Kaizen events powered by real-time analytics',
        'Build a phased digital Lean transformation roadmap',
        'Lead change management for technology adoption in manufacturing',
        'Use AI-powered quality systems to achieve zero-defect production'
      ],
      prerequisites: [
        'Basic understanding of manufacturing processes',
        'Familiarity with Lean fundamentals (helpful but not required)',
        'Access to a computer with internet connection'
      ]
    },
    {
      id: 'time-study-mastery',
      title: 'Time Study Mastery',
      subtitle: 'MTM-UAS & Predetermined Time Systems',
      description: 'Deep dive into predetermined time study methods.',
      longDescription: [
        'This advanced course takes you deep into the science of work measurement. Beginning with the pioneering work of Frank and Lillian Gilbreth, you\'ll trace the evolution of time study from film cameras to digital video analysis and AI-assisted motion recognition.',
        'You\'ll master the major predetermined time systems — MTM-1, MTM-UAS, MOST, and Modapts — understanding when to apply each method and how to combine them for maximum accuracy. Each system is taught through hands-on exercises using real production footage.',
        'The course culminates in a practical project where you\'ll conduct a complete time study of a real workstation, identify opportunities for motion economy improvement, and design an optimized workflow that could yield 15-30% productivity gains.'
      ],
      image: 'CrossRoads-29-scaled.jpg',
      duration: '6 weeks',
      level: 'Advanced',
      modules: [
        { title: 'History of Time Study: From Gilbreth to Today', duration: '50 min', description: 'The fascinating history of motion study and predetermined time systems, and why these 100-year-old principles are more relevant than ever.' },
        { title: 'MTM-1 Fundamentals', duration: '70 min', description: 'Master the basic motions of MTM-1: Reach, Move, Turn, Grasp, Position, Release, Disengage. Learn to analyze and code each motion element.' },
        { title: 'MTM-UAS for Modern Manufacturing', duration: '65 min', description: 'Apply MTM-UAS (Universal Analyzing System) to batch and series production. Understand the coding system and time calculations.' },
        { title: 'MOST and Modapts Comparison', duration: '55 min', description: 'Compare MOST (Maynard Operation Sequence Technique) and Modapts. Learn when each system provides the best results.' },
        { title: 'Video Analysis Techniques', duration: '60 min', description: 'Use modern video analysis tools to capture and study work cycles. Learn frame-by-frame analysis and time allocation methods.' },
        { title: 'Principles of Motion Economy', duration: '55 min', description: 'Apply Barnes\' principles of motion economy to design ergonomic, efficient workstations that maximize both productivity and worker comfort.' },
        { title: 'Allowances and Performance Rating', duration: '50 min', description: 'Understand personal, fatigue, and delay allowances. Learn objective performance rating techniques for fair standard setting.' },
        { title: 'Ergonomic Workstation Design', duration: '60 min', description: 'Design workstations that optimize both productivity and ergonomic safety. Apply the science of motion to create better work environments.' },
        { title: 'Digital Time Study Tools', duration: '45 min', description: 'Explore modern software tools for time study, from mobile apps to AI-powered motion recognition systems.' },
        { title: 'Capstone: Complete Workstation Analysis', duration: '90 min', description: 'Conduct a full time study of a production workstation, identify improvements, and present your optimized workflow design.' }
      ],
      price: '€1,290',
      tags: ['Time Study', 'MTM-UAS', 'Ergonomics'],
      instructor: 'Ives De Saeger',
      rating: 4.8,
      students: 218,
      whatYouLearn: [
        'Master MTM-1, MTM-UAS, MOST, and Modapts time study methods',
        'Conduct professional video-based motion analysis',
        'Apply the principles of motion economy to any workstation',
        'Set fair and accurate time standards with proper allowances',
        'Design ergonomically optimized workstations',
        'Use digital tools to streamline the time study process'
      ],
      prerequisites: [
        'Basic understanding of manufacturing processes',
        'Interest in productivity improvement and ergonomics',
        'Video recording capability (smartphone is sufficient)'
      ]
    },
    {
      id: 'theory-of-constraints',
      title: 'Theory of Constraints',
      subtitle: 'The Goal — Applied to Modern Manufacturing',
      description: 'Unlock the power of TOC to identify and eliminate bottlenecks.',
      longDescription: [
        'Based on Eli Goldratt\'s groundbreaking work, this course teaches you to see your entire operation through the lens of constraints. You\'ll learn that optimizing everywhere is actually counter-productive — the key is to identify and exploit the one constraint that limits your entire system.',
        'Through a series of simulations and case studies drawn from real manufacturing environments, you\'ll practice the Five Focusing Steps and learn to apply Drum-Buffer-Rope scheduling to achieve dramatic improvements in throughput without additional investment.',
        'By course end, you\'ll think differently about production planning, inventory management, and process improvement. You\'ll have the tools to find the leverage point in any system and multiply your improvement efforts by focusing where it truly matters.'
      ],
      image: 'hero_backgournd.jpg',
      duration: '5 weeks',
      level: 'Intermediate',
      modules: [
        { title: 'Introduction to Systems Thinking', duration: '45 min', description: 'See the forest, not just the trees. Learn to analyze operations as interconnected systems rather than isolated processes.' },
        { title: 'The Five Focusing Steps', duration: '60 min', description: 'Master the core TOC methodology: Identify, Exploit, Subordinate, Elevate, and Repeat. Apply each step with real examples.' },
        { title: 'Finding the Constraint', duration: '55 min', description: 'Develop the skill to quickly identify the bottleneck in any operation using data analysis and direct observation techniques.' },
        { title: 'Drum-Buffer-Rope Scheduling', duration: '65 min', description: 'Implement DBR scheduling to synchronize your entire operation to the constraint. Learn buffer management and rope mechanisms.' },
        { title: 'Throughput Accounting', duration: '50 min', description: 'Replace traditional cost accounting with Throughput Accounting. Make better investment decisions based on system-wide impact.' },
        { title: 'TOC in Practice: Multi-Site Operations', duration: '60 min', description: 'Apply TOC to complex, multi-site supply chains. Identify and manage constraints that span multiple facilities.' },
        { title: 'Critical Chain Project Management', duration: '55 min', description: 'Apply TOC to project management. Reduce project durations by 25% using buffer management and critical chain concepts.' },
        { title: 'Capstone: Constraint Analysis Project', duration: '90 min', description: 'Conduct a complete constraint analysis of a production system, develop an exploitation strategy, and present your improvement plan.' }
      ],
      price: '€990',
      tags: ['TOC', 'Flow', 'Bottleneck Analysis'],
      instructor: 'Ives De Saeger',
      rating: 4.7,
      students: 189,
      whatYouLearn: [
        'Apply the Five Focusing Steps to any production system',
        'Implement Drum-Buffer-Rope scheduling for improved flow',
        'Use Throughput Accounting for better decision making',
        'Manage constraints across multi-site operations',
        'Apply Critical Chain to project management',
        'Identify and exploit bottlenecks using data-driven methods'
      ],
      prerequisites: [
        'Basic understanding of production planning',
        'No prior TOC knowledge required',
        'Curiosity about systems thinking'
      ]
    },
    {
      id: 'smed-quick-changeover',
      title: 'SMED Quick Changeover',
      subtitle: 'Single-Minute Exchange of Dies',
      description: 'Reduce changeover times by up to 90%.',
      longDescription: [
        'Changeover time is one of the biggest hidden wastes in manufacturing. This practical course teaches you Shigeo Shingo\'s revolutionary SMED (Single-Minute Exchange of Dies) methodology — a systematic approach that routinely reduces changeover times by 50-90%.',
        'Through video analysis of real changeover operations and step-by-step methodology application, you\'ll learn to distinguish between internal and external setup operations, convert internal to external, and streamline all remaining elements.',
        'The result? Smaller batch sizes, more flexibility, less inventory, and faster response to customer demand. SMED is one of the highest-ROI improvements you can make in any production environment.'
      ],
      image: 'ives-microfoon-334x500-1.jpg',
      duration: '4 weeks',
      level: 'Beginner',
      modules: [
        { title: 'The Cost of Changeover: Why SMED Matters', duration: '40 min', description: 'Understand the true cost of long changeovers: excess inventory, inflexibility, and hidden capacity loss.' },
        { title: 'Internal vs External Setup Operations', duration: '55 min', description: 'Master the fundamental SMED concept: separating internal (machine stopped) from external (machine running) activities.' },
        { title: 'Converting Internal to External Setup', duration: '60 min', description: 'Learn techniques to convert internal setup operations to external ones, dramatically reducing machine downtime.' },
        { title: 'Streamlining All Setup Operations', duration: '50 min', description: 'Optimize remaining setup operations through parallel operations, standardized fixtures, and elimination of adjustments.' },
        { title: 'Video Analysis of Changeover Operations', duration: '65 min', description: 'Practice SMED analysis using real changeover video footage. Identify improvement opportunities frame by frame.' },
        { title: 'Capstone: SMED Implementation Plan', duration: '75 min', description: 'Develop a complete SMED implementation plan for a changeover operation, including timeline, resources, and expected results.' }
      ],
      price: '€790',
      tags: ['SMED', 'Setup Reduction', 'Flexibility'],
      instructor: 'Ives De Saeger',
      rating: 4.9,
      students: 275,
      whatYouLearn: [
        'Apply the complete SMED methodology step by step',
        'Reduce changeover times by 50-90%',
        'Convert internal setup to external setup operations',
        'Use video analysis for changeover improvement',
        'Calculate the financial impact of changeover reduction',
        'Build a business case for SMED investment'
      ],
      prerequisites: [
        'No prior experience required — perfect for beginners',
        'Basic familiarity with manufacturing environments',
        'Willingness to observe and analyze processes'
      ]
    },
    {
      id: 'digital-twin-simulation',
      title: 'Digital Twin & Simulation',
      subtitle: 'Build Virtual Factories That Think',
      description: 'Create physics-based digital twins of your production lines.',
      longDescription: [
        'Digital Twins are not just 3D models — they are living, data-connected replicas of your physical systems that can predict, optimize, and evolve. This advanced course teaches you to build, validate, and leverage digital twins for decision-making.',
        'Starting with the fundamentals of discrete event simulation, you\'ll progress through process modeling, data integration, scenario testing, and AI-enhanced optimization. Each module uses industry-standard tools and real production data.',
        'By course end, you\'ll be able to create digital twins that answer critical questions: What happens if we add a shift? Where should we invest in automation? What\'s the impact of a layout change? Test before you invest.'
      ],
      image: 'old_slide_3.jpg',
      duration: '10 weeks',
      level: 'Advanced',
      modules: [
        { title: 'Introduction to Digital Twins', duration: '50 min', description: 'What are digital twins, and how do they differ from simulations? Understand the maturity model from descriptive to prescriptive twins.' },
        { title: 'Discrete Event Simulation Fundamentals', duration: '65 min', description: 'Master the building blocks of factory simulation: entities, resources, queues, and process logic.' },
        { title: 'Process Modeling & Data Integration', duration: '70 min', description: 'Learn to model production processes with accurate cycle times, distributions, and interconnections. Integrate live data feeds.' },
        { title: 'Layout Optimization with Simulation', duration: '60 min', description: 'Test layout changes virtually before moving a single machine. Optimize material flow and minimize transport waste.' },
        { title: 'Workforce Modeling & Scheduling', duration: '55 min', description: 'Model human resources with realistic skill levels, fatigue, and scheduling constraints. Optimize shift patterns and staffing levels.' },
        { title: 'Scenario Analysis & What-If Testing', duration: '65 min', description: 'Run hundreds of scenarios to test investment decisions, capacity changes, and demand fluctuations before committing resources.' },
        { title: 'IoT Sensor Integration in Twins', duration: '60 min', description: 'Connect your digital twin to real-time sensor data for live monitoring, anomaly detection, and automatic model calibration.' },
        { title: 'AI-Enhanced Optimization', duration: '70 min', description: 'Apply machine learning algorithms to your digital twin for automated optimization of schedules, buffers, and resources.' },
        { title: 'Supply Chain Digital Twins', duration: '55 min', description: 'Extend the digital twin concept beyond the factory to model end-to-end supply chains with multi-tier supplier networks.' },
        { title: 'Multi-Site Twin Networks', duration: '50 min', description: 'Connect digital twins across multiple facilities for global visibility and coordinated optimization.' },
        { title: 'ROI of Digital Twins', duration: '45 min', description: 'Build a compelling business case for digital twin investment. Calculate ROI and develop a phased implementation roadmap.' },
        { title: 'Advanced Predictive Analytics', duration: '65 min', description: 'Leverage your digital twin for predictive maintenance, quality prediction, and demand forecasting.' },
        { title: 'Edge Computing for Real-Time Twins', duration: '50 min', description: 'Deploy edge computing solutions for ultra-low-latency twin synchronization in time-critical operations.' },
        { title: 'Capstone: Factory Digital Twin Project', duration: '120 min', description: 'Build a complete digital twin of a production facility, integrate data, run scenarios, and present optimization recommendations.' }
      ],
      price: '€1,890',
      tags: ['Digital Twin', 'Simulation', 'AI'],
      instructor: 'Ives De Saeger',
      rating: 4.6,
      students: 134,
      whatYouLearn: [
        'Build physics-based digital twins of production systems',
        'Master discrete event simulation techniques',
        'Integrate IoT sensor data for live digital twins',
        'Apply AI and machine learning for automated optimization',
        'Run scenario analyses to de-risk investment decisions',
        'Create supply chain digital twins for end-to-end visibility',
        'Build the business case for digital twin investment',
        'Deploy edge computing for real-time twin synchronization'
      ],
      prerequisites: [
        'Strong understanding of manufacturing processes',
        'Basic data analysis skills',
        'Comfort with software tools and technology',
        'Prior experience with process improvement is helpful'
      ]
    },
    {
      id: 'operational-excellence',
      title: 'Operational Excellence',
      subtitle: 'The Complete Operations Framework',
      description: 'A comprehensive framework covering the full operations spectrum.',
      longDescription: [
        'Operational Excellence is not a destination — it\'s a way of operating. This expert-level course provides a comprehensive framework that integrates the best of Lean, Six Sigma, Theory of Constraints, and Industry 4.0 into a cohesive operating system for your enterprise.',
        'Led by Ives De Saeger, this intensive 12-week program covers everything from value stream design to leadership development. You\'ll learn to build an organization that doesn\'t just improve — it evolves autonomously.',
        'This is the flagship course of the P41 Academy. It represents 25 years of consulting wisdom distilled into 18 modules. Graduates of this program lead transformation initiatives at some of the world\'s most respected industrial companies.'
      ],
      image: 'blog1.png',
      duration: '12 weeks',
      level: 'Expert',
      modules: [
        { title: 'The OpEx Operating Model', duration: '55 min', description: 'Understand the complete Operational Excellence framework and how all elements connect to create a self-improving organization.' },
        { title: 'Strategic Value Stream Design', duration: '70 min', description: 'Go beyond mapping to designing the ideal future state value stream. Align operations with strategic business objectives.' },
        { title: 'Standard Work & Visual Management', duration: '60 min', description: 'Create standard work that enables improvement. Build visual management systems that make abnormalities instantly visible.' },
        { title: 'Problem Solving Methodologies', duration: '65 min', description: 'Master A3 thinking, PDCA, 8D, and TRIZ for structured problem solving at every level of the organization.' },
        { title: 'Flow Design & One-Piece Flow', duration: '55 min', description: 'Design production systems for flow rather than batch. Understand the profound impact of one-piece flow on quality and lead time.' },
        { title: 'Total Productive Maintenance (TPM)', duration: '60 min', description: 'Implement TPM to maximize equipment effectiveness. Build autonomous maintenance capabilities in your production teams.' },
        { title: 'Six Sigma Integration', duration: '65 min', description: 'Integrate Six Sigma statistical tools into your OpEx framework. Use data-driven methods for process capability improvement.' },
        { title: 'Supply Chain Excellence', duration: '55 min', description: 'Extend OpEx beyond the four walls. Build responsive supply chain partnerships and optimize end-to-end flow.' },
        { title: 'Digital Enabling Technologies', duration: '60 min', description: 'Leverage Industry 4.0 technologies to amplify OpEx results. Understand where technology creates value versus complexity.' },
        { title: 'Leadership for OpEx', duration: '70 min', description: 'Develop the leadership behaviors that sustain continuous improvement. Learn Gemba leadership and coaching kata.' },
        { title: 'Building CI Culture', duration: '55 min', description: 'Create a culture where improvement is everyone\'s job. Design CI systems that generate and implement ideas at scale.' },
        { title: 'Hoshin Kanri — Policy Deployment', duration: '65 min', description: 'Align the entire organization with Hoshin Kanri. Deploy strategy to every level and track progress with X-matrices.' },
        { title: 'Performance Management Systems', duration: '50 min', description: 'Design KPI cascades and daily management systems that drive the right behaviors at every level.' },
        { title: 'Change Management at Scale', duration: '60 min', description: 'Lead large-scale transformation programs. Navigate resistance, build coalitions, and sustain momentum over years.' },
        { title: 'Innovation & Disruption', duration: '55 min', description: 'Balance operational efficiency with innovation capability. Create space for experimentation within disciplined operations.' },
        { title: 'Sustainability & Green Operations', duration: '50 min', description: 'Integrate environmental sustainability into your OpEx program. Reduce waste, energy, and emissions while improving profitability.' },
        { title: 'Multi-Site Deployment Strategies', duration: '65 min', description: 'Scale OpEx across multiple facilities and regions. Design deployment waves, model lines, and knowledge transfer mechanisms.' },
        { title: 'Capstone: OpEx Transformation Blueprint', duration: '120 min', description: 'Design a complete Operational Excellence transformation program for your organization, including strategy, deployment plan, and metrics.' }
      ],
      price: '€2,490',
      tags: ['OpEx', 'VSM', 'Leadership'],
      instructor: 'Ives De Saeger',
      rating: 4.8,
      students: 156,
      whatYouLearn: [
        'Design and deploy a complete Operational Excellence operating system',
        'Master value stream design and one-piece flow principles',
        'Lead organizational change and build CI culture',
        'Apply Hoshin Kanri for strategy deployment',
        'Integrate Lean, Six Sigma, and TOC into a unified framework',
        'Build performance management and daily management systems',
        'Scale OpEx across multiple sites and regions',
        'Leverage Industry 4.0 to amplify improvement results'
      ],
      prerequisites: [
        'Management or senior engineering experience',
        'Prior exposure to Lean or continuous improvement',
        'Passion for organizational development and leadership',
        'Commitment to the full 12-week program'
      ]
    }
  ];

  ngOnInit() {
    this.allCourses = this.courses;
    const courseId = this.route.snapshot.paramMap.get('courseId');
    this.course = this.courses.find(c => c.id === courseId) ?? null;
  }

  get otherCourses(): Course[] {
    return this.allCourses.filter(c => c.id !== this.course?.id).slice(0, 3);
  }

  toggleModule(index: number) {
    this.expandedModule = this.expandedModule === index ? null : index;
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getTotalDuration(): string {
    if (!this.course) return '';
    let totalMinutes = 0;
    for (const m of this.course.modules) {
      const match = m.duration.match(/(\d+)/);
      if (match) totalMinutes += parseInt(match[1], 10);
    }
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return `${hours}h ${mins}m`;
  }
}

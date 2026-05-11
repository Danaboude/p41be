const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.course.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.user.deleteMany();

  // Create Admin User
  const adminEmail = process.env['ADMIN_EMAIL'] || 'ives@p41.be';
  const adminPass = process.env['ADMIN_PASSWORD'] || 'ives-abdulkareem';

  const passwordHash = await bcrypt.hash(adminPass, 10);
  await prisma.user.create({
    data: {
      email: adminEmail,
      passwordHash: passwordHash
    }
  });

  const sharedImage = 'https://www.blomconsultancy.nl/wp-content/uploads/2016/09/Makigami_brown-paper-768x576.png';

  const courses = [
    {
      title: 'Makigami — From Paper to Digitalization',
      subtitle: 'Analyzing information flow through processes',
      description: 'Learn the Makigami technique to map administrative processes and identify opportunities for digitalization and simplification.',
      longDescription: [
        'Makigami (Japanese for "roll of paper") is a powerful tool for visualizing and improving business processes, particularly in administrative and service environments. This course teaches you how to map out every step of a process to identify waste, bottlenecks, and non-value-added activities.',
        'Using a business game simulation, you will experience first-hand how Makigami helps reduce lead times and improve quality. You will learn to calculate lead times, identify "Failure Demand," and translate the map into a functional improvement plan.',
        'This course is essential for anyone looking to bridge the gap between physical paper-based workflows and efficient digital processes.'
      ],
      image: sharedImage,
      duration: '2 days',
      level: 'Intermediate',
      modules: [
        { title: 'Introduction to Makigami', duration: '2h', description: 'Understanding the philosophy and basic building blocks.' },
        { title: 'Business Game Simulation', duration: '4h', description: 'Applying Makigami in a safe, interactive environment.' },
        { title: 'Analyzing Lead Times', duration: '2h', description: 'Calculating processing time vs waiting time.' }
      ],
      price: 'Free',
      isPaid: false,
      tags: ['Lean', 'Process Mapping', 'Makigami'],
      instructor: 'Ives De Saeger',
      rating: 4.9,
      students: 0,
      whatYouLearn: [
        'How to create a professional Makigami process map',
        'Distinguishing between Added Value and Non-Added Value',
        'Calculating and reducing process lead times',
        'Identifying and eliminating Failure Demand'
      ]
    },
    {
      title: 'Team Decision Making',
      subtitle: 'Facilitating effective group decisions',
      description: 'Master the techniques needed to lead teams toward consensus and effective decision-making in complex situations.',
      longDescription: [
        'In today\'s complex business environment, team decisions are often more robust than individual ones. However, group decision-making comes with its own set of challenges, from "groupthink" to analysis paralysis.',
        'This course provides facilitators, coaches, and leaders with a toolkit of techniques to manage the decision-making process. You will learn methods like the Delphi technique, the Six Thinking Hats, and finacial impact weighting.',
        'Through active participation and real-world cases, you\'ll learn how to involve the right people at the right time to reach satisfying results efficiently.'
      ],
      image: sharedImage,
      duration: '1 day',
      level: 'Intermediate',
      modules: [
        { title: 'Foundations of Group Decision Making', duration: '3h', description: 'Phases of the decision process and group pitfalls.' },
        { title: 'Decision Toolkit', duration: '3h', description: 'Delphi method, Choice matrices, and Brainstorming.' },
        { title: 'The Six Thinking Hats', duration: '2h', description: 'Deep dive into Edward de Bono\'s famous method.' }
      ],
      price: 'Free',
      isPaid: false,
      tags: ['Management', 'Teams', 'Leadership'],
      instructor: 'Ives De Saeger',
      rating: 4.8,
      students: 0,
      whatYouLearn: [
        'Managing the phases of a decision-making process',
        'Applying various techniques for different types of problems',
        'Using the Six Thinking Hats for structured team thinking',
        'Avoiding common group decision pitfalls'
      ]
    },
    {
      title: 'Fool-Proof Solutions (Poka Yoke)',
      subtitle: 'Pragmatic error reduction in production',
      description: 'Learn how to design and implement simple, low-cost "Poka Yoke" devices to prevent errors before they occur.',
      longDescription: [
        'Errors are human, but defects don\'t have to be. Poka Yoke is a technique for creating "fail-safe" mechanisms that either prevent an error from occurring or make it immediately obvious.',
        'This course focuses on practical, hands-on solutions rather than complex root cause analysis. We look at mechanical, visual, and technological methods to ensure a process can only be performed correctly.',
        'Ideal for production managers and engineers who want to make a real impact on quality with pragmatic, ingenious solutions.'
      ],
      image: sharedImage,
      duration: '2.5 days',
      level: 'Advanced',
      modules: [
        { title: 'Principles of Poka Yoke', duration: '3h', description: 'The philosophy of fail-safe design.' },
        { title: 'Types of Error Proofing', duration: '4h', description: 'Contact, fixed-value, and motion-step methods.' },
        { title: 'Technological Alternatives', duration: '4h', description: 'Sensors and visual control systems.' }
      ],
      price: 'Free',
      isPaid: false,
      tags: ['Quality', 'Poka Yoke', 'Error Proofing'],
      instructor: 'Ives De Saeger',
      rating: 4.9,
      students: 0,
      whatYouLearn: [
        'Distinguishing between errors and defects',
        'Designing mechanical and electronic Poka Yokes',
        'Applying Jidoka and Nudging principles',
        'Implementing low-cost error-prevention devices'
      ]
    },
    {
      title: 'Building a Continuous Improvement Culture',
      subtitle: 'Systematic approach for CI departments',
      description: 'A practical guide for managers to establish and sustain a culture of ongoing improvement in their organization.',
      longDescription: [
        'Many organizations struggle with "improvement fatigue." This course addresses how to set up a sustainable Continuous Improvement (CI) department and culture from the ground up.',
        'Based on 25 years of experience, we look at the keys to success: alignment with KPI\'s, choosing the right methodology (Lean, ISO, Six Sigma), and engaging the workforce.',
        'You will learn how to facilitate improvement groups and track progress to ensure long-term gains in efficiency and safety.'
      ],
      image: sharedImage,
      duration: '1.5 days',
      level: 'Intermediate',
      modules: [
        { title: 'Keys to CI Success', duration: '3h', description: 'Measuring what matters and defining KPI\'s.' },
        { title: 'Choosing Your Methodology', duration: '3h', description: 'Lean vs Six Sigma vs ISO - what fits your company?' },
        { title: 'Engaging Improvement Groups', duration: '3h', description: 'How to start and sustain local improvement teams.' }
      ],
      price: 'Free',
      isPaid: false,
      tags: ['Culture', 'Continuous Improvement', 'Management'],
      instructor: 'Ives De Saeger',
      rating: 4.7,
      students: 0,
      whatYouLearn: [
        'Setting up a CI infrastructure from scratch',
        'Linking improvements directly to business KPI\'s',
        'Facilitating and leading improvement workshops',
        'Identifying and overcoming "thinking errors" in CI'
      ]
    },
    {
      title: 'Yamazumi — Reducing Balance Losses',
      subtitle: 'Balancing work for optimal flow',
      description: 'Master the Yamazumi method to balance tasks across workstations and eliminate idle time in your processes.',
      longDescription: [
        'Imbalance in a process leads to either inventory build-up or idle time. Yamazumi (Japanese for "stack up") is a visual tool used to balance tasks in a cell or on a line.',
        'This course teaches you how to break down work into elements, categorize them (Value Add, Non-Value Add, Waste), and re-distribute them to meet the Takt time.',
        'We cover the complexities of high-mix, low-volume production and how to handle variability in task times.'
      ],
      image: sharedImage,
      duration: '1 day',
      level: 'Intermediate',
      modules: [
        { title: 'The Concept of Balancing', duration: '3h', description: 'Takt time vs Cycle time vs Lead time.' },
        { title: 'Yamazumi Mapping', duration: '3h', description: 'Visualizing work stacks for multiple products.' },
        { title: 'Strategies for Reduction', duration: '2h', description: 'How to eliminate balance losses efficiently.' }
      ],
      price: 'Free',
      isPaid: false,
      tags: ['Flow', 'Yamazumi', 'Balancing'],
      instructor: 'Ives De Saeger',
      rating: 4.8,
      students: 0,
      whatYouLearn: [
        'Normalizing time measurements for balancing',
        'Using Yamazumi to visualize work distribution',
        'Handling high variability and product mix',
        'Strategies to eliminate idle time and bottlenecks'
      ]
    },
    {
      title: 'Lean Thinking: Intro & Value Stream Mapping',
      subtitle: 'Master the fundamentals of Lean and VSM',
      description: 'A comprehensive introduction to Lean principles and the power of Value Stream Mapping (VSM) to transform your production.',
      longDescription: [
        'Lean Thinking is more than just tools; it\'s a mindset focused on the customer. This course combines a business game simulation with the technical skills of Value Stream Mapping.',
        'You will learn to see waste, identify bottlenecks, and map out the flow of both materials and information. We cover key concepts like Kanban, One-Piece Flow, and Heijunka.',
        'The second day focuses on applying VSM to your own company cases, formulating concrete improvement plans for a "Future State" map.'
      ],
      image: sharedImage,
      duration: '2 days',
      level: 'Beginner',
      modules: [
        { title: 'Lean Foundations & Business Game', duration: '8h', description: 'Experiencing Lean principles in action.' },
        { title: 'Value Stream Mapping (VSM)', duration: '4h', description: 'Mapping current vs future states.' },
        { title: 'Waste Elimination (MUDA)', duration: '4h', description: 'Techniques to remove the 7 types of waste.' }
      ],
      price: 'Free',
      isPaid: false,
      tags: ['Lean', 'VSM', 'Flow'],
      instructor: 'Ives De Saeger',
      rating: 5.0,
      students: 0,
      whatYouLearn: [
        'Applying Lean principles in a real-world context',
        'Creating professional Current and Future State maps',
        'Identifying and eliminating bottlenecks and waste',
        'Implementing Kanban and Pull systems'
      ]
    },
    {
      title: 'Value & Failure Demand (John Seddon)',
      subtitle: 'Applying Systems Thinking to customer service',
      description: 'Discover John Seddon\'s Systems Thinking approach to understand what customers want and eliminate "Failure Demand".',
      longDescription: [
        'John Seddon\'s approach challenges traditional "command and control" management. This course focuses on "Failure Demand" — demand caused by a failure to do something right for the customer.',
        'You will learn how to analyze customer interactions to distinguish between Value Demand (what they actually want) and Failure Demand (complaints, status checks, etc.).',
        'By applying Systems Thinking, you can radically simplify processes, improve service, and reduce costs simultaneously.'
      ],
      image: sharedImage,
      duration: '1.5 days',
      level: 'Intermediate',
      modules: [
        { title: 'Introduction to Systems Thinking', duration: '4h', description: 'Beyond command and control.' },
        { title: 'Analyzing Demand', duration: '4h', description: 'Failure Demand vs Value Demand.' },
        { title: 'Practical Experiments', duration: '4h', description: 'Testing the theories in your own department.' }
      ],
      price: 'Free',
      isPaid: false,
      tags: ['Systems Thinking', 'Management', 'Customer Service'],
      instructor: 'Ives De Saeger',
      rating: 4.9,
      students: 0,
      whatYouLearn: [
        'Measuring and reducing Failure Demand',
        'Designing services based on customer Value Demand',
        'Applying Dr. Deming\'s principles to modern management',
        'Moving from "Command and Control" to Systems Thinking'
      ]
    },
    {
      title: 'Process Hacking: Simple over Technology',
      subtitle: 'Low-cost innovation for production issues',
      description: 'Learn how to solve complex production problems using simple, existing resources before investing in expensive technology.',
      longDescription: [
        'Under the motto "it doesn\'t always have to be expensive technology," this course teaches a hacker mindset for process improvement.',
        'You will learn to use functional modelling and resource analysis to find ingenious solutions within your current environment. We look at inspiring cases where simple changes led to massive results.',
        'If technology is eventually needed, you will know exactly what to buy because you\'ve understood the problem at its most fundamental level.'
      ],
      image: sharedImage,
      duration: '1 day',
      level: 'Intermediate',
      modules: [
        { title: 'The Hacker Mindset', duration: '3h', description: 'Difference between process innovation and I4.0.' },
        { title: 'Functional Modeling', duration: '3h', description: 'Breaking down a process to its core functions.' },
        { title: 'Resource Analysis', duration: '2h', description: 'Finding hidden solutions in your current setup.' }
      ],
      price: 'Free',
      isPaid: false,
      tags: ['Innovation', 'Process Hacking', 'Problem Solving'],
      instructor: 'Ives De Saeger',
      rating: 4.8,
      students: 0,
      whatYouLearn: [
        'Applying the hacker mindset to industrial processes',
        'Creating Functional Models to understand problems',
        'Finding and reusing existing resources for solutions',
        'Deciding when to use simple fixes vs high-tech'
      ]
    },
    {
      title: 'Six Sigma Yellow Belt',
      subtitle: 'Introduction to variation reduction',
      description: 'Learn the fundamentals of the DMAIC cycle and basic statistics to start reducing variation and defects in your processes.',
      longDescription: [
        'Six Sigma is the gold standard for quality and variation reduction. This Yellow Belt course introduces the DMAIC (Define, Measure, Analyze, Improve, Control) cycle without the complexity of heavy software.',
        'You will learn basic statistics, Pareto analysis, and SPC (Statistical Process Control) in a practical, hands-on way. We focus on the quality of the formulas rather than just calculations.',
        'By the end of the course, you will understand how to contribute to Six Sigma projects and improve the capability of your processes.'
      ],
      image: sharedImage,
      duration: '2 days',
      level: 'Beginner',
      modules: [
        { title: 'Define & Measure Phases', duration: '4h', description: 'Project definition and data collection.' },
        { title: 'Analyze & Improve Phases', duration: '4h', description: 'Finding root causes and testing solutions.' },
        { title: 'Basic Statistics for Quality', duration: '8h', description: 'Normal distribution, T-tests, and ANOVA.' }
      ],
      price: 'Free',
      isPaid: false,
      tags: ['Six Sigma', 'Quality', 'Statistics'],
      instructor: 'Paul Bertels',
      rating: 4.7,
      students: 0,
      whatYouLearn: [
        'Navigating the full DMAIC cycle',
        'Using Pareto, Ishikawa, and SPC charts',
        'Understanding process capability and variation',
        'Applying basic statistical tests to real-world data'
      ]
    },
    {
      title: 'Pragmatic Change Management',
      subtitle: 'Mastering the human side of improvement',
      description: 'Understand the psychology of change and learn how to overcome resistance to ensure your technical improvements actually stick.',
      longDescription: [
        'Technical solutions often fail because of the human factor. This course bridges the gap between technical engineering and social psychology.',
        'We explore John Seddon\'s views on change, Goldratt\'s 6 levels of resistance, and the Kubler-Ross model of transition. You will learn to navigate group dynamics and individual concerns.',
        'This is a pragmatic guide for leaders who need to "sell" their technical changes to the shop floor and management alike.'
      ],
      image: sharedImage,
      duration: '2 days',
      level: 'Intermediate',
      modules: [
        { title: 'The Psychology of Resistance', duration: '4h', description: 'Understanding why people say no.' },
        { title: 'Change Models & Frameworks', duration: '4h', description: 'Seddon, Goldratt, and Kubler-Ross.' },
        { title: 'Communication for Change', duration: '8h', description: 'Using language and psychology to lead.' }
      ],
      price: 'Free',
      isPaid: false,
      tags: ['Change Management', 'Leadership', 'Psychology'],
      instructor: 'Ives De Saeger',
      rating: 4.9,
      students: 0,
      whatYouLearn: [
        'Identifying and navigating the 6 levels of resistance',
        'Applying psychological insights to industrial change',
        'Communicating technical changes effectively',
        'Building a culture that embraces continuous change'
      ]
    },
    {
      title: 'Mapping Information Flow',
      subtitle: 'Visualizing communication for time efficiency',
      description: 'Learn how to map and optimize the flow of information through your company to reduce meetings and ensure everyone has what they need.',
      longDescription: [
        'Internal communication is often underestimated as a factor in productivity. This course treats communication as a technical process that can be mapped and optimized.',
        'You will learn to identify "Information Waste," visualize data flows, and apply Visual Management techniques. We look at everything from email usage to the physical location of people.',
        'This course provides a toolkit for improving internal communication via "technical" means: clear visuals, structured feedback, and better-timed information.'
      ],
      image: sharedImage,
      duration: '1 day',
      level: 'Intermediate',
      modules: [
        { title: 'Analyzing Communication Waste', duration: '3h', description: 'Finding bottlenecks in information flow.' },
        { title: 'Visual Management Techniques', duration: '3h', description: 'Poka Yoke for information.' },
        { title: 'Optimizing Meetings & Feedback', duration: '2h', description: 'Matching meetings with measurements.' }
      ],
      price: 'Free',
      isPaid: false,
      tags: ['Communication', 'Information Flow', 'Visual Management'],
      instructor: 'Ives De Saeger',
      rating: 4.8,
      students: 0,
      whatYouLearn: [
        'Mapping internal information and material flows',
        'Implementing Visual Management and Poka Yoke for info',
        'Reducing unnecessary meetings and "Failure Demand" info',
        'Choosing the right communication channels for the job'
      ]
    },
    {
      title: 'MTM-UAS Predetermined Time Study',
      subtitle: 'Quantifying work without a stopwatch',
      description: 'Master the international standard for predetermined time study. Learn to code human work with precision and scientific rigour.',
      longDescription: [
        'MTM-UAS is the world\'s most widely used predetermined time system. Unlike traditional stop-watching, it uses standard codes for basic human motions, eliminating the need for "performance rating."',
        'This intensive course takes you from motion fundamentals (Get, Place, Body Motions) to complex motion combinations. You will learn to create Function Value Maps (FVM) that link time directly to cost.',
        'The course concludes with a formal exam, ensuring you can independently and accurately code processes in your own factory.'
      ],
      image: sharedImage,
      duration: '4 days',
      level: 'Advanced',
      modules: [
        { title: 'Introduction to MTM-UAS', duration: '8h', description: 'History and basic motion coding.' },
        { title: 'Complex Actions & Combinations', duration: '8h', description: 'Tools, operations, and simultaneous motions.' },
        { title: 'Function Value Mapping (FVM)', duration: '8h', description: 'Turning time codes into financial insights.' },
        { title: 'Final Certification Exam', duration: '8h', description: 'Theory and film-based coding exam.' }
      ],
      price: 'Free',
      isPaid: false,
      tags: ['Time Study', 'MTM-UAS', 'Industrial Engineering'],
      instructor: 'Ives De Saeger',
      rating: 4.8,
      students: 0,
      whatYouLearn: [
        'Coding any manual task using MTM-UAS standards',
        'Building Function Value Maps to calculate labor costs',
        'Conducting professional film-based motion analysis',
        'Standardizing work methods based on scientific data'
      ]
    },
    {
      title: 'Improve Flow with Smarter Layout',
      subtitle: 'Plant organization for maximum speed',
      description: 'Learn to design factory layouts that support flow, minimize transport, and create a better environment for your teams.',
      longDescription: [
        'Speed is critical in modern production. This course focuses on the physical organization of your plant to support "One-Piece Flow" and minimize waste.',
        'Using simulation games, you will experience the impact of different layouts (functional vs cellular). We cover Kanban, Polca, and Sociotechnical design.',
        'You will learn to use "Speed Value Maps" to identify where orders are stuck and how to organize teams and equipment to get them moving faster.'
      ],
      image: sharedImage,
      duration: '2 days',
      level: 'Intermediate',
      modules: [
        { title: 'Factors of Flow', duration: '4h', description: 'Kanban, WIP, and Polca systems.' },
        { title: 'Simulation Game', duration: '4h', description: 'Experiencing different layout structures.' },
        { title: 'Sociotechnical Design', duration: '8h', description: 'Designing for both machines and humans.' }
      ],
      price: 'Free',
      isPaid: false,
      tags: ['Layout', 'Flow', 'Logistics'],
      instructor: 'Ives De Saeger',
      rating: 4.9,
      students: 0,
      whatYouLearn: [
        'Designing process-oriented rather than functional layouts',
        'Using Speed Value Maps to find lead-time bottlenecks',
        'Implementing cellular manufacturing and team structures',
        'Optimizing material transport and product carriers'
      ]
    },
    {
      title: 'Quick Changeover (SMED+)',
      subtitle: 'Technical analysis for faster setups',
      description: 'Go beyond traditional SMED. Learn the technical and data-driven methods to radically reduce machine changeover times.',
      longDescription: [
        'While traditional SMED focuses on organization, "SMED+" focuses on technical insight. This course deep-dives into the mechanical and control aspects of machine setup.',
        'We look at how to eliminate bolts, reduce transport, and use "Smart Knowledge" (data) to eliminate the need for manual adjustments and "fine-tuning" after a change.',
        'Through practical exercises on your own machines, you will develop a step-by-step plan for breakthrough reductions in setup time.'
      ],
      image: sharedImage,
      duration: '2 days',
      level: 'Advanced',
      modules: [
        { title: 'Deep Technical Analysis', duration: '4h', description: 'Functional thinking for machinery.' },
        { title: 'Smart Technology Solutions', duration: '4h', description: 'Mechanical changes to speed up steps.' },
        { title: 'Eliminating Adjustments', duration: '8h', description: 'Using data to get it right first time.' }
      ],
      price: 'Free',
      isPaid: false,
      tags: ['SMED', 'Changeover', 'Maintenance'],
      instructor: 'Ives De Saeger',
      rating: 4.8,
      students: 0,
      whatYouLearn: [
        'Applying SMED+ technical analysis to any machine',
        'Designing mechanical changes to eliminate adjustments',
        'Using Smart Knowledge to achieve "first part right"',
        'Building a roadmap for radically faster changeovers'
      ]
    },
    {
      title: 'Innovation & Risk in Product Design',
      subtitle: 'TRIZ, DFA, FMEA, and VAVE Mastery',
      description: 'A powerful 4-day program covering the most effective techniques for creative design, risk reduction, and cost optimization.',
      longDescription: [
        'Designing successful products requires balancing innovation, risk, and cost. This comprehensive course covers four critical methodologies in depth.',
        'TRIZ for creative problem solving, DFA (Design for Assembly) for easier manufacturing, FMEA for risk management, and VAVE (Value Analysis/Engineering) for cost optimization.',
        'You will apply these techniques to your own product designs to find alternative solutions that are cheaper, faster, and more reliable.'
      ],
      image: sharedImage,
      duration: '4 days',
      level: 'Advanced',
      modules: [
        { title: 'TRIZ: Inventive Problem Solving', duration: '16h', description: 'Systematic creativity and contradictions.' },
        { title: 'Design for Assembly (DFA)', duration: '8h', description: 'Reducing parts and assembly time.' },
        { title: 'FMEA & VAVE', duration: '8h', description: 'Risk assessment and value-based engineering.' }
      ],
      price: 'Free',
      isPaid: false,
      tags: ['Design', 'TRIZ', 'FMEA', 'Innovation'],
      instructor: 'Ives De Saeger',
      rating: 5.0,
      students: 0,
      whatYouLearn: [
        'Applying TRIZ inventive principles to technical conflicts',
        'Reducing part counts and assembly time using DFA',
        'Conducting professional FMEA risk assessments',
        'Optimizing product cost vs value using VAVE'
      ]
    },
    {
      title: 'Pragmatic Error Reduction',
      subtitle: 'A critical look at quality approach',
      description: 'Learn to use "common sense" and pragmatic tools to get variation under control and help operators make fewer mistakes.',
      longDescription: [
        'Quality isn\'t just about checking boxes; it\'s about learning how to see. This course focuses on simple, powerful ways to reduce errors based on the book "The Pubescent Leader."',
        'We look at defect value mapping to calculate the true cost of errors and use "Parameter Modelling" to understand what causes variation.',
        'This is a hands-on course that includes individual coaching for each participating company to apply the techniques directly to their shop floor.'
      ],
      image: sharedImage,
      duration: '2 days',
      level: 'Intermediate',
      modules: [
        { title: 'Traditional vs Pragmatic Quality', duration: '4h', description: 'Questioning the status quo.' },
        { title: 'Defect Value Mapping', duration: '4h', description: 'Calculating the financial impact of errors.' },
        { title: 'Parameter Modelling', duration: '8h', description: 'Finding the real drivers of variation.' }
      ],
      price: 'Free',
      isPaid: false,
      tags: ['Quality', 'Error Reduction', 'Process Control'],
      instructor: 'Ives De Saeger',
      rating: 4.8,
      students: 0,
      whatYouLearn: [
        'Creating Defect Value Maps to prioritize quality issues',
        'Modeling process parameters to find root causes of variation',
        'Implementing pragmatic checklists and questionnaires',
        'Applying "Common Sense" to complex quality problems'
      ]
    },
    {
      title: 'FMEA Risk Reduction',
      subtitle: 'Technical analysis via AIAG VDA 2019',
      description: 'Master the latest standards of Failure Mode and Effects Analysis to proactively identify and mitigate risks in your processes.',
      longDescription: [
        'This FMEA course goes beyond simple brainstorming. We use a technical, structured approach that complies with the AIAG VDA 2019 standard.',
        'You will learn to distinguish between Failure Modes, Causes, and Effects, and use functional modelling to visualize risks. The focus is on finding real solutions, not just filling in spreadsheets.',
        'We spend a full day working on your own internal company cases to ensure the technique is applied correctly where it matters most.'
      ],
      image: sharedImage,
      duration: '2 days',
      level: 'Advanced',
      modules: [
        { title: 'The FMEA Framework', duration: '4h', description: 'AIAG VDA 2019 standards and terminology.' },
        { title: 'Functional Modeling for Risk', duration: '4h', description: 'Visualizing failure chains.' },
        { title: 'Action Planning', duration: '8h', description: 'Developing and tracking mitigation strategies.' }
      ],
      price: 'Free',
      isPaid: false,
      tags: ['FMEA', 'Risk Management', 'Safety'],
      instructor: 'Ives De Saeger',
      rating: 4.9,
      students: 0,
      whatYouLearn: [
        'Conducting FMEA according to the latest global standards',
        'Linking Failure Modes to specific technical Causes',
        'Prioritizing risks based on Severity, Occurrence, and Detection',
        'Developing robust action plans to eliminate high risks'
      ]
    },
    {
      title: 'Industry 4.0 Readiness for SMEs',
      subtitle: 'Cutting through the hype to find value',
      description: 'A realistic guide for SMEs to understand the real opportunities of Industry 4.0 without getting lost in the "buzzwords".',
      longDescription: [
        'What is a Digital Twin? What is the difference between AI and Machine Learning? This course cuts through the hype to find the real business value for SMEs.',
        'You will learn to identify opportunities for digitalization that actually improve your service or revenue. We perform a GAP analysis on your current state and build a realistic plan of action.',
        'The focus is on how to integrate new technology with your existing "old" patterns and how to lead your people through the transition.'
      ],
      image: sharedImage,
      duration: '1 day',
      level: 'Intermediate',
      modules: [
        { title: 'Demystifying the Buzzwords', duration: '4h', description: 'AI, Blockchain, IIoT, and Digital Twins.' },
        { title: 'Opportunity Analysis', duration: '2h', description: 'Where can I4.0 actually make money for you?' },
        { title: 'GAP Analysis & Roadmap', duration: '2h', description: 'Building your first plan of action.' }
      ],
      price: 'Free',
      isPaid: false,
      tags: ['Industry 4.0', 'Digitalization', 'Strategy'],
      instructor: 'Ives De Saeger',
      rating: 4.7,
      students: 0,
      whatYouLearn: [
        'Understanding the core technologies of Industry 4.0',
        'Identifying specific business cases for digitalization',
        'Building a culture of innovation in an SME environment',
        'Creating a pragmatic GAP analysis and action plan'
      ]
    },
    {
      title: 'Smart Manufacturing: Method to Technology',
      subtitle: 'Step-by-step evolution to a smarter factory',
      description: 'Learn how to use "add-on" technology to upgrade your existing machines and processes to Smart Manufacturing standards.',
      longDescription: [
        'You don\'t have to throw everything away to become a smart factory. This course focuses on "add-on" technologies that provide immediate gains in quality and flow.',
        'We look at awareness of what\'s possible, auditing your current potential, and discussing real-world cases from startups and established companies.',
        'The goal is to re-formulate your KMO\'s challenges into solvable technological steps that make your production truly SMART.'
      ],
      image: sharedImage,
      duration: '3 days',
      level: 'Advanced',
      modules: [
        { title: 'Awareness: What is Possible?', duration: '8h', description: 'Overview of affordable I4.0 solutions.' },
        { title: 'The SMART Audit', duration: '8h', description: 'Analyzing your plant for improvement potential.' },
        { title: 'Case Discussions', duration: '8h', description: 'Brainstorming solutions for your own challenges.' }
      ],
      price: 'Free',
      isPaid: false,
      tags: ['Smart Manufacturing', 'Industry 4.0', 'Technology'],
      instructor: 'Ives De Saeger',
      rating: 4.9,
      students: 0,
      whatYouLearn: [
        'Identifying "low-hanging fruit" for technological upgrades',
        'Auditing your factory for smart manufacturing potential',
        'Applying "add-on" technology to legacy equipment',
        'Designing a step-by-step SMART evolution roadmap'
      ]
    },
    {
      title: 'Performance Improvement for SMEs',
      subtitle: 'Real-time results via data and connectivity',
      description: 'Learn to use dashboards, sensors, and real-time data to steer your company results in the right direction.',
      longDescription: [
        'Stop managing your company with monthly paper reports. This course teaches "Ultra-connectivity" — using real-time data to steer your strategy.',
        'You will learn to build KPI systems that are actually linked to customer parameters and use sensors for real-time measurement in the shop floor.',
        'We cover everything from "lagging" vs "leading" indicators to using XR charts for customer results. A pragmatic guide for leaders who want data-driven success.'
      ],
      image: sharedImage,
      duration: '2 days',
      level: 'Intermediate',
      modules: [
        { title: 'Target Deployment', duration: '4h', description: 'Linking strategy to operation.' },
        { title: 'Real-time Measurement', duration: '4h', description: 'Using sensors and dashboards.' },
        { title: 'KPI Systems that Work', duration: '8h', description: 'Building the BSC and 4-Block approach.' }
      ],
      price: 'Free',
      isPaid: false,
      tags: ['KPI', 'Strategy', 'Management'],
      instructor: 'Ives De Saeger / Paul Bertels',
      rating: 4.8,
      students: 0,
      whatYouLearn: [
        'Building a real-time KPI dashboard for your SME',
        'Using sensors and IoT for pragmatic shop-floor data',
        'Applying strategy deployment to operational targets',
        'Empowering teams with clear, real-time performance data'
      ]
    },
    {
      title: '5S Workplace Organisation',
      subtitle: 'Practical application for an orderly workshop',
      description: 'Go beyond just cleaning. Learn the technical and preventive aspects of 5S to create a workspace that supports flow and safety.',
      longDescription: [
        'The 5S system (Sort, Set in order, Shine, Standardize, Sustain) is the foundation of any efficient workspace. This course focuses on "Next Generation 5S".',
        'We don\'t just clean; we look at redesigning processes to eliminate the *need* for tools, using materials that don\'t create dirt, and implementing preventive visual management.',
        'Using a global exercise, you will practice all three phases of 5S: active, effective, and preventive, ensuring the improvements actually stick.'
      ],
      image: sharedImage,
      duration: '2 days',
      level: 'Beginner',
      modules: [
        { title: 'The 5 Steps of Classic 5S', duration: '4h', description: 'Sorting, Shaking, and Sustaining.' },
        { title: 'Preventive 5S+', duration: '4h', description: 'Redesigning to avoid waste and dirt.' },
        { title: 'Global 5S Exercise', duration: '8h', description: 'Hands-on application in the training center.' }
      ],
      price: 'Free',
      isPaid: false,
      tags: ['5S', 'Lean', 'Organisation'],
      instructor: 'Ives De Saeger',
      rating: 4.9,
      students: 0,
      whatYouLearn: [
        'Implementing the full 5S system in any environment',
        'Moving from "cleaning" to "preventive organization"',
        'Using Visual Management for instant status checks',
        'Applying psychological tips to ensure 5S discipline sticks'
      ]
    }
  ];

  for (const course of courses) {
    await prisma.course.create({ data: course });
  }

  // Sample Blog Posts
  const blogPosts = [
    {
      title: 'Getting back to basics',
      excerpt: 'We are looking at the year 1910. More than 113 years ago! A brilliant analyst called Frank B Gilbreth started using film cameras...',
      content: ['In 1910, factory management was revolutionized...', 'Frank Gilbreth discovered that waste could be identified through visual study...'],
      image: 'blog1.png',
      date: 'Jan 2, 2023',
      readTime: '5 min read',
      tags: ['History', 'Efficiency']
    }
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post });
  }

  console.log('Seed completed successfully with 21 courses');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

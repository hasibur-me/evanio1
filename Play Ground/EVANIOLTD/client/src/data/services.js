import {
  Briefcase,
  Building2,
  Globe,
  Palette,
  CreditCard,
  Landmark,
  Share2,
  TrendingUp,
  Bot
} from 'lucide-react';

export const allServices = [
  {
    id: 'business-consultancy',
    slug: 'business-consultancy',
    icon: Briefcase,
    title: 'Business Consultancy',
    description: 'Professional business guidance, strategy planning, and personalized startup support.',
    longDescription: 'Get expert business consultancy services tailored to your specific needs. Our experienced consultants provide strategic planning, market analysis, business model development, and ongoing guidance to help your business succeed.',
    benefits: [
      'Strategic business planning and roadmap development',
      'Market research and competitive analysis',
      'Business model optimization',
      'Financial planning and budgeting guidance',
      'Risk assessment and mitigation strategies',
      'Ongoing advisory support',
    ],
    pricing: {
      starter: '$299',
      professional: '$599',
      enterprise: 'Custom Quote',
    },
    faqs: [
      {
        question: 'What is included in business consultancy?',
        answer: 'Our business consultancy includes strategic planning, market analysis, business model development, financial planning guidance, and ongoing advisory support tailored to your needs.',
      },
      {
        question: 'How long does a consultancy engagement last?',
        answer: 'Consultancy engagements can range from one-time sessions to ongoing monthly support, depending on your needs and preferences.',
      },
      {
        question: 'Do you provide industry-specific consultancy?',
        answer: 'Yes, our consultants have experience across various industries and can provide specialized guidance based on your sector.',
      },
    ],
  },
  {
    id: 'business-formation',
    slug: 'business-formation',
    icon: Building2,
    title: 'Business Formation',
    description: 'LLC/LTD setup, legal documentation, EIN/TIN, and complete company registration.',
    longDescription: 'Start your business the right way with our comprehensive business formation services. We handle LLC/LTD setup, legal documentation, EIN/TIN applications, and complete company registration to get you started quickly and correctly.',
    benefits: [
      'Complete LLC/LTD registration',
      'Legal documentation preparation',
      'EIN/TIN application assistance',
      'Registered agent service',
      'Operating agreement creation',
      'Business license guidance',
    ],
    pricing: {
      starter: '$299',
      professional: '$499',
      enterprise: '$799',
    },
    faqs: [
      {
        question: 'How long does business formation take?',
        answer: 'Business formation typically takes 5-7 business days, depending on your state and the type of entity you choose.',
      },
      {
        question: 'What documents do I need?',
        answer: 'We\'ll guide you through all required documents. Typically, you\'ll need identification, business name, and basic business information.',
      },
      {
        question: 'Do you handle state-specific requirements?',
        answer: 'Yes, we handle business formation in all 50 states and are familiar with state-specific requirements and regulations.',
      },
    ],
  },
  {
    id: 'website-development',
    slug: 'website-development',
    icon: Globe,
    title: 'Website Development',
    description: 'Modern, fast, responsive websites tailored to your business needs.',
    longDescription: 'Get a professional, modern website that converts visitors into customers. Our websites are fast, responsive, SEO-optimized, and tailored to your business needs.',
    benefits: [
      'Modern, responsive design',
      'Fast loading times',
      'SEO optimization',
      'Mobile-friendly',
      'Content management system',
      'Ongoing support and updates',
    ],
    pricing: {
      starter: '$999',
      professional: '$2,499',
      enterprise: 'Custom Quote',
    },
    faqs: [
      {
        question: 'How long does website development take?',
        answer: 'Website development typically takes 2-3 weeks for a standard site, depending on complexity and features.',
      },
      {
        question: 'Do you provide hosting and domain services?',
        answer: 'Yes, we can help you set up hosting and domain registration, or work with your existing setup.',
      },
      {
        question: 'Can you integrate third-party services?',
        answer: 'Absolutely! We can integrate payment gateways, CRM systems, analytics tools, and more.',
      },
    ],
  },
  {
    id: 'logo-branding',
    slug: 'logo-branding',
    icon: Palette,
    title: 'Logo & Branding',
    description: 'Unique brand identity design including logos, color palettes, and visual styles.',
    longDescription: 'Create a memorable brand identity that stands out. We design unique logos, color palettes, typography, and complete brand guidelines that reflect your business values.',
    benefits: [
      'Custom logo design',
      'Brand color palette',
      'Typography selection',
      'Brand guidelines document',
      'Multiple logo variations',
      'Social media assets',
    ],
    pricing: {
      starter: '$499',
      professional: '$999',
      enterprise: '$1,999',
    },
    faqs: [
      {
        question: 'How many logo concepts do you provide?',
        answer: 'Our starter package includes 3 initial concepts. You can request revisions until you\'re completely satisfied.',
      },
      {
        question: 'What files do I receive?',
        answer: 'You\'ll receive all logo files in multiple formats (PNG, SVG, PDF) and sizes for various use cases.',
      },
      {
        question: 'Do you provide brand guidelines?',
        answer: 'Yes, we create comprehensive brand guidelines that include color usage, typography, logo usage rules, and more.',
      },
    ],
  },
  {
    id: 'payment-gateway-setup',
    slug: 'payment-gateway-setup',
    icon: CreditCard,
    title: 'Payment Gateway Setup',
    description: 'Stripe, PayPal, Wise, Payoneer, and other gateway integrations for global businesses.',
    longDescription: 'Accept payments from customers worldwide with our payment gateway setup service. We integrate Stripe, PayPal, Wise, Payoneer, and other payment processors into your website or platform.',
    benefits: [
      'Multiple payment gateway options',
      'Secure payment processing',
      'Global payment acceptance',
      'Recurring billing setup',
      'Payment analytics integration',
      'Compliance and security',
    ],
    pricing: {
      starter: '$199',
      professional: '$399',
      enterprise: '$799',
    },
    faqs: [
      {
        question: 'Which payment gateways do you support?',
        answer: 'We support Stripe, PayPal, Wise, Payoneer, Square, and many other major payment processors.',
      },
      {
        question: 'How long does payment gateway setup take?',
        answer: 'Payment gateway setup typically takes 3-5 business days, depending on your chosen gateway and business verification requirements.',
      },
      {
        question: 'Do you help with merchant account approval?',
        answer: 'Yes, we assist with merchant account applications and help you through the approval process.',
      },
    ],
  },
  {
    id: 'bank-account-assistance',
    slug: 'bank-account-assistance',
    icon: Landmark,
    title: 'Bank Account Opening Assistance',
    description: 'Guidance and support in opening online or international business bank accounts.',
    longDescription: 'Navigate the complexities of opening business bank accounts with our expert assistance. We help you find the right bank, prepare required documents, and guide you through the entire process.',
    benefits: [
      'Bank selection guidance',
      'Document preparation assistance',
      'Application support',
      'International account options',
      'Online banking setup',
      'Ongoing account management support',
    ],
    pricing: {
      starter: '$299',
      professional: '$599',
      enterprise: 'Custom Quote',
    },
    faqs: [
      {
        question: 'Can you help with international bank accounts?',
        answer: 'Yes, we provide assistance with opening international business bank accounts for global businesses.',
      },
      {
        question: 'What documents are typically required?',
        answer: 'Required documents vary by bank and country, but typically include business formation documents, identification, proof of address, and business registration.',
      },
      {
        question: 'How long does the process take?',
        answer: 'The process typically takes 1-2 weeks for domestic accounts and 2-4 weeks for international accounts, depending on bank requirements.',
      },
    ],
  },
  {
    id: 'social-media-setup',
    slug: 'social-media-setup',
    icon: Share2,
    title: 'Social Media Setup',
    description: 'Professional Facebook, Instagram, TikTok, and LinkedIn page creation and optimization.',
    longDescription: 'Establish a professional social media presence across all major platforms. We create and optimize your Facebook, Instagram, TikTok, and LinkedIn pages with engaging content and proper setup.',
    benefits: [
      'Professional page creation',
      'Brand-consistent profile design',
      'Optimized bios and descriptions',
      'Initial content posting',
      'Hashtag research',
      'Social media strategy guide',
    ],
    pricing: {
      starter: '$199',
      professional: '$399',
      enterprise: '$799',
    },
    faqs: [
      {
        question: 'Which social media platforms do you cover?',
        answer: 'We set up and optimize profiles for Facebook, Instagram, TikTok, LinkedIn, Twitter, and other platforms you need.',
      },
      {
        question: 'Do you provide ongoing content?',
        answer: 'Our setup package includes initial content. We also offer ongoing content creation and management services.',
      },
      {
        question: 'Can you help with social media advertising?',
        answer: 'Yes, we can help you set up and manage social media advertising campaigns across all platforms.',
      },
    ],
  },
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    icon: TrendingUp,
    title: 'Digital Marketing',
    description: 'Full-service marketing: ad campaigns, SEO, content strategy, and growth support.',
    longDescription: 'Drive growth with our comprehensive digital marketing services. We handle ad campaigns, SEO optimization, content strategy, social media marketing, and provide ongoing growth support.',
    benefits: [
      'Google Ads and Facebook Ads campaigns',
      'SEO optimization',
      'Content marketing strategy',
      'Email marketing campaigns',
      'Social media marketing',
      'Analytics and reporting',
    ],
    pricing: {
      starter: '$499',
      professional: '$1,299',
      enterprise: 'Custom Quote',
    },
    faqs: [
      {
        question: 'What digital marketing channels do you cover?',
        answer: 'We cover Google Ads, Facebook/Instagram Ads, SEO, content marketing, email marketing, social media marketing, and more.',
      },
      {
        question: 'How long until I see results?',
        answer: 'Results vary by channel. Paid ads can show results immediately, while SEO typically takes 3-6 months to show significant results.',
      },
      {
        question: 'Do you provide monthly reporting?',
        answer: 'Yes, we provide detailed monthly reports showing campaign performance, ROI, and growth metrics.',
      },
    ],
  },
  {
    id: 'ai-automation-integration',
    slug: 'ai-automation-integration',
    icon: Bot,
    title: 'AI Automation & Integration',
    description: 'Helping businesses integrate AI tools, automation, and intelligent workflows into their everyday operations.',
    longDescription: 'Transform your business operations with AI automation and intelligent workflows. We help you integrate AI tools, automate repetitive tasks, and build intelligent systems that save time and increase efficiency.',
    benefits: [
      'AI tool integration',
      'Workflow automation',
      'Chatbot development',
      'Data analytics automation',
      'Customer service automation',
      'Process optimization',
    ],
    pricing: {
      starter: '$699',
      professional: '$1,999',
      enterprise: 'Custom Quote',
    },
    faqs: [
      {
        question: 'What AI tools can you integrate?',
        answer: 'We can integrate various AI tools including ChatGPT, automation platforms, AI analytics tools, chatbots, and custom AI solutions.',
      },
      {
        question: 'How does automation improve my business?',
        answer: 'Automation reduces manual work, minimizes errors, increases efficiency, saves time and costs, and allows your team to focus on strategic tasks.',
      },
      {
        question: 'Do you provide training on AI tools?',
        answer: 'Yes, we provide training and documentation to help your team effectively use the AI tools and automation we set up.',
      },
    ],
  },
];

export const getServiceBySlug = (slug) => {
  return allServices.find(service => service.slug === slug);
};

export const getServiceById = (id) => {
  return allServices.find(service => service.id === id);
};




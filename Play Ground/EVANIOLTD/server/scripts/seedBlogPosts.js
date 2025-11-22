import mongoose from 'mongoose';
import dotenv from 'dotenv';
import BlogPost from '../models/BlogPost.js';
import User from '../models/User.js';

dotenv.config();

const blogPosts = [
  {
    title: '10 Steps to Starting Your Business in 2025',
    excerpt: 'A comprehensive guide to launching your business successfully in the new year. Learn the essential steps from business formation to marketing.',
    content: `Starting a business in 2025 requires careful planning and execution. Here are the 10 essential steps to get you started:

1. **Define Your Business Idea**: Clearly articulate what problem you're solving and who your target customers are.

2. **Conduct Market Research**: Understand your competition, target market, and industry trends.

3. **Create a Business Plan**: Outline your business model, financial projections, and growth strategy.

4. **Choose Your Business Structure**: Decide between LLC, Corporation, or Sole Proprietorship based on your needs.

5. **Register Your Business**: Complete all legal requirements including business registration and obtaining necessary licenses.

6. **Set Up Business Banking**: Open a dedicated business bank account to separate personal and business finances.

7. **Build Your Brand**: Create a memorable logo, establish your brand identity, and develop your marketing materials.

8. **Set Up Your Online Presence**: Build a professional website and establish social media profiles.

9. **Implement Payment Processing**: Set up payment gateways to accept customer payments.

10. **Launch and Market**: Execute your launch strategy and begin marketing to your target audience.

Remember, starting a business is a journey. Take it one step at a time and don't hesitate to seek professional help when needed.`,
    category: 'Business Formation',
    tags: ['business', 'startup', 'entrepreneurship', 'planning'],
    status: 'published',
    seo: {
      metaTitle: '10 Steps to Starting Your Business in 2025 | Evanio',
      metaDescription: 'Complete guide to starting your business in 2025. Learn the essential steps from business formation to marketing and launch.',
      keywords: ['start business', 'business formation', 'entrepreneurship', 'startup guide']
    }
  },
  {
    title: 'The Ultimate Guide to Digital Transformation',
    excerpt: 'Learn how to modernize your business processes and stay competitive in the digital age. Discover key strategies for digital transformation.',
    content: `Digital transformation is no longer optional—it's essential for business survival and growth. Here's your comprehensive guide:

**What is Digital Transformation?**
Digital transformation involves integrating digital technology into all areas of your business, fundamentally changing how you operate and deliver value to customers.

**Key Areas of Digital Transformation:**

1. **Customer Experience**: Use digital tools to improve customer interactions and satisfaction.

2. **Operational Processes**: Automate workflows and streamline operations with technology.

3. **Business Models**: Explore new revenue streams and business models enabled by digital technology.

4. **Data and Analytics**: Leverage data to make informed business decisions.

5. **Workforce Enablement**: Equip your team with digital tools and skills.

**Getting Started:**
- Assess your current digital maturity
- Identify areas for improvement
- Develop a transformation roadmap
- Invest in the right technology
- Train your team
- Measure and iterate

Digital transformation is a journey, not a destination. Start small, learn, and scale what works.`,
    category: 'Technology',
    tags: ['digital transformation', 'technology', 'automation', 'innovation'],
    status: 'published',
    seo: {
      metaTitle: 'Digital Transformation Guide for Businesses | Evanio',
      metaDescription: 'Complete guide to digital transformation. Learn how to modernize your business processes and stay competitive.',
      keywords: ['digital transformation', 'business technology', 'automation', 'digital strategy']
    }
  },
  {
    title: 'Building Your Brand: From Logo to Identity',
    excerpt: 'Essential tips for creating a memorable brand that resonates with your audience. Learn how to build a cohesive brand identity.',
    content: `Your brand is more than just a logo—it's the entire experience your customers have with your business. Here's how to build a strong brand:

**1. Define Your Brand Strategy**
- Identify your brand's mission, vision, and values
- Understand your target audience
- Define your unique value proposition
- Research your competition

**2. Create Your Visual Identity**
- Design a memorable logo
- Choose a color palette that reflects your brand personality
- Select typography that matches your brand voice
- Create consistent visual elements

**3. Develop Your Brand Voice**
- Define your brand's personality
- Create brand guidelines
- Ensure consistency across all communications
- Train your team on brand voice

**4. Build Brand Awareness**
- Create a strong online presence
- Engage on social media
- Develop content that reflects your brand
- Build relationships with your audience

**5. Maintain Brand Consistency**
- Use brand guidelines consistently
- Monitor how your brand is represented
- Update your brand as needed
- Stay true to your brand values

Remember, building a brand takes time. Be consistent, authentic, and patient.`,
    category: 'Branding',
    tags: ['branding', 'logo design', 'brand identity', 'marketing'],
    status: 'published',
    seo: {
      metaTitle: 'Brand Building Guide: From Logo to Identity | Evanio',
      metaDescription: 'Learn how to build a memorable brand identity. Essential tips for creating a cohesive brand that resonates with your audience.',
      keywords: ['branding', 'logo design', 'brand identity', 'brand strategy']
    }
  },
  {
    title: 'Payment Gateway Setup: Everything You Need to Know',
    excerpt: 'A detailed walkthrough of setting up payment processing for your business. Learn about different payment gateways and how to choose the right one.',
    content: `Accepting payments online is crucial for modern businesses. Here's everything you need to know about payment gateway setup:

**What is a Payment Gateway?**
A payment gateway is a service that processes credit card payments for online and offline businesses. It acts as the intermediary between your website and the payment processor.

**Popular Payment Gateways:**
- Stripe: Developer-friendly, supports global payments
- PayPal: Widely recognized, easy to use
- Square: Great for in-person and online sales
- Wise: Excellent for international businesses
- Payoneer: Ideal for freelancers and global businesses

**Setting Up a Payment Gateway:**

1. **Choose the Right Gateway**: Consider fees, features, supported countries, and ease of integration.

2. **Create an Account**: Sign up with your chosen payment gateway provider.

3. **Complete Verification**: Provide business documents and complete identity verification.

4. **Integrate with Your Website**: Use APIs or plugins to connect the gateway to your site.

5. **Test Transactions**: Use test mode to ensure everything works correctly.

6. **Go Live**: Switch to production mode and start accepting real payments.

**Best Practices:**
- Ensure PCI compliance
- Use SSL certificates
- Implement fraud protection
- Provide multiple payment options
- Make checkout process simple

Setting up payment processing correctly is essential for your business success.`,
    category: 'Payments',
    tags: ['payment gateway', 'stripe', 'paypal', 'ecommerce'],
    status: 'published',
    seo: {
      metaTitle: 'Payment Gateway Setup Guide | Evanio',
      metaDescription: 'Complete guide to setting up payment processing for your business. Learn about payment gateways and how to choose the right one.',
      keywords: ['payment gateway', 'payment processing', 'stripe setup', 'online payments']
    }
  },
  {
    title: 'Growing Your Business: Strategies That Work',
    excerpt: 'Proven strategies to scale your business and reach new heights. Learn from successful businesses and implement growth strategies.',
    content: `Growing a business requires strategic planning and execution. Here are proven strategies that work:

**1. Focus on Customer Retention**
- It costs 5-25x more to acquire a new customer than retain an existing one
- Implement loyalty programs
- Provide exceptional customer service
- Regularly engage with your customers

**2. Expand Your Product/Service Line**
- Identify complementary products or services
- Test new offerings with existing customers
- Diversify revenue streams
- Stay true to your core brand

**3. Invest in Digital Marketing**
- Build a strong online presence
- Use SEO to attract organic traffic
- Leverage social media marketing
- Implement email marketing campaigns
- Consider paid advertising

**4. Build Strategic Partnerships**
- Partner with complementary businesses
- Join industry associations
- Collaborate on marketing efforts
- Share resources and expertise

**5. Optimize Operations**
- Automate repetitive tasks
- Streamline processes
- Reduce costs where possible
- Improve efficiency

**6. Hire the Right People**
- Build a strong team
- Invest in employee development
- Create a positive company culture
- Delegate effectively

**7. Leverage Technology**
- Use tools to improve productivity
- Implement CRM systems
- Automate workflows
- Analyze data for insights

**8. Expand to New Markets**
- Research new geographic markets
- Adapt your offering for local needs
- Build local partnerships
- Understand cultural differences

Growth takes time and effort. Focus on sustainable growth strategies that align with your business values.`,
    category: 'Growth',
    tags: ['business growth', 'scaling', 'strategy', 'expansion'],
    status: 'published',
    seo: {
      metaTitle: 'Business Growth Strategies That Work | Evanio',
      metaDescription: 'Proven strategies to scale your business. Learn how to grow sustainably and reach new heights.',
      keywords: ['business growth', 'scaling business', 'growth strategies', 'business expansion']
    }
  },
  {
    title: 'Website Development Best Practices for 2025',
    excerpt: 'Stay ahead with the latest web development trends and best practices. Learn what makes a great website in 2025.',
    content: `Web development continues to evolve rapidly. Here are the best practices for 2025:

**1. Mobile-First Design**
- Design for mobile devices first
- Ensure responsive design across all devices
- Optimize for touch interactions
- Test on multiple devices

**2. Performance Optimization**
- Aim for fast page load times (< 3 seconds)
- Optimize images and assets
- Use lazy loading
- Minimize HTTP requests
- Implement caching strategies

**3. SEO Best Practices**
- Use semantic HTML
- Optimize meta tags and descriptions
- Create quality, relevant content
- Ensure fast loading times
- Build quality backlinks
- Use structured data

**4. Accessibility**
- Follow WCAG guidelines
- Ensure keyboard navigation
- Use proper alt text for images
- Ensure sufficient color contrast
- Test with screen readers

**5. Security**
- Use HTTPS
- Implement security headers
- Regular security updates
- Protect against common vulnerabilities
- Use secure authentication methods

**6. User Experience (UX)**
- Intuitive navigation
- Clear call-to-actions
- Fast and responsive
- Easy to use
- Visually appealing

**7. Modern Technologies**
- Use modern frameworks (React, Vue, Next.js)
- Implement Progressive Web Apps (PWA)
- Consider serverless architecture
- Use modern CSS features
- Leverage APIs effectively

**8. Content Management**
- Easy content updates
- SEO-friendly URLs
- Content versioning
- Media management
- User-friendly admin interface

A great website is fast, secure, accessible, and provides an excellent user experience.`,
    category: 'Web Development',
    tags: ['web development', 'website design', 'frontend', 'best practices'],
    status: 'published',
    seo: {
      metaTitle: 'Website Development Best Practices 2025 | Evanio',
      metaDescription: 'Latest web development trends and best practices for 2025. Learn what makes a great website.',
      keywords: ['web development', 'website design', 'frontend development', 'web best practices']
    }
  },
  {
    title: 'AI Automation: Transforming Business Operations',
    excerpt: 'Discover how AI automation can streamline your business processes, reduce costs, and improve efficiency.',
    content: `Artificial Intelligence is revolutionizing how businesses operate. Here's how AI automation can transform your business:

**What is AI Automation?**
AI automation uses artificial intelligence to automate repetitive tasks, make decisions, and improve business processes without human intervention.

**Benefits of AI Automation:**
- **Increased Efficiency**: Automate repetitive tasks
- **Cost Reduction**: Reduce labor costs
- **Improved Accuracy**: Minimize human errors
- **24/7 Operations**: Work around the clock
- **Better Insights**: Analyze data at scale
- **Enhanced Customer Service**: Provide instant responses

**Common AI Automation Use Cases:**

1. **Customer Service**
   - Chatbots for instant support
   - Automated email responses
   - Ticket routing and prioritization

2. **Data Processing**
   - Document processing
   - Data entry automation
   - Report generation

3. **Marketing**
   - Email campaign automation
   - Social media scheduling
   - Content personalization

4. **Sales**
   - Lead qualification
   - Follow-up automation
   - Sales forecasting

5. **Operations**
   - Inventory management
   - Supply chain optimization
   - Quality control

**Getting Started with AI Automation:**
1. Identify repetitive tasks
2. Evaluate automation opportunities
3. Choose the right tools
4. Start with small projects
5. Measure results
6. Scale successful implementations

AI automation is not about replacing humans—it's about empowering them to focus on strategic, creative work.`,
    category: 'Technology',
    tags: ['ai', 'automation', 'artificial intelligence', 'productivity'],
    status: 'published',
    seo: {
      metaTitle: 'AI Automation for Business | Evanio',
      metaDescription: 'Learn how AI automation can transform your business operations, reduce costs, and improve efficiency.',
      keywords: ['ai automation', 'artificial intelligence', 'business automation', 'ai tools']
    }
  },
  {
    title: 'Social Media Marketing: A Complete Guide',
    excerpt: 'Master social media marketing with this comprehensive guide. Learn how to build your presence and engage your audience.',
    content: `Social media marketing is essential for modern businesses. Here's your complete guide:

**Why Social Media Marketing Matters:**
- 4.9 billion people use social media worldwide
- Build brand awareness
- Engage with customers
- Drive website traffic
- Generate leads and sales
- Provide customer support

**Platforms to Consider:**

1. **Facebook**
   - Largest user base
   - Great for B2C businesses
   - Strong advertising platform
   - Groups for community building

2. **Instagram**
   - Visual content platform
   - Great for lifestyle brands
   - Stories and Reels for engagement
   - Shopping features

3. **LinkedIn**
   - Professional network
   - Ideal for B2B businesses
   - Thought leadership platform
   - Professional networking

4. **Twitter/X**
   - Real-time updates
   - News and trends
   - Customer service
   - Quick engagement

5. **TikTok**
   - Short-form video content
   - Younger demographics
   - Viral potential
   - Creative content

**Social Media Strategy:**

1. **Define Your Goals**: What do you want to achieve?
2. **Know Your Audience**: Who are you trying to reach?
3. **Choose Your Platforms**: Focus on 2-3 platforms initially
4. **Create Quality Content**: Provide value to your audience
5. **Post Consistently**: Maintain a regular posting schedule
6. **Engage Actively**: Respond to comments and messages
7. **Analyze Performance**: Track metrics and adjust strategy

**Content Ideas:**
- Educational posts
- Behind-the-scenes content
- User-generated content
- Industry news and insights
- Promotional content
- Interactive content (polls, questions)

**Best Practices:**
- Use high-quality visuals
- Write engaging captions
- Use relevant hashtags
- Post at optimal times
- Engage with your audience
- Monitor and respond to mentions

Social media marketing requires consistency and engagement. Start small, learn what works, and scale your efforts.`,
    category: 'Marketing',
    tags: ['social media', 'marketing', 'digital marketing', 'content marketing'],
    status: 'published',
    seo: {
      metaTitle: 'Social Media Marketing Complete Guide | Evanio',
      metaDescription: 'Master social media marketing with this comprehensive guide. Learn how to build your presence and engage your audience.',
      keywords: ['social media marketing', 'social media strategy', 'digital marketing', 'content marketing']
    }
  },
  {
    title: 'Business Bank Account: Everything You Need to Know',
    excerpt: 'Complete guide to opening a business bank account. Learn about requirements, benefits, and how to choose the right bank.',
    content: `A business bank account is essential for any business. Here's everything you need to know:

**Why You Need a Business Bank Account:**
- Separate personal and business finances
- Professional image
- Easier accounting and tax preparation
- Access to business banking services
- Build business credit
- Accept payments professionally

**Types of Business Bank Accounts:**

1. **Business Checking Account**
   - Day-to-day transactions
   - Write checks
   - Debit card access
   - Online banking

2. **Business Savings Account**
   - Earn interest on deposits
   - Emergency fund
   - Reserve for taxes
   - Long-term savings

3. **Merchant Account**
   - Accept credit card payments
   - Process online transactions
   - Payment gateway integration

**Requirements for Opening a Business Bank Account:**
- Business registration documents
- EIN (Employer Identification Number) or SSN
- Business license (if required)
- Operating agreement (for LLCs)
- Articles of incorporation (for corporations)
- Personal identification
- Proof of address

**Choosing the Right Bank:**
- Compare fees and charges
- Minimum balance requirements
- Transaction limits
- Online banking features
- Customer service quality
- Branch locations
- ATM access

**Online vs. Traditional Banks:**
- **Traditional Banks**: In-person service, established reputation
- **Online Banks**: Lower fees, higher interest rates, convenience

**Tips for Managing Your Business Account:**
- Keep detailed records
- Reconcile regularly
- Monitor transactions
- Set up alerts
- Use accounting software
- Maintain minimum balance
- Review statements monthly

Opening a business bank account is a crucial step in establishing your business. Choose wisely and manage it effectively.`,
    category: 'Business Formation',
    tags: ['banking', 'business account', 'finance', 'business setup'],
    status: 'published',
    seo: {
      metaTitle: 'Business Bank Account Guide | Evanio',
      metaDescription: 'Complete guide to opening a business bank account. Learn about requirements, benefits, and how to choose the right bank.',
      keywords: ['business bank account', 'business banking', 'open business account', 'business finance']
    }
  },
  {
    title: 'E-commerce Success: Building an Online Store',
    excerpt: 'Learn how to build a successful e-commerce store. From product selection to marketing, discover the keys to online retail success.',
    content: `E-commerce continues to grow rapidly. Here's how to build a successful online store:

**Getting Started:**

1. **Choose Your Products**
   - Identify profitable niches
   - Research market demand
   - Source quality products
   - Consider dropshipping vs. inventory

2. **Select Your Platform**
   - Shopify: User-friendly, great for beginners
   - WooCommerce: WordPress-based, flexible
   - BigCommerce: Scalable, feature-rich
   - Custom solution: Maximum control

3. **Design Your Store**
   - Professional, clean design
   - Easy navigation
   - Mobile-responsive
   - Fast loading times
   - Clear product images

4. **Set Up Payment Processing**
   - Multiple payment options
   - Secure checkout
   - Clear pricing
   - Transparent shipping costs

5. **Implement Shipping**
   - Calculate shipping costs
   - Offer multiple options
   - Provide tracking
   - Set clear delivery times

**Marketing Your Store:**

1. **SEO Optimization**
   - Optimize product pages
   - Create quality content
   - Build backlinks
   - Use keywords effectively

2. **Social Media Marketing**
   - Showcase products
   - Engage with audience
   - Run promotions
   - User-generated content

3. **Email Marketing**
   - Welcome series
   - Abandoned cart emails
   - Product recommendations
   - Newsletter campaigns

4. **Paid Advertising**
   - Google Ads
   - Facebook/Instagram Ads
   - Retargeting campaigns
   - Influencer partnerships

**Key Success Factors:**
- Quality products
- Excellent customer service
- Fast shipping
- Easy returns
- Trust and security
- Mobile optimization
- Clear communication

**Common Mistakes to Avoid:**
- Poor product photos
- Complicated checkout
- Hidden costs
- Slow customer service
- Ignoring mobile users
- Weak security

Building a successful e-commerce store takes time and effort. Focus on providing value, building trust, and continuously improving.`,
    category: 'E-commerce',
    tags: ['ecommerce', 'online store', 'retail', 'online business'],
    status: 'published',
    seo: {
      metaTitle: 'E-commerce Success Guide | Evanio',
      metaDescription: 'Learn how to build a successful e-commerce store. From product selection to marketing, discover the keys to online retail success.',
      keywords: ['ecommerce', 'online store', 'online business', 'ecommerce tips']
    }
  }
];

async function seedBlogPosts() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/evanio-ltd');
    console.log('MongoDB connected');

    // Find an admin user to use as author
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.error('No admin user found. Please create an admin user first.');
      process.exit(1);
    }

    console.log(`Using admin user: ${adminUser.email} as author`);

    // Clear existing blog posts (optional - comment out if you want to keep existing posts)
    // await BlogPost.deleteMany({});
    // console.log('Cleared existing blog posts');

    // Create blog posts
    let created = 0;
    let skipped = 0;

    for (const postData of blogPosts) {
      // Check if post with same title already exists
      const existing = await BlogPost.findOne({ title: postData.title });
      if (existing) {
        console.log(`Skipping "${postData.title}" - already exists`);
        skipped++;
        continue;
      }

      // Generate slug from title
      const slug = postData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Ensure unique slug
      let finalSlug = slug;
      let counter = 1;
      while (await BlogPost.findOne({ slug: finalSlug })) {
        finalSlug = `${slug}-${counter}`;
        counter++;
      }

      const post = await BlogPost.create({
        ...postData,
        slug: finalSlug,
        author: adminUser._id,
        publishedAt: new Date()
      });

      console.log(`Created: "${post.title}" (slug: ${post.slug})`);
      created++;
    }

    console.log(`\n✅ Seeding complete!`);
    console.log(`   Created: ${created} posts`);
    console.log(`   Skipped: ${skipped} posts (already exist)`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding blog posts:', error);
    process.exit(1);
  }
}

seedBlogPosts();


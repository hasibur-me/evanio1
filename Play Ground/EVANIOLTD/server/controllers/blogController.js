import BlogPost from '../models/BlogPost.js';
import User from '../models/User.js';

// Create blog post (admin only)
export const createBlogPost = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { title, excerpt, content, featuredImage, category, tags, status, scheduledFor, seo } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    // Generate slug from title
    let slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Ensure unique slug
    let existingPost = await BlogPost.findOne({ slug });
    let counter = 1;
    while (existingPost) {
      slug = `${slug}-${counter}`;
      existingPost = await BlogPost.findOne({ slug });
      counter++;
    }

    const blogPost = await BlogPost.create({
      title,
      slug,
      excerpt: excerpt || '',
      content,
      featuredImage: featuredImage || '',
      author: req.user._id,
      category: category || 'General',
      tags: tags || [],
      status: status || 'draft',
      scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
      publishedAt: status === 'published' ? new Date() : null,
      seo: seo || {}
    });

    res.status(201).json(blogPost);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get published blog posts (public)
export const getPublishedPosts = async (req, res) => {
  try {
    const { category, tag, page = 1, limit = 10, search } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let filter = { status: 'published' };
    
    // Filter by published date (only show posts that should be published now)
    filter.$or = [
      { publishedAt: { $lte: new Date() } },
      { publishedAt: null, createdAt: { $lte: new Date() } }
    ];

    if (category) {
      filter.category = category;
    }

    if (tag) {
      filter.tags = { $in: [tag.toLowerCase()] };
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const [posts, total] = await Promise.all([
      BlogPost.find(filter)
        .populate('author', 'name email')
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      BlogPost.countDocuments(filter)
    ]);

    res.json({
      posts,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get single blog post (public)
export const getBlogPost = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const post = await BlogPost.findOne({ 
      slug,
      status: 'published',
      $or: [
        { publishedAt: { $lte: new Date() } },
        { publishedAt: null }
      ]
    }).populate('author', 'name email profilePicture');

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get blog categories
export const getCategories = async (req, res) => {
  try {
    const categories = await BlogPost.distinct('category', { status: 'published' });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get blog tags
export const getTags = async (req, res) => {
  try {
    const tags = await BlogPost.distinct('tags', { status: 'published' });
    res.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ message: error.message });
  }
};

// Like blog post
export const likeBlogPost = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await BlogPost.findOne({ slug });

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const userId = req.user._id.toString();
    const isLiked = post.likedBy.some(id => id.toString() === userId);

    if (isLiked) {
      post.likedBy = post.likedBy.filter(id => id.toString() !== userId);
      post.likes = Math.max(0, post.likes - 1);
    } else {
      post.likedBy.push(req.user._id);
      post.likes += 1;
    }

    await post.save();
    res.json({ likes: post.likes, isLiked: !isLiked });
  } catch (error) {
    console.error('Error liking blog post:', error);
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all blog posts
export const getAllBlogPosts = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { status, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let filter = {};
    if (status) {
      filter.status = status;
    }

    const [posts, total] = await Promise.all([
      BlogPost.find(filter)
        .populate('author', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      BlogPost.countDocuments(filter)
    ]);

    res.json({
      posts,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    console.error('Error fetching all blog posts:', error);
    res.status(500).json({ message: error.message });
  }
};

// Admin: Update blog post
export const updateBlogPost = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { id } = req.params;
    const updates = req.body;

    const post = await BlogPost.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // If status changed to published, set publishedAt
    if (updates.status === 'published' && post.status !== 'published') {
      updates.publishedAt = new Date();
    }

    Object.assign(post, updates);
    await post.save();

    res.json(post);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ message: error.message });
  }
};

// Admin: Delete blog post
export const deleteBlogPost = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { id } = req.params;
    await BlogPost.findByIdAndDelete(id);

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ message: error.message });
  }
};



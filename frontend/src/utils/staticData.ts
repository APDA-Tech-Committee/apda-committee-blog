// Utility for loading static data files (JSON and Markdown)
import { ref } from 'vue';

// Type definitions for common data structures
export interface Author {
  name: string;
  position?: string;
  email?: string;
  imageUrl?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  publishedAt: string;
  author: Author;
  category: {
    id: string;
    name: string;
    color: string;
  };
  tags?: Array<{
    id: string;
    name: string;
  }>;
  committeeId?: string;
}

export interface Project extends Post {
  projectUrl?: string;
  githubUrl?: string;
}

export interface Committee {
  id: string;
  name: string;
  slug: string;
  description: string;
  aboutContent?: string;
  logoUrl?: string;
  members: Array<{
    id: string;
    name: string;
    position: string;
    imageUrl?: string;
  }>;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio?: string;
  email?: string;
  imageUrl?: string;
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

// Generic file loader
async function loadFile<T>(path: string): Promise<T> {
  try {
    const response = await fetch(path);
    
    if (!response.ok) {
      throw new Error(`Failed to load file: ${path}`);
    }
    
    // Check if it's JSON or Markdown based on extension
    if (path.endsWith('.json')) {
      return await response.json();
    } else if (path.endsWith('.md')) {
      return await response.text() as unknown as T;
    } else {
      throw new Error(`Unsupported file format: ${path}`);
    }
  } catch (error) {
    console.error(`Error loading file ${path}:`, error);
    throw error;
  }
}

// Function to get all posts with pagination
export async function getPosts(page = 1, limit = 12, status = 'PUBLISHED', committeeId?: string) {
  try {
    // First load the index file that contains metadata about all posts
    const indexPath = '/data/posts/index.json';
    const postsIndex = await loadFile<{ posts: Post[] }>(indexPath);
    
    // Filter posts by status (assuming all posts in the index are published in static mode)
    let filteredPosts = postsIndex.posts;
    
    // Filter by committee if specified
    if (committeeId) {
      filteredPosts = filteredPosts.filter(post => post.committeeId === committeeId);
    }
    
    // Sort by publishedAt date, newest first
    filteredPosts.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    
    // Calculate pagination
    const total = filteredPosts.length;
    const pages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
    
    return {
      posts: paginatedPosts,
      pagination: {
        page,
        limit,
        total,
        pages
      }
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      posts: [],
      pagination: {
        page,
        limit,
        total: 0,
        pages: 0
      }
    };
  }
}

// Function to get a single post by slug
export async function getPost(slug: string): Promise<Post> {
  try {
    // First check the index to find the post metadata
    const indexPath = '/data/posts/index.json';
    const postsIndex = await loadFile<{ posts: Post[] }>(indexPath);
    
    // Find the post by slug
    const postMeta = postsIndex.posts.find(post => post.slug === slug);
    
    if (!postMeta) {
      throw new Error(`Post not found: ${slug}`);
    }
    
    // Now load the actual content from the markdown file
    const postPath = `/data/posts/${slug}.md`;
    
    try {
      // Load the content
      const content = await loadFile<string>(postPath);
      
      // Return the full post with content
      return {
        ...postMeta,
        content
      };
    } catch (error) {
      console.error(`Error loading post content for ${slug}:`, error);
      return postMeta;
    }
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    throw error;
  }
}

// Function to get all projects with pagination
export async function getProjects(page = 1, limit = 12, status = 'PUBLISHED', committeeId?: string) {
  try {
    // First load the index file that contains metadata about all projects
    const indexPath = '/data/projects/index.json';
    const projectsIndex = await loadFile<{ projects: Project[] }>(indexPath);
    
    // Filter projects
    let filteredProjects = projectsIndex.projects;
    
    // Filter by committee if specified
    if (committeeId) {
      filteredProjects = filteredProjects.filter(project => project.committeeId === committeeId);
    }
    
    // Sort by publishedAt date, newest first
    filteredProjects.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
    
    // Calculate pagination
    const total = filteredProjects.length;
    const pages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);
    
    return {
      projects: paginatedProjects,
      pagination: {
        page,
        limit,
        total,
        pages
      }
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return {
      projects: [],
      pagination: {
        page,
        limit,
        total: 0,
        pages: 0
      }
    };
  }
}

// Function to get a single project by slug
export async function getProject(slug: string): Promise<Project> {
  try {
    // First check the index to find the project metadata
    const indexPath = '/data/projects/index.json';
    const projectsIndex = await loadFile<{ projects: Project[] }>(indexPath);
    
    // Find the project by slug
    const projectMeta = projectsIndex.projects.find(project => project.slug === slug);
    
    if (!projectMeta) {
      throw new Error(`Project not found: ${slug}`);
    }
    
    // Now load the actual content from the markdown file
    const projectPath = `/data/projects/${slug}.md`;
    
    try {
      // Load the content
      const content = await loadFile<string>(projectPath);
      
      // Return the full project with content
      return {
        ...projectMeta,
        content
      };
    } catch (error) {
      console.error(`Error loading project content for ${slug}:`, error);
      return projectMeta;
    }
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error);
    throw error;
  }
}

// Function to get all committees
export async function getCommittees() {
  const path = '/data/committees/index.json';
  return await loadFile<{ committees: Committee[] }>(path);
}

// Function to get a single committee by slug
export async function getCommittee(slug: string): Promise<Committee> {
  const committeesPath = '/data/committees/index.json';
  const committeesData = await loadFile<{ committees: Committee[] }>(committeesPath);
  
  const committee = committeesData.committees.find(c => c.slug === slug);
  
  if (!committee) {
    throw new Error(`Committee not found: ${slug}`);
  }
  
  // If there's about content, load it from a separate markdown file
  if (committee.aboutContent !== undefined) {
    const aboutPath = `/data/content/${committee.slug}-about.md`;
    const aboutContent = await loadFile<string>(aboutPath);
    committee.aboutContent = aboutContent;
  }
  
  return committee;
}

// Function to get team members
export async function getTeamMembers() {
  const path = '/data/team/index.json';
  return await loadFile<{ members: TeamMember[] }>(path);
}

// Function to get all categories
export async function getCategories() {
  const path = '/data/categories/index.json';
  return await loadFile<{ categories: Category[] }>(path);
}

// Function to get all tags
export async function getTags() {
  const path = '/data/tags/index.json';
  return await loadFile<{ tags: Tag[] }>(path);
}

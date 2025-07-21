import React, { createContext, useState, useEffect } from 'react';
import { blogData as initialBlogData } from '../data/blogData';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('blogs');
    let parsed = [];
    try {
      parsed = stored ? JSON.parse(stored) : [];
    } catch {
      parsed = [];
    }
    setBlogs(Array.isArray(parsed) && parsed.length > 0 ? parsed : initialBlogData);
  }, []);

  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }, [blogs]);

  const addBlog = (blog) => {
    setBlogs(prev => [
      { ...blog, id: Date.now(), tags: blog.tags.split(',').map(t => t.trim()) },
      ...prev
    ]);
  };

  const editBlog = (id, updatedBlog) => {
    setBlogs(prev => prev.map(blog => blog.id === id ? { ...blog, ...updatedBlog, tags: updatedBlog.tags.split(',').map(t => t.trim()) } : blog));
  };

  const deleteBlog = (id) => {
    setBlogs(prev => prev.filter(blog => blog.id !== id));
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, editBlog, deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
}; 
import React, { useState, useEffect, useContext } from 'react';
import { BlogContext } from '../context/BlogContext';
import BlogCard from '../components/BlogCard';

const Home = () => {
  const { blogs } = useContext(BlogContext);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // Get unique categories from blogs
  const categories = ['All', ...Array.from(new Set(blogs.map(blog => blog.category)))];

  useEffect(() => {
    let result = blogs;
    if (search) {
      result = result.filter(blog => blog.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (category !== 'All') {
      result = result.filter(blog => blog.category === category);
    }
    setFilteredBlogs(result);
  }, [search, category, blogs]);

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">All Blogs</h1>
      <div className="row mb-4 justify-content-center">
        <div className="col-md-4 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        {filteredBlogs.length === 0 ? (
          <div className="col-12 text-center"><p>No blogs found.</p></div>
        ) : (
          filteredBlogs.map(blog => (
            <div className="col-md-6 col-lg-4 mb-4" key={blog.id}>
              <BlogCard blog={blog} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home; 
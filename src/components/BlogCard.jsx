import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ blog }) => {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setBookmarked(bookmarks.includes(blog.id));
  }, [blog.id]);

  const handleBookmark = () => {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (bookmarked) {
      bookmarks = bookmarks.filter(id => id !== blog.id);
    } else {
      bookmarks.push(blog.id);
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    setBookmarked(!bookmarked);
  };

  return (
    <div className="blog-gradient-card">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">
          <Link to={`/blog/${blog.id}`} className="text-decoration-none text-dark">
            {blog.title}
          </Link>
        </h5>
        <p className="card-text flex-grow-1">{blog.summary}</p>
        <div className="mb-2">
          <span className="badge bg-primary me-2">{blog.category}</span>
          {blog.tags && blog.tags.map(tag => (
            <span key={tag} className="badge bg-secondary me-1">{tag}</span>
          ))}
        </div>
        <button
          className={`btn btn-sm ${bookmarked ? 'btn-danger' : 'btn-outline-danger'} mt-auto align-self-end`}
          onClick={handleBookmark}
          title={bookmarked ? 'Remove Bookmark' : 'Bookmark'}
        >
          {bookmarked ? '♥' : '♡'}
        </button>
      </div>
    </div>
  );
};

export default BlogCard; 
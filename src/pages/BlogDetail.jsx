import React, { useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import { AuthContext } from '../context/AuthContext';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const { blogs, deleteBlog } = useContext(BlogContext);
  const blog = blogs.find(b => b.id === Number(id));

  if (!blog) return <div className="container py-4"><h2>Blog not found</h2></div>;

  const handleEdit = () => navigate(`/admin/edit/${blog.id}`);
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      deleteBlog(blog.id);
      navigate('/');
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-3">{blog.title}</h2>
          <div className="mb-2">
            <span className="badge bg-primary me-2">{blog.category}</span>
            {blog.tags && blog.tags.map(tag => (
              <span key={tag} className="badge bg-secondary me-1">{tag}</span>
            ))}
          </div>
          <p className="card-text mt-3">{blog.content}</p>
          {/* TODO: Like/Bookmark button here */}
          {isAuthenticated && (
            <div className="mt-4">
              <button className="btn btn-warning me-2" onClick={handleEdit}>Edit</button>
              <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          )}
          <div className="mt-3">
            <Link to="/" className="btn btn-outline-secondary">Back to Blogs</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail; 
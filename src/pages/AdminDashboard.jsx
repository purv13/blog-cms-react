import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BlogContext } from '../context/BlogContext';

const AdminDashboard = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { blogs, deleteBlog } = useContext(BlogContext);
  const navigate = useNavigate();

  if (!isAuthenticated) return null;

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      deleteBlog(id);
    }
  };

  const handleAdd = () => {
    navigate('/admin/add');
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard</h2>
        <button className="btn btn-success" onClick={handleAdd}>Add New Blog</button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr><td colSpan="4" className="text-center">No blogs found.</td></tr>
            ) : (
              blogs.map(blog => (
                <tr key={blog.id}>
                  <td>{blog.title}</td>
                  <td>{blog.category}</td>
                  <td>{blog.tags && blog.tags.join(', ')}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(blog.id)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(blog.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard; 
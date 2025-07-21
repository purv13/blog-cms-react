import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';

const defaultBlog = {
  title: '',
  summary: '',
  content: '',
  category: '',
  tags: '',
};

const AddEditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { blogs, addBlog, editBlog } = useContext(BlogContext);
  const [form, setForm] = useState(defaultBlog);

  useEffect(() => {
    if (isEdit) {
      const blog = blogs.find(b => b.id === Number(id));
      if (blog) {
        setForm({
          title: blog.title,
          summary: blog.summary,
          content: blog.content,
          category: blog.category,
          tags: blog.tags ? blog.tags.join(', ') : '',
        });
      }
    }
  }, [id, isEdit, blogs]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isEdit) {
      editBlog(Number(id), form);
      alert('Blog updated!');
    } else {
      addBlog(form);
      alert('Blog added!');
    }
    navigate('/admin');
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="mb-4 text-center">{isEdit ? 'Edit Blog' : 'Add New Blog'}</h2>
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Summary</label>
                  <input
                    type="text"
                    className="form-control"
                    name="summary"
                    value={form.summary}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <textarea
                    className="form-control"
                    name="content"
                    rows="5"
                    value={form.content}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tags (comma separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="tags"
                    value={form.tags}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">{isEdit ? 'Update' : 'Add'} Blog</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditBlog; 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import Login from './pages/Login';
import AddEditBlog from './pages/AddEditBlog';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <BlogProvider>
        <Router>
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/add" element={<ProtectedRoute><AddEditBlog /></ProtectedRoute>} />
              <Route path="/admin/edit/:id" element={<ProtectedRoute><AddEditBlog /></ProtectedRoute>} />
            </Routes>
          </div>
        </Router>
      </BlogProvider>
    </AuthProvider>
  );
};

export default App;
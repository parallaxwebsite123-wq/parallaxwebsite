/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import About from './pages/About';
import RequestSample from './pages/RequestSample';
import Profile from './pages/Profile';
import TrackOrder from './pages/TrackOrder';
import ReturnPolicy from './pages/ReturnPolicy';
import RequestSuccess from './pages/RequestSuccess';
import SampleBuilder from './pages/SampleBuilder';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Navigate to="/marketplace" replace />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/build-sample" element={<SampleBuilder />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<Navigate to="/request-sample" replace />} />
        <Route path="/request-sample" element={<RequestSample />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/order-success" element={<Navigate to="/request-success" replace />} />
        <Route path="/request-success" element={<RequestSuccess />} />
        
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
        
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  );
}

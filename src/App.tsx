import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import { AuthProvider } from './contexts/AuthContext';
import { ImageProvider } from './contexts/ImageContext';

function App() {
  return (
    <AuthProvider>
      <ImageProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
            </Routes>
          </Layout>
        </Router>
      </ImageProvider>
    </AuthProvider>
  );
}

export default App;

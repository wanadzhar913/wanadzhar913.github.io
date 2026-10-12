import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnalyticsTracker } from './components/AnalyticsTracker';
import { Navigation } from './components/Navigation';
import { ThemeProvider } from './context/ThemeContext';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Projects } from './pages/Projects';
import { Opensource } from './pages/Opensource';
import { Talks } from './pages/Talks';
import { Publications } from './pages/Publications';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AnalyticsTracker />
        <ScrollToTop />
        <div className="min-h-screen bg-[#fafafa] transition-colors duration-200 dark:bg-[#1a1a1a]">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/opensource" element={<Opensource />} />
            <Route path="/talks" element={<Talks />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

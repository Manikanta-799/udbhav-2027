import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Sports from './pages/Sports';
import Cultural from './pages/Cultural';
import Technical from './pages/Technical';
import EventDetails from './pages/EventDetails';
import Schedule from './pages/Schedule';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import { EventLaunchProvider, useEventLaunch } from './context/EventLaunchContext';
import EventLaunchAnimation from './components/EventLaunchAnimation';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function NotFound() {
  return (
    <div className="min-h-screen pt-36 pb-20 px-4 text-center max-w-md mx-auto">
      <div className="glass-card p-10 rounded-3xl border border-white/10">
        <span className="text-6xl font-black gradient-text font-mono block mb-2">404</span>
        <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
        <p className="text-gray-400 text-xs mb-6">
          The requested path does not exist on the Udbhav 2027 portal.
        </p>
        <a
          href="/"
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider"
        >
          Return to Fest Home
        </a>
      </div>
    </div>
  );
}

function MainLayout() {
  const { activeEvent, finishLaunch, cancelLaunch } = useEventLaunch();

  return (
    <div className="min-h-screen flex flex-col bg-[#070913] text-white selection:bg-cyan-500 selection:text-black">
      <ScrollToTop />

      {/* Interactive Mascot Transition Overlay */}
      {activeEvent && (
        <EventLaunchAnimation
          event={activeEvent}
          onFinish={finishLaunch}
          onCancel={cancelLaunch}
        />
      )}

      {/* Persistent Top Navigation Bar */}
      <Navbar />

      {/* Routed Page Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/cultural" element={<Cultural />} />
          <Route path="/technical" element={<Technical />} />
          <Route path="/event/:eventId" element={<EventDetails />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <EventLaunchProvider>
        <MainLayout />
      </EventLaunchProvider>
    </Router>
  );
}

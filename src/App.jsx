import React, { useState, useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import {
  Menu, X, Mail, Send, CheckCircle2,
  Gamepad2, Play as Youtube, Camera as Instagram, MessageSquare,
  MonitorPlay, Crosshair, Image as ImageIcon,
  ChevronRight, ExternalLink, ShieldCheck,
  Zap, Layers, HelpCircle, Target, Eye, Flame, Check
} from 'lucide-react';

// --- CONFIG & DATA ---

const CONTACT_INFO = {
  email: "jixudesign1@gmail.com",
  discord: "jixu1",
  emailSubject: "Thumbnail Project Inquiry - JIXU Designs"
};

// All placeholder images replaced with your REAL uploaded work via external URLs
const PORTFOLIO_ITEMS = [
  {
    id: 13,
    title: 'Gaming Concept Latest',
    categories: ['Thumbnails', 'Gaming'],
    type: 'Concept Design',
    tags: ['Gaming', 'Action', 'Vibrant'],
    desc: 'Latest gaming thumbnail concept with vibrant aesthetic and high visual impact.',
    img: 'https://r2.fivemanage.com/xEFzDSAByL8rHQQf3E6G8/speracted/ChatGPTImageApr28202608_28_22AM.png',
    featured: true
  },
  {
    id: 1,
    title: 'BGMI Live Stream',
    categories: ['Thumbnails', 'Gaming'],
    type: 'Practice Project',
    tags: ['BGMI', 'Gaming', 'High Contrast'],
    desc: 'Created a highly engaging BGMI stream thumbnail focusing on high contrast and clear focal points to dominate the mobile feed.',
    img: 'https://r2.fivemanage.com/xEFzDSAByL8rHQQf3E6G8/speracted/Untitleddesign(11).png',
    featured: true,
    breakdown: [
      'Strong color contrast (Teal & Orange)',
      'Clear subject focus with glowing outlines',
      'Readable bold text for mobile visibility',
      'Action-oriented composition'
    ]
  },
  {
    id: 2,
    title: 'BGMI Tournament Pro',
    categories: ['Thumbnails', 'Gaming', 'Cinematic'],
    type: 'Concept Design',
    tags: ['Anime Style', 'Gaming', 'Vibrant'],
    desc: 'An anime-inspired gaming thumbnail blending vibrant purples with golden accents for premium appeal.',
    img: 'https://r2.fivemanage.com/xEFzDSAByL8rHQQf3E6G8/speracted/ChatGPTImageApr24202610_28_27AM.png',
    featured: true,
    breakdown: [
      'Vibrant purple/gold color harmony',
      'Detailed subject framing',
      'High visual fidelity and sharpness',
      'Designed to pop against YouTube Dark Mode'
    ]
  },
  {
    id: 3,
    title: 'Streamer Offline Slate',
    categories: ['Thumbnails', 'Gaming', 'Cinematic'],
    type: 'Personal Work',
    tags: ['Gaming', 'Cinematic', 'Branding'],
    desc: 'A moody, cinematic "Streamer Offline" slate incorporating comic-style borders and high-contrast neon lighting.',
    img: 'https://r2.fivemanage.com/xEFzDSAByL8rHQQf3E6G8/speracted/Jixu(2).png',
    featured: true
  },
  {
    id: 4,
    title: 'JIXU Cartier - Auto',
    categories: ['Color Grading', 'Cinematic'],
    type: 'Personal Work',
    tags: ['Cinematic', 'Color Grading', 'Auto'],
    desc: 'Cinematic color grading practice focusing on twilight hues and metallic reflections.',
    img: 'https://r2.fivemanage.com/xEFzDSAByL8rHQQf3E6G8/speracted/Untitleddesign(9).png',
    featured: false
  },
  {
    id: 5,
    title: 'Night Rider Bike',
    categories: ['Color Grading', 'Cinematic'],
    type: 'Practice Project',
    tags: ['Color Grading', 'Neon', 'Cinematic'],
    desc: 'Experimenting with cyberpunk-style neon lighting and deep shadow contrasts.',
    img: 'https://r2.fivemanage.com/xEFzDSAByL8rHQQf3E6G8/speracted/ChatGPTImageApr21202611_47_29PM(1).png',
    featured: false
  },
  {
    id: 6,
    title: 'Neon Nights Mask',
    categories: ['Color Grading', 'Cinematic'],
    type: 'Personal Work',
    tags: ['High Contrast', 'Portrait', 'Cinematic'],
    desc: 'Portrait color grading using intense red and blue rim lighting for dramatic effect.',
    img: 'https://r2.fivemanage.com/xEFzDSAByL8rHQQf3E6G8/speracted/ChatGPTImageApr21202607_36_30PM.png',
    featured: false
  },
  {
    id: 7,
    title: 'Sunset Auto Club',
    categories: ['Color Grading', 'Cinematic'],
    type: 'Practice Project',
    tags: ['Golden Hour', 'Cinematic', 'Auto'],
    desc: 'Achieving a warm, cinematic golden-hour aesthetic for automotive photography.',
    img: 'https://r2.fivemanage.com/xEFzDSAByL8rHQQf3E6G8/speracted/Untitleddesign(6).png',
    featured: false
  },
  {
    id: 8,
    title: 'Rooftop Sniper',
    categories: ['Gaming', 'Cinematic', 'Color Grading'],
    type: 'Practice Project',
    tags: ['Gaming', 'Cinematic', 'Action'],
    desc: 'A narrative-driven gaming composition focusing on character placement and background depth.',
    img: 'https://r2.fivemanage.com/xEFzDSAByL8rHQQf3E6G8/speracted/ChatGPTImageApr17202601_44_04PM.png',
    featured: false
  },
  {
    id: 9,
    title: 'Urban Mask Portrait',
    categories: ['Color Grading', 'Cinematic'],
    type: 'Personal Work',
    tags: ['Portrait', 'Color Grading', 'Mood'],
    desc: 'Focused on bringing out deep greens and earthy tones for a realistic, moody portrait.',
    img: 'https://r2.fivemanage.com/xEFzDSAByL8rHQQf3E6G8/speracted/ChatGPTImageApr23202606_41_56PM.png',
    featured: false
  },
  {
    id: 10,
    title: 'Cinematic Concept',
    categories: ['Color Grading', 'Cinematic'],
    type: 'Practice Project',
    tags: ['Concept', 'Color Grading', 'Lighting'],
    desc: 'High-contrast studio lighting color grade.',
    img: 'https://r2.fivemanage.com/xEFzDSAByL8rHQQf3E6G8/speracted/ChatGPTImageApr12202610_27_39AM.png',
    featured: false
  },
  {
    id: 11,
    title: 'Gaming Concept 1',
    categories: ['Thumbnails', 'Gaming'],
    type: 'Concept Design',
    tags: ['Gaming', 'Action', 'Vibrant'],
    desc: 'Vibrant action-focused thumbnail concept.',
    img: 'https://r2.fivemanage.com/xEFzDSAByL8rHQQf3E6G8/speracted/Untitleddesign(4).png',
    featured: false
  },
  {
    id: 12,
    title: 'Gaming Concept 2',
    categories: ['Thumbnails', 'Gaming'],
    type: 'Concept Design',
    tags: ['Gaming', 'Action', 'Dark Theme'],
    desc: 'Dark theme action-focused thumbnail concept.',
    img: 'https://r2.fivemanage.com/xEFzDSAByL8rHQQf3E6G8/speracted/Untitleddesign(5).png',
    featured: false
  },
  {
    id: 14,
    title: 'Gaming Concept 3',
    categories: ['Thumbnails', 'Gaming'],
    type: 'Concept Design',
    tags: ['Gaming', 'Action', 'Vibrant'],
    desc: 'Action-focused thumbnail concept.',
    img: 'https://r2.fivemanage.com/xEFzDSAByL8rHQQf3E6G8/speracted/Untitleddesign(7).png',
    featured: true
  },
  {
    id: 15,
    title: 'Gaming Concept 4',
    categories: ['Thumbnails', 'Gaming'],
    type: 'Concept Design',
    tags: ['Gaming', 'Action', 'Vibrant'],
    desc: 'Vibrant action-focused thumbnail concept.',
    img: 'https://r2.fivemanage.com/xEFzDSAByL8rHQQf3E6G8/speracted/Untitleddesign(14).png',
    featured: true
  },
  {
    id: 16,
    title: 'Gaming Concept 5',
    categories: ['Thumbnails', 'Gaming'],
    type: 'Concept Design',
    tags: ['Gaming', 'Action', 'Vibrant'],
    desc: 'Newest featured action-focused thumbnail concept.',
    img: 'https://r2.fivemanage.com/xEFzDSAByL8rHQQf3E6G8/speracted/ChatGPTImageApr29202608_15_57AM.png',
    featured: true
  }
];

const CATEGORIES = ['All', 'Thumbnails', 'Color Grading', 'Gaming', 'Cinematic'];

const WORK_PACKAGES = [
  {
    title: 'Starter Project',
    desc: 'Perfect for small creators who want clean and attention-grabbing thumbnails.',
    features: ['1 Custom Thumbnail', 'Clean & bold design', '24–48h delivery', 'Revisions included'],
    footerLines: ['Pricing discussed based on your project'],
    buttonText: 'Start Project',
    glow: 'hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]',
    border: 'border-[#00f3ff]'
  },
  {
    title: 'Growth Pack',
    desc: 'Best for creators who upload regularly and want consistent, high-quality thumbnails.',
    features: ['Multiple thumbnails', 'Consistent visual style', 'Priority focus', 'Unlimited revisions'],
    footerLines: ['Best for growing channels', 'Pricing depends on requirements'],
    buttonText: 'Discuss Project',
    glow: 'shadow-[0_0_20px_rgba(176,38,255,0.4)] hover:shadow-[0_0_30px_rgba(176,38,255,0.7)]',
    border: 'border-[#b026ff]',
    featured: true
  },
  {
    title: 'Custom Design',
    desc: 'For creators who want unique visuals or full channel branding.',
    features: ['Fully custom style', 'Banner / branding / overlays', 'Advanced design work', 'Personal attention'],
    footerLines: ['Fully custom pricing'],
    buttonText: 'Start Custom Project',
    glow: 'hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]',
    border: 'border-[#00f3ff]'
  }
];

const PROCESS_STEPS = [
  { id: 1, title: 'You Send Your Idea', desc: 'Share your video title, concept, and any raw assets or screenshots.', icon: <MessageSquare /> },
  { id: 2, title: 'I Design A Concept', desc: 'I map out the composition, focusing on colors and visual impact.', icon: <Layers /> },
  { id: 3, title: 'You Get A Preview', desc: 'I send over the initial draft for your honest feedback.', icon: <ImageIcon /> },
  { id: 4, title: 'Revisions', desc: 'We tweak the design based on your feedback until it feels right.', icon: <ShieldCheck /> },
  { id: 5, title: 'Final Delivery', desc: 'You receive the high-resolution, YouTube-ready thumbnail.', icon: <Zap /> },
];

const FAQ_ITEMS = [
  { q: "Do you have client experience?", a: "Currently, I've primarily worked on personal and practice projects to build my skills. I am now actively taking on my first real clients and am highly motivated to deliver great results." },
  { q: "What is your delivery time?", a: "Typically 24 to 48 hours depending on the complexity of the design and the current number of projects I'm handling." },
  { q: "Do you offer revisions?", a: "Yes! I want you to be happy with the final result. Basic plans include set revisions, while Pro plans include unlimited revisions within reason." }
];

const WHAT_YOU_GET = [
  "YouTube optimized thumbnail (1280x720)",
  "Clean, bold, and impactful design",
  "Fast delivery (24–48h)",
  "Revisions based on your feedback",
  "Dedicated gaming & anime style focus"
];

// --- HELPER COMPONENTS ---

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.5 });

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

const ScrollReveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Formspree State
  const [formState, handleSubmit] = useForm('xwvadqkd');

  // Modal State
  const [selectedProject, setSelectedProject] = useState(null);

  // Image Error Fallback Handler
  const handleImageError = (e) => {
    console.warn("Image failed to load:", e.target.src);
    e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect fill='%23111' width='800' height='450'/%3E%3Ctext fill='%2300f3ff' x='50%25' y='50%25' font-family='sans-serif' font-size='24' text-anchor='middle' dominant-baseline='middle'%3EImage Unavailable%3C/text%3E%3C/svg%3E";
  };

  // SEO & Initialization
  useEffect(() => {
    document.title = "YouTube Thumbnail Designer | JIXU Designs";

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Gaming and anime-style YouTube thumbnails focused on high CTR and visual impact.";

    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Custom Cursor Tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll handler for navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredPortfolio = activeCategory === 'All'
    ? PORTFOLIO_ITEMS.filter(item => !item.featured) // Separate featured items if viewing 'All'
    : PORTFOLIO_ITEMS.filter(item => item.categories.includes(activeCategory));

  const featuredItems = PORTFOLIO_ITEMS.filter(item => item.featured);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-[#050507] flex flex-col items-center justify-center z-50">
        <style>{`
          .glitch-load { animation: glitch-anim 2s infinite linear alternate-reverse; position: relative; }
          .glitch-load::before, .glitch-load::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.8; }
          .glitch-load::before { left: 2px; text-shadow: -2px 0 #b026ff; clip: rect(44px, 450px, 56px, 0); animation: glitch-anim 2s infinite linear alternate-reverse; }
          .glitch-load::after { left: -2px; text-shadow: -2px 0 #00f3ff; clip: rect(44px, 450px, 56px, 0); animation: glitch-anim2 2s infinite linear alternate-reverse; }
          @keyframes glitch-anim { 0% { clip: rect(10px, 9999px, 86px, 0); } 20% { clip: rect(12px, 9999px, 45px, 0); } 40% { clip: rect(89px, 9999px, 19px, 0); } 60% { clip: rect(43px, 9999px, 88px, 0); } 80% { clip: rect(75px, 9999px, 34px, 0); } 100% { clip: rect(67px, 9999px, 91px, 0); } }
          @keyframes glitch-anim2 { 0% { clip: rect(65px, 9999px, 100px, 0); } 20% { clip: rect(56px, 9999px, 34px, 0); } 40% { clip: rect(45px, 9999px, 67px, 0); } 60% { clip: rect(23px, 9999px, 45px, 0); } 80% { clip: rect(91px, 9999px, 88px, 0); } 100% { clip: rect(56px, 9999px, 12px, 0); } }
        `}</style>
        <span className="text-5xl font-black tracking-tighter text-white uppercase glitch-load" data-text="JIXU">JIXU</span>
        <div className="w-48 h-1 bg-[#222] mt-8 rounded overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#b026ff] to-[#00f3ff] animate-pulse" style={{ width: '100%', animationDuration: '2s' }}></div>
        </div>
        <p className="text-[#00f3ff] text-xs font-bold uppercase tracking-widest mt-4">Loading Assets...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] text-white font-sans selection:bg-[#b026ff] selection:text-white overflow-x-hidden relative scroll-smooth">

      {/* GLOBAL CSS STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800;900&display=swap');
        body { font-family: 'Outfit', sans-serif; cursor: none; }
        .font-black { font-weight: 900; }
        
        input:-webkit-autofill, textarea:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 30px #111 inset !important;
          -webkit-text-fill-color: white !important;
        }

        .sketch-border { border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; transition: all 0.3s ease; }
        .sketch-border:hover { border-radius: 15px 255px 15px 225px / 255px 15px 225px 15px; }

        .glitch-text { position: relative; display: inline-block; }
        .glitch-text::before, .glitch-text::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.8; }
        .glitch-text::before { left: 2px; text-shadow: -2px 0 #b026ff; clip: rect(44px, 450px, 56px, 0); animation: glitch-anim 5s infinite linear alternate-reverse; }
        .glitch-text::after { left: -2px; text-shadow: -2px 0 #00f3ff; clip: rect(44px, 450px, 56px, 0); animation: glitch-anim2 5s infinite linear alternate-reverse; }

        @keyframes glitch-anim { 0% { clip: rect(10px, 9999px, 86px, 0); } 20% { clip: rect(12px, 9999px, 45px, 0); } 40% { clip: rect(89px, 9999px, 19px, 0); } 60% { clip: rect(43px, 9999px, 88px, 0); } 80% { clip: rect(75px, 9999px, 34px, 0); } 100% { clip: rect(67px, 9999px, 91px, 0); } }
        @keyframes glitch-anim2 { 0% { clip: rect(65px, 9999px, 100px, 0); } 20% { clip: rect(56px, 9999px, 34px, 0); } 40% { clip: rect(45px, 9999px, 67px, 0); } 60% { clip: rect(23px, 9999px, 45px, 0); } 80% { clip: rect(91px, 9999px, 88px, 0); } 100% { clip: rect(56px, 9999px, 12px, 0); } }

        .bg-noise { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 1; opacity: 0.03; background-image: url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E'); }
        .scanlines { background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2)); background-size: 100% 4px; position: absolute; top:0; left:0; right:0; bottom:0; pointer-events: none; z-index: 2; }
        ::-webkit-scrollbar { width: 10px; } ::-webkit-scrollbar-track { background: #050507; } ::-webkit-scrollbar-thumb { background: #333; border-radius: 5px; } ::-webkit-scrollbar-thumb:hover { background: #b026ff; }

        @keyframes pulse-glow {
          0%, 100% { opacity: 1; transform: scale(1); filter: drop-shadow(0 0 8px rgba(176,38,255,0.6)); }
          50% { opacity: 0.8; transform: scale(1.05); filter: drop-shadow(0 0 16px rgba(176,38,255,0.9)); }
        }
        .animate-pulse-glow { animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>

      <div className="bg-noise"></div>

      {/* FULL VIEW MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-md transition-all opacity-100"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#0a0a0e] border border-[#333] rounded-xl overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(176,38,255,0.2)] animate-in fade-in zoom-in duration-300"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-50 bg-black/50 text-white p-2 rounded-full hover:bg-[#ff0055] transition-colors"
              onClick={() => setSelectedProject(null)}
            >
              <X size={20} />
            </button>

            <div className="md:w-2/3 bg-[#050507] flex items-center justify-center relative group">
              <img src={selectedProject.img} alt={selectedProject.title} className="w-full h-auto max-h-[60vh] md:max-h-[80vh] object-contain" />
            </div>

            <div className="md:w-1/3 p-6 md:p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#222]">
              <span className="text-[#00f3ff] text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                {selectedProject.type}
              </span>

              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wide mb-4 leading-tight">
                {selectedProject.title}
              </h3>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((t, i) => (
                  <span key={i} className="bg-[#111] border border-[#333] text-[#00f3ff] text-[10px] px-2 py-1 rounded uppercase font-bold tracking-wider">
                    {t}
                  </span>
                ))}
              </div>

              {selectedProject.desc && (
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {selectedProject.desc}
                </p>
              )}

              {selectedProject.breakdown && (
                <div className="mt-auto bg-[#111] p-4 rounded-lg border border-[#222] shadow-inner">
                  <h4 className="text-[#b026ff] font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Zap size={14} /> Behind The Design
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.breakdown.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-300 font-medium">
                        <CheckCircle2 size={14} className="text-[#00f3ff] shrink-0" /> {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM CURSOR GLOW */}
      <div
        className="hidden lg:block fixed w-8 h-8 rounded-full border border-[#00f3ff] shadow-[0_0_20px_rgba(0,243,255,0.8)] pointer-events-none z-[90] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out backdrop-invert mix-blend-difference"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />
      <div
        className="hidden lg:block fixed w-64 h-64 bg-[#b026ff] rounded-full blur-[100px] opacity-10 pointer-events-none z-[89] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      />

      {/* NAVBAR */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-[#0a0a0e]/95 backdrop-blur-md border-b border-[#222] py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
            <span className="text-3xl font-black tracking-tighter text-white uppercase glitch-text" data-text="JIXU">JIXU</span>
            <span className="text-[#b026ff] text-xl font-bold">DESIGNS</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-semibold text-sm tracking-widest uppercase">
            <button onClick={() => scrollTo('journey')} className="hover:text-[#00f3ff] transition-colors">Journey</button>
            <button onClick={() => scrollTo('portfolio')} className="hover:text-[#b026ff] transition-colors">Work</button>
            <button onClick={() => scrollTo('services')} className="hover:text-[#00f3ff] transition-colors">Packages</button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-6 py-2 bg-transparent border-2 border-[#b026ff] text-[#b026ff] hover:bg-[#b026ff] hover:text-white transition-all sketch-border shadow-[0_0_10px_rgba(176,38,255,0.3)] hover:shadow-[0_0_20px_rgba(176,38,255,0.8)] flex items-center gap-2"
            >
              Contact Me <Mail size={16} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white relative z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#0a0a0e] border-b border-[#222] flex flex-col items-center py-6 gap-6 shadow-2xl">
            <button onClick={() => scrollTo('journey')} className="text-lg font-bold uppercase tracking-wider hover:text-[#00f3ff]">Journey</button>
            <button onClick={() => scrollTo('portfolio')} className="text-lg font-bold uppercase tracking-wider hover:text-[#b026ff]">Work</button>
            <button onClick={() => scrollTo('services')} className="text-lg font-bold uppercase tracking-wider hover:text-[#00f3ff]">Packages</button>
            <button onClick={() => scrollTo('contact')} className="px-8 py-3 bg-[#b026ff] text-white font-bold sketch-border w-[80%] flex justify-center items-center gap-2">
              Hire Me <Mail size={18} />
            </button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a0b2e] via-[#050507] to-[#050507] z-0"></div>
        <div className="scanlines"></div>

        <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#b026ff] rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-[#00f3ff] rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start gap-6">

            {/* Urgency Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111] border border-[#ff0055] text-sm font-semibold tracking-wider text-[#ff0055] shadow-[0_0_15px_rgba(255,0,85,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#ff0055] animate-ping"></span>
              ⚠️ CURRENTLY ACCEPTING LIMITED PROJECTS
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-[1.1] tracking-tighter">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">I Design</span>
              <span className="block glitch-text text-[#b026ff]" data-text="THUMBNAILS">THUMBNAILS</span>
              <span className="block">That Grab Attention.</span>
            </h1>

            <p className="text-lg text-gray-400 max-w-md font-medium leading-relaxed">
              Passionate about gaming and anime aesthetics. I focus on creating visuals that improve clicks while continuously learning and growing with creators.
            </p>

            <div className="flex flex-wrap gap-4 mt-4 w-full">
              <button onClick={() => scrollTo('contact')} className="group relative px-8 py-4 bg-[#b026ff] text-white font-bold uppercase tracking-widest text-sm sketch-border overflow-hidden shadow-[0_0_20px_rgba(176,38,255,0.4)] hover:shadow-[0_0_35px_rgba(176,38,255,0.8)] transition-all flex-1 sm:flex-none text-center justify-center flex items-center gap-2">
                <span className="relative z-10 flex items-center gap-2">Hire Me <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
              </button>

              <button onClick={() => scrollTo('portfolio')} className="px-8 py-4 bg-transparent border-2 border-[#00f3ff] text-[#00f3ff] font-bold uppercase tracking-widest text-sm sketch-border hover:bg-[#00f3ff]/10 transition-all flex items-center justify-center gap-2 flex-1 sm:flex-none">
                View My Practice
              </button>
            </div>

            {/* Realistic Stats */}
            <div className="flex items-center gap-6 mt-8 border-t border-[#222] pt-8 w-full flex-wrap">
              <div>
                <p className="text-3xl font-black text-white"><CountUp end={20} suffix="+" /></p>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Practice Designs</p>
              </div>
              <div className="w-px h-12 bg-[#222] hidden sm:block"></div>
              <div>
                <p className="text-3xl font-black text-[#00f3ff]"><CountUp end={6} suffix="+" /></p>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Months Learning</p>
              </div>
              <div className="w-px h-12 bg-[#222] hidden sm:block"></div>
              <div>
                <p className="text-3xl font-black text-white flex items-center gap-2">100<span className="text-lg text-[#b026ff]">%</span></p>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Gaming/Anime Focus</p>
              </div>
            </div>
          </div>

          {/* Hero Visual - Updated with your real artwork */}
          <div className="relative hidden lg:block perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#b026ff]/30 to-[#00f3ff]/30 rounded-2xl transform rotate-3 blur-2xl"></div>
            <div className="relative bg-[#0a0a0e] border border-[#222] p-2 rounded-xl transform -rotate-2 hover:rotate-1 hover:scale-105 transition-all duration-500 z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">

              <div className="relative overflow-hidden rounded-lg group">
                <img
                  src="https://r2.fivemanage.com/xEFzDSAByL8rHQQf3E6G8/speracted/ChatGPTImageApr28202608_28_22AM.png"
                  alt="Gaming Thumbnail Example"
                  className="w-full h-auto transform group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 right-4 bg-black/90 px-2 py-1 rounded text-xs font-bold text-white border border-[#333]">
                  10:24
                </div>
                <div className="absolute top-4 left-4 bg-[#b026ff]/90 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider backdrop-blur-sm border border-[#b026ff]">
                  Latest Concept
                </div>
              </div>

              <div className="absolute -bottom-6 -left-10 bg-[#050507] border border-[#b026ff] p-4 rounded-xl shadow-[0_0_30px_rgba(176,38,255,0.4)] flex items-center gap-4 z-20 hover:-translate-y-2 transition-transform cursor-default">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#b026ff] to-[#00f3ff] flex items-center justify-center shadow-inner">
                  <MonitorPlay size={24} fill="white" className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Design Focus</p>
                  <p className="text-lg font-black text-[#00f3ff] flex items-center gap-1">
                    High Quality <Check size={16} />
                  </p>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-[#050507] border border-[#00f3ff] p-3 rounded-xl shadow-[0_0_20px_rgba(0,243,255,0.3)] flex flex-col items-center gap-1 z-20 animate-pulse">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Delivery Time</span>
                <span className="text-lg font-black text-white">24-48 Hrs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MY JOURNEY (Honest Section - Updated with Real Art) */}
      <section id="journey" className="py-24 bg-[#050507] relative border-y border-[#111]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00f3ff] to-[#b026ff] rounded-2xl transform -rotate-3 blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="bg-[#111] p-2 border-2 border-[#222] sketch-border relative z-10">
              <img
                src="https://r2.fivemanage.com/xEFzDSAByL8rHQQf3E6G8/speracted/ChatGPTImageApr17202601_44_04PM.png"
                alt="Learning Design"
                className="w-full h-auto rounded-xl grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                loading="lazy"
                onError={handleImageError}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#0a0a0e] border border-[#b026ff] px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(176,38,255,0.2)] z-20">
              <p className="font-black text-white text-xl uppercase tracking-wide flex items-center gap-2">Self-Taught <Zap size={18} className="text-[#00f3ff]" /></p>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Constantly Evolving</p>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-[#00f3ff] font-bold tracking-widest uppercase text-sm mb-2">The Beginning</h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">My <span className="text-[#b026ff]">Journey</span></h3>

            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              I started learning thumbnail design by creating visuals for my own content and relentlessly experimenting with gaming and anime styles.
            </p>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed border-l-2 border-[#b026ff] pl-4 italic">
              "All the designs shown here are part of my learning journey. My core focus has been understanding color theory, high contrast, and visual impact to improve click-through rates."
            </p>
            <p className="text-gray-300 text-lg font-medium leading-relaxed">
              I might be new to the freelance world, but I treat every canvas seriously. Now, I’m ready to take on my first clients, bring your ideas to life, and grow alongside your channel.
            </p>

            <div className="mt-8">
              <button onClick={() => scrollTo('contact')} className="px-6 py-3 border border-[#333] hover:border-[#00f3ff] hover:text-[#00f3ff] text-white font-bold text-sm uppercase tracking-widest rounded transition-colors flex items-center gap-2">
                Let's Work Together <ArrowUpRightIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FIRST CLIENT OFFER BANNER (ANIMATED) */}
      <section className="py-16 bg-gradient-to-r from-[#1a0b2e] via-[#0f071a] to-[#050507] border-b border-[#222] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxyZWN0IHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwbDQwIDQweS00MEw0MCAwSDB6IiBmaWxsPSIjYjAyNmZmIiBmaWxsLW9wYWNpdHk9IjAuMDMiPjwvcGF0aD4KPC9zdmc+')] pointer-events-none"></div>
        <ScrollReveal>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="inline-flex items-center justify-center p-4 bg-[#b026ff]/20 rounded-full mb-6 border border-[#b026ff]/30 shadow-[0_0_30px_rgba(176,38,255,0.3)] animate-pulse-glow">
              <Flame size={36} className="text-[#b026ff]" />
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider mb-4">First 5 Clients Offer</h3>
            <p className="text-gray-300 text-lg md:text-xl mb-6 max-w-2xl mx-auto">Since I'm starting out and building my client portfolio, I'm offering discounted pricing, extra revisions, and <strong className="text-white">100% of my focus</strong> on your project.</p>
            <p className="font-bold text-[#00f3ff] tracking-widest uppercase text-sm inline-block border-b-2 border-[#00f3ff] pb-1">Let's grow together 🚀</p>
          </div>
        </ScrollReveal>
      </section>

      {/* PORTFOLIO SECTION (Upgraded with Real Work & Hover Effects) */}
      <section id="portfolio" className="py-24 bg-[#0a0a0e] relative border-b border-[#111]">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <h2 className="text-[#b026ff] font-bold tracking-widest uppercase text-sm mb-2 flex justify-center items-center gap-2">
              <ImageIcon size={16} /> Real Assets
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#b026ff]">Portfolio</span></h3>
            <p className="text-gray-400 text-sm max-w-xl mx-auto border border-[#333] bg-[#111] p-3 rounded-lg">
              All designs shown here are part of my personal and practice work while learning thumbnail design.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${activeCategory === cat
                  ? 'bg-[#b026ff] text-white shadow-[0_0_15px_rgba(176,38,255,0.5)] border border-[#b026ff]'
                  : 'bg-[#111] text-gray-400 border border-[#222] hover:border-[#00f3ff] hover:text-[#00f3ff]'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Work (Only shows when 'All' is selected) */}
          {activeCategory === 'All' && featuredItems.length > 0 && (
            <div className="mb-16">
              <h4 className="text-xl font-black text-white uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-[#222] pb-2">
                <Flame className="text-[#00f3ff]" /> Featured Work
              </h4>
              <div className="grid lg:grid-cols-3 gap-8">
                {featuredItems.map((item, idx) => (
                  <ScrollReveal key={item.id} delay={idx * 100}>
                    <div
                      className="group relative overflow-hidden rounded-xl bg-[#111] border-2 border-[#b026ff]/30 hover:border-[#b026ff] transition-all duration-500 cursor-pointer h-full shadow-[0_0_20px_rgba(176,38,255,0.1)] hover:shadow-[0_0_30px_rgba(176,38,255,0.4)]"
                      onClick={() => setSelectedProject(item)}
                    >
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover transform group-hover:scale-[1.05] transition-transform duration-700"
                          loading="lazy"
                          onError={handleImageError}
                        />

                        <div className="absolute top-3 left-3 z-10 bg-[#050507]/90 backdrop-blur text-white text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-widest border border-[#333]">
                          {item.type}
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-[#1a0b2e]/80 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 p-6 text-center backdrop-blur-sm">
                          <h4 className="text-2xl font-black text-white uppercase tracking-wide mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.title}</h4>

                          <div className="flex flex-wrap justify-center gap-2 mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                            {item.tags.map((tag, i) => (
                              <span key={i} className="text-[10px] text-[#00f3ff] border border-[#00f3ff]/50 bg-[#00f3ff]/10 px-2 py-1 rounded-full uppercase font-bold">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <button className="flex items-center gap-2 bg-[#b026ff] hover:bg-[#00f3ff] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-150 shadow-[0_0_15px_rgba(176,38,255,0.4)] hover:shadow-[0_0_20px_rgba(0,243,255,0.6)]">
                            View Full <ExternalLink size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}

          {/* Standard Grid - Responsive 2 cols on mobile, 3-4 on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredPortfolio.map((item, idx) => (
              <ScrollReveal key={item.id} delay={idx * 50}>
                <div
                  className="group relative overflow-hidden rounded-xl bg-[#111] border border-[#222] hover:border-[#b026ff] hover:shadow-[0_0_20px_rgba(176,38,255,0.3)] transition-all duration-500 cursor-pointer h-full"
                  onClick={() => setSelectedProject(item)}
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-[1.05] transition-transform duration-700"
                      loading="lazy"
                      onError={handleImageError}
                    />

                    {/* Hover Glow & Darken */}
                    <div className="absolute inset-0 bg-[#b026ff]/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                    {/* Hover Info */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 p-2 md:p-4 text-center transform scale-95 group-hover:scale-100">
                      <h4 className="text-sm md:text-lg font-black text-white uppercase tracking-wide mb-2 leading-tight">{item.title}</h4>
                      <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                        {item.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="text-[8px] md:text-[9px] text-[#00f3ff] border border-[#00f3ff]/50 bg-[#00f3ff]/10 px-1.5 md:px-2 py-0.5 rounded-full uppercase font-bold">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-[#b026ff] text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 bg-black/50 px-2 py-1 rounded-full border border-[#b026ff]/30">
                        Full View <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MY THUMBNAILS WORK - BREAKDOWN SECTION (Updated with Real Art) */}
      <section className="py-24 bg-[#050507] relative border-t border-[#111] overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#00f3ff]/5 blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[#00f3ff] font-bold tracking-widest uppercase text-sm mb-2">The Breakdown</h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Why My Thumbnails <span className="text-[#b026ff]">Work</span></h3>
          </div>

          <div className="relative max-w-4xl mx-auto rounded-xl border border-[#222] bg-[#0a0a0e] p-2 lg:p-4 shadow-[0_0_30px_rgba(0,0,0,0.8)] group">
            <div className="relative rounded-lg overflow-hidden border border-[#333]">
              <img
                src="https://r2.fivemanage.com/xEFzDSAByL8rHQQf3E6G8/speracted/Untitleddesign(11).png"
                alt="Thumbnail Breakdown Example"
                className="w-full h-auto opacity-90 group-hover:opacity-100 group-hover:saturate-150 transition-all duration-700"
                loading="lazy"
                onError={handleImageError}
              />

              {/* Overlay Labels */}
              <div className="absolute top-[15%] left-[5%] md:left-[10%] bg-[#050507]/90 backdrop-blur-md border border-[#b026ff] px-3 py-2 md:px-4 md:py-3 rounded-lg shadow-[0_0_20px_rgba(176,38,255,0.5)] transform -translate-y-2 hover:scale-105 transition-transform flex items-center gap-2 md:gap-3">
                <div className="w-2 h-2 rounded-full bg-[#b026ff] animate-ping shrink-0"></div>
                <div>
                  <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider leading-none mb-1">Visual Focus</p>
                  <p className="text-xs md:text-sm font-black text-white leading-none">Strong Color Contrast</p>
                </div>
              </div>

              <div className="absolute bottom-[20%] right-[5%] md:right-[10%] bg-[#050507]/90 backdrop-blur-md border border-[#00f3ff] px-3 py-2 md:px-4 md:py-3 rounded-lg shadow-[0_0_20px_rgba(0,243,255,0.5)] transform translate-y-2 hover:scale-105 transition-transform flex items-center gap-2 md:gap-3">
                <div className="w-2 h-2 rounded-full bg-[#00f3ff] animate-ping shrink-0"></div>
                <div>
                  <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider leading-none mb-1">Composition</p>
                  <p className="text-xs md:text-sm font-black text-white leading-none">Main Subject Clarity</p>
                </div>
              </div>

              <div className="hidden md:flex absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-[#111]/80 backdrop-blur-md border border-white/20 px-4 py-3 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform items-center gap-3">
                <Eye size={20} className="text-[#b026ff]" />
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider leading-none mb-1">Readability</p>
                  <p className="text-sm font-black text-white leading-none">Bold Text For Mobile</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-24 bg-[#0a0a0e] relative border-t border-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[#00f3ff] font-bold tracking-widest uppercase text-sm mb-2">Workflow</h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">How We <span className="text-[#b026ff]">Work</span></h3>
          </div>

          <div className="flex flex-col lg:flex-row justify-between relative gap-8 lg:gap-4">
            <div className="hidden lg:block absolute top-10 left-10 right-10 h-0.5 bg-gradient-to-r from-[#222] via-[#b026ff] to-[#222] z-0"></div>

            {PROCESS_STEPS.map((step, idx) => (
              <ScrollReveal key={idx} delay={idx * 150}>
                <div className="relative z-10 flex flex-col items-center text-center group flex-1">
                  <div className="w-20 h-20 rounded-full bg-[#050507] border-2 border-[#222] group-hover:border-[#00f3ff] flex items-center justify-center mb-6 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_25px_rgba(0,243,255,0.4)] relative">
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#b026ff] text-white font-black flex items-center justify-center text-sm border-2 border-[#0a0a0e]">
                      {step.id}
                    </div>
                    <div className="text-gray-400 group-hover:text-[#00f3ff] transition-colors [&>svg]:w-8 [&>svg]:h-8">
                      {step.icon}
                    </div>
                  </div>
                  <h4 className="font-bold text-white text-lg uppercase tracking-wide mb-2 group-hover:text-[#b026ff] transition-colors">{step.title}</h4>
                  <p className="text-gray-400 text-sm max-w-[200px]">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET SECTION (ANIMATED) */}
      <section className="py-20 bg-[#050507] border-t border-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal delay={0}>
            <h3 className="text-center text-2xl md:text-3xl font-black uppercase tracking-widest mb-10 text-gray-500">What You Get With Every Order</h3>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {WHAT_YOU_GET.map((benefit, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className="flex items-center gap-3 bg-[#111] border border-[#222] px-6 py-4 rounded-full hover:scale-105 hover:border-[#00f3ff] hover:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all duration-300 cursor-default group">
                  <CheckCircle2 size={20} className="text-[#00f3ff] group-hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.8)] transition-all" />
                  <span className="text-gray-300 group-hover:text-white font-semibold text-sm md:text-base transition-colors">{benefit}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WORK PACKAGES (Replaced Pricing Section) */}
      <section id="services" className="py-24 bg-[#0a0a0e] relative border-t border-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#b026ff] font-bold tracking-widest uppercase text-sm mb-2 flex justify-center items-center gap-2"><Target size={16} /> Packages</h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Packages</span></h3>
            <p className="text-gray-400 text-lg">Flexible pricing based on your needs.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
            <ScrollReveal delay={100}>
              <div className="bg-[#111] p-6 rounded-xl border border-[#222] shadow-inner">
                <h4 className="text-[#00f3ff] font-black uppercase tracking-widest mb-4 border-b border-[#333] pb-2 flex items-center gap-2"><Gamepad2 size={18} /> Who This Is For</h4>
                <ul className="space-y-3">
                  {['Gaming YouTubers', 'BGMI creators', 'Anime content creators', 'Small to mid creators looking to grow'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                      <CheckCircle2 size={16} className="text-gray-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="bg-[#111] p-6 rounded-xl border border-[#222] shadow-inner">
                <h4 className="text-[#b026ff] font-black uppercase tracking-widest mb-4 border-b border-[#333] pb-2 flex items-center gap-2"><Crosshair size={18} /> My Design Focus</h4>
                <ul className="space-y-3">
                  {['Click-worthy composition', 'High contrast visuals', 'Clear subject focus', 'Scroll-stopping thumbnails'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                      <CheckCircle2 size={16} className="text-gray-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {WORK_PACKAGES.map((pack, idx) => (
              <ScrollReveal key={idx} delay={idx * 150}>
                <div
                  className={`relative bg-[#050507] p-8 transition-all duration-300 border-2 sketch-border flex flex-col h-full
                    ${pack.border} ${pack.glow}
                    ${pack.featured ? 'lg:-translate-y-4 lg:py-12 bg-gradient-to-b from-[#1a0b2e] to-[#0a0a0e]' : 'border-opacity-30 hover:border-opacity-100'}
                  `}
                >
                  {pack.featured && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#b026ff] text-white px-6 py-1 font-black text-xs uppercase tracking-widest sketch-border shadow-[0_0_15px_rgba(176,38,255,0.6)] whitespace-nowrap">
                      Growth Pack
                    </div>
                  )}

                  <div className="flex-1">
                    <h4 className="text-2xl font-black text-white uppercase tracking-wider mb-3">{pack.title}</h4>
                    <p className="text-gray-400 text-sm mb-6 pb-6 border-b border-[#222] leading-relaxed min-h-[80px]">{pack.desc}</p>

                    <ul className="space-y-4 mb-8">
                      {pack.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-300 font-medium">
                          <CheckCircle2 size={18} className={`shrink-0 ${pack.featured ? 'text-[#b026ff]' : 'text-[#00f3ff]'}`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6 space-y-2">
                    {pack.footerLines.map((line, i) => (
                      <p key={i} className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-start gap-2">
                        <span className={pack.featured ? "text-[#b026ff]" : "text-[#00f3ff]"}>👉</span> {line}
                      </p>
                    ))}
                  </div>

                  <a
                    href={`mailto:${CONTACT_INFO.email}?subject=Inquiry: ${pack.title}&body=${encodeURIComponent(`Hi JIXU,\n\nI am interested in the ${pack.title}.\n\nMy Channel/Name is: \nMy project requirements are: \n\nLooking forward to discussing the pricing and getting started!`)}`}
                    className={`w-full py-4 font-black uppercase tracking-widest text-sm sketch-border transition-all text-center flex justify-center items-center gap-2 mt-auto
                    ${pack.featured
                        ? 'bg-[#b026ff] text-white hover:bg-[#9a1ce6] shadow-[0_0_20px_rgba(176,38,255,0.4)]'
                        : 'bg-transparent border border-[#333] text-white hover:border-[#00f3ff] hover:text-[#00f3ff]'
                      }`}
                  >
                    {pack.buttonText} <ArrowUpRightIcon />
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <ShieldCheck size={16} className="text-[#b026ff]" />
              I’m currently working with my first clients, so pricing is kept flexible and fair.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-[#050507] relative border-t border-[#111]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-[#00f3ff] font-bold tracking-widest uppercase text-sm mb-2">Clarity</h2>
            <h3 className="text-4xl font-black uppercase tracking-tighter">Frequent <span className="text-[#b026ff]">Questions</span></h3>
          </div>

          <div className="space-y-6">
            {FAQ_ITEMS.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 100}>
                <div className="bg-[#111] border border-[#222] p-6 rounded-xl hover:border-[#333] transition-colors">
                  <h4 className="flex items-center gap-3 font-bold text-white text-lg mb-3">
                    <HelpCircle className="text-[#b026ff]" size={20} />
                    {item.q}
                  </h4>
                  <p className="text-gray-400 pl-8 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* REAL CONTACT SECTION */}
      <section id="contact" className="py-24 bg-[#0a0a0e] relative border-t border-[#111]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

          <ScrollReveal>
            <div>
              <h2 className="text-[#00f3ff] font-bold tracking-widest uppercase text-sm mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> READY FOR WORK
              </h2>
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Let's build your <span className="text-[#b026ff]">Channel</span></h3>
              <p className="text-gray-400 mb-10 max-w-md text-lg">Send me your ideas through the form below, or reach out directly via Email or Discord. <strong className="text-white">Response within 24 hours.</strong></p>

              <div className="space-y-4">
                <div className="flex items-center gap-6 p-4 bg-[#111] rounded-xl border border-[#222] hover:border-[#5865F2] transition-colors group cursor-pointer" onClick={() => { navigator.clipboard.writeText(CONTACT_INFO.discord); alert('Discord ID copied to clipboard!'); }}>
                  <div className="w-14 h-14 rounded-full bg-[#050507] border border-[#333] flex items-center justify-center group-hover:border-[#5865F2] group-hover:bg-[#5865F2]/10 transition-colors">
                    <DiscordIcon size={24} className="text-gray-400 group-hover:text-[#5865F2] transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Add Me (Click to Copy)</p>
                    <p className="text-xl text-white font-black">{CONTACT_INFO.discord}</p>
                  </div>
                  <Layers className="ml-auto text-gray-600 group-hover:text-[#5865F2] transition-colors" size={20} />
                </div>

                <a href={`mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(CONTACT_INFO.emailSubject)}`} className="flex items-center gap-6 p-4 bg-[#111] rounded-xl border border-[#222] hover:border-[#00f3ff] transition-colors group cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-[#050507] border border-[#333] flex items-center justify-center group-hover:border-[#00f3ff] group-hover:bg-[#00f3ff]/10 transition-colors">
                    <Mail size={24} className="text-gray-400 group-hover:text-[#00f3ff] transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Business Inquiries</p>
                    <p className="text-xl text-white font-black">{CONTACT_INFO.email}</p>
                  </div>
                  <ChevronRight className="ml-auto text-gray-600 group-hover:text-[#00f3ff] group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="bg-[#050507] p-8 border-2 border-[#222] sketch-border relative shadow-2xl">
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNiMDI2ZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48bGluZSB4MT0iNSIgeTE9IjEyIiB4Mj0iMTkiIHkyPSIxMiI+PC9saW5lPjxwb2x5bGluZSBwb2ludHM9IjEyIDUgMTkgMTIgMTIgMTkiPjwvcG9seWxpbmU+PC9zdmc+')] bg-no-repeat bg-center bg-[#111] border border-[#333] rounded-full rotate-45 hidden md:block"></div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-2 mb-4 text-[#00f3ff]">
                  <TerminalIcon /> <span className="font-bold tracking-widest uppercase text-sm">Secure Message Link</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Your Name / Channel <span className="text-[#b026ff]">*</span></label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. NinjaStrike"
                    className="w-full bg-[#0a0a0e] border border-[#333] focus:border-[#b026ff] outline-none text-white px-4 py-4 rounded font-medium transition-colors"
                  />
                  <ValidationError prefix="Name" field="name" errors={formState.errors} className="text-red-500 text-xs mt-1" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address <span className="text-[#b026ff]">*</span></label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@email.com"
                    className="w-full bg-[#0a0a0e] border border-[#333] focus:border-[#00f3ff] outline-none text-white px-4 py-4 rounded font-medium transition-colors"
                  />
                  <ValidationError prefix="Email" field="email" errors={formState.errors} className="text-red-500 text-xs mt-1" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Project Details <span className="text-[#b026ff]">*</span></label>
                  <textarea
                    rows="4"
                    name="message"
                    required
                    placeholder="Tell me about your video idea, style preferences, etc..."
                    className="w-full bg-[#0a0a0e] border border-[#333] focus:border-[#b026ff] outline-none text-white px-4 py-4 rounded font-medium transition-colors resize-none"
                  ></textarea>
                  <ValidationError prefix="Message" field="message" errors={formState.errors} className="text-red-500 text-xs mt-1" />
                </div>

                {formState.succeeded ? (
                  <div className="w-full bg-[#00f3ff]/20 border border-[#00f3ff] text-[#00f3ff] font-bold p-4 rounded flex justify-center items-center gap-2 text-sm uppercase tracking-widest">
                    <CheckCircle2 size={18} /> Transmission received! I will respond within 24 hours.
                  </div>
                ) : (
                  <button
                    disabled={formState.submitting}
                    className="w-full bg-[#b026ff] text-white font-black uppercase tracking-widest py-4 sketch-border flex items-center justify-center gap-2 hover:bg-[#9a1ce6] transition-colors shadow-[0_0_15px_rgba(176,38,255,0.3)] hover:shadow-[0_0_25px_rgba(176,38,255,0.6)] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formState.submitting ? 'Transmitting...' : 'Send Transmission'} <Send size={18} className={formState.submitting ? 'animate-pulse' : ''} />
                  </button>
                )}
              </form>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050507] py-12 border-t border-[#222] text-center relative z-10 pb-28 md:pb-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-gray-500 uppercase">JIXU</span>
            <span className="text-[#b026ff] text-sm font-bold">DESIGNS</span>
          </div>

          <div className="flex gap-4">
            <a href="https://www.youtube.com/@jixu01" target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#111] border border-[#222] rounded-full hover:bg-[#FF0000] hover:border-[#FF0000] transition-colors flex items-center justify-center text-gray-400 hover:text-white"><YoutubeIcon size={18} /></a>
            <a href="#" className="w-10 h-10 bg-[#111] border border-[#222] rounded-full hover:bg-[#E1306C] hover:border-[#E1306C] transition-colors flex items-center justify-center text-gray-400 hover:text-white"><Instagram size={18} /></a>
          </div>

          <p className="text-gray-600 text-sm font-medium">© {new Date().getFullYear()} JIXU Designs. All rights reserved. Evolving every day.</p>
        </div>
      </footer>

      {/* STICKY BOTTOM CTA BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-[#b026ff]/95 backdrop-blur-md border-t border-[#9a1ce6] z-40 px-4 py-3 flex justify-between items-center shadow-[0_-10px_30px_rgba(176,38,255,0.3)] md:hidden">
        <div>
          <p className="text-white font-black text-sm uppercase tracking-wide">🔥 Need a Thumbnail?</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => scrollTo('contact')} className="bg-[#050507] text-white font-black text-xs uppercase px-4 py-2 rounded border border-[#222]">Hire Me</button>
          <a href={`mailto:${CONTACT_INFO.email}`} className="bg-[#00f3ff] text-[#050507] font-black text-xs uppercase px-4 py-2 rounded flex items-center gap-1"><Mail size={14} /> Email</a>
        </div>
      </div>

    </div>
  );
}

// Additional Small UI Icons
function ArrowUpRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17l9.2-9.2M17 17V7H7" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  );
}

function DiscordIcon({ size, className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}

function YoutubeIcon({ size, className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

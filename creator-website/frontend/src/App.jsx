import React, { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import subhashImage from "./assets/subhashimage.png";
import { 
  Youtube, 
  Eye, 
  MapPin,
  MessageCircle,
  Mail,
  Calendar,
  LineChart,
  CheckCircle,
  RotateCw
} from 'lucide-react';

const AnimatedCounter = ({ value, duration = 2.5 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      onUpdate(v) {
        setCount(Math.floor(v));
      }
    });
    return controls.stop;
  }, [value, duration]);

  return <span>{count.toLocaleString()}</span>;
};

function App() {
  const [youtubeStats, setYoutubeStats] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/youtube-stats`)
      .then(res => res.json())
      .then(data => setYoutubeStats(data))
      .catch(err => console.error(err));
  }, []);


  return (
    <div className="unique-card">
      {/* header with photo + short description (two-column) */}
      <div className="profile-header">
        {/* photo section (with icon and name) */}
        <div className="photo-section">
          <div className="photo-frame">
            <img src={subhashImage} alt="Subhash" />
          </div>
          <div>
            <h3>Subhash Chaudhary</h3>
            <div className="location">
              <MapPin size={12} /> Bihar · creator
            </div>
          </div>
        </div>

        {/* intro & short description (bio) */}
        <div className="intro-bio">
          <h1>Subhash Chaudhary</h1>
          <div className="role-tag">content creator</div>
          <div className="short-desc">
            <MessageCircle size={16} color="#A75C3A" style={{ marginRight: '6px', display: 'inline' }} />
          I create content exploring emerging AI applications and their impact on everyday life.
          My work explains new technologies in a clear and practical way while addressing important social issues.
          The goal is to inform, educate, and highlight how innovation influences society.
          </div>
          {/* optional small contact chip */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <a 
         href="mailto:csubhashkumar008@gmail.com" 
         style={{ 
         background: '#ece6df', 
         padding: '0.3rem 1rem', 
         borderRadius: '30px', 
         fontSize: '0.75rem', 
         color: '#2C3E5A',
         textDecoration: 'none',
         display: 'inline-flex',
         alignItems: 'center'
         }}
>
          <Mail size={10} color="#A75C3A" style={{ marginRight: '4px' }} />
          csubhashkumar008@gmail.com
        </a>
            <span style={{ background: '#ece6df', padding: '0.3rem 1rem', borderRadius: '30px', fontSize: '0.75rem', color: '#2C3E5A' }}>
              <Calendar size={10} color="#A75C3A" style={{ marginRight: '4px', display: 'inline' }} /> available for collab
            </span>
          </div>
        </div>
      </div>

      {/* analytics section with three-color execution */}
      <div className="analytics-container">
        <div className="section-label">
          <LineChart size={18} color="#A75C3A" />
          <span>Live analytics</span>
          <CheckCircle size={14} color="#A75C3A" style={{ marginLeft: 'auto' }} />
        </div>

        {/* stats grid */}
        <div className="stats-grid">
          {/* YouTube subs */}
          <div className="stat-tile">
            <div className="stat-label">
              <Youtube size={14} color="#A75C3A" style={{ marginRight: '4px' }} /> YouTube subscribers
            </div>
            <div className="stat-number">
              {youtubeStats && !youtubeStats.error && youtubeStats.subscriberCount !== undefined ? (
                <AnimatedCounter value={Number(youtubeStats.subscriberCount)} />
              ) : (
                <div className="h-8 bg-slate-200 animate-pulse rounded w-16 mx-auto"></div>
              )}
              <small>subs</small>
            </div>
          </div>
          
          {/* Total Views (YouTube) */}
          <div className="stat-tile">
            <div className="stat-label">
              <Eye size={14} color="#A75C3A" style={{ marginRight: '4px' }} /> Total views
            </div>
            <div className="stat-number">
              {youtubeStats && !youtubeStats.error && youtubeStats.viewCount !== undefined ? (
                <AnimatedCounter value={Number(youtubeStats.viewCount)} />
              ) : (
                <div className="h-8 bg-slate-200 animate-pulse rounded w-16 mx-auto"></div>
              )}
              <small></small>
            </div>
            <div className="stat-footnote">fresh start</div>
          </div>
        </div>
      </div>

      {/* connect with me / social area */}
      <div className="connect-zone">
        <div className="connect-headline">
          <div className="line"></div>
          <h4>connect with me</h4>
          <div className="line"></div>
        </div>

        <div className="social-bar">
          <a href="https://youtube.com/@biharibabufactk?si=w-pDHp-gryhcMH36" className="social-button" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-youtube"></i> YouTube
          </a>
          <a href="https://x.com/SubhashCha85240" className="social-button" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-twitter"></i> Twitter / X
          </a>
          <a href="https://www.instagram.com/subhash_chaudhary_780?utm_source=qr&igsh=MTcwMmNtMGloa2xmYQ==" className="social-button" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-instagram"></i> Instagram
          </a>
          <a href="https://www.linkedin.com/in/subhash-chaudhary-aa5b44304?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="social-button" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-linkedin-in"></i> LinkedIn
          </a>
          <a href="https://www.facebook.com/share/1chrrR3Xga/" className="social-button" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-linkedin-in"></i> Facebook
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
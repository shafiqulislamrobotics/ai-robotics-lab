

/* =====================================================
   AI ROBOTICS LAB — Main JavaScript
   ===================================================== */

// ── Navbar scroll effect ──────────────────────────────
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ── Hamburger menu ────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(link =>
    link.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// ── Active nav link ───────────────────────────────────
const currentPage = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href').split('/').pop();
  if (href === currentPage || (currentPage === 'index.html' && href === '#')) {
    link.classList.add('active');
  }
});

// ── Tabs ──────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const group  = btn.closest('[data-tabs]') || btn.closest('section') || document;
    const target = btn.dataset.tab;
    group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    group.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const panel = group.querySelector(`[data-content="${target}"]`);
    if (panel) panel.classList.add('active');
  });
});

// ── Accordion ─────────────────────────────────────────
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const isOpen = header.classList.contains('open');
    const parent = header.closest('.accordion') || document;
    parent.querySelectorAll('.accordion-header').forEach(h => {
      h.classList.remove('open');
      h.nextElementSibling?.classList.remove('open');
    });
    if (!isOpen) {
      header.classList.add('open');
      header.nextElementSibling?.classList.add('open');
    }
  });
});

// ── Intersection Observer: fade-in on scroll ──────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .course-card, .team-card, .lab-grid-item').forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});

// ── Counter animation ─────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + suffix;
  }, 20);
}
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
});
document.querySelectorAll('.stat-num[data-target]').forEach(el => counterObserver.observe(el));

// ── Contact form ──────────────────────────────────────
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type=submit]');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'var(--accent3)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

// ── Smooth scroll for anchor links ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
JSEOF
echo "JS done"
Output

JS done

Create the main index.html homepage
bash

cat > /home/claude/website/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>AI Robotics Lab — Xavier University of Louisiana</title>
  <meta name="description" content="AI for Robotics, Autonomous Systems, Computational Biology, and Climate Computing Research Laboratory at Xavier University of Louisiana."/>
  <link rel="stylesheet" href="assets/css/style.css"/>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>"/>
</head>
<body>

<!-- ════════════════════ NAVBAR ════════════════════ -->
<nav class="navbar">
  <div class="container nav-inner">
    <a href="index.html" class="nav-brand">
      <span class="dot"></span>
      <span>AI Robotics Lab · XULA</span>
    </a>
    <ul class="nav-links">
      <li><a href="index.html" class="active">Home</a></li>
      <li><a href="about/index.html">About</a></li>
      <li><a href="research/index.html">Research</a></li>
      <li><a href="team/index.html">Team</a></li>
      <li><a href="teaching/index.html">Teaching</a></li>
      <li><a href="news/index.html">News</a></li>
      <li><a href="gallery/index.html">Gallery</a></li>
      <li><a href="join/index.html">Join</a></li>
      <li><a href="contact/index.html" class="nav-cta">Contact</a></li>
    </ul>
    <div class="hamburger">
      <span></span><span></span><span></span>
    </div>
  </div>
</nav>

<!-- ════════════════════ NEWS TICKER ════════════════════ -->
<div class="news-ticker" style="margin-top:64px;">
  <div class="ticker-inner">
    <span class="ticker-item"><span class="badge">NEW</span> Research opportunities available for graduate students in AI &amp; Robotics</span>
    <span class="ticker-item"><span class="badge">OPEN</span> Online AI/ML course enrollment — contact Dr. Islam at sislam3@xula.edu</span>
    <span class="ticker-item"><span class="badge">NEWS</span> NASA Global Climate Computing Network systems installed at XULA campus</span>
    <span class="ticker-item"><span class="badge">NEW</span> Research opportunities available for graduate students in AI &amp; Robotics</span>
    <span class="ticker-item"><span class="badge">OPEN</span> Online AI/ML course enrollment — contact Dr. Islam at sislam3@xula.edu</span>
    <span class="ticker-item"><span class="badge">NEWS</span> NASA Global Climate Computing Network systems installed at XULA campus</span>
  </div>
</div>

<!-- ════════════════════ HERO ════════════════════ -->
<section class="hero">
  <div class="hero-bg"></div>
  <div class="container">
    <div class="hero-content">
      <div class="hero-tag">
        <span class="blink"></span>
        Xavier University of Louisiana · Research Laboratory
      </div>
      <h1>
        Artificial Intelligence for<br/>
        <span class="highlight">Robotics, Autonomous Systems,</span><br/>
        Computational Biology &amp; Climate Computing
      </h1>
      <p>Advancing research and development through machine learning, deep learning, reinforcement learning, LLM, and Agentic AI — building intelligent systems that solve real-world challenges.</p>
      <div class="hero-buttons">
        <a href="research/index.html" class="btn btn-primary">⚡ Explore Research</a>
        <a href="teaching/index.html" class="btn btn-outline">📚 AI Courses</a>
        <a href="team/index.html" class="btn btn-ghost">👥 Meet the Team</a>
        <a href="join/index.html" class="btn btn-outline">🚀 Join Our Lab</a>
      </div>
    </div>
  </div>

  <!-- Lab equipment image collage -->
  <div class="hero-images">
    <img src="assets/images/drone.jpg" alt="Drone UAV" class="img-span"/>
    <img src="assets/images/helicopter_vtol.jpg" alt="Helicopter VTOL"/>
    <img src="assets/images/self_driving_car.jpg" alt="Self-Driving Car Module"/>
    <img src="assets/images/mobile_robot.jpg" alt="Mobile Robot"/>
    <img src="assets/images/industrial_robot.jpg" alt="Industrial Robot"/>
  </div>

  <div class="hero-scroll">Scroll</div>
</section>

<!-- ════════════════════ STATS ════════════════════ -->
<section class="section-sm" style="padding-top:0;">
  <div class="container">
    <div class="stats-bar">
      <div class="stat-item">
        <div class="stat-num" data-target="110" data-suffix="+">0+</div>
        <div class="stat-label">Peer-Reviewed Publications</div>
      </div>
      <div class="stat-item">
        <div class="stat-num" data-target="28" data-suffix="+">0+</div>
        <div class="stat-label">Years of Experience</div>
      </div>
      <div class="stat-item">
        <div class="stat-num" data-target="4">0</div>
        <div class="stat-label">Research Areas</div>
      </div>
      <div class="stat-item">
        <div class="stat-num" data-target="8">0</div>
        <div class="stat-label">Industry &amp; Lab Partners</div>
      </div>
      <div class="stat-item">
        <div class="stat-num" data-target="3">0</div>
        <div class="stat-label">State-of-the-Art Labs</div>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════ WELCOME ════════════════════ -->
<section class="section">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;">
      <div>
        <div class="section-subtitle">Welcome</div>
        <h2 class="section-title">Where AI Meets Real-World Engineering</h2>
        <div class="section-divider"></div>
        <p>Welcome to the <strong style="color:#fff">AI for Robotics, Autonomous Systems, Computational Biology and Climate Computing</strong> research and development laboratory at Xavier University of Louisiana.</p>
        <p>Our research focuses on developing AI-driven intelligent robotic systems, autonomous systems, and AI-driven computational biology and climate change prediction and prevention.</p>
        <p>We combine advanced theory and real-world practical implementation to solve real-world challenges in robotics, autonomous systems, healthcare, bioinformatics, and climate change.</p>
        <div style="display:flex;gap:1rem;margin-top:2rem;flex-wrap:wrap;">
          <a href="about/index.html" class="btn btn-primary">Learn About Us</a>
          <a href="https://scholar.google.com/citations?user=tYVDFI0AAAAJ&hl=en" target="_blank" class="btn btn-outline">📄 Publications</a>
        </div>
      </div>
      <div>
        <div class="lab-grid">
          <div class="lab-grid-item wide">
            <img src="assets/images/nasa_equipment.jpg" alt="NASA Equipment at XULA"/>
            <div class="caption">🛰 NASA GPM · AERONET · PANDORA at XULA</div>
          </div>
          <div class="lab-grid-item">
            <img src="assets/images/self_driving_car.jpg" alt="Self-Driving Car"/>
            <div class="caption">Self-Driving Car Module</div>
          </div>
          <div class="lab-grid-item">
            <img src="assets/images/industrial_robot.jpg" alt="Industrial Robot"/>
            <div class="caption">Industrial Robot Platform</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════ RESEARCH AREAS ════════════════════ -->
<section class="section" style="background:rgba(13,27,62,0.3);">
  <div class="container">
    <div class="section-subtitle">Focus Areas</div>
    <h2 class="section-title">Research Areas</h2>
    <div class="section-divider"></div>
    <div class="grid-4">

      <a href="research/index.html#robotics" class="card" style="text-decoration:none;display:block;">
        <div class="card-icon blue">🤖</div>
        <h3 style="color:#fff;margin-bottom:.75rem;">AI for Robotics</h3>
        <p>Computer vision navigation, deep reinforcement learning, LLM-based human-robot interaction, and haptic-VR telemanipulation.</p>
        <span class="badge-glow cyan" style="margin-top:1rem;display:inline-block;">Learn More →</span>
      </a>

      <a href="research/index.html#autonomous" class="card" style="text-decoration:none;display:block;">
        <div class="card-icon purple">🚁</div>
        <h3 style="color:#fff;margin-bottom:.75rem;">Autonomous Systems</h3>
        <p>UAV/drone autonomy, multi-agent coordination, self-driving car modules, and swarm intelligence for aerial &amp; ground vehicles.</p>
        <span class="badge-glow purple" style="margin-top:1rem;display:inline-block;">Learn More →</span>
      </a>

      <a href="research/index.html#compbio" class="card" style="text-decoration:none;display:block;">
        <div class="card-icon green">🧬</div>
        <h3 style="color:#fff;margin-bottom:.75rem;">Computational Biology</h3>
        <p>AI for medical imaging &amp; diagnosis, computational neuroscience, bioinformatics, genomics, and cancer drug delivery.</p>
        <span class="badge-glow green" style="margin-top:1rem;display:inline-block;">Learn More →</span>
      </a>

      <a href="research/index.html#climate" class="card" style="text-decoration:none;display:block;">
        <div class="card-icon amber">🌍</div>
        <h3 style="color:#fff;margin-bottom:.75rem;">Climate Computing</h3>
        <p>Air quality monitoring, greenhouse gas prediction, precipitation &amp; flash flood forecasting using NASA computing networks.</p>
        <span class="badge-glow amber" style="margin-top:1rem;display:inline-block;">Learn More →</span>
      </a>

    </div>
  </div>
</section>

<!-- ════════════════════ LAB EQUIPMENT ════════════════════ -->
<section class="section">
  <div class="container">
    <div class="section-subtitle">Laboratory Facilities</div>
    <h2 class="section-title">Our Equipment &amp; Platforms</h2>
    <div class="section-divider"></div>
    <div class="lab-grid" style="margin-bottom:2rem;">
      <div class="lab-grid-item wide">
        <img src="assets/images/drone.jpg" alt="Drone Fleet" style="height:300px;"/>
        <div class="caption">🚁 Autonomous Drone Fleet — UAV Swarming Platform</div>
      </div>
      <div class="lab-grid-item">
        <img src="assets/images/mobile_robot.jpg" alt="Mobile Robot"/>
        <div class="caption">🤖 Mobile Robotic Systems Fleet</div>
      </div>
      <div class="lab-grid-item">
        <img src="assets/images/helicopter_vtol.jpg" alt="Helicopter VTOL"/>
        <div class="caption">🚀 Helicopter VTOL Platform</div>
      </div>
      <div class="lab-grid-item">
        <img src="assets/images/self_driving_car.jpg" alt="Self Driving Car"/>
        <div class="caption">🚗 Self-Driving Car Modules</div>
      </div>
      <div class="lab-grid-item wide">
        <img src="assets/images/nasa_equipment.jpg" alt="NASA Equipment" style="height:200px;"/>
        <div class="caption">🛰 NASA Global Climate Computing Network (GPM · AERONET · PANDORA)</div>
      </div>
    </div>
    <div class="grid-4" style="margin-top:2rem;">
      <div style="padding:.5rem 0;display:flex;align-items:center;gap:.75rem;color:var(--muted);font-size:.875rem;"><span style="color:var(--accent);">▸</span>Advanced motion capture systems</div>
      <div style="padding:.5rem 0;display:flex;align-items:center;gap:.75rem;color:var(--muted);font-size:.875rem;"><span style="color:var(--accent);">▸</span>Industrial robotic systems</div>
      <div style="padding:.5rem 0;display:flex;align-items:center;gap:.75rem;color:var(--muted);font-size:.875rem;"><span style="color:var(--accent);">▸</span>Haptics &amp; virtual reality systems</div>
      <div style="padding:.5rem 0;display:flex;align-items:center;gap:.75rem;color:var(--muted);font-size:.875rem;"><span style="color:var(--accent);">▸</span>GPU servers for ML/Deep Learning</div>
      <div style="padding:.5rem 0;display:flex;align-items:center;gap:.75rem;color:var(--muted);font-size:.875rem;"><span style="color:var(--accent);">▸</span>Quanser Rotary Servo, QUBE Servo 2/3</div>
      <div style="padding:.5rem 0;display:flex;align-items:center;gap:.75rem;color:var(--muted);font-size:.875rem;"><span style="color:var(--accent);">▸</span>2/3 DOF Helicopter platforms</div>
      <div style="padding:.5rem 0;display:flex;align-items:center;gap:.75rem;color:var(--muted);font-size:.875rem;"><span style="color:var(--accent);">▸</span>Embedded AI hardware &amp; sensing</div>
      <div style="padding:.5rem 0;display:flex;align-items:center;gap:.75rem;color:var(--muted);font-size:.875rem;"><span style="color:var(--accent);">▸</span>NASA GPM · AERONET · PANDORA</div>
    </div>
  </div>
</section>

<!-- ════════════════════ FUNDING ════════════════════ -->
<section class="section-sm" style="background:rgba(13,27,62,0.3);">
  <div class="container">
    <div class="section-subtitle">Funding &amp; Support</div>
    <h2 class="section-title" style="font-size:1.6rem;">Supported By Leading Organizations</h2>
    <div class="section-divider"></div>
    <div class="partners-grid">
      <div class="partner-chip">🚀 NASA</div>
      <div class="partner-chip">⚓ Office of Naval Research</div>
      <div class="partner-chip">🔬 NSF</div>
      <div class="partner-chip">🍁 NSERC Canada</div>
      <div class="partner-chip">🎓 Harvard University</div>
      <div class="partner-chip">🏫 Carleton University</div>
      <div class="partner-chip">🌐 Khalifa University</div>
      <div class="partner-chip">🇯🇵 MEXT Japan</div>
      <div class="partner-chip">🏛 Xavier University of Louisiana</div>
      <div class="partner-chip">🏭 CMC Electronics Inc.</div>
      <div class="partner-chip">⚙️ Quanser Consulting Inc.</div>
      <div class="partner-chip">🇵🇹 ISR-UC Coimbra</div>
    </div>
  </div>
</section>

<!-- ════════════════════ TEACHING PREVIEW ════════════════════ -->
<section class="section">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start;">
      <div>
        <div class="section-subtitle">Education</div>
        <h2 class="section-title">Teaching Courses</h2>
        <div class="section-divider"></div>
        <p>Dr. Islam brings over 28 years of experience developing and teaching courses in Robotics, Mechatronics, Autonomous Systems, and AI across multiple universities internationally.</p>
        <p>Our lab offers online AI/ML courses and face-to-face courses at XULA — each featuring real research projects, hands-on datasets, and cutting-edge tools.</p>
        <div style="display:flex;gap:1rem;margin-top:2rem;flex-wrap:wrap;">
          <a href="teaching/index.html#online" class="btn btn-primary">Online AI Courses</a>
          <a href="teaching/index.html#xula" class="btn btn-outline">XULA Courses</a>
        </div>
      </div>
      <div>
        <div class="grid-2" style="gap:1rem;">
          <div class="card" style="padding:1.25rem;">
            <div style="font-size:1.5rem;margin-bottom:.5rem;">🤖</div>
            <h4 style="color:#fff;font-size:.95rem;">Machine Learning</h4>
            <p style="font-size:.82rem;margin:0;">All classical ML algorithms with robotics applications</p>
          </div>
          <div class="card" style="padding:1.25rem;">
            <div style="font-size:1.5rem;margin-bottom:.5rem;">👁</div>
            <h4 style="color:#fff;font-size:.95rem;">Computer Vision &amp; DL</h4>
            <p style="font-size:.82rem;margin:0;">CNNs, object detection, semantic segmentation</p>
          </div>
          <div class="card" style="padding:1.25rem;">
            <div style="font-size:1.5rem;margin-bottom:.5rem;">🧠</div>
            <h4 style="color:#fff;font-size:.95rem;">Large Language Models</h4>
            <p style="font-size:.82rem;margin:0;">Transformers, RAG, Agentic AI, fine-tuning</p>
          </div>
          <div class="card" style="padding:1.25rem;">
            <div style="font-size:1.5rem;margin-bottom:.5rem;">🚁</div>
            <h4 style="color:#fff;font-size:.95rem;">Robotics AI</h4>
            <p style="font-size:.82rem;margin:0;">SLAM, RL, motion planning, multi-agent systems</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════ NEWS ════════════════════ -->
<section class="section" style="background:rgba(13,27,62,0.3);">
  <div class="container">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:2rem;flex-wrap:wrap;gap:1rem;">
      <div>
        <div class="section-subtitle">Updates</div>
        <h2 class="section-title">News &amp; Events</h2>
        <div class="section-divider" style="margin-bottom:0;"></div>
      </div>
      <a href="news/index.html" class="btn btn-outline btn-sm">View All News →</a>
    </div>
    <div class="grid-3">
      <div class="card">
        <span class="badge-glow cyan" style="margin-bottom:1rem;display:inline-block;">Opportunity</span>
        <h4 style="color:#fff;margin-bottom:.5rem;">Graduate Research Positions Open</h4>
        <p style="font-size:.875rem;">We are recruiting motivated graduate and undergraduate students in AI, Robotics, and Climate Computing. Contact Dr. Islam to inquire.</p>
        <a href="join/index.html" style="font-size:.85rem;color:var(--accent);">Apply Now →</a>
      </div>
      <div class="card">
        <span class="badge-glow green" style="margin-bottom:1rem;display:inline-block;">Course</span>
        <h4 style="color:#fff;margin-bottom:.5rem;">Online AI/ML Courses Now Available</h4>
        <p style="font-size:.875rem;">Practical, research-oriented courses in ML, Deep Learning, LLMs, and Robotics AI with real project datasets.</p>
        <a href="teaching/index.html" style="font-size:.85rem;color:var(--accent);">Enroll →</a>
      </div>
      <div class="card">
        <span class="badge-glow amber" style="margin-bottom:1rem;display:inline-block;">Facility</span>
        <h4 style="color:#fff;margin-bottom:.5rem;">NASA Climate Computing Network at XULA</h4>
        <p style="font-size:.875rem;">GPM, AERONET, and PANDORA global network systems are operational at Xavier University campus for climate research.</p>
        <a href="research/index.html#climate" style="font-size:.85rem;color:var(--accent);">Learn More →</a>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════ CTA ════════════════════ -->
<section class="section">
  <div class="container" style="text-align:center;">
    <div style="max-width:600px;margin:0 auto;">
      <h2 style="color:#fff;margin-bottom:1rem;">Ready to Collaborate or Join?</h2>
      <p>We welcome motivated students, researchers, and industry partners to join our lab or collaborate on cutting-edge AI research projects.</p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:2rem;">
        <a href="join/index.html" class="btn btn-primary">🚀 Join the Lab</a>
        <a href="contact/index.html" class="btn btn-outline">📧 Contact Us</a>
        <a href="https://scholar.google.com/citations?user=tYVDFI0AAAAJ&hl=en" target="_blank" class="btn btn-ghost">📄 Google Scholar</a>
      </div>
    </div>
  </div>
</section>

<!-- ════════════════════ FOOTER ════════════════════ -->
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <h3>AI Robotics Lab · XULA</h3>
        <p>AI for Robotics, Autonomous Systems, Computational Biology, and Climate Computing Research Laboratory at Xavier University of Louisiana.</p>
        <p style="margin-top:1rem;">📧 <a href="mailto:sislam3@xula.edu" style="color:var(--accent);">sislam3@xula.edu</a></p>
      </div>
      <div class="footer-col">
        <h4>Research</h4>
        <ul>
          <li><a href="research/index.html#robotics">AI for Robotics</a></li>
          <li><a href="research/index.html#autonomous">Autonomous Systems</a></li>
          <li><a href="research/index.html#compbio">Computational Biology</a></li>
          <li><a href="research/index.html#climate">Climate Computing</a></li>
          <li><a href="research/index.html#publications">Publications</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Teaching</h4>
        <ul>
          <li><a href="teaching/index.html#online">Online AI Courses</a></li>
          <li><a href="teaching/index.html#xula">XULA Courses</a></li>
          <li><a href="teaching/index.html#past">Past Courses</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Lab</h4>
        <ul>
          <li><a href="about/index.html">About</a></li>
          <li><a href="team/index.html">Team</a></li>
          <li><a href="gallery/index.html">Gallery</a></li>
          <li><a href="join/index.html">Join Us</a></li>
          <li><a href="contact/index.html">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 AI Robotics Research Lab · Xavier University of Louisiana</span>
      <div class="footer-social">
        <a href="https://scholar.google.com/citations?user=tYVDFI0AAAAJ&hl=en" target="_blank" class="social-icon" title="Google Scholar">🎓</a>
        <a href="mailto:sislam3@xula.edu" class="social-icon" title="Email">✉️</a>
      </div>
    </div>
  </div>
</footer>

<script src="assets/js/main.js"></script>
</body>
</html>
EOF
echo "index.html done"
Output

index.html done

Create about page
bash

cat > /home/claude/website/about/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>About the Lab — AI Robotics Lab XULA</title>
  <link rel="stylesheet" href="../assets/css/style.css"/>
</head>
<body>
<nav class="navbar">
  <div class="container nav-inner">
    <a href="../index.html" class="nav-brand"><span class="dot"></span>AI Robotics Lab · XULA</a>
    <ul class="nav-links">
      <li><a href="../index.html">Home</a></li>
      <li><a href="index.html" class="active">About</a></li>
      <li><a href="../research/index.html">Research</a></li>
      <li><a href="../team/index.html">Team</a></li>
      <li><a href="../teaching/index.html">Teaching</a></li>
      <li><a href="../news/index.html">News</a></li>
      <li><a href="../gallery/index.html">Gallery</a></li>
      <li><a href="../join/index.html">Join</a></li>
      <li><a href="../contact/index.html" class="nav-cta">Contact</a></li>
    </ul>
    <div class="hamburger"><span></span><span></span><span></span></div>
  </div>
</nav>

<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="../index.html">Home</a><span>/</span><span>About the Lab</span></div>
    <h1>About the Lab</h1>
    <p style="color:var(--muted);max-width:600px;margin:0 auto;">AI for Robotics, Autonomous Systems, Computational Biology &amp; Climate Computing Research Laboratory</p>
  </div>
</section>

<!-- Mission & Vision -->
<section class="section">
  <div class="container">
    <div class="grid-2" style="gap:3rem;align-items:start;">
      <div>
        <div class="section-subtitle">Our Purpose</div>
        <h2 class="section-title">Mission Statement</h2>
        <div class="section-divider"></div>
        <p style="color:var(--text);font-size:1.05rem;line-height:1.8;">Our laboratory develops intelligent systems that integrate theoretical models with artificial intelligence — Machine Learning, Deep Learning, Reinforcement Learning, Adaptive Learning, LLM, and Agentic AI — for robotics, autonomous systems, biological systems and climate change, to create technologies capable of solving complex scientific and real-world engineering problems.</p>
      </div>
      <div>
        <div class="section-subtitle">Our Aim</div>
        <h2 class="section-title">Vision</h2>
        <div class="section-divider"></div>
        <p style="color:var(--text);font-size:1.05rem;line-height:1.8;">Leading interdisciplinary research and advancing the future of AI-driven intelligent robotics, autonomous systems, and AI-driven healthcare and climate technologies.</p>
        <div style="margin-top:2rem;">
          <h3 style="color:#fff;margin-bottom:1rem;font-size:1.1rem;">Core Research Philosophy</h3>
          <ul class="styled-list">
            <li>Interdisciplinary AI research</li>
            <li>Theory with real-world deployment</li>
            <li>Scientific innovation and dissemination</li>
            <li>Scalable robotics &amp; autonomous intelligence</li>
            <li>Ethical and trustworthy AI</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Lab Facilities -->
<section class="section" style="background:rgba(13,27,62,0.3);">
  <div class="container">
    <div class="section-subtitle">Infrastructure</div>
    <h2 class="section-title">Laboratory Facilities</h2>
    <div class="section-divider"></div>
    <p style="max-width:700px;margin-bottom:3rem;">Our three state-of-the-art labs are equipped with advanced experimental testbeds containing the following setup for research and project-based teaching courses.</p>
    <div class="grid-3" style="margin-bottom:3rem;">
      <div class="card">
        <div class="card-icon blue">🚁</div>
        <h3 style="color:#fff;margin-bottom:.75rem;">Autonomous Systems Lab</h3>
        <ul class="styled-list">
          <li>Autonomous drone fleet for swarming</li>
          <li>Fleet of self-driving car modules</li>
          <li>Fleet of mobile robotic systems</li>
          <li>Helicopter VTOL platforms</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-icon purple">🤖</div>
        <h3 style="color:#fff;margin-bottom:.75rem;">Robotics &amp; Mechatronics Lab</h3>
        <ul class="styled-list">
          <li>Advanced motion capture systems</li>
          <li>Industrial robotic systems</li>
          <li>Haptics &amp; virtual reality systems</li>
          <li>Quanser platforms (Servo, Pendulum, QUBE)</li>
          <li>2/3 DOF Helicopter, 2/4 DOF Planar manipulators</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-icon green">🛰</div>
        <h3 style="color:#fff;margin-bottom:.75rem;">Climate Computing Lab</h3>
        <ul class="styled-list">
          <li>NASA Global Climate Computing Networks</li>
          <li>GPM, AERONET &amp; PANDORA systems</li>
          <li>GPU servers for ML/Deep Learning</li>
          <li>Embedded AI hardware &amp; sensing</li>
        </ul>
      </div>
    </div>
    <div class="lab-grid">
      <div class="lab-grid-item wide">
        <img src="../assets/images/drone.jpg" alt="Drone Lab" style="height:280px;"/>
        <div class="caption">Autonomous Drone Fleet — Swarming Platform</div>
      </div>
      <div class="lab-grid-item">
        <img src="../assets/images/helicopter_vtol.jpg" alt="VTOL"/>
        <div class="caption">Helicopter VTOL Platform</div>
      </div>
      <div class="lab-grid-item">
        <img src="../assets/images/industrial_robot.jpg" alt="Industrial Robot"/>
        <div class="caption">Industrial Robot Systems</div>
      </div>
      <div class="lab-grid-item">
        <img src="../assets/images/mobile_robot.jpg" alt="Mobile Robot"/>
        <div class="caption">Mobile Robotic Fleet</div>
      </div>
      <div class="lab-grid-item wide">
        <img src="../assets/images/nasa_equipment.jpg" alt="NASA Equipment" style="height:200px;"/>
        <div class="caption">NASA GPM · AERONET · PANDORA at XULA Campus</div>
      </div>
    </div>
  </div>
</section>

<!-- Funding -->
<section class="section">
  <div class="container">
    <div class="section-subtitle">Support</div>
    <h2 class="section-title">Funding &amp; Partners</h2>
    <div class="section-divider"></div>
    <div class="partners-grid">
      <div class="partner-chip">🚀 NASA</div>
      <div class="partner-chip">⚓ Office of Naval Research (ONR/Navy)</div>
      <div class="partner-chip">🔬 National Science Foundation (NSF)</div>
      <div class="partner-chip">🍁 NSERC Canada</div>
      <div class="partner-chip">🎓 Canada Research Chairs Program</div>
      <div class="partner-chip">📚 Harvard University</div>
      <div class="partner-chip">🏫 Carleton University</div>
      <div class="partner-chip">🏛 Xavier University of Louisiana</div>
      <div class="partner-chip">🌐 Khalifa University, Abu Dhabi</div>
      <div class="partner-chip">🇯🇵 MEXT Japan</div>
      <div class="partner-chip">🌲 Ontario Trillium Foundation</div>
      <div class="partner-chip">🏭 CMC Electronics Inc.</div>
      <div class="partner-chip">⚙️ Quanser Consulting Inc.</div>
      <div class="partner-chip">🇵🇹 ISR-UC, University of Coimbra</div>
      <div class="partner-chip">🏛 University of Ottawa</div>
      <div class="partner-chip">🏫 Lakehead University</div>
    </div>
  </div>
</section>

<footer>
  <div class="container">
    <div class="footer-bottom">
      <span>© 2025 AI Robotics Research Lab · Xavier University of Louisiana</span>
      <a href="mailto:sislam3@xula.edu" style="color:var(--accent);">sislam3@xula.edu</a>
    </div>
  </div>
</footer>
<script src="../assets/js/main.js"></script>
</body>
</html>
EOF
echo "about done"
Output

about done

Create research page
bash

cat > /home/claude/website/research/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Research Areas — AI Robotics Lab XULA</title>
  <link rel="stylesheet" href="../assets/css/style.css"/>
</head>
<body>
<nav class="navbar">
  <div class="container nav-inner">
    <a href="../index.html" class="nav-brand"><span class="dot"></span>AI Robotics Lab · XULA</a>
    <ul class="nav-links">
      <li><a href="../index.html">Home</a></li>
      <li><a href="../about/index.html">About</a></li>
      <li><a href="index.html" class="active">Research</a></li>
      <li><a href="../team/index.html">Team</a></li>
      <li><a href="../teaching/index.html">Teaching</a></li>
      <li><a href="../news/index.html">News</a></li>
      <li><a href="../gallery/index.html">Gallery</a></li>
      <li><a href="../join/index.html">Join</a></li>
      <li><a href="../contact/index.html" class="nav-cta">Contact</a></li>
    </ul>
    <div class="hamburger"><span></span><span></span><span></span></div>
  </div>
</nav>

<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="../index.html">Home</a><span>/</span><span>Research Areas</span></div>
    <h1>Research Areas</h1>
    <p style="color:var(--muted);max-width:620px;margin:0 auto;">Advancing intelligent systems across four interconnected domains through AI, machine learning, and real-world deployment.</p>
  </div>
</section>

<!-- Area 1: Robotics -->
<section class="section" id="robotics">
  <div class="container">
    <div class="grid-2" style="gap:3rem;align-items:start;">
      <div>
        <span class="badge-glow cyan" style="margin-bottom:1rem;display:inline-block;">Area 01</span>
        <h2 class="section-title">AI for Robotics</h2>
        <div class="section-divider"></div>
        <p>Research on the development of intelligent robotic and autonomous systems capable of learning, adaptation, autonomous decision-making, and interaction with uncertain dynamic environments.</p>
        <h4 style="color:#fff;margin:1.5rem 0 .75rem;">Research Topics</h4>
        <ul class="styled-list">
          <li>Machine learning and deep reinforcement learning for robot perception and navigation</li>
          <li>Computer vision guided navigation, control and manipulations</li>
          <li>LLM, RAG, and Agentic AI for human-robot interaction</li>
          <li>Robot localization and mapping (SLAM)</li>
          <li>Vision-based navigation and control</li>
          <li>Intelligent mobile and aerial manipulation</li>
          <li>Swarm intelligence, multi-robot coordination, control and manipulation</li>
          <li>Human-robot collaboration</li>
          <li>Haptics, virtual reality and tele-robotics over the internet</li>
          <li>ML/DL for haptic-virtual reality based telemanipulation</li>
        </ul>
      </div>
      <div>
        <div class="lab-grid-item" style="margin-bottom:1rem;">
          <img src="../assets/images/mobile_robot.jpg" alt="Mobile Robot" style="height:240px;border-radius:var(--radius);"/>
          <div class="caption">Mobile Robotic Systems Platform</div>
        </div>
        <div class="lab-grid-item">
          <img src="../assets/images/industrial_robot.jpg" alt="Industrial Robot" style="height:200px;border-radius:var(--radius);"/>
          <div class="caption">Industrial Robotic Systems</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Area 2: Autonomous -->
<section class="section" id="autonomous" style="background:rgba(13,27,62,0.3);">
  <div class="container">
    <div class="grid-2" style="gap:3rem;align-items:start;">
      <div>
        <div class="lab-grid-item" style="margin-bottom:1rem;">
          <img src="../assets/images/drone.jpg" alt="Drone" style="height:240px;border-radius:var(--radius);"/>
          <div class="caption">Autonomous Drone Fleet</div>
        </div>
        <div class="lab-grid-item">
          <img src="../assets/images/self_driving_car.jpg" alt="Self Driving Car" style="height:180px;border-radius:var(--radius);"/>
          <div class="caption">Self-Driving Car Module</div>
        </div>
      </div>
      <div>
        <span class="badge-glow purple" style="margin-bottom:1rem;display:inline-block;">Area 02</span>
        <h2 class="section-title">Autonomous Systems</h2>
        <div class="section-divider"></div>
        <p>Development of autonomous systems capable of operating and manipulating aerial and mobile tasks safely and efficiently in dynamic and uncertain environments.</p>
        <h4 style="color:#fff;margin:1.5rem 0 .75rem;">Research Topics</h4>
        <ul class="styled-list">
          <li>UAV/drone and mobile vehicle autonomy</li>
          <li>Multi-agents (Drone/aerial, mobile/ground, industrial robot) coordination</li>
          <li>Self-driving cars (small scale modules) autonomy</li>
          <li>Swarm robotics (UAVs, Ground/mobile vehicles)</li>
          <li>Swarm intelligence with Drone/UAV, Mobile vehicles and Euler Lagrange systems</li>
          <li>Multi-agent systems and distributed optimization</li>
          <li>Cyber-physical systems</li>
          <li>Internet-based teleoperation, telemanipulation, and telepresence</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- Area 3: Comp Bio -->
<section class="section" id="compbio">
  <div class="container">
    <div style="max-width:700px;">
      <span class="badge-glow green" style="margin-bottom:1rem;display:inline-block;">Area 03</span>
      <h2 class="section-title">Computational Biology</h2>
      <div class="section-divider"></div>
      <p>Applying machine learning, deep reinforcement learning, LLM, and Agentic AI to biological, biomedical, and healthcare problems.</p>
    </div>
    <div class="grid-3" style="margin-top:2.5rem;">
      <div class="card">
        <div class="card-icon green">🔬</div>
        <h3 style="color:#fff;margin-bottom:.75rem;">Biomedical Imaging</h3>
        <ul class="styled-list" style="font-size:.85rem;">
          <li>AI for medical imaging and diagnosis</li>
          <li>Biomedical image processing</li>
          <li>Disease detection and prevention</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-icon blue">🧠</div>
        <h3 style="color:#fff;margin-bottom:.75rem;">Neuroscience &amp; Genomics</h3>
        <ul class="styled-list" style="font-size:.85rem;">
          <li>AI for computational neuroscience</li>
          <li>Protein structure analysis</li>
          <li>Genomics and bioinformatics</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-icon amber">💊</div>
        <h3 style="color:#fff;margin-bottom:.75rem;">Drug Discovery</h3>
        <ul class="styled-list" style="font-size:.85rem;">
          <li>Cancer drug delivery and efficacy</li>
          <li>AI for bioinformatics</li>
          <li>Transfer learning for biomedical applications</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- Area 4: Climate -->
<section class="section" id="climate" style="background:rgba(13,27,62,0.3);">
  <div class="container">
    <div class="grid-2" style="gap:3rem;align-items:start;">
      <div>
        <span class="badge-glow amber" style="margin-bottom:1rem;display:inline-block;">Area 04</span>
        <h2 class="section-title">Climate Computing &amp; Environmental Intelligence</h2>
        <div class="section-divider"></div>
        <p>Applying data-driven AI for climate prediction and warning systems for the general public and decision makers, leveraging NASA's Global Climate Computing Networks at XULA.</p>
        <h4 style="color:#fff;margin:1.5rem 0 .75rem;">Research Topics</h4>
        <ul class="styled-list">
          <li>Air quality monitoring &amp; prediction (PM1–10, CO₂, CH₄, SO₂, NO₂)</li>
          <li>Greenhouse gas prediction &amp; climate analytics</li>
          <li>Precipitation &amp; flash flood forecasting</li>
          <li>Climate computing &amp; Earth observation</li>
          <li>Autonomous environmental sensing</li>
          <li>Environmental digital twins &amp; decision intelligence</li>
          <li>Explainable AI for climate resilience</li>
        </ul>
      </div>
      <div>
        <div class="lab-grid-item">
          <img src="../assets/images/nasa_equipment.jpg" alt="NASA Equipment" style="height:280px;border-radius:var(--radius);"/>
          <div class="caption">🛰 NASA GPM · AERONET · PANDORA — XULA Campus</div>
        </div>
        <div class="card" style="margin-top:1rem;padding:1.25rem;">
          <h4 style="color:var(--accent);font-family:var(--font-mono);font-size:.8rem;margin-bottom:.75rem;">NASA INSTRUMENTS ON CAMPUS</h4>
          <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
            <span class="badge-glow amber">GPM — Global Precipitation Measurement</span>
            <span class="badge-glow amber">AERONET — Aerosol Network</span>
            <span class="badge-glow amber">PANDORA — Air Quality</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Publications -->
<section class="section" id="publications">
  <div class="container" style="text-align:center;">
    <div class="section-subtitle">Scholarly Work</div>
    <h2 class="section-title">Publications</h2>
    <div class="section-divider" style="margin:1rem auto 2rem;"></div>
    <p style="max-width:580px;margin:0 auto 2rem;">Dr. Islam is the author and co-author of more than <strong style="color:#fff">110 peer-reviewed journal and conference publications</strong> in high-impact venues. Recognized as a <strong style="color:var(--accent);">Top 2% Scientist</strong> worldwide.</p>
    <a href="https://scholar.google.com/citations?user=tYVDFI0AAAAJ&hl=en" target="_blank" class="btn btn-primary" style="font-size:1rem;padding:1rem 2.5rem;">
      🎓 View Google Scholar Profile
    </a>
  </div>
</section>

<footer>
  <div class="container">
    <div class="footer-bottom">
      <span>© 2025 AI Robotics Research Lab · Xavier University of Louisiana</span>
      <a href="mailto:sislam3@xula.edu" style="color:var(--accent);">sislam3@xula.edu</a>
    </div>
  </div>
</footer>
<script src="../assets/js/main.js"></script>
</body>
</html>
EOF
echo "research done"
Output

research done

Create team page
bash

cat > /home/claude/website/team/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Research Team — AI Robotics Lab XULA</title>
  <link rel="stylesheet" href="../assets/css/style.css"/>
</head>
<body>
<nav class="navbar">
  <div class="container nav-inner">
    <a href="../index.html" class="nav-brand"><span class="dot"></span>AI Robotics Lab · XULA</a>
    <ul class="nav-links">
      <li><a href="../index.html">Home</a></li>
      <li><a href="../about/index.html">About</a></li>
      <li><a href="../research/index.html">Research</a></li>
      <li><a href="index.html" class="active">Team</a></li>
      <li><a href="../teaching/index.html">Teaching</a></li>
      <li><a href="../news/index.html">News</a></li>
      <li><a href="../gallery/index.html">Gallery</a></li>
      <li><a href="../join/index.html">Join</a></li>
      <li><a href="../contact/index.html" class="nav-cta">Contact</a></li>
    </ul>
    <div class="hamburger"><span></span><span></span><span></span></div>
  </div>
</nav>

<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="../index.html">Home</a><span>/</span><span>Research Team</span></div>
    <h1>Research Team</h1>
    <p style="color:var(--muted);">Meet the people driving innovation at our lab</p>
  </div>
</section>

<!-- PI -->
<section class="section">
  <div class="container">
    <div class="section-subtitle">Principal Investigator</div>
    <h2 class="section-title">Faculty</h2>
    <div class="section-divider"></div>
    <div class="card" style="max-width:900px;">
      <div style="display:grid;grid-template-columns:auto 1fr;gap:2rem;align-items:start;">
        <div style="text-align:center;">
          <div class="team-avatar" style="width:100px;height:100px;font-size:2.5rem;margin-bottom:.75rem;">👨‍🔬</div>
          <div style="font-family:var(--font-mono);font-size:.75rem;color:var(--accent);">PRINCIPAL INVESTIGATOR</div>
        </div>
        <div>
          <h2 style="color:#fff;margin-bottom:.25rem;">Dr. Shafiqul Islam</h2>
          <p style="color:var(--accent);font-family:var(--font-mono);font-size:.85rem;margin-bottom:1rem;">Xavier University of Louisiana</p>
          <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.25rem;">
            <span class="badge-glow cyan">AI / Machine Learning</span>
            <span class="badge-glow purple">Robotics</span>
            <span class="badge-glow green">Autonomous Systems</span>
            <span class="badge-glow amber">Climate Computing</span>
            <span class="badge-glow cyan">Top 2% Scientist</span>
          </div>
          <h4 style="color:#fff;margin-bottom:.5rem;">Research Interests</h4>
          <p style="font-size:.9rem;">Artificial Intelligence (Machine Learning, Deep Learning, Reinforcement Learning, Large Language Models, and Agentic AI), Robotics, Autonomous Systems, Computational Biology, and Climate Computing.</p>
          <h4 style="color:#fff;margin:.75rem 0 .5rem;">Biography</h4>
          <p style="font-size:.875rem;">Dr. Islam's research focuses on AI-driven robotics, mechatronics, autonomous systems, adaptive and machine learning-based control for smart grid networks, and ML/DL applications in environmental monitoring and computational network systems.</p>
          <p style="font-size:.875rem;">With more than <strong style="color:#fff">28 years of experience</strong> in higher education, Dr. Islam has developed and taught a wide range of courses spanning Robotics, Mechatronics, Autonomous Systems, Electrical and Electronics Engineering, Computer Science, and Engineering disciplines.</p>
          <p style="font-size:.875rem;">His research has been supported by NASA, ONR/Navy, NSF, NSERC Canada, Harvard University, Carleton University, Khalifa University, MEXT Japan, and many other governmental, industrial, and academic organizations. He is the author and co-author of <strong style="color:#fff">more than 110 peer-reviewed publications</strong>.</p>
          <div style="display:flex;gap:1rem;margin-top:1.5rem;flex-wrap:wrap;">
            <a href="https://scholar.google.com/citations?user=tYVDFI0AAAAJ&hl=en" target="_blank" class="btn btn-primary btn-sm">🎓 Google Scholar</a>
            <a href="mailto:sislam3@xula.edu" class="btn btn-outline btn-sm">✉️ sislam3@xula.edu</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Collaborators -->
<section class="section" style="background:rgba(13,27,62,0.3);">
  <div class="container">
    <div class="section-subtitle">Collaborators</div>
    <h2 class="section-title">Research Collaborators</h2>
    <div class="section-divider"></div>
    <div class="grid-3">
      <div class="team-card">
        <div class="team-avatar">👨‍💼</div>
        <div class="team-role">Research Collaborator</div>
        <h3 style="color:#fff;font-size:1.1rem;">Dr. Toufik Al Khawli</h3>
        <p style="font-size:.85rem;margin-top:.5rem;">Research collaboration in AI and robotics systems</p>
      </div>
      <div class="team-card">
        <div class="team-avatar">👨‍💼</div>
        <div class="team-role">Research Collaborator</div>
        <h3 style="color:#fff;font-size:1.1rem;">Dr. Freddie Landry</h3>
        <p style="font-size:.85rem;margin-top:.5rem;">Collaborative research in engineering and autonomous systems</p>
      </div>
      <div class="team-card">
        <div class="team-avatar">👨‍💼</div>
        <div class="team-role">Research Collaborator</div>
        <h3 style="color:#fff;font-size:1.1rem;">Dr. Morewell Gasseller</h3>
        <p style="font-size:.85rem;margin-top:.5rem;">Collaborative research in AI and engineering</p>
      </div>
    </div>
  </div>
</section>

<!-- Open Positions -->
<section class="section">
  <div class="container">
    <div class="section-subtitle">Join Us</div>
    <h2 class="section-title">Research Associates &amp; Students</h2>
    <div class="section-divider"></div>
    <div class="card" style="text-align:center;max-width:600px;margin:0 auto;">
      <div style="font-size:3rem;margin-bottom:1rem;">🚀</div>
      <h3 style="color:#fff;margin-bottom:.75rem;">We Are Recruiting!</h3>
      <p>We are actively seeking motivated graduate and undergraduate students, as well as research associates, to join our lab in the areas of AI, Robotics, Autonomous Systems, Computational Biology, and Climate Computing.</p>
      <a href="../join/index.html" class="btn btn-primary" style="margin-top:1.5rem;">Apply to Join the Lab</a>
    </div>
  </div>
</section>

<!-- Partner Labs -->
<section class="section" style="background:rgba(13,27,62,0.3);">
  <div class="container">
    <div class="section-subtitle">Global Network</div>
    <h2 class="section-title">National &amp; International Research Labs</h2>
    <div class="section-divider"></div>
    <div class="grid-auto">
      <div class="card" style="padding:1.25rem;">
        <h4 style="color:var(--accent);font-size:.85rem;margin-bottom:.4rem;">🇨🇦 Canada</h4>
        <p style="font-size:.85rem;margin:0;">Multimedia Communications Research Lab, University of Ottawa</p>
      </div>
      <div class="card" style="padding:1.25rem;">
        <h4 style="color:var(--accent);font-size:.85rem;margin-bottom:.4rem;">🇦🇪 UAE</h4>
        <p style="font-size:.85rem;margin:0;">VSAP Lab &amp; Autonomous Vehicles Lab, Khalifa University, Abu Dhabi</p>
      </div>
      <div class="card" style="padding:1.25rem;">
        <h4 style="color:var(--accent);font-size:.85rem;margin-bottom:.4rem;">🇵🇹 Portugal</h4>
        <p style="font-size:.85rem;margin:0;">ISR-UC, University of Coimbra</p>
      </div>
      <div class="card" style="padding:1.25rem;">
        <h4 style="color:var(--accent);font-size:.85rem;margin-bottom:.4rem;">🇺🇸 Louisiana, USA</h4>
        <p style="font-size:.85rem;margin:0;">Dept. of Naval Architecture &amp; Marine Engineering, University of New Orleans</p>
      </div>
      <div class="card" style="padding:1.25rem;">
        <h4 style="color:var(--accent);font-size:.85rem;margin-bottom:.4rem;">🇨🇦 Canada</h4>
        <p style="font-size:.85rem;margin:0;">Quanser Consulting Inc., Toronto</p>
      </div>
      <div class="card" style="padding:1.25rem;">
        <h4 style="color:var(--accent);font-size:.85rem;margin-bottom:.4rem;">🇮🇹 Italy</h4>
        <p style="font-size:.85rem;margin:0;">The Biorobotics Institute, Sant'Anna School, Pisa</p>
      </div>
      <div class="card" style="padding:1.25rem;">
        <h4 style="color:var(--accent);font-size:.85rem;margin-bottom:.4rem;">🇺🇸 Nevada, USA</h4>
        <p style="font-size:.85rem;margin:0;">Computer Science, University of Nevada Las Vegas (UNLV)</p>
      </div>
    </div>
  </div>
</section>

<footer>
  <div class="container">
    <div class="footer-bottom">
      <span>© 2025 AI Robotics Research Lab · Xavier University of Louisiana</span>
      <a href="mailto:sislam3@xula.edu" style="color:var(--accent);">sislam3@xula.edu</a>
    </div>
  </div>
</footer>
<script src="../assets/js/main.js"></script>
</body>
</html>
EOF
echo "team done"
Output

team done

Create teaching page
bash

cat > /home/claude/website/teaching/index.html << 'HTMLEOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Teaching Courses — AI Robotics Lab XULA</title>
  <link rel="stylesheet" href="../assets/css/style.css"/>
</head>
<body>
<nav class="navbar">
  <div class="container nav-inner">
    <a href="../index.html" class="nav-brand"><span class="dot"></span>AI Robotics Lab · XULA</a>
    <ul class="nav-links">
      <li><a href="../index.html">Home</a></li>
      <li><a href="../about/index.html">About</a></li>
      <li><a href="../research/index.html">Research</a></li>
      <li><a href="../team/index.html">Team</a></li>
      <li><a href="index.html" class="active">Teaching</a></li>
      <li><a href="../news/index.html">News</a></li>
      <li><a href="../gallery/index.html">Gallery</a></li>
      <li><a href="../join/index.html">Join</a></li>
      <li><a href="../contact/index.html" class="nav-cta">Contact</a></li>
    </ul>
    <div class="hamburger"><span></span><span></span><span></span></div>
  </div>
</nav>

<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="../index.html">Home</a><span>/</span><span>Teaching Courses</span></div>
    <h1>Teaching Courses</h1>
    <p style="color:var(--muted);max-width:620px;margin:0 auto;">Online AI/ML courses from our labs, face-to-face XULA courses, and a 28-year legacy of engineering education.</p>
  </div>
</section>

<!-- Intro -->
<section class="section-sm">
  <div class="container">
    <div class="card" style="max-width:800px;margin:0 auto;text-align:center;">
      <p style="font-size:1.05rem;color:var(--text);">Dr. Islam brings over <strong style="color:#fff">28 years</strong> of experience developing and teaching courses across Electrical and Electronics Engineering, Computer Science, Robotics and Mechatronics Engineering, Control Systems, and Autonomous Systems curricula.</p>
      <p style="font-size:.9rem;margin-bottom:0;">He played a key role in developing the <strong style="color:#fff">Bachelor of Science in Robotics and Mechatronics Engineering</strong> program at Xavier University of Louisiana (XULA) and has served as a founding member of several Robotics and Mechatronics Engineering programs internationally.</p>
    </div>
  </div>
</section>

<!-- Tabs nav -->
<section class="section" id="online">
  <div class="container">
    <div class="tabs" data-tabs>
      <button class="tab-btn active" data-tab="online">🌐 Online AI/ML Courses</button>
      <button class="tab-btn" data-tab="xula">🏛 XULA Courses (2019–Present)</button>
      <button class="tab-btn" data-tab="past">📚 Past Courses (1999–2018)</button>
    </div>

    <!-- ONLINE COURSES -->
    <div class="tab-content active" data-content="online">
      <div class="card" style="margin-bottom:2rem;background:rgba(0,212,255,0.05);border-color:rgba(0,212,255,0.25);">
        <p style="margin:0;color:var(--text);">📧 Interested in any of these courses? Contact Dr. Islam at <a href="mailto:sislam3@xula.edu">sislam3@xula.edu</a>. Each course includes three projects directly from our latest research and development projects.</p>
      </div>
      <div class="grid-3" id="xula">

        <div class="course-card">
          <div class="course-header">
            <div class="course-number">COURSE 01</div>
            <h3 style="color:#fff;font-size:1.1rem;">Machine Learning</h3>
          </div>
          <div class="course-body">
            <p style="font-size:.875rem;">All classical ML algorithms with robotics, autonomous, biomedical, and climate computing applications.</p>
            <h4 style="color:#fff;font-size:.85rem;margin:.75rem 0 .5rem;">Topics</h4>
            <ul class="styled-list" style="font-size:.82rem;">
              <li>Python fundamentals for ML</li>
              <li>Linear &amp; Logistic regression</li>
              <li>KNN, Decision Trees, Random Forests</li>
              <li>Support Vector Machines</li>
              <li>Boosting, Bagging &amp; ensemble methods</li>
              <li>Clustering algorithms</li>
              <li>Model evaluation &amp; feature engineering</li>
            </ul>
            <div class="course-tags">
              <span class="tag">Undergraduate</span>
              <span class="tag">Graduate</span>
              <span class="tag">Engineers</span>
            </div>
          </div>
        </div>

        <div class="course-card">
          <div class="course-header">
            <div class="course-number">COURSE 02</div>
            <h3 style="color:#fff;font-size:1.1rem;">Computer Vision &amp; Deep Learning</h3>
          </div>
          <div class="course-body">
            <p style="font-size:.875rem;">Deep learning and computer vision for robotics, automation, and intelligent perception.</p>
            <h4 style="color:#fff;font-size:.85rem;margin:.75rem 0 .5rem;">Topics</h4>
            <ul class="styled-list" style="font-size:.82rem;">
              <li>Neural networks &amp; ANN</li>
              <li>Convolutional Neural Networks (CNNs)</li>
              <li>Object detection</li>
              <li>Semantic segmentation</li>
              <li>Vision transformers</li>
              <li>Video analytics</li>
              <li>Real-time robotic vision</li>
            </ul>
            <div class="course-tags">
              <span class="tag">Undergraduate</span>
              <span class="tag">Graduate</span>
              <span class="tag">Researchers</span>
            </div>
          </div>
        </div>

        <div class="course-card">
          <div class="course-header">
            <div class="course-number">COURSE 03</div>
            <h3 style="color:#fff;font-size:1.1rem;">Large Language Models (LLMs)</h3>
          </div>
          <div class="course-body">
            <p style="font-size:.875rem;">Transformers, RAG, Agentic AI, fine-tuning, and multimodal AI systems.</p>
            <h4 style="color:#fff;font-size:.85rem;margin:.75rem 0 .5rem;">Topics</h4>
            <ul class="styled-list" style="font-size:.82rem;">
              <li>Transformer architecture &amp; attention</li>
              <li>Prompt engineering</li>
              <li>Fine-tuning LLMs</li>
              <li>Retrieval-Augmented Generation (RAG)</li>
              <li>AI agents</li>
              <li>Multimodal AI systems</li>
              <li>Ethical AI and safety</li>
            </ul>
            <div class="course-tags">
              <span class="tag">Graduate</span>
              <span class="tag">Researchers</span>
            </div>
          </div>
        </div>

        <div class="course-card">
          <div class="course-header">
            <div class="course-number">COURSE 04</div>
            <h3 style="color:#fff;font-size:1.1rem;">AI for Engineers</h3>
          </div>
          <div class="course-body">
            <p style="font-size:.875rem;">Practical AI with real-world projects in robotics, biomedical, and climate computing.</p>
            <h4 style="color:#fff;font-size:.85rem;margin:.75rem 0 .5rem;">Topics</h4>
            <ul class="styled-list" style="font-size:.82rem;">
              <li>Supervised &amp; unsupervised ML</li>
              <li>Neural networks &amp; deep learning</li>
              <li>ANN &amp; optimization</li>
              <li>Real-world AI projects</li>
            </ul>
            <div class="course-tags">
              <span class="tag">Undergraduate</span>
              <span class="tag">Engineers</span>
            </div>
          </div>
        </div>

        <div class="course-card">
          <div class="course-header">
            <div class="course-number">COURSE 05</div>
            <h3 style="color:#fff;font-size:1.1rem;">Robotics AI Applications</h3>
          </div>
          <div class="course-body">
            <p style="font-size:.875rem;">Reinforcement learning, SLAM, multi-agent robotics, and real-world AI projects.</p>
            <h4 style="color:#fff;font-size:.85rem;margin:.75rem 0 .5rem;">Topics</h4>
            <ul class="styled-list" style="font-size:.82rem;">
              <li>Reinforcement learning</li>
              <li>Robot navigation &amp; motion planning</li>
              <li>SLAM</li>
              <li>Human-robot interaction</li>
              <li>Multi-agent robotics</li>
            </ul>
            <div class="course-tags">
              <span class="tag">Undergraduate</span>
              <span class="tag">Engineers</span>
              <span class="tag">Researchers</span>
            </div>
          </div>
        </div>

        <div class="course-card">
          <div class="course-header">
            <div class="course-number">COURSE 06</div>
            <h3 style="color:#fff;font-size:1.1rem;">AI for Autonomous Systems</h3>
          </div>
          <div class="course-body">
            <p style="font-size:.875rem;">Autonomous UAVs, multi-agent coordination, swarm intelligence, and adaptive control.</p>
            <h4 style="color:#fff;font-size:.85rem;margin:.75rem 0 .5rem;">Topics</h4>
            <ul class="styled-list" style="font-size:.82rem;">
              <li>Autonomous UAV systems</li>
              <li>Multi-agent coordination</li>
              <li>Distributed AI</li>
              <li>Intelligent &amp; adaptive control</li>
              <li>Swarm intelligence</li>
            </ul>
            <div class="course-tags">
              <span class="tag">Graduate</span>
              <span class="tag">Researchers</span>
            </div>
          </div>
        </div>

        <div class="course-card">
          <div class="course-header">
            <div class="course-number">COURSE 07</div>
            <h3 style="color:#fff;font-size:1.1rem;">Machine Learning with Python</h3>
          </div>
          <div class="course-body">
            <p style="font-size:.875rem;">Python-based ML workflows from data preprocessing to model deployment.</p>
            <h4 style="color:#fff;font-size:.85rem;margin:.75rem 0 .5rem;">Topics</h4>
            <ul class="styled-list" style="font-size:.82rem;">
              <li>Python programming fundamentals</li>
              <li>Data preprocessing &amp; visualization</li>
              <li>ML algorithms &amp; workflows</li>
              <li>AI model deployment</li>
              <li>Scientific computing &amp; optimization</li>
            </ul>
            <div class="course-tags">
              <span class="tag">Undergraduate</span>
              <span class="tag">Engineers</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Course features -->
      <div class="card" style="margin-top:2.5rem;">
        <div class="grid-2" style="gap:2rem;align-items:start;">
          <div>
            <h3 style="color:#fff;margin-bottom:1rem;">Each Course Includes</h3>
            <ul class="styled-list">
              <li>Assignments, homework, tests, exams</li>
              <li>Downloadable datasets for projects</li>
              <li>Robotics simulations</li>
              <li>Real-world case studies</li>
              <li>Projects from active research</li>
              <li>Workshop &amp; conference presentation</li>
              <li>Certificate of completion</li>
            </ul>
          </div>
          <div>
            <h3 style="color:#fff;margin-bottom:1rem;">Tools &amp; Frameworks</h3>
            <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
              <span class="badge-glow cyan">Python</span>
              <span class="badge-glow cyan">PyTorch</span>
              <span class="badge-glow cyan">TensorFlow</span>
              <span class="badge-glow cyan">OpenCV</span>
              <span class="badge-glow purple">ROS2</span>
              <span class="badge-glow purple">Gazebo</span>
              <span class="badge-glow green">Hugging Face</span>
              <span class="badge-glow green">LangChain</span>
              <span class="badge-glow amber">Vector DBs</span>
              <span class="badge-glow amber">APIs</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- XULA COURSES -->
    <div class="tab-content" data-content="xula">
      <p style="margin-bottom:2rem;color:var(--muted);">Courses taught at Xavier University of Louisiana from 2019 to present as part of the Robotics &amp; Mechatronics Engineering program.</p>
      <div class="grid-3">
        <div class="card" style="padding:1.25rem;">
          <div class="course-number">ENGR 1200</div>
          <h4 style="color:#fff;margin:.4rem 0 .5rem;">Introduction to Engineering</h4>
          <a href="https://catalog.xula.edu/preview_program.php?catoid=40&poid=9281" target="_blank" style="font-size:.8rem;">View Catalog →</a>
        </div>
        <div class="card" style="padding:1.25rem;">
          <div class="course-number">ENGR 2120</div>
          <h4 style="color:#fff;margin:.4rem 0 .5rem;">Circuits I</h4>
          <a href="https://catalog.xula.edu/preview_program.php?catoid=40&poid=9281" target="_blank" style="font-size:.8rem;">View Catalog →</a>
        </div>
        <div class="card" style="padding:1.25rem;">
          <div class="course-number">ENGR 2210</div>
          <h4 style="color:#fff;margin:.4rem 0 .5rem;">Mechanics — Statics</h4>
          <a href="https://catalog.xula.edu/preview_program.php?catoid=40&poid=9281" target="_blank" style="font-size:.8rem;">View Catalog →</a>
        </div>
        <div class="card" style="padding:1.25rem;">
          <div class="course-number">ENGR 2221</div>
          <h4 style="color:#fff;margin:.4rem 0 .5rem;">Electronics</h4>
          <a href="https://catalog.xula.edu/preview_program.php?catoid=40&poid=9281" target="_blank" style="font-size:.8rem;">View Catalog →</a>
        </div>
        <div class="card" style="padding:1.25rem;">
          <div class="course-number">ROME 2320</div>
          <h4 style="color:#fff;margin:.4rem 0 .5rem;">Microcontroller</h4>
          <a href="https://catalog.xula.edu/preview_program.php?catoid=40&poid=9281" target="_blank" style="font-size:.8rem;">View Catalog →</a>
        </div>
        <div class="card" style="padding:1.25rem;">
          <div class="course-number">ROME 2420</div>
          <h4 style="color:#fff;margin:.4rem 0 .5rem;">Object-Oriented Programming for Robotics</h4>
          <a href="https://catalog.xula.edu/preview_program.php?catoid=40&poid=9281" target="_blank" style="font-size:.8rem;">View Catalog →</a>
        </div>
        <div class="card" style="padding:1.25rem;">
          <div class="course-number">ROME 3120</div>
          <h4 style="color:#fff;margin:.4rem 0 .5rem;">Signal and Systems</h4>
          <a href="https://catalog.xula.edu/preview_program.php?catoid=40&poid=9281" target="_blank" style="font-size:.8rem;">View Catalog →</a>
        </div>
        <div class="card" style="padding:1.25rem;">
          <div class="course-number">ROME 3221</div>
          <h4 style="color:#fff;margin:.4rem 0 .5rem;">Dynamics and Controls</h4>
          <a href="https://catalog.xula.edu/preview_program.php?catoid=40&poid=9281" target="_blank" style="font-size:.8rem;">View Catalog →</a>
        </div>
        <div class="card" style="padding:1.25rem;">
          <div class="course-number">ROME 3321</div>
          <h4 style="color:#fff;margin:.4rem 0 .5rem;">Mechatronics / Robotics</h4>
          <a href="https://catalog.xula.edu/preview_program.php?catoid=40&poid=9281" target="_blank" style="font-size:.8rem;">View Catalog →</a>
        </div>
        <div class="card" style="padding:1.25rem;">
          <div class="course-number">ROME 3420</div>
          <h4 style="color:#fff;margin:.4rem 0 .5rem;">Control of Robotic Systems</h4>
          <a href="https://catalog.xula.edu/preview_program.php?catoid=40&poid=9281" target="_blank" style="font-size:.8rem;">View Catalog →</a>
        </div>
        <div class="card" style="padding:1.25rem;">
          <div class="course-number">ROME 4120</div>
          <h4 style="color:#fff;margin:.4rem 0 .5rem;">Autonomous Robotic Systems</h4>
          <a href="https://catalog.xula.edu/preview_program.php?catoid=40&poid=9281" target="_blank" style="font-size:.8rem;">View Catalog →</a>
        </div>
        <div class="card" style="padding:1.25rem;">
          <div class="course-number">ROME 4221</div>
          <h4 style="color:#fff;margin:.4rem 0 .5rem;">Robotics Sensors and Perceptions</h4>
          <a href="https://catalog.xula.edu/preview_program.php?catoid=40&poid=9281" target="_blank" style="font-size:.8rem;">View Catalog →</a>
        </div>
        <div class="card" style="padding:1.25rem;">
          <div class="course-number">ROME 4320</div>
          <h4 style="color:#fff;margin:.4rem 0 .5rem;">Professional Seminar</h4>
          <a href="https://catalog.xula.edu/preview_program.php?catoid=40&poid=9281" target="_blank" style="font-size:.8rem;">View Catalog →</a>
        </div>
        <div class="card" style="padding:1.25rem;">
          <div class="course-number">ROME 4420</div>
          <h4 style="color:#fff;margin:.4rem 0 .5rem;">Capstone Design Project I</h4>
          <a href="https://catalog.xula.edu/preview_program.php?catoid=40&poid=9281" target="_blank" style="font-size:.8rem;">View Catalog →</a>
        </div>
        <div class="card" style="padding:1.25rem;">
          <div class="course-number">ROME 4430</div>
          <h4 style="color:#fff;margin:.4rem 0 .5rem;">Capstone Design Project II</h4>
          <a href="https://catalog.xula.edu/preview_program.php?catoid=40&poid=9281" target="_blank" style="font-size:.8rem;">View Catalog →</a>
        </div>
        <div class="card" style="padding:1.25rem;">
          <div class="course-number">PHYS/ENGR 4540</div>
          <h4 style="color:#fff;margin:.4rem 0 .5rem;">Introduction to Robotics &amp; Control</h4>
        </div>
      </div>
    </div>

    <!-- PAST COURSES -->
    <div class="tab-content" data-content="past" id="past">
      <p style="margin-bottom:2rem;color:var(--muted);">Courses developed and taught at various international institutions from 1999 to 2018, spanning Electrical Engineering, Computer Science, Robotics &amp; Mechatronics, and Autonomous Systems curricula.</p>
      <div class="accordion">
        <div class="accordion-item">
          <div class="accordion-header">🤖 Robotics &amp; Autonomous Systems <span class="accordion-arrow">▼</span></div>
          <div class="accordion-body">
            ROBO 651 — Modeling and Control of Robotic Systems · ROBO 703 — Robotics Perception · ROBO 701 — Control of Robotic Systems · ROBO 650 — Autonomous Robotic Systems · ROBO 633 — Machine Vision and Image Understanding · ROBO 402 — UAV Sensing · ROBO 403 — UAV Navigation · ROBO 404 — UAV Systems · ROBO 401 — UAV Modeling and Control · ROBO 302 — Signals and Communications · ROBO 301 — Dynamics and Control Systems
          </div>
        </div>
        <div class="accordion-item">
          <div class="accordion-header">⚡ Electrical &amp; Control Systems <span class="accordion-arrow">▼</span></div>
          <div class="accordion-body">
            ECCE 415 — Feedback Control Systems · ELCE 344/345 — Feedback Control Systems · SYSC 3600 — Systems and Simulation · SYSC 3500 — Signals and Systems · EEE 363 — Control System · EEE 495 — Digital Signal Processing · EEE 111 — Electrical Circuits I · EEE 121 — Electrical Circuits II · EEE 233 — Electrical Machines I · ENG 2258 — Electrical Machine I · ENG 2451 — Electrical Power Systems I
          </div>
        </div>
        <div class="accordion-item">
          <div class="accordion-header">💻 Computer Science &amp; Electronics <span class="accordion-arrow">▼</span></div>
          <div class="accordion-body">
            ENG 1637 — Computer Logic Circuits · ENG 1232 — Introduction to Microcontrollers · EEE 421 — Microprocessor and Interfacing · EEE 365 — Digital Electronics · EEE 483 — Power Electronics · EEE 361 — Power System Analysis · ENG 3313 — Material Science for Electrical Engineers · ENG 1634 — Electronics I · EEE 235 — Electronics I · ENGR 111 — Engineering Design
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<footer>
  <div class="container">
    <div class="footer-bottom">
      <span>© 2025 AI Robotics Research Lab · Xavier University of Louisiana</span>
      <a href="mailto:sislam3@xula.edu" style="color:var(--accent);">sislam3@xula.edu</a>
    </div>
  </div>
</footer>
<script src="../assets/js/main.js"></script>
</body>
</html>
HTMLEOF
echo "teaching done"
Output

teaching done

Create news and gallery pages
bash

# News page
cat > /home/claude/website/news/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>News & Events — AI Robotics Lab XULA</title>
  <link rel="stylesheet" href="../assets/css/style.css"/>
</head>
<body>
<nav class="navbar">
  <div class="container nav-inner">
    <a href="../index.html" class="nav-brand"><span class="dot"></span>AI Robotics Lab · XULA</a>
    <ul class="nav-links">
      <li><a href="../index.html">Home</a></li>
      <li><a href="../about/index.html">About</a></li>
      <li><a href="../research/index.html">Research</a></li>
      <li><a href="../team/index.html">Team</a></li>
      <li><a href="../teaching/index.html">Teaching</a></li>
      <li><a href="index.html" class="active">News</a></li>
      <li><a href="../gallery/index.html">Gallery</a></li>
      <li><a href="../join/index.html">Join</a></li>
      <li><a href="../contact/index.html" class="nav-cta">Contact</a></li>
    </ul>
    <div class="hamburger"><span></span><span></span><span></span></div>
  </div>
</nav>
<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="../index.html">Home</a><span>/</span><span>News &amp; Events</span></div>
    <h1>News &amp; Events</h1>
    <p style="color:var(--muted);">Latest updates from the AI Robotics Lab</p>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="grid-3">
      <div class="card"><span class="badge-glow cyan" style="margin-bottom:1rem;display:inline-block;">Opportunity</span><h4 style="color:#fff;margin-bottom:.5rem;">Graduate Research Positions Open</h4><p style="font-size:.875rem;">We are recruiting motivated graduate and undergraduate students. Contact Dr. Islam to inquire about available positions in AI, Robotics, and Climate Computing.</p><a href="../join/index.html" class="btn btn-outline btn-sm" style="margin-top:.75rem;">Apply Now →</a></div>
      <div class="card"><span class="badge-glow green" style="margin-bottom:1rem;display:inline-block;">Courses</span><h4 style="color:#fff;margin-bottom:.5rem;">Online AI/ML Courses Now Enrolling</h4><p style="font-size:.875rem;">Practical, research-oriented courses in Machine Learning, Deep Learning, LLMs, and Robotics AI. Each course features three research projects.</p><a href="../teaching/index.html" class="btn btn-outline btn-sm" style="margin-top:.75rem;">View Courses →</a></div>
      <div class="card"><span class="badge-glow amber" style="margin-bottom:1rem;display:inline-block;">Facility</span><h4 style="color:#fff;margin-bottom:.5rem;">NASA Climate Networks at XULA</h4><p style="font-size:.875rem;">GPM, AERONET, and PANDORA systems are operational at Xavier University campus, enabling cutting-edge climate research.</p><a href="../research/index.html#climate" class="btn btn-outline btn-sm" style="margin-top:.75rem;">Learn More →</a></div>
      <div class="card"><span class="badge-glow purple" style="margin-bottom:1rem;display:inline-block;">Program</span><h4 style="color:#fff;margin-bottom:.5rem;">BS Robotics &amp; Mechatronics at XULA</h4><p style="font-size:.875rem;">Dr. Islam played a key role in developing the Bachelor of Science in Robotics and Mechatronics Engineering Program at XULA.</p><a href="../teaching/index.html#xula" class="btn btn-outline btn-sm" style="margin-top:.75rem;">See Courses →</a></div>
      <div class="card"><span class="badge-glow cyan" style="margin-bottom:1rem;display:inline-block;">Publications</span><h4 style="color:#fff;margin-bottom:.5rem;">110+ Peer-Reviewed Publications</h4><p style="font-size:.875rem;">Dr. Islam is recognized as a Top 2% Scientist worldwide. View the full publication list on Google Scholar.</p><a href="https://scholar.google.com/citations?user=tYVDFI0AAAAJ&hl=en" target="_blank" class="btn btn-outline btn-sm" style="margin-top:.75rem;">Google Scholar →</a></div>
      <div class="card"><span class="badge-glow green" style="margin-bottom:1rem;display:inline-block;">Workshop</span><h4 style="color:#fff;margin-bottom:.5rem;">Upcoming Workshops &amp; Conferences</h4><p style="font-size:.875rem;">Stay tuned for workshop announcements, conference presentations, and symposium details from our lab members.</p><a href="../contact/index.html" class="btn btn-outline btn-sm" style="margin-top:.75rem;">Contact Us →</a></div>
    </div>
  </div>
</section>
<footer><div class="container"><div class="footer-bottom"><span>© 2025 AI Robotics Research Lab · Xavier University of Louisiana</span><a href="mailto:sislam3@xula.edu" style="color:var(--accent);">sislam3@xula.edu</a></div></div></footer>
<script src="../assets/js/main.js"></script>
</body>
</html>
EOF

# Gallery page
cat > /home/claude/website/gallery/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Gallery — AI Robotics Lab XULA</title>
  <link rel="stylesheet" href="../assets/css/style.css"/>
</head>
<body>
<nav class="navbar">
  <div class="container nav-inner">
    <a href="../index.html" class="nav-brand"><span class="dot"></span>AI Robotics Lab · XULA</a>
    <ul class="nav-links">
      <li><a href="../index.html">Home</a></li>
      <li><a href="../about/index.html">About</a></li>
      <li><a href="../research/index.html">Research</a></li>
      <li><a href="../team/index.html">Team</a></li>
      <li><a href="../teaching/index.html">Teaching</a></li>
      <li><a href="../news/index.html">News</a></li>
      <li><a href="index.html" class="active">Gallery</a></li>
      <li><a href="../join/index.html">Join</a></li>
      <li><a href="../contact/index.html" class="nav-cta">Contact</a></li>
    </ul>
    <div class="hamburger"><span></span><span></span><span></span></div>
  </div>
</nav>
<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="../index.html">Home</a><span>/</span><span>Gallery</span></div>
    <h1>Lab Gallery</h1>
    <p style="color:var(--muted);">Equipment, platforms, and research facilities</p>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-subtitle">Autonomous Systems</div>
    <h2 class="section-title" style="font-size:1.6rem;">UAVs &amp; Aerial Platforms</h2>
    <div class="section-divider"></div>
    <div class="lab-grid" style="margin-bottom:3rem;">
      <div class="lab-grid-item wide"><img src="../assets/images/drone.jpg" alt="Drone Fleet" style="height:320px;"/><div class="caption">Autonomous Drone Fleet — UAV Swarming Research Platform</div></div>
      <div class="lab-grid-item"><img src="../assets/images/helicopter_vtol.jpg" alt="Helicopter VTOL"/><div class="caption">Helicopter VTOL Platform</div></div>
      <div class="lab-grid-item"><img src="../assets/images/self_driving_car.jpg" alt="Self Driving Car"/><div class="caption">Self-Driving Car Module</div></div>
    </div>
    <div class="section-subtitle">Ground Robots &amp; Industrial</div>
    <h2 class="section-title" style="font-size:1.6rem;">Robotic Systems</h2>
    <div class="section-divider"></div>
    <div class="lab-grid" style="margin-bottom:3rem;">
      <div class="lab-grid-item wide"><img src="../assets/images/mobile_robot.jpg" alt="Mobile Robot" style="height:280px;"/><div class="caption">Mobile Robotic Systems Fleet</div></div>
      <div class="lab-grid-item wide"><img src="../assets/images/industrial_robot.jpg" alt="Industrial Robot" style="height:280px;"/><div class="caption">Industrial Robotic Systems</div></div>
    </div>
    <div class="section-subtitle">Climate Computing</div>
    <h2 class="section-title" style="font-size:1.6rem;">NASA Equipment at XULA</h2>
    <div class="section-divider"></div>
    <div class="lab-grid-item" style="max-width:700px;"><img src="../assets/images/nasa_equipment.jpg" alt="NASA Equipment" style="height:360px;width:100%;object-fit:cover;border-radius:var(--radius);"/><div class="caption" style="position:relative;background:rgba(13,27,62,0.8);border-radius:0 0 var(--radius) var(--radius);padding:.75rem 1rem;">NASA Global Climate Computing Network — GPM · AERONET · PANDORA at XULA Campus</div></div>
  </div>
</section>
<footer><div class="container"><div class="footer-bottom"><span>© 2025 AI Robotics Research Lab · Xavier University of Louisiana</span><a href="mailto:sislam3@xula.edu" style="color:var(--accent);">sislam3@xula.edu</a></div></div></footer>
<script src="../assets/js/main.js"></script>
</body>
</html>
EOF
echo "news + gallery done"
Output

news + gallery done

Create join and contact pages
bash

# Join page
cat > /home/claude/website/join/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Join the Lab — AI Robotics Lab XULA</title>
  <link rel="stylesheet" href="../assets/css/style.css"/>
</head>
<body>
<nav class="navbar">
  <div class="container nav-inner">
    <a href="../index.html" class="nav-brand"><span class="dot"></span>AI Robotics Lab · XULA</a>
    <ul class="nav-links">
      <li><a href="../index.html">Home</a></li>
      <li><a href="../about/index.html">About</a></li>
      <li><a href="../research/index.html">Research</a></li>
      <li><a href="../team/index.html">Team</a></li>
      <li><a href="../teaching/index.html">Teaching</a></li>
      <li><a href="../news/index.html">News</a></li>
      <li><a href="../gallery/index.html">Gallery</a></li>
      <li><a href="index.html" class="active">Join</a></li>
      <li><a href="../contact/index.html" class="nav-cta">Contact</a></li>
    </ul>
    <div class="hamburger"><span></span><span></span><span></span></div>
  </div>
</nav>
<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="../index.html">Home</a><span>/</span><span>Join the Lab</span></div>
    <h1>Join Our Lab</h1>
    <p style="color:var(--muted);max-width:560px;margin:0 auto;">We welcome motivated researchers, students, and collaborators passionate about AI, Robotics, and real-world impact.</p>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="grid-3" style="margin-bottom:3rem;">
      <div class="card"><div class="card-icon blue">🎓</div><h3 style="color:#fff;margin-bottom:.75rem;">Graduate Students</h3><p>PhD and MS students in AI, Robotics, Autonomous Systems, Computational Biology, or Climate Computing. Strong background in ML or control systems preferred.</p></div>
      <div class="card"><div class="card-icon purple">🔬</div><h3 style="color:#fff;margin-bottom:.75rem;">Undergraduate Students</h3><p>Motivated undergraduates interested in hands-on research with drones, mobile robots, self-driving cars, or AI/ML projects.</p></div>
      <div class="card"><div class="card-icon green">🤝</div><h3 style="color:#fff;margin-bottom:.75rem;">Industry Partners</h3><p>We collaborate with industry on applied AI, robotics, and climate technology projects. Contact us to discuss partnership opportunities.</p></div>
    </div>
    <div class="card" style="max-width:600px;margin:0 auto;text-align:center;">
      <h3 style="color:#fff;margin-bottom:1rem;">How to Apply</h3>
      <p>Send your CV/resume and a brief statement of research interests to Dr. Islam. Include relevant coursework, projects, or experience in AI, robotics, or engineering.</p>
      <a href="mailto:sislam3@xula.edu?subject=Lab Application" class="btn btn-primary" style="margin-top:1.5rem;">📧 Email Dr. Islam</a>
    </div>
  </div>
</section>
<footer><div class="container"><div class="footer-bottom"><span>© 2025 AI Robotics Research Lab · Xavier University of Louisiana</span><a href="mailto:sislam3@xula.edu" style="color:var(--accent);">sislam3@xula.edu</a></div></div></footer>
<script src="../assets/js/main.js"></script>
</body>
</html>
EOF

# Contact page
cat > /home/claude/website/contact/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Contact — AI Robotics Lab XULA</title>
  <link rel="stylesheet" href="../assets/css/style.css"/>
</head>
<body>
<nav class="navbar">
  <div class="container nav-inner">
    <a href="../index.html" class="nav-brand"><span class="dot"></span>AI Robotics Lab · XULA</a>
    <ul class="nav-links">
      <li><a href="../index.html">Home</a></li>
      <li><a href="../about/index.html">About</a></li>
      <li><a href="../research/index.html">Research</a></li>
      <li><a href="../team/index.html">Team</a></li>
      <li><a href="../teaching/index.html">Teaching</a></li>
      <li><a href="../news/index.html">News</a></li>
      <li><a href="../gallery/index.html">Gallery</a></li>
      <li><a href="../join/index.html">Join</a></li>
      <li><a href="index.html" class="active nav-cta">Contact</a></li>
    </ul>
    <div class="hamburger"><span></span><span></span><span></span></div>
  </div>
</nav>
<section class="page-hero">
  <div class="container">
    <div class="breadcrumb"><a href="../index.html">Home</a><span>/</span><span>Contact</span></div>
    <h1>Contact Us</h1>
    <p style="color:var(--muted);">Get in touch with our lab for research, courses, or collaboration</p>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="grid-2" style="gap:3rem;align-items:start;">
      <div>
        <h2 class="section-title" style="font-size:1.8rem;">Send a Message</h2>
        <div class="section-divider"></div>
        <form id="contact-form">
          <div class="form-group"><label>Full Name</label><input type="text" placeholder="Your full name" required/></div>
          <div class="form-group"><label>Email Address</label><input type="email" placeholder="your@email.com" required/></div>
          <div class="form-group"><label>Subject</label>
            <select>
              <option>Research Collaboration</option>
              <option>Course Enrollment</option>
              <option>Join the Lab</option>
              <option>Industry Partnership</option>
              <option>General Inquiry</option>
            </select>
          </div>
          <div class="form-group"><label>Message</label><textarea placeholder="Your message..." required></textarea></div>
          <button type="submit" class="btn btn-primary" style="width:100%;">Send Message</button>
        </form>
      </div>
      <div>
        <h2 class="section-title" style="font-size:1.8rem;">Contact Information</h2>
        <div class="section-divider"></div>
        <div class="card" style="margin-bottom:1rem;">
          <h4 style="color:#fff;margin-bottom:.5rem;">📧 Email</h4>
          <a href="mailto:sislam3@xula.edu" style="color:var(--accent);font-size:1rem;">sislam3@xula.edu</a>
        </div>
        <div class="card" style="margin-bottom:1rem;">
          <h4 style="color:#fff;margin-bottom:.5rem;">🏛 Institution</h4>
          <p style="margin:0;font-size:.9rem;">Xavier University of Louisiana<br/>New Orleans, Louisiana, USA</p>
        </div>
        <div class="card" style="margin-bottom:1rem;">
          <h4 style="color:#fff;margin-bottom:.5rem;">🎓 Google Scholar</h4>
          <a href="https://scholar.google.com/citations?user=tYVDFI0AAAAJ&hl=en" target="_blank" style="color:var(--accent);font-size:.9rem;">View Publications (Top 2% Scientist)</a>
        </div>
        <div class="card">
          <h4 style="color:#fff;margin-bottom:.75rem;">📬 For Specific Inquiries</h4>
          <ul class="styled-list" style="font-size:.875rem;">
            <li>Research collaboration — include your CV and research interests</li>
            <li>Online course enrollment — specify which course</li>
            <li>Join the lab — attach CV and statement of purpose</li>
            <li>Industry partnership — describe your project scope</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
<footer><div class="container"><div class="footer-bottom"><span>© 2025 AI Robotics Research Lab · Xavier University of Louisiana</span><a href="mailto:sislam3@xula.edu" style="color:var(--accent);">sislam3@xula.edu</a></div></div></footer>
<script src="../assets/js/main.js"></script>
</body>
</html>
EOF
echo "join + contact done"


join + contact done
Done
how do i run them, can you help me

6:50 PM


You are out of free messages until 10:50 PM
/* Quiet Signal, refreshed: white/black surfaces with signal pink, a calmer About narrative, and motion that feels like paper sliding into place. */
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Code2,
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Send,
  Sun,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const projects = [
  {
    number: "01",
    type: "Campus utility · 2026",
    title: "StudyLoop",
    description:
      "A calmer way for student groups to share notes, deadlines, and the small details that keep a semester moving.",
    tags: ["React", "UX research", "Firebase"],
    image: "https://images.pexels.com/photos/33266805/pexels-photo-33266805.jpeg",
    imageAlt: "Wireframe sketches and interface notes on a warm paper desk",
  },
  {
    number: "02",
    type: "Inventory system · 2024",
    title: "Stockroom",
    description:
      "An inventory dashboard concept for a campus lab, designed to make handoffs and low-stock moments easy to spot.",
    tags: ["TypeScript", "Design system", "PostgreSQL"],
    image: "https://images.pexels.com/photos/7858852/pexels-photo-7858852.jpeg",
    imageAlt: "Hands collaborating around a laptop and sketchpad",
  },
];

const skills = ["UI development", "Responsive systems", "UX mapping", "Database basics", "Technical writing", "Team collaboration"];

const techStack = [
  { name: "React", tag: "Frontend" },
  { name: "TypeScript", tag: "Frontend" },
  { name: "Tailwind CSS", tag: "Frontend" },
  { name: "Framer Motion", tag: "Build" },
  { name: "Node.js", tag: "Backend" },
  { name: "Express", tag: "Backend" },
  { name: "PostgreSQL", tag: "Data" },
  { name: "Firebase", tag: "Data" },
  { name: "Vite", tag: "Build" },
  { name: "Git & GitHub", tag: "Tools" },
  { name: "Figma", tag: "Tools" },
  { name: "Vitest", tag: "Tools" },
];

const ease = [0.23, 1, 0.32, 1] as const;
const viewport = { once: true, amount: 0.18 };
const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};
const softReveal = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function scrollToSection(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    scrollToSection(href);
  };

  const handleResume = () => {
    toast("Resume link ready to personalize", {
      description: "Replace this action with your latest PDF or online CV.",
    });
  };

  const handleContact = () => {
    window.location.href = "mailto:abigail.bayod@gmail.com?subject=Let%27s%20work%20together";
  };

  return (
    <div className="site-shell">
      <aside className="identity-rail" aria-label="Portfolio identity rail">
        <div className="rail-vertical-label">abigail / dev · bsit</div>
        <div className="rail-bottom"><span>manila</span><span>2026</span></div>
      </aside>

      <motion.header className="site-header" initial={{ y: -18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.55, ease }}>
        <div className="header-inner">
          <a href="#top" className="brand" aria-label="Abigail Dela Cruz home">
            <span className="brand-wordmark">abigail <em>/</em> dev</span>
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <motion.button key={item.href} whileHover={{ y: -2 }} transition={{ duration: 0.18 }} onClick={() => handleNav(item.href)}>{item.label}</motion.button>
            ))}
          </nav>
          <div className="header-actions">
            <motion.button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`} title={`Switch to ${theme === "light" ? "dark" : "light"} mode`} whileTap={{ scale: 0.94 }} whileHover={{ y: -2 }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={theme} className="theme-icon" initial={{ opacity: 0, rotate: -30, scale: 0.8 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 30, scale: 0.8 }} transition={{ duration: 0.2 }}>
                  {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <motion.button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} whileTap={{ scale: 0.92 }}>
              <AnimatePresence mode="wait" initial={false}><motion.span key={menuOpen ? "close" : "menu"} initial={{ opacity: 0, rotate: -20 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 20 }} transition={{ duration: 0.16 }}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</motion.span></AnimatePresence>
            </motion.button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22, ease }}>
              {navItems.map((item) => (
                <motion.button key={item.href} onClick={() => handleNav(item.href)} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} whileHover={{ x: 4 }}>{item.label}<ArrowUpRight size={14} /></motion.button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      <main id="top">
        <motion.section className="hero-section section-pad" initial="hidden" animate="visible" variants={stagger}>
          <div className="hero-grid page-width">
            <div className="hero-copy">
              <motion.div className="eyebrow" variants={reveal}><span className="signal-dot" /> 3rd year · BSIT student <span className="eyebrow-line" /></motion.div>
              <motion.h1 className="hero-title" variants={reveal}>Building a<br /><span>little more</span><br />clarity.</motion.h1>
              <motion.p className="hero-description" variants={reveal}>I’m Abigail — a student developer learning in public, turning curious questions into clear, useful digital experiences.</motion.p>
              <motion.div className="hero-actions" variants={reveal}>
                <motion.button className="button button-dark" onClick={() => handleNav("#work")} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>See more projects <ArrowDownRight size={17} /></motion.button>
                <motion.button className="text-link" onClick={handleResume} whileHover={{ y: -2 }}>View résumé <ArrowUpRight size={16} /></motion.button>
              </motion.div>
              <motion.div className="hero-note" variants={reveal}><span>Currently</span> looking for internship opportunities for 2028.</motion.div>
            </div>
            <motion.div className="hero-visual" variants={softReveal}>
              <div className="hero-image-wrap">
                <img src="https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg" alt="A warm editorial desk scene with a laptop, sketchbook, and orange note" className="hero-image" />
                <div className="hero-annotation">field notes / v0.3</div>
                <div className="image-caption"><span>01 / 04</span><span>notes from the build</span></div>
              </div>
              <motion.div className="hero-stamp" aria-hidden="true" animate={{ rotate: [-15, -12, -15] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><span>curious</span><span>by default</span></motion.div>
              <div className="hero-side-label">scroll to explore <ArrowDownRight size={14} /></div>
            </motion.div>
          </div>
          <motion.div className="hero-rule page-width" variants={reveal}><span>Selected signal</span><span>↓</span><span>2026 — now</span></motion.div>
        </motion.section>

        <motion.section id="about" className="about-section section-pad section-cream" initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <div className="about-grid page-width">
            <motion.div className="section-label" variants={reveal}><span>02</span><span className="vertical-rule" /><span>About</span></motion.div>
            <div className="about-content">
              <motion.div className="about-lead" variants={reveal}>
                <div className="about-meta">profile / 2026 <span>open to learning</span></div>
                <h2 className="about-title">Learning in public,<br /><em>building with care.</em></h2>
                <p className="body-copy">I’m studying Bachelor of Science in Information Technology at Technological Institute of the Philippines (Quezon City). I’m learning to move between the big picture and the tiny details — from mapping a user flow to making sure the button states make sense.</p>
              </motion.div>
              <motion.div className="about-panels" variants={stagger}>
                <motion.div className="about-panel about-panel-pink" variants={reveal} whileHover={{ y: -4 }}>
                  <div className="about-panel-top"><span className="proof-icon"><Code2 size={19} /></span><span>01 / mindset</span></div>
                  <strong>Learning by making</strong>
                  <p>Every class becomes a small experiment, shipped as something real.</p>
                </motion.div>
                <motion.div className="about-panel about-panel-white" variants={reveal} whileHover={{ y: -4 }}>
                  <div className="about-panel-top"><span className="proof-icon proof-icon-black"><Check size={19} /></span><span>02 / practice</span></div>
                  <strong>Comfortable in the in-between</strong>
                  <p>Design, code, documentation, and the handoff between them.</p>
                </motion.div>
              </motion.div>
              <motion.div className="about-footer-line" variants={reveal}><span className="signature-line" /><span><strong>Abigail Dela Cruz</strong> · BSIT Student / Manila</span><span className="about-aside-note">I ask “why?” before “how?”.</span></motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section className="skills-section section-pad" initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <div className="skills-grid page-width">
            <motion.div className="section-label" variants={reveal}><span>03</span><span className="vertical-rule" /><span>Working toolkit</span></motion.div>
            <div className="skills-content">
              <motion.div className="skills-heading-row" variants={reveal}><h2 className="section-title">What I bring<br /><em>to the table.</em></h2><p className="skills-caption">A growing set of practical skills, built through coursework, side projects, and generous teammates.</p></motion.div>
              <motion.div className="skill-list" variants={stagger}>
                {skills.map((skill, index) => <motion.div className="skill-row" key={skill} variants={reveal} whileHover={{ x: 8 }}><span>0{index + 1}</span><strong>{skill}</strong><ArrowUpRight size={17} /></motion.div>)}
              </motion.div>
              <div className="tech-stack">
                <div className="tech-stack-head"><span>Tech Stack</span><span>the tools I reach for</span></div>
                <motion.div className="tech-grid" variants={stagger}>
                  {techStack.map((tech) => <motion.div className="tech-item" key={tech.name} variants={reveal} whileHover={{ y: -3 }}><span className="tech-tag">{tech.tag}</span><strong>{tech.name}</strong></motion.div>)}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section id="work" className="work-section section-pad section-ink" initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <div className="page-width">
            <motion.div className="work-heading" variants={reveal}><div className="section-label section-label-light"><span>05</span><span className="vertical-rule" /><span>Projects</span></div><p>Small projects, useful questions.<br />Always a work in progress.</p></motion.div>
            <motion.div className="projects-list" variants={stagger}>
              {projects.map((project) => (
                <motion.article className="project-card" key={project.number} variants={reveal} whileHover={{ y: -5 }}>
                  <div className="project-number">{project.number}</div>
                  <div className="project-image-wrap"><img src={project.image} alt={project.imageAlt} className="project-image" /><div className="project-image-overlay" /><span className="project-annotation">working evidence / {project.number}</span></div>
                  <div className="project-info"><div className="project-type">{project.type}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href={`mailto:abigail.bayod@gmail.com?subject=About%20${project.title}`} className="project-link">Read more <ExternalLink size={15} /></a></div>
                </motion.article>
              ))}
            </motion.div>
            <motion.div className="work-footer" variants={reveal}><span>More experiments are taking shape.</span><a href="#contact" onClick={(event) => { event.preventDefault(); handleNav("#contact"); }}>Ask me what’s next <ArrowUpRight size={15} /></a></motion.div>
          </div>
        </motion.section>

        <motion.section id="process" className="process-section section-pad section-cream" initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <div className="process-grid page-width">
            <motion.div className="section-label" variants={reveal}><span>06</span><span className="vertical-rule" /><span>Process</span></motion.div>
            <div className="process-content"><motion.div className="process-lead" variants={reveal}><h2 className="section-title">Make room<br /><em>for the messy middle.</em></h2><p className="body-copy">The best part of a project is usually the bit between the first idea and the final polish. That’s where I listen, test, learn, and make the work more honest.</p></motion.div><motion.div className="process-steps" variants={stagger}><motion.div className="process-step" variants={reveal}><span>01</span><div><strong>Listen closely</strong><p>Get clear on the person, the problem, and the constraint.</p></div></motion.div><motion.div className="process-step" variants={reveal}><span>02</span><div><strong>Make it visible</strong><p>Turn assumptions into maps, sketches, and something we can react to.</p></div></motion.div><motion.div className="process-step" variants={reveal}><span>03</span><div><strong>Keep it useful</strong><p>Build the simplest version that teaches us what to do next.</p></div></motion.div></motion.div></div>
          </div>
        </motion.section>

        <motion.section id="contact" className="contact-section section-pad" initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <div className="contact-grid page-width">
            <motion.div className="contact-label" variants={reveal}><span>07</span><span className="vertical-rule" /><span>Contact me!</span></motion.div>
            <motion.div className="contact-content" variants={reveal}><p className="contact-kicker">Have a problem worth<br /><em>thinking through?</em></p><h2>Let’s make<br /><span>something useful.</span></h2><motion.button className="contact-button" onClick={handleContact} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>Start a conversation <Send size={17} /></motion.button><div className="contact-meta"><span>abigail.bayod@gmail.com</span><span>available for internships · 2028</span></div></motion.div>
          </div>
        </motion.section>
      </main>

      <motion.footer className="site-footer" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={reveal}><div className="page-width footer-inner"><div className="footer-brand"><span>abigail / dev</span></div><p>Made with love.<br />© 2026 Abigail Dela Cruz.</p><div className="social-links"><motion.a href="https://github.com/workwithabby/" aria-label="GitHub" whileHover={{ y: -3 }}><Github size={17} /></motion.a><motion.a href="https://linkedin.com/in/workwithabby/" aria-label="LinkedIn" whileHover={{ y: -3 }}><Linkedin size={17} /></motion.a><motion.a href="https://instagram.com/avyail/" aria-label="Instagram" whileHover={{ y: -3 }}><Instagram size={17} /></motion.a><motion.a href="mailto:abigail.bayod@gmail.com" aria-label="Email" whileHover={{ y: -3 }}><Mail size={17} /></motion.a></div></div></motion.footer>
    </div>
  );
}

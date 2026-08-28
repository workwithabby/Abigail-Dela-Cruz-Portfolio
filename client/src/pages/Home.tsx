/* Quiet Signal, refreshed: white/black surfaces with signal pink, a calmer About narrative, and motion that feels like paper sliding into place. */
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Code2,
  ExternalLink,
  Folder,
  FolderOpen,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Send,
  Star,
  Sun,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/contexts/ThemeContext";
import heroPhoto from "@/assets/photo.png";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#work" },
  { label: "Goals", href: "#goals" },
  { label: "Contact", href: "#contact" },
];

interface Project {
  number: string;
  type: string;
  title: string;
  description: string;
  role: string;
  overview: string;
  highlights: string[];
  tags: string[];
  image: string;
  imageAlt: string;
}

const projects: Project[] = [
  {
    number: "01",
    type: "Campus utility · 2026",
    title: "StudyLoop",
    description:
      "A calmer way for student groups to share notes, deadlines, and the small details that keep a semester moving.",
    role: "Student developer & UX designer",
    overview:
      "StudyLoop began as a question: why do student groups juggle five different apps just to keep one semester moving? I interviewed classmates, mapped the messiest workflows, and shaped them into a single, calmer space for notes, deadlines, and the small updates that usually get lost.",
    highlights: [
      "Mapped group workflows through interviews with student org members to find the real friction points.",
      "Prototyped the core flows in Figma and tested them with a small group before writing any code.",
      "Built the first working version as a React app and kept a public changelog to stay honest about scope.",
    ],
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
    role: "Student developer & system designer",
    overview:
      "Stockroom came from a lab manager’s handwritten spreadsheet and a lot of sticky notes. I designed a dashboard that makes handoffs clear, low-stock moments obvious, and every update traceable — so the person running the lab can trust the numbers instead of re-counting.",
    highlights: [
      "Designed a small design system in Figma first, so labels, states, and empty screens stayed consistent.",
      "Prototyped the dashboard with TypeScript and React, using PostgreSQL for the data model.",
      "Ran a handoff exercise with the lab team to catch the details only real users notice.",
    ],
    tags: ["TypeScript", "Design system", "PostgreSQL"],
    image: "https://images.pexels.com/photos/7858852/pexels-photo-7858852.jpeg",
    imageAlt: "Hands collaborating around a laptop and sketchpad",
  },
];

const skills = ["UI development", "Responsive systems", "UX mapping", "Database basics", "Technical writing", "Team collaboration"];

const techStack = [
  { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["PHP", "MySQL", "PostgreSQL"] },
  { category: "Version control", items: ["Git & GitHub"] },
  { category: "Design & prototyping", items: ["Figma", "Canva"] },
  { category: "Game development", items: ["Unity"] },
  { category: "Motion / video editing", items: ["Adobe After Effects"] },
];

const goalAxis = [
  { label: "Year 3", note: "foundations" },
  { label: "Year 4", note: "capstone + internship" },
  { label: "2028", note: "first role" },
];

const goals = [
  {
    number: "01",
    kind: "short-term",
    window: "now → AY 2026-27",
    title: "Land an internship",
    description: "Step into a real team during third year and watch classroom code grow into production software.",
  },
  {
    number: "02",
    kind: "short-term",
    window: "AY 2027-28",
    title: "Ship a capstone project",
    description: "Build and deploy a full-stack app that solves an actual problem on campus — proof over polish.",
  },
  {
    number: "03",
    kind: "long-term",
    window: "by 2028",
    title: "Master modern frameworks",
    description: "Get genuinely productive in React, TypeScript, and deployment so ideas move from sketch to shipped fast.",
  },
  {
    number: "04",
    kind: "long-term",
    window: "ongoing",
    title: "Grow a strong portfolio",
    description: "A curated trail of projects that show both the craft and the thinking behind every screen.",
  },
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
  const [openFolders, setOpenFolders] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const headerProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

  useEffect(() => {
    if (!selectedProject) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedProject]);

  const toggleFolder = (category: string) => {
    setOpenFolders((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

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
      <motion.div className="bg-ambient" aria-hidden="true" animate={{ x: [0, 46, 0], y: [0, -34, 0], scale: [1, 1.07, 1] }} transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }} />
      <div className="grain-overlay" aria-hidden="true" />
      <aside className="identity-rail" aria-label="Portfolio identity rail">
        <a href="#top" className="rail-logo" aria-label="Abigail Dela Cruz home"><img src={logo} alt="" /></a>
        <div className="rail-vertical-label">abigail / dev · bsit</div>
        <div className="rail-bottom"><span>manila</span><span>2026</span></div>
      </aside>

      <motion.header className={`site-header${scrolled ? " is-scrolled" : ""}`} initial={{ y: -18, opacity: 0 }} animate={{ y: 0, opacity: 1, boxShadow: scrolled ? "0 26px 46px -34px rgba(0,0,0,0.45)" : "0 0 0 rgba(0,0,0,0)" }} transition={{ duration: 0.55, ease }}>
        <div className="header-inner">
          <a href="#top" className="brand" aria-label="Abigail Dela Cruz home">
            <img src={logo} alt="" className="brand-logo" />
            <span className="brand-wordmark">abigail <em>/</em> dev</span>
            <span className="brand-live" aria-hidden="true" />
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <motion.button className="nav-link" key={item.href} whileHover="hover" whileTap={{ scale: 0.96 }} onClick={() => handleNav(item.href)}>
                {item.label}
                <motion.span className="nav-underline" initial={{ scaleX: 0, opacity: 0 }} variants={{ hover: { scaleX: 1, opacity: 1 } }} transition={{ duration: 0.26, ease }} />
              </motion.button>
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
        <motion.div className="header-progress" style={{ scaleX: headerProgress }} />
      </motion.header>

      <main id="top">
        <motion.section className="hero-section section-pad" initial="hidden" animate="visible" variants={stagger}>
          <div className="hero-grid page-width">
            <div className="hero-copy">
              <motion.div className="eyebrow" variants={reveal}><span className="signal-dot" /> Portfolio / Intro <span className="eyebrow-line" /></motion.div>
              <motion.h1 className="hero-title" variants={reveal}>Hi, I’m <span>Abigail Dela Cruz</span></motion.h1>
              <motion.p className="hero-subheading" variants={reveal}>Information Technology Student</motion.p>
              <motion.p className="hero-description" variants={reveal}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin sagittis nisl rhoncus mattis nibh.</motion.p>
              <motion.div className="hero-actions" variants={reveal}>
                <motion.button className="button button-dark" onClick={() => handleNav("#work")} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>See more projects <ArrowDownRight size={17} /></motion.button>
                <motion.button className="text-link" onClick={handleResume} whileHover={{ y: -2 }}>View résumé <ArrowUpRight size={16} /></motion.button>
              </motion.div>
              <motion.div className="hero-note" variants={reveal}><span>Currently</span> looking for internship opportunities for 2028.</motion.div>
            </div>
            <motion.div className="hero-visual" variants={softReveal}>
              <div className="hero-image-wrap">
                <img src={heroPhoto} alt="Portrait of Abigail Dela Cruz" className="hero-image" />
                <motion.div className="accent accent-star" aria-hidden="true">
                  <motion.span animate={{ rotate: [-16, 12, -16], y: [0, -7, 0] }} transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}><Star size={22} fill="currentColor" /></motion.span>
                </motion.div>
                <motion.div className="accent accent-dots" aria-hidden="true">
                  <motion.span animate={{ y: [0, -7, 0] }} transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}><i className="dot" /><i className="dot" /><i className="dot" /></motion.span>
                </motion.div>
                <div className="accent accent-squiggle" aria-hidden="true">
                  <span className="squiggle">
                    <svg width="46" height="30" viewBox="0 0 46 30" fill="none"><path d="M2 20 C6 5 14 5 18 14 C22 23 30 23 34 15 C37 9 42 6 45 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  </span>
                </div>
              </div>
              <div className="hero-side-label">scroll to explore <ArrowDownRight size={14} /></div>
            </motion.div>
          </div>
          <motion.div className="hero-rule page-width" variants={reveal}><span>Selected signal</span><span>↓</span><span>2026 — now</span></motion.div>
        </motion.section>

        <motion.section id="about" className="about-section section-pad section-cream" initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <div className="about-grid page-width">
            <motion.div className="section-label" variants={reveal}><span>01</span><span className="vertical-rule" /><span>About</span></motion.div>
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

        <motion.section id="skills" className="skills-section section-pad" initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <div className="skills-grid page-width">
            <motion.div className="section-label" variants={reveal}><span>02</span><span className="vertical-rule" /><span>Skills</span></motion.div>
            <div className="skills-content">
              <motion.div className="skills-heading-row" variants={reveal}><h2 className="section-title">What I bring<br /><em>to the table.</em></h2><p className="skills-caption">A growing set of practical skills, built through coursework, side projects, and generous teammates.</p></motion.div>
              <motion.div className="skill-list" variants={stagger}>
                {skills.map((skill, index) => <motion.div className="skill-row" key={skill} variants={reveal} whileHover={{ x: 8 }}><span>0{index + 1}</span><strong>{skill}</strong><ArrowUpRight size={17} /></motion.div>)}
              </motion.div>
              <div className="tech-stack">
                <div className="tech-stack-head"><span>Tech Stack</span><span>click a folder to explore</span></div>
                <motion.div className="folder-grid" variants={stagger}>
                  {techStack.map((group) => {
                    const isOpen = openFolders.includes(group.category);
                    return (
                      <motion.div className="tech-folder" key={group.category} variants={reveal}>
                        <motion.button className="folder-cover" onClick={() => toggleFolder(group.category)} aria-expanded={isOpen} whileTap={{ scale: 0.98 }}>
                          <span className="folder-tab" />
                          <span className="folder-icon">{isOpen ? <FolderOpen size={17} /> : <Folder size={17} />}</span>
                          <span className="folder-name">{group.category}</span>
                          <span className="folder-count">{group.items.length}</span>
                          <ArrowDownRight size={14} className="folder-chevron" />
                        </motion.button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div className="folder-contents" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.42, ease }}>
                              <motion.ul className="folder-files" initial="hidden" animate="visible" variants={stagger}>
                                {group.items.map((tech) => (
                                  <motion.li className="folder-file" key={tech} variants={reveal}>
                                    <span className="file-dot" />
                                    <span>{tech}</span>
                                  </motion.li>
                                ))}
                              </motion.ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section id="work" className="work-section section-pad section-ink" initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <div className="page-width">
            <motion.div className="work-heading" variants={reveal}><div className="section-label section-label-light"><span>03</span><span className="vertical-rule" /><span>Projects</span></div><p>Small projects, useful questions.<br />Always a work in progress.</p></motion.div>
            <motion.div className="projects-list" variants={stagger}>
              {projects.map((project) => (
                <motion.article className="project-card" key={project.number} variants={reveal} whileHover={{ y: -5 }}>
                  <div className="project-number">{project.number}</div>
                  <div className="project-image-wrap"><img src={project.image} alt={project.imageAlt} className="project-image" /><div className="project-image-overlay" /><span className="project-annotation">working evidence / {project.number}</span></div>
                  <div className="project-info"><div className="project-type">{project.type}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><motion.button className="project-link" onClick={() => setSelectedProject(project)} whileHover={{ y: -2 }}>Read more <ExternalLink size={15} /></motion.button></div>
                </motion.article>
              ))}
            </motion.div>
            <motion.div className="work-footer" variants={reveal}><span>More experiments are taking shape.</span><a href="#contact" onClick={(event) => { event.preventDefault(); handleNav("#contact"); }}>Ask me what’s next <ArrowUpRight size={15} /></a></motion.div>
          </div>
        </motion.section>

        <motion.section id="goals" className="goals-section section-pad section-cream" initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <div className="page-width">
            <motion.div className="goals-head" variants={reveal}>
              <div className="goals-label">
                <span>04</span>
                <span className="vertical-rule" />
                <span>Goals</span>
                <em>/ roadmap</em>
              </div>
              <h2 className="section-title">Plotted for<br /><em>the finish line.</em></h2>
              <p className="goal-sub">A realistic map from third year to first role, with every checkpoint tied to something I'm actively chasing right now.</p>
            </motion.div>
            <motion.div className="roadmap-axis" variants={stagger}>
              {goalAxis.map((stop) => (
                <motion.span key={stop.label} variants={reveal}>
                  <b>{stop.label}</b>
                  {stop.note}
                </motion.span>
              ))}
            </motion.div>
            <motion.div className="goal-route" variants={stagger}>
              {goals.map((goal) => (
                <motion.div className="goal-milestone" key={goal.number} variants={reveal} whileHover={{ x: 8 }}>
                  <span className="goal-num">{goal.number}</span>
                  <span className="goal-node" aria-hidden="true" />
                  <div className="goal-body">
                    <div className="goal-body-top">
                      <span className="goal-tag">{goal.kind}</span>
                      <span className="goal-window">{goal.window}</span>
                    </div>
                    <h3>{goal.title}</h3>
                    <p>{goal.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section id="contact" className="contact-section section-pad" initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
          <div className="contact-grid page-width">
            <motion.div className="contact-label" variants={reveal}><span>05</span><span className="vertical-rule" /><span>Contact me!</span></motion.div>
            <motion.div className="contact-content" variants={reveal}><p className="contact-kicker">Have a problem worth<br /><em>thinking through?</em></p><h2>Let’s make<br /><span>something useful.</span></h2><motion.button className="contact-button" onClick={handleContact} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>Start a conversation <Send size={17} /></motion.button><div className="contact-meta"><span>abigail.bayod@gmail.com</span><span>available for internships · 2028</span></div></motion.div>
          </div>
        </motion.section>
      </main>

      <motion.footer className="site-footer" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={reveal}><div className="page-width footer-inner"><div className="footer-brand"><span>abigail / dev</span></div><p>Made with love.<br />© 2026 Abigail Dela Cruz.</p><div className="social-links"><motion.a href="https://github.com/workwithabby/" aria-label="GitHub" whileHover={{ y: -3 }}><Github size={17} /></motion.a><motion.a href="https://linkedin.com/in/workwithabby/" aria-label="LinkedIn" whileHover={{ y: -3 }}><Linkedin size={17} /></motion.a><motion.a href="https://instagram.com/avyail/" aria-label="Instagram" whileHover={{ y: -3 }}><Instagram size={17} /></motion.a><motion.a href="mailto:abigail.bayod@gmail.com" aria-label="Email" whileHover={{ y: -3 }}><Mail size={17} /></motion.a></div></div></motion.footer>

      <AnimatePresence>
        {selectedProject && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }} onClick={() => setSelectedProject(null)}>
            <motion.button className="modal-close" aria-label="Close project details" onClick={() => setSelectedProject(null)} whileHover={{ rotate: 90 }} transition={{ duration: 0.24, ease }}><X size={20} /></motion.button>
            <motion.div className="modal-shell" role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={{ y: 52, scale: 0.96, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 34, scale: 0.97, opacity: 0 }} transition={{ duration: 0.46, ease }} onClick={(event) => event.stopPropagation()}>
              <div className="modal-media"><img src={selectedProject.image} alt={selectedProject.imageAlt} /><span className="modal-annotation">{selectedProject.type}</span></div>
              <motion.div className="modal-body" initial="hidden" animate="visible" variants={stagger}>
                <motion.div className="modal-kicker" variants={reveal}><span>{selectedProject.number} / project</span><span>{selectedProject.type}</span></motion.div>
                <motion.h3 id="modal-title" variants={reveal}>{selectedProject.title}</motion.h3>
                <motion.p className="modal-role" variants={reveal}>{selectedProject.role}</motion.p>
                <motion.p className="modal-overview" variants={reveal}>{selectedProject.overview}</motion.p>
                <motion.div className="modal-highlights" variants={stagger}>
                  {selectedProject.highlights.map((highlight, index) => (
                    <motion.div className="modal-highlight" key={highlight} variants={reveal}><span>0{index + 1}</span><p>{highlight}</p></motion.div>
                  ))}
                </motion.div>
                <motion.div className="tag-row modal-tags" variants={reveal}>{selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</motion.div>
                <motion.a className="button button-dark modal-cta" href={`mailto:abigail.bayod@gmail.com?subject=About%20${selectedProject.title}`} variants={reveal}>Discuss this project <ArrowUpRight size={16} /></motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

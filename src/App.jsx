import { useState, useEffect, useRef } from "react";
import {
  Mail, MapPin, Github, Linkedin,
  ChevronDown, Send, Code2, Smartphone, Cloud,
  Terminal, Brain, Award, GraduationCap, Briefcase,
  ArrowUpRight, Layers, Cpu, Globe, Database
} from "lucide-react";

/* ─── colour tokens (sage-green + white) ─── */
const sage = {
  50: "#F4F7F2", 100: "#E8EFE4", 200: "#D1DFC9",
  300: "#B0C9A4", 400: "#8BAF7C", 500: "#6B9459",
  600: "#557A45", 700: "#436038", 800: "#374E2E",
  900: "#2C3F26", 950: "#1A2617",
};

/* ─── Intersection Observer hook ─── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Parallax hook ─── */
function useParallax(speed = 0.3) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handler = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return offset * speed;
}

/* ─── Stagger wrapper ─── */
function StaggerChildren({ children, visible, className = "" }) {
  return (
    <div className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}

/* ─── Hero headline: types out, then becomes interactive terminal links ─── */
const HERO_LINE = "Senior Android Engineer | Kotlin · Jetpack Compose · Media3/ExoPlayer | M.S. in CS(AI)";
function HeroHeadline({ onSkill }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    let timer;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= HERO_LINE.length) { clearInterval(timer); setDone(true); }
      }, 42);
    }, 700);
    return () => { clearTimeout(start); clearInterval(timer); };
  }, []);

  const mono = { fontFamily: "ui-monospace, 'Cascadia Code', 'Consolas', monospace", whiteSpace: "pre-wrap" };
  const prompt = <span style={{ color: sage[300], fontWeight: 700 }}>&gt;_ </span>;
  const caret = (
    <span style={{
      display: "inline-block", width: "0.6em", marginLeft: "1px",
      color: sage[300], fontWeight: 700,
      animation: done ? "blink 1.05s steps(1) infinite" : "none",
    }}>▋</span>
  );
  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const sep = (s) => <span style={{ color: "rgba(255,255,255,0.45)" }}>{s}</span>;
  const Link = ({ children, onClick }) => (
    <button className="term-link" onClick={onClick} type="button">{children}</button>
  );

  if (!done) {
    return (
      <span style={mono}>{prompt}{HERO_LINE.slice(0, count)}{caret}</span>
    );
  }
  return (
    <span style={mono}>
      {prompt}
      <Link onClick={() => scroll("about")}>Senior Android Engineer</Link>
      {sep(" | ")}
      <Link onClick={() => onSkill("Kotlin")}>Kotlin</Link>
      {sep(" · ")}
      <Link onClick={() => onSkill("Jetpack Compose")}>Jetpack Compose</Link>
      {sep(" · ")}
      <Link onClick={() => onSkill("Media3/ExoPlayer")}>Media3/ExoPlayer</Link>
      {sep(" | ")}
      <Link onClick={() => scroll("education")}>M.S. in CS(AI)</Link>
      {caret}
    </span>
  );
}

/* ─── Rotating text (Android text-switcher style) ─── */
function RotatingText({ items, interval = 2600 }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), interval);
    return () => clearInterval(t);
  }, [items, interval]);
  return (
    <span style={{ display: "inline-block", position: "relative" }}>
      <span key={idx} style={{ display: "inline-block", animation: "swapUp 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
        {items[idx]}
      </span>
    </span>
  );
}

/* ─── Section title ─── */
function SectionTitle({ label, title }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} className="mb-16 text-center">
      <span
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
          display: "inline-block",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: sage[500],
          marginBottom: "0.75rem",
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        {label}
      </span>
      <h2
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 700,
          color: sage[900],
          fontFamily: "'Playfair Display', serif",
          lineHeight: 1.2,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          width: vis ? "80px" : "0px",
          height: "3px",
          background: `linear-gradient(90deg, ${sage[400]}, ${sage[300]})`,
          margin: "1rem auto 0",
          borderRadius: "999px",
          transition: "width 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
        }}
      />
    </div>
  );
}

/* ═══════════════════════ NAVBAR ═══════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = [
    { full: "About", short: "AB", id: "about" },
    { full: "Skills", short: "SK", id: "skills" },
    { full: "Experience", short: "EX", id: "experience" },
    { full: "Projects", short: "PR", id: "projects" },
    { full: "Education", short: "ED", id: "education" },
    { full: "Contact", short: "CO", id: "contact" },
  ];
  const scroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.06)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <div className="navbar-row" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: scrolled ? 64 : 80, transition: "height 0.4s ease" }}>
        <span
          className="navbar-brand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700, fontSize: "1.5rem", cursor: "pointer",
            color: scrolled ? sage[800] : "#fff",
            transition: "color 0.4s ease",
          }}
        >
          <span className="brand-full">Arul Michael Antony</span>
          <span className="brand-short">AMA</span>
          <span style={{ color: sage[400] }}>.</span>
        </span>
        <div className="navbar-links" style={{ display: "flex", alignItems: "center" }}>
          {links.map((l) => (
            <button key={l.id} onClick={() => scroll(l.id)}
              className="nav-link"
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase",
                color: scrolled ? sage[700] : "rgba(255,255,255,0.9)",
                transition: "color 0.3s",
                borderBottom: "2px solid transparent",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = sage[400]; e.currentTarget.style.borderBottomColor = sage[400]; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = scrolled ? sage[700] : "rgba(255,255,255,0.9)"; e.currentTarget.style.borderBottomColor = "transparent"; }}
            >
              <span className="nav-full">{l.full}</span>
              <span className="nav-short">{l.short}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════ HERO ═══════════════════════ */
function Hero({ onSkill }) {
  const parallaxY = useParallax(0.4);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);

  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      {/* parallax bg */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(135deg, ${sage[900]} 0%, ${sage[700]} 40%, ${sage[500]} 100%)`,
        transform: `translateY(${parallaxY}px)`,
      }} />
      {/* blueprint dot-grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 45%, #000 30%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 45%, #000 30%, transparent 80%)",
        transform: `translateY(${parallaxY * 0.3}px)`,
      }} />
      {/* large outlined glyph accent */}
      <div aria-hidden="true" style={{
        position: "absolute", right: "-4%", top: "8%",
        fontFamily: "ui-monospace, 'Cascadia Code', monospace",
        fontSize: "clamp(8rem, 26vw, 26rem)", fontWeight: 700, lineHeight: 1,
        color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.06)",
        userSelect: "none", pointerEvents: "none",
        transform: `translateY(${parallaxY * 0.6}px)`,
      }}>
        {"</>"}
      </div>
      {/* thin scanning accent line */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: "50%", height: 1,
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
        opacity: 0.5,
      }} />
      {/* content */}
      <div className="hero-content" style={{ position: "relative", zIndex: 10, textAlign: "left", padding: "3rem 2.4rem", maxWidth: 880, width: "100%", margin: "0 1.5rem" }}>
        {/* viewfinder corner brackets */}
        {[
          { top: 0, left: 0, borderTop: 1, borderLeft: 1 },
          { top: 0, right: 0, borderTop: 1, borderRight: 1 },
          { bottom: 0, left: 0, borderBottom: 1, borderLeft: 1 },
          { bottom: 0, right: 0, borderBottom: 1, borderRight: 1 },
        ].map((c, i) => (
          <span key={i} aria-hidden="true" style={{
            position: "absolute", width: 26, height: 26,
            top: c.top, left: c.left, right: c.right, bottom: c.bottom,
            borderTop: c.borderTop ? "2px solid rgba(255,255,255,0.5)" : "none",
            borderBottom: c.borderBottom ? "2px solid rgba(255,255,255,0.5)" : "none",
            borderLeft: c.borderLeft ? "2px solid rgba(255,255,255,0.5)" : "none",
            borderRight: c.borderRight ? "2px solid rgba(255,255,255,0.5)" : "none",
            opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1s",
          }} />
        ))}

        {/* monospace metadata strip */}
        <div style={{
          fontFamily: "ui-monospace, 'Cascadia Code', monospace",
          fontSize: "0.72rem", letterSpacing: "0.04em",
          color: sage[300], marginBottom: "1rem",
          display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s",
        }}>
          <span>40.7128°N · Chicago, IL</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>/</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ color: "rgba(255,255,255,0.45)" }}>$</span>
            <RotatingText items={["open to work", "open to relocate"]} />
          </span>
        </div>

        <h1 className="hero-name" style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 700,
          fontSize: "clamp(2.4rem, 8vw, 5.5rem)", lineHeight: 0.98,
          color: "#fff", margin: "0 0 1.25rem", letterSpacing: "-0.01em",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.3s",
        }}>
          Arul Michael Antony<br />
          <span style={{
            color: "transparent",
            WebkitTextStroke: `1.5px ${sage[300]}`,
            textStroke: `1.5px ${sage[300]}`,
          }}>Felix Raja</span>
        </h1>

        <div className="hero-terminal" style={{
          padding: "0.2rem 0", marginBottom: "1.5rem",
          fontSize: "0.84rem", fontWeight: 500, letterSpacing: "0.02em",
          color: "rgba(255,255,255,0.92)", lineHeight: 1.5,
          opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 0.5s",
        }}>
          <HeroHeadline onSkill={onSkill} />
        </div>

        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.7,
          color: "rgba(255,255,255,0.75)", maxWidth: 620, margin: "0 0 2.2rem",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.6s",
        }}>
          Senior Android Engineer with 4 years of combined experience shipping production
          Kotlin and Jetpack Compose applications - focused on media playback, offline-first
          architecture, and application reliability across diverse device conditions.
          M.S. in CS(AI), bridging mobile engineering with ML integration.
        </p>
        <div style={{
          display: "flex", gap: "0.75rem", justifyContent: "flex-start", flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.8s",
        }}>
          <button
            onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.85rem",
              padding: "0.9rem 1.8rem", borderRadius: 999, border: "none", cursor: "pointer",
              background: sage[300], color: sage[900],
              letterSpacing: "0.05em", textTransform: "uppercase",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
            }}
            onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.background = sage[200]; e.target.style.boxShadow = "0 8px 32px rgba(0,0,0,0.22)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.background = sage[300]; e.target.style.boxShadow = "0 4px 24px rgba(0,0,0,0.18)"; }}
          >
            Work Experience
          </button>
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.85rem",
              padding: "0.9rem 1.8rem", borderRadius: 999, cursor: "pointer",
              background: "rgba(255,255,255,0.1)", color: "#fff",
              border: "1px solid rgba(255,255,255,0.35)",
              letterSpacing: "0.05em", textTransform: "uppercase",
              backdropFilter: "blur(8px)", transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { e.target.style.background = "rgba(255,255,255,0.2)"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.target.style.background = "rgba(255,255,255,0.1)"; e.target.style.transform = "translateY(0)"; }}
          >
            View Projects
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.85rem",
              padding: "0.9rem 1.8rem", borderRadius: 999, cursor: "pointer",
              background: "rgba(255,255,255,0.1)", color: "#fff",
              border: "1px solid rgba(255,255,255,0.35)",
              letterSpacing: "0.05em", textTransform: "uppercase",
              backdropFilter: "blur(8px)", transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { e.target.style.background = "rgba(255,255,255,0.2)"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.target.style.background = "rgba(255,255,255,0.1)"; e.target.style.transform = "translateY(0)"; }}
          >
            Get in Touch
          </button>
        </div>
      </div>
      {/* scroll indicator */}
      <div style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
        opacity: loaded ? 1 : 0, transition: "opacity 1.5s ease 1.2s",
        animation: "bounce 2s ease-in-out infinite",
      }}>
        <ChevronDown size={28} color="rgba(255,255,255,0.5)" />
      </div>
    </section>
  );
}

/* ═══════════════════════ ABOUT ═══════════════════════ */
function About() {
  const [ref, vis] = useReveal();
  return (
    <section id="about" style={{ padding: "7rem 1.5rem", background: "#fff" }}>
      <div ref={ref} style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionTitle label="Introduction" title="About Me" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "center" }} className="md:grid-cols-2">
          <div style={{
            opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(-40px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}>
            <div style={{
              width: "100%", maxWidth: 380, aspectRatio: "4/5", borderRadius: 16,
              margin: "0 auto", position: "relative", overflow: "hidden",
              boxShadow: `12px 12px 0 ${sage[300]}`,
            }}>
              <img
                src="/portfolio-/my_pic.jpg"
                alt="Arul Michael Antony Felix Raja"
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "center top",
                  display: "block",
                }}
              />
            </div>
          </div>
          <div style={{
            opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(40px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s",
          }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.8, color: sage[800], marginBottom: "1.5rem" }}>
              Senior Android Engineer with 4 years of combined experience shipping production
              Kotlin and Jetpack Compose applications, focused on media playback, offline-first
              architecture, and application reliability across diverse device conditions.
              Hands-on with Media3/ExoPlayer and adaptive streaming over HLS and DASH,
              geolocation and geofencing through Google Play Services, and offline-first data
              layers built on Room as the single source of truth.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.8, color: sage[700], marginBottom: "2rem" }}>
              I diagnose production issues on devices I cannot physically reach using field
              telemetry through Crashlytics, Android Vitals, and Macrobenchmark, and I own the
              modularization, testing, and static analysis gates that hold quality as a team
              scales. M.S. in Computer Science (AI) from DePaul University - and I apply AI
              tooling day to day to accelerate debugging, expand test coverage, and streamline
              code review.
            </p>
            <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
              {[
                { icon: <MapPin size={18} />, text: "Chicago, IL" },
                { icon: <Mail size={18} />, text: "arulmichaelantonyf@gmail.com" },
                
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: sage[600] }}>
                  <span style={{ color: sage[400] }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ SKILLS ═══════════════════════ */
const skillsData = [
  {
    icon: <Smartphone size={28} />, title: "Android Core",
    items: ["Kotlin", "Java", "Jetpack Compose", "XML Views", "Coroutines", "Flow", "StateFlow", "SharedFlow", "Channels", "MVVM", "MVI", "Clean Architecture", "Unidirectional Data Flow", "ViewModel", "Navigation Compose", "Material Design 3", "Accessibility (WCAG 2.1)", "KMP"],
  },
  {
    icon: <Globe size={28} />, title: "Media & Streaming",
    items: ["Media3/ExoPlayer", "HLS", "DASH", "Adaptive Bitrate Streaming", "Live & On-Demand Playback", "Player Lifecycle", "Reconnect Handling", "Playback Telemetry"],
  },
  {
    icon: <Layers size={28} />, title: "Libraries",
    items: ["Hilt", "Dagger 2", "Room", "DataStore", "WorkManager", "Paging 3", "CameraX", "Retrofit", "OkHttp", "Moshi", "Gson", "Glide", "Coil", "RxJava", "Firebase", "FCM", "Maps/Location/Geofencing", "Biometric API", "Android KeyStore", "Deep Links"],
  },
  {
    icon: <Code2 size={28} />, title: "Testing & Tooling",
    items: ["JUnit", "Espresso", "MockK", "Mockito", "Robolectric", "Turbine", "Compose UI Testing", "LeakCanary", "Detekt", "ktlint", "Gradle (Kotlin DSL)", "App Bundles", "ProGuard/R8", "Baseline Profiles", "Macrobenchmark", "Android Vitals", "Studio Profiler", "StrictMode"],
  },
  {
    icon: <Brain size={28} />, title: "AI / ML",
    items: ["Scikit-learn", "Hugging Face Transformers", "OpenCV", "YOLOv8", "Donut", "LayoutLM", "TensorFlow", "Custom LLM Pipelines", "Gradio", "AI-Assisted Development"],
  },
  {
    icon: <Cloud size={28} />, title: "Backend & Cloud",
    items: ["Java", "Spring Boot", "Flask", "REST APIs", "MongoDB", "AWS EC2", "S3", "Lambda", "DynamoDB", "IAM", "CloudWatch"],
  },
  {
    icon: <Database size={28} />, title: "Cross-Platform",
    items: ["React", "Ngrx", "Ionic", "Swift", "SwiftUI"],
  },
  {
    icon: <Terminal size={28} />, title: "DevOps / Tools",
    items: ["Git", "GitHub Actions", "Jenkins", "Docker", "Kubernetes", "Postman", "Linux", "Bash"],
  },
  {
    icon: <Cpu size={28} />, title: "Languages",
    items: ["Kotlin", "Java", "Python", "SQL", "JavaScript", "C++"],
  },
];

/* ─── where a skill shows up across experience + projects ─── */
function usesSkill(text, skill) {
  const esc = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^A-Za-z0-9])${esc}([^A-Za-z0-9]|$)`, "i").test(text);
}
function findSkillUsage(skill) {
  const experience = experienceData
    .filter((e) => e.bullets.some((b) => usesSkill(b, skill)))
    .map((e) => ({ role: e.role, company: e.company, location: e.location }));
  const projects = projectsData
    .filter((p) => p.tech.some((t) => usesSkill(t, skill)) || usesSkill(p.desc, skill))
    .map((p) => ({ title: p.title, subtitle: p.subtitle }));
  return { experience, projects };
}

/* ─── modal showing where a skill was applied ─── */
function SkillModal({ skill, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const { experience, projects } = findSkillUsage(skill);
  const empty = experience.length === 0 && projects.length === 0;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        background: "rgba(26,38,23,0.55)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.25rem", animation: "fadeModal 0.25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 20, padding: "2rem",
          maxWidth: 460, width: "100%", maxHeight: "85vh", overflowY: "auto",
          border: `1px solid ${sage[200]}`, boxShadow: "0 24px 70px rgba(0,0,0,0.3)",
          position: "relative", animation: "popModal 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute", top: 16, right: 16, width: 34, height: 34,
            borderRadius: 999, border: `1px solid ${sage[200]}`, background: sage[50],
            cursor: "pointer", color: sage[700], fontSize: "1.1rem", lineHeight: 1,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >✕</button>

        <span style={{
          fontFamily: "ui-monospace, 'Cascadia Code', monospace", fontSize: "0.7rem",
          letterSpacing: "0.12em", textTransform: "uppercase", color: sage[500],
        }}>where I used it</span>
        <h3 style={{
          fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1.6rem",
          color: sage[900], margin: "0.35rem 0 1.5rem", paddingRight: "2rem",
        }}>{skill}</h3>

        {empty && (
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", lineHeight: 1.7, color: sage[700] }}>
            Part of my core toolkit — applied broadly across my Android work and study.
          </p>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: projects.length ? "1.5rem" : 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <Briefcase size={16} color={sage[600]} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase", color: sage[600] }}>Experience</span>
            </div>
            {experience.map((e, i) => (
              <div key={i} style={{
                padding: "0.85rem 1rem", borderRadius: 12, marginBottom: "0.5rem",
                background: sage[50], border: `1px solid ${sage[100]}`,
              }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: sage[900] }}>{e.company}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.83rem", color: sage[600] }}>{e.role} · {e.location}</div>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <Code2 size={16} color={sage[600]} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.06em", textTransform: "uppercase", color: sage[600] }}>Projects</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {projects.map((p, i) => (
                <span key={i} style={{
                  padding: "0.5rem 0.85rem", borderRadius: 12,
                  background: sage[600], color: "#fff",
                  fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.82rem",
                }} title={p.subtitle}>{p.title}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Skills({ onSkill }) {
  const [ref, vis] = useReveal();
  return (
    <section id="skills" style={{ padding: "7rem 1.5rem", background: sage[50] }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle label="Expertise" title="Technical Skills" />
        <p style={{
          textAlign: "center", marginTop: 0, marginBottom: "2.5rem",
          fontFamily: "ui-monospace, 'Cascadia Code', monospace", fontSize: "0.78rem",
          color: sage[500], letterSpacing: "0.02em",
        }}>
          // tap any skill to see where I applied it
        </p>
        <StaggerChildren visible={vis} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((cat, i) => (
            <div key={i}
              style={{
                background: "#fff", borderRadius: 16, padding: "2rem",
                border: `1px solid ${sage[100]}`,
                transition: "all 0.4s ease", cursor: "default",
                boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${sage[200]}`; e.currentTarget.style.borderColor = sage[300]; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.03)"; e.currentTarget.style.borderColor = sage[100]; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: sage[100], display: "flex", alignItems: "center", justifyContent: "center", color: sage[600] }}>
                  {cat.icon}
                </div>
                <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "1.1rem", color: sage[900] }}>{cat.title}</h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {cat.items.map((s, j) => (
                  <button key={j}
                    onClick={() => onSkill(s)}
                    style={{
                      padding: "0.3rem 0.7rem", borderRadius: 999, fontSize: "0.78rem",
                      fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: "pointer",
                      background: sage[50], color: sage[700], border: `1px solid ${sage[200]}`,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = sage[600]; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = sage[600]; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = sage[50]; e.currentTarget.style.color = sage[700]; e.currentTarget.style.borderColor = sage[200]; }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

/* ═══════════════════════ EXPERIENCE ═══════════════════════ */
const experienceData = [
  {
    role: "Senior Android Developer",
    company: "Digital Factory",
    location: "Chicago, IL",
    period: "Sep 2025 – Present",
    verifyLink: "https://www.dgtl-factory.com/about",
    verifyLabel: "Verified on dgtl-factory.com",
    bullets: [
      "Media Playback & Streaming: Built and maintained Media3/ExoPlayer playback for a client streaming product, covering adaptive bitrate delivery over HLS and DASH, player lifecycle and surface management, and recovery from mid-stream network interruptions without restarting the session.",
      "Location-Aware Content Delivery: Integrated Google Play Services Location and Geofencing with the playback stack so streaming clients receive proximity-targeted ad campaign content, coordinating geofence transitions with playback state to avoid interrupting active sessions.",
      "Performance & Stability Monitoring: Instrumented Firebase Crashlytics and Android Vitals to track ANRs, cold start, and slow-frame rates; diagnosed and removed eager initialization from Application.onCreate and generated Baseline Profiles, reducing p95 cold start by 22%, verified in the field through Android Vitals and locally through Macrobenchmark.",
      "Offline-First Caching: Designed an LRU in-memory cache layered over Room as the single source of truth, delivering sub-100ms reads on hot location data and uninterrupted offline operation for field users.",
      "Dependency Injection & Modularization: Refactored the codebase into feature modules with shared core modules, wired through Hilt and Gradle Kotlin DSL, enabling parallel feature development across teams and reducing incremental build times by 30%.",
      "Reactive State Management: Implemented Unidirectional Data Flow with StateFlow for screen state and SharedFlow for one-shot events across 12+ Compose screens, eliminating configuration-change bugs and producing predictable, testable states.",
      "Test Automation: Built a Page Object Model test framework over Espresso and JUnit achieving 70%+ coverage on critical flows, wired into GitHub Actions to gate every pull request.",
      "AI-Assisted Engineering: Applied AI tooling in the development lifecycle for automated test scaffolding, first-pass pull request review, and crash-cluster triage, reducing mechanical review comments so human review time goes to architecture and correctness.",
      "Maps & Field Workflows: Integrated Google Maps SDK with custom marker clustering, polygon overlays, and geofence visualization for field-service workflows across 1,000+ active sites.",
      "Secure Storage: Implemented Android KeyStore-backed encrypted token storage with BiometricPrompt re-authentication for high-privilege actions, hardening the app against on-device credential theft.",
      "Code Quality Gates: Introduced Detekt and ktlint with pre-commit hooks and CI checks, standardizing Kotlin style across the team and shortening pull request review cycles.",
    ],
  },
  {
    role: "Android Developer",
    company: "Knight Group (EV Startup)",
    location: "India",
    period: "Oct 2022 – Aug 2023",
    bullets: [
      "Live Camera Streaming: Built live camera playback for Sentry mode and Dashcam feeds using Media3/ExoPlayer, tuned for low-latency live delivery with reconnect handling for intermittent vehicle connectivity, alongside an energy monitoring dashboard (Powerwall, solar, grid) in Jetpack Compose.",
      "Vehicle Control App: Developed a companion app for remote lock, unlock, horn, lights, Summon, charging, and pre-conditioning using Kotlin Coroutines, StateFlow, and WebSocket connections to the vehicle systems.",
      "BLE Passive Entry: Implemented passive entry over Bluetooth Low Energy so the vehicle unlocks on owner proximity, working inside a latency budget set by the vehicle hardware and managing service lifecycle and handshake flow.",
      "Security & Hardware Collaboration: Implemented end-to-end encryption via Android KeyStore for safety-critical vehicle commands; defined vehicle-to-app API contracts with the embedded firmware team ahead of implementation, since their release cycle ran months against our weeks.",
    ],
  },
  {
    role: "App Engineer",
    company: "Tata Consultancy Services",
    location: "India",
    period: "May 2022 – Sep 2022",
    bullets: [
      "API Integration: Built REST clients using Retrofit and OkHttp interceptors with centralized error handling, consumed across client mobile applications.",
      "Offline Caching: Implemented Room-backed caching of API responses for offline reads, reducing redundant network calls by 35% on low-bandwidth field devices.",
      "Crash Reporting & Telemetry: Integrated Firebase Crashlytics and Analytics, surfacing top crash signatures and funnel events to product stakeholders for prioritization.",
      "Build Pipelines: Configured Gradle build variants and signed APK generation so QA received nightly builds through Jenkins for faster regression cycles.",
    ],
  },
  {
    role: "Junior Android Developer",
    company: "HumCen",
    location: "India",
    period: "Jan 2021 – April 2022",
    bullets: [
      "App Bootstrapping & Architecture: Built the Android app from scratch on MVVM with ViewModel, LiveData, and the Repository pattern, establishing a modular structure that scaled to 8+ feature modules.",
      "Networking & Auth: Designed the REST layer with Retrofit and OkHttp including OAuth token refresh and standardized error handling across 25+ endpoints, plus Firebase Authentication and FCM push for application status changes.",
      "Local Persistence: Implemented Room for offline storage of drafts and user data, with type converters and migrations across 4 schema versions without data loss.",
      "Async Refactor: Migrated legacy callback-based async code to Coroutines and Flow, simplifying error propagation and reducing networking-layer boilerplate by 40%.",
      "Performance Optimization: Profiled UI rendering with Android Studio Profiler and Layout Inspector, lowering dropped-frame rates on the patent listing screen from 14% to under 2% on low-RAM devices.",
      "Release Management: Owned Play Store releases including R8 shrinking and obfuscation, signed App Bundle generation, staged rollouts, and crash-rate monitoring.",
    ],
  },
];

function Experience() {
  return (
    <section id="experience" style={{ padding: "7rem 1.5rem", background: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionTitle label="Career" title="Work Experience" />
        <div style={{ position: "relative" }}>
          {/* vertical line */}
          <div className="hidden md:block" style={{ position: "absolute", left: 20, top: 8, bottom: 8, width: 2, background: sage[200] }} />
          {experienceData.map((exp, i) => {
            const [ref, vis] = useReveal(0.2);
            return (
              <div ref={ref} key={i} style={{
                marginBottom: i < experienceData.length - 1 ? "3rem" : 0,
                paddingLeft: "0",
                opacity: vis ? 1 : 0,
                transform: vis ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
              }} className="md:pl-16">
                {/* dot on timeline */}
                <div className="hidden md:block" style={{
                  position: "absolute", left: 12, width: 18, height: 18,
                  borderRadius: "50%", background: "#fff", border: `3px solid ${sage[400]}`,
                  boxShadow: `0 0 0 4px ${sage[100]}`,
                }} />
                <div style={{
                  background: sage[50], borderRadius: 16, padding: "2rem",
                  border: `1px solid ${sage[100]}`,
                  transition: "all 0.3s ease",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 8px 32px ${sage[200]}`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
                    <div>
                      <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: sage[900] }}>{exp.role}</h3>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: sage[600], display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Briefcase size={14} /> {exp.company} · {exp.location}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
                      <span style={{
                        fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", fontWeight: 600,
                        padding: "0.35rem 1rem", borderRadius: 999,
                        background: sage[100], color: sage[700],
                      }}>
                        {exp.period}
                      </span>
                      {exp.verifyLink && (
                        <a
                          href={exp.verifyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={exp.verifyLabel}
                          style={{
                            display: "inline-flex", alignItems: "center", gap: "0.4rem",
                            fontFamily: "'Outfit', sans-serif", fontSize: "0.72rem", fontWeight: 600,
                            padding: "0.32rem 0.8rem", borderRadius: 999,
                            background: sage[600], color: "#fff",
                            textDecoration: "none",
                            border: `1px solid ${sage[600]}`,
                            transition: "all 0.3s ease",
                            letterSpacing: "0.02em",
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = sage[700]; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 6px 16px ${sage[200]}`; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = sage[600]; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                        >
                          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#9CD18A", boxShadow: "0 0 0 3px rgba(156,209,138,0.25)" }} />
                          {exp.verifyLabel || "Verified"}
                          <ArrowUpRight size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {exp.bullets.map((b, j) => (
                      <li key={j} style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem", lineHeight: 1.7,
                        color: sage[700], paddingLeft: "1.2rem", position: "relative", marginBottom: "0.5rem",
                      }}>
                        <span style={{ position: "absolute", left: 0, top: "0.6em", width: 6, height: 6, borderRadius: "50%", background: sage[400] }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ PROJECTS ═══════════════════════ */
const projectsData = [
  {
    title: "Map Test Framework",
    subtitle: "Android Maps Test Framework",
    tech: ["Android", "Kotlin", "Espresso", "Compose UI Testing", "Google Maps SDK", "Room", "Page Object Model", "GitHub Actions"],
    desc: "Implemented an LRU cache (HashMap plus doubly linked list) for O(1) location lookups with automatic eviction, nearest-location search via Haversine distance, and a three-layer data strategy of cache to Room to network. Built a Page Object Model test layer with reusable helpers, test data builders, and a LocationMockHelper for deterministic GPS simulation across geofence enter and exit scenarios. Authored 25+ Espresso and Compose UI tests covering search, favorites, offline mode, and navigation state persistence, gated in a GitHub Actions CI pipeline across API 34 emulators.",
    icon: <Globe size={24} />,
    link: "https://github.com/arulmickel/Map-Test-Framework",
  },
  {
    title: "BorBuddy",
    subtitle: "Social Media App (in progress)",
    tech: ["Android", "Kotlin", "Jetpack Compose", "Room", "WorkManager", "Media3"],
    desc: "Built an offline-first architecture with Room as the single source of truth, synchronized through WorkManager so the feed stays usable in low-connectivity conditions. Designed a reactive Compose UI with state decoupled from business logic, keeping screens testable without instrumenting the UI. Currently extending the feed with Media3/ExoPlayer inline video playback, focused on player reuse across a scrolling list and releasing players correctly to avoid surface leaks.",
    icon: <Layers size={24} />,
    link: "https://github.com/arulmickel/BorBuddy-app",
  },
  {
    title: "InstaFeed Ads Demo",
    subtitle: "Interactive Ad Formats Feed (in progress)",
    tech: ["Android", "Kotlin", "Jetpack Compose", "LazyColumn", "Analytics"],
    desc: "Engineered an infinite-scroll feed rendering interactive ad units without UI jank, optimizing LazyColumn with stable keys and derived state to minimize unnecessary recomposition. Built a custom analytics logger tracking viewability, impressions, and dwell time as structured events.",
    icon: <Smartphone size={24} />,
    link: null,
  },
  {
    title: "Parking Finder",
    subtitle: "Location & Maps App",
    tech: ["Android", "Kotlin", "Google Play Services", "Room", "Retrofit", "OkHttp", "WorkManager"],
    desc: "Delivered geolocation features with Maps and Location APIs, caching results offline in Room with graceful fallbacks through the Connectivity APIs. Consumed REST APIs with Retrofit and OkHttp including retries with backoff, and tuned background updates via WorkManager and a foreground service for power efficiency on poor networks.",
    icon: <MapPin size={24} />,
    link: "https://github.com/arulmickel/Parking-Finder-app",
  },
  {
    title: "AI Code Generator",
    subtitle: "Screenshot to HTML/CSS/JS",
    tech: ["Python", "OpenCV", "Transformers", "YOLOv8", "Flask"],
    desc: "Developed a screenshot-to-code engine using YOLOv8 for UI component detection feeding an LLM for code generation, demonstrating end-to-end ML pipeline construction rather than tool consumption.",
    icon: <Code2 size={24} />,
    link: "https://github.com/arulmickel/vision-to-code",
  },
  {
    title: "Deepfake Image Classification",
    subtitle: "Vision / Neural Networks",
    tech: ["Deep Learning", "CNN", "Grad-CAM", "Image Processing"],
    desc: "Built an image classification pipeline to detect AI-generated images, applying Grad-CAM interpretability to visualize model attention and support debugging.",
    icon: <Brain size={24} />,
    link: "https://github.com/arulmickel/deepfakedetect-vit",
  },
];

function Projects() {
  const [ref, vis] = useReveal();
  return (
    <section id="projects" style={{ padding: "7rem 1.5rem", background: sage[50] }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle label="Portfolio" title="Featured Projects" />
        <StaggerChildren visible={vis} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((p, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: 16, padding: "2rem", position: "relative",
              border: `1px solid ${sage[100]}`, overflow: "hidden",
              transition: "all 0.4s ease", cursor: "default",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = `0 16px 48px ${sage[200]}`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {/* accent strip */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${sage[400]}, ${sage[300]})` }} />
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: sage[100], display: "flex", alignItems: "center", justifyContent: "center", color: sage[600] }}>
                  {p.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: sage[900], lineHeight: 1.2 }}>{p.title}</h3>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: sage[500] }}>{p.subtitle}</span>
                </div>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: sage[700], marginBottom: "1rem" }}>
                {p.desc}
              </p>
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.4rem",
                    fontFamily: "'Outfit', sans-serif", fontSize: "0.82rem", fontWeight: 600,
                    color: sage[600], textDecoration: "none", marginBottom: "1rem",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = sage[800]; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = sage[600]; }}
                >
                  <Github size={14} /> View on GitHub <ArrowUpRight size={12} />
                </a>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                {p.tech.map((t, j) => (
                  <span key={j} style={{
                    padding: "0.2rem 0.6rem", borderRadius: 999, fontSize: "0.72rem",
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                    background: sage[50], color: sage[600], border: `1px solid ${sage[200]}`,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

/* ═══════════════════════ EDUCATION ═══════════════════════ */
function Education() {
  const [ref, vis] = useReveal();
  return (
    <section id="education" style={{ padding: "7rem 1.5rem", background: "#fff" }}>
      <div ref={ref} style={{ maxWidth: 900, margin: "0 auto" }}>
        <SectionTitle label="Academics" title="Education & Certificates" />
        <StaggerChildren visible={vis}>
          {/* Education card */}
          <div style={{
            background: sage[50], borderRadius: 16, padding: "2.5rem",
            border: `1px solid ${sage[100]}`, marginBottom: "1.5rem",
            display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap",
          }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: sage[200], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <GraduationCap size={32} color={sage[700]} />
            </div>
            <div style={{ flex: 1, minWidth: 250 }}>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: sage[900], marginBottom: "0.25rem" }}>
                M.S. in CS(AI)
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: sage[600], marginBottom: "0.75rem" }}>
                DePaul University, Chicago - Sep 2023 to Nov 2025
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: sage[700] }}>
                <strong>Relevant Coursework:</strong> Data Structures & Algorithms, DBMS,
                Distributed Systems, OOP, AI, Computer Vision, Neural Networks
              </p>
            </div>
          </div>
          {/* Bachelor's card */}
          <div style={{
            background: sage[50], borderRadius: 16, padding: "2.5rem",
            border: `1px solid ${sage[100]}`, marginBottom: "1.5rem",
            display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap",
          }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: sage[200], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <GraduationCap size={32} color={sage[700]} />
            </div>
            <div style={{ flex: 1, minWidth: 250 }}>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: sage[900], marginBottom: "0.25rem" }}>
                Bachelor of Engineering (BE)
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: sage[600] }}>
                PRIST University, India - May 2021
              </p>
            </div>
          </div>
          {/* Certificate card */}
          <a
            href="https://www.credly.com/badges/43d31ac1-b650-462d-a740-7a5b8babca1c/public_url"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: sage[50], borderRadius: 16, padding: "2rem",
              border: `1px solid ${sage[100]}`,
              display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap",
              textDecoration: "none", transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = sage[300]; e.currentTarget.style.boxShadow = `0 8px 24px ${sage[100]}`; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = sage[100]; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ width: 64, height: 64, borderRadius: 16, background: sage[200], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Award size={32} color={sage[700]} />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: sage[900] }}>
                Meta Android Developer Professional Certificate
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: sage[600], marginBottom: "0.5rem" }}>
                Industry-recognized certification in Android development
              </p>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "0.35rem",
                fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", fontWeight: 600,
                color: sage[600],
              }}>
                Verify on Credly <ArrowUpRight size={14} />
              </span>
            </div>
            <div className="cert-badge-wrap" style={{
              flexShrink: 0,
              width: 130, height: 130,
              borderRadius: 16,
              background: "#fff",
              border: `1px solid ${sage[200]}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "0.6rem",
              boxShadow: `0 4px 16px ${sage[100]}`,
            }}>
              <img
                src={`${import.meta.env.BASE_URL}meta-android-developer-professional-certificate.png`}
                alt="Meta Android Developer Professional Certificate badge"
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              />
            </div>
          </a>
        </StaggerChildren>

        {/* Extracurricular */}
        <div style={{ marginTop: "3rem" }}>
          <h3 style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "1rem",
            color: sage[500], letterSpacing: "0.1em", textTransform: "uppercase",
            marginBottom: "1.25rem",
            opacity: vis ? 1 : 0, transition: "opacity 0.6s ease 0.5s",
          }}>
            Extracurricular Activities
          </h3>
          <StaggerChildren visible={vis} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Google Developer Group", period: "2017–2018", desc: "Android Study Jams -Completed Kotlin bootcamps and app development challenges" },
              { title: "DePaul CS Society", period: "2023–2025", desc: "Led Android dev workshops, mentored undergrads on mobile projects" },
              { title: "IEEE Computer Society", period: "2017–2020", desc: "Design Head Coordinator -Led 15 members, organized 10+ tech workshops, 30% engagement increase" },
            ].map((a, i) => (
              <div key={i} style={{
                padding: "1.25rem", borderRadius: 12, border: `1px solid ${sage[100]}`,
                background: sage[50], transition: "all 0.3s ease",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = sage[300]; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = sage[100]; }}
              >
                <h4 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: sage[800], marginBottom: "0.25rem" }}>{a.title}</h4>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", color: sage[500] }}>{a.period}</span>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: sage[700], marginTop: "0.5rem", lineHeight: 1.6 }}>{a.desc}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ CONTACT ═══════════════════════ */
function Contact() {
  const [ref, vis] = useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || "visitor"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:arulmichaelantonyf@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  const inputStyle = {
    width: "100%", padding: "0.9rem 1rem", borderRadius: 12,
    border: `1.5px solid ${sage[200]}`, background: "#fff",
    fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem",
    color: sage[900], outline: "none", transition: "border-color 0.3s",
  };

  return (
    <section id="contact" style={{ padding: "7rem 1.5rem", background: sage[50] }}>
      <div ref={ref} style={{ maxWidth: 800, margin: "0 auto" }}>
        <SectionTitle label="Let's Connect" title="Get in Touch" />
        <div style={{
          display: "grid", gridTemplateColumns: "1fr", gap: "3rem",
          opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
        }} className="md:grid-cols-5">
          {/* info */}
          <div className="md:col-span-2">
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.7, color: sage[700], marginBottom: "1.25rem" }}>
              Interested in working together? I'm always open to discussing new
              opportunities, projects, or ideas. Currently looking for roles as:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
              {["Senior Android Engineer", "Android Developer", "Mobile + AI Engineer"].map((r, i) => (
                <span key={i} style={{
                  padding: "0.4rem 0.9rem", borderRadius: 999,
                  fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem", fontWeight: 600,
                  background: sage[100], color: sage[800], border: `1px solid ${sage[200]}`,
                  letterSpacing: "0.02em",
                }}>
                  {r}
                </span>
              ))}
            </div>
            {[
              { icon: <Mail size={20} />, label: "Email", value: "arulmichaelantonyf@gmail.com" },
              { icon: <MapPin size={20} />, label: "Location", value: "Chicago, IL" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: sage[200], display: "flex", alignItems: "center", justifyContent: "center", color: sage[600] }}>
                  {c.icon}
                </div>
                <div>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: sage[500], fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{c.label}</span>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: sage[800] }}>{c.value}</p>
                </div>
              </div>
            ))}
            {/* socials */}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
              {[
                { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/arul-michael-antony-f-661260187/" },
                { icon: <Github size={20} />, href: "https://github.com/arulmickel" },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                  width: 44, height: 44, borderRadius: 12, border: `1.5px solid ${sage[200]}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: sage[600], background: "#fff", textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = sage[600]; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = sage[600]; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = sage[600]; e.currentTarget.style.borderColor = sage[200]; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          {/* form */}
          <div className="md:col-span-3" style={{
            background: "#fff", borderRadius: 16, padding: "2rem",
            border: `1px solid ${sage[100]}`, boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input
                placeholder="Your Name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = sage[400]}
                onBlur={(e) => e.target.style.borderColor = sage[200]}
              />
              <input
                type="email" placeholder="Your Email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = sage[400]}
                onBlur={(e) => e.target.style.borderColor = sage[200]}
              />
              <textarea
                placeholder="Your Message" rows={5} value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => e.target.style.borderColor = sage[400]}
                onBlur={(e) => e.target.style.borderColor = sage[200]}
              />
              <button
                onClick={handleSubmit}
                style={{
                  padding: "0.9rem 2rem", borderRadius: 12, border: "none", cursor: "pointer",
                  background: `linear-gradient(135deg, ${sage[600]}, ${sage[500]})`,
                  color: "#fff", fontFamily: "'Outfit', sans-serif", fontWeight: 600,
                  fontSize: "0.9rem", letterSpacing: "0.05em", textTransform: "uppercase",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                  transition: "all 0.3s ease",
                  boxShadow: `0 4px 16px ${sage[300]}`,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${sage[300]}`; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 16px ${sage[300]}`; }}
              >
                {sent ? "Message Sent! ✓" : <><Send size={16} /> Send Message</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════ FLOATING ACTIONS (Meta + GitHub + LinkedIn) ═══════════════════════ */
function FloatingActions() {
  const baseStyle = {
    display: "flex", alignItems: "center", gap: "0.5rem",
    padding: "0.55rem 0.65rem", borderRadius: 999,
    background: "rgba(255,255,255,0.95)",
    border: `1px solid ${sage[200]}`,
    backdropFilter: "blur(10px)",
    boxShadow: "0 6px 24px rgba(0,0,0,0.18)",
    color: sage[900], textDecoration: "none",
    fontFamily: "'Outfit', sans-serif", fontSize: "0.78rem",
    fontWeight: 600, letterSpacing: "0.04em",
    cursor: "pointer",
    transition: "background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
  };

  return (
    <div className="floating-actions" style={{
      position: "fixed", zIndex: 999,
      display: "flex", flexDirection: "column", gap: "0.6rem",
    }}>
      {/* Meta certification - scroll to education */}
      <button
        className="float-btn"
        title="Meta Android Developer Certified"
        onClick={() => document.getElementById("education")?.scrollIntoView({ behavior: "smooth" })}
        style={{
          ...baseStyle,
          background: "rgba(255,255,255,0.95)",
          border: `1px solid ${sage[200]}`,
          color: sage[900],
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}Meta-Logo-PNG.png`}
          alt="Meta Android Developer Certified"
          className="float-btn-icon-img"
          style={{ width: 28, height: 28, objectFit: "contain", display: "block", flexShrink: 0 }}
        />
        <span className="float-btn-label">Meta Android Developer Certified</span>
      </button>

      {/* GitHub */}
      <a
        href="https://github.com/arulmickel"
        target="_blank"
        rel="noopener noreferrer"
        title="View my GitHub"
        className="float-btn"
        style={baseStyle}
      >
        <span style={{ display: "flex", width: 28, height: 28, alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Github size={20} />
        </span>
        <span className="float-btn-label">GitHub</span>
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/arul-michael-antony-f-661260187/"
        target="_blank"
        rel="noopener noreferrer"
        title="View my LinkedIn"
        className="float-btn"
        style={baseStyle}
      >
        <span style={{ display: "flex", width: 28, height: 28, alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Linkedin size={20} />
        </span>
        <span className="float-btn-label">LinkedIn</span>
      </a>
    </div>
  );
}

/* ═══════════════════════ FOOTER ═══════════════════════ */
function Footer() {
  return (
    <footer style={{
      padding: "2.5rem 1.5rem", textAlign: "center",
      background: sage[900],
    }}>
      <span style={{
        fontFamily: "'Playfair Display', serif", fontWeight: 700,
        fontSize: "1.3rem", color: "#fff",
      }}>
        <span className="brand-full">Arul Michael Antony</span>
        <span className="brand-short">AMA</span>
        <span style={{ color: sage[400] }}>.</span>
      </span>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
        color: "rgba(255,255,255,0.5)", marginTop: "0.75rem",
      }}>
        © {new Date().getFullYear()} Arul Michael Antony Felix Raja.
      </p>
    </footer>
  );
}

/* ═══════════════════════ GLOBAL STYLES ═══════════════════════ */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Outfit:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');

      * { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
      img { max-width: 100%; height: auto; }

      @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); }
        100% { transform: translateY(-20px) rotate(5deg); }
      }

      @keyframes bounce {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(8px); }
      }

      @keyframes fadeSlideIn {
        from { opacity: 0; transform: translateX(-10px); }
        to { opacity: 1; transform: translateX(0); }
      }

      @keyframes blink {
        0%, 50% { opacity: 1; }
        50.01%, 100% { opacity: 0; }
      }

      @keyframes fadeModal {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes popModal {
        from { opacity: 0; transform: translateY(16px) scale(0.96); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }

      @keyframes swapUp {
        from { opacity: 0; transform: translateY(0.7em); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* Interactive terminal links in the hero headline */
      .term-link {
        font: inherit;
        color: #fff;
        background: transparent;
        border: none;
        padding: 0 1px;
        cursor: pointer;
        border-bottom: 1px dashed rgba(255,255,255,0.4);
        transition: color 0.2s ease, border-color 0.2s ease, text-shadow 0.2s ease;
      }
      .term-link:hover {
        color: ${sage[300]};
        border-bottom-color: ${sage[300]};
        text-shadow: 0 0 12px rgba(176,201,164,0.6);
      }

      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: ${sage[50]}; }
      ::-webkit-scrollbar-thumb { background: ${sage[300]}; border-radius: 999px; }
      ::-webkit-scrollbar-thumb:hover { background: ${sage[400]}; }

      ::selection { background: ${sage[200]}; color: ${sage[900]}; }

      /* Floating action cluster - top-right, always visible */
      .floating-actions { top: 100px; right: 20px; }

      .float-btn { overflow: hidden; }
      .float-btn .float-btn-label {
        max-width: 0;
        opacity: 0;
        white-space: nowrap;
        overflow: hidden;
        margin-left: 0;
        transition: max-width 0.35s ease, opacity 0.25s ease, margin-left 0.35s ease;
      }
      .float-btn:hover .float-btn-label {
        max-width: 260px;
        opacity: 1;
        margin-left: 0.15rem;
      }
      .float-btn:hover {
        transform: translateY(-2px);
        background: ${sage[50]} !important;
        border-color: ${sage[300]} !important;
        box-shadow: 0 10px 32px rgba(0,0,0,0.22) !important;
      }

      /* Brand name - desktop shows full, mobile shows short */
      .brand-full { display: inline; }
      .brand-short { display: none; }

      /* Navbar links - desktop shows full names, mobile shows 2-letter abbreviations inline */
      .navbar-links { gap: 1.6rem; }
      .nav-link { padding: 0.25rem 0; font-size: 0.85rem; }
      .nav-full { display: inline; }
      .nav-short { display: none; }

      /* Tablet & mobile adjustments */
      @media (max-width: 768px) {
        .floating-actions { top: 84px; right: 12px; gap: 0.5rem !important; }
        .float-btn { padding: 0.45rem 0.55rem !important; }
        .float-btn .float-btn-icon-img { width: 24px !important; height: 24px !important; }

        .brand-full { display: none; }
        .brand-short { display: inline; }

        /* Mobile: inline full nav, sized down to fit */
        .navbar-brand { font-size: 1.05rem !important; }
        .navbar-row { padding: 0 0.7rem !important; }
        .navbar-links { gap: 0.55rem !important; }
        .nav-link { font-size: 0.65rem !important; padding: 0.2rem 0.1rem !important; letter-spacing: 0.02em !important; }

        /* Tighten section padding and reduce vertical rhythm on mobile */
        section { padding-top: 4rem !important; padding-bottom: 4rem !important; padding-left: 1.1rem !important; padding-right: 1.1rem !important; }
        section#hero { padding: 0 !important; }
        .hero-content { padding: 2rem 1.4rem !important; margin: 0 0.9rem !important; }

        /* Reduce body font size for mobile */
        body { font-size: 0.95rem; }
      }

      @media (max-width: 480px) {
        .floating-actions { top: 78px; right: 10px; gap: 0.4rem !important; }
        .float-btn { padding: 0.4rem 0.5rem !important; }
        .float-btn .float-btn-icon-img { width: 22px !important; height: 22px !important; }
        .cert-badge-wrap { width: 100px !important; height: 100px !important; padding: 0.4rem !important; }

        section { padding-top: 3rem !important; padding-bottom: 3rem !important; padding-left: 0.9rem !important; padding-right: 0.9rem !important; }
        section#hero { padding: 0 !important; }

        .navbar-brand { font-size: 0.95rem !important; }
        .navbar-row { padding: 0 0.55rem !important; }
        .navbar-links { gap: 0.4rem !important; }
        .nav-link { font-size: 0.6rem !important; padding: 0.18rem 0.08rem !important; letter-spacing: 0.01em !important; }
      }

      /* Very small / squeezed widths - clamp brand and nav further */
      @media (max-width: 360px) {
        .navbar-brand { font-size: 0.85rem !important; }
        .navbar-row { padding: 0 0.4rem !important; }
        .navbar-links { gap: 0.28rem !important; }
        .nav-link { font-size: 0.55rem !important; padding: 0.15rem 0.05rem !important; }
      }
    `}</style>
  );
}

/* ═══════════════════════ MAIN APP ═══════════════════════ */
export default function Portfolio() {
  const [activeSkill, setActiveSkill] = useState(null);
  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <GlobalStyles />
      <Navbar />
      <Hero onSkill={setActiveSkill} />
      <About />
      <Skills onSkill={setActiveSkill} />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <Footer />
      <FloatingActions />
      {activeSkill && <SkillModal skill={activeSkill} onClose={() => setActiveSkill(null)} />}
    </div>
  );
}
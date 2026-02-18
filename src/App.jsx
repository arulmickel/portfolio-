import { useState, useEffect, useRef } from "react";
import {
  Mail, Phone, MapPin, Github, Linkedin, ExternalLink,
  ChevronDown, Menu, X, Send, Code2, Smartphone, Cloud,
  Terminal, Brain, Award, GraduationCap, Briefcase,
  ArrowUpRight, Layers, Database, Cpu, Globe
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
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];
  const scroll = (id) => {
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
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
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: scrolled ? 64 : 80, transition: "height 0.4s ease" }}>
        <span
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700, fontSize: "1.5rem", cursor: "pointer",
            color: scrolled ? sage[800] : "#fff",
            transition: "color 0.4s ease",
          }}
        >
          Arul Michael<span style={{ color: sage[400] }}>.</span>
        </span>
        {/* desktop */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="hidden md:flex">
          {links.map((l) => (
            <button key={l} onClick={() => scroll(l)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem",
                fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase",
                color: scrolled ? sage[700] : "rgba(255,255,255,0.85)",
                transition: "color 0.3s", padding: "0.25rem 0",
                borderBottom: "2px solid transparent",
              }}
              onMouseEnter={(e) => { e.target.style.color = sage[400]; e.target.style.borderBottomColor = sage[400]; }}
              onMouseLeave={(e) => { e.target.style.color = scrolled ? sage[700] : "rgba(255,255,255,0.85)"; e.target.style.borderBottomColor = "transparent"; }}
            >
              {l}
            </button>
          ))}
        </div>
        {/* mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer", color: scrolled ? sage[800] : "#fff" }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* mobile menu */}
      {open && (
        <div className="md:hidden" style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(20px)", padding: "1.5rem", borderTop: `1px solid ${sage[100]}` }}>
          {links.map((l, i) => (
            <button key={l} onClick={() => scroll(l)}
              style={{
                display: "block", width: "100%", textAlign: "left", padding: "0.75rem 1rem",
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Outfit', sans-serif", fontSize: "1rem", fontWeight: 500,
                color: sage[800],
                opacity: 0,
                animation: `fadeSlideIn 0.4s ease ${i * 0.06}s forwards`,
              }}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════ HERO ═══════════════════════ */
function Hero() {
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
      {/* geometric decorations */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 0.08 }}>
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 300, height: 300, borderRadius: "50%", border: "2px solid #fff" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "10%", width: 200, height: 200, border: "2px solid #fff", transform: "rotate(45deg)" }} />
        <div style={{ position: "absolute", top: "40%", right: "25%", width: 120, height: 120, borderRadius: "50%", border: "1px solid #fff" }} />
        <div style={{ position: "absolute", bottom: "30%", left: "20%", width: 80, height: 80, border: "1px solid #fff", transform: "rotate(30deg)" }} />
      </div>
      {/* floating particles */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: 6, height: 6, borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          top: `${15 + i * 14}%`, left: `${10 + i * 15}%`,
          animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate`,
          animationDelay: `${i * 0.3}s`,
        }} />
      ))}
      {/* content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 1.5rem", maxWidth: 900 }}>
        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.2s",
        }}>
          <div style={{
            display: "inline-block", padding: "0.4rem 1.5rem", borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.25)", marginBottom: "1.5rem",
            fontSize: "0.8rem", fontFamily: "'Outfit', sans-serif", fontWeight: 500,
            letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)",
            background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)",
          }}>
            Android Software Developer | AI/ML Integration & Assisted Development
          </div>
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 700,
          fontSize: "clamp(2.5rem, 8vw, 5rem)", lineHeight: 1.05,
          color: "#fff", margin: "0 0 1.5rem",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(40px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.4s",
        }}>
          Arul Michael Antony<br />
          <span style={{ color: sage[300] }}>Felix Raja</span>
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", lineHeight: 1.7,
          color: "rgba(255,255,255,0.75)", maxWidth: 620, margin: "0 auto 2.5rem",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.6s",
        }}>
          Android Software Developer with 3+ years of hands-on experience designing, 
          developing, and maintaining high-quality native Android applications in Kotlin 
          and Java. Proficient in AI/ML Integration & AI-assisted workflows.
        </p>
        <div style={{
          display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.8s",
        }}>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.9rem",
              padding: "0.9rem 2.2rem", borderRadius: 999, border: "none", cursor: "pointer",
              background: "#fff", color: sage[800],
              letterSpacing: "0.05em", textTransform: "uppercase",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
            }}
            onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 32px rgba(0,0,0,0.2)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 24px rgba(0,0,0,0.15)"; }}
          >
            Get in Touch
          </button>
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: "0.9rem",
              padding: "0.9rem 2.2rem", borderRadius: 999, cursor: "pointer",
              background: "rgba(255,255,255,0.1)", color: "#fff",
              border: "1px solid rgba(255,255,255,0.3)",
              letterSpacing: "0.05em", textTransform: "uppercase",
              backdropFilter: "blur(8px)", transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { e.target.style.background = "rgba(255,255,255,0.2)"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.target.style.background = "rgba(255,255,255,0.1)"; e.target.style.transform = "translateY(0)"; }}
          >
            View Projects
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
              I'm an Android Software Developer based in Chicago with a passion for building 
              high-quality native Android applications. With a Master's in Computer Science 
              (AI concentration) from DePaul University and 3+ years of hands-on experience, 
              I specialize in Kotlin, Java, Jetpack Compose, and Clean Architecture.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", lineHeight: 1.8, color: sage[700], marginBottom: "2rem" }}>
              What sets me apart is my experience with AI/ML Integration & AI-assisted development workflows, 
              leveraging tools like Windsurf AI to accelerate development while rigorously 
              validating AI-generated code for correctness, security, and performance. I'm 
              driven by creating apps that are reliable, performant, and genuinely useful.
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
    icon: <Smartphone size={28} />, title: "Android Development",
    items: ["Kotlin", "Java", "Android SDK", "Jetpack Compose", "XML Layouts", "MVVM", "MVC", "Clean Architecture", "ViewModel", "LiveData", "Coroutines", "Flow", "Room", "WorkManager", "Retrofit", "OkHttp", "Firebase", "FCM", "Google Play Services", "Material Design", "Play Store Publishing"],
  },
  {
    icon: <Brain size={28} />, title: "AI-Assisted Development",
    items: ["Windsurf AI", "Cursor", "Claude with Moltbot",  "AI Code Generation", "AI Code Refactoring", "AI Code Review & Validation", "Prompt Engineering"],
  },
  {
    icon: <Code2 size={28} />, title: "Testing & Debugging",
    items: ["JUnit", "Espresso", "Android Profiler", "LeakCanary", "Logcat", "Crashlytics", "UI Testing", "Unit Testing"],
  },
  {
    icon: <Cloud size={28} />, title: "Backend & APIs",
    items: ["REST APIs", "JSON", "Spring Boot", "Flask", "MongoDB", "AWS EC2", "S3", "Lambda", "DynamoDB", "CloudWatch", "Secure Data Storage"],
  },
  {
    icon: <Terminal size={28} />, title: "DevOps & Tools",
    items: ["Git", "GitHub Actions", "Jenkins", "Docker", "Postman", "Linux", "Bash", "CI/CD Pipelines"],
  },
  {
    icon: <Layers size={28} />, title: "Methodologies & Languages",
    items: ["Agile/Scrum", "Code Reviews", "Secure Coding", "Mobile App Security", "Kotlin", "Java", "Python", "SQL", "JavaScript", "C++"],
  },
];

function Skills() {
  const [ref, vis] = useReveal();
  return (
    <section id="skills" style={{ padding: "7rem 1.5rem", background: sage[50] }}>
      <div ref={ref} style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle label="Expertise" title="Technical Skills" />
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
                  <span key={j} style={{
                    padding: "0.3rem 0.7rem", borderRadius: 999, fontSize: "0.78rem",
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                    background: sage[50], color: sage[700], border: `1px solid ${sage[200]}`,
                  }}>
                    {s}
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

/* ═══════════════════════ EXPERIENCE ═══════════════════════ */
const experienceData = [
  {
    role: "Android Developer",
    company: "Digital Factory",
    location: "Chicago, IL",
    period: "Sep 2025 - Present",
    bullets: [
      "Adopted AI-assisted development workflows using Windsurf AI to accelerate feature development, refactoring, and bug resolution—rigorously validating all AI-generated code, reducing code review turnaround by 30%.",
      "Designed and built an offline-first geofencing sync system using Room and WorkManager in Kotlin, solving complex state synchronization across Web, API, and Android for 100% data consistency.",
      "Led migration of legacy XML-based UI flows to Jetpack Compose with Kotlin Coroutines, implementing safe retry policies and exponential backoff that reduced network-related crashes by 15%.",
      "Managed end-to-end Google Play Store publishing including release management, version updates, crash monitoring via Crashlytics, and Android 13/14/15 compliance.",
      "Revamped AWS SNS-to-FCM notification infrastructure, optimizing runtime permission flows that increased user opt-in rates by 20%.",
      "Established CI/CD pipelines using GitHub Actions with JUnit tests and lint checks, reducing regression bugs in an Agile/Scrum environment.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Tata Consultancy Services",
    location: "India",
    period: "May 2022 – Jul 2023",
    bullets: [
      "Refactored Java/Spring Boot REST APIs consumed by Android and web clients, optimizing database queries to improve response times by 25% and support higher concurrency.",
      "Developed end-to-end test automation suites integrated with Jenkins CI pipelines, cutting manual QA regression cycles by 40%.",
      "Implemented AWS CloudWatch alerting and dashboards to proactively identify API downtime, improving system availability benchmarks.",
    ],
  },
  {
    role: "Junior Android Developer",
    company: "HumCen",
    location: "India",
    period: "Jan 2021 – Dec 2021",
    bullets: [
      "Built key UI flows for a customer-facing IP rights platform using Kotlin, Java, and XML layouts with MVVM architecture for patent tracking and request submissions.",
      "Diagnosed and resolved critical UI rendering bugs, JSON parsing errors, and memory leaks using Android Profiler, improving app stability on lower-end devices.",
      "Integrated secure RESTful APIs with proper error handling, retry logic, and secure local data storage.",
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
                    <span style={{
                      fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", fontWeight: 600,
                      padding: "0.35rem 1rem", borderRadius: 999,
                      background: sage[100], color: sage[700],
                    }}>
                      {exp.period}
                    </span>
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
    title: "BorBuddy",
    subtitle: "Social Media App",
    tech: ["Kotlin", "Jetpack Compose", "MVVM", "Room", "WorkManager", "Windsurf AI"],
    desc: "Full-featured social network app with real-time feeds, secure authentication, and offline-first architecture. Leveraged Windsurf AI for rapid prototyping and refactoring.",
    icon: <Layers size={24} />,
    link: "https://github.com/arulmickel/BorBuddy-app",
  },
  {
    title: "Parking Finder",
    subtitle: "Location & Maps App",
    tech: ["Kotlin", "Google Play Services", "Room", "Retrofit", "Espresso"],
    desc: "Geolocation-powered parking finder with offline caching, retry/backoff strategies, Material Design, and accessibility standards validated with Espresso UI tests.",
    icon: <MapPin size={24} />,
    link: "https://github.com/arulmickel/Parking-Finder-app",
  },
  {
    title: "React Native Banking UI",
    subtitle: "Cross-Platform Banking App",
    tech: ["React Native", "JavaScript", "REST APIs", "Accessibility", "Section 508"],
    desc: "Multi-screen banking front-end with reusable components, mock REST API layer, unit tests, and Section 508/WCAG accessibility compliance.",
    icon: <Database size={24} />,
    link: "https://github.com/arulmickel/React-Native-Banking-UI",
  },
  {
    title: "DermAI",
    subtitle: "Skin Lesion Classifier",
    tech: ["Python", "PyTorch", "ResNet18", "Transfer Learning", "CNN"],
    desc: "Multi-class image classification pipeline classifying 7 skin lesion categories from ISIC 2018 dataset with leakage-aware splitting and F1/AUC evaluation.",
    icon: <Brain size={24} />,
    link: "https://github.com/arulmickel/DermAI-ISIC2018-Skin-Lesion-Classifier",
  },
  {
    title: "Deepfake Classifier",
    subtitle: "Vision / Neural Networks",
    tech: ["Deep Learning", "Image Processing", "Grad-CAM", "Vision Transformers"],
    desc: "Image classification pipeline to detect AI-generated deepfake images using deep learning with Grad-CAM interpretability techniques.",
    icon: <Cpu size={24} />,
    link: "https://github.com/arulmickel/deepfakedetect-vit",
  },
  {
    title: "AI Code Generator",
    subtitle: "Screenshot to HTML/CSS/JS",
    tech: ["Python", "OpenCV", "YOLOv8", "Flask", "Docker"],
    desc: "Web-based system generating HTML/CSS/JS from UI screenshots using YOLOv8 + LLM workflow with real-time preview, Dockerized for deployment.",
    icon: <Code2 size={24} />,
    link: "https://github.com/arulmickel/vision-to-code",
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
                M.S. Computer Science (AI Concentration)
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: sage[600], marginBottom: "0.75rem" }}>
                DePaul University, Chicago — Nov 2025
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", lineHeight: 1.7, color: sage[700] }}>
                <strong>Relevant Coursework:</strong> Data Structures & Algorithms, Database Management Systems, 
                Discrete Structures, Distributed Systems, Object-Oriented Development, Programming Language Concepts, 
                AI, Computer Vision, Neural Networks
              </p>
            </div>
          </div>
          {/* Certificate card */}
          <div style={{
            background: sage[50], borderRadius: 16, padding: "2rem",
            border: `1px solid ${sage[100]}`,
            display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap",
          }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: sage[200], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Award size={32} color={sage[700]} />
            </div>
            <div>
              <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: sage[900] }}>
                Meta Android Developer Professional Certificate
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: sage[600] }}>
                Industry-recognized certification in Android development
              </p>
            </div>
          </div>
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
              { title: "Google Developer Group", period: "2017–2018", desc: "Android Study Jams — Completed Kotlin bootcamps and app development challenges" },
              { title: "DePaul CS Society", period: "2023–2025", desc: "Led Android dev workshops, mentored undergrads on mobile projects" },
              { title: "IEEE Computer Society", period: "2017–2020", desc: "Design Head Coordinator — Led 15 members, organized 10+ tech workshops, 30% engagement increase" },
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
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", lineHeight: 1.7, color: sage[700], marginBottom: "2rem" }}>
              Interested in working together? I'm always open to discussing new opportunities, 
              projects, or ideas in Android development, AI/ML Integration & AI-assisted workflows.
            </p>
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
        Arul Michael<span style={{ color: sage[400] }}>.</span>
      </span>
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem",
        color: "rgba(255,255,255,0.5)", marginTop: "0.75rem",
      }}>
        © {new Date().getFullYear()} Arul Michael Antony Felix Raja. Crafted with passion.
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
      body { font-family: 'DM Sans', sans-serif; }
      
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
      
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: ${sage[50]}; }
      ::-webkit-scrollbar-thumb { background: ${sage[300]}; border-radius: 999px; }
      ::-webkit-scrollbar-thumb:hover { background: ${sage[400]}; }
      
      ::selection { background: ${sage[200]}; color: ${sage[900]}; }
    `}</style>
  );
}

/* ═══════════════════════ MAIN APP ═══════════════════════ */
export default function Portfolio() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      <GlobalStyles />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}
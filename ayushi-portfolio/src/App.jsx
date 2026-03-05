import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#080808",
  surface: "#0f0f0f",
  border: "#1a1a1a",
  borderBright: "#2a2a2a",
  amber: "#f5a623",
  amberDim: "#c47d10",
  white: "#f0ede8",
  muted: "#555",
  mutedBright: "#888",
  green: "#4ade80",
  blue: "#60a5fa",
  red: "#f87171",
};

const SKILLS = [
  { name: "JavaScript", level: 92, color: "#f5a623" },
  { name: "TypeScript", level: 85, color: "#60a5fa" },
  { name: "React / Next.js", level: 88, color: "#4ade80" },
  { name: "Node.js", level: 80, color: "#a78bfa" },
  { name: "AWS", level: 72, color: "#fb923c" },
  { name: "Docker / K8s", level: 68, color: "#34d399" },
  { name: "AI Integration", level: 75, color: "#f472b6" },
  { name: "PostgreSQL", level: 78, color: "#93c5fd" },
];

const PROJECTS = [
  {
    id: "01",
    title: "AI Chat Platform",
    desc: "Full-stack real-time chat with OpenAI streaming, RAG pipeline, and vector search over custom knowledge bases.",
    stack: ["Next.js", "OpenAI", "Pinecone", "PostgreSQL"],
    color: "#f5a623",
    year: "2024",
  },
  {
    id: "02",
    title: "DevOps Dashboard",
    desc: "Kubernetes cluster monitoring with live metrics, pod management, and GitHub Actions CI/CD visualization.",
    stack: ["React", "AWS EKS", "Grafana", "TypeScript"],
    color: "#60a5fa",
    year: "2024",
  },
  {
    id: "03",
    title: "E-Commerce Engine",
    desc: "Headless commerce platform with dynamic pricing, inventory sync, and Stripe payment orchestration.",
    stack: ["Next.js", "Prisma", "Stripe", "Redis"],
    color: "#4ade80",
    year: "2023",
  },
  {
    id: "04",
    title: "Analytics SaaS",
    desc: "Multi-tenant analytics platform processing 10M+ events/day with real-time dashboards and anomaly detection.",
    stack: ["TypeScript", "Kafka", "ClickHouse", "React"],
    color: "#f472b6",
    year: "2023",
  },
];

const NAV_ITEMS = ["Work", "Skills", "About", "Contact"];

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useScrollReveal();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / 50;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 20);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function SkillBar({ skill, index }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: 12, color: COLORS.mutedBright, letterSpacing: 2, textTransform: "uppercase" }}>
          {skill.name}
        </span>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: skill.color }}>
          {skill.level}%
        </span>
      </div>
      <div style={{ height: 2, background: COLORS.border, position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          background: skill.color,
          width: visible ? `${skill.level}%` : "0%",
          transition: `width 0.8s cubic-bezier(0.4,0,0.2,1) ${index * 80}ms`,
          boxShadow: `0 0 12px ${skill.color}80`,
        }} />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [ref, visible] = useScrollReveal();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: `1px solid ${hovered ? project.color : COLORS.border}`,
        borderLeft: `1px solid ${hovered ? project.color + "40" : "transparent"}`,
        padding: "28px 24px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        background: hovered ? `${project.color}06` : "transparent",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${index * 100}ms`,
        transitionProperty: "opacity, transform, border-color, background",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow on hover */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: hovered ? `linear-gradient(90deg, ${project.color}, transparent)` : "transparent",
        transition: "background 0.3s",
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <span style={{
          fontFamily: "'Courier New', monospace", fontSize: 11,
          color: project.color, letterSpacing: 3,
        }}>
          {project.id}
        </span>
        <span style={{
          fontFamily: "'Courier New', monospace", fontSize: 10,
          color: COLORS.muted, letterSpacing: 2,
        }}>
          {project.year}
        </span>
      </div>

      <h3 style={{
        fontSize: 22, fontFamily: "'Georgia', serif",
        color: hovered ? COLORS.white : COLORS.white,
        margin: "0 0 10px", fontWeight: 400, letterSpacing: -0.5,
        transition: "color 0.2s",
      }}>
        {project.title}
      </h3>

      <p style={{
        fontSize: 13, color: COLORS.mutedBright,
        lineHeight: 1.7, margin: "0 0 16px",
        fontFamily: "Georgia, serif",
      }}>
        {project.desc}
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {project.stack.map(s => (
          <span key={s} style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 10, letterSpacing: 1.5,
            color: project.color,
            padding: "3px 8px",
            border: `1px solid ${project.color}40`,
            background: `${project.color}10`,
          }}>
            {s}
          </span>
        ))}
      </div>

      <div style={{
        position: "absolute", bottom: 24, right: 24,
        width: 28, height: 28,
        border: `1px solid ${hovered ? project.color : COLORS.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s",
        transform: hovered ? "rotate(45deg)" : "rotate(0)",
        color: hovered ? project.color : COLORS.muted,
        fontSize: 14,
      }}>
        ↗
      </div>
    </div>
  );
}

function Marquee() {
  const items = ["JavaScript", "TypeScript", "React", "Next.js", "AWS", "Docker", "Kubernetes", "Node.js", "PostgreSQL", "AI Integration", "CI/CD", "Terraform"];
  const doubled = [...items, ...items];
  return (
    <div style={{
      overflow: "hidden", borderTop: `1px solid ${COLORS.border}`,
      borderBottom: `1px solid ${COLORS.border}`,
      padding: "14px 0", background: COLORS.surface,
    }}>
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
      `}</style>
      <div style={{
        display: "flex", gap: 48, whiteSpace: "nowrap",
        animation: "marquee 20s linear infinite",
        width: "max-content",
      }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
            color: i % 3 === 0 ? COLORS.amber : COLORS.muted,
          }}>
            {item}
            <span style={{ marginLeft: 48, color: COLORS.border }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function CursorDot() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const move = e => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  useEffect(() => {
    let raf;
    const update = () => {
      setTrail(t => ({ x: t.x + (pos.x - t.x) * 0.12, y: t.y + (pos.y - t.y) * 0.12 }));
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [pos]);
  return (
    <>
      <div style={{
        position: "fixed", pointerEvents: "none", zIndex: 9999,
        left: pos.x - 4, top: pos.y - 4,
        width: 8, height: 8,
        background: COLORS.amber,
        borderRadius: "50%",
        transition: "transform 0.1s",
      }} />
      <div style={{
        position: "fixed", pointerEvents: "none", zIndex: 9998,
        left: trail.x - 18, top: trail.y - 18,
        width: 36, height: 36,
        border: `1px solid ${COLORS.amber}60`,
        borderRadius: "50%",
      }} />
    </>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("Work");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [terminalText, setTerminalText] = useState("");

  const fullText = "Full-Stack Developer & Cloud Engineer";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i <= fullText.length) { setTerminalText(fullText.slice(0, i)); i++; }
      else clearInterval(t);
    }, 40);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{
      background: COLORS.bg, color: COLORS.white, minHeight: "100vh",
      fontFamily: "Georgia, serif",
      cursor: "none",
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #f5a623; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scanline {
          0% { transform: translateY(-100%) }
          100% { transform: translateY(100vh) }
        }
        @keyframes glitch1 {
          0%,95%,100%{transform:translate(0)}
          96%{transform:translate(-3px,1px)}
          97%{transform:translate(3px,-1px)}
          98%{transform:translate(-1px,2px)}
          99%{transform:translate(1px,-2px)}
        }
        @keyframes float {
          0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)}
        }
        .nav-link:hover { color: #f5a623 !important; }
        .btn-primary:hover { background: #f5a623 !important; color: #080808 !important; }
        .project-link:hover { color: #f5a623 !important; }
      `}</style>

      <CursorDot />

      {/* Scanline effect */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        pointerEvents: "none", zIndex: 1,
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
      }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 40px",
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(8,8,8,0.95)" : "transparent",
        borderBottom: scrolled ? `1px solid ${COLORS.border}` : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            border: `1.5px solid ${COLORS.amber}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: COLORS.amber, fontFamily: "'Courier New', monospace", fontSize: 12, fontWeight: 700 }}>
              YN
            </span>
          </div>
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: COLORS.muted, letterSpacing: 3 }}>
            YOUR NAME
          </span>
        </div>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item}
              className="nav-link"
              onClick={() => scrollTo(item.toLowerCase())}
              style={{
                background: "none", border: "none", cursor: "none",
                fontFamily: "'Courier New', monospace", fontSize: 11,
                letterSpacing: 2, textTransform: "uppercase",
                color: activeNav === item ? COLORS.amber : COLORS.mutedBright,
                padding: "4px 0",
                borderBottom: activeNav === item ? `1px solid ${COLORS.amber}` : "1px solid transparent",
                transition: "color 0.2s",
              }}
            >
              {item}
            </button>
          ))}
          <button
            className="btn-primary"
            style={{
              background: "transparent", border: `1px solid ${COLORS.amber}`,
              color: COLORS.amber, padding: "8px 20px",
              fontFamily: "'Courier New', monospace", fontSize: 10,
              letterSpacing: 2, cursor: "none",
              transition: "all 0.2s",
            }}
          >
            HIRE ME
          </button>
        </div>
      </nav>

      {/* ═══════════ HERO ═══════════ */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 40px 80px", position: "relative", overflow: "hidden" }}>

        {/* Background grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(${COLORS.border} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.border} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: 0.4,
        }} />

        {/* Big ambient glow */}
        <div style={{
          position: "absolute", top: "20%", right: "10%",
          width: 500, height: 500,
          background: `radial-gradient(circle, ${COLORS.amber}12 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", maxWidth: 960, margin: "0 auto", width: "100%" }}>

          {/* Status pill */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: `1px solid ${COLORS.border}`, padding: "6px 14px",
            marginBottom: 40,
            animation: "fadeUp 0.6s ease both",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.green, boxShadow: `0 0 8px ${COLORS.green}` }} />
            <span style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: COLORS.mutedBright, letterSpacing: 2 }}>
              AVAILABLE FOR HIRE — 2025
            </span>
          </div>

          {/* Main heading with glitch */}
          <div style={{ marginBottom: 24, animation: "fadeUp 0.6s ease 0.1s both" }}>
            <h1 style={{
              fontSize: "clamp(52px, 8vw, 96px)",
              fontWeight: 400, lineHeight: 1.0,
              letterSpacing: -3,
              color: COLORS.white,
              animation: "glitch1 8s infinite",
            }}>
              Building
            </h1>
            <h1 style={{
              fontSize: "clamp(52px, 8vw, 96px)",
              fontWeight: 400, lineHeight: 1.0,
              letterSpacing: -3,
              color: "transparent",
              WebkitTextStroke: `1px ${COLORS.amber}`,
            }}>
              Digital Things
            </h1>
            <h1 style={{
              fontSize: "clamp(52px, 8vw, 96px)",
              fontWeight: 400, lineHeight: 1.0,
              letterSpacing: -3,
              color: COLORS.white,
            }}>
              That Matter.
            </h1>
          </div>

          {/* Terminal typed text */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            marginBottom: 40,
            animation: "fadeUp 0.6s ease 0.2s both",
          }}>
            <span style={{ color: COLORS.amber, fontFamily: "'Courier New', monospace", fontSize: 13 }}>~/dev $</span>
            <span style={{ fontFamily: "'Courier New', monospace", fontSize: 13, color: COLORS.mutedBright }}>
              {terminalText}
              <span style={{ animation: "blink 1s infinite", color: COLORS.amber }}>█</span>
            </span>
          </div>

          {/* CTAs */}
          <div style={{
            display: "flex", gap: 16, alignItems: "center",
            animation: "fadeUp 0.6s ease 0.3s both",
          }}>
            <button
              onClick={() => scrollTo("work")}
              style={{
                background: COLORS.amber, color: COLORS.bg,
                border: "none", padding: "14px 32px",
                fontFamily: "'Courier New', monospace", fontSize: 11,
                letterSpacing: 2, cursor: "none",
                fontWeight: 700,
                transition: "all 0.2s",
              }}
            >
              VIEW WORK →
            </button>
            <button
              onClick={() => scrollTo("contact")}
              style={{
                background: "transparent", color: COLORS.white,
                border: `1px solid ${COLORS.borderBright}`, padding: "14px 32px",
                fontFamily: "'Courier New', monospace", fontSize: 11,
                letterSpacing: 2, cursor: "none",
                transition: "all 0.2s",
              }}
            >
              GET IN TOUCH
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div style={{
          position: "absolute", bottom: 60, right: 40,
          display: "flex", gap: 48,
          animation: "fadeUp 0.6s ease 0.5s both",
        }}>
          {[
            { label: "Projects Built", val: 20, suffix: "+" },
            { label: "Years Coding", val: 4, suffix: "+" },
            { label: "Happy Clients", val: 12, suffix: "" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "right" }}>
              <div style={{ fontSize: 32, fontWeight: 300, color: COLORS.amber, letterSpacing: -1, lineHeight: 1 }}>
                <AnimatedCounter target={s.val} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: COLORS.muted, letterSpacing: 2, marginTop: 4 }}>
                {s.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          animation: "float 2s ease infinite",
        }}>
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: COLORS.muted, letterSpacing: 2 }}>SCROLL</span>
          <div style={{ width: 1, height: 40, background: `linear-gradient(${COLORS.amber}, transparent)` }} />
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee />

      {/* ═══════════ WORK ═══════════ */}
      <section id="work" style={{ padding: "100px 40px", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60 }}>
          <div>
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: COLORS.amber, letterSpacing: 3, marginBottom: 12 }}>
              02 / SELECTED WORK
            </div>
            <h2 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 400, letterSpacing: -2, lineHeight: 1 }}>
              Recent<br />
              <span style={{ color: "transparent", WebkitTextStroke: `1px ${COLORS.mutedBright}` }}>Projects</span>
            </h2>
          </div>
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: COLORS.muted, letterSpacing: 2 }}>
            {PROJECTS.length} PROJECTS
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: `1px solid ${COLORS.border}` }}>
          {PROJECTS.map((p, i) => (
            <div key={p.id} style={{ borderRight: i % 2 === 0 ? `1px solid ${COLORS.border}` : "none" }}>
              <ProjectCard project={p} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ SKILLS ═══════════ */}
      <section id="skills" style={{ padding: "100px 40px", background: COLORS.surface, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>

            {/* Left: skill bars */}
            <div>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: COLORS.amber, letterSpacing: 3, marginBottom: 12 }}>
                03 / TECHNICAL SKILLS
              </div>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400, letterSpacing: -2, marginBottom: 40, lineHeight: 1.1 }}>
                Stack &<br />Expertise
              </h2>
              {SKILLS.map((s, i) => <SkillBar key={s.name} skill={s} index={i} />)}
            </div>

            {/* Right: about blurb */}
            <div style={{ paddingTop: 60 }}>
              <div style={{
                border: `1px solid ${COLORS.border}`,
                padding: 32, marginBottom: 24,
                position: "relative",
              }}>
                <div style={{
                  position: "absolute", top: -1, left: 24, right: 24, height: 1,
                  background: `linear-gradient(90deg, ${COLORS.amber}, transparent)`,
                }} />
                <p style={{ fontSize: 14, lineHeight: 1.8, color: COLORS.mutedBright }}>
                  I craft fast, scalable, cloud-native applications — from pixel-perfect
                  frontends to battle-hardened backend systems. Currently on a 4-month
                  sprint mastering the full modern stack.
                </p>
              </div>

              {/* Tech categories */}
              {[
                { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
                { label: "Backend", items: ["Node.js", "PostgreSQL", "Redis", "Prisma"] },
                { label: "DevOps", items: ["AWS", "Docker", "Kubernetes", "Terraform"] },
                { label: "AI/ML", items: ["OpenAI", "LangChain", "RAG", "Pinecone"] },
              ].map(cat => (
                <div key={cat.label} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 16 }}>
                  <span style={{
                    fontFamily: "'Courier New', monospace", fontSize: 9,
                    color: COLORS.amber, letterSpacing: 2, minWidth: 72,
                    paddingTop: 3,
                  }}>
                    {cat.label.toUpperCase()}
                  </span>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {cat.items.map(item => (
                      <span key={item} style={{
                        fontFamily: "'Courier New', monospace", fontSize: 10,
                        color: COLORS.mutedBright, padding: "2px 8px",
                        border: `1px solid ${COLORS.border}`,
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ ABOUT ═══════════ */}
      <section id="about" style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: COLORS.amber, letterSpacing: 3, marginBottom: 12 }}>
            04 / ABOUT
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80 }}>
            {/* Avatar placeholder */}
            <div>
              <div style={{
                aspectRatio: "3/4", background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", overflow: "hidden",
                maxWidth: 300,
              }}>
                {/* Abstract avatar */}
                <div style={{
                  width: 120, height: 120, borderRadius: "50%",
                  background: `conic-gradient(${COLORS.amber}, ${COLORS.blue}, ${COLORS.green}, ${COLORS.amber})`,
                  animation: "float 3s ease infinite",
                  filter: "blur(0px)",
                }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: `radial-gradient(circle at center, transparent 30%, ${COLORS.surface} 80%)`,
                }} />
                <div style={{
                  position: "absolute", bottom: 20, left: 20,
                  fontFamily: "'Courier New', monospace", fontSize: 10,
                  color: COLORS.muted, letterSpacing: 2,
                }}>
                  YOUR NAME.jpg
                </div>
              </div>
            </div>

            {/* Text */}
            <div style={{ paddingTop: 8 }}>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, letterSpacing: -2, marginBottom: 24, lineHeight: 1.1 }}>
                Developer.<br />
                Builder.<br />
                <span style={{ color: COLORS.amber }}>Problem Solver.</span>
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.9, color: COLORS.mutedBright, marginBottom: 20 }}>
                A self-taught full-stack developer on an ambitious 4-month sprint — mastering
                JavaScript, TypeScript, Next.js, AWS, Docker, Kubernetes, and AI integration —
                all while working full-time. I believe in building real things to learn real skills.
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.9, color: COLORS.mutedBright, marginBottom: 32 }}>
                Every evening from 9–11pm and every morning from 6:30–8am, I'm shipping code,
                studying systems, and closing the gap between where I am and where I'm going.
              </p>

              {/* Journey timeline */}
              {[
                { year: "2025", event: "AWS Solutions Architect Certified" },
                { year: "2024", event: "AI Integration + LangChain Projects" },
                { year: "2024", event: "Docker, Kubernetes & DevOps deep dive" },
                { year: "2023", event: "TypeScript + Next.js full-stack builds" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 20, marginBottom: 12, alignItems: "center" }}>
                  <span style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: COLORS.amber, minWidth: 36 }}>
                    {item.year}
                  </span>
                  <div style={{ width: 1, height: 20, background: COLORS.border }} />
                  <span style={{ fontSize: 13, color: COLORS.mutedBright }}>{item.event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" style={{
        padding: "100px 40px",
        background: COLORS.surface,
        borderTop: `1px solid ${COLORS.border}`,
        position: "relative", overflow: "hidden",
      }}>
        {/* Big ambient */}
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: 600, height: 600,
          background: `radial-gradient(circle, ${COLORS.amber}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 960, margin: "0 auto", position: "relative" }}>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: COLORS.amber, letterSpacing: 3, marginBottom: 12 }}>
            05 / CONTACT
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 400, letterSpacing: -3, lineHeight: 1, marginBottom: 24 }}>
                Let's Build<br />
                <span style={{ color: "transparent", WebkitTextStroke: `1px ${COLORS.amber}` }}>Something</span><br />
                Together.
              </h2>
              <p style={{ fontSize: 13, color: COLORS.mutedBright, lineHeight: 1.8, marginBottom: 40 }}>
                Open to full-stack, cloud, or AI engineering roles. Remote preferred. Let's talk.
              </p>
              {[
                { label: "EMAIL", val: "hello@yourname.dev" },
                { label: "LINKEDIN", val: "/in/yourname" },
                { label: "GITHUB", val: "@yourname" },
              ].map(link => (
                <div key={link.label} style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16, padding: "12px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                  <span style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: COLORS.amber, letterSpacing: 2, minWidth: 70 }}>
                    {link.label}
                  </span>
                  <span style={{ fontSize: 13, color: COLORS.mutedBright }}>{link.val}</span>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <div style={{ border: `1px solid ${COLORS.border}`, padding: 32 }}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontFamily: "'Courier New', monospace", fontSize: 9, color: COLORS.muted, letterSpacing: 2, marginBottom: 8 }}>
                  NAME
                </label>
                <input
                  placeholder="John Doe"
                  style={{
                    width: "100%", background: COLORS.bg,
                    border: `1px solid ${COLORS.border}`, color: COLORS.white,
                    padding: "10px 14px", fontSize: 13, fontFamily: "Georgia, serif",
                    outline: "none", cursor: "text",
                  }}
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontFamily: "'Courier New', monospace", fontSize: 9, color: COLORS.muted, letterSpacing: 2, marginBottom: 8 }}>
                  EMAIL
                </label>
                <input
                  placeholder="john@company.com"
                  style={{
                    width: "100%", background: COLORS.bg,
                    border: `1px solid ${COLORS.border}`, color: COLORS.white,
                    padding: "10px 14px", fontSize: 13, fontFamily: "Georgia, serif",
                    outline: "none", cursor: "text",
                  }}
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontFamily: "'Courier New', monospace", fontSize: 9, color: COLORS.muted, letterSpacing: 2, marginBottom: 8 }}>
                  MESSAGE
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell me about the role or project..."
                  style={{
                    width: "100%", background: COLORS.bg,
                    border: `1px solid ${COLORS.border}`, color: COLORS.white,
                    padding: "10px 14px", fontSize: 13, fontFamily: "Georgia, serif",
                    outline: "none", resize: "vertical", cursor: "text",
                  }}
                />
              </div>
              <button
                className="btn-primary"
                style={{
                  width: "100%", background: "transparent",
                  border: `1px solid ${COLORS.amber}`, color: COLORS.amber,
                  padding: "14px", fontFamily: "'Courier New', monospace",
                  fontSize: 11, letterSpacing: 2, cursor: "none",
                  transition: "all 0.2s",
                }}
              >
                SEND MESSAGE →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "24px 40px",
        borderTop: `1px solid ${COLORS.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: COLORS.muted, letterSpacing: 2 }}>
          © 2025 YOUR NAME
        </span>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: COLORS.muted, letterSpacing: 2 }}>
          BUILT WITH REACT + LOVE
        </span>
        <div style={{ display: "flex", gap: 4 }}>
          {PHASE_COLS_DISPLAY.map((c, i) => (
            <div key={i} style={{ width: 20, height: 2, background: c }} />
          ))}
        </div>
      </footer>
    </div>
  );
}

// footer color bar
const PHASE_COLS_DISPLAY = [COLORS.amber, COLORS.blue, COLORS.green, "#8B5CF6", COLORS.red];
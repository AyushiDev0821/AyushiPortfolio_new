import { useState } from "react";

const DAILY_SCHEDULE = [
  { time: "5:30 AM", activity: "Wake Up", type: "life", icon: "🌅" },
  { time: "5:45 AM", activity: "Yoga / Stretching (45 min)", type: "yoga", icon: "🧘" },
  { time: "6:30 AM", activity: "Study Block 1 (1.5 hrs)", type: "study", icon: "📚" },
  { time: "8:00 AM", activity: "Get Ready + Breakfast", type: "life", icon: "🍳" },
  { time: "9:00 AM", activity: "Commute / Wind-up", type: "life", icon: "🚶" },
  { time: "10:30 AM", activity: "Office Job", type: "work", icon: "💼" },
  { time: "1:00 PM", activity: "Lunch Break — Review Notes (20 min)", type: "study", icon: "📝" },
  { time: "8:30 PM", activity: "Office ends", type: "work", icon: "🏁" },
  { time: "9:00 PM", activity: "Study Block 2 (2 hrs)", type: "study", icon: "💻" },
  { time: "11:00 PM", activity: "Wind down / Sleep prep", type: "life", icon: "🌙" },
  { time: "11:30 PM", activity: "Sleep", type: "life", icon: "😴" },
];

const PHASES = [
  {
    id: 1,
    title: "Phase 1",
    subtitle: "JavaScript Mastery",
    weeks: "Weeks 1–3",
    color: "#F59E0B",
    accent: "#FDE68A",
    icon: "⚡",
    days: [
      { day: 1, topic: "JS Basics: variables, types, operators", tasks: ["Read MDN JS Guide Ch.1–2", "Code: 10 variable/type exercises", "Watch: JS Crash Course (1hr)"] },
      { day: 2, topic: "Functions, scope, hoisting", tasks: ["Study: function declarations vs expressions", "Code: 5 function challenges", "Practice: closures basics"] },
      { day: 3, topic: "Arrays & Array methods", tasks: ["map, filter, reduce deep dive", "Code: 10 array manipulation problems", "Build: mini data transformer"] },
      { day: 4, topic: "Objects & Prototypes", tasks: ["Object literals, destructuring", "Prototype chain concept", "Code: OOP mini project"] },
      { day: 5, topic: "ES6+ Features", tasks: ["Arrow fns, template literals, spread", "Modules: import/export", "Code: refactor old code to ES6"] },
      { day: 6, topic: "Async JS: Promises", tasks: ["Promise chaining", "Promise.all / race", "Build: fake API fetcher with Promises"] },
      { day: 7, topic: "Review + Mini Project", tasks: ["Review Week 1 notes", "Build: Todo list (vanilla JS)", "Push to GitHub"] },
      { day: 8, topic: "Async/Await & Fetch API", tasks: ["async/await syntax", "Error handling with try/catch", "Fetch real API (OpenWeather or similar)"] },
      { day: 9, topic: "DOM Manipulation", tasks: ["querySelector, events, listeners", "Create/remove elements", "Build: Dynamic form UI"] },
      { day: 10, topic: "Error Handling & Debugging", tasks: ["try/catch/finally", "Custom error classes", "Chrome DevTools deep dive"] },
      { day: 11, topic: "JS Modules & Tooling", tasks: ["CommonJS vs ESModules", "Intro to npm / package.json", "Setup: ESLint + Prettier"] },
      { day: 12, topic: "Browser Storage & Events", tasks: ["localStorage, sessionStorage", "Custom events, bubbling", "Build: settings panel with persistence"] },
      { day: 13, topic: "Regular Expressions", tasks: ["Regex syntax crash course", "Common patterns: email, phone, URL", "Code: form validation with regex"] },
      { day: 14, topic: "Review + JS Project", tasks: ["Build: Weather App (Fetch + DOM)", "Review all Week 2 concepts", "Push to GitHub + write README"] },
      { day: 15, topic: "Advanced Patterns: Closures & Currying", tasks: ["Memoization pattern", "Currying deep dive", "Code: 5 functional programming exercises"] },
      { day: 16, topic: "OOP in JS: Classes", tasks: ["class, constructor, inheritance", "Public/private fields", "Build: Bank Account class"] },
      { day: 17, topic: "Iterators & Generators", tasks: ["Symbol.iterator", "Generator functions", "Build: custom range iterator"] },
      { day: 18, topic: "Event Loop & Concurrency", tasks: ["Call stack, task queue, microtasks", "Watch: Jake Archibald's Event Loop talk", "Code: async timing challenges"] },
      { day: 19, topic: "Working with APIs", tasks: ["REST principles", "Headers, auth tokens, CORS", "Build: GitHub profile viewer"] },
      { day: 20, topic: "Testing Basics (Jest)", tasks: ["Install Jest, write first test", "Unit tests for pure functions", "TDD: write tests then code"] },
      { day: 21, topic: "JS Capstone Project", tasks: ["Build: Quiz App with timer + API", "Full tests + error handling", "Deploy to Netlify/Vercel"] },
    ]
  },
  {
    id: 2,
    title: "Phase 2",
    subtitle: "TypeScript + Next.js",
    weeks: "Weeks 4–7",
    color: "#3B82F6",
    accent: "#BFDBFE",
    icon: "🔷",
    days: [
      { day: 22, topic: "TypeScript: Types & Interfaces", tasks: ["Install TS, tsconfig.json setup", "Primitive types, type aliases", "Interface vs type keyword"] },
      { day: 23, topic: "TypeScript: Generics", tasks: ["Generic functions & interfaces", "Constraints with extends", "Build: generic Stack<T> class"] },
      { day: 24, topic: "TypeScript: Advanced Types", tasks: ["Union, intersection, mapped types", "Utility types: Partial, Required, Pick", "Code: 5 type challenges"] },
      { day: 25, topic: "TypeScript: Classes & Decorators", tasks: ["Access modifiers (public/private/protected)", "Abstract classes", "Intro to decorators concept"] },
      { day: 26, topic: "TypeScript with DOM / React", tasks: ["Type React components & props", "Event types, refs", "Migrate a JS project to TS"] },
      { day: 27, topic: "TS Error Handling & Strict Mode", tasks: ["strictNullChecks", "Type guards, narrowing", "never type usage"] },
      { day: 28, topic: "TS Review + Small Project", tasks: ["Build: typed API client in TS", "Full strict mode, no 'any'", "Push to GitHub"] },
      { day: 29, topic: "Next.js: Intro & Pages Router", tasks: ["Create Next app (npx create-next-app)", "Pages, routing, Link component", "Build: multi-page site"] },
      { day: 30, topic: "Next.js: App Router (v13+)", tasks: ["app/ directory structure", "Server vs Client components", "Layouts & nested routes"] },
      { day: 31, topic: "Next.js: Data Fetching", tasks: ["fetch() in Server Components", "generateStaticParams, dynamic routes", "Build: blog with static pages"] },
      { day: 32, topic: "Next.js: API Routes", tasks: ["Route handlers in app/api/", "GET/POST handlers", "Build: form submission API"] },
      { day: 33, topic: "Next.js: Authentication", tasks: ["NextAuth.js setup", "Google/GitHub OAuth", "Protect routes with middleware"] },
      { day: 34, topic: "Next.js: Styling & Optimization", tasks: ["Tailwind CSS setup", "next/image, next/font", "Performance: Lighthouse audit"] },
      { day: 35, topic: "Next.js: Database Integration", tasks: ["Prisma ORM setup + PostgreSQL", "CRUD operations", "Build: notes app with DB"] },
      { day: 36, topic: "Review + Deploy Next App", tasks: ["Fix TS errors, add types everywhere", "Deploy to Vercel", "Add env variables"] },
      { day: 37, topic: "Full-Stack Next.js Project Start", tasks: ["Plan: Full-stack CRUD app (idea: job tracker)", "Setup DB schema", "Build: auth + dashboard layout"] },
      { day: 38, topic: "Full-Stack: CRUD Features", tasks: ["Create/Read items", "Update/Delete with API routes", "Form validation with Zod"] },
      { day: 39, topic: "Full-Stack: UI Polish", tasks: ["Responsive design", "Loading states, error boundaries", "Add toast notifications"] },
      { day: 40, topic: "Full-Stack: Testing", tasks: ["Jest + React Testing Library", "Test: API routes + components", "CI-ready test suite"] },
      { day: 41, topic: "Deploy & Portfolio Ready", tasks: ["Deploy final Next.js app to Vercel", "Write project README", "Add to portfolio page"] },
      { day: 42, topic: "Review Phase 2", tasks: ["Review TS + Next.js concepts", "Fix any gaps in understanding", "Update GitHub with all projects"] },
    ]
  },
  {
    id: 3,
    title: "Phase 3",
    subtitle: "AWS + Docker + Kubernetes",
    weeks: "Weeks 8–11",
    color: "#10B981",
    accent: "#A7F3D0",
    icon: "☁️",
    days: [
      { day: 43, topic: "AWS Basics: IAM + Console", tasks: ["Create free-tier AWS account", "IAM users, roles, policies", "AWS CLI setup"] },
      { day: 44, topic: "AWS EC2", tasks: ["Launch EC2 instance (t2.micro)", "SSH into server", "Deploy Node.js app on EC2"] },
      { day: 45, topic: "AWS S3", tasks: ["Create S3 bucket", "Upload/host static site", "Set bucket policies & CORS"] },
      { day: 46, topic: "AWS RDS + VPC", tasks: ["Launch RDS PostgreSQL instance", "VPC, subnets, security groups", "Connect app to RDS"] },
      { day: 47, topic: "AWS Lambda + API Gateway", tasks: ["Write first Lambda function", "Trigger with API Gateway", "Build: serverless REST endpoint"] },
      { day: 48, topic: "AWS CloudFront + Route53", tasks: ["CloudFront distribution for S3", "Route53 domain setup", "SSL with ACM"] },
      { day: 49, topic: "AWS Review", tasks: ["Review IAM, EC2, S3, RDS, Lambda", "Draw architecture diagram", "Cost optimization tips"] },
      { day: 50, topic: "Docker: Basics", tasks: ["Install Docker Desktop", "docker pull, run, ps, stop", "Understand images vs containers"] },
      { day: 51, topic: "Docker: Dockerfile", tasks: ["Write Dockerfile for Next.js app", "Build & tag image", "docker build -t myapp ."] },
      { day: 52, topic: "Docker: Networking & Volumes", tasks: ["docker-compose intro", "Networks between containers", "Persistent volumes"] },
      { day: 53, topic: "Docker Compose: Full Stack", tasks: ["Compose: app + DB + redis", "Environment variables in compose", "Build: local dev environment"] },
      { day: 54, topic: "Push to Docker Hub / ECR", tasks: ["Push image to Docker Hub", "Intro to AWS ECR", "Tag & push to ECR"] },
      { day: 55, topic: "Kubernetes: Concepts", tasks: ["Pods, nodes, clusters concept", "kubectl install + minikube", "Run first pod locally"] },
      { day: 56, topic: "Kubernetes: Deployments", tasks: ["Deployment YAML", "Replicas, rolling updates", "kubectl apply, get, describe"] },
      { day: 57, topic: "Kubernetes: Services & Ingress", tasks: ["ClusterIP, NodePort, LoadBalancer", "Ingress controller", "Expose app to internet"] },
      { day: 58, topic: "Kubernetes: ConfigMaps & Secrets", tasks: ["Manage env vars with ConfigMap", "Secrets for sensitive data", "Mount as volume or env"] },
      { day: 59, topic: "Kubernetes: AWS EKS", tasks: ["Create EKS cluster (eksctl)", "Deploy app to EKS", "ALB Ingress Controller"] },
      { day: 60, topic: "CI/CD: GitHub Actions", tasks: ["Write build + test workflow", "Deploy to AWS on push", "Docker build + push in CI"] },
      { day: 61, topic: "Monitoring: CloudWatch + Logs", tasks: ["CloudWatch metrics & alarms", "Container Insights for EKS", "Set up billing alerts"] },
      { day: 62, topic: "Infrastructure as Code: Terraform basics", tasks: ["Install Terraform", "Write first .tf file for EC2", "terraform init/plan/apply"] },
      { day: 63, topic: "Review Phase 3 + Deploy Project", tasks: ["Dockerize + deploy full-stack app to AWS", "Write architecture README", "Add to portfolio"] },
    ]
  },
  {
    id: 4,
    title: "Phase 4",
    subtitle: "AWS Cert + AI Integration",
    weeks: "Weeks 12–14",
    color: "#8B5CF6",
    accent: "#DDD6FE",
    icon: "🤖",
    days: [
      { day: 64, topic: "AWS SAA-C03: Study Plan", tasks: ["Download exam guide", "Enroll: Stephane Maarek course (Udemy)", "Study: EC2, ELB, Auto Scaling"] },
      { day: 65, topic: "AWS Cert: Storage", tasks: ["S3 storage classes, lifecycle", "EBS, EFS, FSx types", "Practice questions x20"] },
      { day: 66, topic: "AWS Cert: Databases", tasks: ["RDS Multi-AZ vs Read Replica", "DynamoDB, ElastiCache", "Practice questions x20"] },
      { day: 67, topic: "AWS Cert: Networking", tasks: ["VPC deep dive, peering", "Direct Connect, VPN, Transit Gateway", "Practice questions x20"] },
      { day: 68, topic: "AWS Cert: Security", tasks: ["KMS, Shield, WAF, GuardDuty", "Cognito, STS, IAM roles deep dive", "Practice questions x20"] },
      { day: 69, topic: "AWS Cert: Serverless & Containers", tasks: ["Lambda concurrency, layers", "ECS vs EKS vs Fargate", "Practice questions x20"] },
      { day: 70, topic: "AWS Cert: Mock Exam 1", tasks: ["65-question practice exam", "Review all wrong answers", "Mark weak areas"] },
      { day: 71, topic: "AI Integration: OpenAI API", tasks: ["Get API key, read docs", "Call chat completions endpoint", "Build: AI chatbot (Next.js + OpenAI)"] },
      { day: 72, topic: "AI: Prompt Engineering", tasks: ["System prompts, roles, few-shot", "Temperature, top_p params", "Build: prompt template system"] },
      { day: 73, topic: "AI: LangChain Basics", tasks: ["Install LangChain (Python or JS)", "Chains, prompts, memory", "Build: Q&A over a document"] },
      { day: 74, topic: "AI: RAG (Retrieval Augmented Generation)", tasks: ["Embeddings concept", "Vector DB: Pinecone or Supabase pgvector", "Build: search your own notes with AI"] },
      { day: 75, topic: "AI: Image Generation", tasks: ["Stable Diffusion / DALL-E API", "Build: AI image generator UI", "Add to portfolio project"] },
      { day: 76, topic: "AI: Streaming Responses", tasks: ["Stream tokens from OpenAI API", "Build: real-time AI chat UI", "SSE vs WebSocket approach"] },
      { day: 77, topic: "AI: Deploy AI App to AWS", tasks: ["Dockerize AI app", "Deploy to ECS Fargate", "Secure API keys with AWS Secrets Manager"] },
      { day: 78, topic: "AWS Cert: Mock Exam 2", tasks: ["65-question practice exam", "Score target: 80%+", "Review all mistakes in depth"] },
      { day: 79, topic: "AWS Cert: Final Cram", tasks: ["Read all AWS cheat sheets", "Watch 2hr rapid review video", "Re-do wrong questions"] },
      { day: 80, topic: "AWS Cert: EXAM DAY PREP", tasks: ["Schedule exam at Pearson Vue", "Light review, sleep early", "Good breakfast, you've got this 🎉"] },
    ]
  },
  {
    id: 5,
    title: "Phase 5",
    subtitle: "Portfolio + Job Hunt",
    weeks: "Weeks 15–17",
    color: "#EF4444",
    accent: "#FECACA",
    icon: "🚀",
    days: [
      { day: 81, topic: "Portfolio Site: Plan & Design", tasks: ["Wireframe 5 sections: hero, about, projects, skills, contact", "Choose design aesthetic", "Setup Next.js + Tailwind portfolio"] },
      { day: 82, topic: "Portfolio: Hero & About", tasks: ["Write compelling bio", "Animated hero section", "Add professional photo"] },
      { day: 83, topic: "Portfolio: Projects Section", tasks: ["Showcase 4 best projects with screenshots", "Tech stack tags", "Live demo + GitHub links"] },
      { day: 84, topic: "Portfolio: Skills & Timeline", tasks: ["Interactive skills section", "Learning journey timeline", "Add AWS cert badge when ready"] },
      { day: 85, topic: "Portfolio: Contact + Deploy", tasks: ["Contact form (EmailJS or Resend)", "Deploy to Vercel with custom domain", "SEO meta tags, Open Graph"] },
      { day: 86, topic: "Resume Writing", tasks: ["1-page resume: 3 sections (skills, experience, projects)", "Use action verbs + metrics", "ATS-friendly formatting"] },
      { day: 87, topic: "GitHub Profile Optimization", tasks: ["Write compelling GitHub README", "Pin 4 best repos", "Add contribution graph activity"] },
      { day: 88, topic: "LinkedIn Optimization", tasks: ["Update headline + summary", "Add all skills + projects", "Get 3 recommendations"] },
      { day: 89, topic: "Job Search: Target List", tasks: ["Research 20 target companies", "Filter: remote, hybrid, full-stack roles", "Track in spreadsheet"] },
      { day: 90, topic: "Job Applications: Batch 1", tasks: ["Apply to 5 jobs with tailored cover letters", "Connect with 10 engineers on LinkedIn", "Join: community Discords"] },
      { day: 91, topic: "Interview Prep: System Design", tasks: ["Study: URL shortener, chat app designs", "Learn: CAP theorem basics", "Practice explaining aloud"] },
      { day: 92, topic: "Interview Prep: DS&A", tasks: ["LeetCode: 5 easy problems", "Review: arrays, strings, hashmaps", "Time complexity basics"] },
      { day: 93, topic: "Interview Prep: Behavioral", tasks: ["Prep 10 STAR stories", "Practice: Tell me about yourself (2min)", "Mock interview with friend/AI"] },
      { day: 94, topic: "Job Applications: Batch 2", tasks: ["Apply to 10 more jobs", "Follow up on Batch 1", "Attend 1 virtual meetup/hackathon"] },
      { day: 95, topic: "Technical Interview Practice", tasks: ["Mock coding interview (Pramp/Interviewing.io)", "Build: feature in 45 minutes timed", "Review feedback"] },
      { day: 96, topic: "Open Source Contribution", tasks: ["Find a beginner-friendly issue on GitHub", "Submit a PR", "Add contribution to resume"] },
      { day: 97, topic: "Networking Sprint", tasks: ["Coffee chat with 2 engineers", "Post: LinkedIn article about learning journey", "Share portfolio publicly"] },
      { day: 98, topic: "Applications: Batch 3 + Follow-ups", tasks: ["Apply to 10 more jobs", "Cold email 5 hiring managers", "Track response rates"] },
      { day: 99, topic: "Final Polish Day", tasks: ["Update portfolio with any new projects", "Final resume review", "Prep for upcoming interviews"] },
      { day: 100, topic: "🎉 Day 100 — Reflect & Keep Going", tasks: ["Review: how far you've come", "Celebrate every win", "Keep applying — your job is coming!"] },
    ]
  }
];

const phaseForDay = (day) => PHASES.find(p => p.days.find(d => d.day === day));

export default function App() {
  const [activePhase, setActivePhase] = useState(1);
  const [selectedDay, setSelectedDay] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({});
  const [showSchedule, setShowSchedule] = useState(false);

  const phase = PHASES.find(p => p.id === activePhase);

  const toggleTask = (day, taskIdx) => {
    const key = `${day}-${taskIdx}`;
    setCompletedTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const dayCompleted = (day) => {
    const d = PHASES.flatMap(p => p.days).find(d => d.day === day);
    if (!d) return false;
    return d.tasks.every((_, i) => completedTasks[`${day}-${i}`]);
  };

  const totalCompleted = Object.values(completedTasks).filter(Boolean).length;
  const totalTasks = PHASES.flatMap(p => p.days).flatMap(d => d.tasks).length;

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#0A0A0F", minHeight: "100vh", color: "#E8E8F0" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 100%)", borderBottom: "1px solid #2A2A4A", padding: "24px 20px 0" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 8 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: "clamp(20px, 4vw, 28px)", fontWeight: 700, letterSpacing: "-0.5px", color: "#F0F0FF" }}>
                🗓️ 4-Month Dev Mastery Plan
              </h1>
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "#7878A8" }}>JS → TS → Next.js → AWS → Docker/K8s → AI → Job 🚀</p>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button
                onClick={() => setShowSchedule(!showSchedule)}
                style={{ background: showSchedule ? "#3B82F6" : "#1E1E3A", border: "1px solid #3B82F6", color: "#93C5FD", padding: "7px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontFamily: "monospace" }}
              >
                {showSchedule ? "📅 Hide Daily Time" : "📅 Daily Schedule"}
              </button>
              <div style={{ background: "#1E1E3A", border: "1px solid #2A2A4A", borderRadius: 10, padding: "6px 14px", fontSize: 12 }}>
                <span style={{ color: "#7878A8" }}>Tasks done: </span>
                <span style={{ color: "#10B981", fontWeight: 700 }}>{totalCompleted}/{totalTasks}</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 4, background: "#1E1E3A", borderRadius: 2, marginBottom: 0 }}>
            <div style={{ height: "100%", background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #10B981)", borderRadius: 2, width: `${(totalCompleted / totalTasks) * 100}%`, transition: "width 0.4s" }} />
          </div>

          {/* Phase tabs */}
          <div style={{ display: "flex", gap: 4, marginTop: 16, overflowX: "auto", paddingBottom: 0 }}>
            {PHASES.map(p => (
              <button
                key={p.id}
                onClick={() => { setActivePhase(p.id); setSelectedDay(null); }}
                style={{
                  background: activePhase === p.id ? p.color : "transparent",
                  color: activePhase === p.id ? "#000" : p.color,
                  border: `1px solid ${p.color}`,
                  borderBottom: activePhase === p.id ? `2px solid ${p.color}` : "1px solid " + p.color,
                  padding: "8px 14px",
                  borderRadius: "8px 8px 0 0",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                }}
              >
                {p.icon} {p.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px" }}>

        {/* Daily Schedule Modal */}
        {showSchedule && (
          <div style={{ background: "#0F0F1A", border: "1px solid #2A2A4A", borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <h3 style={{ margin: "0 0 16px", color: "#F0F0FF", fontSize: 15 }}>⏰ Your Daily Time Schedule</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
              {DAILY_SCHEDULE.map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8,
                  background: s.type === "study" ? "#0D1F2D" : s.type === "yoga" ? "#0D1A0D" : s.type === "work" ? "#1A1010" : "#12121E",
                  border: `1px solid ${s.type === "study" ? "#1E4A6A" : s.type === "yoga" ? "#1A3A1A" : s.type === "work" ? "#3A1A1A" : "#2A2A3A"}`
                }}>
                  <span style={{ fontSize: 18 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: "#5A5A8A", fontFamily: "monospace" }}>{s.time}</div>
                    <div style={{ fontSize: 13, color: "#D0D0E8" }}>{s.activity}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: "12px 16px", background: "#1A1A0D", border: "1px solid #3A3A10", borderRadius: 8 }}>
              <p style={{ margin: 0, fontSize: 12, color: "#A0A050", lineHeight: 1.7 }}>
                💡 <strong>Study breakdown:</strong> Block 1 (6:30–8:00am) = 1.5hrs deep learning | Lunch (1–1:20pm) = 20min review | Block 2 (9–11pm) = 2hrs coding practice = <strong>~3.5 hrs/day</strong> ✅<br />
                🧘 <strong>Yoga:</strong> 5:45–6:30am = 45 min daily | On weekends: extend to 1hr full session
              </p>
            </div>
          </div>
        )}

        {/* Phase Header */}
        <div style={{ background: `linear-gradient(135deg, ${phase.color}22, ${phase.color}08)`, border: `1px solid ${phase.color}44`, borderRadius: 12, padding: "16px 20px", marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 32 }}>{phase.icon}</span>
          <div>
            <h2 style={{ margin: 0, color: phase.color, fontSize: 20 }}>{phase.title}: {phase.subtitle}</h2>
            <p style={{ margin: "2px 0 0", color: "#7878A8", fontSize: 13 }}>{phase.weeks} · {phase.days.length} days · Click any day to expand tasks</p>
          </div>
        </div>

        {/* Days Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
          {phase.days.map(({ day, topic, tasks }) => {
            const isSelected = selectedDay === day;
            const done = dayCompleted(day);
            const completedCount = tasks.filter((_, i) => completedTasks[`${day}-${i}`]).length;
            return (
              <div key={day}>
                <div
                  onClick={() => setSelectedDay(isSelected ? null : day)}
                  style={{
                    background: done ? `${phase.color}18` : "#0F0F1A",
                    border: `1px solid ${isSelected ? phase.color : done ? phase.color + "60" : "#2A2A4A"}`,
                    borderRadius: isSelected ? "10px 10px 0 0" : 10,
                    padding: "12px 14px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{
                        background: done ? phase.color : "#1E1E3A",
                        color: done ? "#000" : phase.color,
                        borderRadius: 6, padding: "2px 8px", fontSize: 11, fontFamily: "monospace", fontWeight: 700
                      }}>Day {day}</span>
                      {done && <span style={{ fontSize: 14 }}>✅</span>}
                    </div>
                    <span style={{ color: "#5A5A8A", fontSize: 11 }}>{completedCount}/{tasks.length}</span>
                  </div>
                  <p style={{ margin: "8px 0 0", fontSize: 13, color: "#C8C8E8", lineHeight: 1.4 }}>{topic}</p>
                </div>
                {isSelected && (
                  <div style={{ background: "#0C0C18", border: `1px solid ${phase.color}`, borderTop: "none", borderRadius: "0 0 10px 10px", padding: "12px 14px" }}>
                    {tasks.map((task, i) => {
                      const key = `${day}-${i}`;
                      const checked = !!completedTasks[key];
                      return (
                        <div
                          key={i}
                          onClick={(e) => { e.stopPropagation(); toggleTask(day, i); }}
                          style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "7px 0", cursor: "pointer", borderBottom: i < tasks.length - 1 ? "1px solid #1A1A2A" : "none" }}
                        >
                          <div style={{
                            width: 18, height: 18, borderRadius: 4, border: `2px solid ${checked ? phase.color : "#3A3A5A"}`,
                            background: checked ? phase.color : "transparent", flexShrink: 0, marginTop: 1,
                            display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s"
                          }}>
                            {checked && <span style={{ color: "#000", fontSize: 11, lineHeight: 1 }}>✓</span>}
                          </div>
                          <span style={{ fontSize: 13, color: checked ? "#5A5A7A" : "#C0C0E0", textDecoration: checked ? "line-through" : "none", lineHeight: 1.5 }}>{task}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer tip */}
        <div style={{ marginTop: 24, padding: "16px 20px", background: "#0F0F1A", border: "1px solid #2A2A4A", borderRadius: 12 }}>
          <p style={{ margin: 0, fontSize: 12, color: "#5A5A8A", lineHeight: 1.8 }}>
            💪 <strong style={{ color: "#7878A8" }}>Weekend tip:</strong> Use Sat/Sun for project builds, review, and catching up on missed days. Don't skip yoga — it keeps your mind sharp for learning. Every day you show up compounds. 🔥
          </p>
        </div>
      </div>
    </div>
  );
}
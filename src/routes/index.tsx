import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Download, Github, Mail, ExternalLink, ArrowUp, MapPin, Send,
  Database, Brain, Code2, BarChart3, Sparkles, Zap, Users, Target,
  GraduationCap, Briefcase, FileText, Languages, Cpu, LineChart,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import PROFILE_IMG from "@/assets/DHARSHINISIMG.png";
import { ParticleBackground } from "@/components/Particles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dharshini S — Data Analytics & GenAI Portfolio" },
      { name: "description", content: "Computer Science Engineering student specializing in Data Analytics, Python, SQL, and Generative AI. Open to internships." },
      { property: "og:title", content: "Dharshini S — Data Analytics & GenAI Portfolio" },
      { property: "og:description", content: "CSE student | Data Analytics • Data Science • GenAI • Python" },
    ],
  }),
  component: Portfolio,
});

const GITHUB = "https://github.com/DHARSHINI1707";
const EMAIL = "dharshinibb90@gmail.com";
const RESUME_URL = "/resume.pdf"; // user will upload to public/resume.pdf
const INTRO_VIDEO = "/intro.mp4";

const ROLES = ["Data Analyst", "GenAI Enthusiast", "Python Developer", "AI Explorer", "Computer Science Engineering Student"];

/* ============ LOADER ============ */
function Loader({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 1600); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-primary/30 border-b-primary animate-spin" style={{ animationDirection: "reverse" }} />
          <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-accent" />
        </div>
        <div className="text-gradient text-2xl font-bold tracking-wider">DHARSHINI S</div>
        <div className="text-xs text-muted-foreground tracking-[0.3em]">LOADING PORTFOLIO</div>
      </div>
    </motion.div>
  );
}

/* ============ TYPING ============ */
function TypeWriter() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = ROLES[idx];
    const t = setTimeout(() => {
      if (!del) {
        setText(cur.slice(0, text.length + 1));
        if (text === cur) setTimeout(() => setDel(true), 1400);
      } else {
        setText(cur.slice(0, text.length - 1));
        if (text === "") { setDel(false); setIdx((idx + 1) % ROLES.length); }
      }
    }, del ? 40 : 90);
    return () => clearTimeout(t);
  }, [text, del, idx]);
  return <span className="text-gradient cursor-blink font-semibold">{text}</span>;
}

/* ============ NAV ============ */
const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "GitHub" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <motion.nav
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "glass-strong py-3" : "py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="font-display font-bold text-xl text-gradient">DHARSHINI.S</a>
        <ul className="hidden md:flex items-center gap-1">
          {NAV.map(n => (
            <li key={n.id}>
              <a href={`#${n.id}`} className="px-3 py-2 text-sm text-muted-foreground hover:text-accent transition-colors relative group">
                {n.label}
                <span className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-accent to-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            </li>
          ))}
        </ul>
        <Button asChild size="sm" className="hidden md:inline-flex bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 border-0">
          <a href={RESUME_URL} download><Download className="w-4 h-4 mr-2" />Resume</a>
        </Button>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="menu">
          <div className="w-6 h-0.5 bg-foreground mb-1.5" />
          <div className="w-6 h-0.5 bg-foreground mb-1.5" />
          <div className="w-4 h-0.5 bg-foreground" />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass-strong overflow-hidden mt-3 mx-4 rounded-2xl">
            {NAV.map(n => (
              <li key={n.id}><a onClick={() => setOpen(false)} href={`#${n.id}`} className="block px-6 py-3 hover:text-accent">{n.label}</a></li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ============ SECTION WRAPPER ============ */
function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.section
      ref={ref} id={id}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`relative max-w-7xl mx-auto px-6 py-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-14 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs tracking-[0.3em] text-accent mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />{kicker}
      </div>
      <h2 className="text-4xl md:text-5xl font-bold"><span className="text-gradient">{title}</span></h2>
    </div>
  );
}

/* ============ HERO ============ */
function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleAudio = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);

    videoRef.current.play();
  };
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex items-center"
    >
      {/* RIGHT SIDE VIDEO BACKGROUND */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full">
        <video
             ref={videoRef}
             autoPlay
             muted
             playsInline
             loop
             className="w-full h-full object-cover"
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>

        {/* Overlay for smooth blending */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/30 to-background" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT SIDE CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs tracking-widest text-accent mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              AVAILABLE FOR INTERNSHIPS
            </div>

<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold leading-tight mb-4">              
  Hi, I'm <span className="text-gradient">Dharshini S</span>
            </h1>

            <div className="text-2xl md:text-3xl font-semibold mb-6 h-10">
              <TypeWriter />
            </div>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">
              Passionate Computer Science Engineering student with hands-on
              experience in Data Analytics, Python, SQL, and Generative AI.
              Dedicated to transforming data into meaningful insights and
              building innovative technology solutions.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0 hover:opacity-90 glow-purple"
              >
                <a href={RESUME_URL} download>
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="glass border-accent/40 hover:border-accent hover:bg-accent/10"
              >
                <a href="#projects">
                  <Sparkles className="w-4 h-4 mr-2" />
                  View Projects
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="glass border-primary/40 hover:border-primary hover:bg-primary/10"
              >
                <a href={GITHUB} target="_blank" rel="noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="ghost"
                className="hover:bg-accent/10"
              >
                <a href="#contact">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Me
                </a>
              </Button>
            </div>
          </motion.div>

          {/* EMPTY RIGHT SIDE FOR SPACING */}
          <div className="hidden lg:block" />

        </div>
        <div className="mt-6">
  <Button
    size="lg"
    onClick={toggleAudio}
    className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
  >
    {isMuted
      ? "🎤 Hear My AI Introduction"
      : "🔇 Mute AI Introduction"}
  </Button>
</div>
      </div>

      {/* FLOATING AI ICONS */}
      <div className="hidden lg:block">
        {[
          {
            Icon: Cpu,
            pos: "top-24 right-20",
            color: "text-accent",
            delay: 0,
          },
          {
            Icon: Database,
            pos: "bottom-32 right-[45%]",
            color: "text-primary",
            delay: 1,
          },
          {
            Icon: Brain,
            pos: "top-20 right-[35%]",
            color: "text-accent",
            delay: 2,
          },
          {
            Icon: LineChart,
            pos: "bottom-20 right-20",
            color: "text-primary",
            delay: 1.5,
          },
        ].map(({ Icon, pos, color, delay }, i) => (
          <div
            key={i}
            className={`absolute ${pos} glass-strong rounded-2xl p-3 animate-float z-20`}
            style={{ animationDelay: `${delay}s` }}
          >
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ ABOUT ============ */
function About() {
  return (
    <Section id="about">
      <SectionTitle kicker="WHO I AM" title="About Me" />
      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div whileHover={{ y: -6 }} className="lg:col-span-1 glass rounded-3xl p-6 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="absolute -inset-2 bg-gradient-to-br from-primary to-accent rounded-full blur opacity-60" />
            <img src={PROFILE_IMG} alt="Dharshini S" className="relative w-40 h-40 rounded-full object-cover border-2 border-accent/40" />
          </div>
          <h3 className="text-xl font-bold">Dharshini S</h3>
          <p className="text-accent text-sm mb-3">Data Analytics & GenAI Enthusiast</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" /> Tamil Nadu, India
          </div>
        </motion.div>

        <div className="lg:col-span-2 space-y-6">
          <p className="text-muted-foreground leading-relaxed text-lg">
            I am a Computer Science Engineering student with practical experience in Data Analytics, Data Visualization, Python Programming, SQL, and Generative AI gained through internships and academic projects.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            I enjoy solving real-world problems using technology and continuously learning emerging tools in AI, Machine Learning, and Data Science.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <motion.div whileHover={{ y: -4 }} className="glass rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-xl bg-primary/20"><GraduationCap className="w-5 h-5 text-accent" /></div>
                <div>
                  <h4 className="font-semibold">Education</h4>
                  <p className="text-xs text-muted-foreground">2023 – 2027</p>
                </div>
              </div>
              <p className="font-medium">B.E Computer Science Engineering</p>
              <p className="text-sm text-muted-foreground">NPR College of Engineering and Technology</p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">CGPA</span>
                <span className="font-bold text-accent text-lg">7.4 / 10</span>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="glass rounded-2xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-xl bg-accent/20"><Languages className="w-5 h-5 text-accent" /></div>
                <div>
                  <h4 className="font-semibold">Languages</h4>
                  <p className="text-xs text-muted-foreground">Fluent</p>
                </div>
              </div>
              <div className="space-y-3 mt-4">
                {[["English", 90], ["Tamil", 100]].map(([l, p]) => (
                  <div key={l as string}>
                    <div className="flex justify-between text-sm mb-1"><span>{l}</span><span className="text-accent">{p}%</span></div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${p}%` }} viewport={{ once: true }} transition={{ duration: 1.2 }}
                        className="h-full bg-gradient-to-r from-accent to-primary" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-8 text-center">My Journey</h3>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-primary to-accent" />
          {[
            { year: "2023", title: "Started B.E CSE", desc: "Joined NPR College of Engineering and Technology" },
            { year: "Jul 2025", title: "Data Science Intern", desc: "Elysium Group — EDA, Python, Visualization" },
            { year: "Dec 2025", title: "GenAI Intern", desc: "Evolve Robot Lab — Chatbots, APIs, ML" },
            { year: "2027", title: "Graduation (Expected)", desc: "B.E Computer Science Engineering" },
          ].map((e, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: i % 2 ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`relative flex items-center mb-8 ${i % 2 ? "justify-start pl-[52%]" : "justify-end pr-[52%]"}`}>
              <div className="glass rounded-2xl p-4 max-w-xs">
                <div className="text-xs text-accent font-semibold tracking-wider">{e.year}</div>
                <div className="font-semibold">{e.title}</div>
                <div className="text-sm text-muted-foreground">{e.desc}</div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-background glow-cyan" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============ SKILLS ============ */
const SKILL_GROUPS = [
  { title: "Programming Languages", icon: Code2, color: "from-cyan-400 to-blue-500", skills: [{ n: "Python", l: 85 }, { n: "SQL", l: 80 }] },
  { title: "Data Analytics", icon: BarChart3, color: "from-purple-400 to-pink-500", skills: [{ n: "Pandas", l: 85 }, { n: "NumPy", l: 80 }, { n: "Matplotlib", l: 80 }, { n: "Seaborn", l: 75 }, { n: "Microsoft Excel", l: 90 }] },
  { title: "Core Concepts", icon: Brain, color: "from-amber-400 to-orange-500", skills: [{ n: "Exploratory Data Analysis", l: 85 }, { n: "Data Visualization", l: 85 }, { n: "Data Cleaning", l: 80 }, { n: "Data Preprocessing", l: 80 }, { n: "Machine Learning Basics", l: 70 }] },
  { title: "AI & Development", icon: Sparkles, color: "from-emerald-400 to-cyan-500", skills: [{ n: "Generative AI", l: 80 }, { n: "API Integration", l: 75 }, { n: "Chatbot Development", l: 75 }] },
];

function Skills() {
  return (
    <Section id="skills">
      <SectionTitle kicker="MY EXPERTISE" title="Skills & Tools" />
      <div className="grid md:grid-cols-2 gap-6">
        {SKILL_GROUPS.map((g, i) => (
          <motion.div key={g.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="glass rounded-3xl p-6 group relative overflow-hidden">
            <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${g.color} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${g.color} bg-opacity-20`}>
                  <g.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{g.title}</h3>
              </div>
              <div className="space-y-3">
                {g.skills.map(s => (
                  <div key={s.n}>
                    <div className="flex justify-between text-sm mb-1.5"><span className="text-muted-foreground">{s.n}</span><span className="text-accent text-xs">{s.l}%</span></div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.l}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full bg-gradient-to-r ${g.color}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ============ EXPERIENCE ============ */
const EXPS = [
  {
    role: "GenAI Intern", company: "Evolve Robot Lab", duration: "Dec 2025 – Jan 2026",
    points: ["Worked on Generative AI applications", "Developed chatbot systems", "Integrated APIs", "Learned Machine Learning fundamentals"],
    color: "from-purple-500 to-pink-500", icon: Brain,
  },
  {
    role: "Data Science Intern", company: "Elysium Group", duration: "Jul 2025 – Aug 2025",
    points: ["Performed Data Analysis using Python", "Created visualizations", "Conducted Data Cleaning", "Worked on Exploratory Data Analysis (EDA)"],
    color: "from-cyan-500 to-blue-500", icon: BarChart3,
  },
];

function Experience() {
  return (
    <Section id="experience">
      <SectionTitle kicker="WHERE I'VE BEEN" title="Internship Experience" />
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-primary to-transparent" />
        {EXPS.map((e, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
            className={`relative mb-12 md:grid md:grid-cols-2 md:gap-8 ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}>
            <div className={`pl-20 md:pl-0 ${i % 2 ? "md:text-left md:pl-8" : "md:text-right md:pr-8"}`}>
              <div className="glass-strong rounded-3xl p-6 inline-block w-full">
                <div className={`flex items-center gap-3 mb-3 ${i % 2 ? "" : "md:flex-row-reverse md:justify-start"}`}>
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${e.color}`}><e.icon className="w-5 h-5 text-white" /></div>
                  <div className={i % 2 ? "" : "md:text-right"}>
                    <h3 className="text-xl font-bold">{e.role}</h3>
                    <p className="text-accent text-sm">{e.company}</p>
                  </div>
                </div>
                <div className={`text-xs text-muted-foreground mb-4 tracking-wider ${i % 2 ? "" : "md:text-right"}`}>{e.duration}</div>
                <ul className={`space-y-2 ${i % 2 ? "" : "md:text-right"}`}>
                  {e.points.map(p => (
                    <li key={p} className={`text-sm text-muted-foreground flex items-start gap-2 ${i % 2 ? "" : "md:flex-row-reverse"}`}>
                      <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" /> <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-background glow-cyan" />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ============ PROJECTS ============ */
function Projects() {
  const TAGS = ["Python", "Data Analytics", "AI", "Firebase", "React"];
  return (
    <Section id="projects">
      <SectionTitle kicker="FEATURED WORK" title="Projects" />
      <motion.div whileHover={{ y: -6 }} className="glass-strong rounded-3xl overflow-hidden grid md:grid-cols-2 gap-0 max-w-6xl mx-auto">
        <div className="relative h-72 md:h-auto bg-gradient-to-br from-emerald-500/20 via-cyan-500/20 to-primary/20 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,oklch(0.78_0.16_210/0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,oklch(0.65_0.22_295/0.3),transparent_50%)]" />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-80 h-80 border border-accent/20 rounded-full" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-60 h-60 border border-primary/30 rounded-full" />
          <div className="relative text-center z-10">
            <div className="text-7xl mb-2">🥚</div>
            <div className="text-xs tracking-[0.3em] text-accent">ECO • SMART • REPAIR</div>
          </div>
        </div>
        <div className="p-8 md:p-10">
          <div className="text-xs tracking-widest text-accent mb-2">FEATURED PROJECT</div>
          <h3 className="text-3xl font-bold mb-1">ShellCycle</h3>
          <p className="text-primary mb-4">Eco-Friendly Pothole Management System</p>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            A smart pothole reporting and management platform that enables citizens to report potholes and promotes eco-friendly road repair solutions using eggshell-based composite materials.
          </p>
          <ul className="grid grid-cols-2 gap-2 mb-6 text-sm">
            {["GPS-based reporting", "Image upload", "Community system", "Repair tracking", "Admin dashboard", "Eco-friendly repair"].map(f => (
              <li key={f} className="flex items-center gap-2 text-muted-foreground"><span className="w-1.5 h-1.5 rounded-full bg-accent" />{f}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 mb-6">
            {TAGS.map(t => <span key={t} className="px-3 py-1 rounded-full glass text-xs text-accent border border-accent/20">{t}</span>)}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0">
              <a href={GITHUB} target="_blank" rel="noreferrer"><Github className="w-4 h-4 mr-2" />GitHub</a>
            </Button>
            <Button asChild variant="outline" className="glass border-accent/40">
              <a href="#" onClick={e => { e.preventDefault(); toast.info("Live demo coming soon!"); }}><ExternalLink className="w-4 h-4 mr-2" />Live Demo</a>
            </Button>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

/* ============ COUNTERS ============ */
function Counter({ to, label, icon: Icon, suffix = "" }: { to: number; label: string; icon: any; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1500, 1);
      setN(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);
  return (
    <motion.div ref={ref} whileHover={{ y: -6 }} className="glass rounded-3xl p-6 text-center">
      <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-3"><Icon className="w-6 h-6 text-accent" /></div>
      <div className="text-4xl md:text-5xl font-bold text-gradient">{n}{suffix}</div>
      <div className="text-sm text-muted-foreground mt-2">{label}</div>
    </motion.div>
  );
}

function Achievements() {
  return (
    <Section id="achievements">
      <SectionTitle kicker="BY THE NUMBERS" title="Achievements" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Counter to={2} label="Internships Completed" icon={Briefcase} suffix="+" />
        <Counter to={5} label="Projects Built" icon={Code2} suffix="+" />
        <Counter to={15} label="Technologies Learned" icon={Cpu} suffix="+" />
        <Counter to={2} label="Programming Languages" icon={Brain} />
      </div>
    </Section>
  );
}

/* ============ GITHUB ============ */
function GitHubSection() {
  return (
    <Section id="github">
      <SectionTitle kicker="OPEN SOURCE" title="My GitHub" />
      <motion.div whileHover={{ y: -6 }} className="glass-strong rounded-3xl p-8 md:p-10 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="absolute -inset-3 bg-gradient-to-br from-primary to-accent rounded-full blur-xl opacity-60" />
            <div className="relative p-6 rounded-full bg-background border-2 border-accent/40">
              <Github className="w-16 h-16 text-accent" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold">DHARSHINI1707</h3>
            <p className="text-muted-foreground mb-4">Building data-driven & AI-powered solutions</p>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[["Repos", "3"], ["Projects", "2"], ["Active", "2026"]].map(([k, v]) => (
                <div key={k} className="glass rounded-xl p-3">
                  <div className="text-xl font-bold text-gradient">{v}</div>
                  <div className="text-xs text-muted-foreground">{k}</div>
                </div>
              ))}
            </div>
            <Button asChild className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0 glow-purple">
              <a href={GITHUB} target="_blank" rel="noreferrer"><Github className="w-4 h-4 mr-2" />Visit GitHub Profile<ExternalLink className="w-3 h-3 ml-2" /></a>
            </Button>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-7 gap-1">
          {Array.from({ length: 49 }).map((_, i) => {
            const intensity = Math.random();
            const bg = intensity > 0.7 ? "bg-accent" : intensity > 0.4 ? "bg-primary/60" : intensity > 0.2 ? "bg-primary/30" : "bg-white/5";
            return <div key={i} className={`h-6 rounded ${bg}`} />;
          })}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">Contribution Activity</p>
      </motion.div>
    </Section>
  );
}

/* ============ RESUME ============ */
function Resume() {
  return (
    <Section id="resume">
      <SectionTitle kicker="MY CV" title="Resume" />
      <motion.div whileHover={{ y: -6 }} className="glass-strong rounded-3xl p-8 md:p-10 max-w-3xl mx-auto text-center">
        <div className="inline-flex p-5 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 mb-5">
          <FileText className="w-12 h-12 text-accent" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Dharshini S — Resume</h3>
        <p className="text-muted-foreground mb-6">Complete overview of my experience, projects, and skills in Data Analytics & GenAI.</p>
        <div className="aspect-[8.5/4] rounded-2xl border-2 border-dashed border-accent/30 mb-6 flex items-center justify-center text-muted-foreground text-sm glass">
          <div>
            <FileText className="w-10 h-10 mx-auto mb-2 text-accent/50" />
            Resume preview — upload <code className="text-accent">public/resume.pdf</code> to enable
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0">
            <a href={RESUME_URL} download><Download className="w-4 h-4 mr-2" />Download Resume</a>
          </Button>
          <Button asChild variant="outline" className="glass border-accent/40">
            <a href={RESUME_URL} target="_blank" rel="noreferrer"><ExternalLink className="w-4 h-4 mr-2" />Open Resume</a>
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}

/* ============ WHY HIRE ============ */
const WHYS = [
  { icon: Zap, title: "Fast Learner", desc: "Quickly adapts to new technologies and tools.", color: "from-amber-400 to-orange-500" },
  { icon: Target, title: "Problem Solver", desc: "Enjoy solving real-world challenges using technology.", color: "from-cyan-400 to-blue-500" },
  { icon: Users, title: "Team Player", desc: "Works effectively in collaborative environments.", color: "from-emerald-400 to-cyan-500" },
  { icon: Sparkles, title: "AI & Data Enthusiast", desc: "Passionate about AI, Data Analytics, and innovation.", color: "from-purple-400 to-pink-500" },
];

function WhyHire() {
  return (
    <Section id="why">
      <SectionTitle kicker="VALUE I BRING" title="Why Work With Me?" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {WHYS.map((w, i) => (
          <motion.div key={w.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass rounded-3xl p-6 relative overflow-hidden group">
            <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${w.color} opacity-20 blur-2xl group-hover:opacity-50 transition-opacity`} />
            <div className={`relative inline-flex p-3 rounded-2xl bg-gradient-to-br ${w.color} mb-4`}>
              <w.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-lg mb-1.5">{w.title}</h3>
            <p className="text-sm text-muted-foreground">{w.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ============ CONTACT ============ */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error("Please fill all fields"); return; }
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    toast.success("Opening your email client...");
  };
  return (
    <Section id="contact">
      <SectionTitle kicker="GET IN TOUCH" title="Contact Me" />
      <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
        <div className="lg:col-span-2 space-y-4">
          {[
            { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
            { icon: Github, label: "GitHub", value: "DHARSHINI1707", href: GITHUB },
            { icon: MapPin, label: "Location", value: "Tamil Nadu, India" },
          ].map(c => (
            <motion.a key={c.label} whileHover={{ x: 6 }} href={c.href || "#"} target={c.href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
              className="glass rounded-2xl p-5 flex items-center gap-4 group block">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/40 group-hover:to-accent/40 transition-colors">
                <c.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground tracking-wider">{c.label}</div>
                <div className="font-medium">{c.value}</div>
              </div>
            </motion.a>
          ))}
        </div>
        <form onSubmit={submit} className="lg:col-span-3 glass-strong rounded-3xl p-6 md:p-8 space-y-4">
          <div>
            <label className="text-xs text-muted-foreground tracking-wider">NAME</label>
            <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="glass border-white/10 mt-1.5" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground tracking-wider">EMAIL</label>
            <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="glass border-white/10 mt-1.5" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground tracking-wider">MESSAGE</label>
            <Textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me about the opportunity..." className="glass border-white/10 mt-1.5 resize-none" />
          </div>
          <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground border-0 glow-purple">
            <Send className="w-4 h-4 mr-2" />Send Message
          </Button>
        </form>
      </div>
    </Section>
  );
}

/* ============ FOOTER ============ */
function Footer() {
  return (
    <footer className="border-t border-white/10 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-gradient mb-2">DHARSHINI S</h3>
          <p className="text-sm text-muted-foreground">Data Analytics & GenAI Enthusiast</p>
          <div className="flex gap-3 mt-4">
            <a href={GITHUB} target="_blank" rel="noreferrer" className="p-2 glass rounded-xl hover:text-accent transition-colors"><Github className="w-5 h-5" /></a>
            <a href={`mailto:${EMAIL}`} className="p-2 glass rounded-xl hover:text-accent transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm tracking-wider">QUICK LINKS</h4>
          <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            {["about", "skills", "experience", "projects", "resume", "contact"].map(s => (
              <li key={s}><a href={`#${s}`} className="hover:text-accent capitalize">{s}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm tracking-wider">CONTACT</h4>
          <p className="text-sm text-muted-foreground">{EMAIL}</p>
          <p className="text-sm text-muted-foreground">Tamil Nadu, India</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-muted-foreground">
        © 2026 Dharshini S. All Rights Reserved. · Built with passion & purple gradients.
      </div>
    </footer>
  );
}

/* ============ EXTRAS ============ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary origin-left z-[60]" />;
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-br from-primary to-accent glow-purple text-white hover:scale-110 transition-transform">
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ============ MAIN ============ */
function Portfolio() {
 const [loading, setLoading] = useState(true);

  const [activeSection, setActiveSection] = useState("about");
  return (
    <>
      <AnimatePresence>{loading && <Loader onDone={() => setLoading(false)} />}</AnimatePresence>
      <ParticleBackground />
      <ScrollProgress />
      <Nav />
      <main className="relative">
  <Hero />

  {/* Navigation Cards */}
  <section className="max-w-7xl mx-auto px-6 py-12">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

      <button
        onClick={() => setActiveSection("about")}
        className="glass-strong rounded-2xl p-6 hover:scale-105 transition-all"
      >
        About
      </button>

      <button
        onClick={() => setActiveSection("skills")}
        className="glass-strong rounded-2xl p-6 hover:scale-105 transition-all"
      >
        Skills
      </button>

      <button
        onClick={() => setActiveSection("experience")}
        className="glass-strong rounded-2xl p-6 hover:scale-105 transition-all"
      >
        Experience
      </button>

      <button
        onClick={() => setActiveSection("projects")}
        className="glass-strong rounded-2xl p-6 hover:scale-105 transition-all"
      >
        Projects
      </button>

      <button
        onClick={() => setActiveSection("achievements")}
        className="glass-strong rounded-2xl p-6 hover:scale-105 transition-all"
      >
        Achievements
      </button>

      <button
        onClick={() => setActiveSection("github")}
        className="glass-strong rounded-2xl p-6 hover:scale-105 transition-all"
      >
        GitHub
      </button>

      <button
        onClick={() => setActiveSection("resume")}
        className="glass-strong rounded-2xl p-6 hover:scale-105 transition-all"
      >
        Resume
      </button>

      <button
        onClick={() => setActiveSection("hire")}
        className="glass-strong rounded-2xl p-6 hover:scale-105 transition-all"
      >
        Why Hire Me
      </button>

      <button
        onClick={() => setActiveSection("contact")}
        className="glass-strong rounded-2xl p-6 hover:scale-105 transition-all"
      >
        Contact
      </button>

    </div>
  </section>

  {/* Content Display Area */}
  <section className="max-w-7xl mx-auto px-6 pb-20">
    <motion.div
      key={activeSection}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        glass-strong
        rounded-[40px]
        p-8 md:p-12
        border border-white/10
        shadow-[0_20px_80px_rgba(0,0,0,0.4)]
      "
    >

      {activeSection === "about" && <About />}

      {activeSection === "skills" && <Skills />}

      {activeSection === "experience" && <Experience />}

      {activeSection === "projects" && <Projects />}

      {activeSection === "achievements" && <Achievements />}

      {activeSection === "github" && <GitHubSection />}

      {activeSection === "resume" && <Resume />}

      {activeSection === "hire" && <WhyHire />}

      {activeSection === "contact" && <Contact />}

    </motion.div>
  </section>
</main>
      <Footer />
      <BackToTop />
    </>
  );
}

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, animate } from "framer-motion";
import {
  Download, Github, Mail, ExternalLink, Phone, Send, X, ArrowLeft,
  Database, Brain, Code2, BarChart3, Sparkles, Users, Target, Award,
  GraduationCap, Briefcase, FileText, Languages, Cpu, LineChart, MapPin,
  User, Folder, Volume2, VolumeX,
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
      { name: "description", content: "Interactive portfolio of Dharshini S — Computer Science Engineering student specializing in Data Analytics, Python, SQL, and Generative AI." },
      { property: "og:title", content: "Dharshini S — Data Analytics & GenAI Portfolio" },
      { property: "og:description", content: "CSE student | Data Analytics • Data Science • GenAI • Python" },
    ],
  }),
  component: Portfolio,
});

const GITHUB = "https://github.com/DHARSHINI1707";
const EMAIL = "dharshinibb90@gmail.com";
const PHONE = "9894485175";
const RESUME_URL = "/resume.pdf";
const INTRO_VIDEO = "/intro.mp4";

const ROLES = ["Data Analyst", "GenAI Enthusiast", "Python Developer", "AI Explorer"];

/* ============================================================ TYPEWRITER */
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

/* ============================================================ COUNTER */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration: 1.6, ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, mv]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ============================================================ CARD DATA */
const CARDS = [
  { id: "who", num: "01", cat: "Profile", title: "WHO AM I", preview: "Computer Science Engineering student passionate about turning data into insight.", Icon: User },
  { id: "skills", num: "02", cat: "Toolkit", title: "SKILLS", preview: "Python, SQL, Data Analytics, EDA & Generative AI.", Icon: Code2 },
  { id: "experience", num: "03", cat: "Journey", title: "EXPERIENCE", preview: "GenAI & Data Science internships building real products.", Icon: Briefcase },
  { id: "projects", num: "04", cat: "Work", title: "PROJECTS", preview: "ShellCycle — an eco-friendly pothole management system.", Icon: Folder },
  { id: "achievements", num: "05", cat: "Impact", title: "ACHIEVEMENTS", preview: "Internships, projects & technologies mastered so far.", Icon: Award },
  { id: "resume", num: "06", cat: "Document", title: "RESUME", preview: "Preview, open & download my full resume.", Icon: FileText },
  { id: "github", num: "07", cat: "Code", title: "GITHUB", preview: "Explore my repositories and contributions.", Icon: Github },
  { id: "contact", num: "08", cat: "Connect", title: "CONTACT", preview: "Let's build something together — reach out.", Icon: Mail },
];

/* ============================================================ DETAIL CONTENT */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120, damping: 16 } },
};

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="px-3 py-1.5 rounded-full glass text-sm text-foreground/90 border border-accent/20">{children}</span>;
}

function DetailHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <motion.div variants={item} className="mb-8">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[11px] tracking-[0.3em] text-accent mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />{kicker}
      </div>
      <h2 className="text-4xl md:text-5xl font-bold"><span className="text-gradient">{title}</span></h2>
    </motion.div>
  );
}

function WhoContent() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <DetailHeader kicker="PROFILE" title="Who Am I" />
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="glass-strong rounded-3xl p-6 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="absolute -inset-2 bg-gradient-to-br from-primary to-accent rounded-full blur-md opacity-60" />
            <img src={PROFILE_IMG} alt="Dharshini S" className="relative w-36 h-36 rounded-full object-cover border-2 border-accent/40" />
          </div>
          <h3 className="text-xl font-bold">Dharshini S</h3>
          <p className="text-accent text-sm mb-3">Data Analytics & GenAI Enthusiast</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="w-4 h-4" /> Tamil Nadu, India</div>
        </motion.div>
        <div className="lg:col-span-2 space-y-5">
          <motion.p variants={item} className="text-muted-foreground leading-relaxed text-lg">
            Computer Science Engineering student with hands-on experience in Data Analytics, Python, SQL, Machine Learning fundamentals, and Generative AI through internships and academic projects.
          </motion.p>
          <motion.div variants={item} className="glass rounded-2xl p-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="p-2 rounded-xl bg-primary/20"><GraduationCap className="w-5 h-5 text-accent" /></div>
              <div><h4 className="font-semibold">Education</h4><p className="text-xs text-muted-foreground">2023 – 2027</p></div>
            </div>
            <p className="font-medium">B.E Computer Science Engineering</p>
            <p className="text-sm text-muted-foreground">NPR College of Engineering and Technology</p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">CGPA</span><span className="font-bold text-accent text-lg">7.4 / 10</span>
            </div>
          </motion.div>
          <motion.div variants={item} className="glass rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-accent/20"><Languages className="w-5 h-5 text-accent" /></div>
              <h4 className="font-semibold">Languages</h4>
            </div>
            <div className="flex gap-3"><Pill>English</Pill><Pill>Tamil</Pill></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

const SKILL_GROUPS = [
  { title: "Programming", icon: Code2, color: "from-cyan-400 to-blue-500", skills: ["Python", "SQL"] },
  { title: "Data Analytics", icon: BarChart3, color: "from-purple-400 to-pink-500", skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Microsoft Excel"] },
  { title: "Core Concepts", icon: Brain, color: "from-amber-400 to-orange-500", skills: ["Data Cleaning", "Data Preprocessing", "EDA", "Data Visualization", "Machine Learning Basics"] },
  { title: "AI & Development", icon: Sparkles, color: "from-emerald-400 to-cyan-500", skills: ["Generative AI", "API Integration", "Chatbot Development"] },
];

function SkillsContent() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <DetailHeader kicker="TOOLKIT" title="Skills & Tools" />
      <div className="grid md:grid-cols-2 gap-5">
        {SKILL_GROUPS.map((g) => (
          <motion.div key={g.title} variants={item} className="glass-strong rounded-3xl p-6 relative overflow-hidden">
            <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${g.color} opacity-20 blur-3xl`} />
            <div className="relative">
              <div className="flex items-center gap-3 mb-5">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${g.color}`}><g.icon className="w-5 h-5 text-white" /></div>
                <h3 className="text-lg font-semibold">{g.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">{g.skills.map((s) => <Pill key={s}>{s}</Pill>)}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

const EXPERIENCE = [
  { role: "GenAI Intern", company: "Evolve Robot Lab", period: "Dec 2025 – Jan 2026", points: ["Generative AI Applications", "Chatbot Development", "API Integration", "Machine Learning Fundamentals"] },
  { role: "Data Science Intern", company: "Elysium Group", period: "Jul 2025 – Aug 2025", points: ["Data Analysis", "Data Visualization", "Data Cleaning", "Exploratory Data Analysis"] },
];

function ExperienceContent() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <DetailHeader kicker="JOURNEY" title="Experience" />
      <div className="space-y-5">
        {EXPERIENCE.map((e) => (
          <motion.div key={e.company} variants={item} className="glass-strong rounded-3xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/20"><Briefcase className="w-5 h-5 text-accent" /></div>
                <div>
                  <h3 className="text-xl font-semibold">{e.role}</h3>
                  <p className="text-accent text-sm">{e.company}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full glass text-xs text-muted-foreground">{e.period}</span>
            </div>
            <div className="flex flex-wrap gap-2">{e.points.map((p) => <Pill key={p}>{p}</Pill>)}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ProjectsContent() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <DetailHeader kicker="WORK" title="Projects" />
      <motion.div variants={item} className="glass-strong rounded-3xl overflow-hidden">
        <div className="relative h-44 bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <Target className="w-16 h-16 text-accent/70 relative" />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold">ShellCycle</h3>
          <p className="text-accent text-sm mb-4">Eco-Friendly Pothole Management System</p>
          <p className="text-muted-foreground mb-5 leading-relaxed">
            A smart pothole reporting and management system using eggshell-based eco-friendly composite material for repairs, with GPS tracking, image uploads and an admin dashboard for community reports.
          </p>
          <div className="mb-5">
            <h4 className="text-xs tracking-[0.2em] text-muted-foreground mb-2">FEATURES</h4>
            <div className="flex flex-wrap gap-2">
              {["GPS Location Tracking", "Image Upload", "Community Reporting", "Admin Dashboard", "Repair Monitoring"].map((f) => <Pill key={f}>{f}</Pill>)}
            </div>
          </div>
          <div className="mb-6">
            <h4 className="text-xs tracking-[0.2em] text-muted-foreground mb-2">TECH STACK</h4>
            <div className="flex flex-wrap gap-2">
              {["Python", "AI", "Data Analytics", "Firebase", "React"].map((f) => <Pill key={f}>{f}</Pill>)}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0 hover:opacity-90">
              <a href={GITHUB} target="_blank" rel="noreferrer"><Github className="w-4 h-4 mr-2" />View Code</a>
            </Button>
            <Button asChild variant="outline" className="glass border-accent/40 hover:bg-accent/10">
              <a href={GITHUB} target="_blank" rel="noreferrer"><ExternalLink className="w-4 h-4 mr-2" />Live Demo</a>
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const STATS = [
  { label: "Internships Completed", to: 2, Icon: Briefcase },
  { label: "Projects Built", to: 3, Icon: Folder },
  { label: "Technologies Learned", to: 15, suffix: "+", Icon: Cpu },
  { label: "Certifications", to: 4, Icon: Award },
];

function AchievementsContent() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <DetailHeader kicker="IMPACT" title="Achievements" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map((s) => (
          <motion.div key={s.label} variants={item} className="glass-strong rounded-3xl p-6 text-center">
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 mb-4"><s.Icon className="w-6 h-6 text-accent" /></div>
            <div className="text-4xl md:text-5xl font-bold text-gradient"><Counter to={s.to} suffix={s.suffix} /></div>
            <p className="text-sm text-muted-foreground mt-2">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ResumeContent() {
  const [viewerUrl, setViewerUrl] = useState(RESUME_URL);

  useEffect(() => {
    setViewerUrl(`${window.location.origin}${RESUME_URL}`);
  }, []);

  const embeddedViewer = `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(viewerUrl)}`;

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <DetailHeader kicker="DOCUMENT" title="Resume" />
      <motion.div variants={item} className="glass-strong rounded-3xl p-6">
        <div className="rounded-2xl overflow-hidden border border-accent/20 mb-5 bg-white">
          <iframe src={embeddedViewer} title="Resume preview" className="w-full h-[60vh]" />
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0 hover:opacity-90 glow-purple">
            <a href={RESUME_URL} download><Download className="w-4 h-4 mr-2" />Download Resume</a>
          </Button>
          <Button asChild variant="outline" className="glass border-accent/40 hover:bg-accent/10">
            <a href={RESUME_URL} target="_blank" rel="noreferrer"><ExternalLink className="w-4 h-4 mr-2" />Open in New Tab</a>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function GithubContent() {
  // simple deterministic heatmap
  const cells = Array.from({ length: 7 * 20 }, (_, i) => (i * 37) % 5);
  const levels = ["bg-white/5", "bg-accent/20", "bg-accent/40", "bg-accent/60", "bg-accent/90"];
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <DetailHeader kicker="CODE" title="GitHub" />
      <motion.div variants={item} className="glass-strong rounded-3xl p-6 mb-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30"><Github className="w-8 h-8 text-foreground" /></div>
          <div>
            <h3 className="text-xl font-bold">DHARSHINI1707</h3>
            <a href={GITHUB} target="_blank" rel="noreferrer" className="text-accent text-sm hover:underline">{GITHUB}</a>
          </div>
        </div>
        <Button asChild className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0 hover:opacity-90">
          <a href={GITHUB} target="_blank" rel="noreferrer"><ExternalLink className="w-4 h-4 mr-2" />Visit Profile</a>
        </Button>
      </motion.div>
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {[["Repositories", "12"], ["Stars", "8"], ["Followers", "20"], ["Contributions", "240+"]].map(([k, v]) => (
          <div key={k} className="glass rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-gradient">{v}</div>
            <div className="text-xs text-muted-foreground mt-1">{k}</div>
          </div>
        ))}
      </motion.div>
      <motion.div variants={item} className="glass-strong rounded-3xl p-6">
        <h4 className="text-xs tracking-[0.2em] text-muted-foreground mb-4">CONTRIBUTION ACTIVITY</h4>
        <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto">
          {cells.map((lvl, i) => <div key={i} className={`w-3 h-3 rounded-sm ${levels[lvl]}`} />)}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ContactContent() {
  const [sending, setSending] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! I'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }, 900);
  };
  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <DetailHeader kicker="CONNECT" title="Get In Touch" />
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={item} className="space-y-4">
          {[
            { Icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
            { Icon: Phone, label: "Phone", value: PHONE, href: `tel:${PHONE}` },
            { Icon: Github, label: "GitHub", value: "DHARSHINI1707", href: GITHUB },
          ].map((c) => (
            <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="glass-strong rounded-2xl p-5 flex items-center gap-4 hover:border-accent/40 transition-colors block">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30"><c.Icon className="w-5 h-5 text-accent" /></div>
              <div><div className="text-xs text-muted-foreground">{c.label}</div><div className="font-medium">{c.value}</div></div>
            </a>
          ))}
        </motion.div>
        <motion.form variants={item} onSubmit={submit} className="glass-strong rounded-3xl p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input required placeholder="Name" className="glass border-accent/20" />
            <Input required type="email" placeholder="Email" className="glass border-accent/20" />
          </div>
          <Input required placeholder="Subject" className="glass border-accent/20" />
          <Textarea required placeholder="Message" rows={4} className="glass border-accent/20" />
          <Button type="submit" disabled={sending} className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground border-0 hover:opacity-90 glow-purple">
            <Send className="w-4 h-4 mr-2" />{sending ? "Sending..." : "Send Message"}
          </Button>
        </motion.form>
      </div>
    </motion.div>
  );
}

function DetailBody({ id }: { id: string }) {
  switch (id) {
    case "who": return <WhoContent />;
    case "skills": return <SkillsContent />;
    case "experience": return <ExperienceContent />;
    case "projects": return <ProjectsContent />;
    case "achievements": return <AchievementsContent />;
    case "resume": return <ResumeContent />;
    case "github": return <GithubContent />;
    case "contact": return <ContactContent />;
    default: return null;
  }
}

/* ============================================================ HERO LANDING */
function Landing({ onExplore }: { onExplore: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const toggleAudio = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
    videoRef.current.play();
  };
  return (
    <div className="relative h-screen w-full overflow-hidden grid lg:grid-cols-2 items-center px-6 lg:px-12 gap-8">
      {/* LEFT */}
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative z-10 max-w-xl mx-auto lg:mx-0">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs tracking-widest text-accent mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />AVAILABLE FOR INTERNSHIPS
        </div>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-3">
          <span className="text-gradient">DHARSHINI S</span>
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-foreground/90 mb-2">Data Analytics &amp; GenAI Enthusiast</p>
        <div className="text-lg md:text-xl mb-5 h-8"><TypeWriter /></div>
        <p className="text-muted-foreground leading-relaxed mb-8">
          Computer Science Engineering student passionate about Data Analytics, Artificial Intelligence, Generative AI, and solving real-world problems through technology.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={onExplore} size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0 hover:opacity-90 glow-purple">
            <Sparkles className="w-4 h-4 mr-2" />Explore Portfolio
          </Button>
          <Button asChild size="lg" variant="outline" className="glass border-accent/40 hover:bg-accent/10">
            <a href={RESUME_URL} download><Download className="w-4 h-4 mr-2" />Download Resume</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="glass border-primary/40 hover:bg-primary/10">
            <a href={GITHUB} target="_blank" rel="noreferrer"><Github className="w-4 h-4 mr-2" />GitHub Profile</a>
          </Button>
        </div>
      </motion.div>

      {/* RIGHT — VIDEO */}
      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }} className="relative z-10 h-[50vh] lg:h-[78vh] w-full">
        <div className="relative h-full w-full rounded-3xl overflow-hidden glass-strong glow-purple">
          <div className="absolute -inset-1 bg-gradient-to-br from-primary/40 via-transparent to-accent/40 blur-xl -z-10" />
          <video ref={videoRef} autoPlay muted loop playsInline className="h-full w-full object-cover rounded-3xl">
            <source src={INTRO_VIDEO} type="video/mp4" />
          </video>
          <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-accent/20" />
          <button onClick={toggleAudio} aria-label={muted ? "Unmute intro" : "Mute intro"}
            className="absolute bottom-4 right-4 glass-strong rounded-full p-3 hover:bg-accent/20 transition-colors">
            {muted ? <VolumeX className="w-5 h-5 text-accent" /> : <Volume2 className="w-5 h-5 text-accent" />}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ============================================================ CARD DECK */
function CardDeck({ onSelect, onBack }: { onSelect: (id: string) => void; onBack: () => void }) {
  return (
    <div className="relative min-h-screen w-full px-6 py-10 lg:px-12 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gradient">Explore</h2>
            <p className="text-sm text-muted-foreground">Tap a card to open it like an app window.</p>
          </div>
          <Button variant="outline" onClick={onBack} className="glass border-accent/30 hover:bg-accent/10">
            <ArrowLeft className="w-4 h-4 mr-2" />Home
          </Button>
        </motion.div>

        <div className="space-y-4">
          {CARDS.map((c, i) => (
            <motion.button
              key={c.id}
              layoutId={`card-${c.id}`}
              onClick={() => onSelect(c.id)}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, type: "spring", stiffness: 120, damping: 18 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group w-full text-left glass-strong rounded-3xl p-6 relative overflow-hidden block"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity" />
              <div className="relative flex items-center gap-5">
                <div className="text-5xl font-bold text-gradient/40 opacity-40 min-w-[3rem]">{c.num}</div>
                <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20"><c.Icon className="w-6 h-6 text-accent" /></div>
                <div className="flex-1">
                  <div className="text-[11px] tracking-[0.3em] text-accent uppercase mb-1">{c.cat}</div>
                  <h3 className="text-2xl font-bold group-hover:text-gradient transition-colors">{c.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{c.preview}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================ EXPANDED WINDOW */
function DetailWindow({ id, onClose }: { id: string; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="absolute inset-0 backdrop-blur-xl bg-background/70" onClick={onClose}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.div
        layoutId={`card-${id}`}
        className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto glass-strong rounded-3xl p-6 sm:p-10 glow-purple"
        transition={{ type: "spring", stiffness: 200, damping: 26 }}
      >
        <div className="sticky top-0 -mt-2 mb-4 flex justify-between items-center z-20">
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-accent/10 text-muted-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />Back
          </Button>
          <button onClick={onClose} aria-label="Close" className="glass rounded-full p-2 hover:bg-destructive/20 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <DetailBody id={id} />
      </motion.div>
    </motion.div>
  );
}

/* ============================================================ ROOT */
function Portfolio() {
  const [view, setView] = useState<"landing" | "deck">("landing");
  const [active, setActive] = useState<string | null>(null);

  return (
    <main className="relative">
      <ParticleBackground />

      <AnimatePresence mode="wait">
        {view === "landing" ? (
          <motion.div key="landing" exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.4 }}>
            <Landing onExplore={() => setView("deck")} />
          </motion.div>
        ) : (
          <motion.div key="deck" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <CardDeck onSelect={setActive} onBack={() => setView("landing")} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active && <DetailWindow key={active} id={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </main>
  );
}

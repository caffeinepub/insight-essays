import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Film,
  Globe,
  Instagram,
  Lightbulb,
  Linkedin,
  Mail,
  MessageSquare,
  Twitter,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Hook for scroll-triggered fade-in
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    const children = el.querySelectorAll(".fade-in");
    for (const child of children) {
      observer.observe(child);
    }
    if (el.classList.contains("fade-in")) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return ref;
}

const sections = [
  { id: "movies", label: "Movies", icon: Film },
  { id: "insights", label: "Random Insights", icon: Brain },
  { id: "opinions", label: "Opinions", icon: MessageSquare },
  { id: "books", label: "Books & Articles", icon: BookOpen },
  { id: "resources", label: "Online Resources", icon: Globe },
];

const movies = [
  {
    id: 1,
    title: "City of God",
    originalTitle: "Cidade de Deus",
    year: 2002,
    country: "Brazil",
    directorNote: "Real favela residents cast for authenticity",
    mood: "Raw Cinema",
    tags: ["Crime", "Drama", "Raw Cinema", "World Cinema"],
    shortDescription:
      "A classic that didn't get the popular attention it deserved. Set in the favelas of Rio de Janeiro, this film pulls no punches showing young boys swallowed by crime and gang wars.",
    review:
      "A classic that didn't get the popular attention it deserved. Set in the favelas and ghettos of Rio de Janeiro, this film pulls no punches in showing the lives of young boys swallowed by crime and gang wars. They haven't seen much of life — cocaine, football, and maybe death before their 20th birthday. What makes it remarkable is the director's choice to cast real hood members, giving it an authenticity no Hollywood production could replicate. It made me think of what the Bhagavad Gita warns: that being enslaved by our desires gradually robs us of mind, consciousness, and rationality. Their bodies exist — but not quite their minds.",
  },
  {
    id: 2,
    title: "Forrest Gump",
    originalTitle: null,
    year: 1994,
    country: "USA",
    directorNote: null,
    mood: "75% Humor",
    tags: ["Drama", "Comedy", "Life Story", "Classic"],
    shortDescription:
      "A beautiful, peaceful movie that flows without sudden twists or surprises. It follows a man perhaps too nice, too innocent — and pays the price socially for it.",
    review:
      "A beautiful, peaceful movie that flows without sudden twists or surprises. It follows a man who is perhaps too nice, too innocent — and pays the price socially for it. The world rewards those who can express themselves pragmatically; Forrest is almost too straightforward for his own good, and society reminds him of that. It shows the life of a soldier and many other chapters, all with a calm warmth. The ending is bittersweet — he finally gets the girl, but she dies of what is implied to be HIV. For every sin there is a repayment. Sad, but that's the reality. Good and calm overall.",
  },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-xs"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-6xl flex items-center justify-between h-16 px-6">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-xl font-semibold tracking-tight text-foreground hover:text-primary transition-colors duration-150"
        >
          Insight Essays
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {sections.map((item) => (
            <button
              type="button"
              key={item.id}
              data-ocid={`nav.${item.id}.link`}
              onClick={() => scrollTo(item.id)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-sm transition-all duration-150"
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => scrollTo("movies")}
            data-ocid="nav.read_button"
            className="hidden lg:flex border-foreground/20 hover:border-primary hover:text-primary hover:bg-transparent transition-all duration-150"
          >
            Start Reading
          </Button>
          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-0.5 bg-foreground transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`w-5 h-0.5 bg-foreground transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`w-5 h-0.5 bg-foreground transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-sm border-b border-border px-6 py-4 flex flex-col gap-1">
          {sections.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="flex items-center gap-2 px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-sm transition-all duration-150 text-left"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function HeroSection() {
  const ref = useFadeIn();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />
      {/* Decorative amber glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full opacity-[0.08] blur-3xl bg-primary pointer-events-none translate-x-1/3" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 rounded-full opacity-[0.06] blur-3xl bg-primary pointer-events-none -translate-x-1/3" />

      <div ref={ref} className="container mx-auto max-w-4xl px-6 text-center">
        {/* Eyebrow */}
        <div className="fade-in flex items-center justify-center gap-2 mb-8">
          <div className="h-px w-12 bg-primary" />
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-muted-foreground">
            Independent Thinking
          </span>
          <div className="h-px w-12 bg-primary" />
        </div>

        {/* Headline */}
        <h1 className="fade-in fade-in-delay-1 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] tracking-tight text-foreground mb-6">
          Ideas Worth
          <br />
          <span className="italic font-light">Thinking About</span>
        </h1>

        {/* Subheadline */}
        <p className="fade-in fade-in-delay-2 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          Movies, insights, opinions, books — thoughts on the world as I
          encounter it.
        </p>

        {/* Section pills */}
        <div className="fade-in fade-in-delay-3 flex flex-wrap justify-center gap-2 mb-10">
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() =>
                document
                  .getElementById(s.id)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary transition-all duration-150"
            >
              <s.icon className="h-3 w-3" />
              {s.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="fade-in fade-in-delay-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            type="button"
            size="lg"
            data-ocid="hero.primary_button"
            onClick={() =>
              document
                .getElementById("movies")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-foreground text-background hover:bg-foreground/90 active:scale-95 transition-all duration-150 px-8 py-6 text-base font-medium rounded-sm group"
          >
            Start Reading
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-150" />
          </Button>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-sm font-medium text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors duration-150"
          >
            About the project
          </button>
        </div>

        {/* Scroll hint */}
        <div className="fade-in mt-20 flex flex-col items-center gap-2 text-muted-foreground/40">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-muted-foreground/30" />
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  icon: React.ElementType;
}) {
  return (
    <div className="fade-in mb-16">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-4 w-4 text-primary" />
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
          {eyebrow}
        </p>
      </div>
      <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
    </div>
  );
}

function MoviesSection() {
  const ref = useFadeIn();

  return (
    <section id="movies" className="py-24 sm:py-32" ref={ref}>
      <div className="container mx-auto max-w-5xl px-6">
        <SectionHeader eyebrow="Cinema" title="Movie Reviews" icon={Film} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {movies.map((movie, i) => (
            <article
              key={movie.id}
              data-ocid={`movies.item.${i + 1}`}
              className={`fade-in fade-in-delay-${Math.min(i + 1, 4)} group relative bg-card border border-border rounded-sm p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col`}
            >
              {/* Category + mood tag */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                  {movie.country} · {movie.year}
                </span>
                <span className="text-xs text-muted-foreground/60">
                  {movie.mood}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl sm:text-2xl font-semibold leading-snug tracking-tight text-card-foreground mb-4 flex-1">
                {movie.title}
                {movie.originalTitle && (
                  <span className="block text-sm font-normal italic text-muted-foreground mt-1">
                    {movie.originalTitle}
                  </span>
                )}
              </h3>

              {/* Short description */}
              <p className="text-muted-foreground leading-relaxed text-sm mb-8">
                {movie.shortDescription}
              </p>

              {/* CTA */}
              <div className="flex items-center">
                <button
                  type="button"
                  data-ocid={`movies.item.${i + 1}.button`}
                  className="text-sm font-medium text-foreground group-hover:text-primary flex items-center gap-2 transition-colors duration-150 border-b border-foreground/20 group-hover:border-primary pb-px"
                >
                  Read Review
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-150" />
                </button>
              </div>

              {/* Accent corner triangle on hover */}
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[24px] border-l-transparent border-t-[24px] border-t-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmptySection({
  id,
  eyebrow,
  title,
  description,
  icon: Icon,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  const ref = useFadeIn();

  return (
    <section id={id} className="py-24 sm:py-32 bg-muted/20" ref={ref}>
      <div className="container mx-auto max-w-5xl px-6">
        <SectionHeader eyebrow={eyebrow} title={title} icon={Icon} />

        <div
          data-ocid={`${id}.empty_state`}
          className="fade-in fade-in-delay-1 relative border border-dashed border-border rounded-sm p-16 text-center overflow-hidden"
        >
          {/* Subtle background pattern */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, currentColor 0px, currentColor 1px, transparent 0px, transparent 50%)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center mx-auto mb-6 bg-background">
              <Icon className="h-6 w-6 text-muted-foreground/50" />
            </div>
            <p className="font-display text-xl font-semibold text-foreground/60 mb-3">
              Thoughts incoming
            </p>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              {description}
            </p>
            <div className="mt-8 inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-primary/50">
              <div className="h-px w-8 bg-primary/30" />
              Check back soon
              <div className="h-px w-8 bg-primary/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const ref = useFadeIn();

  return (
    <section id="about" className="py-24 sm:py-32 bg-muted/40" ref={ref}>
      <div className="container mx-auto max-w-3xl px-6 text-center">
        <div className="fade-in">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-3">
            The Project
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-foreground mb-8">
            About Insight Essays
          </h2>
        </div>
        <div className="fade-in fade-in-delay-1">
          <div className="h-px w-16 bg-primary mx-auto mb-8" />
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            A personal space for honest writing — movies that left a mark,
            insights from daily life, opinions worth defending, and ideas
            distilled from books and the internet. Unfiltered and in progress.
          </p>
          <div className="h-px w-16 bg-primary mx-auto mt-8" />
        </div>

        {/* Stats row */}
        <div className="fade-in fade-in-delay-2 grid grid-cols-3 gap-6 mt-16">
          {[
            { value: "5", label: "Sections" },
            { value: "5 min", label: "Avg. read time" },
            { value: "Real", label: "Unfiltered views" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-semibold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const ref = useFadeIn();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section
      id="newsletter"
      className="py-24 sm:py-32 bg-foreground text-background"
      ref={ref}
    >
      <div className="container mx-auto max-w-2xl px-6 text-center">
        <div className="fade-in">
          <BookOpen className="h-8 w-8 mx-auto mb-6 opacity-60" />
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
            Stay Curious
          </h2>
          <p className="text-lg opacity-70 mb-10 leading-relaxed">
            Get one powerful idea in your inbox every week.
          </p>
        </div>

        {submitted ? (
          <div
            className="fade-in visible py-6"
            data-ocid="newsletter.success_state"
          >
            <div className="inline-flex items-center gap-2 text-primary font-medium text-lg">
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-foreground"
                  fill="none"
                  viewBox="0 0 12 12"
                  aria-hidden="true"
                >
                  <title>Check</title>
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              You&apos;re subscribed. Welcome aboard.
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="fade-in fade-in-delay-1 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-ocid="newsletter.input"
              className="flex-1 bg-white/10 border-white/20 text-background placeholder:text-background/40 focus:border-primary focus:ring-primary rounded-sm h-12"
            />
            <Button
              type="submit"
              data-ocid="newsletter.submit_button"
              className="bg-primary text-foreground hover:bg-primary/90 active:scale-95 transition-all duration-150 rounded-sm h-12 px-8 font-medium"
            >
              Subscribe
            </Button>
          </form>
        )}

        <p className="fade-in fade-in-delay-2 text-xs opacity-40 mt-6">
          No spam. Unsubscribe any time.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  const navLinks = [
    { label: "Movies", id: "movies" },
    { label: "Insights", id: "insights" },
    { label: "Opinions", id: "opinions" },
    { label: "Books", id: "books" },
    { label: "Resources", id: "resources" },
    { label: "About", id: "about" },
    { label: "Newsletter", id: "newsletter" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-border py-14">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="font-display text-lg font-semibold text-foreground mb-1">
              Insight Essays
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              Ideas worth thinking about.
            </p>
            {/* Contact email */}
            <a
              href="mailto:dakshesh236@gmail.com"
              data-ocid="footer.contact.link"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-150 group"
            >
              <Mail className="h-4 w-4 group-hover:text-primary" />
              dakshesh236@gmail.com
            </a>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-4">
            {navLinks.map((link, i) => (
              <button
                type="button"
                key={`${link.label}-${i}`}
                data-ocid={`footer.link.${i + 1}`}
                onClick={() => scrollTo(link.id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            {[
              { Icon: Twitter, label: "Twitter" },
              { Icon: Instagram, label: "Instagram" },
              { Icon: Linkedin, label: "LinkedIn" },
            ].map(({ Icon, label }) => (
              <button
                type="button"
                key={label}
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-150"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground/60">
          <p>
            &copy; {new Date().getFullYear()} Insight Essays. All rights
            reserved.
          </p>
          <p>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors duration-150 underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <MoviesSection />
        <EmptySection
          id="insights"
          eyebrow="Observations"
          title="Random Insights"
          description="Shower thoughts, sudden realisations, and observations on everyday life — coming when they arrive."
          icon={Brain}
        />
        <EmptySection
          id="opinions"
          eyebrow="My Take"
          title="Opinions"
          description="Opinions on what's happening in the world, in culture, and in my head. Honest, even when inconvenient."
          icon={MessageSquare}
        />
        <EmptySection
          id="books"
          eyebrow="Reading List"
          title="Books & Articles"
          description="Key ideas distilled from books and long-form articles I've read. Only the parts worth carrying forward."
          icon={BookOpen}
        />
        <EmptySection
          id="resources"
          eyebrow="Internet Finds"
          title="Online Resources"
          description="Useful tools, threads, videos, and rabbit holes from across the internet. Curated, not comprehensive."
          icon={Lightbulb}
        />
        <AboutSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  BookOpen,
  Brain,
  ChevronDown,
  Film,
  Globe,
  Instagram,
  Lightbulb,
  Linkedin,
  Mail,
  MessageSquare,
  Twitter,
  X,
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
      "A classic that didn't get the popular attention it deserved. A raw Brazilian film showing young boys in Rio's favelas swallowed by crime and gang wars — a reality that is still happening today.",
    review:
      "One of the classic movies, but not quite popular — and of a raw kind. A Brazilian film showcasing the lives of people in the ghettos and favelas of Rio de Janeiro.\n\nI don't remember the names of any character depicted, but that movie was a great experience. And the truth is, what it shows is still happening today. Young boys, kids — all pulled into crimes and gang wars. They haven't seen the good things life has to offer. They believe that's just life: cocaine, football, and maybe death before their 20th birthday.\n\nI enjoy watching this kind of film — it shows the raw reality of people from different parts of the world. I see it as a missed experience I'm getting virtually.\n\nBut arguably, their lives are purposeless, meaningless, and trapped. No real faith, with drugs and guns completely normalised. Cocaine, heroin, opium — these things make people slaves to their desires. As the Bhagavad Gita warns, being enslaved by our desires gradually leads to the loss of mind, consciousness, and rationality. Their bodies may exist, but not their minds.\n\nWhat made the direction remarkable: the director cast real hood members from the favelas to portray the characters — giving it an authenticity and rawness no conventional casting could replicate.",
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
      "A beautiful, peaceful movie — 75% humor, 15% emotional drama, and 10% reality check. It flows without sudden twists, following a man too nice for his own good and the life he builds because of it.",
    review:
      "Forrest Gump is a beautiful, peaceful movie — 75% humor, 15% emotional drama, and 10% reality check. It flows without sudden twists or surprises, and that's exactly what makes it work. It's a calm story with a happy ending that just feels good to watch.\n\nThe film follows a man who is perhaps too nice, too innocent for his own good. Society reminds him of that constantly. He faces bullies and social hardships not because he's bad, but because he's straightforwardly simple — almost too honest for a world that rewards pragmatism and self-expression. The lesson is clear: in today's world, those who can express themselves well and think and act pragmatically are the ones who tend to succeed.\n\nThe movie takes you through many chapters of his life — soldier, ping pong champion, shrimp boat captain — all told with the same warm, unhurried pace. He is too nice, and that affects his relationships too. He only manages to settle down and marry at the very end. And then she dies — implied to be HIV, though the film never names it directly. That part is genuinely sad.\n\nBut there is a certain truth to it: for every choice one makes, there is a consequence that follows. She lived freely and paid a price for it. That's not a judgment — it's just the reality the film quietly points to.\n\nGood and calm movie overall. Highly recommended.",
  },
];

type Movie = (typeof movies)[number];

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
          <button
            type="button"
            data-ocid="nav.contact.link"
            onClick={() => scrollTo("contact")}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-sm transition-all duration-150"
          >
            <Mail className="h-3.5 w-3.5" />
            Contact
          </button>
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
          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="flex items-center gap-2 px-3 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-sm transition-all duration-150 text-left"
          >
            <Mail className="h-4 w-4" />
            Contact
          </button>
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

        {/* Scroll down button */}
        <div className="fade-in mt-20 flex flex-col items-center gap-2">
          <button
            type="button"
            data-ocid="hero.scroll_down_button"
            aria-label="Scroll down"
            onClick={() =>
              document
                .getElementById("movies")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex flex-col items-center gap-2 text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-200 group"
          >
            <span className="text-xs font-medium tracking-widest uppercase">
              Scroll
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-muted-foreground/30 to-transparent" />
            <div className="w-6 h-6 rounded-full border border-muted-foreground/30 group-hover:border-muted-foreground/60 flex items-center justify-center transition-all duration-200 animate-bounce">
              <ChevronDown className="h-3.5 w-3.5" />
            </div>
          </button>
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

function MovieReviewDialog({
  movie,
  onClose,
}: {
  movie: Movie | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={movie !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        data-ocid="movies.dialog"
        className="max-w-xl w-full p-0 overflow-hidden rounded-sm gap-0 bg-white"
      >
        {/* Close button */}
        <button
          type="button"
          data-ocid="movies.close_button"
          onClick={onClose}
          aria-label="Close review"
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-150"
        >
          <X className="h-4 w-4" />
        </button>

        {movie && (
          <>
            {/* Header band */}
            <div className="bg-foreground text-background px-8 pt-8 pb-7">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-3">
                  <Film className="h-3.5 w-3.5 opacity-50" />
                  <span className="text-xs font-medium tracking-[0.2em] uppercase opacity-50">
                    Movie Review
                  </span>
                </div>
                <DialogTitle className="font-display text-2xl sm:text-3xl font-semibold leading-tight tracking-tight text-background">
                  {movie.title}
                  {movie.originalTitle && (
                    <span className="block text-sm font-normal italic opacity-60 mt-1">
                      {movie.originalTitle}
                    </span>
                  )}
                </DialogTitle>
              </DialogHeader>

              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-5">
                <span className="text-xs font-medium tracking-widest uppercase opacity-60">
                  {movie.country} · {movie.year}
                </span>
                <span className="text-xs opacity-40">·</span>
                <span className="text-xs font-medium opacity-60">
                  {movie.mood}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {movie.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full border border-background/20 text-background/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Body — plain div with visible native scrollbar */}
            <div className="relative">
              <div
                className="px-8 py-7"
                style={{
                  maxHeight: "55vh",
                  overflowY: "scroll",
                  scrollbarWidth: "auto",
                  scrollbarColor: "#888 #e5e7eb",
                }}
              >
                {movie.review.split("\n\n").map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 20)}
                    className="text-foreground leading-relaxed text-base mb-4 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}

                {movie.directorNote && (
                  <div className="mt-6 border-l-2 border-primary pl-4">
                    <p className="text-xs font-medium tracking-widest uppercase text-primary mb-1">
                      Director&apos;s Note
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      {movie.directorNote}
                    </p>
                  </div>
                )}
              </div>
              {/* Gradient fade hint — signals more content below */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-10"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, rgba(255,255,255,0.92))",
                }}
              />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function MoviesSection() {
  const ref = useFadeIn();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

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
                  onClick={() => setSelectedMovie(movie)}
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

      <MovieReviewDialog
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
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

function ContactSection() {
  const ref = useFadeIn();

  return (
    <section id="contact" className="py-24 sm:py-32" ref={ref}>
      <div className="container mx-auto max-w-3xl px-6">
        {/* Section header */}
        <div className="fade-in mb-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Mail className="h-4 w-4 text-primary" />
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-primary">
              Get in Touch
            </p>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-foreground mb-4">
            Contact & Inquiries
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Have a thought, a disagreement, or just want to say hello? I read
            every message.
          </p>
        </div>

        {/* Contact card */}
        <div className="fade-in fade-in-delay-1 relative border border-border rounded-sm p-10 sm:p-14 text-center overflow-hidden group hover:-translate-y-0.5 transition-transform duration-200">
          {/* Subtle ambient glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-primary/[0.03] to-transparent" />

          {/* Icon */}
          <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center mx-auto mb-8 bg-muted/30 group-hover:border-primary/40 transition-colors duration-200">
            <Mail className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
          </div>

          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">
            Send a message
          </p>

          <a
            href="mailto:dakshesh236@gmail.com"
            data-ocid="contact.link"
            className="font-display text-2xl sm:text-3xl font-semibold text-foreground hover:text-primary transition-colors duration-150 inline-flex items-center gap-3 group/link"
          >
            dakshesh236@gmail.com
            <ArrowRight className="h-5 w-5 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all duration-150" />
          </a>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px flex-1 max-w-16 bg-border" />
            <p className="text-xs text-muted-foreground/60 tracking-wide">
              Replies within a day or two
            </p>
            <div className="h-px flex-1 max-w-16 bg-border" />
          </div>
        </div>
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
    { label: "Contact", id: "contact" },
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
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

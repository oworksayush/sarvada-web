import { ReactNode, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SiteImage } from "@/data/images";

const ease = [0.22, 1, 0.36, 1] as const;

export const Reveal = ({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.75, delay, ease }}
    >
      {children}
    </motion.div>
  );
};

/** Headline with line-by-line reveal. Pass lines as array. */
export const LineReveal = ({ lines, className, as: Tag = "h2", delay = 0 }: { lines: ReactNode[]; className?: string; as?: "h1" | "h2" | "h3"; delay?: number }) => {
  const reduce = useReducedMotion();
  const M = motion[Tag];
  // Observe the heading itself (clipped children never intersect).
  return (
    <M className={className} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true }}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            variants={{ hidden: { y: "105%" }, show: { y: 0, transition: { duration: 0.9, delay: delay + i * 0.09, ease } } }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </M>
  );
};

/** Landscape window — clipped reveal, scale settles 1.04 → 1, optional gentle parallax. */
export const ImageWindow = ({ img, className, parallax = false, priority = false, imgClassName }: { img: SiteImage; className?: string; parallax?: boolean; priority?: boolean; imgClassName?: string }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden bg-secondary group", className)}
      initial={reduce ? false : { clipPath: "inset(8% 6% 8% 6%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.2, ease }}
    >
      <motion.img
        src={img.src}
        alt={img.alt}
        width={img.w}
        height={img.h}
        loading={priority ? "eager" : "lazy"}
        style={parallax && !reduce ? { y, scale: 1.1 } : undefined}
        initial={reduce || parallax ? false : { scale: 1.04 }}
        whileInView={parallax ? undefined : { scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease }}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </motion.div>
  );
};

export const Chapter = ({ n, label, className, light }: { n: string; label: string; className?: string; light?: boolean }) => (
  <p className={cn("label flex items-center gap-3", light ? "text-forest-foreground/70" : "text-muted-foreground", className)}>
    <span className={light ? "text-gold" : "text-primary"}>{n}</span>
    <span aria-hidden className={cn("h-px w-8", light ? "bg-forest-foreground/30" : "bg-foreground/25")} />
    <span>{label}</span>
  </p>
);

/** Botanical contour line — leaf and land-contour inspired. */
export const Contour = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden className={cn("h-16 w-full text-gold/60", className)} fill="none">
    <path d="M0 80 C 180 80, 240 30, 420 40 S 640 100, 820 70 S 1060 10, 1200 40 S 1380 80, 1440 60" stroke="currentColor" strokeWidth="1" />
    <path d="M820 70 C 840 40, 880 30, 905 38 C 885 55, 850 68, 820 70 Z" stroke="currentColor" strokeWidth="1" />
    <path d="M820 70 C 860 60, 880 48, 905 38" stroke="currentColor" strokeWidth="0.75" />
  </svg>
);

type CtaProps = { to: string; children: ReactNode; variant?: "solid" | "outline" | "ivory" | "link"; className?: string };
export const Cta = ({ to, children, variant = "solid", className }: CtaProps) => {
  const base = "group inline-flex items-center gap-3 text-sm font-medium tracking-wide transition-colors duration-300";
  const styles = {
    solid: "bg-primary text-primary-foreground hover:bg-forest px-7 py-4",
    outline: "border border-current px-7 py-4 hover:bg-foreground hover:text-background",
    ivory: "bg-ivory text-forest hover:bg-secondary px-7 py-4",
    link: "border-b border-current pb-1",
  }[variant];
  return (
    <Link to={to} className={cn(base, styles, className)}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
    </Link>
  );
};

export const IllustrativeNote = ({ className, light }: { className?: string; light?: boolean }) => (
  <p className={cn("text-[11px] italic", light ? "text-forest-foreground/60" : "text-muted-foreground", className)}>Illustrative imagery</p>
);

export const PageHero = ({ chapter, title, intro, img }: { chapter: string; title: ReactNode[]; intro?: string; img: SiteImage }) => (
  <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-forest text-forest-foreground">
    <img src={img.src} alt={img.alt} width={img.w} height={img.h} className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-scrim" />
    <div className="wrap relative pb-16 pt-40 lg:pb-24">
      <p className="label mb-6 text-forest-foreground/80">{chapter}</p>
      <LineReveal as="h1" lines={title} className="t-xl max-w-4xl" />
      {intro && <Reveal delay={0.4}><p className="measure mt-8 text-lg text-forest-foreground/85">{intro}</p></Reveal>}
    </div>
  </section>
);

import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { nav } from "@/data/site";

export const Logo = ({ className }: { className?: string }) => (
  <span className={cn("flex flex-col leading-none", className)}>
    <span className="font-display text-[1.6rem] font-medium tracking-[0.22em]">SARVADA</span>
    <span className="mt-1 text-[9px] uppercase tracking-[0.32em] opacity-70">Room for a fuller life</span>
  </span>
);

const Header = ({ overlay = true }: { overlay?: boolean }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
      if (e.key === "Tab" && menuRef.current) {
        const els = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a,button"));
        const all = [toggleRef.current!, ...els];
        const i = all.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); all[all.length - 1].focus(); }
        else if (!e.shiftKey && i === all.length - 1) { e.preventDefault(); all[0].focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const solid = scrolled || !overlay;
  const light = !solid || open;

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-colors duration-300", open ? "bg-forest" : solid ? "bg-background/95 shadow-[0_1px_0_hsl(var(--border))] backdrop-blur" : "bg-transparent")}>
      <div className={cn("wrap flex items-center justify-between gap-6 py-4 lg:py-5", light ? "text-forest-foreground" : "text-forest")}>
        <Link to="/" aria-label="Sarvada home" className="shrink-0"><Logo /></Link>
        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-8">
            {nav.slice(1).map((n) => (
              <li key={n.to}>
                <NavLink to={n.to} className={({ isActive }) => cn("label relative py-2 transition-opacity hover:opacity-70", isActive && "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-current")}>
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/contact" className={cn("label hidden border px-5 py-3 transition-colors sm:inline-block", light ? "border-forest-foreground/50 hover:bg-forest-foreground hover:text-forest" : "border-primary bg-primary text-primary-foreground hover:bg-forest")}>
            Book a Site Visit
          </Link>
          <button ref={toggleRef} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" className="label xl:hidden py-2">
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label="Site navigation"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-[72px] overflow-y-auto bg-forest text-forest-foreground xl:hidden">
            <nav className="wrap flex min-h-full flex-col justify-between py-10">
              <ul className="space-y-2">
                {nav.map((n, i) => (
                  <li key={n.to}>
                    <NavLink to={n.to} end className={({ isActive }) => cn("flex items-baseline gap-4 py-2 font-display text-4xl sm:text-5xl", isActive ? "text-gold" : "")}>
                      <span className="label text-forest-foreground/50">0{i + 1}</span>{n.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="label mt-10 inline-block self-start bg-ivory px-7 py-4 text-forest">Book a Site Visit</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Header;

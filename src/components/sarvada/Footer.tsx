import { Link } from "react-router-dom";
import { company, nav } from "@/data/site";
import { Contour, Cta } from "./primitives";

const Footer = () => (
  <footer className="bg-forest text-forest-foreground">
    <Contour className="text-gold/40" />
    <div className="wrap pb-10 pt-16 lg:pt-24">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="font-display text-[clamp(4rem,14vw,11rem)] font-light leading-[0.85] tracking-[0.08em]">SARVADA</p>
          <p className="mt-8 max-w-md font-display text-2xl italic text-forest-foreground/85">{company.tagline}</p>
        </div>
        <div className="grid grid-cols-2 gap-10 lg:col-span-5">
          <nav aria-label="Footer">
            <p className="label mb-5 text-gold">Explore</p>
            <ul className="space-y-3 text-sm">
              {nav.map((n) => <li key={n.to}><Link to={n.to} className="text-forest-foreground/80 hover:text-forest-foreground">{n.label}</Link></li>)}
            </ul>
          </nav>
          <div>
            <p className="label mb-5 text-gold">Visit</p>
            <p className="text-sm text-forest-foreground/80">Chikkaballapur district, Karnataka.</p>
            {company.phone && <p className="mt-2 text-sm">{company.phone}</p>}
            {company.email && <p className="mt-2 text-sm">{company.email}</p>}
            <Cta to="/contact" variant="link" className="mt-6 text-forest-foreground">Book a Site Visit</Cta>
          </div>
        </div>
      </div>
      <div className="mt-20 flex flex-col gap-3 border-t border-forest-foreground/15 pt-6 text-xs text-forest-foreground/60 md:flex-row md:justify-between">
        <p>&copy; {new Date().getFullYear()} {company.legalName}. All rights reserved.</p>
        {company.privacyUrl && <a href={company.privacyUrl}>Privacy</a>}
        <p>Imagery on this website is illustrative and does not depict the project site.</p>
      </div>
    </div>
  </footer>
);
export default Footer;

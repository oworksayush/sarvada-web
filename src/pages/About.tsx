import Layout from "@/components/sarvada/Layout";
import Invitation from "@/components/sarvada/Invitation";
import { Chapter, Contour, ImageWindow, LineReveal, PageHero, Reveal } from "@/components/sarvada/primitives";
import { images } from "@/data/images";

const principles = [
  { t: "Responsible development", c: "Planning that respects the land it sits within.", d: "M10 50 L50 10 L90 50 M25 50 V85 H75 V50" },
  { t: "Nature-first planning", c: "Plantation buffers, open space and privacy before density.", d: "M50 90 V40 M50 40 C 20 35, 15 10, 30 5 C 50 10, 55 30, 50 40 M50 55 C 75 50, 85 30, 75 20 C 60 22, 52 40, 50 55" },
  { t: "Long-term thinking", c: "Places intended to be lived in and returned to over years.", d: "M10 80 C 30 60, 45 70, 60 50 S 85 25, 90 15 M10 90 H90" },
];

const About = () => (
  <Layout>
    <PageHero chapter="About Sarvada" img={images.pathway} title={["Rooted in nature.", <em key="t" className="italic">Thoughtfully looking ahead.</em>]} />

    <section className="wrap grid gap-12 py-24 lg:grid-cols-12 lg:py-36">
      <div className="lg:col-span-4"><Chapter n="01" label="Our Story" /></div>
      <Reveal className="lg:col-span-7">
        <p className="font-display text-3xl font-light leading-snug text-forest lg:text-4xl">Sarvada began with a simple belief: that a fuller life needs room — room to breathe, to gather, and to return to nature.</p>
        <p className="measure mt-8 text-muted-foreground">Sarvada Assets Pvt. Ltd. is creating farm-themed plotted developments for people who want a personal countryside retreat within reach of Bengaluru. Our current project, Sarvada Farm Theme, is proposed in Chikkaballapur district.</p>
      </Reveal>
    </section>

    <section className="bg-secondary py-24 lg:py-36">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Chapter n="02" label="Why Sarvada Exists" className="mb-10" />
          <LineReveal lines={["Cities give us much.", <em key="s" className="italic">Space is rarely one of them.</em>]} className="t-lg text-forest" />
          <Reveal delay={0.2}><p className="measure mt-8 text-muted-foreground">Sarvada exists to offer a counterpoint — land that is planned with care, where privacy, greenery and community are part of the design from the beginning.</p></Reveal>
        </div>
        <ImageWindow img={images.leaves} className="aspect-[4/5] lg:col-span-5 lg:col-start-8" />
      </div>
    </section>

    <section className="wrap py-24 lg:py-36">
      <Chapter n="03" label="Our Philosophy" className="mb-14" />
      <div className="grid gap-px bg-border md:grid-cols-3">
        {principles.map((p, i) => (
          <Reveal key={p.t} delay={i * 0.1} className="bg-background p-8 lg:p-12">
            <svg viewBox="0 0 100 100" className="mb-10 h-16 w-16 text-primary" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden><path d={p.d} /></svg>
            <h3 className="t-md text-forest">{p.t}</h3>
            <p className="mt-4 text-muted-foreground">{p.c}</p>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">These are brand principles that guide our planning, not certifications.</p>
    </section>

    <section className="bg-forest py-24 text-forest-foreground lg:py-36">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4"><Chapter n="04" label="Founder & Experience" light /></div>
        <Reveal className="lg:col-span-7">
          <p className="label mb-4 text-gold">Founder</p>
          <h2 className="t-xl">Mr. Bharatesh</h2>
          <p className="measure mt-8 text-lg text-forest-foreground/80">Sarvada is led by Mr. Bharatesh, who brings more than 20 years of experience in layouts and real-estate development to the company’s planning and delivery.</p>
        </Reveal>
      </div>
    </section>

    <section className="wrap grid gap-12 py-24 lg:grid-cols-12 lg:py-36">
      <ImageWindow img={images.heroHills} parallax className="aspect-[16/10] lg:col-span-7" />
      <div className="lg:col-span-4 lg:col-start-9 lg:self-center">
        <Chapter n="05" label="Looking Ahead" className="mb-8" />
        <h2 className="t-md text-forest">Our hope is to create more places like this — thoughtfully planned communities where nature comes first.</h2>
        <p className="mt-6 text-muted-foreground">Future communities are an aspiration; details will be shared only when they are ready.</p>
      </div>
    </section>
    <div className="wrap"><Contour /></div>
    <Invitation title={["Begin with the", <em key="c" className="italic">current project.</em>]} copy="See Sarvada Farm Theme in person and discover whether it feels like your kind of place." />
  </Layout>
);
export default About;

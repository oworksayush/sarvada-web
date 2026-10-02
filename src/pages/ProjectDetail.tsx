import Layout from "@/components/sarvada/Layout";
import Invitation from "@/components/sarvada/Invitation";
import { Chapter, IllustrativeNote, ImageWindow, PageHero, Reveal } from "@/components/sarvada/primitives";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { images } from "@/data/images";
import { project } from "@/data/site";

const planning = [
  { t: "Plantation buffers", c: "Green buffers planned between plots for privacy and shade." },
  { t: "Clubhouse set apart", c: "The proposed clubhouse is positioned away from the plots, so gatherings don’t disturb home life." },
  { t: "Lake-facing wellness", c: "A proposed wellness zone oriented towards the lake setting." },
  { t: "Away from the highway", c: "Planning intended to keep plots separated from highway activity." },
];
const amenities = ["Lake-facing club area (proposed)", "Wellness retreats, yoga and meditation (planned)", "Family events and occasions (planned)", "Weekend organic markets (planned)", "Staycation cottages (future phase)"];
const faqs = [
  { q: "Where is the project?", a: "Sarvada Farm Theme is proposed in Chikkaballapur district, in the North Bengaluru region. Directions are shared when you arrange a site visit." },
  { q: "What plot sizes are proposed?", a: "Plots are proposed starting from 5,400 sq. ft., across a planned 100 plots on a proposed 25-acre development." },
  { q: "What club experiences are planned?", a: "Proposed experiences include wellness retreats, yoga, meditation, family events and weekend organic markets. Staycation cottages are a future phase." },
  { q: "How can I arrange a site visit?", a: "Send a request through our contact page. Our team will contact you to confirm a suitable time — a request is not a confirmed appointment." },
  { q: "How can I request current pricing and approval documentation?", a: "Ask our team for current pricing, approval status and documentation. Construction permissions, maintenance inclusions and commercial terms are shared through current project documents." },
];

const ProjectDetail = () => (
  <Layout>
    <PageHero chapter={`Current Project · ${project.descriptor}`} img={images.heroHills} title={[project.name]} intro="A proposed countryside community in Chikkaballapur, planned around privacy, greenery and a lake-facing club." />

    <section className="wrap py-20 lg:py-28">
      <Chapter n="01" label="Proposed Facts" className="mb-10" />
      <dl className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
        {project.facts.map((f) => (
          <div key={f.label} className="border-l border-border pl-5">
            <dd className="font-display text-5xl font-light text-forest lg:text-6xl">{f.value}<span className="ml-1 text-xl">{f.unit}</span></dd>
            <dt className="mt-2 text-sm text-muted-foreground">{f.label}</dt>
          </div>
        ))}
      </dl>
      <p className="mt-8 text-xs text-muted-foreground">All figures are proposed and subject to change. Request current pricing and project details.</p>
    </section>

    <section className="bg-secondary py-20 lg:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Chapter n="02" label="Location" className="mb-8" />
          <h2 className="t-lg text-forest">Chikkaballapur, <em className="italic">North Bengaluru.</em></h2>
          <p className="measure mt-6 text-muted-foreground">A region of granite hills and farmland, connected to the city. Any travel estimates are indicative and depend on route and traffic; directions are shared when you arrange your visit.</p>
        </div>
        <ImageWindow img={images.pathway} className="aspect-[4/3] lg:col-span-6 lg:col-start-7" />
      </div>
    </section>

    <section className="wrap py-20 lg:py-28">
      <Chapter n="03" label="Peace-First Planning" className="mb-12" />
      <div className="grid gap-12 lg:grid-cols-12">
        <ol className="space-y-10 lg:col-span-6">
          {planning.map((p, i) => (
            <Reveal key={p.t} className="flex gap-6 border-t border-border pt-6">
              <span className="label text-primary">0{i + 1}</span>
              <div><h3 className="t-md text-forest">{p.t}</h3><p className="mt-2 text-muted-foreground">{p.c}</p></div>
            </Reveal>
          ))}
        </ol>
        <figure className="lg:col-span-5 lg:col-start-8">
          <svg viewBox="0 0 400 400" className="w-full bg-secondary" role="img" aria-label="Conceptual zoning sketch showing plots, plantation buffers, and a club area by the lake">
            <path d="M40 360 C 120 380, 300 380, 360 330 L 370 80 C 300 30, 120 20, 40 60 Z" fill="none" stroke="hsl(var(--forest))" strokeWidth="1.2" />
            {Array.from({ length: 18 }).map((_, i) => (
              <rect key={i} x={70 + (i % 6) * 40} y={100 + Math.floor(i / 6) * 60} width="30" height="42" fill="none" stroke="hsl(var(--stone))" strokeWidth="0.8" />
            ))}
            {[90, 150, 210].map((y) => <path key={y} d={`M60 ${y + 52} H320`} stroke="hsl(var(--lime))" strokeWidth="5" strokeDasharray="2 6" strokeLinecap="round" />)}
            <ellipse cx="290" cy="320" rx="55" ry="28" fill="hsl(var(--primary) / 0.12)" stroke="hsl(var(--primary))" strokeWidth="0.8" />
            <rect x="200" y="300" width="40" height="26" fill="none" stroke="hsl(var(--gold))" strokeWidth="1.2" />
            <text x="290" y="324" textAnchor="middle" fontSize="10" fill="hsl(var(--forest))">Lake</text>
            <text x="220" y="342" textAnchor="middle" fontSize="9" fill="hsl(var(--forest))">Club</text>
          </svg>
          <figcaption className="mt-3 text-xs italic text-muted-foreground">Concept illustration — not an approved layout.</figcaption>
        </figure>
      </div>
    </section>

    <section className="bg-forest py-20 text-forest-foreground lg:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Chapter n="04" label="Proposed Amenities" light className="mb-8" />
          <ul className="divide-y divide-forest-foreground/15 border-y border-forest-foreground/15">
            {amenities.map((a) => <li key={a} className="py-4 font-display text-2xl">{a}</li>)}
          </ul>
        </div>
        <ImageWindow img={images.clubPavilion} className="aspect-[4/3] lg:col-span-6 lg:col-start-7" />
      </div>
    </section>

    <section className="wrap py-20 lg:py-28">
      <Chapter n="05" label="Gallery" className="mb-10" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        <ImageWindow img={images.lakeEvening} className="col-span-2 aspect-[16/10]" />
        <ImageWindow img={images.leaves} className="aspect-[3/4]" />
        <ImageWindow img={images.morning} className="aspect-[3/4]" />
      </div>
      <IllustrativeNote className="mt-3" />
    </section>

    <section className="bg-secondary py-20 lg:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4"><Chapter n="06" label="Questions" className="mb-6" /><h2 className="t-lg text-forest">Project information</h2></div>
        <Accordion type="single" collapsible className="lg:col-span-7 lg:col-start-6">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`f${i}`} className="border-foreground/15">
              <AccordionTrigger className="py-6 text-left font-display text-2xl font-normal text-forest hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="measure text-base text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>

    <Invitation title={["Request details,", <em key="v" className="italic">or walk the land.</em>]} copy="Request current pricing and project details, or plan a private site visit." cta="Request Details & Visit" />
  </Layout>
);
export default ProjectDetail;

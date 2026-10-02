import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Layout from "@/components/sarvada/Layout";
import Invitation from "@/components/sarvada/Invitation";
import { Chapter, Contour, Cta, IllustrativeNote, ImageWindow, LineReveal, Reveal } from "@/components/sarvada/primitives";
import { images } from "@/data/images";
import { project } from "@/data/site";

const story = [
  { title: "Room to breathe.", copy: "Open skies, unhurried mornings and the quiet of land given space. A setting planned around plantation buffers and privacy.", img: images.heroHills },
  { title: "Room to belong.", copy: "A like-minded community, gathered around a proposed lake-facing club, family occasions and weekend markets.", img: images.together },
  { title: "Room to make it your own.", copy: "A plot to imagine your own countryside retreat — shaped by you, within the project’s guidelines.", img: images.retreat },
];

const RoomStory = () => {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const reduce = useReducedMotion();
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))), { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  return (
    <section className="bg-secondary py-24 lg:py-0" aria-label="Room for a fuller life">
      <div className="wrap lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="hidden lg:col-span-7 lg:block">
          <div className={reduce ? "py-24" : "sticky top-0 flex h-screen items-center py-24"}>
            <div className="relative aspect-[4/5] w-full overflow-hidden xl:aspect-[5/5]">
              <AnimatePresence initial={false}>
                <motion.img key={active} src={story[active].img.src} alt={story[active].img.alt}
                  initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover" />
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <Chapter n="02" label="Room for…" className="mb-12 lg:hidden" />
          {story.map((s, i) => (
            <div key={s.title} ref={(el) => (refs.current[i] = el)} data-i={i} className="mb-20 lg:mb-0 lg:flex lg:min-h-screen lg:flex-col lg:justify-center">
              <ImageWindow img={s.img} className="mb-8 aspect-[4/3] lg:hidden" />
              <p className="label mb-6 text-primary">0{i + 1} / 03</p>
              <h3 className="t-lg text-forest">{s.title}</h3>
              <p className="measure mt-6 text-muted-foreground">{s.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  const reduce = useReducedMotion();
  return (
    <Layout>
      {/* A. Opening */}
      <section className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden bg-forest text-forest-foreground">
        <motion.img src={images.heroHills.src} alt={images.heroHills.alt} width={1920} height={1088}
          initial={reduce ? false : { scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover object-[60%_center]" />
        <div className="absolute inset-0 bg-scrim" />
        <div className="wrap relative pb-24 lg:pb-28">
          <p className="label mb-8 text-forest-foreground/80">Chikkaballapur · North Bengaluru</p>
          <LineReveal as="h1" delay={0.2} className="t-hero max-w-5xl" lines={["There is more to life", "when there is more", <em key="r" className="italic">room for it.</em>]} />
          <Reveal delay={0.7} className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-lg text-forest-foreground/90">Discover a slower rhythm of living through thoughtfully planned farm communities near North Bengaluru.</p>
            <div className="flex flex-wrap gap-3">
              <Cta to={`/projects/${project.slug}`} variant="ivory">Explore the Project</Cta>
              <Cta to="/contact" variant="outline" className="border-forest-foreground/60 hover:bg-forest-foreground hover:text-forest">Book a Site Visit</Cta>
            </div>
          </Reveal>
        </div>
        <div aria-hidden className="absolute bottom-6 left-1/2 hidden h-10 w-px -translate-x-1/2 bg-forest-foreground/40 md:block" />
      </section>

      {/* B. Brand intro */}
      <section className="wrap grid gap-12 py-24 lg:grid-cols-12 lg:py-40">
        <div className="lg:col-span-5">
          <Chapter n="01" label="The Land" className="mb-10" />
          <LineReveal lines={["A different kind", <em key="r" className="italic">of richness.</em>]} className="t-xl text-forest" />
          <Reveal delay={0.2}><p className="measure mt-10 text-lg text-muted-foreground">Space to pause. Nature to return to. A place to imagine your own retreat, and a community to share it with.</p></Reveal>
        </div>
        <div className="relative lg:col-span-6 lg:col-start-7">
          <ImageWindow img={images.lakeEvening} parallax className="aspect-[4/3]" />
          <ImageWindow img={images.leaves} className="-mt-20 ml-auto aspect-[4/5] w-2/5 border-8 border-background lg:-ml-24 lg:mr-0 lg:w-1/3" />
          <IllustrativeNote className="mt-3" />
        </div>
      </section>

      {/* C. Current project */}
      <section className="bg-background pb-24 lg:pb-36">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-6 border-t border-border pt-10 md:flex-row md:items-end">
            <div>
              <p className="label mb-4 text-primary">Current project · {project.descriptor}</p>
              <h2 className="t-lg text-forest">{project.name}</h2>
              <p className="mt-3 font-display text-2xl italic text-muted-foreground">A proposed countryside community in Chikkaballapur.</p>
            </div>
            <Cta to={`/projects/${project.slug}`} variant="link" className="text-forest">Explore the Project</Cta>
          </div>
          <ImageWindow img={images.heroHills} parallax className="mt-12 aspect-[16/9] lg:aspect-[21/9]" />
          <dl className="mt-12 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {project.facts.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.08} className="border-l border-border pl-5">
                <dd className="font-display text-5xl font-light text-forest lg:text-6xl">{f.value}<span className="ml-1 text-xl">{f.unit}</span></dd>
                <dt className="mt-2 text-sm text-muted-foreground">{f.label}</dt>
              </Reveal>
            ))}
          </dl>
          <p className="mt-8 text-xs text-muted-foreground">All figures are proposed and subject to change. Request current pricing and project details.</p>
        </div>
      </section>

      {/* D. Room for... */}
      <RoomStory />

      {/* E. The Sarvada Life */}
      <section className="wrap py-24 lg:py-40">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Chapter n="03" label="The Life" className="mb-10" />
            <LineReveal lines={["A life that feels", <em key="a" className="italic">a little fuller.</em>]} className="t-lg text-forest" />
            <Reveal delay={0.2}><Cta to="/life" variant="link" className="mt-10 text-forest">The Sarvada Life</Cta></Reveal>
          </div>
          <div className="grid grid-cols-6 gap-4 lg:col-span-8 lg:gap-6">
            {[
              { img: images.morning, t: "Slow mornings", c: "col-span-3 aspect-[3/4] lg:mt-24" },
              { img: images.together, t: "Time together", c: "col-span-3 aspect-[3/4]" },
              { img: images.lakeEvening, t: "Evenings that linger", c: "col-span-6 aspect-[16/8] lg:col-span-5 lg:col-start-2" },
            ].map((x) => (
              <figure key={x.t} className={x.c}>
                <ImageWindow img={x.img} className="h-full" />
                <figcaption className="mt-3 font-display text-xl italic text-forest">{x.t}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* F. Club */}
      <section className="bg-forest text-forest-foreground">
        <div className="wrap grid gap-12 py-24 lg:grid-cols-12 lg:py-36">
          <ImageWindow img={images.clubPavilion} parallax className="aspect-[4/3] lg:order-2 lg:col-span-7 lg:col-start-6" />
          <div className="lg:col-span-4 lg:self-end">
            <Chapter n="04" label="The Community" light className="mb-10" />
            <LineReveal lines={["More than", <em key="c" className="italic">a clubhouse.</em>]} className="t-xl" />
            <Reveal delay={0.2}>
              <p className="mt-8 text-lg text-forest-foreground/80">A vision for gathering, wellbeing, and shared experiences — shaped around a proposed lake-facing setting.</p>
              <Cta to="/club" variant="ivory" className="mt-10">Discover Sarvada Club</Cta>
            </Reveal>
          </div>
        </div>
      </section>

      {/* G. Location */}
      <section className="wrap py-24 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Chapter n="05" label="The Place" className="mb-10" />
            <LineReveal lines={["Away from the rush.", <em key="w" className="italic">Within reach of the city.</em>]} className="t-xl text-forest" />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="text-lg text-muted-foreground">Chikkaballapur district sits in the North Bengaluru region — a landscape of granite hills, farmland and open sky, while remaining connected to the city.</p>
            <p className="mt-6 text-sm text-muted-foreground">Directions are shared when you arrange your visit.</p>
          </Reveal>
        </div>
        <Contour className="mt-16" />
      </section>

      {/* H. Invitation */}
      <Invitation />
    </Layout>
  );
};
export default Index;

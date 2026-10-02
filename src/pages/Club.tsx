import Layout from "@/components/sarvada/Layout";
import { Chapter, Cta, ImageWindow, PageHero, Reveal } from "@/components/sarvada/primitives";
import { images } from "@/data/images";

const chapters = [
  { t: "Wellness", c: "Proposed yoga, meditation and wellness experiences in a calm, lake-facing setting.", img: images.clubPavilion },
  { t: "Gather", c: "Planned family occasions and community events — reasons to come together.", img: images.together },
  { t: "Taste", c: "Proposed weekend organic markets and food experiences, rooted in the season.", img: images.leaves },
  { t: "Stay", c: "Staycation cottages for friends and family.", img: images.retreat, future: true },
  { t: "Connect", c: "Opportunities to meet a like-minded community who value space and nature.", img: images.lakeEvening },
];

const Club = () => (
  <Layout>
    <PageHero chapter="Sarvada Club · Proposed" img={images.clubPavilion} title={["Gather well.", <em key="g" className="italic">Live a little slower.</em>]} intro="Sarvada Club is a proposed experience planned on a 2.5-acre lake-facing area, positioned away from the plots." />

    <section className="py-12 lg:py-24">
      {chapters.map((ch, i) => (
        <article key={ch.t} className="wrap grid items-center gap-10 py-14 lg:grid-cols-12 lg:py-20">
          <ImageWindow img={ch.img} className={`aspect-[4/3] lg:col-span-6 ${i % 2 ? "lg:order-2 lg:col-start-7" : ""}`} />
          <Reveal className={`lg:col-span-4 ${i % 2 ? "lg:col-start-2" : "lg:col-start-8"}`}>
            <Chapter n={`0${i + 1}`} label={ch.future ? "Future phase" : "Proposed"} className="mb-6" />
            <h2 className="t-xl text-forest">{ch.t}</h2>
            {ch.future && <p className="label mt-4 inline-block border border-gold px-3 py-1 text-gold">Future phase</p>}
            <p className="measure mt-6 text-lg text-muted-foreground">{ch.c}</p>
          </Reveal>
        </article>
      ))}
    </section>

    <section className="bg-forest text-forest-foreground">
      <div className="wrap py-24 text-center lg:py-32">
        <h2 className="t-lg mx-auto max-w-3xl">Interested in what the club could become?</h2>
        <p className="mx-auto mt-6 max-w-xl text-forest-foreground/80">Membership details, timelines and terms will be shared when available.</p>
        <Cta to="/contact?interest=sarvada_club" variant="ivory" className="mt-10">Enquire About Sarvada Club</Cta>
      </div>
    </section>
  </Layout>
);
export default Club;

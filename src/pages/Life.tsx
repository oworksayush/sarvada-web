import Layout from "@/components/sarvada/Layout";
import Invitation from "@/components/sarvada/Invitation";
import { Chapter, IllustrativeNote, ImageWindow, LineReveal, PageHero, Reveal } from "@/components/sarvada/primitives";
import { images } from "@/data/images";

const Life = () => (
  <Layout>
    <PageHero chapter="The Sarvada Life" img={images.morning} title={["A life that feels", <em key="l" className="italic">a little fuller.</em>]} intro="A journal from morning to evening — the kind of days that more room makes possible." />

    {/* 01 */}
    <section className="wrap grid gap-12 py-24 lg:grid-cols-12 lg:py-36">
      <ImageWindow img={images.morning} className="aspect-[4/5] lg:col-span-5" />
      <Reveal className="lg:col-span-5 lg:col-start-8 lg:self-center">
        <Chapter n="01" label="Morning" className="mb-8" />
        <h2 className="t-xl text-forest">Slow <em className="italic">mornings.</em></h2>
        <p className="measure mt-6 text-lg text-muted-foreground">Filtered light, a warm cup, and nowhere you need to be just yet. Space to pause before the day begins.</p>
      </Reveal>
    </section>

    {/* 02 full width */}
    <section>
      <ImageWindow img={images.together} parallax className="aspect-[16/10] lg:aspect-[21/9]" />
      <div className="wrap grid gap-8 py-16 lg:grid-cols-12 lg:py-24">
        <Chapter n="02" label="Midday" className="lg:col-span-3" />
        <h2 className="t-lg text-forest lg:col-span-5">Time <em className="italic">together.</em></h2>
        <p className="text-muted-foreground lg:col-span-4">Unhurried meals with family and friends, and conversations that run as long as they need to.</p>
      </div>
    </section>

    {/* 03 text pause */}
    <section className="bg-secondary py-28 lg:py-40">
      <div className="wrap max-w-4xl text-center">
        <Chapter n="03" label="Afternoon" className="mb-10 justify-center" />
        <LineReveal lines={["Your own", <em key="r" className="italic">retreat.</em>]} className="t-xl text-forest" />
        <Reveal delay={0.2}><p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground">The possibility of creating a personal countryside place — subject to applicable project guidelines.</p></Reveal>
      </div>
    </section>
    <section className="wrap grid gap-6 py-24 lg:grid-cols-12">
      <ImageWindow img={images.retreat} className="aspect-[4/3] lg:col-span-8" />
      <div className="lg:col-span-3 lg:col-start-10 lg:self-end"><ImageWindow img={images.leaves} className="aspect-[3/4]" /><IllustrativeNote className="mt-3" /></div>
    </section>

    {/* 04 dark */}
    <section className="bg-forest py-24 text-forest-foreground lg:py-36">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4 lg:self-end">
          <Chapter n="04" label="Evening" light className="mb-8" />
          <h2 className="t-xl">Evenings that <em className="italic">linger.</em></h2>
          <p className="mt-6 text-lg text-forest-foreground/80">Warm light over the landscape, and the easy company of an evening outdoors.</p>
        </Reveal>
        <ImageWindow img={images.lakeEvening} parallax className="aspect-[4/3] lg:col-span-7 lg:col-start-6" />
      </div>
    </section>

    {/* 05 */}
    <section className="wrap grid gap-12 py-24 lg:grid-cols-12 lg:py-36">
      <div className="lg:col-span-6">
        <Chapter n="05" label="Weekend" className="mb-8" />
        <LineReveal lines={["Weekends worth", <em key="s" className="italic">staying for.</em>]} className="t-xl text-forest" />
      </div>
      <Reveal className="lg:col-span-5 lg:col-start-8 lg:self-end">
        <p className="text-lg text-muted-foreground">Nature, connection and the rhythm of a slower day — the reason to leave the city on Friday, and the reason it’s hard to leave on Sunday.</p>
      </Reveal>
    </section>
    <Invitation />
  </Layout>
);
export default Life;

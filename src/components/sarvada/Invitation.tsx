import { images } from "@/data/images";
import { Cta, ImageWindow, LineReveal, Reveal } from "./primitives";

const Invitation = ({ title = ["Some places are", <em key="f" className="italic">better felt.</em>], copy = "Walk the land. Take in the setting. Discover whether Sarvada feels like your kind of place.", cta = "Plan Your Visit" }: { title?: React.ReactNode[]; copy?: string; cta?: string }) => (
  <section className="wrap grid items-center gap-12 py-24 lg:grid-cols-12 lg:py-36">
    <div className="lg:col-span-6 lg:col-start-1">
      <LineReveal lines={title} className="t-xl text-forest" />
      <Reveal delay={0.2}>
        <p className="measure mt-8 text-lg text-muted-foreground">{copy}</p>
        <Cta to="/contact" className="mt-10">{cta}</Cta>
        <p className="mt-5 text-xs text-muted-foreground">A visit request is not a confirmed appointment — our team will contact you to arrange it.</p>
      </Reveal>
    </div>
    <ImageWindow img={images.pathway} className="aspect-[4/5] lg:col-span-5 lg:col-start-8" />
  </section>
);
export default Invitation;

import Layout from "@/components/sarvada/Layout";
import Invitation from "@/components/sarvada/Invitation";
import { Chapter, Cta, IllustrativeNote, ImageWindow, PageHero, Reveal } from "@/components/sarvada/primitives";
import { images } from "@/data/images";
import { project, projects } from "@/data/site";

const Projects = () => {
  const previous = projects.filter((p) => p.status === "previous" && p.published);
  return (
    <Layout>
      <PageHero chapter="Our Projects" img={images.lakeEvening} title={["Places to", <em key="p" className="italic">put down roots.</em>]} intro="Discover Sarvada’s vision for thoughtfully planned farm communities." />

      <section className="wrap py-24 lg:py-36">
        <Chapter n="01" label="Current Project" className="mb-12" />
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ImageWindow img={images.retreat} className="aspect-[4/3]" />
            <IllustrativeNote className="mt-3" />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <p className="label text-primary">{project.descriptor}</p>
            <h2 className="t-lg mt-4 text-forest">{project.name}</h2>
            <p className="mt-4 text-muted-foreground">{project.location}</p>
            <dl className="mt-10 divide-y divide-border border-y border-border">
              {[["Proposed scale", "25 acres · 100 planned plots"], ["Plots from", "5,400 sq. ft."], ["Proposed club", "2.5-acre lake-facing area"], ["Pricing", "Request current details"]].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-4 text-sm"><dt className="text-muted-foreground">{k}</dt><dd className="text-right text-forest">{v}</dd></div>
              ))}
            </dl>
            <Cta to={`/projects/${project.slug}`} className="mt-10">Explore the Project</Cta>
          </Reveal>
        </div>
      </section>

      {previous.length > 0 && (
        <section className="wrap py-24"><Chapter n="02" label="Previous Developments" /></section>
      )}

      <section className="bg-secondary">
        <div className="wrap py-24 text-center lg:py-32">
          <p className="label text-muted-foreground">Upcoming Communities</p>
          <p className="t-lg mx-auto mt-6 max-w-2xl text-forest">More places to belong. <em className="italic">Details to follow.</em></p>
        </div>
      </section>
      <Invitation />
    </Layout>
  );
};
export default Projects;

import Layout from "@/components/sarvada/Layout";
import { Cta } from "@/components/sarvada/primitives";

const NotFound = () => (
  <Layout overlay={false}>
    <section className="wrap py-48">
      <p className="label text-primary">404</p>
      <h1 className="t-xl mt-6 text-forest">This path leads <em className="italic">nowhere yet.</em></h1>
      <Cta to="/" className="mt-10">Return home</Cta>
    </section>
  </Layout>
);
export default NotFound;

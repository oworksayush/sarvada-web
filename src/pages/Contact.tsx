import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import Layout from "@/components/sarvada/Layout";
import { Contour, LineReveal, Reveal } from "@/components/sarvada/primitives";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const interests = [
  { v: "site_visit", l: "Site visit" },
  { v: "project_details", l: "Project details" },
  { v: "sarvada_club", l: "Sarvada Club" },
] as const;

const schema = z.object({
  full_name: z.string().trim().min(1, "Please enter your full name.").max(120),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{5,23}$/, "Please enter a valid phone number."),
  email: z.string().trim().max(200).email("Please enter a valid email, or leave it blank.").or(z.literal("")),
  interest: z.enum(["site_visit", "project_details", "sarvada_club"]),
  preferred_date: z.string().optional(),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Please agree to be contacted about this enquiry." }) }),
});

const field = "w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base text-forest placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-0";

const Contact = () => {
  const [params] = useSearchParams();
  const initial = (interests.find((i) => i.v === params.get("interest"))?.v ?? "site_visit") as (typeof interests)[number]["v"];
  const [form, setForm] = useState({ full_name: "", phone: "", email: "", interest: initial, preferred_date: "", message: "", consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as string] ??= i.message));
      setErrors(errs);
      document.getElementById(Object.keys(errs)[0])?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    const d = r.data;
    const { error } = await supabase.from("enquiries").insert({
      full_name: d.full_name, phone: d.phone, email: d.email || null, interest: d.interest,
      preferred_date: d.preferred_date || null, message: d.message || null, consent: true,
    });
    setStatus(error ? "error" : "done");
  };

  const Err = ({ k }: { k: string }) => errors[k] ? <p id={`${k}-err`} className="mt-2 text-sm text-destructive">{errors[k]}</p> : null;
  const aria = (k: string) => ({ id: k, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <Layout overlay={false}>
      <section className="wrap pb-16 pt-36 lg:pt-48">
        <p className="label mb-8 text-primary">Contact</p>
        <LineReveal as="h1" lines={["Let’s plan", <em key="v" className="italic">your visit.</em>]} className="t-hero text-forest" />
        <Reveal delay={0.3}><p className="measure mt-8 text-lg text-muted-foreground">Tell us a little about yourself. Our team can help you explore the project and plan your next step.</p></Reveal>
      </section>
      <Contour />
      <section className="wrap grid gap-16 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-7">
          {status === "done" ? (
            <div role="status" className="border-l-2 border-primary bg-secondary p-8 lg:p-12">
              <p className="label text-primary">Request received</p>
              <h2 className="t-lg mt-4 text-forest">Thank you, {form.full_name.split(" ")[0]}.</h2>
              <p className="mt-6 text-muted-foreground">Your enquiry has reached our team. This is not yet a confirmed appointment — we’ll contact you on {form.phone} to arrange the details.</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-10">
              <div className="grid gap-10 sm:grid-cols-2">
                <div><label htmlFor="full_name" className="label text-muted-foreground">Full name *</label><input {...aria("full_name")} autoComplete="name" className={field} value={form.full_name} onChange={(e) => set("full_name", e.target.value)} /><Err k="full_name" /></div>
                <div><label htmlFor="phone" className="label text-muted-foreground">Phone *</label><input {...aria("phone")} type="tel" autoComplete="tel" className={field} value={form.phone} onChange={(e) => set("phone", e.target.value)} /><Err k="phone" /></div>
                <div><label htmlFor="email" className="label text-muted-foreground">Email (optional)</label><input {...aria("email")} type="email" autoComplete="email" className={field} value={form.email} onChange={(e) => set("email", e.target.value)} /><Err k="email" /></div>
                <div><label htmlFor="preferred_date" className="label text-muted-foreground">Preferred visit date (optional)</label><input {...aria("preferred_date")} type="date" min={new Date().toISOString().slice(0, 10)} className={field} value={form.preferred_date} onChange={(e) => set("preferred_date", e.target.value)} /></div>
              </div>
              <fieldset>
                <legend className="label mb-4 text-muted-foreground">I’m interested in</legend>
                <div className="flex flex-wrap gap-3">
                  {interests.map((i) => (
                    <label key={i.v} className={cn("cursor-pointer border px-5 py-3 text-sm transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-gold", form.interest === i.v ? "border-primary bg-primary text-primary-foreground" : "border-input text-forest hover:border-primary")}>
                      <input type="radio" name="interest" value={i.v} checked={form.interest === i.v} onChange={() => set("interest", i.v)} className="sr-only" />{i.l}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div><label htmlFor="message" className="label text-muted-foreground">Message (optional)</label><textarea {...aria("message")} rows={4} maxLength={2000} className={cn(field, "resize-none")} value={form.message} onChange={(e) => set("message", e.target.value)} /></div>
              <div>
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input {...aria("consent")} type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]" />
                  I agree to be contacted by Sarvada Assets Pvt. Ltd. about this enquiry.
                </label>
                <Err k="consent" />
              </div>
              {status === "error" && <p role="alert" className="text-sm text-destructive">We couldn’t send your request just now. Please check your connection and try again.</p>}
              <button type="submit" disabled={status === "sending"} className="group inline-flex items-center gap-3 bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground transition-colors hover:bg-forest disabled:opacity-60">
                {status === "sending" ? "Sending…" : "Send Request"}
              </button>
            </form>
          )}
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <div className="bg-forest p-8 text-forest-foreground lg:p-10">
            <p className="label text-gold">The Place</p>
            <p className="mt-6 font-display text-3xl">Chikkaballapur district, Karnataka.</p>
            <p className="mt-4 text-forest-foreground/75">Request directions when arranging your visit.</p>
          </div>
        </aside>
      </section>
    </Layout>
  );
};
export default Contact;

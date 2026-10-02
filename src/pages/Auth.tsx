import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/sarvada/Header";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => data.session && navigate("/admin"));
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setError("Those details didn’t match. Please try again."); else navigate("/admin");
  };

  const field = "w-full border-0 border-b border-input bg-transparent px-0 py-3 focus:border-primary focus:outline-none focus:ring-0";
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <form onSubmit={submit} className="w-full max-w-sm space-y-8">
        <Link to="/" className="block text-forest"><Logo /></Link>
        <h1 className="t-md text-forest">Team sign in</h1>
        <div><label htmlFor="email" className="label text-muted-foreground">Email</label><input id="email" type="email" required autoComplete="email" className={field} value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        <div><label htmlFor="pw" className="label text-muted-foreground">Password</label><input id="pw" type="password" required autoComplete="current-password" className={field} value={password} onChange={(e) => setPassword(e.target.value)} /></div>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <button disabled={busy} className="w-full bg-primary py-4 text-sm font-medium text-primary-foreground hover:bg-forest disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
      </form>
    </div>
  );
};
export default Auth;

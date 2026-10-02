import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Logo } from "@/components/sarvada/Header";

type Enquiry = { id: string; full_name: string; phone: string; email: string | null; interest: string; preferred_date: string | null; message: string | null; created_at: string };

const Admin = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [rows, setRows] = useState<Enquiry[]>([]);

  useEffect(() => {
    if (loading) return;
    if (!user) { navigate("/auth"); return; }
    (async () => {
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
      setIsAdmin(!!data);
      if (data) {
        const { data: e } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
        setRows((e as Enquiry[]) ?? []);
      }
    })();
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="wrap flex items-center justify-between py-5 text-forest">
          <Link to="/"><Logo /></Link>
          <button onClick={() => signOut().then(() => navigate("/"))} className="label">Sign out</button>
        </div>
      </header>
      <main className="wrap py-14">
        <h1 className="t-lg text-forest">Enquiries</h1>
        {isAdmin === false && <p className="mt-6 text-muted-foreground">This account doesn’t have admin access.</p>}
        {isAdmin && (rows.length === 0 ? <p className="mt-6 text-muted-foreground">No enquiries yet.</p> : (
          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="label text-muted-foreground"><tr>{["Received", "Name", "Phone", "Email", "Interest", "Visit date", "Message"].map((h) => <th key={h} className="border-b border-border py-3 pr-6 font-medium">{h}</th>)}</tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-border align-top">
                    <td className="py-4 pr-6 whitespace-nowrap">{new Date(r.created_at).toLocaleDateString()}</td>
                    <td className="py-4 pr-6">{r.full_name}</td>
                    <td className="py-4 pr-6 whitespace-nowrap">{r.phone}</td>
                    <td className="py-4 pr-6">{r.email ?? "—"}</td>
                    <td className="py-4 pr-6">{r.interest.replace("_", " ")}</td>
                    <td className="py-4 pr-6">{r.preferred_date ?? "—"}</td>
                    <td className="max-w-xs py-4 pr-6 text-muted-foreground">{r.message ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </main>
    </div>
  );
};
export default Admin;

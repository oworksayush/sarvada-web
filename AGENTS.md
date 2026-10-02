# Architecture rules

- Site content and verified contact details live in `src/data/site.ts`; null fields render nothing — keeps unverified info off the site.
- All demo imagery is referenced via `src/data/images.ts` — one place to swap in real photography.
- Shared UI (Header, Footer, Layout, primitives like ImageWindow/Chapter/Contour/Cta) lives in `src/components/sarvada/` — consistent signature visual language.
- Enquiries are stored in the `enquiries` table (public insert, admin read via `has_role`) — success only shown after a real save.
- Admin access is granted via the `user_roles` table, never client-side flags — prevents privilege escalation.
- Framer Motion is the only animation library; all motion respects reduced-motion.

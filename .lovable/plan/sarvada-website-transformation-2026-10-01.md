# SARVADA website transformation

Replace the Wild Haven camping template with a premium editorial site for Sarvada Assets Pvt. Ltd. — concept "Room for a fuller life".

## Phase 1 — Design system and shell
- Palette tokens (HSL): deep forest #123C2D, botanical green #006633, warm ivory #F5F2E9, pale sage #E3E8DC, charcoal green #202B24, muted stone #716F65, antique gold #B49A58, leaf lime #97B64B.
- Fonts: Cormorant Garamond (display, restrained italics) + Manrope (body/nav). Fluid type via clamp; 1440px max width.
- Signature pieces: landscape-window image reveal (clip + scale 1.04 to 1), botanical contour SVG line, chapter markers ("01 / THE LAND").
- Header: logo left, six nav links, "Book a Site Visit"; transparent over heroes, ivory after scroll; active state, focus rings. Mobile full-screen menu with Escape, focus trap, scroll lock.
- Footer: large SARVADA wordmark, tagline, links, CTA, legal name + year, "imagery is illustrative" note.
- Reduced-motion support everywhere.

## Phase 2 — Pages
- Home (/): cinematic hero, brand intro, current project facts (25 acres, 100 plots, from 5,400 sq. ft., 2.5-acre proposed clubhouse), sticky "Room for..." scroll story (desktop) / stacked (mobile), Sarvada Life collage, Club dark section, Location, closing invitation.
- About (/about): story, philosophy, three principles with line illustrations, founder Mr. Bharatesh (20+ years attributed to him, no portrait or quotes), future vision as aspiration.
- Projects (/projects): featured Sarvada Farm Theme; previous projects hidden until verified; upcoming teaser.
- Project detail (/projects/sarvada-farm-theme): facts, location, peace-first planning, proposed amenities, labelled concept zoning illustration, illustrative gallery, FAQs, CTA.
- The Sarvada Life (/life): five-chapter morning-to-evening journal with varied layouts.
- Sarvada Club (/club): five chapters (Stay marked "Future phase"), enquiry CTA.
- Contact (/contact): enquiry form with validation and consent; location panel, no fake phone/email/map.

## Phase 3 — Backend and cleanup
- New `enquiries` table (public insert only, admins read) — success shown only after real save.
- Admin page repurposed to list enquiries; restrict to admin role.
- Remove camping pages/data (old /locations, /location/:id, booking).
- SEO title/description/OG tags for SARVADA.

## Content rules
- All features labelled proposed/planned; no prices ("Request current pricing and project details"), no approval claims, testimonials, returns, or invented contact details.
- Project label: "Sarvada Farm Theme".

## Technical details
- Framer Motion (already installed) for all motion; no new animation libraries.
- AI-generated, colour-graded demo images in src/assets with an image manifest (src/data/images.ts) for easy replacement.
- Content centralised in src/data/site.ts.

## Needed from you
- The SARVADA logo file (a refined text wordmark is used until supplied).
- Real phone, email, and address when ready.

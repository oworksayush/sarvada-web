// Image manifest — every demo asset lives here so it can be replaced with real site photography.
// All images are AI-generated illustrative demo imagery, not photographs of the project site.
import heroHills from "@/assets/sarvada/hero-hills.jpg";
import pathway from "@/assets/sarvada/pathway.jpg";
import lakeEvening from "@/assets/sarvada/lake-evening.jpg";
import together from "@/assets/sarvada/together.jpg";
import clubPavilion from "@/assets/sarvada/club-pavilion.jpg";
import morning from "@/assets/sarvada/morning.jpg";
import retreat from "@/assets/sarvada/retreat.jpg";
import leaves from "@/assets/sarvada/leaves.jpg";

export type SiteImage = { src: string; alt: string; w: number; h: number };

export const images = {
  heroHills: { src: heroHills, alt: "Layered granite hills and farmland in soft morning light", w: 1920, h: 1088 },
  pathway: { src: pathway, alt: "A shaded red-earth pathway between mango and coconut trees", w: 1024, h: 1280 },
  lakeEvening: { src: lakeEvening, alt: "A calm lake between low hills at dusk", w: 1600, h: 1008 },
  together: { src: together, alt: "Family and friends sharing a meal beneath a large tree", w: 1600, h: 1072 },
  clubPavilion: { src: clubPavilion, alt: "An open timber pavilion with yoga mats beside a lake", w: 1600, h: 1072 },
  morning: { src: morning, alt: "A clay cup of tea on a verandah above misty countryside", w: 1024, h: 1280 },
  retreat: { src: retreat, alt: "A low stone and timber retreat among mango trees at evening", w: 1600, h: 1072 },
  leaves: { src: leaves, alt: "Close-up of mango leaves over red earth", w: 1024, h: 1280 },
} satisfies Record<string, SiteImage>;

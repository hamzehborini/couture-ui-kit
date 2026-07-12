import type { Product } from "@/types";

// Three confirmed-working suit Unsplash photos used as base images.
// Each product derives 4 gallery variants via different crop/dimension params
// so thumbnails read as distinct detail shots of the same garment.

// photo-1594938298603-c8148c4dae35 — blue-check three-piece suit
// photo-1507679799987-c73779587ccf — dark suit, man adjusting button
// photo-1617127365659-c47fa864d8bc — sharp black suit, editorial

function shots(
  id: string,
  crops: [string, string, string, string] = [
    "fit=crop&w=800&h=1100",
    "fit=crop&w=800&h=560&crop=top",
    "fit=crop&w=800&h=800&crop=center",
    "fit=crop&w=600&h=900",
  ],
): [string, string, string, string] {
  const base = `https://images.unsplash.com/${id}?auto=format&q=80`;
  return crops.map((c) => `${base}&${c}`) as [string, string, string, string];
}

const BLUE_CHECK = "photo-1594938298603-c8148c4dae35";
const DARK_ADJUST = "photo-1507679799987-c73779587ccf";
const BLACK_EDIT  = "photo-1617127365659-c47fa864d8bc";

export const products: Product[] = [
  {
    id: "uber-white-shawl",
    name: "Uber White Shawl Lapel Tuxedo",
    description: "An ivory shawl-lapel tuxedo cut for the most formal occasions.",
    price: 2800,
    fabric: "Super 130's ivory wool with silk-satin shawl facing",
    fabricMill: "Huddersfield",
    colors: ["Silver", "Gold"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: shots(BLUE_CHECK),
  },
  {
    id: "super-black-shawl",
    name: "Super Black Shawl Lapel Tuxedo",
    description: "The uncompromising black-tie standard, hand-finished in Huddersfield cloth.",
    price: 2600,
    fabric: "Super 150's black wool, silk-faced shawl lapel",
    fabricMill: "Huddersfield",
    colors: ["Black"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: shots(DARK_ADJUST),
  },
  {
    id: "guabello-super-130",
    name: "Guabello Super 130's",
    description: "A notch-lapel two-piece in a whisper-soft Guabello wool, cut for daily elegance.",
    price: 1750,
    fabric: "Super 130's worsted wool, half-canvas construction",
    fabricMill: "Guabello",
    colors: ["Black", "Silver"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: shots(DARK_ADJUST, [
      "fit=crop&w=800&h=1100&crop=center",
      "fit=crop&w=800&h=600&crop=entropy",
      "fit=crop&w=800&h=800",
      "fit=crop&w=600&h=1000&crop=top",
    ]),
  },
  {
    id: "cerruti-peak-lapel",
    name: "Cerruti Peak Lapel",
    description: "Sharp peak lapels and a razor-clean silhouette in storied Cerruti cloth.",
    price: 2100,
    fabric: "Super 130's Cerruti wool, full-canvas construction",
    fabricMill: "Cerruti 1881",
    colors: ["Black", "Silver"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: shots(BLACK_EDIT),
  },
  {
    id: "classic-midnight",
    name: "Classic Midnight Suit",
    description: "A midnight-blue two-piece — quieter than black, twice as considered.",
    price: 1400,
    fabric: "Super 120's midnight wool, hand-stitched lapels",
    fabricMill: "Vitale Barberis Canonico",
    colors: ["Black", "Silver"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: shots(BLUE_CHECK, [
      "fit=crop&w=800&h=1100&crop=center",
      "fit=crop&w=800&h=560&crop=top",
      "fit=crop&w=800&h=800&crop=entropy",
      "fit=crop&w=600&h=900&crop=center",
    ]),
  },
  {
    id: "royal-navy-prestige",
    name: "Royal Navy Prestige",
    description: "A deep-navy three-piece with structured shoulders and a taper worthy of the boardroom.",
    price: 1900,
    fabric: "Super 140's navy wool, three-piece with waistcoat",
    fabricMill: "Loro Piana",
    colors: ["Black", "Silver"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: shots(BLACK_EDIT, [
      "fit=crop&w=800&h=1100&crop=center",
      "fit=crop&w=800&h=560&crop=entropy",
      "fit=crop&w=800&h=800&crop=top",
      "fit=crop&w=600&h=950",
    ]),
  },
  {
    id: "imperial-black-edition",
    name: "Imperial Black Edition",
    description: "The house's flagship black suit — hand-canvassed, hand-finished, unmistakably ours.",
    price: 3200,
    fabric: "Super 180's jet-black wool, full bespoke canvas",
    fabricMill: "Scabal",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    images: shots(BLACK_EDIT, [
      "fit=crop&w=800&h=1200",
      "fit=crop&w=800&h=600&crop=top",
      "fit=crop&w=800&h=800&crop=center",
      "fit=crop&w=700&h=1000",
    ]),
  },
  {
    id: "golden-signature",
    name: "Golden Signature Suit",
    description: "A champagne-threaded evening suit, reserved for the most singular of occasions.",
    price: 3000,
    fabric: "Super 150's wool with lurex thread, silk lining",
    fabricMill: "Dormeuil",
    colors: ["Gold", "Black"],
    sizes: ["S", "M", "L", "XL"],
    images: shots(BLUE_CHECK, [
      "fit=crop&w=800&h=1200&crop=center",
      "fit=crop&w=800&h=600&crop=top",
      "fit=crop&w=800&h=800",
      "fit=crop&w=700&h=1050&crop=entropy",
    ]),
  },
];

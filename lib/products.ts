// DEVELOPMENT SAMPLE DATA: private-security product concepts, not confirmed stock.
// Verify materials, markings, sizes and original photos before public launch.
export const categories = [
  [
    "clothing",
    "Security Polos & Uniform Shirts",
    "Polos & uniform shirts",
    "Everyday private-security tops for a coordinated team uniform.",
    20,
  ],
  [
    "jackets",
    "Security Jackets, Parkas & Gilets",
    "Jackets & gilets",
    "Layers for your private-security uniform collection.",
    21,
  ],
  [
    "trousers",
    "Security Service Trousers",
    "Service trousers",
    "Service and formal trousers for a professional uniform.",
    22,
  ],
  [
    "identification",
    "Armbands & Identification Strips",
    "Armbands & identification",
    "Sécurité privée armbands, chest and back strips, name tapes and identifier supports.",
    23,
  ],
  [
    "holders",
    "Badge, ID & Card Holders",
    "Badge & card holders",
    "PVC card holders, neck lanyards and professional identification wallets.",
    24,
  ],
  [
    "badges",
    "Security Badges & Insignia",
    "Security badges",
    "Badge patches, embroidered insignia and badge reels for uniform identification.",
    42,
  ],
  [
    "belts",
    "Duty Belts & Belt Accessories",
    "Belts & belt accessories",
    "Belts, radio holders and glove keepers for daily organisation.",
    25,
  ],
  [
    "tactical",
    "Tactical Phone Holders & Pouches",
    "Phone holders & pouches",
    "Belt and vest phone holders, MOLLE pouches and practical duty accessories.",
    43,
  ],
  [
    "headwear",
    "Security Caps & Beanies",
    "Caps & beanies",
    "Black headwear for a coordinated private-security uniform.",
    26,
  ],
  [
    "gloves",
    "Security Uniform Gloves",
    "Uniform gloves",
    "Plain black gloves to complete the uniform selection.",
    27,
  ],
  [
    "footwear",
    "Security Duty Footwear",
    "Duty footwear",
    "Black duty boots and formal uniform shoes.",
    28,
  ],
].map(([slug, name, short, description, image]) => ({
  slug: String(slug),
  name: String(name),
  short: String(short),
  description: String(description),
  image: Number(image),
}));
export type Category = (typeof categories)[number];
export const categoryBySlug = (slug: string): Category | undefined =>
  categories.find((category) => category.slug === slug);
export type Product = {
  slug: string;
  name: string;
  frenchName: string;
  code: string;
  category: string;
  material: string;
  subcategory: string;
  colours: string[];
  sizes: string[];
  description: string;
  image: number;
  added: string;
  moq?: number;
  leadTime?: string;
  specs: Record<string, string>;
  sample: true;
};
type SampleEntry = {
  name: string;
  frenchName: string;
  category: string;
  material: string;
  subcategory: string;
  image: number;
  colours?: string[];
  sizes?: string[];
  added?: string;
  detail: string;
};
const entries: SampleEntry[] = [
  {
    name: "Private Security Short-Sleeve Polo",
    frenchName: "Polo sécurité privée manches courtes",
    category: "clothing",
    material: "Polyester / cotton piqué",
    subcategory: "Short-sleeve polos",
    image: 20,
    detail:
      "Short-sleeve polo concept with a small chest identification area. Discuss chest and back markings for your team.",
  },
  {
    name: "Private Security Long-Sleeve Polo",
    frenchName: "Polo sécurité privée manches longues",
    category: "clothing",
    material: "Polyester / cotton piqué",
    subcategory: "Long-sleeve polos",
    image: 30,
    detail:
      "Long-sleeve polo concept for a coordinated private-security uniform. Enquire about company and role markings.",
  },
  {
    name: "White Pilot Uniform Shirt",
    frenchName: "Chemisette pilote blanche",
    category: "clothing",
    material: "Polyester / cotton poplin",
    subcategory: "Uniform shirts",
    image: 31,
    colours: ["White"],
    detail:
      "White short-sleeve uniform shirt concept with plain shoulder tabs. Suitable as a starting point for reception and formal-uniform enquiries.",
  },
  {
    name: "Private Security Softshell Jacket",
    frenchName: "Veste softshell sécurité privée",
    category: "jackets",
    material: "Polyester softshell textile",
    subcategory: "Softshell jackets",
    image: 21,
    detail:
      "Black full-zip softshell-style jacket concept with space for private-security identification and company branding.",
  },
  {
    name: "Private Security Windbreaker",
    frenchName: "Coupe-vent sécurité privée",
    category: "jackets",
    material: "Polyester shell textile",
    subcategory: "Windbreakers",
    image: 32,
    detail:
      "Lightweight zip-jacket concept. Share your preferred lining, identification placement and size distribution.",
  },
  {
    name: "Hooded Security Service Parka",
    frenchName: "Parka sécurité privée",
    category: "jackets",
    material: "Polyester outer textile",
    subcategory: "Parkas",
    image: 33,
    detail:
      "Hooded service-parka concept for uniform sourcing. Lining, fabric specification and marking options require confirmation.",
  },
  {
    name: "Padded Sleeveless Security Gilet",
    frenchName: "Doudoune gilet sans manches sécurité privée",
    category: "jackets",
    material: "Polyester shell / synthetic filling",
    subcategory: "Sleeveless gilets",
    image: 34,
    detail:
      "Ordinary padded sleeveless clothing concept with a zip front. This is a uniform layer; no protective or armour performance is claimed.",
  },
  {
    name: "Black Security Service Cargo Trousers",
    frenchName: "Pantalon de service sécurité privée",
    category: "trousers",
    material: "Polyester / cotton twill",
    subcategory: "Service trousers",
    image: 22,
    detail:
      "Black service-trouser concept with side storage pockets. Confirm pocket layout, fit and measurements in your enquiry.",
  },
  {
    name: "Private Security Uniform Trousers",
    frenchName: "Pantalon uniforme sécurité privée",
    category: "trousers",
    material: "Polyester / cotton twill",
    subcategory: "Uniform trousers",
    image: 22,
    detail:
      "Uniform-trouser enquiry concept. The collection image illustrates service trousers; the final cut and pocket layout must be agreed.",
  },
  {
    name: "Sécurité Privée Identification Armband",
    frenchName: "Brassard sécurité privée",
    category: "identification",
    material: "Polyester / elastic strap",
    subcategory: "Security armbands",
    image: 23,
    colours: ["Orange"],
    detail:
      "Orange private-security armband concept with an adjustable strap and role-marking area. Final wording and dimensions are buyer requirements.",
  },
  {
    name: "Sécurité Privée Chest & Back Strip Set",
    frenchName: "Jeu de bandeaux sécurité privée devant et dos",
    category: "identification",
    material: "Woven textile / hook-and-loop backing",
    subcategory: "Chest & back strips",
    image: 35,
    detail:
      "Two identification-strip concepts in different sizes for chest and back positions. Text, lettering and attachment details are confirmed individually.",
  },
  {
    name: "Private Security Name Tape",
    frenchName: "Bande patronymique sécurité",
    category: "identification",
    material: "Embroidered textile",
    subcategory: "Name tapes",
    image: 36,
    detail:
      "Personal-name tape concept. The image uses the sample word NAME; your approved wording and attachment preferences must be supplied.",
  },
  {
    name: "Numeric Identification Strip Holder",
    frenchName: "Support identifiant auto-agrippant",
    category: "identification",
    material: "Woven textile / hook-and-loop backing",
    subcategory: "Identifier supports",
    image: 37,
    detail:
      "Blank identifier-support concept for a buyer-supplied numeric strip. No official identifier is supplied and no regulatory compliance is asserted.",
  },
  {
    name: "Rigid PVC Professional Badge Holder",
    frenchName: "Porte-badge PVC rigide",
    category: "holders",
    material: "Rigid PVC / textile lanyard",
    subcategory: "PVC badge holders",
    image: 24,
    sizes: ["Vertical"],
    detail:
      "Transparent rigid-card holder concept for a professional ID card. Card dimensions, orientation and attachment must be specified.",
  },
  {
    name: "Neck Lanyard & ID Card Holder",
    frenchName: "Tour de cou avec porte-carte",
    category: "holders",
    material: "Polyester lanyard / PVC holder",
    subcategory: "Lanyards & card holders",
    image: 24,
    sizes: ["Vertical"],
    detail:
      "Neck-lanyard and card-holder concept. Discuss lanyard printing, fastening preferences and your card dimensions.",
  },
  {
    name: "Leather Professional ID Wallet",
    frenchName: "Porte-cartes professionnel deux volets",
    category: "holders",
    material: "Leather / transparent card windows",
    subcategory: "ID wallets",
    image: 38,
    detail:
      "Black bifold identification-wallet concept with two card windows. No agency insignia or official badge is included.",
  },
  {
    name: "Adjustable Black Security Duty Belt",
    frenchName: "Ceinturon sécurité réglable",
    category: "belts",
    material: "Woven nylon / polymer buckle",
    subcategory: "Duty belts",
    image: 25,
    sizes: ["Adjustable"],
    detail:
      "Plain black duty-belt concept with an adjustable buckle. Specify desired width and waist-size range in your enquiry.",
  },
  {
    name: "Belt-Mounted Radio Holder",
    frenchName: "Porte-radio ceinture",
    category: "belts",
    material: "Woven nylon",
    subcategory: "Radio holders",
    image: 41,
    detail:
      "Empty belt radio-holder concept. Share device dimensions and preferred retention details; no radio is included.",
  },
  {
    name: "Belt Glove Keeper",
    frenchName: "Porte-gants ceinture",
    category: "belts",
    material: "Woven nylon / polymer clip",
    subcategory: "Glove holders",
    image: 10,
    detail:
      "Compact black glove-keeper concept with a belt strap and clip. Confirm strap width, fastening and glove compatibility.",
  },
  {
    name: "Sécurité Privée Uniform Cap",
    frenchName: "Casquette sécurité privée",
    category: "headwear",
    material: "Cotton twill",
    subcategory: "Security caps",
    image: 26,
    sizes: ["Adjustable"],
    detail:
      "Black cap concept with a private-security front marking. Company identification and adjustment details can be discussed.",
  },
  {
    name: "Black Security Uniform Beanie",
    frenchName: "Bonnet de service noir",
    category: "headwear",
    material: "Acrylic knit",
    subcategory: "Uniform beanies",
    image: 39,
    detail:
      "Plain black knitted beanie concept for a coordinated uniform selection. Discuss preferred fit and marking placement.",
  },
  {
    name: "Black Security Uniform Gloves",
    frenchName: "Gants de service sécurité",
    category: "gloves",
    material: "Synthetic textile",
    subcategory: "Uniform gloves",
    image: 27,
    sizes: ["S", "M", "L", "XL"],
    detail:
      "Plain black full-finger uniform glove concept. No cut-resistance, impact-protection or safety certification is claimed.",
  },
  {
    name: "Black Lace-Up Security Duty Boots",
    frenchName: "Rangers de service noires",
    category: "footwear",
    material: "Leather / textile upper",
    subcategory: "Duty boots",
    image: 28,
    sizes: ["39", "40", "41", "42", "43", "44"],
    detail:
      "Black lace-up duty-boot concept. Sole construction, materials and fit require confirmation; no certified protection is claimed.",
  },
  {
    name: "Black Formal Uniform Shoes",
    frenchName: "Chaussures de ville uniforme",
    category: "footwear",
    material: "Leather upper",
    subcategory: "Formal uniform shoes",
    image: 40,
    sizes: ["39", "40", "41", "42", "43", "44"],
    detail:
      "Low-cut black lace-up shoe concept for formal private-security uniforms. Confirm finish, fit and final materials in your enquiry.",
  },
  {
    name: "Woven Security Badge Patch",
    frenchName: "Écusson de sécurité tissé",
    category: "badges",
    material: "Woven textile / hook-and-loop backing",
    subcategory: "Woven badges",
    image: 42,
    colours: ["Black"],
    sizes: ["One size"],
    added: "2026-11-10",
    detail:
      "Woven security-badge concept for arm or chest attachment. Final wording, dimensions and fastening are confirmed for each enquiry. No official agency insignia is supplied.",
  },
  {
    name: "Embroidered Security Badge",
    frenchName: "Badge de sécurité brodé",
    category: "badges",
    material: "Embroidered textile / hook-and-loop backing",
    subcategory: "Embroidered badges",
    image: 42,
    colours: ["Black"],
    sizes: ["One size"],
    added: "2026-11-09",
    detail:
      "Embroidered badge concept for uniform identification. Share your approved wording, colours and attachment position; no official insignia is included.",
  },
  {
    name: "Retractable ID Badge Reel",
    frenchName: "Enrouleur de badge rétractable",
    category: "badges",
    material: "ABS housing / nylon cord",
    subcategory: "Badge reels",
    image: 24,
    colours: ["Black"],
    sizes: ["One size"],
    added: "2026-11-08",
    detail:
      "Retractable badge-reel concept for an ID card or access badge. Confirm clip type, cord length and card weight in your enquiry.",
  },
  {
    name: "Belt-Mounted Tactical Phone Holder",
    frenchName: "Porte-téléphone tactique ceinture",
    category: "tactical",
    material: "Woven nylon / hook-and-loop",
    subcategory: "Belt phone holders",
    image: 43,
    colours: ["Black"],
    sizes: ["Adjustable"],
    added: "2026-11-07",
    detail:
      "Belt-mounted phone-holder concept with a protective flap. Share your device dimensions and preferred belt width for a suitable fit.",
  },
  {
    name: "MOLLE Tactical Phone Pouch",
    frenchName: "Pochette téléphone tactique MOLLE",
    category: "tactical",
    material: "Woven nylon / MOLLE straps",
    subcategory: "MOLLE pouches",
    image: 43,
    colours: ["Black"],
    sizes: ["Adjustable"],
    added: "2026-11-06",
    detail:
      "MOLLE-compatible phone-pouch concept for belt or vest mounting. Device fit, retention and attachment layout are confirmed individually.",
  },
  {
    name: "Universal Utility Duty Pouch",
    frenchName: "Pochette utilitaire de service",
    category: "tactical",
    material: "Woven nylon",
    subcategory: "Utility pouches",
    image: 41,
    colours: ["Black"],
    sizes: ["One size"],
    added: "2026-11-05",
    detail:
      "General-purpose duty-pouch concept for small equipment. Contents, dimensions and mounting preferences are agreed by enquiry.",
  },
];
const sampleDate = (index: number) => {
  const date = new Date(Date.UTC(2026, 9, 31));
  date.setUTCDate(date.getUTCDate() - index);
  return date.toISOString().slice(0, 10);
};
export const products: Product[] = entries.map((p, i) => ({
  ...p,
  slug: p.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, ""),
  code: `SP-${String(i + 101).padStart(4, "0")}`,
  colours: p.colours || ["Black"],
  sizes:
    p.sizes ||
    (["clothing", "jackets", "trousers"].includes(p.category)
      ? ["S", "M", "L", "XL", "2XL"]
      : ["One size"]),
  description: `${p.detail} This is an illustrative catalogue sample; confirm specifications, availability and marking requirements before ordering.`,
  added: p.added ?? sampleDate(i),
  specs: {
    "French product term": p.frenchName,
    "Material (sample)": p.material,
    "Colour options (sample)": (p.colours || ["Black"]).join(", "),
    "Marking & customisation": "Enquiry subject to confirmation",
    "Order route": "Bulk quotation enquiry",
  },
  sample: true,
}));
export const categoryName = (slug: string) =>
  categories.find((c) => c.slug === slug)?.name || slug;
export const imagePath = (index: number) => `/images/category-${index}.webp`;

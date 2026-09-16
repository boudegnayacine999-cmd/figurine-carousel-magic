import luffyShoe from "@/assets/nike-luffy.png.asset.json";
import luffyBg from "@/assets/bg-luffy.jpg.asset.json";
import aceShoe from "@/assets/nike-ace.png.asset.json";
import aceBg from "@/assets/bg-ace.jpg.asset.json";
import lawShoe from "@/assets/nike-law.png.asset.json";
import lawBg from "@/assets/bg-law.jpg.asset.json";

export type Product = {
  id: string;
  name: string;
  fruit: string;
  character: string;
  tagline: string;
  description: string;
  details: string[];
  volume: string; // edition label
  price: number; // DA
  oldPrice?: number;
  image: string;
  bg: string;
  tint: string;
  sizes: number[];
};

export const PRODUCTS: Product[] = [
  {
    id: "gomu-gomu",
    name: "Gomu Gomu no Mi",
    fruit: "Gomu Gomu no Mi",
    character: "Luffy",
    tagline: "Violet · Citron vert · Spirales du fruit du démon",
    description:
      "Air Max Plus édition Gomu Gomu : violet élastique, spirales gravées du fruit du démon et touches citron vert. L'énergie du futur Roi des Pirates.",
    details: [
      "Tige TPU thermosoudée à motif spirales",
      "Unité Air Max Plus visible",
      "Doublure et lacets citron vert",
      "Semelle dégradée violet profond",
    ],
    volume: "Édition limitée",
    price: 24900,
    oldPrice: 29900,
    image: luffyShoe.url,
    bg: luffyBg.url,
    tint: "#7C3AED",
    sizes: [39, 40, 41, 42, 43, 44, 45],
  },
  {
    id: "mera-mera",
    name: "Mera Mera no Mi",
    fruit: "Mera Mera no Mi",
    character: "Ace",
    tagline: "Orange · Feu · Turquoise",
    description:
      "Air Max Plus édition Mera Mera : dégradé de flammes orange et jaune, accents turquoise rappelant l'océan. Le feu de l'homme qui n'a jamais reculé.",
    details: [
      "Dégradé flamme orange / jaune",
      "Unité Air Max Plus visible",
      "Lacets et doublure turquoise",
      "Semelle rouge braise",
    ],
    volume: "Édition limitée",
    price: 24900,
    oldPrice: 29900,
    image: aceShoe.url,
    bg: aceBg.url,
    tint: "#EA580C",
    sizes: [39, 40, 41, 42, 43, 44, 45],
  },
  {
    id: "ope-ope",
    name: "Ope Ope no Mi",
    fruit: "Ope Ope no Mi",
    character: "Law",
    tagline: "Rose magenta · Vert chirurgical",
    description:
      "Air Max Plus édition Ope Ope : rose magenta chirurgical, spirales du fruit et contrastes verts. Le style froid et précis du Chirurgien de la Mort.",
    details: [
      "Rose magenta satiné à spirales",
      "Unité Air Max Plus visible",
      "Lacets et col vert vif",
      "Semelle bordeaux translucide",
    ],
    volume: "Édition limitée",
    price: 24900,
    oldPrice: 29900,
    image: lawShoe.url,
    bg: lawBg.url,
    tint: "#DB2777",
    sizes: [39, 40, 41, 42, 43, 44, 45],
  },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);

export const formatDA = (n: number) =>
  new Intl.NumberFormat("fr-DZ").format(n) + " DA";

export const WILAYAS = [
  "01 - Adrar","02 - Chlef","03 - Laghouat","04 - Oum El Bouaghi","05 - Batna",
  "06 - Béjaïa","07 - Biskra","08 - Béchar","09 - Blida","10 - Bouira",
  "11 - Tamanrasset","12 - Tébessa","13 - Tlemcen","14 - Tiaret","15 - Tizi Ouzou",
  "16 - Alger","17 - Djelfa","18 - Jijel","19 - Sétif","20 - Saïda",
  "21 - Skikda","22 - Sidi Bel Abbès","23 - Annaba","24 - Guelma","25 - Constantine",
  "26 - Médéa","27 - Mostaganem","28 - M'Sila","29 - Mascara","30 - Ouargla",
  "31 - Oran","32 - El Bayadh","33 - Illizi","34 - Bordj Bou Arréridj","35 - Boumerdès",
  "36 - El Tarf","37 - Tindouf","38 - Tissemsilt","39 - El Oued","40 - Khenchela",
  "41 - Souk Ahras","42 - Tipaza","43 - Mila","44 - Aïn Defla","45 - Naâma",
  "46 - Aïn Témouchent","47 - Ghardaïa","48 - Relizane","49 - Timimoun","50 - Bordj Badji Mokhtar",
  "51 - Ouled Djellal","52 - Béni Abbès","53 - In Salah","54 - In Guezzam","55 - Touggourt",
  "56 - Djanet","57 - El M'Ghair","58 - El Meniaa",
];

import sweetBottle from "@/assets/sweet-dreams-bottle.png.asset.json";
import sweetBg from "@/assets/sweet-dreams-bg.jpg.asset.json";
import honeyBottle from "@/assets/honey-touch-bottle.png.asset.json";
import honeyBg from "@/assets/honey-touch-bg.jpg.asset.json";
import dziriaBottle from "@/assets/dziria-bottle.png.asset.json";
import dziriaBg from "@/assets/dziria-bg.jpg.asset.json";
import afroBottle from "@/assets/afro-passion-bottle.png.asset.json";
import afroBg from "@/assets/afro-passion-bg.jpg.asset.json";

export type Product = {
  id: string;
  name: string;
  fruit: string;
  tagline: string;
  description: string;
  details: string[];
  volume: string;
  price: number;
  oldPrice?: number;
  image: string;
  bg: string;
  tint: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "sweet-dreams", name: "Sweet Dreams", fruit: "Sweet Dreams",
    tagline: "Fleurs · Pêche · Fraise",
    description: "Une brume douce et fruitée, dans un univers de fleurs roses, de pêches et de fraises.",
    details: ["Brume parfumée", "Univers floral et fruité"], volume: "Brume parfumée", price: 2500,
    image: sweetBottle.url, bg: sweetBg.url, tint: "var(--perfume-sweet)",
  },
  {
    id: "honey-touch", name: "Honey Touch", fruit: "Honey Touch",
    tagline: "Miel · Fleurs · Douceur dorée",
    description: "Une brume à l’univers chaleureux et doré, entre fleurs et douceur du miel.",
    details: ["Brume parfumée", "Univers doux et chaleureux"], volume: "Brume parfumée", price: 2800,
    image: honeyBottle.url, bg: honeyBg.url, tint: "var(--perfume-honey)",
  },
  {
    id: "dziria", name: "Dziria", fruit: "Dziria",
    tagline: "Néroli · Fleur d’oranger · Ambre",
    description: "Une brume inspirée de la lumière d’Alger, entre néroli, fleur d’oranger et ambre.",
    details: ["Brume parfumée", "Univers solaire et floral"], volume: "Brume parfumée", price: 2800,
    image: dziriaBottle.url, bg: dziriaBg.url, tint: "var(--perfume-dziria)",
  },
  {
    id: "afro-passion", name: "Afro Passion", fruit: "Afro Passion",
    tagline: "Ananas · Coco · Évasion tropicale",
    description: "Une brume à l’univers tropical, entre ananas, noix de coco et coucher de soleil sur la plage.",
    details: ["Brume parfumée", "Univers tropical et fruité"], volume: "Brume parfumée", price: 2800,
    image: afroBottle.url, bg: afroBg.url, tint: "var(--perfume-afro)",
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

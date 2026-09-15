import sweetDreamsBottle from "@/assets/sweet-dreams-bottle.png.asset.json";
import sweetDreamsBg from "@/assets/sweet-dreams-bg.jpg.asset.json";
import honeyTouchBottle from "@/assets/honey-touch-bottle.png.asset.json";
import honeyTouchBg from "@/assets/honey-touch-bg.jpg.asset.json";
import dziriaBottle from "@/assets/dziria-bottle.png.asset.json";
import dziriaBg from "@/assets/dziria-bg.jpg.asset.json";
import afroPassionBottle from "@/assets/afro-passion-bottle.png.asset.json";
import afroPassionBg from "@/assets/afro-passion-bg.jpg.asset.json";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  volume: string;
  price: number; // DA
  bottle: string;
  bg: string;
  tint: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "sweet-dreams",
    name: "Sweet Dreams",
    tagline: "Pêche · Fraise · Fleurs blanches",
    description:
      "Une brume gourmande et florale : pêche juteuse, fraise sucrée et bouquet de fleurs blanches pour une sensation douce toute la journée.",
    volume: "Brume 250ml",
    price: 2500,
    bottle: sweetDreamsBottle.url,
    bg: sweetDreamsBg.url,
    tint: "#D96A86",
  },
  {
    id: "honey-touch",
    name: "Honey Touch",
    tagline: "Miel · Vanille · Ambre",
    description:
      "Une brume chaude et enveloppante : miel doré, vanille crémeuse et ambre pour un sillage sensuel et lumineux.",
    volume: "Brume 250ml",
    price: 2800,
    bottle: honeyTouchBottle.url,
    bg: honeyTouchBg.url,
    tint: "#C58A2E",
  },
  {
    id: "dziria",
    name: "Dziria",
    tagline: "Néroli · Fleur d'oranger · Ambre",
    description:
      "L'âme d'Alger en brume : néroli éclatant, fleur d'oranger et ambre doux, comme un coucher de soleil sur la Casbah.",
    volume: "Brume 250ml",
    price: 2800,
    bottle: dziriaBottle.url,
    bg: dziriaBg.url,
    tint: "#C4743A",
  },
  {
    id: "afro-passion",
    name: "Afro Passion",
    tagline: "Ananas · Coco · Fruit de la passion",
    description:
      "Une brume tropicale et solaire : ananas juteux, noix de coco crémeuse et fruit de la passion pour un été permanent.",
    volume: "Brume 250ml",
    price: 2800,
    bottle: afroPassionBottle.url,
    bg: afroPassionBg.url,
    tint: "#E0763F",
  },
];

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

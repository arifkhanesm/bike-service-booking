export interface BikeModel {
  id: string;
  brand: string;
  model: string;
  year: number;
  engineCC: number;
  power?: string;
  torque?: string;
  price?: string;
  category: string;
  description: string;
}

export const bikeData: BikeModel[] = [
  // Hero Honda / Hero MotoCorp Models (2000-2025)
  {
    id: "hh-cd100",
    brand: "Hero Honda",
    model: "CD 100",
    year: 2000,
    engineCC: 97,
    power: "7.5 HP",
    category: "Commuter",
    description: "The first Hero Honda bike in India, known for its reliability and fuel efficiency"
  },
  {
    id: "hh-splendor",
    brand: "Hero",
    model: "Splendor Plus",
    year: 2023,
    engineCC: 97,
    power: "8.02 PS",
    torque: "8.05 Nm",
    price: "₹74,932",
    category: "Commuter",
    description: "India's highest selling motorcycle known for reliability and mileage"
  },
  {
    id: "hh-passion",
    brand: "Hero",
    model: "Passion Pro",
    year: 2023,
    engineCC: 110,
    power: "9.15 PS",
    torque: "9.89 Nm",
    price: "₹77,176",
    category: "Commuter",
    description: "Stylish commuter bike with modern features"
  },
  {
    id: "hh-karizma",
    brand: "Hero Honda",
    model: "Karizma",
    year: 2003,
    engineCC: 223,
    power: "19.2 PS",
    category: "Sports",
    description: "One of the first premium sports bikes in India, known for its touring capabilities"
  },
  {
    id: "hero-xtreme160r",
    brand: "Hero",
    model: "Xtreme 160R",
    year: 2023,
    engineCC: 163,
    power: "15.2 PS",
    torque: "14 Nm",
    price: "₹1.19 Lakh",
    category: "Sports",
    description: "Modern sports commuter with aggressive styling"
  },

  // Bajaj Models
  {
    id: "bajaj-pulsar150",
    brand: "Bajaj",
    model: "Pulsar 150",
    year: 2001,
    engineCC: 150,
    power: "14 PS",
    category: "Sports",
    description: "Revolutionary sports bike that changed Indian motorcycle market"
  },
  {
    id: "bajaj-pulsar-n160",
    brand: "Bajaj", 
    model: "Pulsar N160",
    year: 2023,
    engineCC: 160,
    power: "16 PS",
    torque: "14.65 Nm",
    price: "₹1.22 Lakh",
    category: "Sports",
    description: "Modern iteration of the iconic Pulsar with dual channel ABS"
  },
  {
    id: "bajaj-chetak",
    brand: "Bajaj",
    model: "Chetak",
    year: 2000,
    engineCC: 145,
    power: "7.5 PS",
    category: "Scooter",
    description: "The iconic Indian scooter that ruled roads for decades"
  },
  {
    id: "bajaj-avenger220",
    brand: "Bajaj",
    model: "Avenger 220",
    year: 2023,
    engineCC: 220,
    power: "19.03 PS",
    torque: "17.55 Nm",
    price: "₹1.37 Lakh",
    category: "Cruiser",
    description: "Affordable cruiser with comfortable riding position"
  },

  // Royal Enfield Models
  {
    id: "re-classic350-old",
    brand: "Royal Enfield",
    model: "Classic 350 (UCE)",
    year: 2009,
    engineCC: 346,
    power: "19.8 bhp",
    category: "Cruiser",
    description: "The iconic Royal Enfield with Unit Construction Engine"
  },
  {
    id: "re-classic350-new",
    brand: "Royal Enfield",
    model: "Classic 350 (J-Series)",
    year: 2023,
    engineCC: 349,
    power: "20.2 bhp",
    torque: "27 Nm",
    price: "₹1.93 Lakh",
    category: "Cruiser",
    description: "New generation Classic with modern J-series engine"
  },
  {
    id: "re-hunter350",
    brand: "Royal Enfield",
    model: "Hunter 350",
    year: 2023,
    engineCC: 349,
    power: "20.2 bhp",
    torque: "27 Nm",
    price: "₹1.50 Lakh",
    category: "Roadster",
    description: "Modern roadster with retro styling"
  },
  {
    id: "re-himalayan",
    brand: "Royal Enfield",
    model: "Himalayan",
    year: 2023,
    engineCC: 411,
    power: "24.3 bhp",
    torque: "32 Nm",
    price: "₹2.16 Lakh",
    category: "Adventure",
    description: "Purpose-built adventure tourer for all terrains"
  },

  // Yamaha Models
  {
    id: "yamaha-rx100",
    brand: "Yamaha",
    model: "RX 100",
    year: 2000,
    engineCC: 98,
    power: "11 bhp",
    category: "Sports",
    description: "Legendary 2-stroke performance bike"
  },
  {
    id: "yamaha-mt15",
    brand: "Yamaha",
    model: "MT 15 V2",
    year: 2023,
    engineCC: 155,
    power: "18.4 PS",
    torque: "14.1 Nm",
    price: "₹1.70 Lakh",
    category: "Sports",
    description: "Modern street fighter with aggressive styling"
  },
  {
    id: "yamaha-r15",
    brand: "Yamaha",
    model: "R15 V4",
    year: 2023,
    engineCC: 155,
    power: "18.4 PS",
    torque: "14.2 Nm",
    price: "₹1.82 Lakh",
    category: "Sports",
    description: "Race-inspired supersport with advanced features"
  },

  // Honda Models
  {
    id: "honda-unicorn",
    brand: "Honda",
    model: "CB Unicorn",
    year: 2005,
    engineCC: 150,
    power: "13.3 bhp",
    category: "Commuter",
    description: "Premium commuter with reliable performance"
  },
  {
    id: "honda-sp125",
    brand: "Honda",
    model: "SP 125",
    year: 2023,
    engineCC: 124,
    power: "10.8 PS",
    torque: "10.9 Nm",
    price: "₹90,117",
    category: "Commuter",
    description: "Modern 125cc commuter with fuel injection"
  },
  {
    id: "honda-cb350",
    brand: "Honda",
    model: "H'ness CB350",
    year: 2023,
    engineCC: 348,
    power: "21.07 PS",
    torque: "30 Nm",
    price: "₹2.09 Lakh",
    category: "Modern Classic",
    description: "Modern classic with retro styling and advanced features"
  },

  // TVS Models
  {
    id: "tvs-apache160",
    brand: "TVS",
    model: "Apache RTR 160",
    year: 2023,
    engineCC: 160,
    power: "17.55 PS",
    torque: "14.73 Nm",
    price: "₹1.18 Lakh",
    category: "Sports",
    description: "Race-inspired performance commuter"
  },
  {
    id: "tvs-raider",
    brand: "TVS",
    model: "Raider 125",
    year: 2023,
    engineCC: 124,
    power: "11.4 PS",
    torque: "11.2 Nm",
    price: "₹90,094",
    category: "Commuter",
    description: "Premium 125cc commuter with modern features"
  },
  {
    id: "tvs-apache-rr310",
    brand: "TVS",
    model: "Apache RR 310",
    year: 2023,
    engineCC: 312,
    power: "34 PS",
    torque: "27.3 Nm",
    price: "₹2.72 Lakh",
    category: "Sports",
    description: "Flagship supersport with track-focused features"
  },

  // KTM Models
  {
    id: "ktm-duke200",
    brand: "KTM",
    model: "200 Duke",
    year: 2023,
    engineCC: 199,
    power: "25 PS",
    torque: "19.3 Nm",
    price: "₹2.05 Lakh",
    category: "Sports",
    description: "Entry-level KTM with aggressive performance"
  },
  {
    id: "ktm-390-adv",
    brand: "KTM",
    model: "390 Adventure",
    year: 2023,
    engineCC: 373,
    power: "43.5 PS",
    torque: "37 Nm",
    price: "₹3.37 Lakh",
    category: "Adventure",
    description: "High-performance adventure tourer with advanced electronics"
  },

  // Triumph Models
  {
    id: "triumph-scrambler400x",
    brand: "Triumph",
    model: "Scrambler 400 X",
    year: 2024,
    engineCC: 398,
    power: "40 PS",
    torque: "37.5 Nm",
    price: "₹2.94 Lakh",
    category: "Scrambler",
    description: "Modern classic scrambler with premium features"
  },
  {
    id: "triumph-speed400",
    brand: "Triumph",
    model: "Speed 400",
    year: 2024,
    engineCC: 398,
    power: "40 PS",
    torque: "37.5 Nm",
    price: "₹2.33 Lakh",
    category: "Roadster",
    description: "Modern roadster with classic British styling"
  }
];

export const bikeCategories = [
  "All",
  "Commuter",
  "Sports",
  "Cruiser",
  "Adventure",
  "Scrambler",
  "Roadster",
  "Modern Classic",
  "Scooter"
]; 
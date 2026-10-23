export const KADAPA_LOCALITIES = [
  "Apsara Circle",
  "RTC Bus Stand Road",
  "Maruthi Nagar",
  "Yerramukkapalli",
  "Prakash Nagar",
  "Nagarajupet",
  "Chinna Chowk",
  "Rami Reddy Nagar",
  "Ravindra Nagar",
  "Co-operative Colony",
  "Palempalli",
  "Madhavaram Road"
];

export const SERVICES = [
  {
    id: "plumbing",
    title: "Plumbing",
    subtitle: "Leaks, pipe fittings, taps & water tanks",
    description: "Expert resolution for dripping faucets, pipe bursts, bathroom fixtures, pump motor installations, and overhead tank cleaning.",
    iconName: "Wrench",
    badge: "Most Requested",
    startingPrice: 199,
    priceNote: "Inspection fee from ₹199 (adjusted in final bill)",
    avgTime: "45-60 mins",
    popularIssues: ["Tap leakage repair", "Bathroom pipeline block", "Geyser plumbing", "Water motor fitting"],
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "electrical",
    title: "Electrical Repairs",
    subtitle: "Wiring, switches, tripping MCB & fans",
    description: "Certified electricians for short circuit diagnosis, switchboard repairs, ceiling fans, inverter wiring, and LED illumination setups.",
    iconName: "Zap",
    badge: "Fast 30-min Arrival",
    startingPrice: 149,
    priceNote: "Minor fixes from ₹149",
    avgTime: "30-45 mins",
    popularIssues: ["MCB tripping diagnosis", "Ceiling fan installation", "Switchboard sparking", "Inverter wiring"],
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "carpentry",
    title: "Carpentry",
    subtitle: "Door latches, modular fittings & furniture",
    description: "Precision woodworkers for lock replacements, sagging cupboard doors, bed assembly, custom modular shelves, and termite panel repairs.",
    iconName: "Hammer",
    badge: "Skilled Craftsmen",
    startingPrice: 249,
    priceNote: "Furniture repair starts at ₹249",
    avgTime: "1-2 hours",
    popularIssues: ["Door lock fitting", "Wardrobe hinge repair", "Sofa squeak fix", "Bed frame assembly"],
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "painting",
    title: "Painting",
    subtitle: "Wall retouching, waterproofing & repainting",
    description: "Professional interior and exterior wall painters. Includes dampness treatment, putty touch-ups, stain removals, and complete room painting.",
    iconName: "Paintbrush",
    badge: "Eco-friendly Paints",
    startingPrice: 499,
    priceNote: "Touchups from ₹499 / Room packages available",
    avgTime: "Half/Full day",
    popularIssues: ["Water seepage patching", "Single wall accent painting", "Door/window enamel polish", "Full house makeover"],
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "ac-repair",
    title: "AC Repair & Maintenance",
    subtitle: "Deep coil wash, gas refill & cooling issues",
    description: "Stay cool in Kadapa's climate. Complete jet-pump foam cleaning, refrigerant gas leakage diagnosis, PCB troubleshooting, and AC relocation.",
    iconName: "Snowflake",
    badge: "Kadapa Summer Special",
    startingPrice: 399,
    priceNote: "Jet service starting at ₹399",
    avgTime: "45-90 mins",
    popularIssues: ["AC not cooling / low airflow", "Water leakage from indoor unit", "Gas refill (R32/R410A)", "Seasonal jet foam service"],
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "appliances",
    title: "Appliance Repairs",
    subtitle: "Washing machines, fridges, microwaves & RO",
    description: "Multi-brand troubleshooting for front/top load washing machines, refrigerators, water purifiers (RO/UV), and kitchen chimneys.",
    iconName: "Tv",
    badge: "Genuine Spares",
    startingPrice: 299,
    priceNote: "Diagnostic visit ₹299",
    avgTime: "45-60 mins",
    popularIssues: ["Washing machine spin vibration", "Refrigerator cooling problem", "RO filter replacement", "Microwave heating failure"],
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "cleaning",
    title: "Cleaning & Maintenance",
    subtitle: "Deep home sanitization & water tank cleaning",
    description: "Comprehensive kitchen degreasing, bathroom descaling, overhead water tank sanitization, and seasonal pre-festival deep cleaning.",
    iconName: "Sparkles",
    badge: "100% Sanitized",
    startingPrice: 349,
    priceNote: "Deep bathroom clean from ₹349",
    avgTime: "2-4 hours",
    popularIssues: ["Underground sump/tank cleaning", "Intensive kitchen cleaning", "Tile stain removal", "Move-in deep sanitize"],
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80"
  }
];

export const DEMO_PROFESSIONALS = [
  {
    id: "pro-1",
    name: "K. Venkatesh",
    role: "Senior Electrician",
    category: "electrical",
    experience: "8+ yrs experience",
    rating: 4.9,
    reviewCount: 142,
    locality: "Maruthi Nagar, Kadapa",
    languages: "Telugu, Hindi, English",
    pricing: "₹149 visiting / standard rates",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    skills: ["MCB Panels", "House Wiring", "Inverter Setups"],
    availability: "Available Today in Kadapa",
    verifiedBadge: "Demonstration Profile"
  },
  {
    id: "pro-2",
    name: "Shaik Mohammad Rafiq",
    role: "Master Plumber",
    category: "plumbing",
    experience: "11+ yrs experience",
    rating: 4.85,
    reviewCount: 189,
    locality: "Yerramukkapalli, Kadapa",
    languages: "Telugu, Urdu, Hindi",
    pricing: "₹199 inspection fee",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    skills: ["Leak Detection", "PVC & CPVC Fittings", "Motor Pumps"],
    availability: "Slots Open from 2:00 PM",
    verifiedBadge: "Demonstration Profile"
  },
  {
    id: "pro-3",
    name: "Chandra Sekhar Reddy",
    role: "HVAC & AC Specialist",
    category: "ac-repair",
    experience: "6+ yrs experience",
    rating: 4.92,
    reviewCount: 96,
    locality: "RTC Bus Stand Road, Kadapa",
    languages: "Telugu, English",
    pricing: "₹399 jet foam service",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    skills: ["Split ACs", "Gas Charging", "Inverter AC PCBs"],
    availability: "Available within 45 mins",
    verifiedBadge: "Demonstration Profile"
  },
  {
    id: "pro-4",
    name: "G. Ramanjaneyulu",
    role: "Furniture & Door Carpenter",
    category: "carpentry",
    experience: "14+ yrs experience",
    rating: 4.88,
    reviewCount: 124,
    locality: "Nagarajupet, Kadapa",
    languages: "Telugu",
    pricing: "₹249 basic fitting",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    skills: ["Godrej Locks", "Cupboard Hinges", "Custom Woodwork"],
    availability: "Available Tomorrow morning",
    verifiedBadge: "Demonstration Profile"
  }
];

export const TESTIMONIALS = [
  {
    id: "t-1",
    name: "Sowmya Lakshmi P.",
    locality: "Prakash Nagar, Kadapa",
    service: "AC Jet Servicing",
    rating: 5,
    date: "2 days ago",
    text: "During the peak heat in Kadapa, our hall AC stopped cooling. Booked on FixMate at 10 AM, and the technician was at our doorstep by 11:15 AM. Upfront pricing and zero mess left behind!"
  },
  {
    id: "t-2",
    name: "Dr. K. Srinivasulu",
    locality: "Chinna Chowk, Kadapa",
    service: "Electrical Wiring & Inverter",
    rating: 5,
    date: "Last week",
    text: "Finding skilled electricians who arrive on time in Kadapa used to be a hassle. FixMate's professional diagnosed a persistent tripping issue in 20 minutes. Highly recommended for families."
  },
  {
    id: "t-3",
    name: "Farhan Basha",
    locality: "Apsara Circle, Kadapa",
    service: "Bathroom Plumbing & Motor Fitting",
    rating: 5,
    date: "3 weeks ago",
    text: "Transparent pricing in rupees before the work began was refreshing. No unnecessary parts added. Very polite technician and super easy booking interface."
  }
];

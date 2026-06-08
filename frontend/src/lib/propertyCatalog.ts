const defaultImage =
  "https://images.unsplash.com/photo-1500382017468-f049863256f0?w=1200&h=800&fit=crop";

export interface NormalizedProperty {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  lat: number;
  lng: number;
  images: string[];
  beds: number;
  baths: number;
  sqft: number;
  type: string;
  featured: boolean;
  features: string[];
  yearBuilt: number;
  parkingSpaces: number;
  lotSize: string;
  status: string;
  owner: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
}

const fallbackCatalog: NormalizedProperty[] = [
  {
    id: "1",
    title: "Modern Downtown Loft",
    description: "Open-plan downtown loft with skyline views, premium finishes, and walkable access to dining and transit.",
    price: 850000,
    address: "123 Main St, Downtown",
    lat: 40.7589,
    lng: -73.9851,
    images: [
      "https://images.unsplash.com/photo-1500382017468-f049863256f0?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1500595046891-2d5b0bb53d17?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    ],
    beds: 2,
    baths: 2,
    sqft: 1200,
    type: "Condo",
    featured: true,
    features: ["Empty lot", "Prime location", "Development ready", "Clear title"],
    yearBuilt: 2020,
    parkingSpaces: 1,
    lotSize: "N/A",
    status: "For Sale",
    owner: {
      name: "CloudHome Sales Team",
      email: "sales@cloudhome.com",
      phone: "+1 (555) 101-2001",
      avatar: "",
    },
  },
  {
    id: "2",
    title: "Luxury Family Home",
    description: "Large family home with a landscaped backyard, generous living spaces, and refined interior detailing.",
    price: 1250000,
    address: "456 Oak Avenue, Westside",
    lat: 40.7505,
    lng: -73.9934,
    images: [
      "https://images.unsplash.com/photo-1500902127606-b4934b584a84?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-f049863256f0?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&h=800&fit=crop",
    ],
    beds: 4,
    baths: 3,
    sqft: 2800,
    type: "House",
    featured: true,
    features: ["Vacant land", "Development potential", "Large lot", "Clear deed"],
    yearBuilt: 2018,
    parkingSpaces: 2,
    lotSize: "0.28 acres",
    status: "For Sale",
    owner: {
      name: "CloudHome Luxury Desk",
      email: "luxury@cloudhome.com",
      phone: "+1 (555) 101-2002",
      avatar: "",
    },
  },
  {
    id: "3",
    title: "Cozy Suburban Home",
    description: "Comfortable suburban property with natural light, a quiet street setting, and strong neighborhood amenities.",
    price: 675000,
    address: "789 Pine Street, Suburbs",
    lat: 40.7614,
    lng: -73.9776,
    images: [
      "https://images.unsplash.com/photo-1500595046891-2d5b0bb53d17?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-f049863256f0?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    ],
    beds: 3,
    baths: 2,
    sqft: 1800,
    type: "House",
    featured: false,
    features: ["Open land", "Buildable", "Quiet area", "Road access"],
    yearBuilt: 2015,
    parkingSpaces: 2,
    lotSize: "0.19 acres",
    status: "For Sale",
    owner: {
      name: "CloudHome Residential Team",
      email: "homes@cloudhome.com",
      phone: "+1 (555) 101-2003",
      avatar: "",
    },
  },
  {
    id: "4",
    title: "Waterfront Apartment",
    description: "Contemporary apartment with wide water views, resort-style amenities, and a bright open living area.",
    price: 920000,
    address: "321 Harbor View, Marina",
    lat: 40.7282,
    lng: -74.0776,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1500595046891-2d5b0bb53d17?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-f049863256f0?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&h=800&fit=crop",
    ],
    beds: 2,
    baths: 2,
    sqft: 1400,
    type: "Apartment",
    featured: false,
    features: ["Waterfront vacant lot", "Water access", "Clear land", "Great views"],
    yearBuilt: 2021,
    parkingSpaces: 1,
    lotSize: "N/A",
    status: "For Sale",
    owner: {
      name: "CloudHome Marina Desk",
      email: "marina@cloudhome.com",
      phone: "+1 (555) 101-2004",
      avatar: "",
    },
  },
  {
    id: "rent-1",
    title: "Studio Apartment Downtown",
    description: "Compact downtown studio with efficient storage, bright interiors, and quick access to city essentials.",
    price: 2500,
    address: "Manhattan, NY",
    lat: 40.7484,
    lng: -73.9857,
    images: [
      "https://images.unsplash.com/photo-1500382017468-f049863256f0?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1500595046891-2d5b0bb53d17?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    ],
    beds: 0,
    baths: 1,
    sqft: 600,
    type: "Studio",
    featured: false,
    features: ["Downtown vacant land", "Prime location", "Development zone", "Good access"],
    yearBuilt: 2019,
    parkingSpaces: 0,
    lotSize: "N/A",
    status: "For Rent",
    owner: {
      name: "CloudHome Rentals",
      email: "rentals@cloudhome.com",
      phone: "+1 (555) 202-3001",
      avatar: "",
    },
  },
  {
    id: "rent-2",
    title: "Spacious 2BR Apartment",
    description: "Well-proportioned rental with two bedrooms, modern fixtures, and a comfortable open kitchen layout.",
    price: 3200,
    address: "Brooklyn, NY",
    lat: 40.6782,
    lng: -73.9442,
    images: [
      "https://images.unsplash.com/photo-1500595046891-2d5b0bb53d17?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-f049863256f0?w=1200&h=800&fit=crop",
    ],
    beds: 2,
    baths: 2,
    sqft: 1100,
    type: "Apartment",
    featured: false,
    features: ["Empty plot", "Accessible", "Utilities nearby", "Development ready"],
    yearBuilt: 2017,
    parkingSpaces: 1,
    lotSize: "N/A",
    status: "For Rent",
    owner: {
      name: "CloudHome Rentals",
      email: "rentals@cloudhome.com",
      phone: "+1 (555) 202-3002",
      avatar: "",
    },
  },
  {
    id: "rent-3",
    title: "Luxury 3BR Penthouse",
    description: "High-floor penthouse rental with expansive city views, elegant interiors, and premium concierge services.",
    price: 6500,
    address: "Manhattan, NY",
    lat: 40.7612,
    lng: -73.9776,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1500595046891-2d5b0bb53d17?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-f049863256f0?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&h=800&fit=crop",
    ],
    beds: 3,
    baths: 2,
    sqft: 1800,
    type: "Penthouse",
    featured: true,
    features: ["Premium land", "Scenic views", "High location", "Investment opportunity"],
    yearBuilt: 2022,
    parkingSpaces: 2,
    lotSize: "N/A",
    status: "For Rent",
    owner: {
      name: "CloudHome Premier Rentals",
      email: "premier@cloudhome.com",
      phone: "+1 (555) 202-3003",
      avatar: "",
    },
  },
];

export const fallbackProperties = fallbackCatalog;

export function getPropertyId(property: any): string {
  const rawId = property?._id ?? property?.id ?? property?.propertyId?._id ?? property?.propertyId?.id;
  return String(rawId ?? "");
}

export function normalizeProperty(property: any): NormalizedProperty {
  const fallback = fallbackCatalog.find((item) => item.id === getPropertyId(property));
  const imageList = Array.isArray(property?.images)
    ? property.images.filter(Boolean)
    : property?.image
      ? [property.image]
      : fallback?.images ?? [defaultImage];

  return {
    id: getPropertyId(property) || fallback?.id || `property-${Date.now()}`,
    title: property?.title || fallback?.title || "Untitled Property",
    description:
      property?.description ||
      fallback?.description ||
      "CloudHome curated property details are available on request.",
    price: Number(property?.price ?? fallback?.price ?? 0),
    address: property?.address || property?.location || fallback?.address || "Address unavailable",
    lat: Number(property?.lat ?? fallback?.lat ?? 40.7589),
    lng: Number(property?.lng ?? fallback?.lng ?? -73.9851),
    images: imageList.length ? imageList : [defaultImage],
    beds: Number(property?.beds ?? fallback?.beds ?? 0),
    baths: Number(property?.baths ?? fallback?.baths ?? 0),
    sqft: Number(property?.sqft ?? fallback?.sqft ?? 0),
    type: property?.type || fallback?.type || "Property",
    featured: Boolean(property?.featured ?? fallback?.featured ?? false),
    features:
      Array.isArray(property?.features) && property.features.length
        ? property.features
        : fallback?.features ?? ["Professional management", "Prime location", "Move-in ready"],
    yearBuilt: Number(property?.yearBuilt ?? fallback?.yearBuilt ?? 2020),
    parkingSpaces: Number(property?.parkingSpaces ?? fallback?.parkingSpaces ?? 1),
    lotSize: property?.lotSize || fallback?.lotSize || "N/A",
    status: property?.status || fallback?.status || "Available",
    owner: {
      name: property?.owner?.name || fallback?.owner.name || "CloudHome Team",
      email: property?.owner?.email || fallback?.owner.email || "info@cloudhome.com",
      phone: property?.owner?.phone || fallback?.owner.phone || "+1 (555) 000-0000",
      avatar: property?.owner?.avatar || fallback?.owner.avatar || "",
    },
  };
}

export function getFallbackPropertyById(id: string) {
  return fallbackCatalog.find((property) => property.id === id) || null;
}

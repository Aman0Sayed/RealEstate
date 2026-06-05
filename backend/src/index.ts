import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

// Check for required environment variables
const requiredEnv = ['CLIENT_URL'];
for (const envName of requiredEnv) {
  if (!process.env[envName]) {
    console.warn(`Optional environment variable not set: ${envName}`);
  }
}

const app = express();

// Trust the first proxy (Vercel)
app.set('trust proxy', 1);

const localOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
  'http://localhost:8081',
  'http://127.0.0.1:8081',
];

const allowedOrigins = new Set([
  process.env.CLIENT_URL,
  ...localOrigins,
].filter(Boolean) as string[]);

app.use(helmet({ contentSecurityPolicy: false }));

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (([...allowedOrigins] as string[]).includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// Static property data - Burundi Land Plots
const properties = [
  {
    id: 1,
    title: "Premium Land Plot - Bujumbura",
    price: 2500000,
    address: "Bujumbura",
    beds: 0,
    baths: 0,
    sqft: 5000,
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=800&h=600&fit=crop",
    description: "Premium empty land plot in Bujumbura. Ideal for residential or commercial development. Prime location.",
    type: "Land Plot"
  },
  {
    id: 2,
    title: "Commercial Land - Gitega",
    price: 3200000,
    address: "Gitega",
    beds: 0,
    baths: 0,
    sqft: 8000,
    image: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=800&h=600&fit=crop",
    description: "Large commercial land plot in Gitega capital city. Perfect for business development and investment.",
    type: "Land Plot"
  },
  {
    id: 3,
    title: "Residential Land - Ngozi",
    price: 1800000,
    address: "Ngozi",
    beds: 0,
    baths: 0,
    sqft: 6000,
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=800&h=600&fit=crop",
    description: "Beautiful residential land plot in Ngozi province. Peaceful location with great potential.",
    type: "Land Plot"
  },
  {
    id: 4,
    title: "Waterfront Land - Bujumbura",
    price: 4500000,
    address: "Bujumbura",
    beds: 0,
    baths: 0,
    sqft: 12000,
    image: "https://images.unsplash.com/photo-1500382017468-7049fae79eef?w=800&h=600&fit=crop",
    description: "Exclusive waterfront land plot near Lake Tanganyika in Bujumbura. Premium investment opportunity.",
    type: "Land Plot"
  },
  {
    id: 5,
    title: "Development Land - Muramvya",
    price: 1400000,
    address: "Muramvya",
    beds: 0,
    baths: 0,
    sqft: 4500,
    image: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=800&h=600&fit=crop",
    description: "Great land plot in Muramvya for development projects. Strategic location with road access.",
    type: "Land Plot"
  },
  {
    id: 6,
    title: "Prime Land - Gitega CBD",
    price: 2800000,
    address: "Gitega",
    beds: 0,
    baths: 0,
    sqft: 3500,
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=800&h=600&fit=crop",
    description: "Prime land in Gitega's central business district. Excellent for retail or office development.",
    type: "Land Plot"
  },
  {
    id: 7,
    title: "Agricultural Land - Ngozi",
    price: 1950000,
    address: "Ngozi",
    beds: 0,
    baths: 0,
    sqft: 7500,
    image: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=800&h=600&fit=crop",
    description: "Fertile agricultural land plot in Ngozi. Perfect for farming and cultivation projects.",
    type: "Land Plot"
  },
  {
    id: 8,
    title: "Investment Land - Bujumbura Downtown",
    price: 3800000,
    address: "Bujumbura",
    beds: 0,
    baths: 0,
    sqft: 5500,
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=800&h=600&fit=crop",
    description: "Strategic investment land in downtown Bujumbura. High-value property with excellent appreciation potential.",
    type: "Land Plot"
  },
  {
    id: 9,
    title: "Industrial Land - Gitega",
    price: 2200000,
    address: "Gitega",
    beds: 0,
    baths: 0,
    sqft: 9000,
    image: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=800&h=600&fit=crop",
    description: "Large industrial land plot in Gitega industrial zone. Suitable for manufacturing and production facilities.",
    type: "Land Plot"
  },
  {
    id: 10,
    title: "Scenic Land - Muramvya Heights",
    price: 2100000,
    address: "Muramvya",
    beds: 0,
    baths: 0,
    sqft: 6800,
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=800&h=600&fit=crop",
    description: "Beautiful scenic land plot on Muramvya Heights. Stunning views and serene environment for development.",
    type: "Land Plot"
  },
  {
    id: 11,
    title: "Mixed Use Land - Bujumbura",
    price: 3600000,
    address: "Bujumbura",
    beds: 0,
    baths: 0,
    sqft: 7000,
    image: "https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=800&h=600&fit=crop",
    description: "Versatile mixed-use land plot in Bujumbura. Ideal for residential, commercial, or retail development.",
    type: "Land Plot"
  },
  {
    id: 12,
    title: "Residential Community Land - Ngozi",
    price: 2600000,
    address: "Ngozi",
    beds: 0,
    baths: 0,
    sqft: 8500,
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=800&h=600&fit=crop",
    description: "Large residential community land plot in Ngozi. Perfect for planned residential development and housing projects.",
    type: "Land Plot"
  }
];

// Routes
app.get('/', (_req: Request, res: Response) =>
  res.json({ status: 'Real Estate Business API running' })
);

app.get('/api/properties', (_req: Request, res: Response) => {
  res.json(properties);
});

app.get('/api/properties/:id', (req: Request, res: Response) => {
  const property = properties.find(p => p.id === parseInt(req.params.id));
  if (!property) {
    return res.status(404).json({ error: 'Property not found' });
  }
  res.json(property);
});

app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, phone, message } = req.body;
  
  // Validate inputs
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  // In a real application, you would send an email here
  // For now, we just log and return success
  console.log('Contact form submission:', { name, email, phone, message, timestamp: new Date().toISOString() });
  
  res.json({ 
    success: true, 
    message: 'Thank you for your inquiry. We will contact you soon!' 
  });
});

export default app;

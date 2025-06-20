import { NextRequest, NextResponse } from "next/server";

// Bestseller items with improved descriptions
let bestsellers = [
  {
    id: 1,
    title: "Ukanmuri Book Clip",
    image: "/carousel/bestsellerclip.jpg",
    price: 570,
    regular: 850,
    colors: ["yellow", "red", "blue"],
    description: "Secure your pages in style with this durable book clip — perfect for readers, students, and planners. Compact, colorful, and dependable.",
  },
  {
    id: 2,
    title: "Kurutoga Pencil",
    image: "/carousel/bestseller2.jpg",
    price: 560,
    regular: 999,
    colors: ["blue", "orange", "teal", "gray"],
    description: "Engineered for precision, this auto-rotating mechanical pencil keeps your lines sharp and consistent. Ideal for artists and note-takers alike.",
  },
  {
    id: 3,
    title: "Yu‑Sari Notebook",
    image: "/carousel/bestseller3.jpg",
    price: 990,
    regular: 1100,
    colors: ["gray", "red"],
    description: "A premium-quality notebook with smooth, bleed-resistant paper. Great for journaling, sketching, and bullet planning with elegance.",
  },
  {
    id: 4,
    title: "Kakusta Pen Case",
    image: "/carousel/bestseller4.jpg",
    price: 1890,
    regular: 2000,
    colors: ["green", "pink"],
    description: "A sleek, expandable pen case that fits all your writing tools. Made with durable fabric and chic minimal style for everyday carry.",
  },
  {
    id: 5,
    title: "Cardboard Cutter",
    image: "/carousel/bestseller5.jpg",
    price: 570,
    regular: 850,
    colors: ["yellow", "red", "blue"],
    description: "Compact and sharp, this ergonomic cutter slices cardboard with ease. Safety-first design and replaceable blade included.",
  },
  {
    id: 6,
    title: "Pen Set",
    image: "/carousel/bestseller6.jpg",
    price: 570,
    regular: 850,
    colors: ["yellow", "pink", "blue"],
    description: "A colorful set of smooth-glide gel pens — perfect for writing, doodling, or gifting. Long-lasting ink and ergonomic grip.",
  },
  {
    id: 7,
    title: "Mildliner Highlighters",
    image: "/carousel/bestseller7.jpg",
    price: 570,
    regular: 850,
    colors: ["yellow", "red", "blue"],
    description: "Dual-tip pastel highlighters for organizing, studying, or journaling. Subtle colors and smooth ink for no-bleed notes.",
  },
  {
    id: 8,
    title: "Flower Notebook",
    image: "/carousel/bestseller8.jpg",
    price: 570,
    regular: 850,
    colors: ["yellow", "red", "blue"],
    description: "Brighten your workspace with this floral-designed notebook. Features premium pages and a durable stitched spine.",
  },
];

// GET: Fetch all bestsellers
export async function GET() {
  return NextResponse.json(bestsellers);
}

// POST: Add a new bestseller item
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newProduct = {
      id: Date.now(),
      ...data,
    };
    bestsellers.push(newProduct);
    return NextResponse.json({ success: true, product: newProduct });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid data" },
      { status: 400 }
    );
  }
}

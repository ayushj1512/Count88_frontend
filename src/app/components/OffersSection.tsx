// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";

// const offers = [
//   {
//     price: 99,
//     image: "/carousel/notebook.jpg",
//     alt: "Notebook & Pen",
//     link: "/collections/products-under-99",
//   },
//   {
//     price: 99,
//     image: "/carousel/travel tags.jpg",
//     alt: "Travel Tags & Pouch",
//     link: "/collections/products-under-99",
//   },
//   {
//     price: 199,
//     image: "/carousel/stickynotes.jpg",
//     alt: "Sticky Notes & Scissors",
//     link: "/collections/products-under-199",
//   },
//   {
//     price: 299,
//     image: "/carousel/colourpencils.jpg",
//     alt: "Color Pencils & Scissors",
//     link: "/collections/products-under-299",
//   },
//   {
//     price: 299,
//     image: "/carousel/brushmarker.jpg",
//     alt: "Notebook & Brush Marker",
//     link: "/collections/products-under-299",
//   },
//   {
//     price: 499,
//     image: "/carousel/pencilcase.jpg",
//     alt: "Calculator & Pencil Case",
//     link: "/collections/products-under-499",
//   },
// ];

// export default function OffersSection() {
//   const router = useRouter();

//   return (
//     <section className="relative bg-[#FEF1CB] pt-0">
//       <h2 className="text-center text-3xl font-bold text-gray-800 mb-10">
//         SHOP BY ART TYPE
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-10 md:px-20">
//         {offers.map((offer, index) => (
//           <div
//             key={index}
//             className="bg-white p-4 rounded-lg shadow hover:shadow-xl transition-all duration-300 cursor-pointer"
//             onClick={() => router.push(offer.link)}
//           >
//             <div className="w-full h-60 relative overflow-hidden rounded-md">
//               <Image
//                 src={offer.image}
//                 alt={offer.alt}
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-md"
//               />
//             </div>
//             <div className="mt-4 text-center">
//               <h3 className="text-xl font-semibold text-gray-700 mb-2">
//                 UNDER ₹{offer.price}
//               </h3>
//               <button className="border border-gray-800 bg-red-600 text-white px-4 py-1 rounded hover:bg-white hover:text-red-500 transition">
//                 SHOP NOW
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//        {/* Wave Divider at Bottom */}
//       <div className="-mt-1 overflow-hidden leading-none bg-[#FEF1CB]">
//         <svg
//           viewBox="0 0 1200 120"
//           preserveAspectRatio="none"
//           className="w-full h-20"
//         >
//           <path
//             d="M0,0 C100,50 150,-30 300,30 C450,90 550,-20 700,40 C850,100 1000,-10 1200,50 L1200,120 L0,120 Z"
//             fill="#fdf2f8
// "
//           />
//         </svg>
//       </div>
//     </section>
//   );
// }

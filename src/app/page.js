import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-orange-400 to-orange-500 p-6">
      <div className="container mx-auto flex flex-col justify-center items-center">
          <h2 className="text-4xl text-white font-bold mb-4">Browse Our Blog Collections</h2>
          <Link href={'/blogs'} className="bg-white text-sm text-orange-700 font-semibold py-2 px-6 rounded">Explore Blogs</Link>
      </div>
    </div>
  );
}

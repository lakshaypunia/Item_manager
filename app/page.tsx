import { Button } from "@/components/ui/button";
import { Eye, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (

    <div className="h-screen">
      {/* Hero Section */}
      <section className=" h-full bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">Item Manager</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Organize, manage, and showcase your items with ease. Add new items to your inventory and browse through your
            collection with our intuitive interface.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link href="/add-item">
                <Plus className="h-5 w-5 mr-2" />
                Add Your First Item
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link href="/view-item">
                <Eye className="h-5 w-5 mr-2" />
                Browse Items
              </Link>
            </Button>
          </div>
        </div>
      </section>
      </div>
  );
}

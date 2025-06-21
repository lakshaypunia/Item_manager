"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Plus, Eye, Menu, X, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              Item Manager
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            <Button variant={isActive("/") ? "default" : "ghost"} asChild className="flex items-center">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button variant={isActive("/add-item") ? "default" : "ghost"} asChild className="flex items-center">
              <Link href="/add-item">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Link>
            </Button>
            <Button variant={isActive("/view-item") ? "default" : "ghost"} asChild className="flex items-center">
              <Link href="/view-item">
                <Eye className="h-4 w-4 mr-2" />
                View Items
              </Link>
            </Button>
            <Button variant={isActive("/ENQIRY_EMAIL") ? "default" : "ghost"} asChild className="flex items-center">
              <Link href="/ENQUIRY_EMAIL">
                <Home className="h-4 w-4 mr-2" />
                Add ENQUIRY EMAIL
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              asChild
              className="w-full justify-start"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button
              variant={isActive("/add-item") ? "default" : "ghost"}
              asChild
              className="w-full justify-start"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href="/add-item">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Link>
            </Button>
            <Button
              variant={isActive("/view-item") ? "default" : "ghost"}
              asChild
              className="w-full justify-start"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href="/view-item">
                <Eye className="h-4 w-4 mr-2" />
                View Items
              </Link>
            </Button>
            <Button
              variant={isActive("/ENQUIRY_EMAIL") ? "default" : "ghost"}
              asChild
              className="w-full justify-start"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href="/ENQUIRY_EMAIL">
                <Plus className="h-4 w-4 mr-2" />
                Add ENQUIRY EMAIL
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
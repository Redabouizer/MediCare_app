"use client"

import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const Navigation = () => {
  const location = useLocation()
  const { isAuthenticated, user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/doctors", label: "Doctors" },
    { path: "/contact", label: "Contact" },
  ]

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-slate-700">MediCare</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive(link.path) ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/appointment">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                    Make Appointment
                  </Button>
                </Link>
                <Link to="/my-appointments">
                  <Button variant="outline" className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-50">
                    My Appointments
                  </Button>
                </Link>
                <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/signup">
                  <Button variant="outline" className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-50">
                    Sign Up
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">Login</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium ${isActive(link.path) ? "text-blue-600" : "text-gray-600"}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link to="/appointment" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                      Make Appointment
                    </Button>
                  </Link>
                  <Link to="/my-appointments" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full rounded-full border-blue-600 text-blue-600">
                      My Appointments
                    </Button>
                  </Link>
                  <Button
                    onClick={() => {
                      logout()
                      setIsMobileMenuOpen(false)
                    }}
                    variant="outline"
                    className="w-full rounded-full border-blue-600 text-blue-600"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full rounded-full border-blue-600 text-blue-600">
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">Login</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation

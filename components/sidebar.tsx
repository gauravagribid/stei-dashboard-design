"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  LayoutDashboard,
  BookMarked,
  Award,
  CreditCard,
  HelpCircle,
  LogOut,
  Video,
  Zap,
  Menu,
  X,
  Phone,
  FolderOpen,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/workshops", label: "My Workshops", icon: BookMarked },
  { href: "/free-webinar", label: "Enroll Free Webinar", icon: Video },
  { href: "/paid-workshop", label: "Enroll Paid Workshop", icon: Zap },
  { href: "/paid-calls", label: "Book Paid Clarity Call", icon: Phone },
  { href: "/resources", label: "Resources", icon: FolderOpen }, // Removed requiresProfile flag - tab is now always accessible
  { href: "/certificates", label: "Certificates", icon: Award },
  { href: "/payments", label: "Payment History", icon: CreditCard },
  { href: "/support", label: "Help & Support", icon: HelpCircle },
]

function calculateProfileCompletion(formData: any): number {
  const fields = ["firstName", "lastName", "email", "mobileNumber", "address"]
  const filledFields = fields.filter((field) => formData[field] && formData[field].trim() !== "")
  return Math.round((filledFields.length / fields.length) * 100)
}

export function Sidebar() {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)
  const [isProfileComplete, setIsProfileComplete] = useState(false)

  useEffect(() => {
    const checkProfileCompletion = () => {
      const userData = localStorage.getItem("user")
      if (userData) {
        const parsed = JSON.parse(userData)
        const formData = {
          firstName: parsed.name?.split(" ")[0] || "",
          lastName: parsed.name?.split(" ")[1] || "",
          email: parsed.email || "",
          mobileNumber: parsed.mobileNumber || "",
          address: parsed.address || "",
        }
        const completion = calculateProfileCompletion(formData)
        setIsProfileComplete(completion === 100)
      }
    }

    checkProfileCompletion()
    // Listen for profile updates
    window.addEventListener("profileUpdated", checkProfileCompletion)
    return () => window.removeEventListener("profileUpdated", checkProfileCompletion)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-sidebar border border-sidebar-border rounded-lg shadow-lg md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      )}

      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}

      <aside
        className={cn(
          "w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen z-40 transition-transform duration-300 ease-in-out",
          "md:sticky md:top-0 md:translate-x-0",
          "fixed top-0 left-0",
          isMobile && !isOpen && "-translate-x-full",
          isMobile && isOpen && "translate-x-0",
        )}
      >
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/dashboard" className="flex items-center gap-2" onClick={handleLinkClick}>
            <div className="p-2 rounded-lg" style={{ backgroundColor: "#900000", color: "white" }}>
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg">STEI</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            const isLocked = item.requiresProfile && !isProfileComplete

            if (isLocked) {
              return (
                <div key={item.href} className="relative">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground cursor-not-allowed opacity-60 border-l-4 border-transparent"
                    disabled
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                    <Lock className="w-3 h-3 ml-auto" />
                  </Button>
                </div>
              )
            }

            return (
              <Link key={item.href} href={item.href} onClick={handleLinkClick}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start transition-all duration-200 ease-in-out",
                    isActive
                      ? "border-l-4 text-white bg-[#900000]"
                      : "text-foreground hover:bg-[#900000] hover:text-white border-l-4 border-transparent",
                    !isActive && "hover:translate-x-1",
                  )}
                  style={isActive ? { borderLeftColor: "#900000" } : undefined}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="outline"
            className="w-full justify-start bg-transparent text-foreground hover:bg-[#900000] hover:text-white transition-all duration-200 hover:translate-x-1"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  )
}

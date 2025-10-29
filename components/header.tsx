"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, User, Menu, Mail, Phone, MapPin, CheckCircle2, Briefcase, Building2 } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/sidebar"
import { Progress } from "@/components/ui/progress"

function calculateProfileCompletion(formData: any): { percentage: number; missingFields: string[] } {
  const fields = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "mobileNumber", label: "Mobile Number" },
    { key: "address", label: "Address" },
    { key: "city", label: "City" },
    { key: "pincode", label: "Pincode" },
    { key: "occupation", label: "Occupation" },
    { key: "industry", label: "Industry" },
  ]

  const filledFields = fields.filter((field) => formData[field.key] && formData[field.key].trim() !== "")
  const missingFields = fields.filter((field) => !formData[field.key] || formData[field.key].trim() === "")

  return {
    percentage: Math.round((filledFields.length / fields.length) * 100),
    missingFields: missingFields.map((f) => f.label),
  }
}

export function Header() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profileData, setProfileData] = useState<any>(null)
  const [profileCompletion, setProfileCompletion] = useState(0)

  useEffect(() => {
    const loadUserData = () => {
      const userData = localStorage.getItem("user")
      if (userData) {
        const parsed = JSON.parse(userData)
        setUser(parsed)

        const formData = {
          firstName: parsed.name?.split(" ")[0] || "",
          lastName: parsed.name?.split(" ")[1] || "",
          email: parsed.email || "",
          mobileNumber: parsed.mobileNumber || "",
          address: parsed.address || "",
          city: parsed.city || "",
          pincode: parsed.pincode || "",
          occupation: parsed.occupation || "",
          industry: parsed.industry || "",
        }

        setProfileData(formData)
        const { percentage } = calculateProfileCompletion(formData)
        setProfileCompletion(percentage)
      }
    }

    loadUserData()
    window.addEventListener("profileUpdated", loadUserData)
    return () => window.removeEventListener("profileUpdated", loadUserData)
  }, [])

  return (
    <header className="bg-card border-b border-border px-3 sm:px-6 md:px-8 py-3 md:py-4 flex items-center justify-between">
      <div className="flex items-center gap-3 md:gap-6">
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <h2 className="text-base sm:text-lg font-semibold truncate">Welcome, {user?.name || "Student"}</h2>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
              <ChevronDown className="w-4 h-4 hidden sm:inline" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-4 space-y-4">
              {/* Profile Completion Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Profile Completion</span>
                  <span className="text-sm font-bold text-[#900000]">{profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} className="h-2" />
                {profileCompletion === 100 ? (
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Profile Complete!</span>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">Complete your profile to unlock all features</p>
                )}
              </div>

              {/* Profile Details Section */}
              <div className="border-t pt-3 space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Your Details</h4>

                {profileData?.firstName && profileData?.lastName && (
                  <div className="flex items-start gap-2">
                    <User className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">
                        {profileData.firstName} {profileData.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">Full Name</p>
                    </div>
                  </div>
                )}

                {profileData?.email && (
                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium break-all">{profileData.email}</p>
                      <p className="text-xs text-muted-foreground">Email Address</p>
                    </div>
                  </div>
                )}

                {profileData?.mobileNumber && (
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{profileData.mobileNumber}</p>
                      <p className="text-xs text-muted-foreground">Mobile Number</p>
                    </div>
                  </div>
                )}

                {profileData?.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{profileData.address}</p>
                      <p className="text-xs text-muted-foreground">Address</p>
                    </div>
                  </div>
                )}

                {profileData?.city && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">
                        {profileData.city}
                        {profileData.pincode && ` - ${profileData.pincode}`}
                      </p>
                      <p className="text-xs text-muted-foreground">City & Pincode</p>
                    </div>
                  </div>
                )}

                {profileData?.occupation && (
                  <div className="flex items-start gap-2">
                    <Briefcase className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{profileData.occupation}</p>
                      <p className="text-xs text-muted-foreground">Occupation</p>
                    </div>
                  </div>
                )}

                {profileData?.industry && (
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{profileData.industry}</p>
                      <p className="text-xs text-muted-foreground">Industry</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="border-t pt-3 space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start text-sm bg-transparent"
                  onClick={() => router.push("/profile")}
                >
                  {profileCompletion === 100 ? "Edit Profile" : "Complete Profile"}
                </Button>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

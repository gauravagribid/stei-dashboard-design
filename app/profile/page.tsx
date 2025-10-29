"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { User, Mail, Phone, MapPin, Lock, CheckCircle2, AlertCircle, Building2, Briefcase } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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
  const missingFields = fields
    .filter((field) => !formData[field.key] || formData[field.key].trim() === "")
    .map((f) => f.label)
  const percentage = Math.round((filledFields.length / fields.length) * 100)

  return { percentage, missingFields }
}

export default function ProfilePage() {
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    address: "",
    city: "",
    pincode: "",
    occupation: "",
    industry: "",
  })
  const [profileCompletion, setProfileCompletion] = useState({ percentage: 0, missingFields: [] as string[] })

  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsed = JSON.parse(userData)
      const data = {
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
      setUser(parsed)
      setFormData(data)
      setProfileCompletion(calculateProfileCompletion(data))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const newFormData = {
      ...formData,
      [name]: value,
    }
    setFormData(newFormData)
    setProfileCompletion(calculateProfileCompletion(newFormData))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
  }

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      address: formData.address,
      city: formData.city,
      pincode: formData.pincode,
      occupation: formData.occupation,
      industry: formData.industry,
    }
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setUser(updatedUser)
    setIsEditing(false)

    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    })

    window.dispatchEvent(new Event("profileUpdated"))
  }

  const handlePasswordSave = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New password and confirm password do not match.",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would make an API call to change the password
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    })

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setIsChangingPassword(false)
  }

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your personal information</p>
      </div>

      <Card className="border-2" style={{ borderColor: profileCompletion.percentage === 100 ? "#22c55e" : "#900000" }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {profileCompletion.percentage === 100 ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-[#900000]" />
              )}
              Profile Completion
            </CardTitle>
            <span
              className="text-2xl font-bold"
              style={{ color: profileCompletion.percentage === 100 ? "#22c55e" : "#900000" }}
            >
              {profileCompletion.percentage}%
            </span>
          </div>
          <CardDescription>
            {profileCompletion.percentage === 100
              ? "Your profile is complete! You now have access to all resources."
              : "Complete your profile to unlock Resources section"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={profileCompletion.percentage} className="h-3" />
          {profileCompletion.missingFields.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <p className="text-sm font-medium text-amber-900 dark:text-amber-100 mb-2">Missing fields:</p>
              <ul className="text-sm text-amber-800 dark:text-amber-200 list-disc list-inside space-y-1">
                {profileCompletion.missingFields.map((field) => (
                  <li key={field}>{field}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold">{user?.name || "Student"}</h2>
                <p className="text-muted-foreground text-sm md:text-base">{user?.email}</p>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
              className="w-full md:w-auto"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobileNumber" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Mobile Number
            </Label>
            <Input
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Address
            </Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              disabled={!isEditing}
              placeholder="123 Main St"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="city" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                City
              </Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="New York"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="10001"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="occupation" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Occupation
              </Label>
              <Input
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Software Engineer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Industry
              </Label>
              <Input
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Technology"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex flex-col md:flex-row gap-2 pt-4">
              <Button onClick={handleSave} className="flex-1">
                Save Changes
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="outline" className="flex-1 bg-transparent">
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security
          </CardTitle>
          <CardDescription>Change your password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isChangingPassword ? (
            <Button onClick={() => setIsChangingPassword(true)} variant="outline" className="bg-transparent">
              Change Password
            </Button>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                />
                <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2 pt-2">
                <Button onClick={handlePasswordSave} className="flex-1">
                  Update Password
                </Button>
                <Button
                  onClick={() => {
                    setIsChangingPassword(false)
                    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
                  }}
                  variant="outline"
                  className="flex-1 bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

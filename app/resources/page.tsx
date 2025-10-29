"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BookOpen, Download, ExternalLink, Lock, AlertCircle, X } from "lucide-react"

function calculateProfileCompletion(formData: any): number {
  const fields = [
    "firstName",
    "lastName",
    "email",
    "mobileNumber",
    "address",
    "city",
    "pincode",
    "occupation",
    "industry",
  ]
  const filledFields = fields.filter((field) => formData[field] && formData[field].trim() !== "")
  return Math.round((filledFields.length / fields.length) * 100)
}

function isProfileComplete(): boolean {
  const userData = localStorage.getItem("user")
  if (!userData) return false

  const parsed = JSON.parse(userData)
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

  return calculateProfileCompletion(formData) === 100
}

export default function ResourcesPage() {
  const router = useRouter()
  const [hasAccess, setHasAccess] = useState(false)
  const [showAccessDialog, setShowAccessDialog] = useState(false)
  const [viewingResource, setViewingResource] = useState<any>(null)

  useEffect(() => {
    const checkAccess = () => {
      setHasAccess(isProfileComplete())
    }

    checkAccess()
    window.addEventListener("profileUpdated", checkAccess)
    window.addEventListener("storage", checkAccess)

    return () => {
      window.removeEventListener("profileUpdated", checkAccess)
      window.removeEventListener("storage", checkAccess)
    }
  }, [])

  const handleResourceAccess = (action: "view" | "download", resource?: any) => {
    if (!hasAccess) {
      setShowAccessDialog(true)
    } else {
      if (action === "view" && resource) {
        setViewingResource(resource)
      } else if (action === "download") {
        // Simulate download
        alert(`Downloading ${resource?.title || "resource"}...`)
      }
    }
  }

  const resources = [
    {
      category: "Reading Materials",
      items: [
        {
          title: "Personal Growth Handbook",
          type: "eBook",
          icon: BookOpen,
          pages: "120 pages",
          content:
            "This is a comprehensive guide to personal growth and development. It covers topics such as self-awareness, goal setting, time management, and building positive habits. The handbook includes practical exercises and reflection prompts to help you on your journey of self-improvement.",
        },
        {
          title: "Leadership Development Guide",
          type: "eBook",
          icon: BookOpen,
          pages: "85 pages",
          content:
            "Learn the essential skills and qualities of effective leadership. This guide explores different leadership styles, communication strategies, team building, and decision-making processes. Discover how to inspire and motivate others while developing your own leadership potential.",
        },
        {
          title: "Mindfulness & Wellness",
          type: "eBook",
          icon: BookOpen,
          pages: "95 pages",
          content:
            "Explore the practice of mindfulness and its impact on overall wellness. This resource covers meditation techniques, stress management, work-life balance, and cultivating mental resilience. Learn how to incorporate mindfulness into your daily routine for improved well-being.",
        },
      ],
    },
  ]

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Learning Resources</h1>
        <p className="text-muted-foreground mt-2">Access your workshop materials, videos, and reading resources</p>
      </div>

      {!hasAccess && (
        <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                  Complete your profile to access resources
                </p>
                <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
                  You can view the resource list, but need to complete your profile to view or download materials.
                </p>
                <Button
                  size="sm"
                  onClick={() => router.push("/profile")}
                  className="bg-[#900000] hover:bg-[#900000]/90"
                >
                  Complete Profile Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {resources.map((section) => (
          <Card key={section.category}>
            <CardHeader>
              <CardTitle>{section.category}</CardTitle>
              <CardDescription>Download and access your learning materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.items.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors gap-3"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-[#900000]/10 rounded-lg">
                          <Icon className="w-5 h-5 text-[#900000]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm md:text-base break-words">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.type} • {item.pages}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 sm:ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 sm:flex-none bg-transparent"
                          onClick={() => handleResourceAccess("view", item)}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 sm:flex-none bg-[#900000] hover:bg-[#900000]/90"
                          onClick={() => handleResourceAccess("download", item)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showAccessDialog} onOpenChange={setShowAccessDialog}>
        <DialogContent>
          <DialogHeader>
            <div className="mx-auto w-12 h-12 bg-[#900000]/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-[#900000]" />
            </div>
            <DialogTitle className="text-center">Complete Your Profile</DialogTitle>
            <DialogDescription className="text-center">
              You need to complete your profile to access this resource. This helps us provide you with personalized
              content and important updates.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button onClick={() => router.push("/profile")} className="bg-[#900000] hover:bg-[#900000]/90">
              Complete Profile Now
            </Button>
            <Button variant="outline" onClick={() => setShowAccessDialog(false)}>
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewingResource} onOpenChange={() => setViewingResource(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-4">
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-xl">{viewingResource?.title}</DialogTitle>
                <DialogDescription className="mt-1">
                  {viewingResource?.type} • {viewingResource?.pages}
                </DialogDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setViewingResource(null)} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="px-6 pb-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {viewingResource?.type === "eBook" && (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div className="bg-muted/50 rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4">{viewingResource.title}</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{viewingResource.content}</p>
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-muted-foreground italic">
                      This is a preview. Download the full eBook to access all {viewingResource.pages} of content.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

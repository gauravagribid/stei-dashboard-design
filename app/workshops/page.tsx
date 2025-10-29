"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Eye, LayoutGrid, List, Star, MessageSquare } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function WorkshopsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [formData, setFormData] = useState({
    contentQuality: "",
    instructorEffectiveness: "",
    practicalValue: "",
    recommendation: "",
    improvements: "",
    additionalComments: "",
  })

  const allWorkshops = [
    {
      id: 3,
      name: "Listening Skills Mastery",
      instructor: "Anita Desai",
      progress: 100,
      status: "completed",
      description:
        "Become better at communicating by mastering the art of listening! Join our Listening Skills workshop",
      duration: "2 weeks",
      startDate: "2025-08-01",
    },
    {
      id: 4,
      name: "Leadership Presence",
      instructor: "Vikram Singh",
      progress: 0,
      status: "upcoming",
      description:
        "Step into your power and lead with confidence. Discover the authentic leader within you through practical exercises and real-world scenarios",
      duration: "5 weeks",
      startDate: "2025-11-15",
    },
    {
      id: 5,
      name: "Mindful Living",
      instructor: "Meera Patel",
      progress: 0,
      status: "upcoming",
      description:
        "Transform stress into serenity. Learn mindfulness techniques that fit into your busy schedule and create lasting peace",
      duration: "4 weeks",
      startDate: "2025-11-20",
    },
  ]

  const getFilteredWorkshops = (status: string) => {
    if (status === "all") return allWorkshops
    return allWorkshops.filter((w) => w.status === status)
  }

  const handleFeedbackSubmit = () => {
    console.log("Feedback submitted:", {
      workshop: selectedWorkshop?.name,
      rating,
      ...formData,
    })
    setShowFeedbackModal(false)
    setRating(0)
    setFormData({
      contentQuality: "",
      instructorEffectiveness: "",
      practicalValue: "",
      recommendation: "",
      improvements: "",
      additionalComments: "",
    })
    setSelectedWorkshop(null)
  }

  const openFeedbackModal = (workshop: any) => {
    setSelectedWorkshop(workshop)
    setShowFeedbackModal(true)
  }

  const renderWorkshopCard = (workshop: any) => (
    <Card key={workshop.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{workshop.name}</CardTitle>
            <CardDescription className="mt-1">by {workshop.instructor}</CardDescription>
          </div>
          <Badge variant={workshop.status === "completed" ? "default" : "outline"}>
            {workshop.status === "completed" ? "Completed" : "Upcoming"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{workshop.description}</p>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Duration: {workshop.duration}</span>
          <span className="text-muted-foreground">Started: {workshop.startDate}</span>
        </div>

        {workshop.status === "completed" && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{workshop.progress}%</span>
            </div>
            <Progress value={workshop.progress} className="h-2" />
          </div>
        )}

        <div className="flex flex-col gap-2 pt-2">
          {workshop.status === "completed" && (
            <>
              <Button size="sm" className="w-full bg-[#900000] hover:bg-[#900000]/90">
                <Award className="w-4 h-4 mr-2" />
                View Certificate
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="w-full border-[#900000] text-[#900000] hover:bg-[#900000] hover:text-white transition-colors bg-transparent"
                onClick={() => openFeedbackModal(workshop)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Give Feedback
              </Button>
            </>
          )}
          {workshop.status === "upcoming" && (
            <Button size="sm" variant="outline" className="w-full bg-transparent">
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const renderWorkshopTable = (workshops: any[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Workshop Name</TableHead>
          <TableHead>Instructor</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {workshops.map((workshop) => (
          <TableRow key={workshop.id}>
            <TableCell className="font-medium">{workshop.name}</TableCell>
            <TableCell>{workshop.instructor}</TableCell>
            <TableCell>{workshop.duration}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Progress value={workshop.progress} className="h-2 w-24" />
                <span className="text-sm text-muted-foreground">{workshop.progress}%</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={workshop.status === "completed" ? "default" : "outline"}>
                {workshop.status === "completed" ? "Completed" : "Upcoming"}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                {workshop.status === "completed" && (
                  <>
                    <Button size="sm" className="bg-[#900000] hover:bg-[#900000]/90">
                      <Award className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#900000] text-[#900000] hover:bg-[#900000] hover:text-white transition-colors bg-transparent"
                      onClick={() => openFeedbackModal(workshop)}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </>
                )}
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Workshops</h1>
          <p className="text-muted-foreground mt-2">Manage and track your enrolled workshops</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-[#900000] hover:bg-[#900000]/90" : ""}
          >
            <LayoutGrid className="w-4 h-4 mr-2" />
            Grid
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("table")}
            className={viewMode === "table" ? "bg-[#900000] hover:bg-[#900000]/90" : ""}
          >
            <List className="w-4 h-4 mr-2" />
            Table
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredWorkshops("all").map((workshop) => renderWorkshopCard(workshop))}
            </div>
          ) : (
            renderWorkshopTable(getFilteredWorkshops("all"))
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredWorkshops("upcoming").map((workshop) => renderWorkshopCard(workshop))}
            </div>
          ) : (
            renderWorkshopTable(getFilteredWorkshops("upcoming"))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredWorkshops("completed").map((workshop) => renderWorkshopCard(workshop))}
            </div>
          ) : (
            renderWorkshopTable(getFilteredWorkshops("completed"))
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Share Your Feedback</DialogTitle>
            <DialogDescription>Tell us about your experience with {selectedWorkshop?.name}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-3 pb-4 border-b">
              <Label className="text-base font-medium">Overall Rating</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= (hoveredRating || rating) ? "fill-[#900000] text-[#900000]" : "fill-none text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-muted-foreground">
                  {rating === 5
                    ? "Excellent!"
                    : rating === 4
                      ? "Very Good"
                      : rating === 3
                        ? "Good"
                        : rating === 2
                          ? "Fair"
                          : "Needs Improvement"}
                </p>
              )}
            </div>

            <div className="space-y-3 pb-4 border-b">
              <Label className="text-base font-medium">How was the content quality?</Label>
              <RadioGroup
                value={formData.contentQuality}
                onValueChange={(val) => setFormData({ ...formData, contentQuality: val })}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="excellent" id="content-excellent" className="border-2" />
                  <Label htmlFor="content-excellent" className="font-normal cursor-pointer flex-1">
                    Excellent
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="good" id="content-good" className="border-2" />
                  <Label htmlFor="content-good" className="font-normal cursor-pointer flex-1">
                    Good
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="average" id="content-average" className="border-2" />
                  <Label htmlFor="content-average" className="font-normal cursor-pointer flex-1">
                    Average
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="poor" id="content-poor" className="border-2" />
                  <Label htmlFor="content-poor" className="font-normal cursor-pointer flex-1">
                    Poor
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3 pb-4 border-b">
              <Label className="text-base font-medium">How was the instructor?</Label>
              <RadioGroup
                value={formData.instructorEffectiveness}
                onValueChange={(val) => setFormData({ ...formData, instructorEffectiveness: val })}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="excellent" id="instructor-excellent" className="border-2" />
                  <Label htmlFor="instructor-excellent" className="font-normal cursor-pointer flex-1">
                    Excellent
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="good" id="instructor-good" className="border-2" />
                  <Label htmlFor="instructor-good" className="font-normal cursor-pointer flex-1">
                    Good
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="average" id="instructor-average" className="border-2" />
                  <Label htmlFor="instructor-average" className="font-normal cursor-pointer flex-1">
                    Average
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="poor" id="instructor-poor" className="border-2" />
                  <Label htmlFor="instructor-poor" className="font-normal cursor-pointer flex-1">
                    Poor
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3 pb-4 border-b">
              <Label className="text-base font-medium">Would you recommend this workshop?</Label>
              <RadioGroup
                value={formData.recommendation}
                onValueChange={(val) => setFormData({ ...formData, recommendation: val })}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="yes" id="rec-yes" className="border-2" />
                  <Label htmlFor="rec-yes" className="font-normal cursor-pointer flex-1">
                    Yes, definitely
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="maybe" id="rec-maybe" className="border-2" />
                  <Label htmlFor="rec-maybe" className="font-normal cursor-pointer flex-1">
                    Maybe
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="no" id="rec-no" className="border-2" />
                  <Label htmlFor="rec-no" className="font-normal cursor-pointer flex-1">
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label htmlFor="comments" className="text-base font-medium">
                Additional Comments (Optional)
              </Label>
              <Textarea
                id="comments"
                placeholder="Share your thoughts, suggestions, or any other feedback..."
                value={formData.additionalComments}
                onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowFeedbackModal(false)
                  setRating(0)
                  setFormData({
                    contentQuality: "",
                    instructorEffectiveness: "",
                    practicalValue: "",
                    recommendation: "",
                    improvements: "",
                    additionalComments: "",
                  })
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleFeedbackSubmit}
                disabled={
                  rating === 0 ||
                  !formData.contentQuality ||
                  !formData.instructorEffectiveness ||
                  !formData.recommendation
                }
                className="flex-1 bg-[#900000] hover:bg-[#900000]/90"
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

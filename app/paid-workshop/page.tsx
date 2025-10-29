"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target, Clock, Users, Star, LayoutGrid, List } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const categories = [
  "All",
  "Leadership",
  "Communication",
  "Personal Growth",
  "Productivity",
  "Emotional Intelligence",
  "Career Development",
  "Mindfulness",
  "Team Building",
  "Conflict Resolution",
  "Time Management",
  "Public Speaking",
  "Soft Skills",
  "Women Empowerment",
  "Self Care",
]

const paidWorkshops = [
  {
    id: 1,
    title: "The Strength of SHE",
    category: "Women Empowerment",
    trainer: "Ms. Kavya Sharma",
    description:
      "A reflective workshop crafted for women navigating the crossroads of self-doubt, societal pressure, & professional success. Discover your inner strength and redefine success on your own terms.",
    duration: "4 weeks",
    originalPrice: 8000,
    offerPrice: 6500,
    participants: 124,
    rating: 4.9,
    level: "All Levels",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop",
    bgColor: "from-pink-500 to-rose-600",
  },
  {
    id: 2,
    title: "Self in Sync",
    category: "Productivity",
    trainer: "Mr. Arjun Mehta",
    description:
      "Do you feel out of sync with your day? Let's change that. Enroll now & show up for yourself—because productivity starts with intention. Learn to align your daily actions with your goals.",
    duration: "3 weeks",
    originalPrice: 6000,
    offerPrice: 4500,
    participants: 98,
    rating: 4.8,
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop",
    bgColor: "from-blue-500 to-cyan-600",
  },
  {
    id: 3,
    title: "Listening Skills Mastery",
    category: "Communication",
    trainer: "Dr. Priya Nair",
    description:
      "Become better at communicating by mastering the art of listening! Enroll today to join our Listening Skills workshop. Transform your relationships through the power of active listening.",
    duration: "2 weeks",
    originalPrice: 5000,
    offerPrice: 3500,
    participants: 156,
    rating: 4.9,
    level: "All Levels",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=400&fit=crop",
    bgColor: "from-purple-500 to-indigo-600",
  },
  {
    id: 4,
    title: "Lead with Purpose",
    category: "Leadership",
    trainer: "Mr. Vikram Singh",
    description:
      "Leadership isn't about titles—it's about impact. Discover how to lead authentically, inspire teams, and create lasting change. Step into your leadership potential with confidence and clarity.",
    duration: "6 weeks",
    originalPrice: 12000,
    offerPrice: 9500,
    participants: 87,
    rating: 4.8,
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1552664713714-d95e436ab8d6?w=800&h=400&fit=crop",
    bgColor: "from-amber-500 to-orange-600",
  },
  {
    id: 5,
    title: "Mindful Moments",
    category: "Mindfulness",
    trainer: "Ms. Ananya Desai",
    description:
      "In a world that never stops, learn to pause. This workshop teaches you mindfulness practices to reduce stress, increase focus, and find peace in the present moment. Your journey to inner calm starts here.",
    duration: "4 weeks",
    originalPrice: 7000,
    offerPrice: 5500,
    participants: 142,
    rating: 4.9,
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop",
    bgColor: "from-green-500 to-emerald-600",
  },
  {
    id: 6,
    title: "Emotional Intelligence at Work",
    category: "Emotional Intelligence",
    trainer: "Dr. Rajesh Kumar",
    description:
      "Success isn't just about IQ—it's about EQ. Learn to understand and manage emotions, build stronger relationships, and navigate workplace challenges with emotional intelligence. Elevate your career through self-awareness.",
    duration: "5 weeks",
    originalPrice: 10000,
    offerPrice: 8000,
    participants: 103,
    rating: 4.8,
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=400&fit=crop",
    bgColor: "from-teal-500 to-cyan-600",
  },
  {
    id: 7,
    title: "Speak with Confidence",
    category: "Public Speaking",
    trainer: "Mr. Aditya Verma",
    description:
      "Overcome stage fright and find your voice. Whether presenting to colleagues or speaking to crowds, learn techniques to communicate with clarity, confidence, and charisma. Your message deserves to be heard.",
    duration: "4 weeks",
    originalPrice: 8500,
    offerPrice: 6800,
    participants: 76,
    rating: 4.7,
    level: "All Levels",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=400&fit=crop",
    bgColor: "from-red-500 to-pink-600",
  },
  {
    id: 8,
    title: "Time Mastery Blueprint",
    category: "Time Management",
    trainer: "Ms. Sneha Patel",
    description:
      "Stop feeling overwhelmed by your to-do list. Learn proven strategies to prioritize effectively, eliminate distractions, and reclaim your time. Work smarter, not harder, and achieve more with less stress.",
    duration: "3 weeks",
    originalPrice: 6500,
    offerPrice: 5000,
    participants: 118,
    rating: 4.8,
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&h=400&fit=crop",
    bgColor: "from-violet-500 to-purple-600",
  },
]

export default function PaidWorkshopPage() {
  const [enrolledWorkshops, setEnrolledWorkshops] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
  const router = useRouter()

  const handleEnroll = (workshop: (typeof paidWorkshops)[0]) => {
    router.push("/workshop-details")
  }

  const filteredWorkshops =
    selectedCategory === "All"
      ? paidWorkshops
      : paidWorkshops.filter((workshop) => workshop.category === selectedCategory)

  const renderWorkshopTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Workshop Name</TableHead>
          <TableHead>Trainer</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredWorkshops.map((workshop) => {
          const isEnrolled = enrolledWorkshops.includes(workshop.id)
          return (
            <TableRow key={workshop.id}>
              <TableCell className="font-medium">{workshop.title}</TableCell>
              <TableCell>{workshop.trainer}</TableCell>
              <TableCell>
                <Badge variant="outline">{workshop.category}</Badge>
              </TableCell>
              <TableCell>{workshop.duration}</TableCell>
              <TableCell>
                <div>
                  <p className="text-sm line-through text-red-600">₹{workshop.originalPrice}</p>
                  <p className="text-sm font-bold text-green-600">₹{workshop.offerPrice}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>{workshop.rating}</span>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEnroll(workshop)}
                  disabled={isEnrolled}
                  size="sm"
                  className="bg-[#900000] hover:bg-[#900000]/90"
                  variant={isEnrolled ? "outline" : "default"}
                >
                  {isEnrolled ? "✓ Enrolled" : "Enroll"}
                </Button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-3 sm:p-6 md:p-8">
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Workshop Enrollment</h1>
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

          <Card className="mb-6 md:mb-8">
            <CardHeader className="pb-4 md:pb-6">
              <CardTitle className="flex items-center gap-2 md:gap-3 text-lg sm:text-xl md:text-2xl text-blue-600">
                <Target className="w-5 h-5 md:w-7 md:h-7" />
                Select a Workshop Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Responsive grid: 2 cols on mobile, 3 on tablet, 4 on desktop, 5 on large desktop */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    onClick={() => setSelectedCategory(category)}
                    className={`h-auto py-3 md:py-4 px-3 md:px-4 text-xs sm:text-sm font-semibold transition-all ${
                      selectedCategory === category
                        ? "bg-[#900000] text-white border-[#900000] hover:bg-[#900000]/90 hover:text-white"
                        : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredWorkshops.map((workshop) => {
              const isEnrolled = enrolledWorkshops.includes(workshop.id)
              return (
                <Card key={workshop.id} className="hover:shadow-xl transition-shadow overflow-hidden">
                  <div
                    className={`h-48 bg-gradient-to-r ${workshop.bgColor} flex items-center justify-center relative overflow-hidden`}
                  >
                    <img
                      src={workshop.image || "/placeholder.svg"}
                      alt={workshop.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                    <h3 className="absolute text-3xl font-bold text-white z-10">{workshop.title}</h3>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-lg font-bold text-foreground">Workshop Name : {workshop.title}</h4>

                      <p className="text-sm">
                        <span className="font-semibold text-blue-600">Trainer :</span>{" "}
                        <span className="text-blue-600">{workshop.trainer}</span>
                      </p>

                      <div className="space-y-1">
                        <p className="text-sm">
                          <span className="font-semibold text-red-600">Workshop Fee :</span>{" "}
                          <span className="text-red-600 line-through">₹{workshop.originalPrice}</span>
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold text-green-600">Offer Fee :</span>{" "}
                          <span className="text-green-600 font-bold">₹{workshop.offerPrice} INR</span>
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#900000]" />
                        <span>{workshop.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#900000]" />
                        <span>{workshop.participants} enrolled</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span>{workshop.rating}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {workshop.level}
                        </Badge>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleEnroll(workshop)}
                      disabled={isEnrolled}
                      className="w-full bg-[#900000] hover:bg-[#900000]/90"
                      variant={isEnrolled ? "outline" : "default"}
                    >
                      {isEnrolled ? "✓ Enrolled" : `Enroll Now`}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="overflow-x-auto">{renderWorkshopTable()}</div>
        )}

        {filteredWorkshops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No workshops found in this category.</p>
            <Button variant="outline" onClick={() => setSelectedCategory("All")} className="mt-4">
              View All Workshops
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

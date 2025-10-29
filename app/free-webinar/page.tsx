"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, Clock, Users, Star, Target, LayoutGrid, List } from "lucide-react"
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

const freeWebinars = [
  {
    id: 1,
    title: "The Strength of SHE: Introduction",
    category: "Women Empowerment",
    instructor: "Dr. Priya Sharma",
    description:
      "A reflective workshop crafted for women navigating the crossroads of self-doubt, societal pressure, & professional success",
    duration: "1 hour",
    date: "2025-11-15",
    time: "2:00 PM",
    participants: 245,
    rating: 4.8,
    topics: ["Women Empowerment", "Self-Confidence", "Professional Growth"],
    banner: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    title: "Self in Sync: Getting Started",
    category: "Productivity",
    instructor: "Rajesh Kumar",
    description:
      "Do you feel out of sync with your day? Let's change that. Show up for yourself—because productivity starts with intention",
    duration: "1.5 hours",
    date: "2025-11-18",
    time: "3:30 PM",
    participants: 189,
    rating: 4.9,
    topics: ["Productivity", "Time Management", "Self-Care"],
    banner: "https://images.unsplash.com/photo-1484480974693-6ca0a7884978?w=800&h=400&fit=crop",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    title: "Listening Skills: The Foundation",
    category: "Communication",
    instructor: "Anita Desai",
    description: "Become better at communicating by mastering the art of listening! Join our Listening Skills workshop",
    duration: "1 hour",
    date: "2025-11-20",
    time: "1:00 PM",
    participants: 312,
    rating: 4.7,
    topics: ["Communication", "Active Listening", "Empathy"],
    banner: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    title: "Leadership Presence: First Steps",
    category: "Leadership",
    instructor: "Vikram Singh",
    description: "Step into your power and lead with confidence. Discover the authentic leader within you",
    duration: "1.5 hours",
    date: "2025-11-22",
    time: "4:00 PM",
    participants: 156,
    rating: 4.6,
    topics: ["Leadership", "Confidence", "Authenticity"],
    banner: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop",
    color: "from-orange-500 to-red-500",
  },
]

export default function FreeWebinarPage() {
  const [enrolledWebinars, setEnrolledWebinars] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")

  const handleEnroll = (webinarId: number) => {
    if (!enrolledWebinars.includes(webinarId)) {
      setEnrolledWebinars([...enrolledWebinars, webinarId])
    }
  }

  const filteredWebinars =
    selectedCategory === "All" ? freeWebinars : freeWebinars.filter((webinar) => webinar.category === selectedCategory)

  const renderWebinarTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Webinar Title</TableHead>
          <TableHead>Instructor</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredWebinars.map((webinar) => {
          const isEnrolled = enrolledWebinars.includes(webinar.id)
          return (
            <TableRow key={webinar.id}>
              <TableCell className="font-medium">{webinar.title}</TableCell>
              <TableCell>{webinar.instructor}</TableCell>
              <TableCell>
                <Badge variant="outline">{webinar.category}</Badge>
              </TableCell>
              <TableCell>{webinar.duration}</TableCell>
              <TableCell>
                <div>
                  <p className="text-sm">{webinar.date}</p>
                  <p className="text-xs text-muted-foreground">{webinar.time}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>{webinar.rating}</span>
                </div>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEnroll(webinar.id)}
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
      <div className="p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-foreground">Free Webinar Enrollment</h1>
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

          <Card className="mb-8">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3 text-2xl text-blue-600">
                <Target className="w-7 h-7" />
                Select a Webinar Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    onClick={() => setSelectedCategory(category)}
                    className={`h-auto py-4 px-4 text-sm font-semibold transition-all ${
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWebinars.map((webinar) => {
              const isEnrolled = enrolledWebinars.includes(webinar.id)
              return (
                <Card key={webinar.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  <div className={`h-48 bg-gradient-to-r ${webinar.color} relative overflow-hidden`}>
                    <img
                      src={webinar.banner || "/placeholder.svg"}
                      alt={webinar.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-xl">{webinar.title}</h3>
                    </div>
                    <Badge className="absolute top-4 right-4 bg-white text-primary">FREE</Badge>
                  </div>

                  <CardHeader className="pb-3">
                    <CardDescription className="text-blue-600 font-medium">
                      Trainer: {webinar.instructor}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{webinar.description}</p>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{webinar.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{webinar.participants}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-primary" />
                        <span>{webinar.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span>{webinar.rating}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {webinar.topics.map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium mb-2">Scheduled: {webinar.time}</p>
                      <Button
                        onClick={() => handleEnroll(webinar.id)}
                        disabled={isEnrolled}
                        className="w-full bg-[#900000] hover:bg-[#900000]/90"
                        variant={isEnrolled ? "outline" : "default"}
                      >
                        {isEnrolled ? "✓ Enrolled" : "Enroll Now"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          renderWebinarTable()
        )}

        {filteredWebinars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No webinars found in this category.</p>
            <Button variant="outline" onClick={() => setSelectedCategory("All")} className="mt-4">
              View All Webinars
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

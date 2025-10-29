"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Award, MessageCircle, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 10, 1))
  const [clickedDate, setClickedDate] = useState(null)

  // Mock data
  const stats = [
    { label: "Enrolled Workshops", value: 5, icon: BookOpen, color: "bg-blue-100 text-blue-600" },
    { label: "Certificates Earned", value: 3, icon: Award, color: "bg-green-100 text-green-600" },
  ]

  const activeWorkshops = [
    {
      id: 1,
      name: "The Strength of SHE",
      progress: 65,
      instructor: "Priya Sharma",
      nextSession: "2025-11-05",
      level: "Intermediate",
    },
    {
      id: 2,
      name: "Self in Sync",
      progress: 40,
      instructor: "Rahul Mehta",
      nextSession: "2025-11-08",
      level: "Beginner",
    },
  ]

  const upcomingWorkshops = [
    { id: 8, name: "Leadership Presence", startDate: "2025-11-25", instructor: "Vikram Singh", level: "Intermediate" },
    { id: 9, name: "Mindful Living", startDate: "2025-12-01", instructor: "Meera Patel", level: "Beginner" },
    {
      id: 10,
      name: "Emotional Intelligence",
      startDate: "2025-12-10",
      instructor: "Arjun Reddy",
      level: "Advanced",
    },
  ]

  const completedWorkshops = [
    { id: 3, name: "Listening Skills Mastery", progress: 100, status: "Completed", instructor: "Anita Desai" },
  ]

  const upcomingEvents = [
    { id: 4, name: "Leadership Presence", date: new Date(2025, 10, 15), type: "workshop", instructor: "Vikram Singh" },
    { id: 5, name: "Mindful Living", date: new Date(2025, 10, 20), type: "workshop", instructor: "Meera Patel" },
  ]

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const hasEvent = (day) => {
    const checkDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)
    return upcomingEvents.some(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear(),
    )
  }

  const getEventsForDay = (day) => {
    const checkDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)
    return upcomingEvents.filter(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear(),
    )
  }

  const getDisplayedEvents = () => {
    if (!clickedDate) {
      return upcomingEvents
    }
    return upcomingEvents.filter(
      (event) =>
        event.date.getDate() === clickedDate &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear(),
    )
  }

  const daysInMonth = getDaysInMonth(selectedDate)
  const firstDay = getFirstDayOfMonth(selectedDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's your learning overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Workshops */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Workshops</CardTitle>
                <CardDescription>Workshops you're currently attending</CardDescription>
              </div>
              <Link href="/workshops">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeWorkshops.map((workshop) => (
                <div key={workshop.id} className="pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{workshop.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">Instructor: {workshop.instructor}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{workshop.level}</span>
                        <span className="text-xs text-muted-foreground">Next: {workshop.nextSession}</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-[#900000] hover:bg-[#900000]/90">
                      Continue
                    </Button>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{workshop.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#900000] h-2 rounded-full transition-all"
                        style={{ width: `${workshop.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Workshops */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Workshops</CardTitle>
                <CardDescription>Workshops starting soon</CardDescription>
              </div>
              <Link href="/workshops?tab=upcoming">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingWorkshops.map((workshop) => (
                <div key={workshop.id} className="pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{workshop.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">Instructor: {workshop.instructor}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{workshop.level}</span>
                        <span className="text-xs text-muted-foreground">Starts: {workshop.startDate}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Enroll
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Join Our Community */}
          <Card>
            <CardHeader>
              <CardTitle>Join Our Community</CardTitle>
              <CardDescription>Connect with us on social media</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* WhatsApp Community */}
                <a
                  href="https://chat.whatsapp.com/your-group-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-4 rounded-lg border border-muted hover:bg-muted transition-colors"
                >
                  <MessageCircle className="w-8 h-8 text-green-500 mb-2" />
                  <span className="text-sm font-medium text-foreground">WhatsApp</span>
                  <span className="text-xs text-muted-foreground mt-1">Join Community</span>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/your-handle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-4 rounded-lg border border-muted hover:bg-muted transition-colors"
                >
                  <Instagram className="w-8 h-8 text-pink-500 mb-2" />
                  <span className="text-sm font-medium text-foreground">Instagram</span>
                  <span className="text-xs text-muted-foreground mt-1">Follow Us</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/company/your-company"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-4 rounded-lg border border-muted hover:bg-muted transition-colors"
                >
                  <Linkedin className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-foreground">LinkedIn</span>
                  <span className="text-xs text-muted-foreground mt-1">Connect</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Calendar</CardTitle>
              <CardDescription>Upcoming events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
                    className="p-1 hover:bg-muted rounded"
                  >
                    ←
                  </button>
                  <h3 className="font-semibold text-sm">
                    {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                  </h3>
                  <button
                    onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
                    className="p-1 hover:bg-muted rounded"
                  >
                    →
                  </button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Day headers */}
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}

                  {/* Empty cells */}
                  {emptyDays.map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ))}

                  {/* Days */}
                  {days.map((day) => (
                    <button
                      key={day}
                      onClick={() => setClickedDate(clickedDate === day ? null : day)}
                      className={`aspect-square flex items-center justify-center rounded text-sm font-medium cursor-pointer transition-colors ${
                        clickedDate === day
                          ? "bg-blue-600 text-white font-bold ring-2 ring-blue-400"
                          : hasEvent(day)
                            ? "bg-primary text-white font-bold hover:bg-primary/90"
                            : "hover:bg-muted text-foreground"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                {/* Events for selected date or all events */}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-muted-foreground">
                      {clickedDate
                        ? `Events on ${monthNames[selectedDate.getMonth()]} ${clickedDate}`
                        : "All Upcoming Events"}
                    </p>
                    {clickedDate && (
                      <button onClick={() => setClickedDate(null)} className="text-xs text-primary hover:underline">
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {getDisplayedEvents().length > 0 ? (
                      getDisplayedEvents().map((event) => (
                        <div key={event.id} className="text-xs p-2 bg-muted rounded">
                          <p className="font-medium text-foreground">{event.name}</p>
                          <p className="text-muted-foreground">
                            {event.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {event.type === "workshop" ? `by ${event.instructor}` : event.course}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        {clickedDate ? "No events on this date" : "No upcoming events"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Completed Workshops */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Completed</CardTitle>
              <CardDescription>Your achievements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {completedWorkshops.map((workshop) => (
                <div key={workshop.id} className="pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm text-foreground">{workshop.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">by {workshop.instructor}</p>
                    </div>
                    <Award className="w-4 h-4 text-green-600" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

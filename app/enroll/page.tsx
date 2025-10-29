"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Users, BookOpen, ArrowLeft } from "lucide-react"

const COURSE_DETAILS: Record<number, any> = {
  1: {
    id: 1,
    name: "Web Development Fundamentals",
    instructor: "John Smith",
    description: "Learn the basics of web development including HTML, CSS, and JavaScript.",
    duration: "8 weeks",
    level: "Beginner",
    students: 1250,
    price: "Rs 99",
    modules: 12,
    rating: 4.8,
  },
  2: {
    id: 2,
    name: "Advanced React Patterns",
    instructor: "Sarah Johnson",
    description: "Master advanced React patterns and best practices for building scalable applications.",
    duration: "6 weeks",
    level: "Advanced",
    students: 450,
    price: "Rs 149",
    modules: 10,
    rating: 4.9,
  },
  3: {
    id: 3,
    name: "Python for Data Science",
    instructor: "Mike Chen",
    description: "Learn Python programming for data analysis, visualization, and machine learning.",
    duration: "10 weeks",
    level: "Intermediate",
    students: 890,
    price: "Rs 129",
    modules: 15,
    rating: 4.7,
  },
  4: {
    id: 4,
    name: "UI/UX Design Principles",
    instructor: "Emma Davis",
    description: "Understand the principles of user interface and user experience design.",
    duration: "7 weeks",
    level: "Beginner",
    students: 620,
    price: "Rs 89",
    modules: 11,
    rating: 4.6,
  },
  5: {
    id: 5,
    name: "Cloud Computing with AWS",
    instructor: "Alex Kumar",
    description: "Deploy and manage applications on Amazon Web Services cloud platform.",
    duration: "9 weeks",
    level: "Intermediate",
    students: 340,
    price: "Rs 159",
    modules: 14,
    rating: 4.8,
  },
}

export default function EnrollPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [courseId, setCourseId] = useState<number | null>(null)
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [enrolled, setEnrolled] = useState(false)

  useEffect(() => {
    const id = searchParams.get("courseId")
    if (id) {
      setCourseId(Number.parseInt(id))
    }
  }, [searchParams])

  const course = courseId ? COURSE_DETAILS[courseId] : null

  const handleEnroll = () => {
    setIsEnrolling(true)
    // Simulate enrollment process
    setTimeout(() => {
      setIsEnrolling(false)
      setEnrolled(true)
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }, 1500)
  }

  if (!course) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Course not found</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      <Button variant="outline" onClick={() => router.back()} className="gap-2 bg-transparent">
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      {enrolled ? (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6 flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-900">Successfully Enrolled!</h3>
              <p className="text-sm text-green-700">
                You have been enrolled in {course.name}. Redirecting to dashboard...
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{course.name}</h1>
            <p className="text-muted-foreground mt-2">by {course.instructor}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Course Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground">{course.description}</p>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-semibold">{course.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Modules</p>
                        <p className="font-semibold">{course.modules}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Students</p>
                        <p className="font-semibold">{course.students.toLocaleString()}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Level</p>
                      <p className="font-semibold">{course.level}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What You'll Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Master core concepts and best practices</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Complete hands-on projects and assignments</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Earn a certificate upon completion</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Access lifetime course materials</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Enrollment Card */}
            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <div className="text-3xl font-bold text-primary">{course.price}</div>
                  <CardDescription>One-time payment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold">{course.rating}</span>
                    <span className="text-muted-foreground text-sm">({course.students} students)</span>
                  </div>

                  <Button onClick={handleEnroll} disabled={isEnrolling} className="w-full" size="lg">
                    {isEnrolling ? "Enrolling..." : "Enroll Now"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">30-day money-back guarantee</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

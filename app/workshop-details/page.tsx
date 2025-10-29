"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  ArrowLeft,
  Clock,
  Users,
  Target,
  CheckCircle2,
  User,
  CreditCard,
  Smartphone,
  Building2,
  Star,
  MessageSquare,
} from "lucide-react"

export default function WorkshopDetailsPage() {
  const router = useRouter()
  const [showBatches, setShowBatches] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [showAllReviews, setShowAllReviews] = useState(false)

  const workshopDetails = {
    title: "Listening Skills Mastery",
    trainer: "Dr. Priya Nair",
    duration: "2 weeks",
    level: "All Levels",
    originalPrice: 5000,
    offerPrice: 3500,
  }

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Pay securely with your card",
    },
    {
      id: "upi",
      name: "UPI",
      icon: Smartphone,
      description: "Pay via UPI apps",
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: Building2,
      description: "Pay through your bank",
    },
  ]

  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      date: "2025-01-15",
      comment:
        "Excellent workshop! The instructor was very knowledgeable and the activities were engaging. I learned so much about active listening.",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      rating: 4,
      date: "2025-01-10",
      comment: "Great content and practical exercises. Would have liked more time for Q&A sessions.",
    },
    {
      id: 3,
      name: "Anita Desai",
      rating: 5,
      date: "2025-01-05",
      comment:
        "Transformative experience! The workshop helped me understand the importance of listening in both personal and professional relationships.",
    },
    {
      id: 4,
      name: "Vikram Singh",
      rating: 4,
      date: "2024-12-28",
      comment:
        "Very informative and well-structured. The mentor was excellent at explaining complex concepts in simple terms.",
    },
  ]

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2)
  const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)

  const handlePayment = () => {
    if (selectedPaymentMethod) {
      console.log("Processing payment with:", selectedPaymentMethod)
      router.push("/payments")
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-5xl mx-auto p-3 sm:p-6 md:p-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.push("/paid-workshop")} className="mb-6 hover:bg-[#900000]/10">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Workshops
        </Button>

        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            Register for Listening Skills
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Join our expert-led workshop and enhance your skills with hands-on learning
          </p>
        </div>

        {/* About Workshop */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">About Workshop</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Listening Skills</h3>
              <p className="text-muted-foreground">
                Become better at communicating by mastering the art of listening! Enroll today to Join our Listening
                Skills workshop.
              </p>
            </div>

            <p className="text-muted-foreground">
              Listening Skills Self-Growth Workshop: The workshop dives deep into the art of truly hearing others,
              without judgment or distraction. In this two-hour workshop, participants will explore practical activities
              that illustrate the impact of listening in real-life situations.
            </p>
          </CardContent>
        </Card>

        {/* Workshop Objectives */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Target className="w-6 h-6 text-[#900000]" />
              Workshop Objectives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                "Recognise how miscommunication and misunderstandings arise from poor listening.",
                "Learn to listen with intent and respond mindfully.",
                "Explore how silence enhances listening and contributes to more effective communication.",
                "Develop an awareness of how tone, context, and non-verbal cues affect listening and understanding.",
              ].map((objective, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#900000] mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{objective}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Who Should Attend */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Users className="w-6 h-6 text-[#900000]" />
              Who Should Attend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                "Professionals in any industry seeking to improve their communication.",
                "Leaders and managers want to foster a more collaborative work environment.",
                "Students and individuals interested in enhancing interpersonal skills.",
                "Anyone who wants to build stronger relationships through better listening.",
              ].map((audience, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#900000] mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{audience}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Key Benefits */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Key Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Participants will become better listeners, resulting in improved relationships, stronger workplace
              communication, and more effective problem-solving.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["Misunderstanding", "Contextual Listening", "Tone Awareness", "Mindfulness"].map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-[#900000]/10 text-[#900000] hover:bg-[#900000]/20">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Workshop Schedule & Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-[#900000]" />
              Workshop Schedule & Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Duration</span>
                  <span className="font-semibold">1 day</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Sessions</span>
                  <span className="font-semibold">1 session</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Session Duration</span>
                  <span className="font-semibold">120 minutes</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sessions per Day</span>
                  <span className="font-semibold">1 session</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Batch Capacity</span>
                  <span className="font-semibold">Maximum 8 participants</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Workshop Format</span>
                  <span className="font-semibold">Interactive live sessions</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-3">Workshop Agenda</h4>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Mishearing</li>
                <li>Reflex Reaction</li>
                <li>Contextual Listening</li>
                <li>Active & Passive Listening</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* About Mentor */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <User className="w-6 h-6 text-[#900000]" />
              About Mentor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold text-lg mb-2">Expert Mentor - Sandhya Tewari</h3>
            <p className="text-muted-foreground">
              Sandhya Tewari is an academician, teacher, trainer, and NLP coach. Dr. Tewari has dedicated her career to
              empowering individuals, whether students, professionals, or corporate leaders. She has designed
              transformative workshops focused on self-awareness, communication, and professional growth. Her expertise
              in soft skills training, behavioural assessments, and coaching methodologies bridges the gap between
              academia and the corporate world.
            </p>
          </CardContent>
        </Card>

        {/* Student Reviews Section */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-[#900000]" />
                Student Reviews & Ratings
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-[#900000] text-[#900000]" />
                  <span className="text-xl md:text-2xl font-bold">{averageRating}</span>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">({reviews.length} reviews)</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-4 md:mb-6">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter((r) => r.rating === star).length
                const percentage = (count / reviews.length) * 100
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-sm font-medium">{star}</span>
                    <Star className="w-4 h-4 fill-[#900000] text-[#900000]" />
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#900000]" style={{ width: `${percentage}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{count}</span>
                  </div>
                )
              })}
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {displayedReviews.map((review) => (
                <Card key={review.id} className="bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{review.name}</h4>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating ? "fill-[#900000] text-[#900000]" : "fill-none text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Show More/Less Button */}
            {reviews.length > 2 && (
              <Button variant="outline" onClick={() => setShowAllReviews(!showAllReviews)} className="w-full">
                {showAllReviews ? "Show Less Reviews" : `Show All ${reviews.length} Reviews`}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Enroll CTA */}
        <Card className="bg-gradient-to-r from-[#900000]/10 to-[#900000]/5 border-[#900000]/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Ready to Enroll?</h3>
            <p className="text-muted-foreground mb-6">
              Secure your spot in this workshop and start your learning journey today!
            </p>
            <Button
              size="lg"
              className="bg-[#900000] hover:bg-[#900000]/90 text-white px-8"
              onClick={() => setShowPaymentModal(true)}
            >
              Enroll Now
            </Button>
          </CardContent>
        </Card>

        {/* Available Batches */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-2xl">Available Batches</CardTitle>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground mb-2">No batches available at the moment.</p>
            <p className="text-sm text-muted-foreground">Check back soon for new batch announcements!</p>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Complete Your Enrollment</DialogTitle>
            <DialogDescription>Choose your preferred payment method to proceed</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 md:space-y-6">
            {/* Workshop Summary */}
            <Card className="bg-muted/50">
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg">{workshopDetails.title}</h4>
                    <p className="text-sm text-muted-foreground">by {workshopDetails.trainer}</p>
                  </div>
                  <Badge variant="outline">{workshopDetails.level}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{workshopDetails.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Original Price:</span>
                  <span className="line-through text-red-600">Rs {workshopDetails.originalPrice}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span className="text-green-600">Rs {workshopDetails.offerPrice}</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <div>
              <h4 className="font-semibold mb-4">Select Payment Method</h4>
              <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon
                    return (
                      <Card
                        key={method.id}
                        className={`cursor-pointer transition-all ${
                          selectedPaymentMethod === method.id
                            ? "border-[#900000] bg-[#900000]/5"
                            : "hover:border-gray-300"
                        }`}
                        onClick={() => setSelectedPaymentMethod(method.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <RadioGroupItem value={method.id} id={method.id} />
                            <Icon className="w-6 h-6 text-[#900000]" />
                            <div className="flex-1">
                              <Label htmlFor={method.id} className="font-semibold cursor-pointer">
                                {method.name}
                              </Label>
                              <p className="text-sm text-muted-foreground">{method.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" onClick={() => setShowPaymentModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handlePayment}
                disabled={!selectedPaymentMethod}
                className="flex-1 bg-[#900000] hover:bg-[#900000]/90"
              >
                Proceed to Pay Rs {workshopDetails.offerPrice}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

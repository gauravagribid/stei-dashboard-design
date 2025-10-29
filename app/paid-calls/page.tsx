"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Phone, Clock, CheckCircle2, IndianRupee } from "lucide-react"

const callPackages = [
  {
    id: "30min",
    duration: "30 Minutes",
    price: 499,
    description: "Perfect for quick consultations and focused discussions",
    features: ["One-on-one session", "Topic-focused discussion", "Follow-up notes"],
  },
  {
    id: "60min",
    duration: "60 Minutes",
    price: 899,
    description: "Ideal for in-depth guidance and comprehensive planning",
    features: ["Extended one-on-one session", "Detailed discussion", "Action plan", "Follow-up notes"],
    popular: true,
  },
  {
    id: "90min",
    duration: "90 Minutes",
    price: 1299,
    description: "Best for complex topics requiring thorough exploration",
    features: [
      "Extended consultation",
      "Multiple topics",
      "Detailed action plan",
      "Priority scheduling",
      "Follow-up notes",
    ],
  },
]

export default function PaidCallsPage() {
  const [selectedPackage, setSelectedPackage] = useState("")
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    topic: "",
  })

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId)
    setShowBookingForm(true)
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowPaymentModal(true)
  }

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setShowPaymentModal(false)
      setShowBookingForm(false)
      alert("Booking confirmed! You will receive a confirmation email shortly.")
      setBookingData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        topic: "",
      })
      setSelectedPackage("")
    }, 1500)
  }

  const selectedPackageDetails = callPackages.find((pkg) => pkg.id === selectedPackage)

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-balance">Book Your Clarity Call</h1>
          <p className="text-muted-foreground text-pretty">
            Continue your growth journey with personalized one-on-one mentorship sessions
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 mt-4">
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
            <span>Your first 15-minute call was free. Additional sessions require payment.</span>
          </div>
        </div>

        {/* Call Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {callPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`relative transition-all hover:shadow-lg flex flex-col h-full ${
                pkg.popular ? "border-[#900000] shadow-md" : ""
              } ${selectedPackage === pkg.id ? "ring-2 ring-[#900000]" : ""}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#900000] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-8 h-8 text-[#900000]" />
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <IndianRupee className="w-5 h-5" />
                      <span className="text-3xl font-bold">{pkg.price}</span>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-xl">{pkg.duration}</CardTitle>
                <CardDescription className="text-pretty">{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <ul className="space-y-2 flex-1">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#900000] mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handlePackageSelect(pkg.id)}
                  className="w-full bg-[#900000] hover:bg-[#900000]/90 mt-4"
                >
                  Select Package
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Booking Form */}
        {showBookingForm && selectedPackageDetails && (
          <Card className="border-[#900000]">
            <CardHeader>
              <CardTitle>Book Your {selectedPackageDetails.duration} Session</CardTitle>
              <CardDescription>Fill in your details to schedule your clarity call</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      required
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={bookingData.email}
                      onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      required
                      value={bookingData.date}
                      onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Preferred Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    required
                    value={bookingData.time}
                    onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">What would you like to discuss? *</Label>
                  <Textarea
                    id="topic"
                    required
                    value={bookingData.topic}
                    onChange={(e) => setBookingData({ ...bookingData, topic: e.target.value })}
                    placeholder="Briefly describe the topics you'd like to cover in this session..."
                    rows={4}
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowBookingForm(false)
                      setSelectedPackage("")
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-[#900000] hover:bg-[#900000]/90">
                    Proceed to Payment
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#900000]" />
              Need Help?
            </CardTitle>
            <CardDescription>Contact our mentor directly for any questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Phone:</span> +91 98765 43210
              </p>
              <p className="text-sm">
                <span className="font-semibold">Email:</span> mentor@stei.com
              </p>
              <p className="text-sm text-muted-foreground">Available Monday to Friday, 9 AM - 6 PM IST</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
            <DialogDescription>Choose your payment method to confirm your booking</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Session Duration:</span>
                <span className="font-semibold">{selectedPackageDetails?.duration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Date & Time:</span>
                <span className="font-semibold">
                  {bookingData.date} at {bookingData.time}
                </span>
              </div>
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Amount:</span>
                  <div className="flex items-center gap-1 text-lg font-bold text-[#900000]">
                    <IndianRupee className="w-5 h-5" />
                    <span>{selectedPackageDetails?.price}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Select Payment Method</Label>
              <RadioGroup defaultValue="upi">
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted cursor-pointer">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex-1 cursor-pointer">
                    UPI Payment
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted cursor-pointer">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    Credit/Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-muted cursor-pointer">
                  <RadioGroupItem value="netbanking" id="netbanking" />
                  <Label htmlFor="netbanking" className="flex-1 cursor-pointer">
                    Net Banking
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowPaymentModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handlePayment} className="flex-1 bg-[#900000] hover:bg-[#900000]/90">
                Pay Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

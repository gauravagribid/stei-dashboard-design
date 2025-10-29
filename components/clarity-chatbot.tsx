"use client"

import type React from "react"

import { useState } from "react"
import { Phone, X, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function ClarityChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    topic: "",
    currentRole: "",
    experience: "",
    challenges: "",
    goals: "",
    focusAreas: "",
    education: "",
    industry: "",
    careerStage: "",
    primarySkills: "",
    careerGoals: "",
    mentorshipExperience: "",
    urgency: "",
    preferredCommunication: "",
    specificTopics: "",
    howHeard: "",
  })

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Booking submitted:", bookingData)
    alert("Your call has been scheduled! We'll send you a confirmation email shortly.")
    setShowBookingForm(false)
    setIsOpen(false)
    setBookingData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      topic: "",
      currentRole: "",
      experience: "",
      challenges: "",
      goals: "",
      focusAreas: "",
      education: "",
      industry: "",
      careerStage: "",
      primarySkills: "",
      careerGoals: "",
      mentorshipExperience: "",
      urgency: "",
      preferredCommunication: "",
      specificTopics: "",
      howHeard: "",
    })
  }

  return (
    <>
      {/* Call Widget Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
          size="icon"
        >
          <Phone className="h-6 w-6" />
        </Button>
      )}

      {/* Call Info Card */}
      {isOpen && !showBookingForm && (
        <Card className="fixed bottom-6 right-6 w-80 shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">15 Min Free Clarity Call</h3>
                <p className="text-xs opacity-90">Complimentary Session</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Call Information */}
          <div className="p-6 space-y-4">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-lg">Schedule Your Free Clarity Call</h4>
              <p className="text-sm text-muted-foreground">
                Get personalized guidance and support from our team - absolutely free!
              </p>
              <Badge variant="secondary" className="mt-2">
                ⭐ Only first call is free
              </Badge>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Duration:</span>
                <span className="text-sm font-semibold">15 Minutes FREE</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm font-medium">Contact:</span>
                <a href="tel:+911234567890" className="text-sm font-semibold text-primary hover:underline">
                  +91 123 456 7890
                </a>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={() => setShowBookingForm(true)}>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Call - It's Free
            </Button>

            <p className="text-xs text-center text-muted-foreground">Available Monday - Friday, 9 AM - 6 PM IST</p>
          </div>
        </Card>
      )}

      {isOpen && showBookingForm && (
        <Card className="fixed bottom-6 right-6 w-96 shadow-2xl flex flex-col z-50 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">Book Your Free Call</h3>
                <p className="text-xs opacity-90">15 Minutes - First Call Free</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowBookingForm(false)
                setIsOpen(false)
              }}
              className="h-8 w-8 hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
            <div className="space-y-1 pb-2 border-b">
              <h4 className="font-semibold text-sm">Basic Information</h4>
              <p className="text-xs text-muted-foreground">Tell us about yourself</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                required
                placeholder="Enter your name"
                value={bookingData.name}
                onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="your@email.com"
                value={bookingData.email}
                onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                required
                placeholder="+91 1234567890"
                value={bookingData.phone}
                onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-1 pb-2 border-b pt-2">
              <h4 className="font-semibold text-sm">Professional Background</h4>
              <p className="text-xs text-muted-foreground">Help us understand your context</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentRole">Current Role/Occupation *</Label>
              <Input
                id="currentRole"
                required
                placeholder="e.g., Software Engineer, Student, Entrepreneur"
                value={bookingData.currentRole}
                onChange={(e) => setBookingData({ ...bookingData, currentRole: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Highest Education *</Label>
              <Select
                value={bookingData.education}
                onValueChange={(value) => setBookingData({ ...bookingData, education: value })}
                required
              >
                <SelectTrigger id="education">
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="diploma">Diploma</SelectItem>
                  <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                  <SelectItem value="masters">Master's Degree</SelectItem>
                  <SelectItem value="phd">PhD/Doctorate</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry/Domain *</Label>
              <Input
                id="industry"
                required
                placeholder="e.g., Technology, Healthcare, Finance"
                value={bookingData.industry}
                onChange={(e) => setBookingData({ ...bookingData, industry: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience *</Label>
              <Select
                value={bookingData.experience}
                onValueChange={(value) => setBookingData({ ...bookingData, experience: value })}
                required
              >
                <SelectTrigger id="experience">
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0-1 years (Fresher)</SelectItem>
                  <SelectItem value="1-3">1-3 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5-10">5-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="careerStage">Career Stage *</Label>
              <Select
                value={bookingData.careerStage}
                onValueChange={(value) => setBookingData({ ...bookingData, careerStage: value })}
                required
              >
                <SelectTrigger id="careerStage">
                  <SelectValue placeholder="Select your career stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student/Learning</SelectItem>
                  <SelectItem value="entry">Entry Level</SelectItem>
                  <SelectItem value="mid">Mid-Level Professional</SelectItem>
                  <SelectItem value="senior">Senior Professional</SelectItem>
                  <SelectItem value="leadership">Leadership/Management</SelectItem>
                  <SelectItem value="transition">Career Transition</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="primarySkills">Primary Skills/Expertise *</Label>
              <Textarea
                id="primarySkills"
                required
                placeholder="List your key skills or areas of expertise..."
                value={bookingData.primarySkills}
                onChange={(e) => setBookingData({ ...bookingData, primarySkills: e.target.value })}
                rows={2}
              />
            </div>

            <div className="space-y-1 pb-2 border-b pt-2">
              <h4 className="font-semibold text-sm">Career Goals & Aspirations</h4>
              <p className="text-xs text-muted-foreground">Share your vision for the future</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="careerGoals">Where do you see yourself in 2-3 years? *</Label>
              <Textarea
                id="careerGoals"
                required
                placeholder="Describe your career aspirations and goals..."
                value={bookingData.careerGoals}
                onChange={(e) => setBookingData({ ...bookingData, careerGoals: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-1 pb-2 border-b pt-2">
              <h4 className="font-semibold text-sm">Call Preparation</h4>
              <p className="text-xs text-muted-foreground">Help your mentor prepare for the session</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="challenges">What challenges are you currently facing? *</Label>
              <Textarea
                id="challenges"
                required
                placeholder="Describe the specific challenges or obstacles you're dealing with..."
                value={bookingData.challenges}
                onChange={(e) => setBookingData({ ...bookingData, challenges: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals">What do you hope to achieve from this call? *</Label>
              <Textarea
                id="goals"
                required
                placeholder="What outcomes or insights are you looking for..."
                value={bookingData.goals}
                onChange={(e) => setBookingData({ ...bookingData, goals: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="focusAreas">Specific areas you'd like to focus on *</Label>
              <Textarea
                id="focusAreas"
                required
                placeholder="e.g., Career transition, skill development, work-life balance..."
                value={bookingData.focusAreas}
                onChange={(e) => setBookingData({ ...bookingData, focusAreas: e.target.value })}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specificTopics">Any specific topics to discuss? (Optional)</Label>
              <Textarea
                id="specificTopics"
                placeholder="e.g., Resume review, interview preparation, salary negotiation..."
                value={bookingData.specificTopics}
                onChange={(e) => setBookingData({ ...bookingData, specificTopics: e.target.value })}
                rows={2}
              />
            </div>

            <div className="space-y-1 pb-2 border-b pt-2">
              <h4 className="font-semibold text-sm">Mentorship Experience</h4>
              <p className="text-xs text-muted-foreground">Tell us about your mentorship journey</p>
            </div>

            <div className="space-y-2">
              <Label>Have you worked with a mentor before? *</Label>
              <RadioGroup
                value={bookingData.mentorshipExperience}
                onValueChange={(value) => setBookingData({ ...bookingData, mentorshipExperience: value })}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="mentor-yes" />
                  <Label htmlFor="mentor-yes" className="font-normal cursor-pointer">
                    Yes, I have experience with mentorship
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="mentor-no" />
                  <Label htmlFor="mentor-no" className="font-normal cursor-pointer">
                    No, this is my first time
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>How urgent is your need for guidance? *</Label>
              <RadioGroup
                value={bookingData.urgency}
                onValueChange={(value) => setBookingData({ ...bookingData, urgency: value })}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="immediate" id="urgent-immediate" />
                  <Label htmlFor="urgent-immediate" className="font-normal cursor-pointer">
                    Immediate - Need help ASAP
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="soon" id="urgent-soon" />
                  <Label htmlFor="urgent-soon" className="font-normal cursor-pointer">
                    Soon - Within next 2 weeks
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="flexible" id="urgent-flexible" />
                  <Label htmlFor="urgent-flexible" className="font-normal cursor-pointer">
                    Flexible - Exploring options
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Preferred Communication Style *</Label>
              <RadioGroup
                value={bookingData.preferredCommunication}
                onValueChange={(value) => setBookingData({ ...bookingData, preferredCommunication: value })}
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="direct" id="comm-direct" />
                  <Label htmlFor="comm-direct" className="font-normal cursor-pointer">
                    Direct and straightforward
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="supportive" id="comm-supportive" />
                  <Label htmlFor="comm-supportive" className="font-normal cursor-pointer">
                    Supportive and encouraging
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="analytical" id="comm-analytical" />
                  <Label htmlFor="comm-analytical" className="font-normal cursor-pointer">
                    Analytical and detailed
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="howHeard">How did you hear about us? (Optional)</Label>
              <Select
                value={bookingData.howHeard}
                onValueChange={(value) => setBookingData({ ...bookingData, howHeard: value })}
              >
                <SelectTrigger id="howHeard">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="search">Search Engine</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="referral">Friend/Colleague Referral</SelectItem>
                  <SelectItem value="workshop">Workshop/Webinar</SelectItem>
                  <SelectItem value="email">Email Newsletter</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1 pb-2 border-b pt-2">
              <h4 className="font-semibold text-sm">Schedule Your Call</h4>
              <p className="text-xs text-muted-foreground">Choose your preferred time</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
            </div>

            <div className="bg-muted p-3 rounded-lg space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-medium">Duration: 15 Minutes</span>
              </div>
              <p className="text-xs text-muted-foreground">⭐ First call is completely free!</p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setShowBookingForm(false)} className="flex-1">
                Back
              </Button>
              <Button type="submit" className="flex-1 bg-[#900000] hover:bg-[#900000]/90">
                Confirm Booking
              </Button>
            </div>
          </form>
        </Card>
      )}
    </>
  )
}

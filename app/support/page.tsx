"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, Clock } from "lucide-react"

export default function SupportPage() {
  const supportChannels = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us during business hours",
      contact: "+1 (800) 123-4567",
      hours: "Mon-Fri, 9 AM - 6 PM EST",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email anytime",
      contact: "support@stei.com",
      hours: "Response within 24 hours",
    },
    {
      icon: Phone,
      title: "15 Mins Free Call with Mentor",
      description: "Schedule a free clarity call - First call is free!",
      contact: "+91 123 456 7890",
      hours: "Book your slot anytime",
    },
  ]

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
        <p className="text-muted-foreground mt-2">Get help from our support team</p>
      </div>

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportChannels.map((channel) => {
          const Icon = channel.icon
          return (
            <Card key={channel.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{channel.title}</CardTitle>
                </div>
                <CardDescription>{channel.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{channel.contact}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {channel.hours}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle>Send us a Message</CardTitle>
          <CardDescription>Fill out the form below and we'll get back to you soon</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="How can we help?" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Describe your issue or question..." rows={5} />
            </div>

            <Button className="w-full">Send Message</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

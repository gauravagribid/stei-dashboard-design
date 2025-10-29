"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ClarityChatbot } from "@/components/clarity-chatbot"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/")
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-background">
      {children}
      <ClarityChatbot />
    </div>
  )
}

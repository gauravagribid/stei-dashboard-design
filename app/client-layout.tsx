"use client"

import type React from "react"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ClarityChatbot } from "@/components/clarity-chatbot"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const isLoginPage = pathname === "/"

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user && !isLoginPage) {
      router.push("/")
    } else {
      setIsAuthenticated(!!user)
      setIsLoading(false)
    }
  }, [isLoginPage, router])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (isLoginPage) {
    return <>{children}</>
  }

  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen bg-background">
        <div className="hidden md:block md:w-64 flex-shrink-0">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden w-full">
          <Header />
          <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">{children}</main>
        </div>

        <ClarityChatbot />
      </div>
    )
  }

  return <>{children}</>
}

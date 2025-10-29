"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone, Loader2, AlertCircle, CheckCircle2, User } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPasswordField, setShowPasswordField] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [showAccountSelection, setShowAccountSelection] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<"google" | "microsoft" | null>(null)
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)

  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const [phoneStep, setPhoneStep] = useState<"phone" | "otp">("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [otpTimer, setOtpTimer] = useState(0)
  const [otpSent, setOtpSent] = useState(false)
  const [phoneError, setPhoneError] = useState("")

  const googleAccounts = [
    {
      email: "personal@gmail.com",
      picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=personal",
    },
    { email: "work@gmail.com", picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=work" },
    {
      email: "student@gmail.com",
      picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=student",
    },
  ]

  const microsoftAccounts = [
    {
      email: "personal@outlook.com",
      picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=outlook1",
    },
    {
      email: "work@company.com",
      picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=outlook2",
    },
  ]

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    if (cleaned.length <= 10) {
      return cleaned
    }
    return cleaned.slice(0, 10)
  }

  const isValidPhoneNumber = (phone: string) => {
    return /^[6-9]\d{9}$/.test(phone)
  }

  const handleEmailContinue = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (email) {
      setShowPasswordField(true)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    setTimeout(() => {
      if (email === "demo@gmail.com" && password === "Pass@123") {
        localStorage.setItem(
          "user",
          JSON.stringify({
            email,
            name: email.split("@")[0],
            authMethod: "email",
            loginTime: new Date().toISOString(),
          }),
        )
        window.location.href = "/dashboard"
      } else {
        setError("Invalid email or password. Please try again.")
        setIsLoading(false)
      }
    }, 1000)
  }

  const handleGoogleLogin = () => {
    setSelectedProvider("google")
    setShowAccountSelection(true)
    setSelectedAccount(null)
  }

  const handleMicrosoftLogin = () => {
    setSelectedProvider("microsoft")
    setShowAccountSelection(true)
    setSelectedAccount(null)
  }

  const handleAccountSelect = (accountEmail: string) => {
    setSelectedAccount(accountEmail)
    setIsLoading(true)
    setError("")

    setTimeout(() => {
      const accounts = selectedProvider === "google" ? googleAccounts : microsoftAccounts
      const account = accounts.find((acc) => acc.email === accountEmail)

      if (account) {
        const user = {
          email: account.email,
          name: account.email.split("@")[0],
          authMethod: selectedProvider,
          loginTime: new Date().toISOString(),
          picture: account.picture,
        }

        localStorage.setItem("user", JSON.stringify(user))
        window.location.href = "/dashboard"
      }
    }, 1500)
  }

  const handlePhoneLogin = () => {
    setShowPhoneModal(true)
    setPhoneStep("phone")
    setPhoneNumber("")
    setOtp("")
    setPhoneError("")
    setOtpSent(false)
  }

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault()
    setPhoneError("")

    if (!isValidPhoneNumber(phoneNumber)) {
      setPhoneError("Please enter a valid 10-digit mobile number starting with 6-9")
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setPhoneStep("otp")
      setOtpSent(true)
      setIsLoading(false)
      setOtpTimer(60)

      const interval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }, 1000)
  }

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault()
    setPhoneError("")

    if (otp.length !== 6) {
      setPhoneError("Please enter a valid 6-digit OTP")
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      const phoneUser = {
        email: `${phoneNumber}@phone.com`,
        name: "Phone User",
        phone: phoneNumber,
        authMethod: "phone",
        loginTime: new Date().toISOString(),
      }

      localStorage.setItem("user", JSON.stringify(phoneUser))
      window.location.href = "/dashboard"
    }, 1000)
  }

  const handleResendOTP = () => {
    setPhoneError("")
    setOtp("")
    setIsLoading(true)

    setTimeout(() => {
      setOtpSent(true)
      setIsLoading(false)
      setOtpTimer(60)
      setPhoneError("")

      const interval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 md:p-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Welcome back</h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Log in or sign up to access your learning dashboard and continue your journey.
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!showPasswordField ? (
          <>
            <div className="space-y-3 mb-6">
              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full h-14 text-base font-medium border-2 hover:bg-gray-100 hover:border-gray-300 transition-all bg-transparent"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                ) : (
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66 2.84.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                )}
                Continue with Google
              </Button>

              <Button
                onClick={handleMicrosoftLogin}
                variant="outline"
                className="w-full h-14 text-base font-medium border-2 hover:bg-gray-100 hover:border-gray-300 transition-all bg-transparent"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                ) : (
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 23 23">
                    <path fill="#f3f3f3" d="M0 0h23v23H0z" />
                    <path fill="#f35325" d="M1 1h10v10H1z" />
                    <path fill="#81bc06" d="M12 1h10v10H12z" />
                    <path fill="#05a6f0" d="M1 12h10v10H1z" />
                    <path fill="#ffba08" d="M12 12h10v10H12z" />
                  </svg>
                )}
                Continue with Microsoft
              </Button>

              <Button
                onClick={handlePhoneLogin}
                variant="outline"
                className="w-full h-14 text-base font-medium border-2 hover:bg-gray-100 hover:border-gray-300 transition-all bg-transparent"
                disabled={isLoading}
              >
                <Phone className="w-5 h-5 mr-3" />
                Continue with phone
              </Button>
            </div>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
              </div>
            </div>

            <form onSubmit={handleEmailContinue} className="space-y-3">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 text-base border-2"
                required
                autoFocus
              />
              <Button
                type="submit"
                className="w-full h-14 text-base font-medium bg-[#900000] hover:bg-[#900000]/90"
                disabled={!email}
              >
                Continue
              </Button>
            </form>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm font-semibold text-amber-900 mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-sm text-amber-800">
                <p>
                  <span className="font-medium">Email:</span> demo@gmail.com
                </p>
                <p>
                  <span className="font-medium">Password:</span> Pass@123
                </p>
              </div>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="flex items-center gap-2">
                <Input type="email" value={email} className="h-12 text-base border-2 bg-gray-50" disabled />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowPasswordField(false)
                    setPassword("")
                    setError("")
                  }}
                  className="text-[#900000] hover:text-[#900000]/80"
                >
                  Edit
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-base border-2"
                required
                autoFocus
              />
            </div>
            <Button
              type="submit"
              className="w-full h-14 text-base font-medium bg-[#900000] hover:bg-[#900000]/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        )}
      </div>

      <Dialog open={showAccountSelection} onOpenChange={setShowAccountSelection}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Choose an account</DialogTitle>
            <DialogDescription>
              Select which {selectedProvider === "google" ? "Google" : "Microsoft"} account you want to use
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 pt-4">
            {(selectedProvider === "google" ? googleAccounts : microsoftAccounts).map((account) => (
              <button
                key={account.email}
                onClick={() => handleAccountSelect(account.email)}
                disabled={isLoading}
                className="w-full flex items-center gap-4 p-4 rounded-lg border-2 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={account.picture || "/placeholder.svg"} alt={account.email} />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{account.email}</p>
                </div>
                {isLoading && selectedAccount === account.email && (
                  <Loader2 className="h-5 w-5 animate-spin text-[#900000]" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-4">
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => {
                setShowAccountSelection(false)
                setSelectedProvider(null)
                setSelectedAccount(null)
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPhoneModal} onOpenChange={setShowPhoneModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {phoneStep === "phone" ? "Enter your phone number" : "Verify OTP"}
            </DialogTitle>
            <DialogDescription>
              {phoneStep === "phone"
                ? "We'll send you a 6-digit verification code via SMS"
                : `Enter the code sent to +91 ${phoneNumber}`}
            </DialogDescription>
          </DialogHeader>

          {phoneError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{phoneError}</AlertDescription>
            </Alert>
          )}

          {phoneStep === "phone" ? (
            <form onSubmit={handleSendOTP} className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium text-gray-700">+91</span>
                  <Input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                    className="h-12 text-base flex-1"
                    required
                    autoFocus
                    maxLength={10}
                  />
                </div>
                <p className="text-xs text-gray-500">Enter your mobile number to receive OTP</p>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setShowPhoneModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#900000] hover:bg-[#900000]/90"
                  disabled={phoneNumber.length !== 10 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4 pt-4">
              {otpSent && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">OTP sent successfully to your mobile!</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="h-12 text-base text-center text-2xl tracking-widest"
                  required
                  autoFocus
                  maxLength={6}
                />
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {otpTimer > 0 ? (
                      <span className="text-[#900000] font-medium">Resend OTP in {otpTimer}s</span>
                    ) : (
                      <button
                        type="button"
                        className="text-[#900000] font-medium hover:underline"
                        onClick={handleResendOTP}
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending..." : "Resend OTP"}
                      </button>
                    )}
                  </span>
                  <button
                    type="button"
                    className="text-[#900000] font-medium hover:underline"
                    onClick={() => {
                      setPhoneStep("phone")
                      setOtp("")
                      setPhoneError("")
                    }}
                  >
                    Change number
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => {
                    setPhoneStep("phone")
                    setOtp("")
                    setPhoneError("")
                  }}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#900000] hover:bg-[#900000]/90"
                  disabled={otp.length !== 6 || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Login"
                  )}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

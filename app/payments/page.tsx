"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function PaymentsPage() {
  const payments = [
    {
      id: 1,
      date: "2025-10-15",
      time: "14:30",
      courseName: "The Strength of SHE",
      amount: "Rs 2999",
      status: "success",
      transactionId: "TXN-2025-001",
      receiptUrl: "#",
    },
    {
      id: 2,
      date: "2025-09-20",
      time: "10:15",
      courseName: "Self in Sync",
      amount: "Rs 1999",
      status: "success",
      transactionId: "TXN-2025-002",
      receiptUrl: "#",
    },
    {
      id: 3,
      date: "2025-08-10",
      time: "16:45",
      courseName: "Listening Skills Mastery",
      amount: "Rs 1499",
      status: "success",
      transactionId: "TXN-2025-003",
      receiptUrl: "#",
    },
    {
      id: 4,
      date: "2025-07-05",
      time: "09:20",
      courseName: "Leadership Presence",
      amount: "Rs 3499",
      status: "failed",
      transactionId: "TXN-2025-004",
      receiptUrl: "#",
    },
  ]

  const getStatusBadge = (status: string) => {
    return status === "success" ? (
      <Badge className="bg-green-600">Success</Badge>
    ) : (
      <Badge variant="destructive">Failed</Badge>
    )
  }

  const totalSpent = payments
    .filter((p) => p.status === "success")
    .reduce((sum, p) => sum + Number.parseFloat(p.amount.replace("Rs ", "")), 0)
    .toFixed(2)

  return (
    <div className="p-3 sm:p-6 md:p-8 space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Payments</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">View your payment history and receipts</p>
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Payment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <div>
              <p className="text-sm sm:text-base text-muted-foreground">Total Spent</p>
              <p className="text-2xl sm:text-3xl font-bold mt-2">Rs {totalSpent}</p>
            </div>
            <div>
              <p className="text-sm sm:text-base text-muted-foreground">Successful Payments</p>
              <p className="text-2xl sm:text-3xl font-bold mt-2">
                {payments.filter((p) => p.status === "success").length}
              </p>
            </div>
            <div>
              <p className="text-sm sm:text-base text-muted-foreground">Failed Payments</p>
              <p className="text-2xl sm:text-3xl font-bold mt-2">
                {payments.filter((p) => p.status === "failed").length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Payment History</CardTitle>
          <CardDescription className="text-sm">All your transactions and receipts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="border-r">Date & Time</TableHead>
                  <TableHead className="border-r">Course Name</TableHead>
                  <TableHead className="border-r">Amount</TableHead>
                  <TableHead className="border-r">Transaction ID</TableHead>
                  <TableHead className="border-r">Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id} className="border-b last:border-b-0">
                    <TableCell className="font-medium border-r">
                      <div>
                        <p>{payment.date}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{payment.time}</p>
                      </div>
                    </TableCell>
                    <TableCell className="border-r">{payment.courseName}</TableCell>
                    <TableCell className="font-semibold border-r">{payment.amount}</TableCell>
                    <TableCell className="font-mono text-sm border-r">{payment.transactionId}</TableCell>
                    <TableCell className="border-r">{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {payment.status === "success" && (
                          <>
                            <Button size="sm" variant="outline" className="bg-transparent">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="bg-transparent">
                              <Download className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

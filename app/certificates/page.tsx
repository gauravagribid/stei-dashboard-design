"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Share2, Award, LayoutGrid, List } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CertificatesPage() {
  const certificates = [
    {
      id: 1,
      title: "The Strength of SHE",
      instructor: "Dr. Priya Sharma",
      issuedDate: "2025-10-20",
      certificateId: "CERT-2025-001",
      credentialUrl: "https://example.com/verify/CERT-2025-001",
    },
    {
      id: 2,
      title: "Self in Sync",
      instructor: "Rajesh Kumar",
      issuedDate: "2025-09-15",
      certificateId: "CERT-2025-002",
      credentialUrl: "https://example.com/verify/CERT-2025-002",
    },
    {
      id: 3,
      title: "Listening Skills Mastery",
      instructor: "Anita Desai",
      issuedDate: "2025-08-10",
      certificateId: "CERT-2025-003",
      credentialUrl: "https://example.com/verify/CERT-2025-003",
    },
  ]

  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")

  const renderCertificateTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Certificate Title</TableHead>
          <TableHead>Instructor</TableHead>
          <TableHead>Issued Date</TableHead>
          <TableHead>Certificate ID</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {certificates.map((cert) => (
          <TableRow key={cert.id}>
            <TableCell className="font-medium">{cert.title}</TableCell>
            <TableCell>{cert.instructor}</TableCell>
            <TableCell>{cert.issuedDate}</TableCell>
            <TableCell>
              <Badge variant="outline" className="text-xs font-mono">
                {cert.certificateId}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Certificates</h1>
          <p className="text-muted-foreground mt-2">Download and share your earned certificates</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-[#900000] hover:bg-[#900000]/90" : ""}
          >
            <LayoutGrid className="w-4 h-4 mr-2" />
            Grid
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("table")}
            className={viewMode === "table" ? "bg-[#900000] hover:bg-[#900000]/90" : ""}
          >
            <List className="w-4 h-4 mr-2" />
            Table
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <Card key={cert.id} className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{cert.title}</CardTitle>
                    <CardDescription className="mt-1">by {cert.instructor}</CardDescription>
                  </div>
                  <Award className="w-6 h-6 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Issued Date:</span>
                    <span className="text-sm font-medium">{cert.issuedDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Certificate ID:</span>
                    <Badge variant="outline" className="text-xs">
                      {cert.certificateId}
                    </Badge>
                  </div>
                </div>

                <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                  <p className="text-xs text-muted-foreground mb-2">Credential URL:</p>
                  <p className="text-xs font-mono text-primary break-all">{cert.credentialUrl}</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">{renderCertificateTable()}</CardContent>
        </Card>
      )}

      {certificates.length === 0 && (
        <Card>
          <CardContent className="pt-12 pb-12 text-center">
            <Award className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Certificates Yet</h3>
            <p className="text-muted-foreground">Complete workshops to earn certificates</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

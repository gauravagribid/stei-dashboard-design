"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Upload, FileText, CheckCircle, Clock, AlertCircle, LayoutGrid, List } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null)
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")

  const assignments = [
    {
      id: 1,
      title: "The Strength of SHE: Personal Reflection",
      course: "The Strength of SHE",
      description:
        "Reflect on your journey navigating self-doubt and societal pressure. Share your insights on building confidence and professional success.",
      dueDate: "2025-11-10",
      status: "pending",
      submissionType: ["PDF", "Video"],
      submittedAt: null,
      marks: null,
      feedback: null,
    },
    {
      id: 2,
      title: "Self in Sync: Daily Intention Journal",
      course: "Self in Sync",
      description:
        "Document your daily intentions and productivity patterns. Analyze what helps you show up for yourself each day.",
      dueDate: "2025-11-12",
      status: "submitted",
      submissionType: ["PDF"],
      submittedAt: "2025-11-08",
      marks: null,
      feedback: null,
    },
    {
      id: 3,
      title: "Listening Skills: Active Listening Practice",
      course: "Listening Skills Mastery",
      description:
        "Record and analyze a conversation where you practiced active listening. Reflect on what you learned about communication.",
      dueDate: "2025-10-20",
      status: "graded",
      submissionType: ["PDF", "Video"],
      submittedAt: "2025-10-18",
      marks: 92,
      feedback: "Excellent work! Your reflection shows deep understanding of active listening principles.",
    },
    {
      id: 4,
      title: "Leadership Presence: Personal Leadership Style",
      course: "Leadership Presence",
      description:
        "Define your unique leadership style and create an action plan for developing authentic leadership presence.",
      dueDate: "2025-11-15",
      status: "pending",
      submissionType: ["PDF", "Video"],
      submittedAt: null,
      marks: null,
      feedback: null,
    },
    {
      id: 5,
      title: "Mindful Living: 7-Day Mindfulness Practice",
      course: "Mindful Living",
      description:
        "Complete a 7-day mindfulness practice and document your experiences, challenges, and insights gained.",
      dueDate: "2025-11-18",
      status: "pending",
      submissionType: ["PDF"],
      submittedAt: null,
      marks: null,
      feedback: null,
    },
  ]

  const getFilteredAssignments = (status: string) => {
    if (status === "all") return assignments
    return assignments.filter((a) => a.status === status)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Pending
          </Badge>
        )
      case "submitted":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Submitted
          </Badge>
        )
      case "graded":
        return (
          <Badge variant="default" className="bg-green-600">
            Graded
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-orange-600" />
      case "submitted":
        return <AlertCircle className="w-5 h-5 text-blue-600" />
      case "graded":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      default:
        return null
    }
  }

  const renderAssignmentCard = (assignment: any) => (
    <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{assignment.title}</CardTitle>
            <CardDescription className="mt-1">{assignment.course}</CardDescription>
          </div>
          {getStatusIcon(assignment.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{assignment.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Due Date:</span>
          <span className="text-sm text-muted-foreground">{assignment.dueDate}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {assignment.submissionType.map((type: string) => (
            <Badge key={type} variant="secondary" className="text-xs">
              {type}
            </Badge>
          ))}
        </div>

        {assignment.status === "graded" && (
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-green-900">Marks: {assignment.marks}/100</span>
            </div>
            <p className="text-sm text-green-800">{assignment.feedback}</p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="flex-1"
                onClick={() => setSelectedAssignment(assignment)}
                variant={assignment.status === "pending" ? "default" : "outline"}
              >
                {assignment.status === "pending" ? (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Submit
                  </>
                ) : assignment.status === "submitted" ? (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    View Submission
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    View Result
                  </>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedAssignment?.title}</DialogTitle>
                <DialogDescription>{selectedAssignment?.course}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedAssignment?.description}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Due Date</h4>
                  <p className="text-sm">{selectedAssignment?.dueDate}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Submission Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAssignment?.submissionType.map((type: string) => (
                      <Badge key={type} variant="secondary">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                {selectedAssignment?.status === "pending" && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Submit Assignment</h4>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted transition-colors">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {selectedAssignment?.submissionType.join(", ")}
                      </p>
                    </div>
                    <Button className="w-full">Submit Assignment</Button>
                  </div>
                )}
                {selectedAssignment?.status === "submitted" && (
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-900">
                      Submitted on {selectedAssignment?.submittedAt}. Waiting for grading.
                    </p>
                  </div>
                )}
                {selectedAssignment?.status === "graded" && (
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="font-medium text-green-900 mb-2">Marks: {selectedAssignment?.marks}/100</p>
                    <p className="text-sm text-green-800">{selectedAssignment?.feedback}</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )

  const renderAssignmentTable = (assignments: any[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Assignment Title</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Marks</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assignments.map((assignment) => (
          <TableRow key={assignment.id}>
            <TableCell className="font-medium">{assignment.title}</TableCell>
            <TableCell>{assignment.course}</TableCell>
            <TableCell>{assignment.dueDate}</TableCell>
            <TableCell>{getStatusBadge(assignment.status)}</TableCell>
            <TableCell>
              {assignment.status === "graded" ? (
                <span className="font-semibold text-green-600">{assignment.marks}/100</span>
              ) : (
                <span className="text-muted-foreground">-</span>
              )}
            </TableCell>
            <TableCell>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" onClick={() => setSelectedAssignment(assignment)}>
                    {assignment.status === "pending" ? (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Submit
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        View
                      </>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{selectedAssignment?.title}</DialogTitle>
                    <DialogDescription>{selectedAssignment?.course}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{selectedAssignment?.description}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Due Date</h4>
                      <p className="text-sm">{selectedAssignment?.dueDate}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Submission Type</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedAssignment?.submissionType.map((type: string) => (
                          <Badge key={type} variant="secondary">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {selectedAssignment?.status === "pending" && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Submit Assignment</h4>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted transition-colors">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm font-medium">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {selectedAssignment?.submissionType.join(", ")}
                          </p>
                        </div>
                        <Button className="w-full">Submit Assignment</Button>
                      </div>
                    )}
                    {selectedAssignment?.status === "submitted" && (
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-900">
                          Submitted on {selectedAssignment?.submittedAt}. Waiting for grading.
                        </p>
                      </div>
                    )}
                    {selectedAssignment?.status === "graded" && (
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <p className="font-medium text-green-900 mb-2">Marks: {selectedAssignment?.marks}/100</p>
                        <p className="text-sm text-green-800">{selectedAssignment?.feedback}</p>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Assignments</h1>
          <p className="text-muted-foreground mt-2">View, submit, and track your assignments</p>
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {getFilteredAssignments("all").map((assignment) => renderAssignmentCard(assignment))}
            </div>
          ) : (
            <div className="overflow-x-auto">{renderAssignmentTable(getFilteredAssignments("all"))}</div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 mt-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {getFilteredAssignments("pending").map((assignment) => renderAssignmentCard(assignment))}
            </div>
          ) : (
            <div className="overflow-x-auto">{renderAssignmentTable(getFilteredAssignments("pending"))}</div>
          )}
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4 mt-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {getFilteredAssignments("submitted").map((assignment) => renderAssignmentCard(assignment))}
            </div>
          ) : (
            <div className="overflow-x-auto">{renderAssignmentTable(getFilteredAssignments("submitted"))}</div>
          )}
        </TabsContent>

        <TabsContent value="graded" className="space-y-4 mt-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {getFilteredAssignments("graded").map((assignment) => renderAssignmentCard(assignment))}
            </div>
          ) : (
            <div className="overflow-x-auto">{renderAssignmentTable(getFilteredAssignments("graded"))}</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  MapPin,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Edit,
  Download,
  Eye,
  PhoneCall,
  Mail,
} from "lucide-react"
import api from "@/api"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

interface Appointment {
  id: string
  patient: string
  doctor: string
  service: string
  appointment_date: string
  appointment_time: string
  status: string
  symptoms?: string
  notes?: string
  created_at?: string
  updated_at?: string
  // Optional fields for display
  specialty?: string
  location?: string
  price?: string
}

// API service functions
const fetchAppointments = async (): Promise<Appointment[]> => {
  const response = await api.get("/appointments/")
  return response.data
}

const updateAppointment = async ({ id, ...data }: Partial<Appointment>): Promise<Appointment> => {
  const response = await api.patch(`/appointments/${id}/`, data)
  return response.data
}

const deleteAppointment = async (id: string): Promise<void> => {
  await api.delete(`/appointments/${id}/`)
}

const MyAppointments = () => {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // Fetch appointments
  const { data: appointments = [], isLoading, isError } = useQuery({
    queryKey: ['appointments'],
    queryFn: fetchAppointments,
    enabled: isAuthenticated,
  })

  // Mutations
  const updateMutation = useMutation({
    mutationFn: updateAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
      toast.success("Appointment updated successfully!")
    },
    onError: () => {
      toast.error("Failed to update appointment")
    }
  })

  const deleteMutation = useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] })
      toast.success("Appointment deleted successfully!")
    },
    onError: () => {
      toast.error("Failed to delete appointment")
    }
  })

  // State for modals and forms
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [rescheduleData, setRescheduleData] = useState({
    date: "",
    time: "",
    reason: "",
  })
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isReportOpen, setIsReportOpen] = useState(false)

  // Available time slots for rescheduling
  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Button functionality implementations
  const handleReschedule = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setRescheduleData({
      date: appointment.appointment_date,
      time: appointment.appointment_time,
      reason: "",
    })
    setIsRescheduleOpen(true)
  }

  const submitReschedule = () => {
    if (!rescheduleData.date || !rescheduleData.time || !selectedAppointment) {
      toast.error("Please select both date and time")
      return
    }

    updateMutation.mutate({
      id: selectedAppointment.id,
      appointment_date: rescheduleData.date,
      appointment_time: rescheduleData.time,
      status: "pending", // Reset status to pending when rescheduling
      notes: rescheduleData.reason ? 
        `${selectedAppointment.notes || ''}\nRescheduled: ${rescheduleData.reason}`.trim() : 
        `${selectedAppointment.notes || ''}\nAppointment rescheduled`.trim()
    })

    setIsRescheduleOpen(false)
    setRescheduleData({ date: "", time: "", reason: "" })
  }

  const handleCancel = (appointment: Appointment) => {
    const confirmCancel = window.confirm(
      `Are you sure you want to cancel your appointment with ${appointment.doctor} on ${formatDate(appointment.appointment_date)}?`,
    )

    if (confirmCancel) {
      updateMutation.mutate({
        id: appointment.id,
        status: "cancelled",
        notes: appointment.notes ? 
          `${appointment.notes}\n(Cancelled on ${new Date().toLocaleDateString()})` : 
          `Appointment cancelled on ${new Date().toLocaleDateString()}`
      })
    }
  }

  const handleContactClinic = (appointment: Appointment) => {
    const message = `Hello, I would like to inquire about my appointment:
    
Appointment ID: ${appointment.id.slice(0, 8)}
Date: ${formatDate(appointment.appointment_date)}
Time: ${appointment.appointment_time}
Doctor: ${appointment.doctor}
Service: ${appointment.service}

Please contact me regarding this appointment.

Best regards,
${user?.name || "Patient"}`

    // Create mailto link
    const mailtoLink = `mailto:MediCare@gmail.com?subject=Appointment Inquiry - ${appointment.id.slice(0, 8)}&body=${encodeURIComponent(message)}`

    // Open email client
    window.open(mailtoLink)

    // Also show phone option
    toast.info("Email client opened. You can also call us at +212661514131", {
      duration: 5000,
    })
  }

  const handleViewReport = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsReportOpen(true)
  }

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsDetailsOpen(true)
  }

  const downloadReport = () => {
    if (!selectedAppointment) return
    
    const reportContent = `
MEDICAL REPORT
==============

Patient: ${user?.name || "Patient Name"}
Appointment ID: ${selectedAppointment.id.slice(0, 8)}
Date: ${selectedAppointment ? formatDate(selectedAppointment.appointment_date) : ""}
Doctor: ${selectedAppointment.doctor}
Service: ${selectedAppointment.service}

EXAMINATION RESULTS:
- Vital signs: Normal
- Blood pressure: 120/80 mmHg
- Heart rate: 72 bpm
- Temperature: 98.6°F

DIAGNOSIS:
${selectedAppointment.notes || "No specific diagnosis recorded"}

RECOMMENDATIONS:
- Continue current medication
- Follow-up in 3 months
- Maintain healthy lifestyle

Doctor's Signature: ${selectedAppointment.doctor}
Date: ${new Date().toLocaleDateString()}
    `

    const blob = new Blob([reportContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `medical-report-${selectedAppointment.id.slice(0, 8)}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success("Medical report downloaded successfully!")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
          <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
            <h2 className="text-2xl font-bold text-slate-700 mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">Please login to view your appointments.</p>
            <Button
              onClick={() => navigate("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
            >
              Go to Login
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
          <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
            <h2 className="text-2xl font-bold text-slate-700 mb-4">Loading Appointments</h2>
            <p className="text-gray-600 mb-6">Please wait while we fetch your appointments...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
          <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md">
            <h2 className="text-2xl font-bold text-slate-700 mb-4">Error Loading Appointments</h2>
            <p className="text-gray-600 mb-6">Failed to fetch your appointments. Please try again later.</p>
            <Button
              onClick={() => queryClient.refetchQueries({ queryKey: ['appointments'] })}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
            >
              Retry
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-700 mb-6">My Appointments</h1>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            View and manage all your medical appointments. Stay on top of your healthcare schedule and never miss an
            important visit.
          </p>
        </div>
      </section>

      {/* Appointments Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Confirmed</p>
                    <p className="text-2xl font-bold text-green-600">
                      {appointments.filter((apt) => apt.status === "confirmed").length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {appointments.filter((apt) => apt.status === "pending").length}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {appointments.filter((apt) => apt.status === "completed").length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Cancelled</p>
                    <p className="text-2xl font-bold text-red-600">
                      {appointments.filter((apt) => apt.status === "cancelled").length}
                    </p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appointments List */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-700">All Appointments</h2>
              <Button
                onClick={() => navigate("/appointment")}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
              >
                Book New Appointment
              </Button>
            </div>

            {appointments.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Appointments Found</h3>
                  <p className="text-gray-500 mb-6">You haven't scheduled any appointments yet.</p>
                  <Button
                    onClick={() => navigate("/appointment")}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                  >
                    Schedule Your First Appointment
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {appointments.map((appointment) => (
                  <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-slate-700 mb-2">{appointment.service}</CardTitle>
                          <CardDescription className="text-gray-600">Appointment #{appointment.id.slice(0, 8)}</CardDescription>
                        </div>
                        <Badge className={`${getStatusColor(appointment.status)} flex items-center gap-1`}>
                          {getStatusIcon(appointment.status)}
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Date & Time */}
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="text-sm font-medium text-slate-700">Date</p>
                              <p className="text-gray-600">{formatDate(appointment.appointment_date)}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="text-sm font-medium text-slate-700">Time</p>
                              <p className="text-gray-600">{appointment.appointment_time}</p>
                            </div>
                          </div>
                        </div>

                        {/* Doctor & Service */}
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <User className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="text-sm font-medium text-slate-700">Doctor</p>
                              <p className="text-gray-600">{appointment.doctor}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <Stethoscope className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="text-sm font-medium text-slate-700">Service</p>
                              <p className="text-gray-600">{appointment.service}</p>
                            </div>
                          </div>
                        </div>

                        {/* Notes */}
                        <div className="space-y-4">
                          {appointment.notes && (
                            <div className="flex items-start space-x-3">
                              <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-slate-700">Notes</p>
                                <p className="text-gray-600">{appointment.notes}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-6 flex flex-wrap gap-3">
                        {appointment.status === "confirmed" && (
                          <>
                            <Button
                              variant="outline"
                              className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full"
                              onClick={() => handleReschedule(appointment)}
                              disabled={updateMutation.status === 'pending'}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Reschedule
                            </Button>
                            <Button
                              variant="outline"
                              className="border-red-600 text-red-600 hover:bg-red-50 rounded-full"
                              onClick={() => handleCancel(appointment)}
                              disabled={updateMutation.status === 'pending'}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </>
                        )}

                        {appointment.status === "pending" && (
                          <Button
                            variant="outline"
                            className="border-yellow-600 text-yellow-600 hover:bg-yellow-50 rounded-full"
                            onClick={() => handleContactClinic(appointment)}
                          >
                            <PhoneCall className="w-4 h-4 mr-2" />
                            Contact Clinic
                          </Button>
                        )}

                        {appointment.status === "completed" && (
                          <Button
                            variant="outline"
                            className="border-green-600 text-green-600 hover:bg-green-50 rounded-full"
                            onClick={() => handleViewReport(appointment)}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            View Report
                          </Button>
                        )}

                        <Button
                          variant="outline"
                          className="border-gray-600 text-gray-600 hover:bg-gray-50 rounded-full"
                          onClick={() => handleViewDetails(appointment)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reschedule Modal */}
      <Dialog open={isRescheduleOpen} onOpenChange={setIsRescheduleOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              Change your appointment date and time. A confirmation will be sent to you.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">New Date</Label>
              <Input
                id="date"
                type="date"
                value={rescheduleData.date}
                onChange={(e) => setRescheduleData((prev) => ({ ...prev, date: e.target.value }))}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">New Time</Label>
              <Select
                value={rescheduleData.time}
                onValueChange={(value) => setRescheduleData((prev) => ({ ...prev, time: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason for Rescheduling (Optional)</Label>
              <Textarea
                id="reason"
                placeholder="Please provide a reason for rescheduling..."
                value={rescheduleData.reason}
                onChange={(e) => setRescheduleData((prev) => ({ ...prev, reason: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsRescheduleOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={submitReschedule} 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={updateMutation.status === 'pending'}
            >
              {updateMutation.status === 'pending' ? "Processing..." : "Reschedule Appointment"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>Complete information about your appointment</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700">Appointment ID</Label>
                  <p className="text-gray-600">#{selectedAppointment.id.slice(0, 8)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">Status</Label>
                  <Badge className={`${getStatusColor(selectedAppointment.status)} w-fit`}>
                    {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-slate-700">Date</Label>
                  <p className="text-gray-600">{formatDate(selectedAppointment.appointment_date)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-slate-700">Time</Label>
                  <p className="text-gray-600">{selectedAppointment.appointment_time}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">Doctor</Label>
                <p className="text-gray-600">{selectedAppointment.doctor}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-700">Service</Label>
                <p className="text-gray-600">{selectedAppointment.service}</p>
              </div>
              {selectedAppointment.notes && (
                <div>
                  <Label className="text-sm font-medium text-slate-700">Notes</Label>
                  <p className="text-gray-600">{selectedAppointment.notes}</p>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Report Modal */}
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Medical Report</DialogTitle>
            <DialogDescription>Your medical report for the completed appointment</DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="grid gap-4 py-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-slate-700 mb-2">Appointment Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>
                    <span className="font-medium">Date:</span> {formatDate(selectedAppointment.appointment_date)}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span> {selectedAppointment.appointment_time}
                  </p>
                  <p>
                    <span className="font-medium">Doctor:</span> {selectedAppointment.doctor}
                  </p>
                  <p>
                    <span className="font-medium">Service:</span> {selectedAppointment.service}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-slate-700 mb-2">Examination Results</h3>
                <div className="text-sm space-y-1">
                  <p>• Vital signs: Normal</p>
                  <p>• Blood pressure: 120/80 mmHg</p>
                  <p>• Heart rate: 72 bpm</p>
                  <p>• Temperature: 98.6°F</p>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-slate-700 mb-2">Diagnosis & Notes</h3>
                <p className="text-sm">{selectedAppointment.notes || "No specific diagnosis recorded"}</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-slate-700 mb-2">Recommendations</h3>
                <div className="text-sm space-y-1">
                  <p>• Continue current medication as prescribed</p>
                  <p>• Schedule follow-up appointment in 3 months</p>
                  <p>• Maintain healthy lifestyle and diet</p>
                  <p>• Contact clinic if symptoms worsen</p>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsReportOpen(false)}>
              Close
            </Button>
            <Button onClick={downloadReport} className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-700 mb-4">Need Help with Your Appointments?</h2>
              <p className="text-gray-600">Our support team is here to assist you with any questions or concerns.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <PhoneCall className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-slate-700 mb-2">Call Us</h3>
                <p className="text-gray-600">+212661514131</p>
              </div>

              <div className="flex flex-col items-center">
                <Mail className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-slate-700 mb-2">Email Us</h3>
                <p className="text-gray-600">MediCare@gmail.com</p>
              </div>

              <div className="flex flex-col items-center">
                <MapPin className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-slate-700 mb-2">Visit Us</h3>
                <p className="text-gray-600">123 Maarif Street, Casablanca</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default MyAppointments
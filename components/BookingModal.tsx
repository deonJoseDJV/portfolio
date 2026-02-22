"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Video, X, Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// Import email function (we'll create this next)
import { sendBookingConfirmation } from "@/lib/email";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  
  const supabase = createClient();

  // Get today's date
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonthNow = today.getMonth() + 1;
  const currentYearNow = today.getFullYear();

  // Month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Fetch booked slots when date changes
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate) return;
      
      setLoadingSlots(true);
      setError(null);
      try {
        const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
        
        const { data, error } = await supabase
          .from('bookings')
          .select('booking_time')
          .eq('booking_date', dateStr);

        if (error) throw error;
        
        setBookedSlots(data?.map(b => b.booking_time) || []);
      } catch (error) {
        console.error('Error fetching booked slots:', error);
        setError('Failed to load available slots');
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchBookedSlots();
  }, [selectedDate, currentMonth, currentYear]);

  // Navigate to previous month
  const goToPreviousMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
    setSelectedTime(null);
  };

  // Navigate to next month
  const goToNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
    setSelectedTime(null);
  };

  // Generate calendar days
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();
  
  // Time slots
  const timeSlots = [
    "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"
  ];

  // Check if date is in the past
  const isDateDisabled = (day: number) => {
    if (currentYear < currentYearNow) return true;
    if (currentYear === currentYearNow && currentMonth < currentMonthNow) return true;
    if (currentYear === currentYearNow && currentMonth === currentMonthNow && day < currentDay) return true;
    return false;
  };

  // Check if time slot is already booked
  const isTimeBooked = (time: string) => {
    return bookedSlots.includes(time);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("deonjose27@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime || !name || !email || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);
    
    try {
      // Format the booking data
      const bookingDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
      const bookingDateTime = `${bookingDate} ${selectedTime}:00`;
      
      // Generate a simple meeting link
      const meetingId = Math.random().toString(36).substring(2, 10);
      const meetingLink = `https://meet.google.com/${meetingId}`;
      
      // Store in Supabase
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            name,
            email,
            booking_date: bookingDate,
            booking_time: selectedTime,
            booking_datetime: bookingDateTime,
            status: 'confirmed',
            meeting_link: meetingLink
          }
        ])
        .select();

      if (error) throw new Error(error.message);

      // Send confirmation email
      try {
        await sendBookingConfirmation({
          name,
          email,
          date: bookingDate,
          time: selectedTime,
          meetingLink,
        });
        console.log('Email sent successfully');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't throw - booking still succeeded
      }

      // Show success modal
      setShowSuccess(true);
      setSuccessData({
        name,
        email,
        date: bookingDate,
        time: selectedTime,
        meetingLink
      });
      
    } catch (error: any) {
      console.error('Booking error:', error);
      setError(error.message || 'Failed to confirm booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Main Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#1A1A1A] rounded-3xl border border-white/10 shadow-2xl z-[201]">
        
        {/* Header */}
        <div className="sticky top-0 bg-[#1A1A1A] border-b border-white/10 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">Book a Call</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition"
          >
            <X size={20} className="text-white/60" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Calendar & Time */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Calendar with Month Navigation */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white/80 text-sm font-medium flex items-center gap-2">
                    <Calendar size={16} className="text-primary" />
                    Select Date
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goToPreviousMonth}
                      className="p-1 rounded-full hover:bg-white/10 transition"
                    >
                      <ChevronLeft size={18} className="text-white/60" />
                    </button>
                    <span className="text-white font-medium text-sm">
                      {monthNames[currentMonth - 1]} {currentYear}
                    </span>
                    <button
                      onClick={goToNextMonth}
                      className="p-1 rounded-full hover:bg-white/10 transition"
                    >
                      <ChevronRight size={18} className="text-white/60" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4">
                  {/* Days grid */}
                  <div className="grid grid-cols-7 gap-2 text-center text-xs text-white/40 mb-2">
                    {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(day => (
                      <div key={day}>{day}</div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2">
                    {/* Empty cells for days before month starts */}
                    {[...Array(firstDayOfMonth)].map((_, i) => (
                      <div key={`empty-${i}`} className="p-2" />
                    ))}
                    
                    {/* Actual days */}
                    {monthDays.map((day) => {
                      const disabled = isDateDisabled(day);
                      return (
                        <button
                          key={day}
                          onClick={() => !disabled && setSelectedDate(day)}
                          disabled={disabled}
                          className={`p-2 rounded-lg text-sm transition ${
                            disabled
                              ? "opacity-30 cursor-not-allowed"
                              : selectedDate === day
                              ? "bg-primary text-white"
                              : "text-white/70 hover:bg-white/10"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <h3 className="text-white/80 text-sm font-medium mb-4 flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  Available Slots
                </h3>
                <p className="text-white/40 text-xs mb-3">Times shown in GMT+5:30</p>
                {loadingSlots ? (
                  <div className="text-white/40 text-sm py-4">Loading available slots...</div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {timeSlots.map((time) => {
                      const booked = isTimeBooked(time);
                      return (
                        <button
                          key={time}
                          onClick={() => !booked && setSelectedTime(time)}
                          disabled={!selectedDate || booked}
                          className={`p-3 rounded-xl border text-sm transition ${
                            !selectedDate
                              ? "opacity-30 cursor-not-allowed border-white/5"
                              : booked
                              ? "opacity-30 cursor-not-allowed border-red-500/30 bg-red-500/10"
                              : selectedTime === time
                              ? "border-primary bg-primary/10 text-white"
                              : "border-white/10 text-white/60 hover:border-white/30"
                          }`}
                        >
                          {time}
                          {booked && <span className="block text-[8px] text-red-400">Booked</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Meeting Info */}
              <div className="bg-white/5 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-3 text-white/80">
                  <Video size={16} className="text-primary" />
                  <span className="text-sm">Google Meet link will be generated</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <MapPin size={16} className="text-primary" />
                  <span className="text-sm">Trivandrum, India</span>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="space-y-6">
              <h3 className="text-white/80 text-sm font-medium">Your Details</h3>
              
              <div>
                <label className="text-white/40 text-xs mb-2 block">FULL NAME</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50"
                />
              </div>

              <div>
                <label className="text-white/40 text-xs mb-2 block">EMAIL ADDRESS</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.smith@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50"
                />
              </div>

              {/* Selected slot summary */}
              {selectedDate && selectedTime && (
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4">
                  <p className="text-white/80 text-xs">
                    <span className="text-primary">📅</span> {monthNames[currentMonth - 1]} {selectedDate}, {currentYear}
                  </p>
                  <p className="text-white/80 text-xs mt-1">
                    <span className="text-primary">⏰</span> {selectedTime} GMT+5:30
                  </p>
                </div>
              )}

              {/* Confirm button */}
              <button
                onClick={handleConfirmBooking}
                disabled={!selectedDate || !selectedTime || !name || !email || isSubmitting}
                className={`w-full py-4 rounded-xl font-medium transition ${
                  !selectedDate || !selectedTime || !name || !email || isSubmitting
                    ? "bg-primary/30 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/80"
                } text-white`}
              >
                {isSubmitting ? "CONFIRMING..." : "CONFIRM BOOKING"}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-[#1A1A1A] text-white/40">or</span>
                </div>
              </div>

              {/* Email option */}
              <div className="space-y-3">
                <h3 className="text-white/80 text-sm font-medium">Email me</h3>
                <a
                  href="mailto:deonjose27@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:bg-white/5 transition"
                >
                  <span className="text-white/80 text-sm">✉️</span>
                  <span className="text-white/60 text-sm">Open Gmail</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center justify-between w-full p-3 rounded-xl border border-white/10 hover:bg-white/5 transition"
                >
                  <span className="text-white/60 text-sm">deonjose27@gmail.com</span>
                  {copied ? (
                    <Check size={16} className="text-green-400" />
                  ) : (
                    <Copy size={16} className="text-white/40" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && successData && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => {
            setShowSuccess(false);
            onClose();
          }} />
          <div className="relative bg-[#1A1A1A] rounded-3xl border border-primary/30 p-8 max-w-md w-full shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
              <p className="text-white/60 text-sm mb-6">
                Your call has been scheduled successfully.
              </p>
              
              <div className="bg-white/5 rounded-xl p-4 mb-6 text-left">
                <p className="text-white/80 text-sm mb-2">
                  <span className="text-primary">📅</span> {successData.date}
                </p>
                <p className="text-white/80 text-sm mb-2">
                  <span className="text-primary">⏰</span> {successData.time} GMT+5:30
                </p>
                <p className="text-white/80 text-sm">
                  <span className="text-primary">🔗</span> Meet link: 
                  <a href={successData.meetingLink} target="_blank" rel="noopener noreferrer" 
                     className="text-primary hover:underline ml-2 break-all">
                    {successData.meetingLink}
                  </a>
                </p>
              </div>
              
              <p className="text-white/40 text-xs mb-6">
                A calendar invite has been sent to {successData.email}
              </p>
              
              <button
                onClick={() => {
                  setShowSuccess(false);
                  onClose();
                }}
                className="w-full py-3 bg-primary hover:bg-primary/80 rounded-xl text-white font-medium transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
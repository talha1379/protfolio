import { supabase } from "../services/supabase";
import React, { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { ProfileData } from "../types";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
} from "lucide-react";

interface Props {
  profile: ProfileData;
}

export const Contact: React.FC<Props> = ({ profile }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    }
    if (!email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!subject.trim()) {
      newErrors.subject = "Subject is required.";
    }
    if (!message.trim()) {
      newErrors.message = "Message content is required.";
    } else if (message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    const submittedName = fullName;

    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          full_name: fullName,
          email: email,
          subject: subject,
          message: message,
        },
      ]);

      if (error) {
        throw error;
      }

      setSubmitted(true);
      setFullName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setErrors({});
    } catch (error) {
      console.error("Contact message error:", error);

      setErrors({
        form: "Message could not be sent. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-[#0A0A0A] relative border-t border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Get in Touch"
          title="Contact & Collaboration"
          subtitle="Have a project idea, opportunity, or technical question? Feel free to reach out via email, phone, or message."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#141414] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-500" />
                Contact Information
              </h3>

              <div className="space-y-3.5 text-sm">
                {/* Phone */}
                <a
                  href={`tel:${profile.phone.replace(/[^0-9+]/g, "")}`}
                  className="p-3.5 rounded-xl bg-black border border-white/10 flex items-center gap-3.5 hover:border-blue-500/40 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-900/20 text-blue-500 flex items-center justify-center shrink-0 border border-blue-500/20">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">
                      Phone
                    </span>
                    <span className="font-semibold text-slate-200 group-hover:text-blue-400 transition-colors text-xs sm:text-sm">
                      {profile.phone}
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${profile.email}`}
                  className="p-3.5 rounded-xl bg-black border border-white/10 flex items-center gap-3.5 hover:border-blue-500/40 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-900/20 text-blue-500 flex items-center justify-center shrink-0 border border-blue-500/20">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">
                      Email
                    </span>
                    <span className="font-semibold text-slate-200 group-hover:text-blue-400 transition-colors truncate block text-xs sm:text-sm">
                      {profile.email}
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="p-3.5 rounded-xl bg-black border border-white/10 flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-900/20 text-blue-500 flex items-center justify-center shrink-0 border border-blue-500/20">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">
                      Location
                    </span>
                    <span className="font-semibold text-slate-200 text-xs sm:text-sm">
                      {profile.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Profiles */}
              <div className="pt-5 border-t border-white/5">
                <span className="text-xs text-slate-400 block mb-3 font-medium">
                  Professional Profiles
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-black hover:bg-white/5 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Github className="w-4 h-4 text-blue-500" />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-black hover:bg-white/5 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-blue-500" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form (7 cols on lg) */}
          <div className="lg:col-span-7 bg-[#141414] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">
              Send a Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Fill out the form below to drop me a line directly.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, {fullName || "there"}! Your
                  message has been received. I will get back to you shortly at
                  your provided email address.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-500 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. alex@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Web Development Opportunity / Project Inquiry"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
                  />
                  {errors.subject && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <p className="text-[10px] text-slate-500 text-center pt-1">
                  Integrated with demo validation. Formspree / EmailJS hook
                  ready.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

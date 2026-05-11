import React, { useState } from "react";
import {
  MdLockReset,
  MdMail,
  MdOutlineKeyboardBackspace,
  MdMarkEmailRead,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { errorOpts, successOpts } from "../../Config/toast";
import { toast } from "react-toastify";

const RecoverAccount: React.FC = () => {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast("Please enter email", errorOpts);
      return;
    }

    try {
      setLoading(true);

      const res = await resetPassword(email);

      if (!res.success) {
        toast(res.message, errorOpts);
        return;
      }

      toast("Password reset email sent!", successOpts);
      setIsEmailSent(true);
    } catch (err) {
      toast("Something went wrong. Try again.", errorOpts);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <img
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUs5sJ23IMSxH0E-_K59Kmz_s9IlY4UsEF4G7dsfM2_cq4iLwLPNonlc_BTuNZjwE9Q0Y1QdLUTBZYLFqV-exx5dIzXifD1yZ6IBuRtjWprQVOzNJz5cOf9gYoLXcFFzqYhOpG9MBDVadLGXeQ4no1pelIKtf2TVXtOzUcWCHv4_-dvfvDILAXeBHcg6ARyKXAzRHK7jS9fbhJ3bctQWy-VrDQpb4N7nuvKkTEmu_DMTrwUXfs2mU7XWuUF3FQ0Pf8AeQ4t_JtPXIa"
          alt="background"
        />
      </div>

      <main className="w-full max-w-xl px-6 relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="font-headline font-extrabold text-primary text-4xl tracking-tighter">
            GraminVivah
          </h1>
          <p className="font-label text-secondary font-medium tracking-[0.2em] uppercase mt-2 text-xs">
            Heritage Weddings
          </p>
        </div>

        {/* Card */}
        <section className="bg-white rounded-xl p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <div
              className={`w-16 h-16 flex items-center justify-center rounded-full mb-2 ${
                isEmailSent ? "bg-green-100" : "bg-[#ef8d92]"
              }`}
            >
              {isEmailSent ? (
                <MdMarkEmailRead className="text-green-600 text-3xl" />
              ) : (
                <MdLockReset className="text-white text-3xl" />
              )}
            </div>

            <h2 className="font-headline text-3xl font-bold text-on-surface">
              {isEmailSent ? "Check Your Email" : "Recover Your Account"}
            </h2>

            <p className="text-on-surface-variant max-w-sm">
              {isEmailSent
                ? "We've sent a password reset link to your email. Please check your inbox (and spam folder) and follow the instructions to reset your password."
                : "Enter the email address associated with your account and we'll send you a link to reset your password."}
            </p>
          </div>

          {/* CONDITIONAL UI */}
          {!isEmailSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <MdMail className="text-lg" />
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  className="w-full h-14 px-5 rounded-lg bg-[#f7f2f3] text-lg focus:ring-2 focus:ring-[#b12b31]/20 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-[#b12b31] text-white font-bold text-lg rounded-lg hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Recovery Link"}
              </button>

              <div className="flex justify-center items-center gap-2 pt-2">
                <MdOutlineKeyboardBackspace />
                <Link
                  to="/user-login"
                  className="text-[#b12b31] font-bold text-sm hover:underline"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center gap-6 pt-4">
              <Link
                to="/user-login"
                className="flex items-center gap-2 bg-[#b12b31] text-white px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-all"
              >
                <MdOutlineKeyboardBackspace />
                Back to Login
              </Link>
            </div>
          )}
        </section>

        {/* Trust Ribbon */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 opacity-60">
          <div className="px-4 py-2 rounded-full bg-gray-100 text-xs">
            Secure Recovery
          </div>
          <div className="px-4 py-2 rounded-full bg-gray-100 text-xs">
            Data Privacy
          </div>
          <div className="px-4 py-2 rounded-full bg-gray-100 text-xs">
            Help Center
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-8 w-full text-center text-xs text-gray-400">
        © 2024 GraminVivah. All rights reserved.
      </footer>
    </div>
  );
};

export default RecoverAccount;

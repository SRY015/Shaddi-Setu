import { useState } from "react";
import Navbar from "../../Layouts/Navbar";
import Footer from "../../Layouts/Footer";
import {
  FaCamera,
  FaPaintBrush,
  FaLongArrowAltRight,
  FaChevronDown,
  FaVideo,
} from "react-icons/fa";
import { FaLocationDot, FaArrowLeftLong } from "react-icons/fa6";
import { MdVerifiedUser, MdVerified, MdForum } from "react-icons/md";
import { RiCameraAiLine } from "react-icons/ri";
import { LuMessageSquareText } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Step1 = ({ nextStep }: { nextStep: () => void }) => {
  return (
    <form className="space-y-4">
      {/* Name */}
      <div className="space-y-2">
        <label className="ml-1 block font-label font-bold text-[#4d4635]">
          Your Name
        </label>

        <input
          type="text"
          placeholder="Enter your full name"
          className="h-14 w-full rounded-xl border-none bg-[#e6e1e2] px-5 text-lg outline-none focus:ring-2 focus:ring-[#b12b31]"
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label className="ml-1 block font-label font-bold text-[#4d4635]">
          Phone Number
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative grow">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-medium text-[#4d4635]">
              +91
            </span>

            <input
              type="tel"
              placeholder="98765 43210"
              className="h-14 w-full rounded-xl border-none bg-[#e6e1e2] pl-14 pr-5 text-lg outline-none focus:ring-2 focus:ring-[#b12b31]"
            />
          </div>

          <button
            type="button"
            className="h-14 rounded-xl bg-[#006d2f] px-6 font-bold text-white transition-all hover:opacity-90"
          >
            Verify
          </button>
        </div>

        <p className="ml-1 text-xs italic text-[#4d4635]">
          We'll send a 4-digit code to verify your identity.
        </p>
      </div>

      {/* Services */}
      <div className="space-y-4">
        <label className="ml-1 block font-label font-bold text-[#4d4635]">
          Services You Provide
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: <FaPaintBrush />, label: "Makeup" },
            { icon: <FaCamera />, label: "Photography" },
          ].map((item, index) => (
            <label key={index} className="relative cursor-pointer group">
              <input type="checkbox" className="peer sr-only" />

              <div className="flex h-24 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-transparent bg-[#e6e1e2] transition-all peer-checked:border-[#b12b31] peer-checked:bg-[#b12b31]/5">
                <span className="material-symbols-outlined text-3xl text-[#b12b31]">
                  {item.icon}
                </span>

                <span className="text-sm font-medium font-label">
                  {item.label}
                </span>
              </div>

              <div className="absolute right-2 top-2 opacity-0 transition-opacity peer-checked:opacity-100">
                <span
                  className="material-symbols-outlined text-sm text-[#b12b31]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="ml-1 block font-label font-bold text-[#4d4635]">
          Village/Town Name
        </label>

        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#b12b31]">
            <FaLocationDot />
          </span>

          <input
            type="text"
            placeholder="Search your town"
            className="h-14 w-full rounded-xl border-none bg-[#e6e1e2] pl-12 pr-5 text-lg outline-none focus:ring-2 focus:ring-[#b12b31]"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          onClick={nextStep}
          className="heritage-shadow flex h-16 w-full items-center justify-center gap-3 rounded-xl bg-[#b12b31] text-xl font-bold text-white transition-all hover:scale-[1.01] active:scale-95"
        >
          Next
          <span className="material-symbols-outlined">
            <FaLongArrowAltRight />
          </span>
        </button>
      </div>
    </form>
  );
};

const Step2 = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  return (
    <form className="space-y-8">
      {/* Starting Price */}
      <div className="bg-white p-6 rounded-xl heritage-shadow">
        <label
          htmlFor="price"
          className="block font-headline font-bold text-[#1c1b1c] mb-4"
        >
          Starting Price
        </label>

        <div className="relative flex items-center">
          <span className="absolute left-4 text-[#4d4635] font-bold text-lg">
            ₹
          </span>

          <input
            id="price"
            type="text"
            placeholder="e.g., Bridal Makeup ₹2500"
            className="w-full pl-10 pr-4 py-4 bg-[#e6e1e2] border-none rounded-lg outline-none focus:ring-2 focus:ring-[#b12b31]/20 font-medium text-[#1c1b1c] placeholder:text-[#7f7663]/60"
          />
        </div>

        <p className="mt-2 text-xs text-[#4d4635]">
          Mention your basic service price to set clear expectations.
        </p>
      </div>

      {/* Experience */}
      <div className="bg-white p-6 rounded-xl heritage-shadow">
        <label
          htmlFor="experience"
          className="block font-headline font-bold text-[#1c1b1c] mb-4"
        >
          Years of Experience
        </label>

        <div className="relative">
          <select
            id="experience"
            defaultValue=""
            className="w-full appearance-none px-4 py-4 bg-[#e6e1e2] border-none rounded-lg outline-none focus:ring-2 focus:ring-[#b12b31]/20 font-medium text-[#1c1b1c] cursor-pointer"
          >
            <option value="" disabled>
              Select your experience level
            </option>
            <option value="beginner">Beginner</option>
            <option value="1-2">1-2 Years</option>
            <option value="3-5">3-5 Years</option>
            <option value="5+">5+ Years</option>
          </select>

          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#4d4635]">
            <FaChevronDown />
          </span>
        </div>
      </div>

      {/* Available For */}
      <div className="bg-white p-6 rounded-xl heritage-shadow">
        <h3 className="font-headline font-bold text-[#1c1b1c] mb-6">
          Available For
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Wedding", "Engagement", "Party Makeup", "Festival Events"].map(
            (item) => (
              <label
                key={item}
                className="flex items-center gap-3 p-4 rounded-lg bg-[#e6e1e2]/50 cursor-pointer hover:bg-[#e6e1e2] transition-colors group"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-[#7f7663] text-[#b12b31]"
                />
                <span className="font-medium text-[#1c1b1c] group-hover:text-[#b12b31] transition-colors">
                  {item}
                </span>
              </label>
            ),
          )}

          <label className="flex items-center gap-3 p-4 rounded-lg bg-[#e6e1e2]/50 cursor-pointer hover:bg-[#e6e1e2] transition-colors group md:col-span-2">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-[#7f7663] text-[#b12b31]"
            />
            <span className="font-medium text-[#1c1b1c] group-hover:text-[#b12b31] transition-colors">
              Pre-Wedding Shoot
            </span>
          </label>
        </div>
      </div>

      {/* Service Area */}
      <div className="bg-white p-6 rounded-xl heritage-shadow">
        <label
          htmlFor="travel"
          className="block font-headline font-bold text-[#1c1b1c] mb-4"
        >
          Service Area
        </label>

        <div className="mb-4">
          <p className="text-sm text-[#4d4635] mb-4 leading-relaxed">
            How far can you travel from your location to provide services?
          </p>

          <div className="relative">
            <input
              id="travel"
              type="text"
              placeholder="e.g., Within 30 KM"
              className="w-full px-4 py-4 bg-[#e6e1e2] border-none rounded-lg outline-none focus:ring-2 focus:ring-[#b12b31]/20 font-medium text-[#1c1b1c] placeholder:text-[#7f7663]/60"
            />

            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#b12b31]/60">
              distance
            </span>
          </div>
        </div>

        {/* Trust Ribbon */}
        <div className="mt-8 overflow-hidden rounded-lg bg-[#ece7e8] py-3 px-4 flex items-center gap-3">
          <span
            className="material-symbols-outlined text-[#735c00]"
            style={{
              fontVariationSettings: "'FILL' 1",
            }}
          >
            <MdVerifiedUser />
          </span>

          <span className="text-xs font-semibold text-[#1c1b1c] tracking-wide uppercase italic">
            Trusted by over 500 local families
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="pt-8 flex flex-col gap-4">
        <div className="flex justify-between items-center gap-2">
          <button
            onClick={prevStep}
            type="submit"
            className="w-full h-14 bg-[#e6e1e2] text-[#b12b31] font-bold rounded-xl text-lg heritage-shadow hover:opacity-90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined">
              {" "}
              <FaArrowLeftLong />
            </span>
            Back
          </button>
          <button
            onClick={nextStep}
            type="submit"
            className="w-full h-14 bg-[#b12b31] text-white font-bold rounded-xl text-lg heritage-shadow hover:opacity-90 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            Next
            <span className="material-symbols-outlined">
              {" "}
              <FaLongArrowAltRight />
            </span>
          </button>
        </div>
        <button
          type="button"
          className="w-full py-3 text-[#4d4635] font-medium hover:text-[#b12b31] transition-colors"
        >
          Save Draft and Exit
        </button>
      </div>
    </form>
  );
};

const Step3 = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Right Section */}
      <div className="lg:w-full space-y-8">
        {/* Upload Area */}
        <div className="relative group dashed-border overflow-hidden min-h-85 flex flex-col items-center justify-center p-6 sm:p-12 transition-all hover:bg-[#f7f2f3] cursor-pointer bg-white">
          <div className="absolute inset-0 z-0 opacity-[0.08] grayscale group-hover:grayscale-0 group-hover:opacity-[0.12] transition-all duration-700 scale-110 group-hover:scale-100">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAqs0bHBAKQ5S2hFmukrOHt1AcYe_qi4D5or2Eu6RATzX1ARoP4JFbxYfdz1FlCacLcHe7NuYs5UtB2xiKnX7_TW8e4eVqQ9PMFDQPaRXjJuHc1eEz324xeIQhp-rQ2yAENFPLxseLjX4D2Fmyv42geju6Av9Vyh0sljaIDhTGURSRBnFjHWMcgw_ZlCf4tCufTHxHsKxVNKZZ-VV3fni6wnYLm9kzCkk2ZDXpaiUUYGZZX7Tj0Eg_4vS0J0W39lpN4LSLG7JxEvpd"
              alt="gallery"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-[#b12b31] text-white rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-[#b12b31]/20 group-hover:scale-105 transition-transform duration-500">
              <span
                className="material-symbols-outlined text-4xl"
                style={{ fontVariationSettings: "'wght' 500" }}
              >
                <RiCameraAiLine />
              </span>
            </div>

            <h3 className="text-2xl font-headline font-extrabold mb-2">
              Upload Your Gallery
            </h3>

            <p className="text-[#4d4635] font-medium max-w-70">
              Select high-quality images of your past projects
            </p>

            <button className="mt-8 px-8 py-3 bg-[#1c1b1c] text-[#fdf8f9] rounded-full text-sm font-bold tracking-wide shadow-lg active:scale-95 transition-transform">
              Browse Images
            </button>
          </div>
        </div>

        {/* Secondary Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Video Card */}
          <div className="group bg-white rounded-4xl p-8 flex flex-col items-center justify-center border border-[#d0c5af]/30 hover:border-[#b12b31]/30 transition-all hover:shadow-xl hover:shadow-[#b12b31]/5 cursor-pointer text-center">
            <div className="w-14 h-14 bg-[#ece7e8] text-[#b12b31] rounded-2xl flex items-center justify-center mb-5 group-hover:rotate-12 transition-transform">
              <span className="material-symbols-outlined text-2xl">
                <FaVideo />
              </span>
            </div>

            <h4 className="text-lg font-headline font-bold">Add Videos</h4>

            <p className="text-[#7f7663] text-sm mt-2">
              Bring your work to life with short clips
            </p>
          </div>

          {/* Trust Card */}
          <div className="bg-[#ff9591]/10 rounded-4xl p-8 flex flex-col border border-[#ff9591]/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#b12b31]/10 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[#b12b31]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  <MdVerified />
                </span>
              </div>

              <span className="font-headline font-bold text-[#8c0c1b]">
                Trust & Verification
              </span>
            </div>

            <p className="text-sm text-[#8c0c1b]/80 leading-relaxed">
              Complete your portfolio today to receive the{" "}
              <span className="text-[#b12b31] font-bold">"Top Artist"</span>{" "}
              badge on your profile.
            </p>
          </div>
        </div>

        {/* WhatsApp Help */}
        <div className="relative overflow-hidden p-8 bg-[#18cd61]/10 rounded-4xl flex flex-col md:flex-row items-center gap-8 border border-[#18cd61]/30">
          <div className="bg-pattern absolute inset-0"></div>

          <div className="relative shrink-0 w-16 h-16 bg-[#006d2f] text-white rounded-3xl flex items-center justify-center shadow-lg shadow-[#006d2f]/20">
            <span
              className="material-symbols-outlined text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              <LuMessageSquareText />
            </span>
          </div>

          <div className="relative text-center md:text-left grow">
            <h4 className="text-xl font-headline font-extrabold text-[#005021] mb-1">
              Struggling to upload?
            </h4>

            <p className="text-[#005021]/70 text-sm font-medium">
              Just send your photos on WhatsApp. We'll handle the rest for you.
            </p>
          </div>

          <a
            href="#"
            className="relative w-full md:w-auto px-8 py-4 bg-[#006d2f] text-white rounded-2xl flex items-center justify-center gap-3 font-bold shadow-lg shadow-[#006d2f]/20 hover:opacity-95 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">
              <MdForum />
            </span>
            Send via WhatsApp
          </a>
        </div>
      </div>

      {/* CTA Area */}
      <div className="fixed bottom-0 left-0 w-full glass-panel pt-6 pb-10 px-4 sm:px-6 z-40 lg:relative lg:bg-transparent lg:border-none lg:px-0 lg:pt-20 lg:pb-0">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="w-full max-w-2xl">
            <div className="flex justify-between items-center gap-2">
              <button
                onClick={() => {
                  prevStep();
                }}
                className="w-full h-16 bg-[#e6e1e2] text-[#b12b31] rounded-3xl font-headline font-bold text-lg flex items-center justify-center gap-3 heritage-shadow hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <span className="material-symbols-outlined font-bold">
                  <FaArrowLeftLong />
                </span>
                Back
              </button>
              <button
                onClick={() => {
                  nextStep();
                  navigate("/profile-created");
                }}
                className="w-full h-16 bg-[#b12b31] text-white rounded-3xl font-headline font-bold text-lg flex items-center justify-center gap-3 heritage-shadow hover:brightness-110 active:scale-[0.98] transition-all"
              >
                Complete Profile
                <span className="material-symbols-outlined font-bold">
                  <FaLongArrowAltRight />
                </span>
              </button>
            </div>

            <button className="w-full mt-6 text-[#7f7663] font-bold text-sm text-center hover:text-[#1c1b1c] transition-colors uppercase tracking-widest">
              Save Draft & Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const index = () => {
  const [step, setStep] = useState(1);

  // const [formData, setFormData] = useState({
  //   fullName: "",
  //   phone: "",
  //   location: "",
  //   state: "",
  //   email: "",
  //   password: "",
  // });

  const totalSteps = 3;

  // const handleChange = (e: any) => {
  //   const { name, value } = e.target;

  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // const handleSubmit = () => {
  //   console.log("Final Form Data:", formData);
  //   alert("Form Submitted Successfully!");
  // };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 nextStep={nextStep} />;

      case 2:
        return <Step2 nextStep={nextStep} prevStep={prevStep} />;

      case 3:
        return <Step3 nextStep={nextStep} prevStep={prevStep} />;

      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#fdf8f9] pt-14">
        {/* Header */}
        <Navbar />

        <main className="px-4 pt-5 pb-10 md:px-6">
          <div className="mx-auto max-w-7xl">
            {/* Main Layout */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
              {/* ================= LEFT SECTION (Sticky) ================= */}
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-28 space-y-5">
                  {/* Content Wrapper */}
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <div className="mb-4 flex items-center gap-2">
                        <span className="rounded-full bg-[#b12b31]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#b12b31] font-headline">
                          {`Step ${step} of 3`}
                        </span>
                      </div>

                      <h1 className="font-headline text-3xl font-extrabold leading-tight text-[#b12b31] lg:text-4xl">
                        Join the GraminVivah family
                      </h1>

                      <p className="text-md font-body font-light leading-relaxed text-[#4d4635]">
                        Become a part of India&apos;s most trusted wedding
                        community. Showcase your talent to families looking for
                        the perfect celebration.
                      </p>
                    </div>

                    {/* Trust Ribbon */}
                    <div className="space-y-4 rounded-2xl bg-[#e6e1e2] p-6 shadow-sm">
                      <div className="flex items-center gap-3">
                        <span
                          className="material-symbols-outlined text-[#735c00]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          stars
                        </span>

                        <span className="font-label font-bold text-[#1c1b1c]">
                          Verified by 50+ Families
                        </span>
                      </div>

                      <div className="flex -space-x-3">
                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaXR--8ld8Xuh7ply92eTvBicdwt5e-Xct3Sz7H7cItQDSmJiCBxCpvvGwIL4me40SWu0Hk2O0eBe2VsL771G-ZJLUiTY8GP5zW_HB6IqgiDLXl5APXJF-NRxoagR90y0EFFdmC3HQeHUFcUhXXOcnkLAyzq4z0ABJGKM3sNhc0B78ODzDsh_ZFL4oIuZN18r1q9J332ZBu1c9rJPYkzrRUcpyUrWciOj0RhSnvz_UEoncDoFt7dM11sxOEm4AzNm7uuHBn4IHR6eR"
                          alt="artist"
                          className="h-10 w-10 rounded-full border-2 border-[#fdf8f9] object-cover"
                        />

                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgKVYfbNfySwd6XDpdhe_KaHMxOJ0bDC-6-QrUClYmge4_-bVPb86ce0fZz8-JVZJpvOKB48og2zE-JYzfsmzLcsTPXVOdRtOXCg3G1GyC-uhpzi9VtSXuGnq_QsizRv2WWgYS4QCO6Ofiu1cPlgiN6ZaVnrESoA8rEfMNH0fsRRJW6HXqkVucSXY0PTDRAxOjLiWQSKdlREqL0RRx2hak-HRnKJW_8K18REku748SMvqTB55425VxcYHqaTiMd8k-lGVXM_55YsmI"
                          alt="artist"
                          className="h-10 w-10 rounded-full border-2 border-[#fdf8f9] object-cover"
                        />

                        <img
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnep0-dFqwMnMfFkvGAT3qxVQE3b-5iMv_z_vU_zGZMKvlGut41DlabW6FPlQLx7w0Mz1xbeY-OGBFR2Bl5johkAKV-ZNBR92B9CVff7Ry5TDHbIVlFjpgK8lTRZFUUuSPYH_mcKt3VLyZefct66e6b_ml8E2dCF30H9Xxr6lfZG6Z4XRWV5Q-yhQYJ-kE4PKvqxB7DExDId5YL_Ds9xx9jJdfEnLnVRxBr1Cf2I3FKtgkIDgkPephsUUXZHM3kuWQfnT7plSIG0f8"
                          alt="artist"
                          className="h-10 w-10 rounded-full border-2 border-[#fdf8f9] object-cover"
                        />

                        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#fdf8f9] bg-[#ff9591] text-xs font-bold text-[#8c0c1b]">
                          +12
                        </div>
                      </div>
                    </div>

                    {/* Aesthetic Image */}
                    <div className="relative hidden overflow-hidden rounded-2xl lg:block aspect-[5/3] heritage-shadow">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXY2s3JAPGxHlH5p_8jr0cKgFGQhSp83MskrlOOM07L-M_QOkFeFn0fdFuViHq4Ut6pVe9xe7b8JqVymTcYjeV3Egn5k7LRW1x11qZFNbaBorJDG8zr5lu4GnJiGiTwRp_f2UTEPglDDH0PQjKkht8RPMPKaRBFNTiwb7mCr1Vvf9VrCVEF48jcS07o_24bqB0pgIpJ-Y94K66_c1o2LqCJ8ua3vt4vFsZXvvzZzJk9qqE_Sj_awKyfMnDBjlSDgIE3j3Jdx3OSH0n"
                        alt="Wedding Setup"
                        className="h-full w-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#b12b31]/40 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= RIGHT SECTION (Scrollable First) ================= */}
              <div className="lg:col-span-7">
                {/* 
            This creates the professional UX:
            - right section gets its own scrolling area
            - left section remains sticky
            - only after right content ends, page scroll continues naturally
          */}
                <div className="max-h-[calc(100vh-120px)] overflow-y-auto pr-2 custom-scrollbar no-scrollbar">
                  <div className="rounded-2xl bg-[#f7f2f3] p-6 shadow-lg sm:p-8 md:p-10 heritage-shadow">
                    {/* Current Step */}
                    {renderStep()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default index;

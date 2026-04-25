// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../../Context/AuthContext";
// import { useState } from "react";

// interface FormData {
//   fullName: string;
//   phone: string;
//   email: string;
//   serviceCategory: "Makeup Artist" | "Photographer";
// }

// const ArtistRegistration = () => {
//   const navigate = useNavigate();
//   const { sendOTP, verifyOTP, otpSent, loading } = useAuth();

//   const [formData, setFormData] = useState<FormData>({
//     fullName: "",
//     phone: "",
//     email: "",
//     serviceCategory: "Makeup Artist",
//   });
//   const [otp, setOtp] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleGetOTP = async () => {
//     if (!formData.phone) {
//       alert("Please enter mobile number");
//       return;
//     }

//     const fullPhoneNumber = `+91${formData.phone}`;

//     const response = await sendOTP(fullPhoneNumber);

//     if (response.success) {
//       alert("OTP sent successfully");
//     } else {
//       alert(response.message);
//     }
//   };

//   const handleSubit = async (e: React.SubmitEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!otpSent) {
//       alert("Please verify your mobile number first");
//       return;
//     }
//     const response = await verifyOTP(otp);
//     if (response.success) {
//       alert("Registration successful");

//       // Later save artist data in Firestore here

//       navigate("/artist-dashboard");
//     } else {
//       alert(response.message);
//     }
//   };
//   return (
//     <div className="bg-white text-[#1c1b1c] min-h-screen overflow-hidden md:h-screen font-sans">
//       <main className="min-h-screen md:h-full flex flex-col md:flex-row">
//         {/* Left Side: Editorial Content */}
//         <section className="relative w-full md:w-[45%] lg:w-[50%] min-h-80 md:h-full flex items-center overflow-hidden">
//           {/* Background Image */}
//           <div className="absolute inset-0 z-0">
//             <img
//               src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6iBUkiJ3yYQ5a6RwswbwE8TT1wcjCS9XF8-MHbE4FByE0tVRmmH_fMQqLoSgrZtQsYRnNIy42_I1nhzwm2q5P8MryyNsDAMCGskT6sO8N6GCXvPW7tldoDELsQI-do6tWYKDQWe9ox4zW6g0LIcM6P0UQLpRhqYgbK-dTsIvxUcVSgthHVpLZdUPD7xnG8wn-KFXF9Hm3UH_nzeDhydqOYiy-23C_XNRblIdXQNArO_V7QMGaik9bHEiLrA2Sna54x-F3tThURtnV"
//               alt="Traditional Indian Artist"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-linear-to-br from-black/60 via-black/30 to-[#b12b31]/40" />
//           </div>

//           {/* Content */}
//           <div className="relative z-10 p-6 sm:p-8 md:p-12 lg:p-20 flex flex-col h-full w-full justify-between">
//             {/* Brand Logo */}
//             <div>
//               <div className="flex items-center gap-2">
//                 <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
//                   Gramin<span className="text-[#fed65b] italic">Vivah</span>
//                 </span>
//               </div>
//             </div>

//             {/* Value Proposition */}
//             <div className="mt-6 md:mt-0">
//               <div className="flex items-center gap-2 text-[#fed65b] mb-3 sm:mb-4">
//                 <span className="h-px w-8 bg-[#fed65b]" />
//                 <span className="font-bold text-[11px] sm:text-sm tracking-widest uppercase">
//                   Empowering Local Artists
//                 </span>
//               </div>

//               <h1 className="font-bold text-3xl sm:text-4xl lg:text-6xl text-white leading-[1.1] mb-4 sm:mb-6">
//                 Turn your talent into a{" "}
//                 <span className="text-[#fed65b]">legacy.</span>
//               </h1>

//               <p className="text-sm sm:text-base lg:text-xl text-white/90 max-w-lg mb-6 sm:mb-8 leading-relaxed font-light">
//                 Join India's premium platform connecting rural wedding artists
//                 with families who value tradition and excellence.
//               </p>

//               {/* Trust Indicators */}
//               <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
//                 <div className="flex items-center gap-2 sm:gap-3 py-2 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
//                   <span className="text-[#fed65b] text-lg">✓</span>
//                   <span className="text-white text-xs sm:text-sm font-medium">
//                     5,000+ Trusted Artists
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2 sm:gap-3 py-2 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
//                   <span className="text-[#fed65b] text-lg">★</span>
//                   <span className="text-white text-xs sm:text-sm font-medium">
//                     Verified Platform
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Right Side: Registration Form */}
//         <section className="w-full md:w-[55%] lg:w-[50%] bg-white flex items-start md:items-center justify-center px-5 sm:px-8 md:px-10 lg:px-16 py-6 md:py-8 flex-1 md:h-full overflow-y-auto">
//           <div className="w-full max-w-[80%] flex flex-col justify-start py-2">
//             {/* Back Link */}
//             <div className="mb-4 md:mb-2 md:pt-4">
//               <button
//                 onClick={() => navigate("/")}
//                 className="inline-flex items-center gap-2 text-[#4d4635] hover:text-[#b12b31] transition-colors font-bold text-xs sm:text-sm uppercase tracking-widest"
//               >
//                 ← Back to Home
//               </button>
//             </div>

//             {/* Heading */}
//             <div className="mb-4 md:mb-3">
//               <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c1b1c] mb-1 tracking-tight">
//                 Artist Registration
//               </h2>
//               <p className="text-[#4d4635] text-sm  font-medium">
//                 Create your professional profile to start receiving bookings
//                 today.
//               </p>
//             </div>

//             <form onSubmit={handleSubit} className="space-y-3 ">
//               {/* Upload Photo */}
//               <div className="flex flex-col items-center justify-center space-y-2 md:space-y-1">
//                 <div className="relative group">
//                   <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-24 md:h-24 rounded-full border-2 border-dashed border-[#e5e1da] bg-[#fcfaf6] flex items-center justify-center cursor-pointer hover:border-[#b12b31]/50 transition-all overflow-hidden">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="absolute inset-0 opacity-0 cursor-pointer z-10"
//                     />
//                     <div className="flex flex-col items-center text-[#4d4635] group-hover:text-[#b12b31] transition-colors">
//                       <span className="text-3xl">📷</span>
//                     </div>
//                   </div>

//                   <div className="absolute bottom-1 right-1 w-8 h-8 bg-[#b12b31] text-white rounded-full flex items-center justify-center shadow-lg text-lg font-bold">
//                     +
//                   </div>
//                 </div>

//                 <p className="text-[10px] sm:text-xs font-bold text-[#4d4635] uppercase tracking-wider">
//                   Upload Profile Photo
//                 </p>
//               </div>

//               {/* Full Name */}
//               <div className="space-y-1">
//                 <label className="block text-sm font-bold text-[#4d4635] ml-1">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   placeholder="Enter your legal name"
//                   className="w-full h-12 sm:h-12 bg-[#fcfaf6] rounded-xl border border-[#e5e1da] px-5 focus:outline-none focus:ring-2 focus:ring-[#b12b31]/10 text-[#1c1b1c] font-medium"
//                 />
//               </div>

//               {/* Mobile Number */}
//               <div className="space-y-1">
//                 <label className="block text-sm font-bold text-[#4d4635] ml-1">
//                   Mobile Number
//                 </label>
//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <div className="relative grow">
//                     <span className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 font-medium">
//                       +91
//                     </span>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       placeholder="00000 00000"
//                       className="w-full h-12 sm:h-12 bg-[#fcfaf6] rounded-xl border border-[#e5e1da] pl-14 pr-5 focus:outline-none"
//                     />
//                   </div>

//                   <button
//                     type="button"
//                     onClick={handleGetOTP}
//                     disabled={loading}
//                     className="px-6 h-12 sm:h-12 rounded-xl border-2 border-[#b12b31] text-[#b12b31] font-bold hover:bg-[#b12b31]/5 transition-all whitespace-nowrap text-sm"
//                   >
//                     {loading ? "Sending..." : "Get OTP"}
//                   </button>
//                 </div>
//               </div>

//               {/* ----- */}
//               {otpSent && (
//                 <div className="space-y-1">
//                   <label className="block text-sm font-bold text-[#4d4635] ml-1">
//                     Enter OTP
//                   </label>

//                   <input
//                     type="text"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     placeholder="Enter 6-digit OTP"
//                     className="w-full h-12 bg-[#fcfaf6] rounded-xl border border-[#e5e1da] px-5 focus:outline-none"
//                   />
//                 </div>
//               )}
//               {/* ----- */}

//               {/* Email */}
//               <div className="space-y-1">
//                 <label className="block text-sm font-bold text-[#4d4635] ml-1">
//                   Email
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#b12b31]">
//                     📍
//                   </span>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="test@gmail.com"
//                     className="w-full h-12 sm:h-12 bg-[#fcfaf6] rounded-xl border border-[#e5e1da] pl-12 pr-5 focus:outline-none"
//                   />
//                 </div>
//               </div>

//               {/* Service Category */}
//               <div className="space-y-1">
//                 <label className="block text-sm font-bold text-[#4d4635] ml-1">
//                   Service Category
//                 </label>

//                 <div className="grid grid-cols-2 gap-4">
//                   <label className="cursor-pointer">
//                     <input
//                       type="radio"
//                       name="service"
//                       className="sr-only"
//                       defaultChecked
//                     />
//                     <div className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border-2 border-[#b12b31] bg-[#fef2f2] transition-all">
//                       <div className="w-12 h-5 rounded-full bg-stone-100 flex items-center justify-center mb-3 text-lg">
//                         🎨
//                       </div>
//                       <span className="font-bold text-xs sm:text-sm text-center">
//                         Makeup Artist
//                       </span>
//                     </div>
//                   </label>

//                   <label className="cursor-pointer">
//                     <input type="radio" name="service" className="sr-only" />
//                     <div className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border-2 border-[#e5e1da] bg-white hover:border-[#b12b31]/30 transition-all">
//                       <div className="w-12 h-5 rounded-full bg-stone-100 flex items-center justify-center mb-3 text-lg">
//                         📸
//                       </div>
//                       <span className="font-bold text-xs sm:text-sm text-center">
//                         Photographer
//                       </span>
//                     </div>
//                   </label>
//                 </div>
//               </div>

//               {/* Submit */}
//               <div className="pt-2">
//                 <button
//                   type="submit"
//                   className="w-full h-14 sm:h-14 bg-[#b12b31] text-white rounded-2xl font-extrabold text-base sm:text-lg shadow-xl hover:bg-[#8c0c1b] transition-all flex items-center justify-center gap-3"
//                 >
//                   Complete Registration →
//                 </button>

//                 <p className="text-center text-[11px] sm:text-xs text-[#4d4635]/60 mt-4 sm:mt-5 px-2 sm:px-6">
//                   By clicking register, you agree to our{" "}
//                   <a href="#" className="underline font-semibold">
//                     Terms of Service
//                   </a>{" "}
//                   and{" "}
//                   <a href="#" className="underline font-semibold">
//                     Privacy Policy
//                   </a>
//                   .
//                 </p>
//               </div>
//             </form>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default ArtistRegistration;

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { COLLECTIONS, db } from "../../../Config/firebaseConfig";
import uploadToCloudinary from "../../../Utils/uploadToCloudinary";
import { useState } from "react";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  serviceCategory: "Makeup Artist" | "Photographer";
  profileImage: File | null;
}

const ArtistRegistration = () => {
  const navigate = useNavigate();

  const { loading, registerWithEmail } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    serviceCategory: "Makeup Artist",
    profileImage: null,
  });
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      profileImage: file,
    }));
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceChange = (value: "Makeup Artist" | "Photographer") => {
    setFormData((prev) => ({
      ...prev,
      serviceCategory: value,
    }));
  };

  /**
   * Basic Form Validation
   */
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      alert("Please enter full name");
      return false;
    }

    if (formData.fullName.trim().length < 3) {
      alert("Full name must be at least 3 characters");
      return false;
    }

    if (!formData.phone.trim()) {
      alert("Please enter mobile number");
      return false;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Please enter a valid 10-digit mobile number");
      return false;
    }

    if (!formData.email.trim()) {
      alert("Please enter email");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Please enter a valid email address");
      return false;
    }

    if (!formData.password.trim()) {
      alert("Please enter password");
      return false;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return false;
    }

    if (!formData.profileImage) {
      alert("Please upload profile photo");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;

    try {
      const response = await registerWithEmail(
        formData.email,
        formData.password,
      );

      if (!response.success || !response.user) {
        alert(response.message);
        return;
      }

      const uid = response.user.uid;

      let profileImageUrl = "";
      if (formData.profileImage) {
        profileImageUrl = await uploadToCloudinary(formData.profileImage);
      }

      // Save User Data to Firestore
      await setDoc(doc(db, COLLECTIONS.users, uid), {
        uid,
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        role: formData.serviceCategory,
        profileImage: profileImageUrl,
        createdAt: serverTimestamp(),
      });

      alert("Registration successful");

      navigate("/artist-dashboard");
    } catch (error) {
      console.log("Error in creating user : ", error);
    }
  };

  return (
    <div className="bg-white text-[#1c1b1c] min-h-screen overflow-hidden md:h-screen font-sans">
      <main className="min-h-screen md:h-full flex flex-col md:flex-row">
        {/* Left Side: Editorial Content */}
        <section className="relative w-full md:w-[45%] lg:w-[50%] min-h-80 md:h-full flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6iBUkiJ3yYQ5a6RwswbwE8TT1wcjCS9XF8-MHbE4FByE0tVRmmH_fMQqLoSgrZtQsYRnNIy42_I1nhzwm2q5P8MryyNsDAMCGskT6sO8N6GCXvPW7tldoDELsQI-do6tWYKDQWe9ox4zW6g0LIcM6P0UQLpRhqYgbK-dTsIvxUcVSgthHVpLZdUPD7xnG8wn-KFXF9Hm3UH_nzeDhydqOYiy-23C_XNRblIdXQNArO_V7QMGaik9bHEiLrA2Sna54x-F3tThURtnV"
              alt="Traditional Indian Artist"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-br from-black/60 via-black/30 to-[#b12b31]/40" />
          </div>

          <div className="relative z-10 p-6 sm:p-8 md:p-12 lg:p-20 flex flex-col h-full w-full justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Gramin<span className="text-[#fed65b] italic">Vivah</span>
                </span>
              </div>
            </div>

            <div className="mt-6 md:mt-0">
              <div className="flex items-center gap-2 text-[#fed65b] mb-3 sm:mb-4">
                <span className="h-px w-8 bg-[#fed65b]" />
                <span className="font-bold text-[11px] sm:text-sm tracking-widest uppercase">
                  Empowering Local Artists
                </span>
              </div>

              <h1 className="font-bold text-3xl sm:text-4xl lg:text-6xl text-white leading-[1.1] mb-4 sm:mb-6">
                Turn your talent into a{" "}
                <span className="text-[#fed65b]">legacy.</span>
              </h1>

              <p className="text-sm sm:text-base lg:text-xl text-white/90 max-w-lg mb-6 sm:mb-8 leading-relaxed font-light">
                Join India's premium platform connecting rural wedding artists
                with families who value tradition and excellence.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
                <div className="flex items-center gap-2 sm:gap-3 py-2 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="text-[#fed65b] text-lg">✓</span>
                  <span className="text-white text-xs sm:text-sm font-medium">
                    5,000+ Trusted Artists
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 py-2 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="text-[#fed65b] text-lg">★</span>
                  <span className="text-white text-xs sm:text-sm font-medium">
                    Verified Platform
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side */}
        <section className="w-full md:w-[55%] lg:w-[50%] bg-white flex items-start md:items-center justify-center px-5 sm:px-8 md:px-10 lg:px-16 py-6 md:py-8 flex-1 md:h-full overflow-y-auto">
          <div className="w-full max-w-[80%] flex flex-col justify-start py-2">
            {/* Back Link */}
            <div className="mb-4 md:mb-2 md:pt-4">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 text-[#4d4635] hover:text-[#b12b31] transition-colors font-bold text-xs sm:text-sm uppercase tracking-widest"
              >
                ← Back to Home
              </button>
            </div>

            {/* Heading */}
            <div className="mb-4 md:mb-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c1b1c] mb-1 tracking-tight">
                Artist Registration
              </h2>
              <p className="text-[#4d4635] text-sm font-medium">
                Create your professional profile to start receiving bookings
                today.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Upload Profile Photo */}
              <div className="flex flex-col items-center justify-center space-y-2 md:space-y-1">
                <div className="relative group">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-24 md:h-24 rounded-full border-2 border-dashed border-[#e5e1da] bg-[#fcfaf6] flex items-center justify-center cursor-pointer hover:border-[#b12b31]/50 transition-all overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile Preview"
                        className="w-full h-full object-cover rounded-full "
                      />
                    ) : (
                      <div className="flex flex-col items-center text-[#4d4635] group-hover:text-[#b12b31] transition-colors">
                        <span className="text-3xl">📷</span>
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-1 right-1 w-8 h-8 bg-[#b12b31] text-white rounded-full flex items-center justify-center shadow-lg text-lg font-bold">
                    +
                  </div>
                </div>

                <p className="text-[10px] sm:text-xs font-bold text-[#4d4635] uppercase tracking-wider">
                  Upload Profile Photo
                </p>
              </div>

              {/* Full Name + Email */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-[#4d4635] ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your legal name"
                    className="w-full h-12 bg-[#fcfaf6] rounded-xl border border-[#e5e1da] px-5 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-bold text-[#4d4635] ml-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="test@gmail.com"
                    className="w-full h-12 bg-[#fcfaf6] rounded-xl border border-[#e5e1da] px-5 focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone + Password */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-[#4d4635] ml-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 font-medium">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="00000 00000"
                      className="w-full h-12 bg-[#fcfaf6] rounded-xl border border-[#e5e1da] pl-14 pr-5 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-bold text-[#4d4635] ml-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full h-12 bg-[#fcfaf6] rounded-xl border border-[#e5e1da] px-5 focus:outline-none"
                  />
                </div>
              </div>

              {/* Service Category */}
              <div className="space-y-1">
                <label className="block text-sm font-bold text-[#4d4635] ml-1">
                  Service Category
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleServiceChange("Makeup Artist")}
                    className={`p-4 rounded-2xl border-2 font-bold transition-all ${
                      formData.serviceCategory === "Makeup Artist"
                        ? "border-[#b12b31] bg-[#fef2f2]"
                        : "border-[#e5e1da] bg-white"
                    }`}
                  >
                    🎨 Makeup Artist
                  </button>

                  <button
                    type="button"
                    onClick={() => handleServiceChange("Photographer")}
                    className={`p-4 rounded-2xl border-2 font-bold transition-all ${
                      formData.serviceCategory === "Photographer"
                        ? "border-[#b12b31] bg-[#fef2f2]"
                        : "border-[#e5e1da] bg-white"
                    }`}
                  >
                    📸 Photographer
                  </button>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-[#b12b31] text-white rounded-2xl font-extrabold text-base shadow-xl hover:bg-[#8c0c1b] transition-all"
                >
                  {loading ? "Creating Account..." : "Complete Registration →"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ArtistRegistration;

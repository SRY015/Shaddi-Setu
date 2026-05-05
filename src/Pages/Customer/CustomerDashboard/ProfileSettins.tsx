import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { COLLECTIONS, db } from "../../../Config/firebaseConfig";
import uploadToCloudinary from "../../../Utils/uploadToCloudinary";
import LocationPicker from "../../../Components/LocationPicker";
import { toast } from "react-toastify";
import { errorOpts, successOpts } from "../../../Config/toast";

interface UserProfile {
  uid?: string;
  fullName: string;
  email: string;
  phone: string;
  dob?: string;
  gender?: "Male" | "Female" | "Others";
  location?: string;
  language?: string;
  role?: string;
  profileImage?: string;
  whatsappUpdates?: boolean;
  emailAlerts?: boolean;
}

export default function ProfileSettings({
  userProfile,
}: {
  userProfile: UserProfile | null;
}) {
  const [saving, setSaving] = useState(false);
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const [profilePreview, setProfilePreview] = useState(
    userProfile?.profileImage || "",
  );

  const [formData, setFormData] = useState<UserProfile>({
    fullName: userProfile?.fullName || "",
    email: userProfile?.email || "",
    phone: userProfile?.phone || "",
    dob: userProfile?.dob || "",
    gender: userProfile?.gender || "Female",
    location: userProfile?.location || "",
    language: userProfile?.language || "English",
    whatsappUpdates: userProfile?.whatsappUpdates || false,
    emailAlerts: userProfile?.emailAlerts || false,
    profileImage: userProfile?.profileImage || "",
  });

  /**
   * For checking if anything changed
   */
  const [initialFormData, setInitialFormData] = useState<UserProfile>({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "Female",
    location: "",
    language: "English",
    whatsappUpdates: false,
    emailAlerts: false,
    profileImage: "",
  });

  useEffect(() => {
    if (userProfile) {
      const initialData = {
        fullName: userProfile.fullName || "",
        email: userProfile.email || "",
        phone: userProfile.phone || "",
        dob: userProfile.dob || "",
        gender: userProfile.gender || "Female",
        location: userProfile.location || "",
        language: userProfile.language || "English",
        whatsappUpdates: userProfile.whatsappUpdates || false,
        emailAlerts: userProfile.emailAlerts || false,
        profileImage: userProfile.profileImage || "",
      };

      setFormData(initialData);
      setInitialFormData(initialData);
      setProfilePreview(userProfile.profileImage || "");
      setProfilePic(null);
    }
  }, [userProfile]);

  /**
   * Detect form changes
   */
  const hasChanges =
    JSON.stringify(formData) !== JSON.stringify(initialFormData) ||
    profilePic !== null;

  /**
   * Basic validation
   */
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast("Full name is required", errorOpts);
      return false;
    }

    if (!formData.phone.trim()) {
      toast("Phone number is required", errorOpts);
      return false;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      toast("Phone number must be exactly 10 digits", errorOpts);
      return false;
    }

    if (!formData.location?.trim()) {
      toast("Location is required", errorOpts);
      return false;
    }

    return true;
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setProfilePic(file);

    const imageUrl = URL.createObjectURL(file);

    setProfilePreview(imageUrl);

    setFormData((prev) => ({
      ...prev,
      profileImage: imageUrl,
    }));
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!userProfile?.uid) {
        toast("User not found", errorOpts);
        return;
      }

      if (!hasChanges) {
        toast("No changes detected", errorOpts);
        return;
      }

      const isValid = validateForm();
      if (!isValid) return;

      setSaving(true);

      /**
       * Only upload if new profile pic selected
       */
      let profileImageUrl = formData.profileImage || "";

      if (profilePic) {
        profileImageUrl = await uploadToCloudinary(profilePic);
      }

      await updateDoc(doc(db, COLLECTIONS.customers, userProfile.uid), {
        fullName: formData.fullName,
        phone: formData.phone,
        dob: formData.dob || "",
        gender: formData.gender || "",
        location: formData.location || "",
        language: formData.language || "",
        whatsappUpdates: formData.whatsappUpdates || false,
        emailAlerts: formData.emailAlerts || false,
        profilePicture: profileImageUrl,
        updatedAt: new Date(),
      });

      await updateDoc(doc(db, COLLECTIONS.users, userProfile.uid), {
        fullName: formData.fullName,
        phone: formData.phone,
        profilePicture: profileImageUrl,
        updatedAt: new Date(),
      });

      toast("Profile changes saved successfully!", successOpts);

      /**
       * Reset initial values after successful save
       */
      const updatedData = {
        ...formData,
        profileImage: profileImageUrl,
      };

      setFormData(updatedData);
      setInitialFormData(updatedData);
      setProfilePreview(profileImageUrl);
      setProfilePic(null);
    } catch (error) {
      console.log(error);
      toast("Failed to update profile", errorOpts);
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    setFormData(initialFormData);
    setProfilePreview(initialFormData.profileImage || "");
    setProfilePic(null);
  };

  return (
    <div className="min-h-screen bg-[#fdf8f9] text-[#1c1b1c] font-sans pb-10">
      <main className="w-full px-4 sm:px-6 md:px-8 lg:px-0 py-8">
        <div className="max-w-full mx-auto space-y-8">
          {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-3 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
            <div className="lg:col-span-3 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <img
                    src={
                      profilePreview ||
                      "https://via.placeholder.com/300x300?text=Profile"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <label className="absolute bottom-1 right-2 bg-[#b12b31] text-white rounded-full p-2 shadow-md hover:scale-105 transition cursor-pointer">
                  ✎
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full text-sm font-semibold">
                ✓ Verified Profile
              </div>

              <h1 className="text-2xl md:text-4xl font-bold mt-4 leading-tight">
                {formData.fullName}
              </h1>

              <p className="text-gray-600 mt-1 max-w-2xl">
                {formData.location}
              </p>
            </div>
          </section>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Personal Info */}
            <div className="lg:col-span-3 bg-white rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
              <h3 className="text-xl font-bold">Personal Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {(
                  [
                    ["Full Name", "fullName", "text"],
                    ["Email Address", "email", "email"],
                    ["Date of Birth", "dob", "date"],
                  ] as [string, "fullName" | "email" | "dob", string][]
                ).map(([label, field, type]) => (
                  <div key={field}>
                    <label className="text-sm font-medium text-gray-600 block mb-2">
                      {label}
                    </label>

                    <input
                      type={type}
                      value={formData[field] || ""}
                      readOnly={field === "email"}
                      onChange={(e) =>
                        field !== "email" && handleChange(field, e.target.value)
                      }
                      className="w-full rounded-2xl bg-[#f7f2f3] p-4 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#b12b31]/20"
                    />
                  </div>
                ))}

                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-2">
                    Phone Number
                  </label>

                  <div className="flex gap-2">
                    <div className="px-4 flex items-center rounded-2xl bg-[#f7f2f3] border border-gray-100">
                      +91
                    </div>

                    <input
                      type="tel"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) =>
                        handleChange("phone", e.target.value.replace(/\D/g, ""))
                      }
                      className="flex-1 rounded-2xl bg-[#f7f2f3] p-4 border border-gray-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 block mb-2">
                    Gender
                  </label>

                  <select
                    value={formData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className="w-full rounded-2xl bg-[#f7f2f3] p-4 border border-gray-100 focus:outline-none"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                  </select>
                </div>

                <div className="mt-1.5">
                  <LocationPicker
                    setFormData={setFormData}
                    initialLocation={formData.location}
                    mode="input"
                    style="py-7 w-full rounded-2xl bg-[#f7f2f3] border border-gray-100 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold mb-6">Preferences</h3>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-3">
                    Preferred Language
                  </p>

                  <div className="space-y-3">
                    {["Hindi", "English"].map((lang) => (
                      <label
                        key={lang}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="language"
                          checked={formData.language === lang}
                          onChange={() => handleChange("language", lang)}
                        />
                        <span>{lang}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-3">
                    Notifications
                  </p>

                  <div className="space-y-4">
                    {(
                      [
                        ["WhatsApp Updates", "whatsappUpdates"],
                        ["Email Alerts", "emailAlerts"],
                      ] as [string, "whatsappUpdates" | "emailAlerts"][]
                    ).map(([label, field]) => (
                      <div
                        key={field}
                        className="flex items-center justify-between"
                      >
                        <span>{label}</span>

                        <input
                          type="checkbox"
                          checked={formData[field] || false}
                          onChange={(e) =>
                            handleChange(field, e.target.checked)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#f7f2f3] rounded-2xl text-sm text-gray-500 italic">
                Changes to preferences may take up to 24 hours to reflect across
                all services.
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              onClick={handleDiscard}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#ebd9dd] font-semibold hover:bg-gray-100 transition"
            >
              Discard Changes
            </button>

            <button
              onClick={handleSave}
              disabled={!hasChanges || saving}
              className={`w-full sm:w-auto px-10 py-4 rounded-2xl text-white font-bold shadow-md transition ${
                !hasChanges || saving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#b12b31] hover:opacity-90"
              }`}
            >
              {saving ? "Saving..." : "Save Profile Changes"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

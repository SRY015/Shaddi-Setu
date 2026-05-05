import { useMemo, useState } from "react";
import { FaRegIdBadge } from "react-icons/fa6";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { IoMdAdd, IoIosNotifications } from "react-icons/io";
import {
  MdEdit,
  MdHistoryEdu,
  MdSchedule,
  MdVerified,
  MdOutlinePublishedWithChanges,
} from "react-icons/md";
import LocationPicker from "../../../Components/LocationPicker";
import uploadToCloudinary from "../../../Utils/uploadToCloudinary";
import type { ArtistProfile, ServicePackage } from "../../../Types/artistTypes";
import { doc, updateDoc } from "firebase/firestore";
import { db, COLLECTIONS } from "../../../Config/firebaseConfig";
import ServicePackageModal from "../../../Components/Modals/ServicePackageModal";
import { toast } from "react-toastify";
import { errorOpts, successOpts, warningOpts } from "../../../Config/toast";

const defaultServiceHours = [
  {
    day: "Monday",
    morningStart: "09:00",
    morningEnd: "13:00",
    eveningStart: "16:00",
    eveningEnd: "21:00",
    isOff: false,
  },
  {
    day: "Tuesday",
    morningStart: "09:00",
    morningEnd: "13:00",
    eveningStart: "16:00",
    eveningEnd: "21:00",
    isOff: false,
  },
  {
    day: "Wednesday",
    morningStart: "09:00",
    morningEnd: "13:00",
    eveningStart: "16:00",
    eveningEnd: "21:00",
    isOff: false,
  },
  {
    day: "Thursday",
    morningStart: "09:00",
    morningEnd: "13:00",
    eveningStart: "16:00",
    eveningEnd: "21:00",
    isOff: false,
  },
  {
    day: "Friday",
    morningStart: "09:00",
    morningEnd: "13:00",
    eveningStart: "16:00",
    eveningEnd: "21:00",
    isOff: false,
  },
  {
    day: "Saturday",
    morningStart: "09:00",
    morningEnd: "13:00",
    eveningStart: "16:00",
    eveningEnd: "21:00",
    isOff: false,
  },
  {
    day: "Sunday",
    morningStart: "",
    morningEnd: "",
    eveningStart: "",
    eveningEnd: "",
    isOff: true,
  },
];

const PROFILE_FIELDS = [
  { key: "fullName", weight: 10 },
  { key: "email", weight: 10 },
  { key: "phone", weight: 10 },
  { key: "serviceType", weight: 10 },
  { key: "bio", weight: 10 },
  { key: "location", weight: 10 },
  { key: "profilePicture", weight: 10 },
  { key: "travelDistance", weight: 5 },
  { key: "offDays", weight: 5 },
  { key: "servicePackages", weight: 10 },
  { key: "serviceHours", weight: 10 },
];

const Profile = ({ userProfile }: { userProfile: ArtistProfile | null }) => {
  const [formData, setFormData] = useState<ArtistProfile>({
    fullName: userProfile?.fullName || "",
    email: userProfile?.email || "",
    phone: userProfile?.phone || "",
    serviceType: userProfile?.role || "",
    bio: userProfile?.bio || "",
    location: userProfile?.location || "",
    travelDistance: userProfile?.travelDistance || 5,
    offDays: userProfile?.offDays || ["SUN"],
    serviceHours: userProfile?.serviceHours?.length
      ? userProfile.serviceHours
      : defaultServiceHours,
    servicePackages: userProfile?.servicePackages || [],
    profilePicture: userProfile?.profilePicture || "",
    verified: false,
    profileCompletion: userProfile?.profileCompletion || 40,
  });

  const [saving, setSaving] = useState(false);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [initialData, setInitialData] = useState<ArtistProfile | null>(null);

  // modal states -->
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);

  const [packageForm, setPackageForm] = useState<ServicePackage>({
    id: "",
    title: "",
    price: 0,
    description: "",
  });

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast("Full name is required", warningOpts);
      return false;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      toast("Phone number must be 10 digits", warningOpts);
      return false;
    }

    // if (!formData.location.trim()) {
    //   alert("Location is required");
    //   return false;
    // }

    return true;
  };

  const handleChange = (field: keyof ArtistProfile, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfilePic(file);

    const previewUrl = URL.createObjectURL(file);
    setProfilePreview(previewUrl);
  };

  const getLowestPrice = (packages: any[]) => {
    if (!packages || packages.length === 0) return 0;

    return Math.min(...packages.map((pkg) => pkg.price));
  };

  const handleSave = async () => {
    try {
      if (!userProfile?.uid) return;

      const isValid = validateForm();
      if (!isValid) return;

      setSaving(true);

      let profileImageUrl = formData.profilePicture || "";

      if (profilePic) {
        profileImageUrl = await uploadToCloudinary(profilePic);
      }

      const startingPrice = getLowestPrice(formData.servicePackages || []);

      await updateDoc(doc(db, COLLECTIONS.artists, userProfile.uid), {
        ...formData,
        profilePicture: profileImageUrl,
        profileCompletion: profileCompletion,
        startingPrice,
        updatedAt: new Date(),
      });

      toast("Profile updated successfully", successOpts);

      setInitialData({
        ...formData,
        profilePicture: profileImageUrl,
      });

      setProfilePic(null);
    } catch (error) {
      console.log(error);
      toast("Failed to update profile", errorOpts);
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    if (!initialData) return;

    setFormData(initialData);
    setProfilePreview(initialData.profilePicture || "");
    setProfilePic(null);
  };

  const isFormChanged =
    JSON.stringify(formData) !== JSON.stringify(initialData) ||
    profilePic !== null;

  // add service package
  const handleAddPackage = () => {
    setEditingPackageId(null);

    setPackageForm({
      id: "",
      title: "",
      price: 0,
      description: "",
    });

    setShowPackageModal(true);
  };

  // edit service package
  const handleEditPackage = (pkg: ServicePackage) => {
    setEditingPackageId(pkg.id);
    setPackageForm(pkg);
    setShowPackageModal(true);
  };

  // remove service package
  const handleRemovePackage = (id: string) => {
    const updatedPackages =
      formData.servicePackages &&
      formData.servicePackages.filter((pkg) => pkg.id !== id);

    setFormData((prev) => ({
      ...prev,
      servicePackages: updatedPackages,
    }));
  };

  // service package validation
  const validatePackage = () => {
    if (!packageForm.title.trim()) {
      toast("Package title is required", warningOpts);
      return false;
    }

    if (packageForm.price <= 0) {
      toast("Price must be greater than 0", warningOpts);
      return false;
    }

    if (!packageForm.description.trim()) {
      toast("Description is required", warningOpts);
      return false;
    }

    return true;
  };

  // save service package
  const handleSavePackage = () => {
    const isValid = validatePackage();

    if (!isValid) return;

    if (formData.servicePackages === undefined) return;

    let updatedPackages = [...formData.servicePackages];

    if (editingPackageId) {
      updatedPackages = updatedPackages.map((pkg) =>
        pkg.id === editingPackageId ? packageForm : pkg,
      );
    } else {
      updatedPackages.push({
        ...packageForm,
        id: Date.now().toString(),
      });
    }

    setFormData((prev) => ({
      ...prev,
      servicePackages: updatedPackages,
    }));

    setShowPackageModal(false);
  };

  const handleToggleOffDay = (day: string) => {
    const currentOffDays = formData.offDays || [];

    const isRemoving = currentOffDays.includes(day);

    const updatedOffDays = isRemoving
      ? currentOffDays.filter((d) => d !== day)
      : [...currentOffDays, day];

    // Sync serviceHours
    const updatedServiceHours = (formData.serviceHours || []).map((item) => {
      if (item.day.toUpperCase().startsWith(day)) {
        return {
          ...item,
          isOff: !isRemoving,
        };
      }
      return item;
    });

    setFormData((prev) => ({
      ...prev,
      offDays: updatedOffDays,
      serviceHours: updatedServiceHours,
    }));
  };

  const handleServiceHourChange = (
    index: number,
    field: string,
    value: string | boolean,
  ) => {
    const updatedHours = [...(formData.serviceHours || [])];

    updatedHours[index] = {
      ...updatedHours[index],
      [field]: value,
    };

    // Sync offDays when isOff changes
    if (field === "isOff") {
      const dayShort = updatedHours[index].day.slice(0, 3).toUpperCase();

      let updatedOffDays = [...(formData.offDays || [])];

      if (value) {
        if (!updatedOffDays.includes(dayShort)) {
          updatedOffDays.push(dayShort);
        }
      } else {
        updatedOffDays = updatedOffDays.filter((d) => d !== dayShort);
      }

      setFormData((prev) => ({
        ...prev,
        serviceHours: updatedHours,
        offDays: updatedOffDays,
      }));

      return;
    }

    handleChange("serviceHours", updatedHours);
  };

  const calculateProfileCompletion = (data: ArtistProfile) => {
    let total = 0;

    PROFILE_FIELDS.forEach(({ key, weight }) => {
      const value = data[key as keyof ArtistProfile];

      if (key === "servicePackages") {
        if (Array.isArray(value) && value.length > 0) total += weight;
      } else if (key === "offDays") {
        if (Array.isArray(value)) total += weight;
      } else if (key === "serviceHours") {
        if (Array.isArray(value) && value.some((d: any) => !d.isOff)) {
          total += weight;
        }
      } else if (typeof value === "string") {
        if (value.trim() !== "") total += weight;
      } else if (typeof value === "number") {
        if (value > 0) total += weight;
      }
    });

    return total;
  };

  const profileCompletion = useMemo(() => {
    return calculateProfileCompletion(formData);
  }, [formData]);
  return (
    <div className="w-full min-h-screen bg-[#fdf8f9] text-[#1c1b1c] pb-0">
      {/* Top Header */}
      <header className="sticky top-0 z-30 w-full px-4 sm:px-6 md:px-8 h-auto min-h-18 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-[#fdf8f9]/90 backdrop-blur-md shadow-[0_10px_30px_-15px_rgba(177,43,49,0.15)]">
        <div>
          <h2 className="text-lg sm:text-xl font-bold">
            My Professional Profile
          </h2>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-bold text-[#b12b31] uppercase tracking-wider">
              Profile Completeness
            </span>
            <div className="flex items-center gap-2">
              <div className="w-28 sm:w-32 h-1.5 bg-[#f1edee] rounded-full overflow-hidden">
                <div
                  style={{ width: `${profileCompletion}%` }}
                  className="h-full bg-[#b12b31] transition-all duration-500"
                />
              </div>

              <span className="text-xs font-bold">{profileCompletion}%</span>
            </div>
            {profileCompletion < 100 && (
              <p className="text-[10px] text-gray-500 mt-1">
                Complete your profile to get more visibility
              </p>
            )}
          </div>

          <button className="p-2 text-gray-600">
            <span className="material-symbols-outlined">
              <IoIosNotifications />
            </span>
          </button>
        </div>
      </header>

      <div className="max-w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-0 py-6 sm:py-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8 items-start">
          {/* Left Side */}
          <div className="space-y-6 md:space-y-8">
            {/* Profile picture update */}
            <section className="bg-white rounded-2xl p-5 sm:p-6 border border-[#ece7e8] shadow-sm">
              <div className="lg:col-span-3 flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={
                        profilePreview ||
                        formData?.profilePicture ||
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
                <div className="flex flex-col space-y-3 pt-3">
                  <div>
                    <p>{formData?.fullName}</p>
                    <p>{formData?.serviceType}</p>
                  </div>
                  <div className="flex items-center space-x-2 bg-amber-500 py-1 px-3 rounded-2xl text-sm font-bold">
                    <MdVerified />
                    Verified Artist
                  </div>
                </div>
              </div>
            </section>
            {/* Service Area */}
            <section className="bg-white rounded-2xl p-5 sm:p-6 border border-[#ece7e8] shadow-sm">
              <h3 className="text-lg font-bold mb-6">Service Area</h3>
              <div className="space-y-6">
                <LocationPicker
                  setFormData={setFormData}
                  initialLocation={formData.location}
                  mode="both"
                  label="Studio location"
                  range={formData?.travelDistance}
                />
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold text-gray-500">
                    Travel Distance Range
                  </label>
                  <span className="text-lg font-bold text-[#b12b31]">
                    {formData.travelDistance || 50} KM
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="500"
                  value={formData.travelDistance || 50}
                  onChange={(e) =>
                    handleChange("travelDistance", Number(e.target.value))
                  }
                  className="w-full accent-[#b12b31]"
                />

                <div>
                  <label className="text-xs font-bold text-gray-500 block mb-4">
                    Off Days
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
                      (day, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleToggleOffDay(day)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border ${
                            (formData.offDays || []).includes(day)
                              ? "border-[#b12b31] text-[#b12b31]"
                              : "border-gray-200 text-gray-500"
                          }`}
                        >
                          {day}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </section>
            {/* service packages */}
            <section className="bg-white rounded-2xl p-5 sm:p-6 border border-[#ece7e8] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Service Packages</h3>
                <button
                  onClick={handleAddPackage}
                  className="w-8 h-8 rounded-full bg-[#b12b31] text-white flex items-center justify-center cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">
                    <IoMdAdd />
                  </span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.servicePackages &&
                formData.servicePackages.length !== 0 ? (
                  formData.servicePackages.map((item) => (
                    <div key={item.id} className="p-4 rounded-xl bg-[#f7f2f3]">
                      <div className="flex justify-between gap-3 mb-2">
                        <span className="font-bold text-sm">{item.title}</span>

                        <span className="text-[#b12b31] font-bold">
                          ₹{item.price}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 mb-3">
                        {item.description}
                      </p>

                      <div className="flex justify-end gap-3 text-[14px] font-bold uppercase">
                        <button
                          onClick={() => handleEditPackage(item)}
                          className="cursor-pointer"
                        >
                          <FaRegEdit />
                        </button>

                        <button
                          onClick={() => handleRemovePackage(item.id)}
                          className="cursor-pointer"
                        >
                          <FaRegTrashAlt />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center w-full text-slate-400">
                    You have not added any service package yet!! Please add you
                    service packages
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Right Side */}
          <div className="xl:col-span-2 space-y-6 md:space-y-8">
            {/* Personal Info */}
            <section className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0_10px_30px_-10px_rgba(177,43,49,0.15)]">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
                <h3 className="text-lg sm:text-xl font-bold flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#ffdad7] flex items-center justify-center text-[#b12b31]">
                    <span className="material-symbols-outlined text-xl">
                      <FaRegIdBadge />
                    </span>
                  </span>
                  Personal Information
                </h3>

                <button className="text-[#b12b31] text-sm font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    <MdEdit />
                  </span>
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {(
                  [
                    ["Full Name", "fullName", "text"],
                    ["Service Type", "serviceType", "text"],
                    ["Phone Number", "phone", "text"],
                  ] as [string, "fullName" | "serviceType" | "phone", string][]
                ).map(([label, field, type]) => (
                  <div key={label} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 px-1">
                      {label}
                    </label>
                    <input
                      type={type}
                      value={formData[field] || ""}
                      readOnly={field === "serviceType"}
                      onChange={(e) =>
                        field !== "serviceType" &&
                        handleChange(field, e.target.value)
                      }
                      className="w-full bg-[#f7f2f3] rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#b12b31]/20"
                    />
                  </div>
                ))}

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 px-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    readOnly
                    className="w-full bg-[#f7f2f3] rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#b12b31]/20"
                  />
                </div>
              </div>
            </section>

            {/* Professional Bio */}
            <section className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0_10px_30px_-10px_rgba(177,43,49,0.15)]">
              <h3 className="text-lg sm:text-xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#ffdad7] flex items-center justify-center text-[#b12b31]">
                  <span className="material-symbols-outlined text-xl">
                    <MdHistoryEdu />
                  </span>
                </span>
                Professional Bio
              </h3>

              <textarea
                rows={6}
                value={formData?.bio || ""}
                onChange={(e) => handleChange("bio", e.target.value)}
                placeholder="Please enter your bio"
                className="w-full bg-[#f7f2f3] rounded-xl px-4 py-4 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#b12b31]/20"
              />
            </section>

            {/* Service Hours */}
            <section className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0_10px_30px_-10px_rgba(177,43,49,0.15)]">
              <h3 className="text-lg sm:text-xl font-bold mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#ffdad7] flex items-center justify-center text-[#b12b31]">
                  <span className="material-symbols-outlined text-xl">
                    <MdSchedule />
                  </span>
                </span>
                Service Hours
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full min-w-175 border-separate border-spacing-y-3">
                  <thead>
                    <tr className="text-left text-[10px] uppercase text-gray-400 font-bold">
                      <th>Day</th>
                      <th>Morning Shift</th>
                      <th>Evening Shift</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.serviceHours?.map((item, index) => (
                      <tr key={item.day}>
                        <td className="bg-[#f7f2f3] rounded-l-xl px-4 py-4 font-bold">
                          {item.day}
                        </td>

                        {item.isOff ? (
                          <>
                            <td
                              colSpan={2}
                              className="bg-[#f7f2f3] px-4 py-4 text-center italic text-sm text-gray-400"
                            >
                              Artist is Closed
                            </td>

                            <td className="bg-[#f7f2f3] rounded-r-xl px-4 py-4 text-center">
                              <button
                                onClick={() =>
                                  handleServiceHourChange(index, "isOff", false)
                                }
                                className="text-[#b12b31] font-bold"
                              >
                                Mark Active
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="bg-[#f7f2f3] px-4 py-4">
                              <input
                                type="time"
                                value={item.morningStart}
                                onChange={(e) =>
                                  handleServiceHourChange(
                                    index,
                                    "morningStart",
                                    e.target.value,
                                  )
                                }
                              />
                            </td>

                            <td className="bg-[#f7f2f3] px-4 py-4">
                              <input
                                type="time"
                                value={item.eveningStart}
                                onChange={(e) =>
                                  handleServiceHourChange(
                                    index,
                                    "eveningStart",
                                    e.target.value,
                                  )
                                }
                              />
                            </td>

                            <td className="bg-[#f7f2f3] rounded-r-xl px-4 py-4 text-center">
                              <button
                                onClick={() =>
                                  handleServiceHourChange(index, "isOff", true)
                                }
                                className="text-gray-500"
                              >
                                Mark Off
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mt-10 sm:mt-12 flex flex-col lg:flex-row items-center justify-between gap-6 p-5 sm:p-6 md:p-8 bg-[#e6e1e2]/50 rounded-2xl border border-white">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700">
              <span className="material-symbols-outlined">
                <MdOutlinePublishedWithChanges />
              </span>
            </div>
            <div>
              <p className="font-bold">Last synced 2 hours ago</p>
              <p className="text-xs text-gray-500">
                Changes will be visible to potential clients immediately.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
            <button
              onClick={handleDiscard}
              className="flex-1 px-6 py-3 font-bold text-gray-600 cursor-pointer"
            >
              Discard Changes
            </button>
            <button
              onClick={handleSave}
              disabled={!isFormChanged || saving}
              className="flex-1 px-8 py-3 bg-[#b12b31] hover:bg-[#9a3338] text-white font-bold rounded-xl shadow-[0_10px_30px_-10px_rgba(177,43,49,0.15)] cursor-pointer"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
      {showPackageModal && (
        <ServicePackageModal
          editingPackageId={editingPackageId}
          packageForm={packageForm}
          setPackageForm={setPackageForm}
          handleSavePackage={handleSavePackage}
          setShowPackageModal={setShowPackageModal}
        />
      )}
    </div>
  );
};

export default Profile;

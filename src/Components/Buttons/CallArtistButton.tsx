import React from "react";
import { MdCall } from "react-icons/md";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/AuthContext";
import { errorOpts } from "../../Config/toast";

interface CallButtonProps {
  phone: string;
  name?: string;
  className: string;
  label?: string;
}

const CallButton: React.FC<CallButtonProps> = ({
  phone,
  name,
  className = "",
  label = "",
}) => {
  const { user } = useAuth();

  const handleCall = () => {
    if (!user) {
      toast("Please login to contact the artist", errorOpts);
      return;
    }
    if (!phone) {
      toast.error("Phone number not available", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    // Clean phone number (remove spaces, symbols)
    const cleanedPhone = phone.replace(/\D/g, "");

    if (!cleanedPhone) {
      toast.error("Invalid phone number", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    // Optional UX improvement
    toast.info(`Calling ${name || "artist"}...`, {
      position: "top-right",
      autoClose: 1000,
    });

    window.location.href = `tel:${cleanedPhone}`;
  };

  return (
    <button
      onClick={handleCall}
      title={`Call ${name || "artist"}`}
      className={`${className}`}
    >
      <MdCall className="text-xl" />
      {label}
    </button>
  );
};

export default CallButton;

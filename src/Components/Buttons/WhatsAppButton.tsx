import React from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/AuthContext";
import { errorOpts } from "../../Config/toast";

interface WhatsAppButtonProps {
  phone: string;
  name?: string;
  message?: string;
  className: string;
  label?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phone,
  name,
  message,
  className = "",
  label = "",
}) => {
  const { user } = useAuth();

  const handleWhatsApp = () => {
    if (!user) {
      toast("Please login to chat with the artist", errorOpts);
      return;
    }
    if (!phone) {
      toast.error("Phone number not available", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    // Clean phone number (remove non-digits)
    const cleanedPhone = phone.replace(/\D/g, "");

    if (!cleanedPhone) {
      toast.error("Invalid phone number", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    // Default message if not provided
    const defaultMessage = `Hi ${
      name || ""
    }, I found you on Gramin Vivah and would like to know more about your services.`;

    const finalMessage = encodeURIComponent(message || defaultMessage);

    // Optional UX feedback
    toast.info(`Opening WhatsApp chat with ${name || "artist"}...`, {
      position: "top-right",
      autoClose: 1200,
    });

    window.open(`https://wa.me/${cleanedPhone}?text=${finalMessage}`, "_blank");
  };

  return (
    <button
      onClick={handleWhatsApp}
      disabled={!phone}
      title={`Chat with ${name || "artist"} on WhatsApp`}
      className={`${className}`}
    >
      <FaWhatsapp className="text-lg" />
      {label}
    </button>
  );
};

export default WhatsAppButton;

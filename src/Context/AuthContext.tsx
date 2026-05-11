import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

import type { ConfirmationResult, User, UserCredential } from "firebase/auth";

import { auth, COLLECTIONS, db } from "../Config/firebaseConfig";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import type { ArtistProfile } from "../Types/artistTypes";

interface AuthContextType {
  /**
   * -----------------------------
   * COMMON STATE
   * -----------------------------
   */
  loading: boolean;
  user: User | null;
  userProfile: UserProfile | null;

  /**
   * -----------------------------
   * PHONE AUTH STATE
   * -----------------------------
   */
  phoneNumber: string;
  otpSent: boolean;

  /**
   * -----------------------------
   * PHONE AUTH METHODS
   * -----------------------------
   */
  sendOTP: (number: string) => Promise<{
    success: boolean;
    message: string;
  }>;

  verifyOTP: (otp: string) => Promise<{
    success: boolean;
    message: string;
    user?: User;
  }>;

  /**
   * -----------------------------
   * GOOGLE AUTH
   * -----------------------------
   */
  loginWithGoogle: () => Promise<{
    success: boolean;
    message: string;
    user?: User;
  }>;

  /**
   * -----------------------------
   * FACEBOOK AUTH
   * -----------------------------
   */
  loginWithFacebook: () => Promise<{
    success: boolean;
    message: string;
    user?: User;
  }>;

  /**
   * -----------------------------
   * EMAIL/PASSWORD AUTH
   * -----------------------------
   */
  registerWithEmail: (
    email: string,
    password: string,
  ) => Promise<{
    success: boolean;
    message: string;
    user?: User;
  }>;

  loginWithEmail: (
    email: string,
    password: string,
  ) => Promise<{
    success: boolean;
    message: string;
    user?: User;
  }>;

  // resetPassword --->
  resetPassword: (
    email: string,
  ) => Promise<
    | { success: boolean; message?: undefined }
    | { success: boolean; message: any }
  >;

  /**
   * -----------------------------
   * COMMON LOGOUT
   * -----------------------------
   */
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface UserProfile extends Omit<ArtistProfile, "role" | "profilePicture"> {
  role: string;
  profilePicture: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  /**
   * -----------------------------
   * COMMON STATES
   * -----------------------------
   */
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  /**
   * -----------------------------
   * PHONE AUTH STATES
   * -----------------------------
   */
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  /**
   * -----------------------------
   * PHONE AUTH → Setup reCAPTCHA
   * -----------------------------
   */
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA verified");
          },
        },
      );
    }
  };

  /**
   * -----------------------------
   * PHONE AUTH → Send OTP
   * -----------------------------
   */
  const sendOTP = async (number: string) => {
    try {
      setLoading(true);

      setupRecaptcha();

      const appVerifier = window.recaptchaVerifier;

      const result = await signInWithPhoneNumber(auth, number, appVerifier);

      setConfirmationResult(result);
      setOtpSent(true);
      setPhoneNumber(number);

      return {
        success: true,
        message: "OTP sent successfully",
      };
    } catch (error: any) {
      console.error(error);

      return {
        success: false,
        message: error.message || "Failed to send OTP",
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * -----------------------------
   * PHONE AUTH → Verify OTP
   * -----------------------------
   */
  const verifyOTP = async (otp: string) => {
    try {
      if (!confirmationResult) {
        return {
          success: false,
          message: "Please request OTP first",
        };
      }

      setLoading(true);

      const result = await confirmationResult.confirm(otp);

      setUser(result.user);

      return {
        success: true,
        message: "Phone authentication successful",
        user: result.user,
      };
    } catch (error) {
      console.error(error);

      return {
        success: false,
        message: "Invalid OTP",
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * -----------------------------
   * GOOGLE AUTH → Login
   * -----------------------------
   */
  const loginWithGoogle = async () => {
    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();

      const result: UserCredential = await signInWithPopup(auth, provider);

      setUser(result.user);

      return {
        success: true,
        message: "Google login successful",
        user: result.user,
      };
    } catch (error: any) {
      console.error(error);

      return {
        success: false,
        message: error.message || "Google login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * -----------------------------
   * FACEBOOK AUTH → Login
   * -----------------------------
   */
  const loginWithFacebook = async () => {
    try {
      setLoading(true);

      const provider = new FacebookAuthProvider();

      const result: UserCredential = await signInWithPopup(auth, provider);

      setUser(result.user);

      return {
        success: true,
        message: "Facebook login successful",
        user: result.user,
      };
    } catch (error: any) {
      console.error(error);

      return {
        success: false,
        message: error.message || "Facebook login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * -----------------------------
   * EMAIL/PASSWORD → Register
   * -----------------------------
   */
  const registerWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);

      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      setUser(result.user);

      return {
        success: true,
        message: "Registration successful",
        user: result.user,
      };
    } catch (error: any) {
      console.error(error);

      return {
        success: false,
        message: error.message || "Email registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * -----------------------------
   * EMAIL/PASSWORD → Login
   * -----------------------------
   */
  const loginWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);

      const result = await signInWithEmailAndPassword(auth, email, password);

      setUser(result.user);

      return {
        success: true,
        message: "Login successful",
        user: result.user,
      };
    } catch (error: any) {
      console.error(error);

      return {
        success: false,
        message: error.message || "Email login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * -----------------------------
   * COMMON LOGOUT
   * -----------------------------
   */
  const logout = async () => {
    await signOut(auth);

    setUser(null);
    setUserProfile(null);

    setPhoneNumber("");
    setOtpSent(false);
    setConfirmationResult(null);
  };

  console.log({ user });

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // First, get the role from users collection
        try {
          const userRef = doc(db, COLLECTIONS.users, currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            const role = userData.role;

            let profileCollection = "";
            if (role === "customer") {
              profileCollection = COLLECTIONS.customers;
            } else if (role === "photographer" || role === "makeupArtist") {
              profileCollection = COLLECTIONS.artists;
            }

            if (profileCollection) {
              // Now listen to the profile collection
              const profileRef = doc(db, profileCollection, currentUser.uid);
              unsubscribeProfile = onSnapshot(
                profileRef,
                (snapshot) => {
                  if (snapshot.exists()) {
                    setUserProfile(snapshot.data() as UserProfile);
                  } else {
                    console.warn(
                      "User profile not found in",
                      profileCollection,
                    );
                    setUserProfile(null);
                  }
                },
                (error) => {
                  console.error("Error in profile listener:", error);
                },
              );
            } else {
              setUserProfile(null);
            }
          } else {
            console.warn("User not found in users collection");
            setUserProfile(null);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setUserProfile(null);
        }
      } else {
        setUser(null);
        setUserProfile(null);

        // cleanup if user logs out
        if (unsubscribeProfile) {
          unsubscribeProfile();
          unsubscribeProfile = null;
        }
      }

      setInitialLoading(false);
    });

    return () => {
      unsubscribeAuth();

      // cleanup on unmount
      if (unsubscribeProfile) {
        unsubscribeProfile();
      }
    };
  }, []);

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: "http://localhost:5173/user-login",
        handleCodeInApp: true,
      });

      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  };

  if (initialLoading) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center">
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border-4 border-[#f0d6d8]" />
          <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-[#b12b31] border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        userProfile,
        // Phone Auth
        phoneNumber,
        otpSent,
        sendOTP,
        verifyOTP,

        // Google Auth
        loginWithGoogle,

        // Facebook Auth
        loginWithFacebook,

        // Email/Password Auth
        registerWithEmail,
        loginWithEmail,
        resetPassword,

        // Common
        logout,
      }}
    >
      {children}

      {/* Required for Firebase Phone Auth */}
      <div id="recaptcha-container"></div>
    </AuthContext.Provider>
  );
};

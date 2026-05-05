import type { FieldValue } from "firebase/firestore";

export interface User {
  uid?: string;
  fullName: string;
  email: string;
  phone: string;
  role: "customer" | "photographer" | "makeup artist";
  profilePicture: string;
  createdAt?: FieldValue;
}

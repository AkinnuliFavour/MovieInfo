import { AuthError } from "@supabase/supabase-js";

/**
 * Maps Supabase auth errors to user-friendly messages
 */
export const getAuthErrorMessage = (error: AuthError | null): string => {
  if (!error) return "";

  switch (error.message) {
    case "Invalid login credentials":
      return "Invalid email or password. Please try again.";
    case "Email not confirmed":
      return "Please verify your email address before signing in.";
    case "User already registered":
      return "An account with this email already exists.";
    case "Password should be at least 6 characters":
      return "Password must be at least 6 characters long.";
    case "Unable to validate email address: invalid format":
      return "Please enter a valid email address.";
    case "Signups not allowed for this instance":
      return "Sign up is currently disabled. Please contact support.";
    case "Email rate limit exceeded":
      return "Too many attempts. Please try again later.";
    default:
      return error.message || "An error occurred. Please try again.";
  }
};

/**
 * Validates email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates password strength
 */
export const isValidPassword = (
  password: string
): { valid: boolean; message: string } => {
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters" };
  }
  if (password.length > 72) {
    return {
      valid: false,
      message: "Password must be less than 72 characters",
    };
  }
  return { valid: true, message: "" };
};

/**
 * Gets user initials from email
 */
export const getUserInitials = (email: string | undefined): string => {
  if (!email) return "?";
  return email.charAt(0).toUpperCase();
};

/**
 * Formats user display name from email
 */
export const getDisplayName = (email: string | undefined): string => {
  if (!email) return "User";
  return email.split("@")[0];
};

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, UserPlus, AlertCircle, CheckCircle } from "lucide-react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useAuth } from "../../contexts/AuthContext";
import {
  getAuthErrorMessage,
  isValidEmail,
  isValidPassword,
} from "../../lib/auth";

const Signup = () => {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.message);
      return;
    }

    setLoading(true);

    const { error: signUpError } = await signUp(email, password);

    setLoading(false);

    if (signUpError) {
      setError(getAuthErrorMessage(signUpError));
    } else {
      setSuccess(
        "Account created! Please check your email to verify your account."
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    const { error: googleError } = await signInWithGoogle();
    if (googleError) {
      setError(getAuthErrorMessage(googleError));
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-background to-background z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop')] bg-cover bg-center opacity-20 blur-sm" />
      </div>

      <div className="relative z-20 w-full max-w-md px-6">
        <div className="glass p-8 rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 text-glow">
              Create Account
            </h1>
            <p className="text-gray-400">
              Join the community of movie enthusiasts
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-400">{success}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="h-4 w-4" />}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Create a password (min 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="h-4 w-4" />}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full shadow-glow"
              size="lg"
              isLoading={loading}
              icon={<UserPlus className="h-4 w-4" />}
            >
              Sign Up
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#0a0a0a] text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign up with Google
            </Button>

            <p className="text-center text-sm text-gray-400 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;

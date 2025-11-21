# Supabase Auth - Quick Reference

## 🔐 Authentication Methods

### Sign Up (Email/Password)

```typescript
const { signUp } = useAuth();
const { error } = await signUp(email, password);
```

### Sign In (Email/Password)

```typescript
const { signIn } = useAuth();
const { error } = await signIn(email, password);
```

### Sign In with Google

```typescript
const { signInWithGoogle } = useAuth();
const { error } = await signInWithGoogle();
```

### Sign Out

```typescript
const { signOut } = useAuth();
await signOut();
```

### Get Current User

```typescript
const { user, session, loading } = useAuth();
```

---

## 🛡️ Route Protection

### Protect a Route

```typescript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

### Public Only Route (redirect if authenticated)

```typescript
<Route
  path="/login"
  element={
    <PublicOnlyRoute>
      <Login />
    </PublicOnlyRoute>
  }
/>
```

---

## 💬 Toast Notifications

```typescript
import { useToast } from "../contexts/ToastContext";

const { showToast } = useToast();

// Success
showToast("Login successful!", "success");

// Error
showToast("Invalid credentials", "error");

// Info
showToast("Check your email", "info");

// Custom duration (ms)
showToast("Message", "success", 3000);
```

---

## 👤 User Data

### Get User Email

```typescript
const { user } = useAuth();
console.log(user?.email);
```

### Get User ID

```typescript
const { user } = useAuth();
console.log(user?.id);
```

### Get User Metadata

```typescript
const { user } = useAuth();
console.log(user?.user_metadata);
```

### Get Access Token

```typescript
const { session } = useAuth();
console.log(session?.access_token);
```

---

## 🎨 Helper Functions

### Get User Initials

```typescript
import { getUserInitials } from "../lib/auth";
const initials = getUserInitials(user?.email);
// Returns: "J" for "john@example.com"
```

### Get Display Name

```typescript
import { getDisplayName } from "../lib/auth";
const name = getDisplayName(user?.email);
// Returns: "john" for "john@example.com"
```

### Validate Email

```typescript
import { isValidEmail } from "../lib/auth";
const valid = isValidEmail("test@example.com");
// Returns: true or false
```

### Validate Password

```typescript
import { isValidPassword } from "../lib/auth";
const result = isValidPassword("mypassword");
// Returns: { valid: boolean, message: string }
```

### Format Auth Errors

```typescript
import { getAuthErrorMessage } from "../lib/auth";
const message = getAuthErrorMessage(error);
// Returns user-friendly error message
```

---

## 🔄 Direct Supabase Access

When you need more control:

```typescript
import { supabase } from "../lib/supabase";

// Get session
const {
  data: { session },
} = await supabase.auth.getSession();

// Get user
const {
  data: { user },
} = await supabase.auth.getUser();

// Update user metadata
await supabase.auth.updateUser({
  data: { display_name: "John Doe" },
});

// Reset password
await supabase.auth.resetPasswordForEmail(email);

// Listen to auth changes
supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session);
});
```

---

## 🎯 Common Patterns

### Conditional Rendering Based on Auth

```typescript
const { user, loading } = useAuth();

if (loading) return <Spinner />;

return user ? <Dashboard /> : <Login />;
```

### Redirect After Action

```typescript
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();
const { signIn } = useAuth();

const handleLogin = async () => {
  const { error } = await signIn(email, password);
  if (!error) {
    navigate("/dashboard");
  }
};
```

### Check Auth Before API Call

```typescript
const { user } = useAuth();

const fetchData = async () => {
  if (!user) {
    console.error("Not authenticated");
    return;
  }

  // Make API call
  const response = await fetch("/api/data");
};
```

---

## 🚨 Error Handling

```typescript
const { signIn } = useAuth();

try {
  const { error } = await signIn(email, password);

  if (error) {
    // Handle specific error
    if (error.message === "Invalid login credentials") {
      showToast("Wrong email or password", "error");
    }
  } else {
    // Success
    showToast("Welcome back!", "success");
  }
} catch (err) {
  // Network error or unexpected error
  showToast("Something went wrong", "error");
}
```

---

## 📱 User Profile Component Example

```typescript
import { useAuth } from '../contexts/AuthContext';
import { getUserInitials, getDisplayName } from '../lib/auth';

function UserProfile() {
  const { user, signOut } = useAuth();

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
        {getUserInitials(user?.email)}
      </div>
      <div>
        <p className="font-medium">{getDisplayName(user?.email)}</p>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>
      <button onClick={signOut}>Logout</button>
    </div>
  );
}
```

---

## 🔔 Loading States

```typescript
const { signIn } = useAuth();
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    await signIn(email, password);
  } finally {
    setLoading(false);
  }
};

return (
  <button disabled={loading}>
    {loading ? 'Loading...' : 'Sign In'}
  </button>
);
```

---

## 🎨 Custom Auth UI

```typescript
function CustomAuthButton() {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="btn-google"
    >
      {loading ? 'Loading...' : 'Continue with Google'}
    </button>
  );
}
```

---

## 🎁 Bonus: TypeScript Types

```typescript
import { User, Session } from "@supabase/supabase-js";

// User type
const user: User | null = useAuth().user;

// Session type
const session: Session | null = useAuth().session;

// Custom user type with metadata
interface CustomUser extends User {
  user_metadata: {
    display_name?: string;
    avatar_url?: string;
  };
}
```

# 🔄 Migration Guide: From Custom Backend to Supabase

## Overview

This guide explains what changed when migrating from your custom backend authentication to Supabase.

---

## 🔀 What Changed

### Before (Custom Backend)

```typescript
// Old SignUp
const mutation = useMutation({
  mutationFn: (data) => axios.post("http://localhost:3500/users", data),
  onSuccess: (data) => console.log("User Created successfully:", data),
  onError: (error) => console.error("Error creating user:", error),
});
```

### After (Supabase)

```typescript
// New SignUp
const { signUp } = useAuth();
const { error } = await signUp(email, password);
if (error) {
  // Handle error
} else {
  // Success
}
```

---

## 🗑️ What Was Removed

### Dependencies

- ❌ Custom backend server (localhost:3500)
- ❌ Axios authentication calls
- ❌ Manual cookie/credential handling
- ❌ React Query mutations for auth

### Code

- ❌ `axios.post("http://localhost:3500/auth", ...)`
- ❌ `axios.post("http://localhost:3500/users", ...)`
- ❌ Manual credential config
- ❌ Direct navigation after mutation success

---

## ✅ What Was Added

### New Files

1. **`src/lib/supabase.ts`** - Supabase client
2. **`src/contexts/AuthContext.tsx`** - Global auth state
3. **`src/contexts/ToastContext.tsx`** - Notifications
4. **`src/lib/auth.ts`** - Auth utilities
5. **`src/components/ProtectedRoute.tsx`** - Route guards
6. **`src/components/PublicOnlyRoute.tsx`** - Public routes
7. **`src/components/ui/Toast.tsx`** - Toast UI

### Updated Files

1. **`Login.tsx`** - Uses Supabase auth
2. **`SignUp.tsx`** - Uses Supabase auth
3. **`App.tsx`** - Auth providers & protected routes
4. **`TopBar.tsx`** - User profile & logout
5. **`index.css`** - Animations

---

## 🔐 Authentication Comparison

| Feature            | Old (Backend)   | New (Supabase)                       |
| ------------------ | --------------- | ------------------------------------ |
| **Sign Up**        | POST /users     | `supabase.auth.signUp()`             |
| **Sign In**        | POST /auth      | `supabase.auth.signInWithPassword()` |
| **Sign Out**       | Manual          | `supabase.auth.signOut()`            |
| **Session**        | Manual cookies  | Auto-managed by Supabase             |
| **Tokens**         | Manual          | Auto-refresh JWT                     |
| **OAuth**          | Not implemented | Built-in Google/etc                  |
| **Email Verify**   | Custom          | Built-in                             |
| **Password Reset** | Custom          | Built-in                             |

---

## 💾 Data Migration

### Existing Users Need to Re-register

⚠️ **Important**: Users from your old backend system need to create new accounts in Supabase.

### Option 1: Manual Migration (Recommended for small user base)

Users simply sign up again with their email/password.

### Option 2: Programmatic Migration (for larger user base)

If you have many existing users, you can migrate them programmatically:

```typescript
// Migration script (run once)
import { supabase } from "./lib/supabase";

async function migrateUsers(
  oldUsers: Array<{ email: string; password: string }>
) {
  for (const user of oldUsers) {
    try {
      const { error } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true, // Skip email verification
      });

      if (error) {
        console.error(`Failed to migrate ${user.email}:`, error);
      } else {
        console.log(`Migrated ${user.email} successfully`);
      }
    } catch (err) {
      console.error(`Error migrating ${user.email}:`, err);
    }
  }
}
```

**Note**: The `admin.createUser()` method requires a service role key (keep it secret!).

---

## 🔄 Session Handling

### Old Way

```typescript
// Manual cookie handling
const config = {
  withCredentials: true,
  credentials: "include" as RequestCredentials,
};
axios.post("http://localhost:3500/auth", data, config);
```

### New Way

```typescript
// Automatic session management
const { signIn } = useAuth();
await signIn(email, password);
// Session is automatically stored and managed
```

Supabase handles:

- ✅ Token storage (localStorage)
- ✅ Token refresh (automatic)
- ✅ Session expiry
- ✅ Cross-tab sync

---

## 🛡️ Protected Routes

### Old Way

```typescript
// No route protection
<Route path="/dashboard" element={<DashboardLayout />} />
```

### New Way

```typescript
// Protected with authentication check
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  }
/>
```

---

## 📊 State Management

### Old Way

```typescript
// No global auth state
// Each component managed auth independently
```

### New Way

```typescript
// Global auth state via Context
const { user, session, loading } = useAuth();

// Available in any component
if (user) {
  console.log("User is logged in:", user.email);
}
```

---

## 🚀 Benefits of Migration

### For Developers

1. **No Backend Needed** - Supabase handles everything
2. **Less Code** - No need to maintain auth endpoints
3. **Better Security** - Industry-standard practices
4. **Type Safety** - Full TypeScript support
5. **Real-time Updates** - Auth state syncs instantly
6. **Built-in Features** - OAuth, email verify, password reset

### For Users

1. **Social Login** - Sign in with Google
2. **Password Reset** - Forgot password functionality
3. **Email Verification** - Verify email addresses
4. **Better Security** - Secure token management
5. **Persistent Sessions** - Stay logged in
6. **Better UX** - Smoother auth experience

---

## 🐛 Breaking Changes

### API Changes

**Old**: Direct axios calls

```typescript
axios.post("http://localhost:3500/auth", { email, password });
```

**New**: Auth context methods

```typescript
const { signIn } = useAuth();
await signIn(email, password);
```

### Response Handling

**Old**: React Query mutation callbacks

```typescript
const mutation = useMutation({
  onSuccess: (data) => console.log(data),
  onError: (error) => console.error(error),
});
```

**New**: Async/await with error object

```typescript
const { error } = await signIn(email, password);
if (error) {
  // Handle error
}
```

### Navigation

**Old**: Navigate in onSuccess callback

```typescript
onSuccess: () => navigate("/dashboard");
```

**New**: Navigate after checking error

```typescript
const { error } = await signIn(email, password);
if (!error) {
  navigate("/dashboard");
}
```

---

## 🔧 Environment Variables

### Added

```env
VITE_PUBLIC_SUPABASE_URL=your_url
VITE_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Keep Existing

```env
VITE_TMDB_API_KEY=your_key
```

---

## ✅ Testing After Migration

### Test Checklist

- [ ] ✅ Sign up with new email
- [ ] ✅ Sign in with created account
- [ ] ✅ Access dashboard (should work)
- [ ] ✅ Logout (should redirect to login)
- [ ] ✅ Try accessing dashboard when logged out (should redirect to login)
- [ ] ✅ Try accessing login when logged in (should redirect to dashboard)
- [ ] ✅ Refresh page (session should persist)
- [ ] ✅ Invalid credentials show error message
- [ ] ✅ User profile shows in dashboard

---

## 🆘 Rollback Plan

If you need to rollback to the old system:

1. **Restore old auth files**:

   ```bash
   git checkout main -- src/pages/auth/Login.tsx
   git checkout main -- src/pages/auth/SignUp.tsx
   git checkout main -- src/App.tsx
   ```

2. **Remove new files**:

   ```bash
   rm src/lib/supabase.ts
   rm src/contexts/AuthContext.tsx
   rm src/components/ProtectedRoute.tsx
   ```

3. **Restart your backend server**:
   ```bash
   # Start your custom backend on port 3500
   ```

---

## 💡 Tips for Smooth Migration

1. **Test in Development First** - Don't deploy to production immediately
2. **Communicate with Users** - Let them know they need to re-register
3. **Keep Old Backend Running** - During transition period
4. **Export User Data** - Before shutting down old backend
5. **Monitor Errors** - Check Supabase logs for issues

---

## 📞 Need Help?

If you encounter issues:

1. Check `SUPABASE_AUTH_SETUP.md` for setup instructions
2. Check `AUTH_QUICK_REFERENCE.md` for code examples
3. Review Supabase docs: https://supabase.com/docs
4. Check browser console for errors
5. Verify .env variables are set correctly

---

## 🎉 Migration Complete!

Your app now uses Supabase for authentication - more secure, more features, less code to maintain!

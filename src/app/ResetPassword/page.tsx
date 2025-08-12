// app/auth/forgot-password/page.tsx
"use client";

import { Suspense } from "react";
import SetNewPasswordForm from "./resetpw";

export default function ForgotPasswordPage() {
  return (
     <Suspense fallback={<div>Loading...</div>}>
      <SetNewPasswordForm />
    </Suspense>

  );
}

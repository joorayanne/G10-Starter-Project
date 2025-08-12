import { Suspense } from "react";
import SignInContent from "./SignInContent";

export default function SignInPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}

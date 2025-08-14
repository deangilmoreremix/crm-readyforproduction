import React, { useEffect } from 'react';
let SignUpComponent: React.ComponentType<any> | null = null;
const hasClerk = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
if (hasClerk) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // @ts-ignore - dynamic require to avoid bundling when not configured
    SignUpComponent = require('@clerk/clerk-react').SignUp as React.ComponentType;
  } catch (e) {
    SignUpComponent = null;
  }
}
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  useEffect(() => {
    // If Clerk is not configured, redirect to dashboard for development
    if (!publishableKey) {
      console.log('Clerk not configured - redirecting to dashboard for development');
      navigate('/dashboard');
      return;
    }
  }, [publishableKey, navigate]);

  // If no Clerk key, show development notice
  if (!publishableKey || !SignUpComponent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Smart CRM</h1>
            <p className="text-slate-300">Development Mode</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl text-center">
            <p className="text-white mb-4">Authentication is disabled in development mode.</p>
            <p className="text-slate-300 text-sm">Redirecting to dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Smart CRM</h1>
          <p className="text-slate-300">Create your account</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
          {SignUpComponent && (
          <SignUpComponent 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none",
                headerTitle: "text-white text-2xl font-bold",
                headerSubtitle: "text-slate-300",
                socialButtonsBlockButton: "bg-white/10 border-white/20 text-white hover:bg-white/20",
                socialButtonsBlockButtonText: "text-white",
                dividerLine: "bg-white/20",
                dividerText: "text-slate-300",
                formFieldLabel: "text-white",
                formFieldInput: "bg-white/10 border-white/20 text-white placeholder:text-slate-400",
                formButtonPrimary: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
                footerActionLink: "text-purple-400 hover:text-purple-300",
                identityPreviewEditButton: "text-purple-400 hover:text-purple-300",
                formResendCodeLink: "text-purple-400 hover:text-purple-300",
                otpCodeFieldInput: "bg-white/10 border-white/20 text-white",
                formFieldSuccessText: "text-green-400",
                formFieldErrorText: "text-red-400",
                alertText: "text-red-400",
                formFieldHintText: "text-slate-400"
              }
            }}
            signInUrl="/login"
            afterSignUpUrl="/dashboard"
          />
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
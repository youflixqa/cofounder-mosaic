import { useSessionContext } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import LoadingSpinner from "@/components/auth/LoadingSpinner";
import AuthForm from "@/components/auth/AuthForm";

const Login = () => {
  const { session, isLoading } = useSessionContext();
  const { toast } = useToast();

  // Handle auth state changes with improved error handling
  supabase.auth.onAuthStateChange((event) => {
    switch (event) {
      case 'SIGNED_IN':
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        break;
      case 'SIGNED_OUT':
        toast({
          title: "Signed out",
          description: "You have been signed out successfully.",
        });
        break;
      case 'PASSWORD_RECOVERY':
        toast({
          title: "Password Recovery",
          description: "Check your email for password reset instructions.",
        });
        break;
    }
  });

  // Redirect if already logged in
  if (session) {
    return <Navigate to="/" />;
  }

  // Show loading state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-4">
      <AuthForm />
    </div>
  );
};

export default Login;
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/integrations/supabase/client";
import { useSessionContext } from '@supabase/auth-helpers-react';
import { Navigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { session, isLoading } = useSessionContext();
  const { toast } = useToast();

  // Handle auth state changes
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
      case 'USER_UPDATED':
        toast({
          title: "Account updated",
          description: "Your account has been updated successfully.",
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (session) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#2563eb',
                  brandAccent: '#1d4ed8',
                }
              }
            },
            className: {
              container: 'w-full',
              button: 'w-full px-4 py-2 rounded-md',
              input: 'rounded-md',
              message: 'text-sm text-red-600 mb-2',
              loader: 'animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full',
            }
          }}
          providers={[]}
          view="sign_in"
          showLinks={true}
          redirectTo={window.location.origin}
        />
      </div>
    </div>
  );
};

export default Login;
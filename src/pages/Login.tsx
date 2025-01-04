import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-600 mt-2">
            Sign in to connect with other founders
          </p>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            style: {
              button: {
                background: 'hsl(var(--primary))',
                color: 'white',
                borderRadius: '0.5rem',
              },
              anchor: {
                color: 'hsl(var(--primary))',
              },
            },
          }}
          providers={[]}
          redirectTo={`${window.location.origin}/`}
          view="sign_in"
          showLinks={true}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Email address',
                password_label: 'Password',
                email_input_placeholder: 'Your email address',
                password_input_placeholder: 'Your password',
                button_label: 'Sign in',
                loading_button_label: 'Signing in ...',
                social_provider_text: 'Sign in with {{provider}}',
                link_text: "Already have an account? Sign in",
              },
              sign_up: {
                email_label: 'Email address',
                password_label: 'Create a Password',
                email_input_placeholder: 'Your email address',
                password_input_placeholder: 'Create a password',
                button_label: 'Sign up',
                loading_button_label: 'Signing up ...',
                social_provider_text: 'Sign up with {{provider}}',
                link_text: "Don't have an account? Sign up",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Login;
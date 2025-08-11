import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const PasswordResetEmailSent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Mail className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl">Check Your Email</CardTitle>
          <CardDescription>
            We've sent a password reset link to {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>Didn't receive the email? Check your spam folder or try again in a few minutes.</p>
          </div>
          
          <Button 
            onClick={() => navigate('/')} 
            className="w-full"
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordResetEmailSent;
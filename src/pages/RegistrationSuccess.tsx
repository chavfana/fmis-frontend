import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl text-green-700">Registration Successful!</CardTitle>
          <CardDescription>
            Your farm has been successfully registered. You can now log in to access your farm management dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={() => navigate('/')} 
            className="w-full"
          >
            Continue to Login
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationSuccess;
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Phone, CheckCircle } from "lucide-react";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const PhoneVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const phoneNumber = location.state?.phoneNumber || "";

  const handleVerifyPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode || !phoneNumber) return;

    setIsLoading(true);
    try {
      await apiService.verifyPhone({
        phone_number: phoneNumber,
        verification_code: verificationCode,
      });
      setIsVerified(true);
      toast({
        title: "Phone verified successfully!",
        description: "You can now log in to your account.",
      });
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast({
        title: "Verification failed",
        description: "Please check your code and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!phoneNumber) return;

    setIsLoading(true);
    try {
      await apiService.sendSMS({ phone_number: phoneNumber });
      toast({
        title: "Verification code sent",
        description: "Please check your phone for the verification code.",
      });
    } catch (error) {
      toast({
        title: "Failed to send code",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl">Phone Verified!</CardTitle>
            <CardDescription>
              Your phone number has been successfully verified. Redirecting to login...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Phone className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <CardTitle className="text-2xl">Phone Verification</CardTitle>
          <CardDescription>
            We sent a verification code to {phoneNumber}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleVerifyPhone} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength={6}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify Phone
            </Button>
          </form>

          <div className="text-center space-y-2">
            <Button 
              variant="ghost" 
              onClick={handleResendCode}
              disabled={isLoading}
              className="text-sm"
            >
              Resend Code
            </Button>
            <br />
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="text-sm"
            >
              Back to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhoneVerification;
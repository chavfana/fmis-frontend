import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Phone } from "lucide-react";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const PasswordResetOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const phoneNumber = location.state?.phoneNumber || "";

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode || !phoneNumber) return;

    setIsLoading(true);
    try {
      // Verify the OTP code for password reset
      await apiService.verifyPasswordResetOTP({
        phone_number: phoneNumber,
        verification_code: verificationCode,
      });
      
      toast({
        title: "Code verified successfully!",
        description: "You can now set a new password.",
      });
      
      navigate("/password-reset", { 
        state: { 
          phoneNumber, 
          verificationCode,
          resetMethod: 'phone'
        }
      });
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
      await apiService.initiatePasswordResetPhone(phoneNumber);
      toast({
        title: "Verification code sent",
        description: "Please check your phone for the new verification code.",
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Phone className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <CardTitle className="text-2xl">Verify Phone Number</CardTitle>
          <CardDescription>
            We sent a verification code to {phoneNumber}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleVerifyCode} className="space-y-4">
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
              Verify Code
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
              onClick={() => navigate("/forgot-password")}
              className="text-sm"
            >
              Back to Reset Options
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordResetOTP;
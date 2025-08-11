import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const PasswordReset = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });

  const { resetMethod, verificationCode, phoneNumber } = location.state || {};

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please ensure both passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (resetMethod === 'phone') {
        await apiService.createPasswordFromOTP({
          phone_number: phoneNumber,
          verification_code: verificationCode,
          password: formData.password,
        });
      } else {
        // For email-based reset, the token would be in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const uidb64 = urlParams.get('uidb64');
        
        if (token && uidb64) {
          await apiService.confirmPasswordReset({
            uidb64,
            token,
            password: formData.password,
          });
        }
      }
      
      toast({
        title: "Password reset successful!",
        description: "You can now log in with your new password.",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Password reset failed",
        description: "Please try again or request a new reset link.",
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
          <Lock className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl">Set New Password</CardTitle>
          <CardDescription>
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter new password"
                required
                minLength={8}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="Confirm new password"
                required
                minLength={8}
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PasswordReset;
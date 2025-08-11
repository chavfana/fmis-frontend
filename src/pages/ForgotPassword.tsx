import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sprout, Phone, Mail, Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resetMethod, setResetMethod] = useState<'email' | 'phone'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: ''
  });

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      if (resetMethod === 'email') {
        await apiService.initiatePasswordResetEmail(formData.email);
        toast({
          title: "Password reset email sent",
          description: "Please check your email for the reset link.",
        });
        navigate('/password-reset-email-sent', { state: { email: formData.email } });
      } else {
        await apiService.initiatePasswordResetPhone(formData.phone);
        toast({
          title: "Verification code sent",
          description: "Please check your phone for the verification code.",
        });
        navigate('/password-reset-otp', { state: { phoneNumber: formData.phone } });
      }
    } catch (error) {
      toast({
        title: "Failed to send reset request",
        description: "Please check your details and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-full">
              <Sprout className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <p className="text-muted-foreground">Enter your email or phone number to reset your password</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button
                type="button"
                variant={resetMethod === 'email' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setResetMethod('email')}
                className="flex-1"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
              <Button
                type="button"
                variant={resetMethod === 'phone' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setResetMethod('phone')}
                className="flex-1"
              >
                <Phone className="h-4 w-4 mr-2" />
                Phone
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={resetMethod}>
                {resetMethod === 'email' ? 'Email Address' : 'Phone Number'}
              </Label>
              <Input
                id={resetMethod}
                type={resetMethod === 'email' ? 'email' : 'tel'}
                placeholder={resetMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                value={resetMethod === 'email' ? formData.email : formData.phone}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  [resetMethod]: e.target.value
                }))}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Sending..." : "Send Reset Instructions"}
            </Button>
            
            <Button 
              type="button"
              variant="ghost" 
              onClick={() => navigate('/')}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
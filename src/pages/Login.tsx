
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sprout, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    farmName: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    navigate('/dashboard');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual registration
    navigate('/dashboard');
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
          <CardTitle className="text-2xl">Farm Information Management</CardTitle>
          <p className="text-muted-foreground">Manage your farm efficiently</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button
                    type="button"
                    variant={loginMethod === 'email' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLoginMethod('email')}
                    className="flex-1"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    type="button"
                    variant={loginMethod === 'phone' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLoginMethod('phone')}
                    className="flex-1"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Phone
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={loginMethod}>
                    {loginMethod === 'email' ? 'Email' : 'Phone Number'}
                  </Label>
                  <Input
                    id={loginMethod}
                    type={loginMethod === 'email' ? 'email' : 'tel'}
                    placeholder={loginMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                    value={loginMethod === 'email' ? formData.email : formData.phone}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      [loginMethod]: e.target.value
                    }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="farmName">Farm Name</Label>
                  <Input
                    id="farmName"
                    placeholder="Enter your farm name"
                    value={formData.farmName}
                    onChange={(e) => setFormData(prev => ({ ...prev, farmName: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="flex gap-2 mb-4">
                  <Button
                    type="button"
                    variant={loginMethod === 'email' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLoginMethod('email')}
                    className="flex-1"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    type="button"
                    variant={loginMethod === 'phone' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLoginMethod('phone')}
                    className="flex-1"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Phone
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`register-${loginMethod}`}>
                    {loginMethod === 'email' ? 'Email' : 'Phone Number'}
                  </Label>
                  <Input
                    id={`register-${loginMethod}`}
                    type={loginMethod === 'email' ? 'email' : 'tel'}
                    placeholder={loginMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                    value={loginMethod === 'email' ? formData.email : formData.phone}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      [loginMethod]: e.target.value
                    }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Register Farm
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from 'react';
import FarmHeader from '@/components/FarmHeader';
import MetricCard from '@/components/MetricCard';
import WeatherWidget from '@/components/WeatherWidget';
import QuickActions from '@/components/QuickActions';
import ProjectsList from '@/components/ProjectsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wheat, Beef, Droplets, DollarSign, TrendingUp, AlertTriangle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState([]);
  const [metrics, setMetrics] = useState({
    totalCrops: 0,
    livestock: 0,
    waterUsage: '0L',
    revenue: '$0'
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const projectsData = await apiService.getProjects();
        setProjects(projectsData.results || projectsData || []);
        
        // Calculate metrics from projects data
        const totalProjects = projectsData.results?.length || projectsData.length || 0;
        setMetrics({
          totalCrops: totalProjects,
          livestock: 0, // Will be calculated when animal data is available
          waterUsage: '0L', // Will be calculated from usage data
          revenue: '$0' // Will be calculated from sales data
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <FarmHeader onSearch={setSearchQuery} />
      
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.farm_name || 'Farm Manager'}!
          </h2>
          <p className="text-muted-foreground">Here's what's happening on your farm today.</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Projects"
            value={metrics.totalCrops.toString()}
            change="Active farm projects"
            changeType="neutral"
            icon={Wheat}
            subtitle="Plant & Animal Projects"
          />
          <MetricCard
            title="Livestock"
            value={metrics.livestock.toString()}
            change="Total animals"
            changeType="neutral"
            icon={Beef}
            subtitle="All livestock groups"
          />
          <MetricCard
            title="Water Usage"
            value={metrics.waterUsage}
            change="Current period"
            changeType="neutral"
            icon={Droplets}
            subtitle="Resource monitoring"
          />
          <MetricCard
            title="Revenue"
            value={metrics.revenue}
            change="Total earnings"
            changeType="neutral"
            icon={DollarSign}
            subtitle="Farm income"
          />
        </div>

        {/* Main Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/plant-farming')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Wheat className="h-6 w-6 text-green-600" />
                Plant Farming
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Manage crops, land details, supplements, and harvest records
              </p>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Manage Plant Projects
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/animal-farming')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Beef className="h-6 w-6 text-blue-600" />
                Animal Farming
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Track individual and group animal records, health, and production
              </p>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Manage Animal Projects
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Projects List - New comprehensive section */}
        <div className="mb-8">
          <ProjectsList searchQuery={searchQuery} />
        </div>

        {/* Side Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Additional Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weather Alert */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-orange-900">Weather Alert</h3>
                  <p className="text-sm text-orange-700 mt-1">
                    Check weather conditions for optimal farming operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <WeatherWidget />
            <QuickActions />
          </div>
        </div>

        {/* Statistics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Farm Status</p>
                <p className="text-2xl font-bold">Active</p>
                <p className="text-sm text-green-100">All systems operational</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Efficiency</p>
                <p className="text-2xl font-bold">--</p>
                <p className="text-sm text-blue-100">Resource utilization</p>
              </div>
              <Droplets className="h-8 w-8 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Projects</p>
                <p className="text-2xl font-bold">{metrics.totalCrops}</p>
                <p className="text-sm text-purple-100">Total active</p>
              </div>
              <Wheat className="h-8 w-8 text-purple-200" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
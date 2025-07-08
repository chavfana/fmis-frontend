
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Sprout, Droplets, Bug, Wrench } from 'lucide-react';

const RecentActivities = () => {
  const activities = [
    {
      icon: Sprout,
      title: 'Wheat field irrigation completed',
      time: '2 hours ago',
      type: 'irrigation',
      status: 'completed'
    },
    {
      icon: Bug,
      title: 'Pest control applied to carrot field',
      time: '5 hours ago',
      type: 'treatment',
      status: 'completed'
    },
    {
      icon: Droplets,
      title: 'Soil moisture check scheduled',
      time: '1 day ago',
      type: 'monitoring',
      status: 'pending'
    },
    {
      icon: Wrench,
      title: 'Tractor maintenance completed',
      time: '2 days ago',
      type: 'maintenance',
      status: 'completed'
    },
  ];

  const getStatusColor = (status: string) => {
    return status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 pb-3 border-b border-border last:border-b-0">
            <div className="p-2 bg-muted rounded-lg">
              <activity.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="font-medium text-sm">{activity.title}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
                <Badge variant="secondary" className={getStatusColor(activity.status)}>
                  {activity.status}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivities;

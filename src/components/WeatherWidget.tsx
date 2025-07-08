
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, Sun, Droplets, Wind } from 'lucide-react';

const WeatherWidget = () => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sun className="h-5 w-5 text-yellow-500" />
          <span>Weather Conditions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sun className="h-8 w-8 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold">24°C</p>
              <p className="text-sm text-muted-foreground">Sunny</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Humidity</p>
              <p className="text-xs text-muted-foreground">65%</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium">Wind</p>
              <p className="text-xs text-muted-foreground">12 km/h</p>
            </div>
          </div>
        </div>
        
        <div className="pt-2">
          <p className="text-xs text-muted-foreground">
            Perfect conditions for outdoor farming activities
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;

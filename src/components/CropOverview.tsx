
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Wheat, Carrot, Apple, Grape } from 'lucide-react';

const CropOverview = () => {
  const crops = [
    { name: 'Wheat', icon: Wheat, progress: 75, status: 'Growing', area: '120 acres' },
    { name: 'Carrots', icon: Carrot, progress: 90, status: 'Ready to Harvest', area: '45 acres' },
    { name: 'Apples', icon: Apple, progress: 60, status: 'Flowering', area: '80 acres' },
    { name: 'Grapes', icon: Grape, progress: 45, status: 'Early Growth', area: '65 acres' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crop Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {crops.map((crop, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <crop.icon className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{crop.name}</p>
                  <p className="text-sm text-muted-foreground">{crop.area}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{crop.status}</p>
                <p className="text-xs text-muted-foreground">{crop.progress}%</p>
              </div>
            </div>
            <Progress value={crop.progress} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CropOverview;

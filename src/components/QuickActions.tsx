
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, FileText, AlertCircle } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    { icon: Plus, label: 'Add Crop', color: 'bg-green-500 hover:bg-green-600' },
    { icon: Calendar, label: 'Schedule Task', color: 'bg-blue-500 hover:bg-blue-600' },
    { icon: FileText, label: 'Record Data', color: 'bg-purple-500 hover:bg-purple-600' },
    { icon: AlertCircle, label: 'Report Issue', color: 'bg-orange-500 hover:bg-orange-600' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className={`h-16 flex-col space-y-2 ${action.color} text-white border-none hover:text-white`}
          >
            <action.icon className="h-5 w-5" />
            <span className="text-xs">{action.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickActions;

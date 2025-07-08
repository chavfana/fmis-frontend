
import React, { useState } from 'react';
import FarmHeader from '@/components/FarmHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, MapPin, Calendar, Wheat, Trash2 } from 'lucide-react';

const PlantFarming = () => {
  const [landDetails, setLandDetails] = useState({
    projectName: '',
    location: '',
    longitude: '',
    latitude: '',
    soilType: '',
    cropPlanted: '',
    size: '',
    plantingDate: ''
  });

  const [supplements, setSupplements] = useState([
    { id: 1, name: '', quantity: '', price: '' }
  ]);

  const [updatableFields, setUpdatableFields] = useState({
    fertilitySpread: [],
    pest: [],
    diseases: [],
    management: [],
    species: [],
    harvest: []
  });

  const [newFieldValue, setNewFieldValue] = useState('');
  const [selectedField, setSelectedField] = useState<keyof typeof updatableFields>('fertilitySpread');

  const addSupplement = () => {
    setSupplements([...supplements, { id: Date.now(), name: '', quantity: '', price: '' }]);
  };

  const removeSupplement = (id: number) => {
    setSupplements(supplements.filter(s => s.id !== id));
  };

  const updateSupplement = (id: number, field: string, value: string) => {
    setSupplements(supplements.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const addFieldValue = () => {
    if (newFieldValue.trim()) {
      setUpdatableFields(prev => ({
        ...prev,
        [selectedField]: [...prev[selectedField], {
          value: newFieldValue,
          timestamp: new Date().toISOString()
        }]
      }));
      setNewFieldValue('');
    }
  };

  const removeFieldValue = (field: keyof typeof updatableFields, index: number) => {
    setUpdatableFields(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const fieldLabels = {
    fertilitySpread: 'Fertility Spread',
    pest: 'Pest Control',
    diseases: 'Disease Management',
    management: 'Management Activities',
    species: 'Species Information',
    harvest: 'Harvest Records'
  };

  return (
    <div className="min-h-screen bg-background">
      <FarmHeader />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Plant Farming Management</h2>
          <p className="text-muted-foreground">Manage your crop projects and land details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Land Details Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Land Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  placeholder="e.g., Wheat Field A"
                  value={landDetails.projectName}
                  onChange={(e) => setLandDetails(prev => ({ ...prev, projectName: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., North Field Section"
                  value={landDetails.location}
                  onChange={(e) => setLandDetails(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    placeholder="e.g., -74.0060"
                    value={landDetails.longitude}
                    onChange={(e) => setLandDetails(prev => ({ ...prev, longitude: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    placeholder="e.g., 40.7128"
                    value={landDetails.latitude}
                    onChange={(e) => setLandDetails(prev => ({ ...prev, latitude: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="soilType">Soil Type</Label>
                <Select onValueChange={(value) => setLandDetails(prev => ({ ...prev, soilType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clay">Clay</SelectItem>
                    <SelectItem value="sandy">Sandy</SelectItem>
                    <SelectItem value="loamy">Loamy</SelectItem>
                    <SelectItem value="silty">Silty</SelectItem>
                    <SelectItem value="peaty">Peaty</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cropPlanted">Crop Planted</Label>
                <Input
                  id="cropPlanted"
                  placeholder="e.g., Wheat, Corn, Rice"
                  value={landDetails.cropPlanted}
                  onChange={(e) => setLandDetails(prev => ({ ...prev, cropPlanted: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="size">Size (acres)</Label>
                  <Input
                    id="size"
                    placeholder="e.g., 25"
                    value={landDetails.size}
                    onChange={(e) => setLandDetails(prev => ({ ...prev, size: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plantingDate">Planting Date</Label>
                  <Input
                    id="plantingDate"
                    type="date"
                    value={landDetails.plantingDate}
                    onChange={(e) => setLandDetails(prev => ({ ...prev, plantingDate: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supplements Required */}
          <Card>
            <CardHeader>
              <CardTitle>Required Supplements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {supplements.map((supplement, index) => (
                <div key={supplement.id} className="grid grid-cols-4 gap-2 items-end">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      placeholder="Fertilizer name"
                      value={supplement.name}
                      onChange={(e) => updateSupplement(supplement.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <Input
                      placeholder="50 kg"
                      value={supplement.quantity}
                      onChange={(e) => updateSupplement(supplement.id, 'quantity', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Price ($)</Label>
                    <Input
                      placeholder="100"
                      value={supplement.price}
                      onChange={(e) => updateSupplement(supplement.id, 'price', e.target.value)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeSupplement(supplement.id)}
                    disabled={supplements.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button onClick={addSupplement} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Supplement
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Updatable Fields Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wheat className="h-5 w-5" />
              Plant Event Records
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <Label>Field Type</Label>
                <Select value={selectedField} onValueChange={(value) => setSelectedField(value as keyof typeof updatableFields)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(fieldLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-2 space-y-2">
                <Label>Add New Record</Label>
                <Input
                  placeholder={`Enter ${fieldLabels[selectedField].toLowerCase()} details`}
                  value={newFieldValue}
                  onChange={(e) => setNewFieldValue(e.target.value)}
                />
              </div>
              <Button onClick={addFieldValue}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>

            {Object.entries(updatableFields).map(([field, values]) => (
              values.length > 0 && (
                <div key={field} className="space-y-2">
                  <h4 className="font-medium">{fieldLabels[field as keyof typeof fieldLabels]}</h4>
                  <div className="space-y-2">
                    {values.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{item.value}</p>
                          <p className="text-sm text-muted-foreground">
                            Added: {new Date(item.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFieldValue(field as keyof typeof updatableFields, index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-end space-x-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save Project</Button>
        </div>
      </main>
    </div>
  );
};

export default PlantFarming;

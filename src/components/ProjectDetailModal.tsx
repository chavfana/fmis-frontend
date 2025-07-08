
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar, Wheat, Beef, Plus, Edit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';

interface ProjectDetailModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  const [projectData, setProjectData] = useState(project);
  const [isEditing, setIsEditing] = useState(false);
  const [plantingEvents, setPlantingEvents] = useState([]);
  const [animalGroups, setAnimalGroups] = useState([]);

  useEffect(() => {
    if (project && isOpen) {
      loadProjectDetails();
    }
  }, [project, isOpen]);

  const loadProjectDetails = async () => {
    try {
      // Load detailed project data
      const detailedProject = await apiService.getProject(project.id);
      setProjectData(detailedProject);

      // Load planting events if it's a plant farming project
      if (project.type === 'plant') {
        const events = await apiService.getPlantingEvents(project.id);
        setPlantingEvents(events);
      }

      // Load animal groups if it's an animal farming project
      if (project.type === 'animal') {
        const groups = await apiService.getAnimalGroups(project.id);
        setAnimalGroups(groups);
      }
    } catch (error) {
      console.error('Failed to load project details:', error);
    }
  };

  const handleSave = async () => {
    try {
      // Save project updates via API
      console.log('Saving project updates:', projectData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  const addPlantingEvent = async () => {
    try {
      const newEvent = {
        name: 'New Planting Event',
        species: '',
        planting_date: new Date().toISOString().split('T')[0],
        expected_harvest_date: '',
      };
      await apiService.createPlantingEvent(project.id, newEvent);
      loadProjectDetails();
    } catch (error) {
      console.error('Failed to add planting event:', error);
    }
  };

  const addAnimalGroup = async () => {
    try {
      const newGroup = {
        name: 'New Animal Group',
        animal_type: 'cattle',
        initial_count: 0,
      };
      await apiService.createAnimalGroup(project.id, newGroup);
      loadProjectDetails();
    } catch (error) {
      console.error('Failed to add animal group:', error);
    }
  };

  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3">
              {project.type === 'plant' ? (
                <Wheat className="h-6 w-6 text-green-600" />
              ) : (
                <Beef className="h-6 w-6 text-blue-600" />
              )}
              {projectData.name}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Badge className={project.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {project.status}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Project Name</label>
                  {isEditing ? (
                    <Input
                      value={projectData.name || ''}
                      onChange={(e) => setProjectData({...projectData, name: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">{projectData.name}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{project.location}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Last Updated</label>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{project.lastUpdated}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Size/Count</label>
                  <p className="text-sm text-muted-foreground">
                    {project.type === 'plant' ? project.area : project.count}
                  </p>
                </div>
              </div>
              {isEditing && (
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={projectData.description || ''}
                    onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                    placeholder="Project description..."
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Project-specific content */}
          <Tabs defaultValue={project.type === 'plant' ? 'planting' : 'animals'}>
            <TabsList>
              {project.type === 'plant' ? (
                <>
                  <TabsTrigger value="planting">Planting Events</TabsTrigger>
                  <TabsTrigger value="fertility">Fertility & Supplements</TabsTrigger>
                  <TabsTrigger value="harvest">Harvest Records</TabsTrigger>
                </>
              ) : (
                <>
                  <TabsTrigger value="animals">Animal Groups</TabsTrigger>
                  <TabsTrigger value="health">Health Records</TabsTrigger>
                  <TabsTrigger value="production">Production</TabsTrigger>
                </>
              )}
            </TabsList>

            {project.type === 'plant' && (
              <>
                <TabsContent value="planting">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Planting Events</CardTitle>
                        <Button size="sm" onClick={addPlantingEvent}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Event
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {plantingEvents.length > 0 ? (
                        <div className="space-y-4">
                          {plantingEvents.map((event: any, index) => (
                            <div key={index} className="p-4 border rounded-lg">
                              <h4 className="font-medium">{event.species || 'Unnamed Event'}</h4>
                              <p className="text-sm text-muted-foreground">
                                Planted: {event.planting_date}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No planting events recorded yet.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="fertility">
                  <Card>
                    <CardHeader>
                      <CardTitle>Fertility & Supplements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Add fertility spreads and supplement records here.</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="harvest">
                  <Card>
                    <CardHeader>
                      <CardTitle>Harvest Records</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Track harvest quantities and quality here.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            )}

            {project.type === 'animal' && (
              <>
                <TabsContent value="animals">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Animal Groups</CardTitle>
                        <Button size="sm" onClick={addAnimalGroup}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Group
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {animalGroups.length > 0 ? (
                        <div className="space-y-4">
                          {animalGroups.map((group: any, index) => (
                            <div key={index} className="p-4 border rounded-lg">
                              <h4 className="font-medium">{group.name || 'Unnamed Group'}</h4>
                              <p className="text-sm text-muted-foreground">
                                Type: {group.animal_type} | Count: {group.initial_count || 0}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No animal groups recorded yet.</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="health">
                  <Card>
                    <CardHeader>
                      <CardTitle>Health Records</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Track animal health, diseases, and treatments here.</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="production">
                  <Card>
                    <CardHeader>
                      <CardTitle>Production Records</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Monitor milk production, egg laying, etc.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            )}
          </Tabs>

          {isEditing && (
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;

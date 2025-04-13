import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Sprout, Leaf, Calendar, AlertCircle, TrendingUp, BarChart3Icon, List } from 'lucide-react';

// Mock crop data
const crops = [
  {
    id: 1,
    name: 'Corn',
    variety: 'Sweet Corn XH231',
    field: 'North Field',
    plantDate: '2025-03-15',
    harvestDate: '2025-07-20',
    growthStage: 'Vegetative',
    progress: 42,
    health: 'good',
    concerns: [],
    stats: {
      moisture: 52,
      nutrients: {
        nitrogen: 65,
        phosphorus: 48,
        potassium: 70
      },
      growth: [
        { week: 'Week 1', height: 5 },
        { week: 'Week 2', height: 12 },
        { week: 'Week 3', height: 24 },
        { week: 'Week 4', height: 35 },
        { week: 'Week 5', height: 48 },
        { week: 'Current', height: 60 },
      ]
    }
  },
  {
    id: 2,
    name: 'Wheat',
    variety: 'Winter Wheat KL44',
    field: 'East Field',
    plantDate: '2025-02-10',
    harvestDate: '2025-06-30',
    growthStage: 'Reproductive',
    progress: 68,
    health: 'good',
    concerns: [],
    stats: {
      moisture: 48,
      nutrients: {
        nitrogen: 55,
        phosphorus: 60,
        potassium: 58
      },
      growth: [
        { week: 'Week 1', height: 3 },
        { week: 'Week 2', height: 8 },
        { week: 'Week 3', height: 15 },
        { week: 'Week 4', height: 22 },
        { week: 'Week 5', height: 28 },
        { week: 'Current', height: 35 },
      ]
    }
  },
  {
    id: 3,
    name: 'Soybean',
    variety: 'Roundup Ready GL90',
    field: 'South Field',
    plantDate: '2025-04-05',
    harvestDate: '2025-08-15',
    growthStage: 'Early Vegetative',
    progress: 28,
    health: 'concern',
    concerns: ['Low soil moisture', 'Early signs of pest activity'],
    stats: {
      moisture: 31,
      nutrients: {
        nitrogen: 42,
        phosphorus: 50,
        potassium: 48
      },
      growth: [
        { week: 'Week 1', height: 2 },
        { week: 'Week 2', height: 5 },
        { week: 'Week 3', height: 8 },
        { week: 'Week 4', height: 12 },
        { week: 'Current', height: 18 },
      ]
    }
  },
  {
    id: 4,
    name: 'Potatoes',
    variety: 'Russet Burbank',
    field: 'West Field',
    plantDate: '2025-03-25',
    harvestDate: '2025-07-10',
    growthStage: 'Vegetative',
    progress: 38,
    health: 'good',
    concerns: [],
    stats: {
      moisture: 58,
      nutrients: {
        nitrogen: 68,
        phosphorus: 52,
        potassium: 63
      },
      growth: [
        { week: 'Week 1', height: 0 },
        { week: 'Week 2', height: 4 },
        { week: 'Week 3', height: 10 },
        { week: 'Week 4', height: 16 },
        { week: 'Current', height: 22 },
      ]
    }
  }
];

const Crops = () => {
  const [selectedCrop, setSelectedCrop] = useState(crops[0]);
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };
  
  const getDaysUntilHarvest = (harvestDateStr: string) => {
    const today = new Date();
    const harvestDate = new Date(harvestDateStr);
    const diffTime = harvestDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  const getHealthColor = (health: string) => {
    switch (health) {
      case 'good': return 'bg-green-500';
      case 'concern': return 'bg-amber-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Crop Management</h1>
        <p className="text-muted-foreground">
          Monitor and manage your crops throughout their growth cycle
        </p>
      </div>
      
      {/* Crop overview grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {crops.map(crop => (
          <Card 
            key={crop.id} 
            className={`cursor-pointer transition-all ${selectedCrop.id === crop.id ? 'ring-2 ring-primary' : 'hover:bg-muted/50'}`}
            onClick={() => setSelectedCrop(crop)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <Sprout className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="font-medium">{crop.name}</h3>
                </div>
                <Badge variant={crop.health === 'good' ? 'outline' : 'destructive'}>
                  {crop.health.charAt(0).toUpperCase() + crop.health.slice(1)}
                </Badge>
              </div>
              
              <p className="text-xs text-muted-foreground mb-2">{crop.variety}</p>
              
              <div className="space-y-3 mt-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Growth Progress</span>
                    <span>{crop.progress}%</span>
                  </div>
                  <Progress value={crop.progress} className={getHealthColor(crop.health)} />
                </div>
                
                <div className="flex justify-between text-xs">
                  <span>{crop.growthStage}</span>
                  <span>{getDaysUntilHarvest(crop.harvestDate)} days to harvest</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Selected crop details */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <Sprout className="h-5 w-5 mr-2" />
              {selectedCrop.name}
              <Badge className="ml-2">{selectedCrop.variety}</Badge>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Field:</span>
              <Badge variant="outline">{selectedCrop.field}</Badge>
            </div>
          </div>
          <CardDescription>
            Planted: {formatDate(selectedCrop.plantDate)} • Expected Harvest: {formatDate(selectedCrop.harvestDate)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="grid grid-cols-2 md:grid-cols-3 mb-4">
              <TabsTrigger value="overview" className="flex items-center">
                <List className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="growth" className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Growth
              </TabsTrigger>
              <TabsTrigger value="nutrition" className="flex items-center">
                <Leaf className="h-4 w-4 mr-2" />
                Nutrition
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Growth stage */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Calendar className="h-8 w-8 mx-auto text-primary mb-2" />
                      <h3 className="font-medium">Growth Stage</h3>
                      <p className="text-2xl font-bold mt-1">{selectedCrop.growthStage}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {getDaysUntilHarvest(selectedCrop.harvestDate)} days until harvest
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Soil moisture */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="mb-2 flex justify-center">
                        <div className="relative w-16 h-16 flex items-center justify-center">
                          <svg className="w-16 h-16" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#eee"
                              strokeWidth="3"
                            />
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="#3b82f6"
                              strokeWidth="3"
                              strokeDasharray={`${selectedCrop.stats.moisture}, 100`}
                            />
                          </svg>
                          <div className="absolute text-lg font-bold">{selectedCrop.stats.moisture}%</div>
                        </div>
                      </div>
                      <h3 className="font-medium">Soil Moisture</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedCrop.stats.moisture < 35 ? 'Below optimal' : 
                         selectedCrop.stats.moisture > 65 ? 'Above optimal' : 
                         'Optimal range'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Health status */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className={`h-8 w-8 mx-auto rounded-full mb-2 ${
                        selectedCrop.health === 'good' ? 'bg-green-500' : 
                        selectedCrop.health === 'concern' ? 'bg-amber-500' : 
                        'bg-red-500'
                      }`}></div>
                      <h3 className="font-medium">Health Status</h3>
                      <p className="text-2xl font-bold mt-1 capitalize">{selectedCrop.health}</p>
                      {selectedCrop.concerns.length > 0 && (
                        <div className="mt-2">
                          {selectedCrop.concerns.map((concern, index) => (
                            <div key={index} className="flex items-center text-xs text-amber-600 mt-1">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              <span>{concern}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Growth timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Growth Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute left-4 inset-y-0 w-0.5 bg-muted"></div>
                    <div className="space-y-6">
                      <div className="relative flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center z-10 shadow-sm mr-4">
                          <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        </div>
                        <div>
                          <h4 className="font-medium">Planting</h4>
                          <p className="text-sm text-muted-foreground">{formatDate(selectedCrop.plantDate)}</p>
                        </div>
                        <div className="ml-auto text-right">
                          <Badge variant="outline">Completed</Badge>
                        </div>
                      </div>
                      
                      <div className="relative flex items-center">
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full ${
                          selectedCrop.progress >= 30 ? 'bg-green-100' : 'bg-muted'
                        } flex items-center justify-center z-10 shadow-sm mr-4`}>
                          <span className={`h-2 w-2 rounded-full ${
                            selectedCrop.progress >= 30 ? 'bg-green-500' : 'bg-muted-foreground'
                          }`}></span>
                        </div>
                        <div>
                          <h4 className="font-medium">Vegetative Stage</h4>
                          <p className="text-sm text-muted-foreground">30% of growth cycle</p>
                        </div>
                        <div className="ml-auto text-right">
                          <Badge variant={selectedCrop.progress >= 30 ? 'outline' : 'secondary'}>
                            {selectedCrop.progress >= 30 ? 'Completed' : 'Upcoming'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="relative flex items-center">
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full ${
                          selectedCrop.progress >= 60 ? 'bg-green-100' : 'bg-muted'
                        } flex items-center justify-center z-10 shadow-sm mr-4`}>
                          <span className={`h-2 w-2 rounded-full ${
                            selectedCrop.progress >= 60 ? 'bg-green-500' : 'bg-muted-foreground'
                          }`}></span>
                        </div>
                        <div>
                          <h4 className="font-medium">Reproductive Stage</h4>
                          <p className="text-sm text-muted-foreground">60% of growth cycle</p>
                        </div>
                        <div className="ml-auto text-right">
                          <Badge variant={selectedCrop.progress >= 60 ? 'outline' : 'secondary'}>
                            {selectedCrop.progress >= 60 ? 'Completed' : 'Upcoming'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="relative flex items-center">
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full ${
                          selectedCrop.progress >= 85 ? 'bg-green-100' : 'bg-muted'
                        } flex items-center justify-center z-10 shadow-sm mr-4`}>
                          <span className={`h-2 w-2 rounded-full ${
                            selectedCrop.progress >= 85 ? 'bg-green-500' : 'bg-muted-foreground'
                          }`}></span>
                        </div>
                        <div>
                          <h4 className="font-medium">Ripening</h4>
                          <p className="text-sm text-muted-foreground">85% of growth cycle</p>
                        </div>
                        <div className="ml-auto text-right">
                          <Badge variant={selectedCrop.progress >= 85 ? 'outline' : 'secondary'}>
                            {selectedCrop.progress >= 85 ? 'Completed' : 'Upcoming'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="relative flex items-center">
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full ${
                          selectedCrop.progress >= 100 ? 'bg-green-100' : 'bg-muted'
                        } flex items-center justify-center z-10 shadow-sm mr-4`}>
                          <span className={`h-2 w-2 rounded-full ${
                            selectedCrop.progress >= 100 ? 'bg-green-500' : 'bg-muted-foreground'
                          }`}></span>
                        </div>
                        <div>
                          <h4 className="font-medium">Harvest</h4>
                          <p className="text-sm text-muted-foreground">{formatDate(selectedCrop.harvestDate)}</p>
                        </div>
                        <div className="ml-auto text-right">
                          <Badge variant={selectedCrop.progress >= 100 ? 'outline' : 'secondary'}>
                            {selectedCrop.progress >= 100 ? 'Completed' : 'Upcoming'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="growth" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <BarChart3Icon className="h-4 w-4 mr-2" />
                    Growth Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    {/* Chart for growth data */}
                    <div className="flex h-full">
                      {selectedCrop.stats.growth.map((data, index) => (
                        <div key={index} className="flex flex-col items-center justify-end flex-1 space-y-2">
                          <div 
                            className="w-6 bg-primary rounded-t-md transition-all duration-500"
                            style={{ height: `${(data.height / 75) * 100}%` }}
                          ></div>
                          <div className="text-xs">{data.week}</div>
                          <div className="text-xs font-medium">{data.height} cm</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Growth Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center p-4">
                      <div className="text-4xl font-bold text-primary mb-2">
                        {selectedCrop.stats.growth.length > 1 ? 
                          (selectedCrop.stats.growth[selectedCrop.stats.growth.length - 1].height / 
                           selectedCrop.stats.growth.length).toFixed(1) : 
                          "0.0"
                        } cm/week
                      </div>
                      <p className="text-muted-foreground">Average growth rate</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Optimal Conditions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Temperature: 20-28°C</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                        <span>Soil Moisture: 45-65%</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                        <span>Light: 6-8 hours direct sunlight</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="nutrition" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Nitrogen */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-center mb-4">Nitrogen (N)</h3>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-200 text-green-800">
                            {selectedCrop.stats.nutrients.nitrogen}%
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-green-800">
                            {selectedCrop.stats.nutrients.nitrogen < 40 ? 'Low' : 
                             selectedCrop.stats.nutrients.nitrogen > 70 ? 'High' : 
                             'Optimal'}
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                        <div style={{ width: `${selectedCrop.stats.nutrients.nitrogen}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Essential for leaf and stem growth
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Phosphorus */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-center mb-4">Phosphorus (P)</h3>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-blue-200 text-blue-800">
                            {selectedCrop.stats.nutrients.phosphorus}%
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-blue-800">
                            {selectedCrop.stats.nutrients.phosphorus < 40 ? 'Low' : 
                             selectedCrop.stats.nutrients.phosphorus > 70 ? 'High' : 
                             'Optimal'}
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                        <div style={{ width: `${selectedCrop.stats.nutrients.phosphorus}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Important for root development
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Potassium */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-center mb-4">Potassium (K)</h3>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-purple-200 text-purple-800">
                            {selectedCrop.stats.nutrients.potassium}%
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-purple-800">
                            {selectedCrop.stats.nutrients.potassium < 40 ? 'Low' : 
                             selectedCrop.stats.nutrients.potassium > 70 ? 'High' : 
                             'Optimal'}
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                        <div style={{ width: `${selectedCrop.stats.nutrients.potassium}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"></div>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Helps with drought resistance
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recommended Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {selectedCrop.stats.nutrients.nitrogen < 40 && (
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        </div>
                        <div>
                          <p className="font-medium">Apply nitrogen fertilizer</p>
                          <p className="text-sm text-muted-foreground">Nitrogen levels are below optimal range</p>
                        </div>
                      </li>
                    )}
                    
                    {selectedCrop.stats.nutrients.phosphorus < 40 && (
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                        </div>
                        <div>
                          <p className="font-medium">Apply phosphate fertilizer</p>
                          <p className="text-sm text-muted-foreground">Phosphorus levels are below optimal range</p>
                        </div>
                      </li>
                    )}
                    
                    {selectedCrop.stats.nutrients.potassium < 40 && (
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                        </div>
                        <div>
                          <p className="font-medium">Apply potassium fertilizer</p>
                          <p className="text-sm text-muted-foreground">Potassium levels are below optimal range</p>
                        </div>
                      </li>
                    )}
                    
                    {selectedCrop.stats.moisture < 35 && (
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                        </div>
                        <div>
                          <p className="font-medium">Increase irrigation</p>
                          <p className="text-sm text-muted-foreground">Soil moisture levels are below optimal range</p>
                        </div>
                      </li>
                    )}
                    
                    {selectedCrop.stats.moisture > 65 && (
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="h-2 w-2 rounded-full bg-red-500"></span>
                        </div>
                        <div>
                          <p className="font-medium">Reduce irrigation</p>
                          <p className="text-sm text-muted-foreground">Soil moisture levels are above optimal range</p>
                        </div>
                      </li>
                    )}
                    
                    {(selectedCrop.stats.nutrients.nitrogen >= 40 && 
                      selectedCrop.stats.nutrients.phosphorus >= 40 && 
                      selectedCrop.stats.nutrients.potassium >= 40 && 
                      selectedCrop.stats.moisture >= 35 && 
                      selectedCrop.stats.moisture <= 65) && (
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
                          <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        </div>
                        <div>
                          <p className="font-medium">Maintain current fertilization and irrigation</p>
                          <p className="text-sm text-muted-foreground">All nutrient and moisture levels are within optimal ranges</p>
                        </div>
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Crops;

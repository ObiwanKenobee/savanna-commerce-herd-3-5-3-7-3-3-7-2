import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEnterpriseTier } from "@/hooks/useEnterpriseTier";
import { TierRestriction } from "@/components/enterprise/TierRestriction";
import {
  Truck,
  Package,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Route,
  Gauge,
  Fuel,
  Users,
  Calendar,
  RefreshCw,
  Eye,
  Settings,
  Navigation,
  BarChart3,
  Zap,
  Shield,
  Globe,
  Activity,
  Timer,
  Phone,
  Mail,
} from "lucide-react";

interface LogisticsMetrics {
  totalVehicles: number;
  activeDeliveries: number;
  onTimePerformance: number;
  fuelEfficiency: number;
  customerSatisfaction: number;
  dailyRevenue: number;
  avgDeliveryTime: number;
}

interface Vehicle {
  id: string;
  type: "truck" | "van" | "motorcycle" | "bicycle";
  plateNumber: string;
  driver: string;
  status: "available" | "in-transit" | "maintenance" | "offline";
  currentLocation: string;
  fuelLevel: number;
  loadCapacity: number;
  currentLoad: number;
  nextMaintenance: string;
  dailyDeliveries: number;
}

interface Delivery {
  id: string;
  orderId: string;
  retailer: string;
  supplier: string;
  customer: string;
  address: string;
  status: "pending" | "picked-up" | "in-transit" | "delivered" | "failed";
  priority: "express" | "standard" | "economy";
  estimatedTime: string;
  actualTime?: string;
  driverName: string;
  vehicleId: string;
  packageCount: number;
  value: number;
}

interface Route {
  id: string;
  name: string;
  driverId: string;
  vehicleId: string;
  stops: number;
  totalDistance: number;
  estimatedDuration: number;
  status: "planned" | "active" | "completed" | "delayed";
  deliveries: string[];
  startTime: string;
  endTime?: string;
}

const LogisticsOperationsCenter: React.FC = () => {
  const { currentTier, hasAccess } = useEnterpriseTier();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTimeRange, setSelectedTimeRange] = useState("today");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [metrics, setMetrics] = useState<LogisticsMetrics>({
    totalVehicles: 87,
    activeDeliveries: 234,
    onTimePerformance: 94.2,
    fuelEfficiency: 78.5,
    customerSatisfaction: 96.8,
    dailyRevenue: 125000,
    avgDeliveryTime: 45,
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "V001",
      type: "truck",
      plateNumber: "KBZ 123A",
      driver: "Joseph Kimani",
      status: "in-transit",
      currentLocation: "Westlands",
      fuelLevel: 75,
      loadCapacity: 5000,
      currentLoad: 3200,
      nextMaintenance: "2024-02-15",
      dailyDeliveries: 12,
    },
    {
      id: "V002",
      type: "van",
      plateNumber: "KCA 456B",
      driver: "Grace Wanjiku",
      status: "available",
      currentLocation: "Industrial Area",
      fuelLevel: 45,
      loadCapacity: 2000,
      currentLoad: 0,
      nextMaintenance: "2024-02-20",
      dailyDeliveries: 8,
    },
    {
      id: "V003",
      type: "motorcycle",
      plateNumber: "KMDA 789C",
      driver: "Peter Ochieng",
      status: "in-transit",
      currentLocation: "CBD",
      fuelLevel: 90,
      loadCapacity: 50,
      currentLoad: 25,
      nextMaintenance: "2024-02-18",
      dailyDeliveries: 15,
    },
  ]);

  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: "D001",
      orderId: "ORD-2024-001",
      retailer: "Savanna Supermarket",
      supplier: "Fresh Produce Co.",
      customer: "John Mwangi",
      address: "Karen, Nairobi",
      status: "in-transit",
      priority: "express",
      estimatedTime: "14:30",
      driverName: "Joseph Kimani",
      vehicleId: "V001",
      packageCount: 3,
      value: 2500,
    },
    {
      id: "D002",
      orderId: "ORD-2024-002",
      retailer: "Urban Mart",
      supplier: "Dairy Pride Ltd",
      customer: "Mary Njeri",
      address: "Kilimani, Nairobi",
      status: "picked-up",
      priority: "standard",
      estimatedTime: "16:00",
      driverName: "Grace Wanjiku",
      vehicleId: "V002",
      packageCount: 1,
      value: 1200,
    },
  ]);

  const [routes, setRoutes] = useState<Route[]>([
    {
      id: "R001",
      name: "Westlands Circuit",
      driverId: "D001",
      vehicleId: "V001",
      stops: 8,
      totalDistance: 45,
      estimatedDuration: 180,
      status: "active",
      deliveries: ["D001", "D003", "D005"],
      startTime: "09:00",
    },
    {
      id: "R002",
      name: "Industrial Loop",
      driverId: "D002",
      vehicleId: "V002",
      stops: 5,
      totalDistance: 32,
      estimatedDuration: 120,
      status: "planned",
      deliveries: ["D002", "D004"],
      startTime: "14:00",
    },
  ]);

  if (!hasAccess("logistics")) {
    return (
      <TierRestriction
        title="Logistics Operations Center"
        description="Advanced logistics management and route optimization"
        requiredTier="gold"
        currentTier={currentTier}
        features={[
          "Real-time fleet tracking",
          "Route optimization engine",
          "Driver performance analytics",
          "Fuel management system",
          "Customer delivery notifications",
        ]}
        benefits={[
          "Reduce delivery costs by 25%",
          "Improve on-time delivery to 95%+",
          "Optimize fuel consumption",
          "Enhance customer satisfaction",
        ]}
      />
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
      case "delivered":
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-transit":
      case "active":
      case "picked-up":
        return "bg-blue-100 text-blue-800";
      case "maintenance":
      case "delayed":
        return "bg-yellow-100 text-yellow-800";
      case "offline":
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "express":
        return "bg-red-100 text-red-800";
      case "standard":
        return "bg-blue-100 text-blue-800";
      case "economy":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case "truck":
        return <Truck className="h-4 w-4" />;
      case "van":
        return <Package className="h-4 w-4" />;
      case "motorcycle":
        return <Zap className="h-4 w-4" />;
      case "bicycle":
        return <Activity className="h-4 w-4" />;
      default:
        return <Truck className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Truck className="h-8 w-8 text-orange-600" />
              Logistics Operations Center
            </h1>
            <p className="text-gray-600 mt-1">
              Manage fleet, optimize routes, and track deliveries across Kenya
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Select
              value={selectedTimeRange}
              onValueChange={setSelectedTimeRange}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => setLoading(!loading)}>
              <RefreshCw
                className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Fleet
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.totalVehicles}
                  </p>
                </div>
                <Truck className="h-8 w-8 text-orange-600" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Deliveries
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.activeDeliveries}
                  </p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+8% from yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    On-Time Performance
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.onTimePerformance}%
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="mt-2">
                <Progress value={metrics.onTimePerformance} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Daily Revenue
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    KSh {metrics.dailyRevenue.toLocaleString()}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+15% from last week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Fleet Overview</TabsTrigger>
            <TabsTrigger value="deliveries">Live Deliveries</TabsTrigger>
            <TabsTrigger value="routes">Route Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Fleet Overview */}
          <TabsContent value="overview" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Fleet Status</h2>
              <div className="flex gap-2">
                <Input
                  placeholder="Search vehicles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Fleet
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          {getVehicleIcon(vehicle.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {vehicle.plateNumber}
                          </h3>
                          <p className="text-gray-600">{vehicle.driver}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {vehicle.currentLocation}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                          <p className="text-sm text-gray-600">Status</p>
                          <Badge className={getStatusColor(vehicle.status)}>
                            {vehicle.status}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Fuel</p>
                          <div className="flex items-center gap-1">
                            <Fuel className="h-4 w-4 text-blue-500" />
                            <span className="font-semibold">
                              {vehicle.fuelLevel}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Load</p>
                          <div className="text-sm">
                            <span className="font-semibold">
                              {vehicle.currentLoad}
                            </span>
                            <span className="text-gray-500">
                              /{vehicle.loadCapacity} kg
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Daily Deliveries
                          </p>
                          <span className="font-semibold text-green-600">
                            {vehicle.dailyDeliveries}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Track
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Live Deliveries */}
          <TabsContent value="deliveries" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Live Delivery Tracking</h2>
              <Button>
                <Package className="h-4 w-4 mr-2" />
                New Delivery
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Driver</TableHead>
                      <TableHead>ETA</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deliveries.map((delivery) => (
                      <TableRow key={delivery.id}>
                        <TableCell className="font-medium">
                          {delivery.orderId}
                        </TableCell>
                        <TableCell>{delivery.customer}</TableCell>
                        <TableCell>{delivery.address}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(delivery.status)}>
                            {delivery.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getPriorityColor(delivery.priority)}
                          >
                            {delivery.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{delivery.driverName}</TableCell>
                        <TableCell className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          {delivery.estimatedTime}
                        </TableCell>
                        <TableCell>
                          KSh {delivery.value.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Route Management */}
          <TabsContent value="routes" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Route Optimization</h2>
              <Button>
                <Route className="h-4 w-4 mr-2" />
                Create Route
              </Button>
            </div>

            <div className="grid gap-4">
              {routes.map((route) => (
                <Card key={route.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <Route className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {route.name}
                          </h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {route.stops} stops
                            </span>
                            <span className="flex items-center gap-1">
                              <Navigation className="h-4 w-4" />
                              {route.totalDistance} km
                            </span>
                            <span className="flex items-center gap-1">
                              <Timer className="h-4 w-4" />
                              {route.estimatedDuration} min
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Badge className={getStatusColor(route.status)}>
                          {route.status}
                        </Badge>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Start Time</p>
                          <p className="font-semibold">{route.startTime}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-1" />
                          Optimize
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-4">
            <h2 className="text-xl font-semibold">Performance Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-blue-600" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>On-Time Delivery</span>
                      <span className="font-semibold">
                        {metrics.onTimePerformance}%
                      </span>
                    </div>
                    <Progress value={metrics.onTimePerformance} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Fuel Efficiency</span>
                      <span className="font-semibold">
                        {metrics.fuelEfficiency}%
                      </span>
                    </div>
                    <Progress value={metrics.fuelEfficiency} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Customer Satisfaction</span>
                      <span className="font-semibold">
                        {metrics.customerSatisfaction}%
                      </span>
                    </div>
                    <Progress value={metrics.customerSatisfaction} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    Cost Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Fuel Costs</p>
                      <p className="text-xl font-bold text-gray-900">
                        KSh 45,200
                      </p>
                      <p className="text-xs text-green-600">
                        -8% vs last month
                      </p>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Maintenance</p>
                      <p className="text-xl font-bold text-gray-900">
                        KSh 12,800
                      </p>
                      <p className="text-xs text-red-600">+12% vs last month</p>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Driver Wages</p>
                      <p className="text-xl font-bold text-gray-900">
                        KSh 89,500
                      </p>
                      <p className="text-xs text-blue-600">Stable</p>
                    </div>

                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Total Costs</p>
                      <p className="text-xl font-bold text-gray-900">
                        KSh 147,500
                      </p>
                      <p className="text-xs text-green-600">
                        -3% vs last month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LogisticsOperationsCenter;

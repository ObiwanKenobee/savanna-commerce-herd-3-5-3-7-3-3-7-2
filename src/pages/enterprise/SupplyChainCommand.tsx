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
import { serviceManager } from "@/services/ServiceManager";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import {
  Truck,
  Package,
  Factory,
  Users,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  Zap,
  Shield,
  Target,
  RefreshCw,
  Download,
  Eye,
  Settings,
  Phone,
  Mail,
  Calendar,
  Globe,
  Network,
  Gauge,
  Route,
  Container,
  Warehouse,
} from "lucide-react";

interface SupplyChainMetrics {
  totalSuppliers: number;
  activeShipments: number;
  inventoryValue: number;
  onTimeDelivery: number;
  qualityScore: number;
  costEfficiency: number;
  riskScore: number;
}

interface Supplier {
  id: string;
  name: string;
  location: string;
  category: string;
  performanceScore: number;
  riskLevel: "low" | "medium" | "high";
  contractValue: number;
  onTimeDelivery: number;
  qualityRating: number;
  status: "active" | "inactive" | "suspended";
}

interface Shipment {
  id: string;
  supplier: string;
  destination: string;
  product: string;
  status: "in-transit" | "delivered" | "delayed" | "customs";
  progress: number;
  estimatedDelivery: string;
  actualDelivery?: string;
  value: number;
  priority: "high" | "medium" | "low";
}

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minThreshold: number;
  maxCapacity: number;
  turnoverRate: number;
  lastRestocked: string;
  supplier: string;
  cost: number;
  status: "optimal" | "low" | "critical" | "excess";
}

interface RiskAlert {
  id: string;
  type: "supplier" | "logistics" | "quality" | "compliance";
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  affectedItems: string[];
  recommendedAction: string;
  timeline: string;
}

const SupplyChainCommand: React.FC = () => {
  const [timeframe, setTimeframe] = useState<string>("30d");
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const [metrics, setMetrics] = useState<SupplyChainMetrics>({
    totalSuppliers: 1247,
    activeShipments: 89,
    inventoryValue: 12450000,
    onTimeDelivery: 94.7,
    qualityScore: 97.2,
    costEfficiency: 87.9,
    riskScore: 23.4,
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: "sup_001",
      name: "African Agricultural Exports Ltd",
      location: "Nairobi, Kenya",
      category: "Food & Beverages",
      performanceScore: 96.5,
      riskLevel: "low",
      contractValue: 2450000,
      onTimeDelivery: 98.2,
      qualityRating: 4.8,
      status: "active",
    },
    {
      id: "sup_002",
      name: "Lagos Manufacturing Corp",
      location: "Lagos, Nigeria",
      category: "Consumer Goods",
      performanceScore: 87.3,
      riskLevel: "medium",
      contractValue: 1890000,
      onTimeDelivery: 89.7,
      qualityRating: 4.2,
      status: "active",
    },
    {
      id: "sup_003",
      name: "Cape Town Logistics Hub",
      location: "Cape Town, South Africa",
      category: "Electronics",
      performanceScore: 92.1,
      riskLevel: "low",
      contractValue: 3200000,
      onTimeDelivery: 94.8,
      qualityRating: 4.6,
      status: "active",
    },
  ]);

  const [shipments, setShipments] = useState<Shipment[]>([
    {
      id: "ship_001",
      supplier: "African Agricultural Exports Ltd",
      destination: "Mombasa Port",
      product: "Coffee Beans - Premium Grade",
      status: "in-transit",
      progress: 67,
      estimatedDelivery: "2024-01-25",
      value: 125000,
      priority: "high",
    },
    {
      id: "ship_002",
      supplier: "Lagos Manufacturing Corp",
      destination: "Accra Distribution Center",
      product: "Consumer Electronics",
      status: "customs",
      progress: 85,
      estimatedDelivery: "2024-01-23",
      value: 89000,
      priority: "medium",
    },
    {
      id: "ship_003",
      supplier: "Cape Town Logistics Hub",
      destination: "Johannesburg Warehouse",
      product: "Smartphone Components",
      status: "delivered",
      progress: 100,
      estimatedDelivery: "2024-01-20",
      actualDelivery: "2024-01-19",
      value: 156000,
      priority: "high",
    },
  ]);

  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: "inv_001",
      name: "Premium Coffee Beans",
      category: "Food & Beverages",
      currentStock: 2450,
      minThreshold: 1000,
      maxCapacity: 5000,
      turnoverRate: 12.4,
      lastRestocked: "2024-01-15",
      supplier: "African Agricultural Exports Ltd",
      cost: 45.5,
      status: "optimal",
    },
    {
      id: "inv_002",
      name: "Smartphone Batteries",
      category: "Electronics",
      currentStock: 450,
      minThreshold: 500,
      maxCapacity: 2000,
      turnoverRate: 8.7,
      lastRestocked: "2024-01-10",
      supplier: "Cape Town Logistics Hub",
      cost: 23.8,
      status: "low",
    },
    {
      id: "inv_003",
      name: "Bluetooth Speakers",
      category: "Consumer Electronics",
      currentStock: 89,
      minThreshold: 100,
      maxCapacity: 800,
      turnoverRate: 6.2,
      lastRestocked: "2024-01-08",
      supplier: "Lagos Manufacturing Corp",
      cost: 67.3,
      status: "critical",
    },
  ]);

  const [riskAlerts, setRiskAlerts] = useState<RiskAlert[]>([
    {
      id: "risk_001",
      type: "supplier",
      severity: "high",
      message: "Lagos Manufacturing Corp experiencing production delays",
      affectedItems: ["Bluetooth Speakers", "USB Cables", "Power Banks"],
      recommendedAction: "Contact supplier and activate backup sourcing",
      timeline: "Immediate action required",
    },
    {
      id: "risk_002",
      type: "logistics",
      severity: "medium",
      message: "Weather delays affecting East African shipping routes",
      affectedItems: ["Coffee Beans", "Tea Leaves"],
      recommendedAction: "Inform customers of potential 2-day delay",
      timeline: "Next 48 hours",
    },
    {
      id: "risk_003",
      type: "compliance",
      severity: "low",
      message: "New import regulations effective February 1st",
      affectedItems: ["Electronics", "Consumer Goods"],
      recommendedAction: "Update documentation and supplier contracts",
      timeline: "Within 2 weeks",
    },
  ]);

  useEffect(() => {
    loadSupplyChainData();
    const interval = setInterval(loadSupplyChainData, 180000); // Refresh every 3 minutes
    return () => clearInterval(interval);
  }, [timeframe, selectedFilter]);

  const loadSupplyChainData = async () => {
    setLoading(true);
    try {
      const data = await serviceManager.getSupplyChainInsights();
      // Process and update state with real data
    } catch (error) {
      console.error("Failed to load supply chain data:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderSupplyChainOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Total Suppliers
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {metrics.totalSuppliers}
                </p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12 this month
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Active Shipments
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {metrics.activeShipments}
                </p>
                <p className="text-xs text-blue-500 flex items-center mt-1">
                  <Activity className="h-3 w-3 mr-1" />
                  Real-time tracking
                </p>
              </div>
              <Truck className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  Inventory Value
                </p>
                <p className="text-2xl font-bold text-green-600">
                  ${(metrics.inventoryValue / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5.7% this quarter
                </p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  On-Time Delivery
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {metrics.onTimeDelivery}%
                </p>
                <p className="text-xs text-purple-500 flex items-center mt-1">
                  <Target className="h-3 w-3 mr-1" />
                  Target: 95%
                </p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Dashboard */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Supply Chain Performance</CardTitle>
            <CardDescription>
              Key performance indicators and trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Quality Score</span>
                <span className="font-semibold">{metrics.qualityScore}%</span>
              </div>
              <Progress value={metrics.qualityScore} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm">Cost Efficiency</span>
                <span className="font-semibold">{metrics.costEfficiency}%</span>
              </div>
              <Progress value={metrics.costEfficiency} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm">Risk Score</span>
                <span className="font-semibold text-green-600">
                  {metrics.riskScore}%
                </span>
              </div>
              <Progress value={100 - metrics.riskScore} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supply Chain Map</CardTitle>
            <CardDescription>
              Global supplier and logistics network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center">
                <Globe className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                <p className="text-slate-600">Interactive supply chain map</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSupplierManagement = () => (
    <div className="space-y-4">
      {suppliers.map((supplier) => (
        <Card key={supplier.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{supplier.name}</CardTitle>
                <CardDescription className="flex items-center space-x-2 mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{supplier.location}</span>
                  <Badge variant="outline">{supplier.category}</Badge>
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    supplier.riskLevel === "low"
                      ? "default"
                      : supplier.riskLevel === "medium"
                        ? "outline"
                        : "destructive"
                  }
                >
                  {supplier.riskLevel.toUpperCase()} RISK
                </Badge>
                <Badge
                  variant={
                    supplier.status === "active"
                      ? "default"
                      : supplier.status === "inactive"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {supplier.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">
                  {supplier.performanceScore}
                </div>
                <div className="text-xs text-slate-600">Performance</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">
                  ${(supplier.contractValue / 1000000).toFixed(1)}M
                </div>
                <div className="text-xs text-slate-600">Contract Value</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">
                  {supplier.onTimeDelivery}%
                </div>
                <div className="text-xs text-slate-600">On-Time</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-lg font-bold text-yellow-600">
                  {supplier.qualityRating}/5
                </div>
                <div className="text-xs text-slate-600">Quality</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-lg font-bold text-red-600">
                  {supplier.riskLevel === "low"
                    ? "5"
                    : supplier.riskLevel === "medium"
                      ? "15"
                      : "35"}
                  %
                </div>
                <div className="text-xs text-slate-600">Risk Score</div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Contact
              </Button>
              <Button size="sm" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Performance
              </Button>
              <Button size="sm" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Manage
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderShipmentTracking = () => (
    <div className="space-y-4">
      {shipments.map((shipment) => (
        <Card key={shipment.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <span>{shipment.product}</span>
                  <Badge
                    variant={
                      shipment.priority === "high"
                        ? "destructive"
                        : shipment.priority === "medium"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {shipment.priority.toUpperCase()}
                  </Badge>
                </CardTitle>
                <CardDescription className="mt-1">
                  From: {shipment.supplier} → To: {shipment.destination}
                </CardDescription>
              </div>
              <Badge
                variant={
                  shipment.status === "delivered"
                    ? "default"
                    : shipment.status === "in-transit"
                      ? "outline"
                      : shipment.status === "delayed"
                        ? "destructive"
                        : "secondary"
                }
              >
                {shipment.status.replace("-", " ").toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">{shipment.progress}%</span>
              </div>
              <Progress value={shipment.progress} className="h-3" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-slate-600">Value</span>
                  <div className="font-semibold">
                    ${shipment.value.toLocaleString()}
                  </div>
                </div>
                <div>
                  <span className="text-slate-600">Estimated Delivery</span>
                  <div className="font-semibold">
                    {shipment.estimatedDelivery}
                  </div>
                </div>
                {shipment.actualDelivery && (
                  <div>
                    <span className="text-slate-600">Actual Delivery</span>
                    <div className="font-semibold text-green-600">
                      {shipment.actualDelivery}
                    </div>
                  </div>
                )}
                <div>
                  <span className="text-slate-600">Status</span>
                  <div className="font-semibold capitalize">
                    {shipment.status.replace("-", " ")}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Route className="h-4 w-4 mr-2" />
                  Track Route
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                {shipment.status === "delayed" && (
                  <Button
                    size="sm"
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Escalate
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderInventoryManagement = () => (
    <div className="space-y-4">
      {inventory.map((item) => (
        <Card
          key={item.id}
          className={`hover:shadow-md transition-shadow ${
            item.status === "critical"
              ? "border-red-200 bg-red-50"
              : item.status === "low"
                ? "border-yellow-200 bg-yellow-50"
                : item.status === "excess"
                  ? "border-blue-200 bg-blue-50"
                  : "border-green-200 bg-green-50"
          }`}
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <CardDescription className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline">{item.category}</Badge>
                  <span>Supplier: {item.supplier}</span>
                </CardDescription>
              </div>
              <Badge
                variant={
                  item.status === "optimal"
                    ? "default"
                    : item.status === "low"
                      ? "outline"
                      : item.status === "critical"
                        ? "destructive"
                        : "secondary"
                }
              >
                {item.status.toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span>Stock Level</span>
                <span className="font-medium">
                  {item.currentStock} / {item.maxCapacity} units
                </span>
              </div>
              <Progress
                value={(item.currentStock / item.maxCapacity) * 100}
                className="h-3"
              />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-slate-600">Current Stock</span>
                  <div className="font-semibold">{item.currentStock} units</div>
                </div>
                <div>
                  <span className="text-slate-600">Min Threshold</span>
                  <div className="font-semibold">{item.minThreshold} units</div>
                </div>
                <div>
                  <span className="text-slate-600">Turnover Rate</span>
                  <div className="font-semibold">{item.turnoverRate}x/year</div>
                </div>
                <div>
                  <span className="text-slate-600">Unit Cost</span>
                  <div className="font-semibold">${item.cost}</div>
                </div>
              </div>

              {item.status === "critical" && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Critical Stock Level</AlertTitle>
                  <AlertDescription>
                    Stock is below minimum threshold. Immediate reordering
                    required.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Package className="h-4 w-4 mr-2" />
                  Reorder
                </Button>
                <Button size="sm" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
                <Button size="sm" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderRiskManagement = () => (
    <div className="space-y-4">
      {riskAlerts.map((alert) => (
        <Alert
          key={alert.id}
          className={
            alert.severity === "critical"
              ? "border-red-200 bg-red-50"
              : alert.severity === "high"
                ? "border-orange-200 bg-orange-50"
                : alert.severity === "medium"
                  ? "border-yellow-200 bg-yellow-50"
                  : "border-blue-200 bg-blue-50"
          }
        >
          <div className="flex items-start space-x-3">
            {alert.severity === "critical" && (
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            )}
            {alert.severity === "high" && (
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
            )}
            {alert.severity === "medium" && (
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            )}
            {alert.severity === "low" && (
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            )}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <AlertTitle className="text-base font-semibold">
                  {alert.message}
                </AlertTitle>
                <Badge
                  variant={
                    alert.severity === "critical"
                      ? "destructive"
                      : alert.severity === "high"
                        ? "destructive"
                        : alert.severity === "medium"
                          ? "outline"
                          : "secondary"
                  }
                >
                  {alert.severity.toUpperCase()}
                </Badge>
              </div>
              <AlertDescription className="space-y-2">
                <div>
                  <strong>Affected Items:</strong>{" "}
                  {alert.affectedItems.join(", ")}
                </div>
                <div>
                  <strong>Recommended Action:</strong> {alert.recommendedAction}
                </div>
                <div>
                  <strong>Timeline:</strong> {alert.timeline}
                </div>
              </AlertDescription>
              <div className="flex space-x-2 mt-3">
                <Button
                  size="sm"
                  className={
                    alert.severity === "critical" || alert.severity === "high"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }
                >
                  Take Action
                </Button>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
        </Alert>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <EnhancedNavigation />

      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 flex items-center space-x-3">
                  <Network className="h-8 w-8 text-blue-600" />
                  <span>Supply Chain Command Center</span>
                </h1>
                <p className="text-slate-600 mt-1">
                  End-to-end supply chain visibility and operational control
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Last 24 hours</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last quarter</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={loadSupplyChainData}
                  disabled={loading}
                >
                  <RefreshCw
                    className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Main Dashboard */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
              <TabsTrigger value="shipments">Shipments</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="risks">Risk Management</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              {renderSupplyChainOverview()}
            </TabsContent>

            <TabsContent value="suppliers">
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">Supplier Management</h2>
                  <p className="text-slate-600">
                    Monitor and manage supplier relationships and performance
                  </p>
                </div>
                {renderSupplierManagement()}
              </div>
            </TabsContent>

            <TabsContent value="shipments">
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">Shipment Tracking</h2>
                  <p className="text-slate-600">
                    Real-time tracking of all active shipments
                  </p>
                </div>
                {renderShipmentTracking()}
              </div>
            </TabsContent>

            <TabsContent value="inventory">
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">
                    Inventory Management
                  </h2>
                  <p className="text-slate-600">
                    Monitor stock levels and optimize inventory
                  </p>
                </div>
                {renderInventoryManagement()}
              </div>
            </TabsContent>

            <TabsContent value="risks">
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">Risk Management</h2>
                  <p className="text-slate-600">
                    Proactive risk identification and mitigation
                  </p>
                </div>
                {renderRiskManagement()}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default SupplyChainCommand;

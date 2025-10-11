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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEnterpriseTier } from "@/hooks/useEnterpriseTier";
import { TierRestriction } from "@/components/enterprise/TierRestriction";
import {
  Factory,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Plus,
  Eye,
  Edit,
  Settings,
  Download,
  RefreshCw,
  Shield,
  Award,
  Target,
  Zap,
} from "lucide-react";

interface SupplierMetrics {
  totalSuppliers: number;
  activeSuppliers: number;
  pendingApprovals: number;
  totalPurchaseValue: number;
  avgDeliveryTime: number;
  qualityScore: number;
  onTimeDelivery: number;
}

interface Supplier {
  id: string;
  name: string;
  category: string;
  location: string;
  status: "active" | "pending" | "suspended" | "inactive";
  rating: number;
  totalOrders: number;
  monthlyVolume: number;
  onTimeDelivery: number;
  qualityScore: number;
  contractValue: number;
  joinDate: string;
  lastOrder: string;
  contact: {
    email: string;
    phone: string;
    manager: string;
  };
  capabilities: string[];
  certifications: string[];
  riskLevel: "low" | "medium" | "high";
}

interface Product {
  id: string;
  name: string;
  supplierId: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
  lastUpdated: string;
  popularity: number;
}

interface Performance {
  supplierId: string;
  month: string;
  orders: number;
  revenue: number;
  onTimeDelivery: number;
  qualityScore: number;
  customerSatisfaction: number;
}

const SupplierManagementPortal: React.FC = () => {
  const { currentTier, hasAccess } = useEnterpriseTier();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const [metrics, setMetrics] = useState<SupplierMetrics>({
    totalSuppliers: 145,
    activeSuppliers: 132,
    pendingApprovals: 8,
    totalPurchaseValue: 2400000,
    avgDeliveryTime: 2.3,
    qualityScore: 94.2,
    onTimeDelivery: 91.8,
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: "SUP001",
      name: "Fresh Harvest Kenya",
      category: "Fresh Produce",
      location: "Nakuru",
      status: "active",
      rating: 4.8,
      totalOrders: 234,
      monthlyVolume: 45000,
      onTimeDelivery: 96.5,
      qualityScore: 98.2,
      contractValue: 180000,
      joinDate: "2023-03-15",
      lastOrder: "2024-01-20",
      contact: {
        email: "orders@freshharvest.co.ke",
        phone: "+254701234567",
        manager: "Samuel Kariuki",
      },
      capabilities: ["Organic Certified", "Cold Chain", "Export Quality"],
      certifications: ["HACCP", "GlobalGAP", "Organic"],
      riskLevel: "low",
    },
    {
      id: "SUP002",
      name: "Savanna Dairy Co-op",
      category: "Dairy Products",
      location: "Eldoret",
      status: "active",
      rating: 4.6,
      totalOrders: 189,
      monthlyVolume: 32000,
      onTimeDelivery: 89.3,
      qualityScore: 95.1,
      contractValue: 220000,
      joinDate: "2023-01-10",
      lastOrder: "2024-01-19",
      contact: {
        email: "supply@savannadairy.co.ke",
        phone: "+254722345678",
        manager: "Grace Wanjiku",
      },
      capabilities: ["UHT Processing", "Packaging", "Quality Testing"],
      certifications: ["ISO 22000", "KEBS", "Halal"],
      riskLevel: "low",
    },
    {
      id: "SUP003",
      name: "Urban Spice Masters",
      category: "Spices & Herbs",
      location: "Mombasa",
      status: "pending",
      rating: 4.4,
      totalOrders: 76,
      monthlyVolume: 12000,
      onTimeDelivery: 85.2,
      qualityScore: 92.8,
      contractValue: 65000,
      joinDate: "2023-11-20",
      lastOrder: "2024-01-18",
      contact: {
        email: "info@urbanspice.co.ke",
        phone: "+254733456789",
        manager: "Ahmed Hassan",
      },
      capabilities: ["Traditional Processing", "Custom Blends", "Packaging"],
      certifications: ["KEBS", "Organic"],
      riskLevel: "medium",
    },
  ]);

  const [products, setProducts] = useState<Product[]>([
    {
      id: "PRD001",
      name: "Premium Avocados",
      supplierId: "SUP001",
      category: "Fresh Produce",
      price: 25,
      stock: 2500,
      unit: "kg",
      lastUpdated: "2024-01-20",
      popularity: 95,
    },
    {
      id: "PRD002",
      name: "Organic Milk",
      supplierId: "SUP002",
      category: "Dairy Products",
      price: 80,
      stock: 500,
      unit: "liter",
      lastUpdated: "2024-01-19",
      popularity: 88,
    },
  ]);

  if (!hasAccess("suppliers")) {
    return (
      <TierRestriction
        title="Supplier Management Portal"
        description="Comprehensive supplier relationship management and vendor optimization"
        requiredTier="silver"
        currentTier={currentTier}
        features={[
          "Supplier onboarding & verification",
          "Performance tracking & analytics",
          "Contract management",
          "Quality assessment tools",
          "Payment processing integration",
        ]}
        benefits={[
          "Reduce procurement costs by 15%",
          "Improve supplier performance",
          "Streamline vendor relationships",
          "Ensure quality compliance",
        ]}
      />
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || supplier.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" || supplier.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = Array.from(new Set(suppliers.map((s) => s.category)));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Factory className="h-8 w-8 text-green-600" />
              Supplier Management Portal
            </h1>
            <p className="text-gray-600 mt-1">
              Manage vendor relationships and optimize your supply chain
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Supplier
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Data
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
                    Total Suppliers
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.totalSuppliers}
                  </p>
                </div>
                <Factory className="h-8 w-8 text-green-600" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+12 new this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Suppliers
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.activeSuppliers}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-gray-600">
                  {metrics.pendingApprovals} pending approval
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Purchase Value
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    KSh {(metrics.totalPurchaseValue / 1000000).toFixed(1)}M
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+18% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Avg Quality Score
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {metrics.qualityScore}%
                  </p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="mt-2">
                <Progress value={metrics.qualityScore} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Supplier Directory</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="products">Product Catalog</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Supplier Directory */}
          <TabsContent value="overview" className="space-y-4">
            <div className="flex gap-4 items-center">
              <Input
                placeholder="Search suppliers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Monthly Volume</TableHead>
                      <TableHead>On-Time Delivery</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSuppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{supplier.name}</p>
                            <p className="text-sm text-gray-600">
                              {supplier.contact.manager}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{supplier.category}</TableCell>
                        <TableCell className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {supplier.location}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(supplier.status)}>
                            {supplier.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          {supplier.rating}
                        </TableCell>
                        <TableCell>
                          KSh {supplier.monthlyVolume.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{supplier.onTimeDelivery}%</span>
                            <Progress
                              value={supplier.onTimeDelivery}
                              className="w-16 h-2"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRiskColor(supplier.riskLevel)}>
                            {supplier.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedSupplier(supplier);
                                setIsDetailsDialogOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
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

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4">
            <h2 className="text-xl font-semibold">
              Supplier Performance Dashboard
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suppliers.slice(0, 6).map((supplier) => (
                <Card key={supplier.id}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      {supplier.name}
                      <Badge className={getStatusColor(supplier.status)}>
                        {supplier.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{supplier.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Rating</p>
                        <p className="text-xl font-bold text-yellow-600">
                          {supplier.rating}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Orders</p>
                        <p className="text-xl font-bold text-blue-600">
                          {supplier.totalOrders}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">On-Time Delivery</span>
                        <span className="text-sm font-semibold">
                          {supplier.onTimeDelivery}%
                        </span>
                      </div>
                      <Progress value={supplier.onTimeDelivery} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Quality Score</span>
                        <span className="text-sm font-semibold">
                          {supplier.qualityScore}%
                        </span>
                      </div>
                      <Progress value={supplier.qualityScore} />
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Report
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Phone className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Product Catalog */}
          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Product Catalog</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Popularity</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => {
                      const supplier = suppliers.find(
                        (s) => s.id === product.supplierId,
                      );
                      return (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell>{supplier?.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>
                            KSh {product.price}/{product.unit}
                          </TableCell>
                          <TableCell>
                            {product.stock} {product.unit}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{product.popularity}%</span>
                              <Progress
                                value={product.popularity}
                                className="w-16 h-2"
                              />
                            </div>
                          </TableCell>
                          <TableCell>{product.lastUpdated}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-4">
            <h2 className="text-xl font-semibold">Supplier Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Average On-Time Delivery</span>
                      <span className="font-semibold">
                        {metrics.onTimeDelivery}%
                      </span>
                    </div>
                    <Progress value={metrics.onTimeDelivery} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Quality Score</span>
                      <span className="font-semibold">
                        {metrics.qualityScore}%
                      </span>
                    </div>
                    <Progress value={metrics.qualityScore} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Avg Delivery Time</p>
                      <p className="text-xl font-bold text-blue-600">
                        {metrics.avgDeliveryTime} days
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Cost Savings</p>
                      <p className="text-xl font-bold text-green-600">15.2%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Low Risk Suppliers</span>
                      <Badge className="bg-green-100 text-green-800">
                        {suppliers.filter((s) => s.riskLevel === "low").length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Medium Risk Suppliers</span>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        {
                          suppliers.filter((s) => s.riskLevel === "medium")
                            .length
                        }
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>High Risk Suppliers</span>
                      <Badge className="bg-red-100 text-red-800">
                        {suppliers.filter((s) => s.riskLevel === "high").length}
                      </Badge>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">
                      Risk Mitigation Actions
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />2
                        suppliers need contract renewal
                      </p>
                      <p className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-500" />5 pending
                        quality audits
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-orange-500" />3 overdue
                        performance reviews
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Supplier Details Dialog */}
        <Dialog
          open={isDetailsDialogOpen}
          onOpenChange={setIsDetailsDialogOpen}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedSupplier && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <Factory className="h-6 w-6 text-green-600" />
                    {selectedSupplier.name}
                  </DialogTitle>
                  <DialogDescription>
                    Comprehensive supplier profile and performance details
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">
                        Contact Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {selectedSupplier.contact.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          {selectedSupplier.contact.phone}
                        </p>
                        <p className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          {selectedSupplier.contact.manager}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {selectedSupplier.location}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Capabilities</h3>
                      <div className="flex flex-wrap gap-1">
                        {selectedSupplier.capabilities.map(
                          (capability, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {capability}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Certifications</h3>
                      <div className="flex flex-wrap gap-1">
                        {selectedSupplier.certifications.map((cert, index) => (
                          <Badge
                            key={index}
                            className="text-xs bg-green-100 text-green-800"
                          >
                            <Shield className="h-3 w-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">
                        Performance Metrics
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Rating</span>
                            <span className="text-sm font-semibold">
                              {selectedSupplier.rating}/5.0
                            </span>
                          </div>
                          <Progress value={selectedSupplier.rating * 20} />
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">On-Time Delivery</span>
                            <span className="text-sm font-semibold">
                              {selectedSupplier.onTimeDelivery}%
                            </span>
                          </div>
                          <Progress value={selectedSupplier.onTimeDelivery} />
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Quality Score</span>
                            <span className="text-sm font-semibold">
                              {selectedSupplier.qualityScore}%
                            </span>
                          </div>
                          <Progress value={selectedSupplier.qualityScore} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Business Metrics</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600">Total Orders</p>
                          <p className="text-lg font-bold text-blue-600">
                            {selectedSupplier.totalOrders}
                          </p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600">
                            Monthly Volume
                          </p>
                          <p className="text-lg font-bold text-green-600">
                            KSh{" "}
                            {(selectedSupplier.monthlyVolume / 1000).toFixed(0)}
                            K
                          </p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600">
                            Contract Value
                          </p>
                          <p className="text-lg font-bold text-purple-600">
                            KSh{" "}
                            {(selectedSupplier.contractValue / 1000).toFixed(0)}
                            K
                          </p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600">Risk Level</p>
                          <Badge
                            className={getRiskColor(selectedSupplier.riskLevel)}
                          >
                            {selectedSupplier.riskLevel}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Supplier
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SupplierManagementPortal;

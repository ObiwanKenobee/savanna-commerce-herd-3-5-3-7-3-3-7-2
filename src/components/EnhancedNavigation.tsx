import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  ShoppingCart,
  User,
  Settings,
  LogOut,
  Package,
  BarChart3,
  Users,
  Truck,
  Bell,
  Search,
  MapPin,
} from "lucide-react";
import { ShoppingCart as ShoppingCartComponent } from "@/components/marketplace/ShoppingCart";

const EnhancedNavigation = () => {
  const { user, profile, signOut } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Marketplace", href: "/marketplace", icon: Package },
    { name: "Orders", href: "/orders", icon: Truck },
    { name: "Products", href: "/products", icon: Package },
    { name: "Pricing", href: "/pricing", icon: Settings },
    { name: "Enterprise", href: "/enterprise", icon: Users },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Partners", href: "/partners", icon: Users },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center min-w-0">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div className="ml-2 hidden sm:block">
                <span className="text-xl font-bold text-gray-900">Savanna</span>
                <span className="ml-1 text-sm text-gray-600">Marketplace</span>
              </div>
              <div className="ml-2 sm:hidden">
                <span className="text-lg font-bold text-gray-900">Savanna</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {navigationItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActiveRoute(item.href)
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden xl:inline">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Search - hidden on mobile */}
            <Button variant="ghost" size="sm" className="hidden xl:flex">
              <Search className="h-4 w-4" />
              <span className="ml-2">Search</span>
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative hidden sm:flex"
            >
              <Bell className="h-4 w-4" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs"
              >
                3
              </Badge>
            </Button>

            {/* Shopping Cart */}
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {cart.totalItems > 0 && (
                    <Badge
                      variant="default"
                      className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs"
                    >
                      {cart.totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[90vw] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Shopping Cart</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <ShoppingCartComponent onClose={() => setIsCartOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile?.avatar_url} />
                      <AvatarFallback>
                        {profile?.full_name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-32">
                        {profile?.full_name || "User"}
                      </div>
                      <div className="text-xs text-gray-500 truncate max-w-32">
                        {profile?.organization?.name}
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">
                        {profile?.full_name || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {profile?.organization?.country}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/orders")}>
                    <Package className="mr-2 h-4 w-4" />
                    <span>My Orders</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  {profile?.role === "admin" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => navigate("/admin/dashboard")}
                      >
                        <span className="mr-2">👑</span>
                        <span>Admin Panel</span>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/auth")}
                  className="hidden sm:flex"
                >
                  Sign In
                </Button>
                <Button size="sm" onClick={() => navigate("/auth")}>
                  <span className="sm:hidden">Login</span>
                  <span className="hidden sm:inline">Sign Up</span>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[320px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold text-xs">S</span>
                    </div>
                    <span>Savanna Menu</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-1">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full ${
                          isActiveRoute(item.href)
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}

                  {/* Mobile-only quick actions */}
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-2">
                      Quick Actions
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start px-4 py-3 h-auto"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsCartOpen(true);
                      }}
                    >
                      <ShoppingCart className="h-5 w-5 mr-3" />
                      <span>Shopping Cart</span>
                      {cart.totalItems > 0 && (
                        <Badge className="ml-auto" variant="default">
                          {cart.totalItems}
                        </Badge>
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start px-4 py-3 h-auto"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate("/notifications");
                      }}
                    >
                      <Bell className="h-5 w-5 mr-3" />
                      <span>Notifications</span>
                      <Badge className="ml-auto" variant="destructive">
                        3
                      </Badge>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EnhancedNavigation;

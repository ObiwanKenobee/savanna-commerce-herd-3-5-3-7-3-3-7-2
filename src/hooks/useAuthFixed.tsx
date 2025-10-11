import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Safe error handling for optional dependencies
const safeImport = (moduleId: string, fallback: any) => {
  try {
    return require(moduleId);
  } catch (error) {
    console.warn(`Optional module ${moduleId} not available:`, error);
    return fallback;
  }
};

// Safe imports with fallbacks
const { toast } = safeImport("@/components/ui/use-toast", {
  toast: ({ title, description }: any) =>
    console.log(`Toast: ${title} - ${description}`),
});

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

interface Profile {
  id?: string;
  organization?: {
    tier?: string;
    name?: string;
  };
  preferences?: Record<string, any>;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  demoLogin: (
    userType: "retailer" | "supplier" | "logistics" | "admin",
  ) => Promise<void>;
  authError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Initialize auth state
  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("savanna_user");
    const storedProfile = localStorage.getItem("savanna_profile");

    if (storedUser && storedProfile) {
      try {
        setUser(JSON.parse(storedUser));
        setProfile(JSON.parse(storedProfile));
      } catch (error) {
        console.error("Error parsing stored auth data:", error);
        localStorage.removeItem("savanna_user");
        localStorage.removeItem("savanna_profile");
      }
    }

    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setAuthError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful login
      const mockUser: User = {
        id: "1",
        email,
        name: email.split("@")[0],
        role: "user",
      };

      const mockProfile: Profile = {
        id: "1",
        organization: {
          tier: "silver",
          name: "Demo Organization",
        },
        preferences: {},
      };

      setUser(mockUser);
      setProfile(mockProfile);

      // Store in localStorage
      localStorage.setItem("savanna_user", JSON.stringify(mockUser));
      localStorage.setItem("savanna_profile", JSON.stringify(mockProfile));

      toast({
        title: "Success",
        description: "Welcome back to Savanna Marketplace!",
      });
    } catch (error) {
      setAuthError("Invalid credentials");
      toast({
        title: "Error",
        description: "Failed to sign in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    email: string,
    password: string,
    name?: string,
  ): Promise<void> => {
    setLoading(true);
    setAuthError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful signup
      const mockUser: User = {
        id: "1",
        email,
        name: name || email.split("@")[0],
        role: "user",
      };

      const mockProfile: Profile = {
        id: "1",
        organization: {
          tier: "silver",
          name: "New Organization",
        },
        preferences: {},
      };

      setUser(mockUser);
      setProfile(mockProfile);

      // Store in localStorage
      localStorage.setItem("savanna_user", JSON.stringify(mockUser));
      localStorage.setItem("savanna_profile", JSON.stringify(mockProfile));

      toast({
        title: "Success",
        description: "Account created successfully!",
      });
    } catch (error) {
      setAuthError("Failed to create account");
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setLoading(true);

    try {
      // Clear state
      setUser(null);
      setProfile(null);
      setAuthError(null);

      // Clear localStorage
      localStorage.removeItem("savanna_user");
      localStorage.removeItem("savanna_profile");

      toast({
        title: "Success",
        description: "Signed out successfully",
      });
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = async (
    userType: "retailer" | "supplier" | "logistics" | "admin",
  ): Promise<void> => {
    setLoading(true);
    setAuthError(null);

    try {
      const demoUsers = {
        retailer: {
          id: "demo_retailer",
          email: "retailer@demo.savanna.ke",
          name: "Demo Retailer",
          role: "retailer",
        },
        supplier: {
          id: "demo_supplier",
          email: "supplier@demo.savanna.ke",
          name: "Demo Supplier",
          role: "supplier",
        },
        logistics: {
          id: "demo_logistics",
          email: "logistics@demo.savanna.ke",
          name: "Demo Logistics",
          role: "logistics",
        },
        admin: {
          id: "demo_admin",
          email: "admin@demo.savanna.ke",
          name: "Demo Admin",
          role: "admin",
        },
      };

      const demoUser = demoUsers[userType];
      const demoProfile: Profile = {
        id: demoUser.id,
        organization: {
          tier: userType === "admin" ? "platinum" : "gold",
          name: `Demo ${userType.charAt(0).toUpperCase() + userType.slice(1)} Organization`,
        },
        preferences: {
          demoMode: true,
          userType,
        },
      };

      setUser(demoUser);
      setProfile(demoProfile);

      // Store in localStorage
      localStorage.setItem("savanna_user", JSON.stringify(demoUser));
      localStorage.setItem("savanna_profile", JSON.stringify(demoProfile));

      toast({
        title: "Demo Mode Active",
        description: `Logged in as demo ${userType}`,
      });
    } catch (error) {
      setAuthError("Demo login failed");
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    demoLogin,
    authError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

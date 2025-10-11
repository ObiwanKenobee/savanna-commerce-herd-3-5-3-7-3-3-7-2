import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (email: string, password: string, name?: string) => Promise<boolean>;
  loading: boolean;
  isAuthenticated: boolean;
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

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("savanna_user");
    const savedProfile = localStorage.getItem("savanna_profile");

    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);

        if (savedProfile) {
          const profileData = JSON.parse(savedProfile);
          setProfile(profileData);
        } else {
          // Create default profile
          const defaultProfile: Profile = {
            id: userData.id,
            organization: {
              tier: "none",
              name: "Default Organization",
            },
            preferences: {},
          };
          setProfile(defaultProfile);
          localStorage.setItem(
            "savanna_profile",
            JSON.stringify(defaultProfile),
          );
        }
      } catch (error) {
        console.error("Failed to parse saved user data:", error);
        localStorage.removeItem("savanna_user");
        localStorage.removeItem("savanna_profile");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);

    try {
      // Simple mock authentication for now
      if (email && password) {
        const userData: User = {
          id: Date.now().toString(),
          email,
          name: email.split("@")[0],
          role: "user",
        };

        const profileData: Profile = {
          id: userData.id,
          organization: {
            tier: "none",
            name: "Default Organization",
          },
          preferences: {},
        };

        setUser(userData);
        setProfile(profileData);
        localStorage.setItem("savanna_user", JSON.stringify(userData));
        localStorage.setItem("savanna_profile", JSON.stringify(profileData));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (
    email: string,
    password: string,
    name?: string,
  ): Promise<boolean> => {
    setLoading(true);

    try {
      // Simple mock signup for now
      if (email && password) {
        const userData: User = {
          id: Date.now().toString(),
          email,
          name: name || email.split("@")[0],
          role: "user",
        };

        const profileData: Profile = {
          id: userData.id,
          organization: {
            tier: "none",
            name: "Default Organization",
          },
          preferences: {},
        };

        setUser(userData);
        setProfile(profileData);
        localStorage.setItem("savanna_user", JSON.stringify(userData));
        localStorage.setItem("savanna_profile", JSON.stringify(profileData));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem("savanna_user");
    localStorage.removeItem("savanna_profile");
  };

  const value: AuthContextType = {
    user,
    profile,
    login,
    logout,
    signup,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

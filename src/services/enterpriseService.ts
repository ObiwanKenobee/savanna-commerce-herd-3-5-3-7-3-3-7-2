import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1";

interface EnterpriseOnboardingData {
  companyInfo: {
    companyName: string;
    industry: string;
    revenue: string;
    employees: string;
    headquarters?: string;
    website?: string;
    description?: string;
  };
  contactInfo: {
    primaryContact: {
      name: string;
      title: string;
      email: string;
      phone?: string;
    };
    technicalContact: {
      name: string;
      title: string;
      email: string;
      phone?: string;
    };
    executiveContact: {
      name?: string;
      title?: string;
      email?: string;
      phone?: string;
    };
  };
  requirementsInfo: {
    transactionVolume: string;
    integrationNeeds: string[];
    complianceRequirements: string[];
    timeline: string;
    budget?: string;
    specificNeeds?: string;
  };
  selectedTier: "silver" | "gold" | "platinum";
}

interface PricingCalculatorData {
  annualVolume: number;
  tier: "silver" | "gold" | "platinum";
  addons?: string[];
  timeline?: string;
}

interface ConsultationRequest {
  type: string;
  details: any;
  preferredTime?: string;
  urgency?: "low" | "medium" | "high";
}

class EnterpriseService {
  private api = axios.create({
    baseURL: `${API_BASE_URL}/enterprise`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  constructor() {
    // Add request interceptor to include auth token
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error("Enterprise API Error:", error);
        throw error;
      },
    );
  }

  // Submit enterprise onboarding
  async submitOnboarding(data: EnterpriseOnboardingData) {
    try {
      const response = await this.api.post("/onboarding", data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to submit enterprise onboarding");
    }
  }

  // Calculate enterprise pricing
  async calculatePricing(data: PricingCalculatorData) {
    try {
      const response = await this.api.post("/pricing-calculator", data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to calculate enterprise pricing");
    }
  }

  // Get dashboard metrics
  async getDashboardMetrics(timeframe: string = "30d") {
    try {
      const response = await this.api.get(
        `/dashboard/metrics?timeframe=${timeframe}`,
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch dashboard metrics");
    }
  }

  // Get upsell opportunities
  async getUpsellOpportunities() {
    try {
      const response = await this.api.get("/upsell-opportunities");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch upsell opportunities");
    }
  }

  // Request consultation
  async requestConsultation(data: ConsultationRequest) {
    try {
      const response = await this.api.post("/consultation-request", data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to request consultation");
    }
  }

  // Get enterprise account details
  async getAccountDetails() {
    try {
      const response = await this.api.get("/account-details");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch account details");
    }
  }

  // Update enterprise configuration
  async updateConfiguration(config: any) {
    try {
      const response = await this.api.put("/configuration", config);
      return response.data;
    } catch (error) {
      throw new Error("Failed to update configuration");
    }
  }

  // Get usage analytics
  async getUsageAnalytics(period: string = "30d") {
    try {
      const response = await this.api.get(`/usage-analytics?period=${period}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch usage analytics");
    }
  }

  // Get billing information
  async getBillingInfo() {
    try {
      const response = await this.api.get("/billing-info");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch billing information");
    }
  }

  // Request tier upgrade
  async requestTierUpgrade(targetTier: string, justification?: string) {
    try {
      const response = await this.api.post("/tier-upgrade-request", {
        targetTier,
        justification,
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to request tier upgrade");
    }
  }

  // Get integration status
  async getIntegrationStatus() {
    try {
      const response = await this.api.get("/integration-status");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch integration status");
    }
  }

  // Submit support ticket
  async submitSupportTicket(ticket: {
    priority: "low" | "medium" | "high" | "critical";
    category: string;
    subject: string;
    description: string;
    attachments?: File[];
  }) {
    try {
      const formData = new FormData();
      formData.append("priority", ticket.priority);
      formData.append("category", ticket.category);
      formData.append("subject", ticket.subject);
      formData.append("description", ticket.description);

      if (ticket.attachments) {
        ticket.attachments.forEach((file, index) => {
          formData.append(`attachment_${index}`, file);
        });
      }

      const response = await this.api.post("/support-ticket", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to submit support ticket");
    }
  }

  // Get performance metrics
  async getPerformanceMetrics(timeframe: string = "24h") {
    try {
      const response = await this.api.get(
        `/performance-metrics?timeframe=${timeframe}`,
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch performance metrics");
    }
  }

  // Generate custom report
  async generateReport(reportConfig: {
    type: "usage" | "billing" | "performance" | "roi";
    period: string;
    format: "pdf" | "excel" | "csv";
    includeCharts?: boolean;
  }) {
    try {
      const response = await this.api.post("/generate-report", reportConfig, {
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to generate report");
    }
  }
}

// Create and export singleton instance
export const enterpriseService = new EnterpriseService();

// Export types for use in components
export type {
  EnterpriseOnboardingData,
  PricingCalculatorData,
  ConsultationRequest,
};

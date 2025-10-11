import { Router, Request, Response } from "express";
import { z } from "zod";
import { validate } from "../middleware/validation";
import { authMiddleware } from "../middleware/auth";
import { logger } from "../utils/logger";

const router = Router();

// Validation schemas
const enterpriseOnboardingSchema = z.object({
  companyInfo: z.object({
    companyName: z.string().min(1),
    industry: z.string().min(1),
    revenue: z.string().min(1),
    employees: z.string().min(1),
    headquarters: z.string().optional(),
    website: z.string().url().optional(),
    description: z.string().optional(),
  }),
  contactInfo: z.object({
    primaryContact: z.object({
      name: z.string().min(1),
      title: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
    }),
    technicalContact: z.object({
      name: z.string().min(1),
      title: z.string().min(1),
      email: z.string().email(),
      phone: z.string().optional(),
    }),
    executiveContact: z.object({
      name: z.string().optional(),
      title: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
    }),
  }),
  requirementsInfo: z.object({
    transactionVolume: z.string().min(1),
    integrationNeeds: z.array(z.string()),
    complianceRequirements: z.array(z.string()),
    timeline: z.string().min(1),
    budget: z.string().optional(),
    specificNeeds: z.string().optional(),
  }),
  selectedTier: z.enum(["silver", "gold", "platinum"]),
});

const pricingCalculatorSchema = z.object({
  annualVolume: z.number().min(0),
  tier: z.enum(["silver", "gold", "platinum"]),
  addons: z.array(z.string()).optional(),
  timeline: z.string().optional(),
});

// Enterprise onboarding submission
router.post(
  "/onboarding",
  validate(enterpriseOnboardingSchema),
  async (req: Request, res: Response) => {
    try {
      const onboardingData = req.body;

      // Log the enterprise onboarding attempt
      logger.info("Enterprise onboarding submission", {
        company: onboardingData.companyInfo.companyName,
        tier: onboardingData.selectedTier,
        volume: onboardingData.requirementsInfo.transactionVolume,
      });

      // In a real implementation, this would:
      // 1. Save to database
      // 2. Trigger CRM integration
      // 3. Send notifications to enterprise team
      // 4. Generate enterprise account
      // 5. Schedule follow-up calls

      const enterpriseAccount = {
        id: `enterprise_${Date.now()}`,
        status: "pending_review",
        tier: onboardingData.selectedTier,
        estimatedValue: calculateEstimatedValue(onboardingData),
        nextSteps: [
          "Executive alignment call scheduled within 24h",
          "Technical integration planning",
          "Custom solution architecture",
          "Implementation timeline creation",
        ],
        dedicatedTeam: {
          accountManager: "Sarah Johnson",
          technicalLead: "Michael Chen",
          implementationManager: "David Rodriguez",
        },
        timeline: {
          initialCall: "24 hours",
          proposal: "48-72 hours",
          implementation: onboardingData.requirementsInfo.timeline,
        },
      };

      res.status(201).json({
        success: true,
        message: "Enterprise onboarding submitted successfully",
        data: enterpriseAccount,
      });
    } catch (error) {
      logger.error("Enterprise onboarding error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to process enterprise onboarding",
        error: process.env.NODE_ENV === "development" ? error : undefined,
      });
    }
  },
);

// Pricing calculator
router.post(
  "/pricing-calculator",
  validate(pricingCalculatorSchema),
  async (req: Request, res: Response) => {
    try {
      const { annualVolume, tier, addons = [], timeline } = req.body;

      const pricing = calculateEnterprisePricing(annualVolume, tier, addons);

      res.json({
        success: true,
        data: {
          baseTierCost: pricing.baseCost,
          consumptionCost: pricing.consumptionCost,
          addonCost: pricing.addonCost,
          totalAnnualCost: pricing.totalCost,
          potentialSavings: pricing.savings,
          roi: pricing.roi,
          breakdown: pricing.breakdown,
          recommendations: generateRecommendations(annualVolume, tier, addons),
        },
      });
    } catch (error) {
      logger.error("Pricing calculation error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to calculate pricing",
      });
    }
  },
);

// Enterprise dashboard metrics (protected route)
router.get(
  "/dashboard/metrics",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      // In a real implementation, this would fetch from database
      const metrics = {
        revenue: {
          totalSpend: 485000,
          monthlyRecurring: 125000,
          consumptionCosts: 89000,
          addonCosts: 145000,
          projectedAnnual: 1650000,
          savingsRealized: 2300000,
          roi: 274,
        },
        usage: {
          apiCalls: 2847000,
          transactions: 156000,
          dataProcessed: 847,
          activeUsers: 2340,
          integrations: 47,
        },
        performance: {
          uptime: 99.997,
          responseTime: 23,
          errorRate: 0.003,
          throughput: 15680,
        },
        alerts: [
          {
            type: "success",
            title: "Revenue Milestone Achieved",
            message:
              "Your platform has processed $500M in transactions this quarter.",
            time: "2 hours ago",
          },
          {
            type: "info",
            title: "New Integration Available",
            message:
              "SAP S/4HANA connector is now available for your enterprise tier.",
            time: "1 day ago",
          },
        ],
      };

      res.json({
        success: true,
        data: metrics,
      });
    } catch (error) {
      logger.error("Dashboard metrics error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch dashboard metrics",
      });
    }
  },
);

// Upsell opportunities
router.get(
  "/upsell-opportunities",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const opportunities = [
        {
          id: "digital-twin-upgrade",
          title: "Mission-Critical Digital Twin",
          description:
            "Upgrade to real-time supply chain simulation with AI optimization",
          potentialValue: 150000,
          roi: "40% efficiency gain",
          effort: "Medium",
          priority: "High",
          icon: "🔄",
        },
        {
          id: "exclusive-networks",
          title: "Executive Deal Rooms",
          description: "Access Fortune 100 exclusive partnership opportunities",
          potentialValue: 500000,
          roi: "Access to $B+ deals",
          effort: "Low",
          priority: "High",
          icon: "🤝",
        },
        {
          id: "ai-expansion",
          title: "Advanced AI Suite",
          description:
            "Predictive analytics and automated decision-making capabilities",
          potentialValue: 200000,
          roi: "35% cost reduction",
          effort: "High",
          priority: "Medium",
          icon: "🤖",
        },
      ];

      res.json({
        success: true,
        data: opportunities,
      });
    } catch (error) {
      logger.error("Upsell opportunities error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch upsell opportunities",
      });
    }
  },
);

// Request enterprise consultation
router.post(
  "/consultation-request",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { type, details, preferredTime, urgency } = req.body;

      // In a real implementation, this would:
      // 1. Create calendar booking
      // 2. Notify enterprise team
      // 3. Send confirmation email
      // 4. Set up meeting room/video call

      const consultation = {
        id: `consult_${Date.now()}`,
        type,
        status: "scheduled",
        scheduledTime: preferredTime || "Within 24 hours",
        assignedTeam: getConsultationTeam(type),
        meetingDetails: {
          platform: "Microsoft Teams",
          duration: "60 minutes",
          agenda: generateConsultationAgenda(type, details),
        },
      };

      res.status(201).json({
        success: true,
        message: "Consultation request submitted successfully",
        data: consultation,
      });
    } catch (error) {
      logger.error("Consultation request error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to schedule consultation",
      });
    }
  },
);

// Helper functions
function calculateEstimatedValue(onboardingData: any): number {
  const volumeMultipliers = {
    "50m-100m": 75000,
    "100m-500m": 200000,
    "500m-1b": 450000,
    "1b-5b": 1200000,
    "5b+": 2500000,
  };

  const tierMultipliers = {
    silver: 1,
    gold: 1.5,
    platinum: 2.5,
  };

  const baseValue =
    volumeMultipliers[
      onboardingData.requirementsInfo
        .transactionVolume as keyof typeof volumeMultipliers
    ] || 100000;
  const tierMultiplier =
    tierMultipliers[
      onboardingData.selectedTier as keyof typeof tierMultipliers
    ];

  return baseValue * tierMultiplier;
}

function calculateEnterprisePricing(
  volume: number,
  tier: string,
  addons: string[],
) {
  const tierPricing = {
    silver: { base: 50000, rate: 0.008 },
    gold: { base: 175000, rate: 0.006 },
    platinum: { base: 350000, rate: 0.003 },
  };

  const addonPricing = {
    "digital-twin": 120000,
    sustainability: 60000,
    "exclusive-networks": 100000,
    blockchain: 80000,
  };

  const pricing = tierPricing[tier as keyof typeof tierPricing];
  const baseCost = pricing.base;
  const consumptionCost = volume * pricing.rate;
  const addonCost = addons.reduce((total, addon) => {
    return total + (addonPricing[addon as keyof typeof addonPricing] || 0);
  }, 0);

  const totalCost = baseCost + consumptionCost + addonCost;
  const savings = volume * 0.25; // 25% savings estimate
  const roi = (savings / totalCost) * 100;

  return {
    baseCost,
    consumptionCost,
    addonCost,
    totalCost,
    savings,
    roi,
    breakdown: {
      subscription: baseCost,
      consumption: consumptionCost,
      addons: addonCost,
    },
  };
}

function generateRecommendations(
  volume: number,
  tier: string,
  addons: string[],
): string[] {
  const recommendations = [];

  if (volume > 1000000000 && tier !== "platinum") {
    recommendations.push(
      "Consider upgrading to Platinum tier for better rates at your volume",
    );
  }

  if (!addons.includes("digital-twin") && volume > 500000000) {
    recommendations.push(
      "Digital Twin integration could provide significant ROI at your scale",
    );
  }

  if (!addons.includes("sustainability") && volume > 100000000) {
    recommendations.push(
      "ESG compliance suite recommended for enterprises your size",
    );
  }

  recommendations.push("Annual billing provides 15-20% savings over monthly");

  return recommendations;
}

function getConsultationTeam(type: string): any {
  const teams = {
    technical: {
      lead: "Michael Chen - CTO",
      members: [
        "Sarah Kim - Solutions Architect",
        "David Lee - Integration Specialist",
      ],
    },
    business: {
      lead: "Sarah Johnson - VP Enterprise",
      members: [
        "Robert Wilson - Account Director",
        "Lisa Chen - Business Analyst",
      ],
    },
    pricing: {
      lead: "Jennifer Martinez - Revenue Operations",
      members: ["Alex Thompson - Pricing Analyst", "Maria Garcia - Finance"],
    },
  };

  return teams[type as keyof typeof teams] || teams.business;
}

function generateConsultationAgenda(type: string, details: any): string[] {
  const baseAgenda = [
    "Welcome and introductions",
    "Current state assessment",
    "Requirements deep dive",
    "Solution recommendations",
    "Next steps and timeline",
  ];

  if (type === "technical") {
    return [
      ...baseAgenda.slice(0, 2),
      "Technical architecture review",
      "Integration requirements",
      "Security and compliance discussion",
      ...baseAgenda.slice(2),
    ];
  }

  return baseAgenda;
}

export { router as enterpriseRoutes };

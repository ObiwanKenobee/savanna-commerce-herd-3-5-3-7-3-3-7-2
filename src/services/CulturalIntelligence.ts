/**
 * Cultural Intelligence & Localization System
 * Advanced cultural adaptation engine for African markets
 * Handles languages, customs, business practices, and social dynamics
 */

// Cultural Data Types
export interface CulturalProfile {
  country: string;
  region: "east" | "west" | "north" | "south" | "central";
  languages: {
    primary: string;
    secondary: string[];
    businessLanguage: string;
    localDialects: string[];
  };
  businessCulture: {
    bargainingExpected: boolean;
    relationshipImportance: number; // 0-100
    hierarchyRespect: number; // 0-100
    timeOrientation: "polychronic" | "monochronic";
    communicationStyle: "direct" | "indirect" | "mixed";
    trustBuildingTime: "quick" | "moderate" | "slow";
  };
  socialDynamics: {
    communityOrientation: number; // 0-100
    familyInfluence: number; // 0-100
    elderRespect: number; // 0-100
    genderConsiderations: string[];
    socialMediaUsage: number; // 0-100
    wordOfMouthImportance: number; // 0-100
  };
  economicFactors: {
    primaryPaymentMethods: string[];
    averageIncome: number;
    bargainingCulture: number; // 0-100
    creditAccess: number; // 0-100
    informalEconomySize: number; // 0-100
    pricesensitivity: number; // 0-100
  };
  religiousFactors: {
    majorReligions: string[];
    religiousHolidays: ReligiousHoliday[];
    businessImpact: "low" | "medium" | "high";
    dietaryRestrictions: string[];
  };
  marketingConsiderations: {
    preferredColors: string[];
    culturalSymbols: CulturalSymbol[];
    tabooTopics: string[];
    effectiveMarketingChannels: string[];
    influencerTypes: string[];
  };
}

export interface ReligiousHoliday {
  name: string;
  type: "islamic" | "christian" | "traditional" | "national";
  impact: "business_closed" | "reduced_activity" | "increased_activity";
  duration: number; // days
  marketingOpportunity: boolean;
}

export interface CulturalSymbol {
  symbol: string;
  meaning: string;
  context: "positive" | "negative" | "neutral";
  usage: "marketing" | "product" | "avoid";
}

export interface LocalizedContent {
  originalText: string;
  translatedText: string;
  culturalAdaptations: string[];
  tone: "formal" | "casual" | "respectful" | "authoritative";
  localExpressions: string[];
}

export interface BusinessEtiquette {
  greetings: {
    formal: string;
    casual: string;
    respectful: string;
  };
  negotiations: {
    expectedDuration: "quick" | "moderate" | "extended";
    relationship_building: boolean;
    price_discussion: "immediate" | "after_relationship" | "gradual";
    decision_makers: "individual" | "group" | "hierarchical";
  };
  communication: {
    preferred_channel: string[];
    response_time_expectation: string;
    formality_level: "high" | "medium" | "low";
    context_importance: "high" | "medium" | "low";
  };
}

export interface MarketEntry {
  country: string;
  readinessScore: number; // 0-100
  opportunities: string[];
  challenges: string[];
  recommendedStrategy: string;
  culturalRisks: CulturalRisk[];
  localPartnershipImportance: number; // 0-100
}

export interface CulturalRisk {
  type: "language" | "religious" | "social" | "business" | "political";
  description: string;
  impact: "low" | "medium" | "high";
  mitigation: string;
  probability: number; // 0-100
}

class CulturalIntelligenceEngine {
  private culturalProfiles: Map<string, CulturalProfile> = new Map();
  private localizationCache: Map<string, LocalizedContent> = new Map();
  private etiquetteRules: Map<string, BusinessEtiquette> = new Map();

  constructor() {
    this.initializeCulturalProfiles();
    this.loadBusinessEtiquette();
  }

  // Initialize cultural profiles for African countries
  private initializeCulturalProfiles(): void {
    const profiles: CulturalProfile[] = [
      {
        country: "Kenya",
        region: "east",
        languages: {
          primary: "Swahili",
          secondary: ["English", "Kikuyu", "Luhya", "Luo"],
          businessLanguage: "English",
          localDialects: ["Kikuyu", "Luhya", "Luo", "Kamba", "Kisii"],
        },
        businessCulture: {
          bargainingExpected: true,
          relationshipImportance: 85,
          hierarchyRespect: 75,
          timeOrientation: "polychronic",
          communicationStyle: "indirect",
          trustBuildingTime: "moderate",
        },
        socialDynamics: {
          communityOrientation: 90,
          familyInfluence: 85,
          elderRespect: 95,
          genderConsiderations: [
            "Respect for women in business growing",
            "Traditional gender roles still prevalent",
          ],
          socialMediaUsage: 78,
          wordOfMouthImportance: 92,
        },
        economicFactors: {
          primaryPaymentMethods: ["M-Pesa", "Cash", "Airtel Money"],
          averageIncome: 1850,
          bargainingCulture: 80,
          creditAccess: 45,
          informalEconomySize: 75,
          pricesensitivity: 85,
        },
        religiousFactors: {
          majorReligions: ["Christianity", "Islam", "Traditional"],
          religiousHolidays: [
            {
              name: "Eid al-Fitr",
              type: "islamic",
              impact: "business_closed",
              duration: 3,
              marketingOpportunity: true,
            },
            {
              name: "Christmas",
              type: "christian",
              impact: "business_closed",
              duration: 2,
              marketingOpportunity: true,
            },
          ],
          businessImpact: "medium",
          dietaryRestrictions: [
            "Halal options important for Muslim population",
          ],
        },
        marketingConsiderations: {
          preferredColors: ["Green", "Red", "Black", "Gold"],
          culturalSymbols: [
            {
              symbol: "Lion",
              meaning: "Strength and courage",
              context: "positive",
              usage: "marketing",
            },
            {
              symbol: "Baobab Tree",
              meaning: "Wisdom and longevity",
              context: "positive",
              usage: "marketing",
            },
          ],
          tabooTopics: ["Ethnic tensions", "Colonial history sensitivity"],
          effectiveMarketingChannels: [
            "Radio",
            "SMS",
            "Social Media",
            "Community leaders",
          ],
          influencerTypes: [
            "Religious leaders",
            "Community elders",
            "Local celebrities",
          ],
        },
      },
      {
        country: "Nigeria",
        region: "west",
        languages: {
          primary: "English",
          secondary: ["Hausa", "Yoruba", "Igbo"],
          businessLanguage: "English",
          localDialects: ["Hausa", "Yoruba", "Igbo", "Fulani", "Kanuri"],
        },
        businessCulture: {
          bargainingExpected: true,
          relationshipImportance: 90,
          hierarchyRespect: 80,
          timeOrientation: "polychronic",
          communicationStyle: "mixed",
          trustBuildingTime: "slow",
        },
        socialDynamics: {
          communityOrientation: 95,
          familyInfluence: 90,
          elderRespect: 98,
          genderConsiderations: [
            "Strong traditional gender roles",
            "Increasing women in business",
          ],
          socialMediaUsage: 72,
          wordOfMouthImportance: 95,
        },
        economicFactors: {
          primaryPaymentMethods: ["Cash", "Bank Transfer", "Mobile Money"],
          averageIncome: 2100,
          bargainingCulture: 95,
          creditAccess: 35,
          informalEconomySize: 85,
          pricesensitivity: 90,
        },
        religiousFactors: {
          majorReligions: ["Christianity", "Islam"],
          religiousHolidays: [
            {
              name: "Eid al-Fitr",
              type: "islamic",
              impact: "business_closed",
              duration: 3,
              marketingOpportunity: true,
            },
            {
              name: "Christmas",
              type: "christian",
              impact: "business_closed",
              duration: 2,
              marketingOpportunity: true,
            },
            {
              name: "Ramadan",
              type: "islamic",
              impact: "reduced_activity",
              duration: 30,
              marketingOpportunity: false,
            },
          ],
          businessImpact: "high",
          dietaryRestrictions: [
            "Halal requirements significant",
            "Pork restrictions",
          ],
        },
        marketingConsiderations: {
          preferredColors: ["Green", "White", "Red", "Gold"],
          culturalSymbols: [
            {
              symbol: "Eagle",
              meaning: "National pride and strength",
              context: "positive",
              usage: "marketing",
            },
            {
              symbol: "Kola Nut",
              meaning: "Hospitality and tradition",
              context: "positive",
              usage: "product",
            },
          ],
          tabooTopics: [
            "Religious conflicts",
            "Ethnic divisions",
            "Political instability",
          ],
          effectiveMarketingChannels: [
            "Radio",
            "TV",
            "Social Media",
            "Religious gatherings",
          ],
          influencerTypes: [
            "Religious leaders",
            "Traditional rulers",
            "Nollywood celebrities",
          ],
        },
      },
      {
        country: "South Africa",
        region: "south",
        languages: {
          primary: "English",
          secondary: ["Afrikaans", "Zulu", "Xhosa"],
          businessLanguage: "English",
          localDialects: ["Zulu", "Xhosa", "Afrikaans", "Sotho", "Tswana"],
        },
        businessCulture: {
          bargainingExpected: false,
          relationshipImportance: 70,
          hierarchyRespect: 60,
          timeOrientation: "monochronic",
          communicationStyle: "direct",
          trustBuildingTime: "moderate",
        },
        socialDynamics: {
          communityOrientation: 75,
          familyInfluence: 70,
          elderRespect: 85,
          genderConsiderations: [
            "Gender equality more advanced",
            "Women well represented in business",
          ],
          socialMediaUsage: 85,
          wordOfMouthImportance: 75,
        },
        economicFactors: {
          primaryPaymentMethods: ["Credit Card", "EFT", "Cash"],
          averageIncome: 3200,
          bargainingCulture: 40,
          creditAccess: 70,
          informalEconomySize: 45,
          pricesensitivity: 65,
        },
        religiousFactors: {
          majorReligions: ["Christianity", "Traditional", "Islam", "Hinduism"],
          religiousHolidays: [
            {
              name: "Christmas",
              type: "christian",
              impact: "business_closed",
              duration: 2,
              marketingOpportunity: true,
            },
            {
              name: "Heritage Day",
              type: "national",
              impact: "reduced_activity",
              duration: 1,
              marketingOpportunity: true,
            },
          ],
          businessImpact: "low",
          dietaryRestrictions: [
            "Diverse dietary needs",
            "Halal and vegetarian options",
          ],
        },
        marketingConsiderations: {
          preferredColors: ["Blue", "Green", "Gold", "Black"],
          culturalSymbols: [
            {
              symbol: "Protea",
              meaning: "National flower - diversity and courage",
              context: "positive",
              usage: "marketing",
            },
            {
              symbol: "Ubuntu",
              meaning: "Humanity and interconnectedness",
              context: "positive",
              usage: "marketing",
            },
          ],
          tabooTopics: ["Apartheid sensitivity", "Racial tensions"],
          effectiveMarketingChannels: ["TV", "Digital", "Radio", "Print"],
          influencerTypes: [
            "Celebrities",
            "Business leaders",
            "Sports figures",
          ],
        },
      },
    ];

    profiles.forEach((profile) => {
      this.culturalProfiles.set(profile.country.toLowerCase(), profile);
    });
  }

  // Load business etiquette rules
  private loadBusinessEtiquette(): void {
    const etiquette: { [key: string]: BusinessEtiquette } = {
      kenya: {
        greetings: {
          formal: "Good morning/afternoon, how are you?",
          casual: "Habari? (How are things?)",
          respectful: "Shikamoo (for elders)",
        },
        negotiations: {
          expectedDuration: "moderate",
          relationship_building: true,
          price_discussion: "after_relationship",
          decision_makers: "hierarchical",
        },
        communication: {
          preferred_channel: ["WhatsApp", "SMS", "Phone calls"],
          response_time_expectation:
            "Same day for urgent, 2-3 days for routine",
          formality_level: "medium",
          context_importance: "high",
        },
      },
      nigeria: {
        greetings: {
          formal: "Good morning/afternoon, sir/madam",
          casual: "How far? (How are you?)",
          respectful: "Sannu (Hausa), Bawo (Yoruba), Ndewo (Igbo)",
        },
        negotiations: {
          expectedDuration: "extended",
          relationship_building: true,
          price_discussion: "gradual",
          decision_makers: "group",
        },
        communication: {
          preferred_channel: ["WhatsApp", "Phone calls", "In-person"],
          response_time_expectation: "Flexible, relationship-dependent",
          formality_level: "high",
          context_importance: "high",
        },
      },
      "south africa": {
        greetings: {
          formal: "Good morning/afternoon",
          casual: "Hello, how are you?",
          respectful: "Sawubona (Zulu), Molo (Xhosa)",
        },
        negotiations: {
          expectedDuration: "moderate",
          relationship_building: false,
          price_discussion: "immediate",
          decision_makers: "individual",
        },
        communication: {
          preferred_channel: ["Email", "Phone calls", "WhatsApp"],
          response_time_expectation: "Within 24-48 hours",
          formality_level: "medium",
          context_importance: "medium",
        },
      },
    };

    Object.entries(etiquette).forEach(([country, rules]) => {
      this.etiquetteRules.set(country, rules);
    });
  }

  // Get cultural profile for a country
  getCulturalProfile(country: string): CulturalProfile | null {
    return this.culturalProfiles.get(country.toLowerCase()) || null;
  }

  // Localize content for specific market
  async localizeContent(
    content: string,
    targetCountry: string,
    contentType: "marketing" | "product" | "legal" | "support",
  ): Promise<LocalizedContent> {
    const cacheKey = `${targetCountry}_${contentType}_${content.substring(0, 50)}`;

    if (this.localizationCache.has(cacheKey)) {
      return this.localizationCache.get(cacheKey)!;
    }

    const profile = this.getCulturalProfile(targetCountry);
    if (!profile) {
      throw new Error(`Cultural profile not found for ${targetCountry}`);
    }

    const localized = await this.performLocalization(
      content,
      profile,
      contentType,
    );
    this.localizationCache.set(cacheKey, localized);

    return localized;
  }

  // Perform content localization
  private async performLocalization(
    content: string,
    profile: CulturalProfile,
    contentType: string,
  ): Promise<LocalizedContent> {
    // Simulate translation and cultural adaptation
    let translatedText = content; // In reality, this would use a translation API
    const culturalAdaptations: string[] = [];
    let tone: LocalizedContent["tone"] = "casual";
    const localExpressions: string[] = [];

    // Apply cultural adaptations based on content type and cultural profile
    switch (contentType) {
      case "marketing":
        if (profile.businessCulture.communicationStyle === "indirect") {
          culturalAdaptations.push("Used indirect communication style");
          tone = "respectful";
        }
        if (profile.socialDynamics.elderRespect > 90) {
          culturalAdaptations.push("Added elder respect language");
          localExpressions.push("We honor the wisdom of our elders");
        }
        if (profile.economicFactors.bargainingCulture > 70) {
          culturalAdaptations.push("Mentioned bargaining and value");
          localExpressions.push("Best value for your family");
        }
        break;

      case "product":
        if (profile.religiousFactors.businessImpact === "high") {
          culturalAdaptations.push("Added religious sensitivity");
          if (
            profile.religiousFactors.dietaryRestrictions.some((r) =>
              r.includes("Halal"),
            )
          ) {
            localExpressions.push("Halal-certified options available");
          }
        }
        break;

      case "legal":
        tone = "formal";
        if (profile.businessCulture.hierarchyRespect > 70) {
          culturalAdaptations.push("Used formal hierarchy-respecting language");
        }
        break;

      case "support":
        if (profile.businessCulture.communicationStyle === "indirect") {
          tone = "respectful";
          culturalAdaptations.push("Used patient, respectful support tone");
        }
        break;
    }

    // Add local payment method references if relevant
    if (content.includes("payment") || content.includes("pay")) {
      const primaryPayment = profile.economicFactors.primaryPaymentMethods[0];
      localExpressions.push(`Pay easily with ${primaryPayment}`);
      culturalAdaptations.push(`Emphasized ${primaryPayment} payment option`);
    }

    return {
      originalText: content,
      translatedText,
      culturalAdaptations,
      tone,
      localExpressions,
    };
  }

  // Get business etiquette for a country
  getBusinessEtiquette(country: string): BusinessEtiquette | null {
    return this.etiquetteRules.get(country.toLowerCase()) || null;
  }

  // Assess market entry readiness
  assessMarketEntry(country: string): MarketEntry {
    const profile = this.getCulturalProfile(country);
    if (!profile) {
      throw new Error(`Cultural profile not found for ${country}`);
    }

    // Calculate readiness score based on various factors
    let readinessScore = 50; // Base score

    // Economic factors
    if (profile.economicFactors.averageIncome > 2000) readinessScore += 15;
    if (profile.economicFactors.creditAccess > 50) readinessScore += 10;
    if (profile.economicFactors.informalEconomySize < 60) readinessScore += 10;

    // Business culture factors
    if (profile.businessCulture.timeOrientation === "monochronic")
      readinessScore += 5;
    if (profile.businessCulture.communicationStyle === "direct")
      readinessScore += 5;

    // Infrastructure and technology
    if (profile.socialDynamics.socialMediaUsage > 70) readinessScore += 10;

    // Language factors
    if (profile.languages.businessLanguage === "English") readinessScore += 5;

    const opportunities: string[] = [];
    const challenges: string[] = [];
    const culturalRisks: CulturalRisk[] = [];

    // Identify opportunities
    if (profile.socialDynamics.communityOrientation > 80) {
      opportunities.push("Strong community-based marketing potential");
    }
    if (profile.socialDynamics.wordOfMouthImportance > 85) {
      opportunities.push("High word-of-mouth marketing effectiveness");
    }
    if (profile.economicFactors.primaryPaymentMethods.includes("M-Pesa")) {
      opportunities.push("Advanced mobile money ecosystem");
    }

    // Identify challenges
    if (profile.businessCulture.relationshipImportance > 80) {
      challenges.push("Requires significant relationship building investment");
    }
    if (profile.economicFactors.bargainingCulture > 70) {
      challenges.push("Strong bargaining culture requires flexible pricing");
    }
    if (profile.religiousFactors.businessImpact === "high") {
      challenges.push("Religious considerations impact business operations");
    }

    // Identify cultural risks
    if (profile.businessCulture.trustBuildingTime === "slow") {
      culturalRisks.push({
        type: "business",
        description: "Trust building takes significant time",
        impact: "medium",
        mitigation: "Invest in long-term relationship building",
        probability: 80,
      });
    }

    if (profile.marketingConsiderations.tabooTopics.length > 0) {
      culturalRisks.push({
        type: "social",
        description: "Sensitive cultural topics could cause backlash",
        impact: "high",
        mitigation: "Careful content review with local experts",
        probability: 60,
      });
    }

    // Determine recommended strategy
    let recommendedStrategy = "gradual_entry";
    if (readinessScore > 80) {
      recommendedStrategy = "aggressive_expansion";
    } else if (readinessScore > 60) {
      recommendedStrategy = "moderate_expansion";
    } else if (readinessScore < 40) {
      recommendedStrategy = "market_preparation";
    }

    const localPartnershipImportance = Math.max(
      profile.businessCulture.relationshipImportance,
      profile.socialDynamics.communityOrientation,
    );

    return {
      country,
      readinessScore,
      opportunities,
      challenges,
      recommendedStrategy,
      culturalRisks,
      localPartnershipImportance,
    };
  }

  // Get culturally appropriate pricing strategy
  getCulturalPricingStrategy(
    country: string,
    basePrice: number,
  ): {
    suggestedPrice: number;
    pricingStrategy: string;
    culturalFactors: string[];
  } {
    const profile = this.getCulturalProfile(country);
    if (!profile) {
      throw new Error(`Cultural profile not found for ${country}`);
    }

    let suggestedPrice = basePrice;
    const culturalFactors: string[] = [];
    let pricingStrategy = "fixed";

    // Adjust for bargaining culture
    if (profile.economicFactors.bargainingCulture > 70) {
      suggestedPrice = basePrice * 1.2; // Start higher for bargaining
      pricingStrategy = "negotiable";
      culturalFactors.push(
        "High bargaining culture - price set for negotiation",
      );
    }

    // Adjust for price sensitivity
    if (profile.economicFactors.pricesensitivity > 80) {
      suggestedPrice = suggestedPrice * 0.9; // Lower for price-sensitive markets
      culturalFactors.push(
        "High price sensitivity - competitive pricing needed",
      );
    }

    // Adjust for average income
    const incomeRatio = profile.economicFactors.averageIncome / 3000; // Normalized to $3000 baseline
    if (incomeRatio < 0.7) {
      suggestedPrice = suggestedPrice * Math.max(0.6, incomeRatio);
      culturalFactors.push("Adjusted for local purchasing power");
    }

    // Community pricing considerations
    if (profile.socialDynamics.communityOrientation > 85) {
      pricingStrategy = "community_discount";
      culturalFactors.push("Community-based pricing recommended");
    }

    return {
      suggestedPrice: Math.round(suggestedPrice * 100) / 100,
      pricingStrategy,
      culturalFactors,
    };
  }

  // Get culturally appropriate communication style
  getCommunicationStyle(
    country: string,
    messageType: "sales" | "support" | "marketing" | "negotiation",
  ): {
    tone: string;
    style: string;
    keyPoints: string[];
    avoidances: string[];
  } {
    const profile = this.getCulturalProfile(country);
    const etiquette = this.getBusinessEtiquette(country);

    if (!profile || !etiquette) {
      throw new Error(`Cultural data not found for ${country}`);
    }

    let tone = "neutral";
    let style = "direct";
    const keyPoints: string[] = [];
    const avoidances: string[] = [];

    // Base communication style
    if (profile.businessCulture.communicationStyle === "indirect") {
      style = "indirect";
      keyPoints.push(
        "Use context and implication rather than direct statements",
      );
    }

    // Hierarchy considerations
    if (profile.businessCulture.hierarchyRespect > 75) {
      tone = "respectful";
      keyPoints.push("Show appropriate respect for authority and age");
    }

    // Relationship importance
    if (profile.businessCulture.relationshipImportance > 80) {
      keyPoints.push("Emphasize relationship building over immediate business");
      if (messageType === "sales") {
        keyPoints.push("Focus on long-term partnership rather than quick sale");
      }
    }

    // Cultural taboos
    avoidances.push(...profile.marketingConsiderations.tabooTopics);

    // Religious considerations
    if (profile.religiousFactors.businessImpact === "high") {
      keyPoints.push("Be sensitive to religious practices and timing");
      avoidances.push("Religious insensitivity");
    }

    return { tone, style, keyPoints, avoidances };
  }

  // Generate culturally appropriate greetings
  generateCulturalGreeting(
    country: string,
    context: "formal" | "casual" | "respectful",
  ): string {
    const etiquette = this.getBusinessEtiquette(country);
    if (!etiquette) {
      return "Hello"; // Fallback
    }

    return etiquette.greetings[context] || etiquette.greetings.formal;
  }

  // Check for cultural holidays and business impact
  checkCulturalCalendar(
    country: string,
    date: Date,
  ): {
    isHoliday: boolean;
    holidayName?: string;
    businessImpact?: string;
    marketingOpportunity?: boolean;
    recommendations: string[];
  } {
    const profile = this.getCulturalProfile(country);
    if (!profile) {
      return { isHoliday: false, recommendations: [] };
    }

    // Simplified holiday checking (in reality, this would be more sophisticated)
    const month = date.getMonth();
    const day = date.getDate();
    const recommendations: string[] = [];

    // Check major holidays (simplified)
    if (month === 11 && day === 25) {
      // Christmas
      return {
        isHoliday: true,
        holidayName: "Christmas",
        businessImpact: "business_closed",
        marketingOpportunity: true,
        recommendations: [
          "Plan Christmas marketing campaigns",
          "Expect business closure",
          "Focus on gift-related products",
        ],
      };
    }

    // Check for Ramadan period (simplified - would need Islamic calendar)
    if (month === 3 || month === 4) {
      // Approximate Ramadan timing
      recommendations.push("Consider Ramadan timing for Muslim populations");
      if (profile.religiousFactors.majorReligions.includes("Islam")) {
        return {
          isHoliday: true,
          holidayName: "Ramadan Period",
          businessImpact: "reduced_activity",
          marketingOpportunity: false,
          recommendations: [
            "Adjust business hours expectations",
            "Be sensitive to fasting",
            "Plan Eid campaigns for end of Ramadan",
          ],
        };
      }
    }

    return { isHoliday: false, recommendations };
  }
}

// Export singleton instance
export const culturalIntelligence = new CulturalIntelligenceEngine();

export default culturalIntelligence;

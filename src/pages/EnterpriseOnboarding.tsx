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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useLocation } from "react-router-dom";
import EnhancedNavigation from "@/components/EnhancedNavigation";
import { enterpriseService } from "@/services/enterpriseService";
import {
  Building,
  Users,
  Globe,
  Crown,
  Shield,
  Zap,
  Calendar,
  Phone,
  Mail,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Clock,
  Target,
  BarChart3,
  Briefcase,
  CreditCard,
  FileText,
  Video,
  Award,
  Star,
} from "lucide-react";

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface CompanyInfo {
  companyName: string;
  industry: string;
  revenue: string;
  employees: string;
  headquarters: string;
  website: string;
  description: string;
}

interface ContactInfo {
  primaryContact: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
  technicalContact: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
  executiveContact: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
}

interface RequirementsInfo {
  transactionVolume: string;
  integrationNeeds: string[];
  complianceRequirements: string[];
  timeline: string;
  budget: string;
  specificNeeds: string;
}

const EnterpriseOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState<string>("gold");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    companyName: "",
    industry: "",
    revenue: "",
    employees: "",
    headquarters: "",
    website: "",
    description: "",
  });

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    primaryContact: { name: "", title: "", email: "", phone: "" },
    technicalContact: { name: "", title: "", email: "", phone: "" },
    executiveContact: { name: "", title: "", email: "", phone: "" },
  });

  const [requirementsInfo, setRequirementsInfo] = useState<RequirementsInfo>({
    transactionVolume: "",
    integrationNeeds: [],
    complianceRequirements: [],
    timeline: "",
    budget: "",
    specificNeeds: "",
  });

  useEffect(() => {
    if (location.state?.tier) {
      setSelectedTier(location.state.tier);
    }
  }, [location.state]);

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 1,
      title: "Company Information",
      description: "Tell us about your organization",
      icon: <Building className="h-6 w-6" />,
    },
    {
      id: 2,
      title: "Key Contacts",
      description: "Identify decision makers and technical leads",
      icon: <Users className="h-6 w-6" />,
    },
    {
      id: 3,
      title: "Requirements & Integration",
      description: "Define your specific needs and timeline",
      icon: <Target className="h-6 w-6" />,
    },
    {
      id: 4,
      title: "Tier Selection & Pricing",
      description: "Choose your enterprise tier and customizations",
      icon: <Crown className="h-6 w-6" />,
    },
    {
      id: 5,
      title: "Agreement & Next Steps",
      description: "Review terms and schedule implementation",
      icon: <FileText className="h-6 w-6" />,
    },
  ];

  const industries = [
    "Manufacturing",
    "Retail",
    "Healthcare",
    "Financial Services",
    "Technology",
    "Energy",
    "Transportation",
    "Agriculture",
    "Telecommunications",
    "Government",
    "Education",
    "Other",
  ];

  const integrationOptions = [
    "ERP Systems (SAP, Oracle)",
    "CRM (Salesforce, HubSpot)",
    "Inventory Management",
    "Payment Processing",
    "Supply Chain Systems",
    "Analytics Platforms",
    "Custom APIs",
    "Legacy Systems Integration",
  ];

  const complianceRequirements = [
    "SOX Compliance",
    "GDPR",
    "HIPAA",
    "PCI DSS",
    "ISO 27001",
    "SOC 2",
    "FedRAMP",
    "Custom Regulatory Requirements",
  ];

  const handleCompanyInfoChange = (field: keyof CompanyInfo, value: string) => {
    setCompanyInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactInfoChange = (
    contactType: keyof ContactInfo,
    field: string,
    value: string,
  ) => {
    setContactInfo((prev) => ({
      ...prev,
      [contactType]: { ...prev[contactType], [field]: value },
    }));
  };

  const handleIntegrationToggle = (integration: string) => {
    setRequirementsInfo((prev) => ({
      ...prev,
      integrationNeeds: prev.integrationNeeds.includes(integration)
        ? prev.integrationNeeds.filter((i) => i !== integration)
        : [...prev.integrationNeeds, integration],
    }));
  };

  const handleComplianceToggle = (requirement: string) => {
    setRequirementsInfo((prev) => ({
      ...prev,
      complianceRequirements: prev.complianceRequirements.includes(requirement)
        ? prev.complianceRequirements.filter((r) => r !== requirement)
        : [...prev.complianceRequirements, requirement],
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          companyInfo.companyName &&
          companyInfo.industry &&
          companyInfo.revenue &&
          companyInfo.employees
        );
      case 2:
        return !!(
          contactInfo.primaryContact.name &&
          contactInfo.primaryContact.email &&
          contactInfo.technicalContact.name &&
          contactInfo.technicalContact.email
        );
      case 3:
        return !!(
          requirementsInfo.transactionVolume && requirementsInfo.timeline
        );
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    } else {
      alert("Please fill in all required fields before proceeding.");
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const submitOnboarding = async () => {
    setIsLoading(true);
    try {
      const onboardingData = {
        companyInfo,
        contactInfo,
        requirementsInfo,
        selectedTier: selectedTier as "silver" | "gold" | "platinum",
      };

      const result = await enterpriseService.submitOnboarding(onboardingData);

      // Navigate to enterprise dashboard with success message
      navigate("/enterprise-dashboard", {
        state: {
          onboardingComplete: true,
          enterpriseAccount: result.data,
          ...onboardingData,
        },
      });
    } catch (error) {
      console.error("Onboarding submission error:", error);
      alert(
        "Submission failed. Please try again or contact our enterprise team directly.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-slate-800">
            Enterprise Onboarding
          </h1>
          <Badge className="bg-purple-600 text-white">
            Step {currentStep} of {onboardingSteps.length}
          </Badge>
        </div>

        <Progress
          value={(currentStep / onboardingSteps.length) * 100}
          className="h-2 mb-4"
        />

        <div className="flex items-center space-x-4 overflow-x-auto">
          {onboardingSteps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center space-x-2 whitespace-nowrap ${
                step.id === currentStep
                  ? "text-purple-600"
                  : step.id < currentStep
                    ? "text-green-600"
                    : "text-slate-400"
              }`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step.id === currentStep
                    ? "border-purple-600 bg-purple-50"
                    : step.id < currentStep
                      ? "border-green-600 bg-green-50"
                      : "border-slate-300 bg-slate-50"
                }`}
              >
                {step.id < currentStep ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  step.icon
                )}
              </div>
              <div className="hidden md:block">
                <div className="font-semibold text-sm">{step.title}</div>
                <div className="text-xs text-slate-500">{step.description}</div>
              </div>
              {index < onboardingSteps.length - 1 && (
                <ArrowRight className="h-4 w-4 text-slate-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCompanyInfoStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="h-5 w-5 text-purple-600" />
            <span>Company Information</span>
          </CardTitle>
          <CardDescription>
            Help us understand your organization to customize the perfect
            enterprise solution.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                placeholder="e.g., Fortune 500 Corporation"
                value={companyInfo.companyName}
                onChange={(e) =>
                  handleCompanyInfoChange("companyName", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="industry">Industry *</Label>
              <Select
                value={companyInfo.industry}
                onValueChange={(value) =>
                  handleCompanyInfoChange("industry", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry.toLowerCase()}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="revenue">Annual Revenue *</Label>
              <Select
                value={companyInfo.revenue}
                onValueChange={(value) =>
                  handleCompanyInfoChange("revenue", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select revenue range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100m-500m">$100M - $500M</SelectItem>
                  <SelectItem value="500m-1b">$500M - $1B</SelectItem>
                  <SelectItem value="1b-5b">$1B - $5B</SelectItem>
                  <SelectItem value="5b-10b">$5B - $10B</SelectItem>
                  <SelectItem value="10b+">$10B+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="employees">Number of Employees *</Label>
              <Select
                value={companyInfo.employees}
                onValueChange={(value) =>
                  handleCompanyInfoChange("employees", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employee count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1000-5000">1,000 - 5,000</SelectItem>
                  <SelectItem value="5000-10000">5,000 - 10,000</SelectItem>
                  <SelectItem value="10000-50000">10,000 - 50,000</SelectItem>
                  <SelectItem value="50000+">50,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="headquarters">Headquarters Location</Label>
              <Input
                id="headquarters"
                placeholder="e.g., New York, NY, USA"
                value={companyInfo.headquarters}
                onChange={(e) =>
                  handleCompanyInfoChange("headquarters", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="website">Company Website</Label>
              <Input
                id="website"
                placeholder="e.g., https://company.com"
                value={companyInfo.website}
                onChange={(e) =>
                  handleCompanyInfoChange("website", e.target.value)
                }
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Company Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of your company and business model..."
              rows={4}
              value={companyInfo.description}
              onChange={(e) =>
                handleCompanyInfoChange("description", e.target.value)
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContactInfoStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-purple-600" />
            <span>Key Contacts</span>
          </CardTitle>
          <CardDescription>
            Identify the key stakeholders for this enterprise implementation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Primary Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              <span>Primary Business Contact *</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name *</Label>
                <Input
                  value={contactInfo.primaryContact.name}
                  onChange={(e) =>
                    handleContactInfoChange(
                      "primaryContact",
                      "name",
                      e.target.value,
                    )
                  }
                  placeholder="John Smith"
                />
              </div>
              <div>
                <Label>Title *</Label>
                <Input
                  value={contactInfo.primaryContact.title}
                  onChange={(e) =>
                    handleContactInfoChange(
                      "primaryContact",
                      "title",
                      e.target.value,
                    )
                  }
                  placeholder="VP of Operations"
                />
              </div>
              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={contactInfo.primaryContact.email}
                  onChange={(e) =>
                    handleContactInfoChange(
                      "primaryContact",
                      "email",
                      e.target.value,
                    )
                  }
                  placeholder="john.smith@company.com"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={contactInfo.primaryContact.phone}
                  onChange={(e) =>
                    handleContactInfoChange(
                      "primaryContact",
                      "phone",
                      e.target.value,
                    )
                  }
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Technical Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Zap className="h-5 w-5 text-green-600" />
              <span>Technical Lead *</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name *</Label>
                <Input
                  value={contactInfo.technicalContact.name}
                  onChange={(e) =>
                    handleContactInfoChange(
                      "technicalContact",
                      "name",
                      e.target.value,
                    )
                  }
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <Label>Title *</Label>
                <Input
                  value={contactInfo.technicalContact.title}
                  onChange={(e) =>
                    handleContactInfoChange(
                      "technicalContact",
                      "title",
                      e.target.value,
                    )
                  }
                  placeholder="CTO / IT Director"
                />
              </div>
              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={contactInfo.technicalContact.email}
                  onChange={(e) =>
                    handleContactInfoChange(
                      "technicalContact",
                      "email",
                      e.target.value,
                    )
                  }
                  placeholder="jane.doe@company.com"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={contactInfo.technicalContact.phone}
                  onChange={(e) =>
                    handleContactInfoChange(
                      "technicalContact",
                      "phone",
                      e.target.value,
                    )
                  }
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Executive Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Crown className="h-5 w-5 text-yellow-600" />
              <span>Executive Sponsor</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={contactInfo.executiveContact.name}
                  onChange={(e) =>
                    handleContactInfoChange(
                      "executiveContact",
                      "name",
                      e.target.value,
                    )
                  }
                  placeholder="Robert Johnson"
                />
              </div>
              <div>
                <Label>Title</Label>
                <Input
                  value={contactInfo.executiveContact.title}
                  onChange={(e) =>
                    handleContactInfoChange(
                      "executiveContact",
                      "title",
                      e.target.value,
                    )
                  }
                  placeholder="CEO / President"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={contactInfo.executiveContact.email}
                  onChange={(e) =>
                    handleContactInfoChange(
                      "executiveContact",
                      "email",
                      e.target.value,
                    )
                  }
                  placeholder="robert.johnson@company.com"
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={contactInfo.executiveContact.phone}
                  onChange={(e) =>
                    handleContactInfoChange(
                      "executiveContact",
                      "phone",
                      e.target.value,
                    )
                  }
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRequirementsStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-purple-600" />
            <span>Requirements & Integration Needs</span>
          </CardTitle>
          <CardDescription>
            Define your specific requirements to ensure perfect platform
            alignment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="transactionVolume">
                Expected Annual Transaction Volume *
              </Label>
              <Select
                value={requirementsInfo.transactionVolume}
                onValueChange={(value) =>
                  setRequirementsInfo((prev) => ({
                    ...prev,
                    transactionVolume: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select volume range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50m-100m">$50M - $100M</SelectItem>
                  <SelectItem value="100m-500m">$100M - $500M</SelectItem>
                  <SelectItem value="500m-1b">$500M - $1B</SelectItem>
                  <SelectItem value="1b-5b">$1B - $5B</SelectItem>
                  <SelectItem value="5b+">$5B+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timeline">Implementation Timeline *</Label>
              <Select
                value={requirementsInfo.timeline}
                onValueChange={(value) =>
                  setRequirementsInfo((prev) => ({ ...prev, timeline: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30-days">30 days (Rush)</SelectItem>
                  <SelectItem value="60-days">60 days (Standard)</SelectItem>
                  <SelectItem value="90-days">
                    90 days (Comprehensive)
                  </SelectItem>
                  <SelectItem value="120-days">120+ days (Complex)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Integration Requirements</Label>
            <div className="grid md:grid-cols-2 gap-2 mt-2">
              {integrationOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    checked={requirementsInfo.integrationNeeds.includes(option)}
                    onCheckedChange={() => handleIntegrationToggle(option)}
                  />
                  <label className="text-sm">{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Compliance Requirements</Label>
            <div className="grid md:grid-cols-2 gap-2 mt-2">
              {complianceRequirements.map((requirement) => (
                <div key={requirement} className="flex items-center space-x-2">
                  <Checkbox
                    checked={requirementsInfo.complianceRequirements.includes(
                      requirement,
                    )}
                    onCheckedChange={() => handleComplianceToggle(requirement)}
                  />
                  <label className="text-sm">{requirement}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="budget">Annual Budget Range</Label>
            <Select
              value={requirementsInfo.budget}
              onValueChange={(value) =>
                setRequirementsInfo((prev) => ({ ...prev, budget: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100k-250k">$100K - $250K</SelectItem>
                <SelectItem value="250k-500k">$250K - $500K</SelectItem>
                <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                <SelectItem value="1m-2m">$1M - $2M</SelectItem>
                <SelectItem value="2m+">$2M+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="specificNeeds">
              Specific Requirements & Use Cases
            </Label>
            <Textarea
              id="specificNeeds"
              placeholder="Describe any specific requirements, use cases, or challenges you'd like us to address..."
              rows={4}
              value={requirementsInfo.specificNeeds}
              onChange={(e) =>
                setRequirementsInfo((prev) => ({
                  ...prev,
                  specificNeeds: e.target.value,
                }))
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderCompanyInfoStep();
      case 2:
        return renderContactInfoStep();
      case 3:
        return renderRequirementsStep();
      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Tier Selection & Customization</CardTitle>
              <CardDescription>
                Review and customize your enterprise tier based on your
                requirements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Crown className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">
                  Recommended:{" "}
                  {selectedTier === "platinum"
                    ? "Platinum"
                    : selectedTier === "gold"
                      ? "Gold"
                      : "Silver"}{" "}
                  Tier
                </h3>
                <p className="text-slate-600 mb-6">
                  Based on your requirements, we recommend the {selectedTier}{" "}
                  tier for optimal value.
                </p>
                <Button onClick={() => navigate("/enterprise-pricing")}>
                  Review All Tiers & Pricing
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Review & Next Steps</CardTitle>
              <CardDescription>
                Review your information and schedule your implementation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">
                  🎉 Onboarding Complete!
                </h3>
                <p className="text-green-700 mb-4">
                  Your enterprise onboarding application has been reviewed. Our
                  team will contact you within 24 hours to begin implementation.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold">Next Steps:</h4>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Executive alignment call (48h)</li>
                      <li>• Technical integration planning</li>
                      <li>• Custom solution architecture</li>
                      <li>• Implementation timeline</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold">Your Benefits:</h4>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Dedicated account manager</li>
                      <li>• White-glove implementation</li>
                      <li>• 24/7 enterprise support</li>
                      <li>• Executive advisory access</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                onClick={submitOnboarding}
                disabled={isLoading}
              >
                {isLoading
                  ? "Submitting..."
                  : "Complete Onboarding & Access Dashboard"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <EnhancedNavigation />

      {renderStepIndicator()}

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            {currentStep < 5 ? (
              <Button
                onClick={nextStep}
                className="bg-purple-600 hover:bg-purple-700 text-white flex items-center space-x-2"
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnterpriseOnboarding;

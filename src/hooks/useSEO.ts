import { useEffect, useMemo, useState } from "react";
import { seoService, type SEOMetadata } from "@/services/seoService";

export interface UseSEOArgs {
  page: string;
  productData?: any;
  region?: string;
  language?: string;
  autoGenerate?: boolean;
}

export interface UseSEOResult {
  metadata: SEOMetadata | null;
  isLoading: boolean;
  error: string | null;
  isOptimized: boolean;
  coreWebVitals: {
    lcp: { fast: number; average: number; slow: number };
    fid: { fast: number; average: number; slow: number };
    cls: { fast: number; average: number; slow: number };
    fcp?: { fast: number; average: number; slow: number };
  } | null;
  generateMetadata: () => Promise<void>;
  updateMetadata: (partial: Partial<SEOMetadata>) => void;
  saveMetadata: () => Promise<boolean>;
}

export const useSEO = (args: UseSEOArgs): UseSEOResult => {
  const { page, productData = {}, region = "kenya", language = "sw", autoGenerate = false } = args;

  const [metadata, setMetadata] = useState<SEOMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coreWebVitals, setCoreWebVitals] = useState<UseSEOResult["coreWebVitals"]>(null);

  const isOptimized = useMemo(() => {
    if (!metadata) return false;
    const titleOk = metadata.title && metadata.title.length >= 30 && metadata.title.length <= 60;
    const descOk = metadata.description && metadata.description.length >= 120 && metadata.description.length <= 160;
    const ogOk = Boolean(metadata.ogTitle && metadata.ogDescription && metadata.ogImage);
    const canonicalOk = Boolean(metadata.canonicalUrl);
    return Boolean(titleOk && descOk && ogOk && canonicalOk);
  }, [metadata]);

  const loadVitals = async () => {
    try {
      const vitals = await seoService.getCoreWebVitals(region);
      setCoreWebVitals(vitals);
    } catch (e) {
      // Non-fatal
    }
  };

  const generateMetadata = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await seoService.generateLocalizedMetadata(page, productData, region, language);
      setMetadata(result);
    } catch (e: any) {
      setError(e?.message || "Failed to generate SEO metadata");
    } finally {
      setIsLoading(false);
    }
  };

  const updateMetadata = (partial: Partial<SEOMetadata>) => {
    setMetadata((prev) => ({ ...(prev as SEOMetadata), ...partial }));
  };

  const saveMetadata = async (): Promise<boolean> => {
    if (!metadata) return false;
    try {
      const ok = await seoService.storeSEOMetadata(page, metadata);
      return ok;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    loadVitals();
    if (autoGenerate) {
      generateMetadata();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, region, language]);

  return {
    metadata,
    isLoading,
    error,
    isOptimized,
    coreWebVitals,
    generateMetadata,
    updateMetadata,
    saveMetadata,
  };
};

export const useRegionalSEO = () => {
  const detect = () => {
    const navLang = (typeof navigator !== "undefined" && navigator.language) || "en-KE";
    if (navLang.startsWith("sw") || navLang.endsWith("KE")) {
      return { region: "kenya", language: "sw", currency: "KES" } as const;
    }
    if (navLang.endsWith("TZ")) {
      return { region: "tanzania", language: "sw", currency: "TZS" } as const;
    }
    if (navLang.endsWith("UG")) {
      return { region: "uganda", language: "en", currency: "UGX" } as const;
    }
    return { region: "kenya", language: "sw", currency: "KES" } as const;
  };

  const [state] = useState(detect());
  return state;
};

export interface WebVitals {
  lcp: { fast: number; avg: number; slow: number };
  fid: { fast: number; avg: number; slow: number };
  cls: { fast: number; avg: number; slow: number };
  fcp?: { fast: number; avg: number; slow: number };
  region: string;
  lastUpdated: string;
}

export const useWebVitals = (region: string) => {
  const [vitals, setVitals] = useState<WebVitals | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchVitals = async () => {
    setIsLoading(true);
    try {
      const data = await seoService.getCoreWebVitals(region);
      // Normalize keys to match component expectations (fast/avg/slow)
      const normalized: WebVitals = {
        lcp: { fast: data.lcp.fast, avg: data.lcp.average ?? data.lcp.avg ?? 0, slow: data.lcp.slow },
        fid: { fast: data.fid.fast, avg: data.fid.average ?? data.fid.avg ?? 0, slow: data.fid.slow },
        cls: { fast: data.cls.fast, avg: data.cls.average ?? data.cls.avg ?? 0, slow: data.cls.slow },
        fcp: data.fcp ? { fast: data.fcp.fast, avg: data.fcp.average ?? data.fcp.avg ?? 0, slow: data.fcp.slow } : undefined,
        region,
        lastUpdated: new Date().toISOString(),
      };
      setVitals(normalized);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVitals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region]);

  return { vitals, isLoading, reload: fetchVitals } as const;
};

export const useSitemap = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSitemaps = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      // Simulate generation work; integrate with backend when available
      await new Promise((r) => setTimeout(r, 800));
    } catch (e: any) {
      setError(e?.message || "Failed to generate sitemaps");
    } finally {
      setIsGenerating(false);
    }
  };

  return { isGenerating, error, generateSitemaps } as const;
};

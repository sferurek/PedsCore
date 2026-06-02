import type { Reference } from "../types.js";

const genericSearchHosts = [
  "google.",
  "bing.",
  "duckduckgo.",
  "search.yahoo."
];

const genericReferenceHosts = [
  "jamanetwork.com",
  "journals.lww.com",
  "onlinelibrary.wiley.com",
  "publications.aap.org",
  "pubmed.ncbi.nlm.nih.gov",
  "www.sciencedirect.com"
];

export const isLikelyGenericReferenceUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();
    const pathname = parsedUrl.pathname.toLowerCase();

    if (genericSearchHosts.some((host) => hostname.includes(host))) {
      return true;
    }

    if (
      hostname === "pubmed.ncbi.nlm.nih.gov" &&
      !/^\/\d+\/?$/.test(pathname)
    ) {
      return true;
    }

    if (pathname.includes("/search") || pathname.includes("/search-results")) {
      return true;
    }

    return (
      genericReferenceHosts.some((host) => hostname === host) &&
      (pathname === "" || pathname === "/")
    );
  } catch {
    return true;
  }
};

export const isValidReferenceUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return (
      (parsedUrl.protocol === "https:" || parsedUrl.protocol === "http:") &&
      !isLikelyGenericReferenceUrl(url)
    );
  } catch {
    return false;
  }
};

export const getReferenceUrl = (reference: Reference): string | undefined => {
  if (reference.doi) {
    return `https://doi.org/${reference.doi.trim()}`;
  }

  if (reference.pmid) {
    return `https://pubmed.ncbi.nlm.nih.gov/${reference.pmid.trim()}/`;
  }

  if (reference.url && isValidReferenceUrl(reference.url)) {
    return reference.url;
  }

  return undefined;
};

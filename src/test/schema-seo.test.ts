import { describe, expect, it } from "vitest";
import { structuredData, siteUrl, siteTitle } from "@/lib/structured-data";
import fs from "node:fs";
import path from "node:path";

interface PersonEntity {
  "@type": string;
  "@id": string;
  name: string;
  alternateName: string[];
  url: string;
  email: string;
  telephone: string;
  sameAs: string[];
  alumniOf: {
    name: string;
  };
  knowsAbout: string[];
}

interface WebSiteEntity {
  "@type": string;
  "@id": string;
  url: string;
  name: string;
  publisher: { "@id": string };
  author: { "@id": string };
}

interface WebPageEntity {
  "@type": string | string[];
  "@id": string;
  url: string;
  isPartOf: { "@id": string };
  about: { "@id": string };
  mainEntity: { "@id": string };
}

interface SoftwareAppEntity {
  "@type": string;
  "@id": string;
  name: string;
  codeRepository: string;
}

describe("Schema.org & Technical SEO Integrity", () => {
  it("provides valid Schema.org graph with correct context", () => {
    expect(structuredData["@context"]).toBe("https://schema.org");
    expect(Array.isArray(structuredData["@graph"])).toBe(true);
  });

  it("includes Person entity with accurate verified details", () => {
    const person = structuredData["@graph"].find(
      (item) => item["@type"] === "Person"
    ) as PersonEntity | undefined;
    expect(person).toBeDefined();
    expect(person?.["@id"]).toBe(`${siteUrl}/#person`);
    expect(person?.name).toBe("Nisarg Pranitbhai Shah");
    expect(person?.alternateName).toContain("Nisarg Shah");
    expect(person?.url).toBe(`${siteUrl}/`);
    expect(person?.email).toBe("mailto:nisargshah1109@gmail.com");
    expect(person?.telephone).toBe("+919904253656");
    expect(person?.sameAs).toContain("https://www.linkedin.com/in/nisarg-shah-545910354");
    expect(person?.sameAs).toContain("https://github.com/nisargshah1109");
    expect(person?.alumniOf.name).toContain("Drs. Kiran & Pallavi Patel Global University (KPGU)");
    expect(person?.knowsAbout).toContain("Artificial Intelligence");
    expect(person?.knowsAbout).toContain("Retrieval-Augmented Generation (RAG)");
  });

  it("includes WebSite entity linking back to Person", () => {
    const website = structuredData["@graph"].find(
      (item) => item["@type"] === "WebSite"
    ) as WebSiteEntity | undefined;
    expect(website).toBeDefined();
    expect(website?.["@id"]).toBe(`${siteUrl}/#website`);
    expect(website?.url).toBe(`${siteUrl}/`);
    expect(website?.name).toBe(siteTitle);
    expect(website?.publisher["@id"]).toBe(`${siteUrl}/#person`);
    expect(website?.author["@id"]).toBe(`${siteUrl}/#person`);
  });

  it("includes WebPage / ProfilePage entity connected to WebSite and Person", () => {
    const webpage = structuredData["@graph"].find((item) =>
      Array.isArray(item["@type"])
        ? item["@type"].includes("ProfilePage")
        : item["@type"] === "ProfilePage" || item["@type"] === "WebPage"
    ) as WebPageEntity | undefined;
    expect(webpage).toBeDefined();
    expect(webpage?.["@id"]).toBe(`${siteUrl}/#webpage`);
    expect(webpage?.url).toBe(`${siteUrl}/`);
    expect(webpage?.isPartOf["@id"]).toBe(`${siteUrl}/#website`);
    expect(webpage?.about["@id"]).toBe(`${siteUrl}/#person`);
    expect(webpage?.mainEntity["@id"]).toBe(`${siteUrl}/#person`);
  });

  it("includes SoftwareApplication entities for both featured projects", () => {
    const apps = structuredData["@graph"].filter(
      (item) => item["@type"] === "SoftwareApplication"
    ) as SoftwareAppEntity[];
    expect(apps).toHaveLength(2);

    const pdfApp = apps.find((a) => a.name === "PDF-Based QA");
    expect(pdfApp).toBeDefined();
    expect(pdfApp?.codeRepository).toBe(
      "https://github.com/nisargshah1109/pdf-question-answering-ai.git"
    );

    const kpguApp = apps.find((a) => a.name === "KPGU University AI Assistant");
    expect(kpguApp).toBeDefined();
    expect(kpguApp?.codeRepository).toBe(
      "https://github.com/nisargshah1109/kpgu-ai-assistant.git"
    );
  });

  it("verifies public robots.txt and sitemap.xml exist and match standards", () => {
    const publicDir = path.resolve(__dirname, "../../public");
    const robotsPath = path.join(publicDir, "robots.txt");
    const sitemapPath = path.join(publicDir, "sitemap.xml");
    const ogImagePath = path.join(publicDir, "og-image.png");

    expect(fs.existsSync(robotsPath)).toBe(true);
    expect(fs.existsSync(sitemapPath)).toBe(true);
    expect(fs.existsSync(ogImagePath)).toBe(true);

    const robotsContent = fs.readFileSync(robotsPath, "utf-8");
    expect(robotsContent).toContain("User-agent: *");
    expect(robotsContent).toContain(
      "Sitemap: https://nisarg-shah-portfolio-opal.vercel.app/sitemap.xml"
    );

    const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
    expect(sitemapContent).toContain(
      "<loc>https://nisarg-shah-portfolio-opal.vercel.app/</loc>"
    );
  });
});

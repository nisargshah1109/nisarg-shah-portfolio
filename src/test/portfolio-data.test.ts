import { describe, expect, it } from "vitest";
import { contact, profile, projects, skillGroups } from "@/data/portfolio";

describe("Portfolio Data Integrity", () => {
  it("has valid contact details with exact user information", () => {
    expect(contact.email).toBe("nisargshah1109@gmail.com");
    expect(contact.phone).toBe("9904253656");
    expect(contact.github).toBe("https://github.com/nisargshah1109");
    expect(contact.linkedin).toBe("https://www.linkedin.com/in/nisarg-shah-545910354");
  });

  it("has correct profile information", () => {
    expect(profile.name).toBe("Nisarg Pranitbhai Shah");
    expect(profile.shortName).toBe("Nisarg Shah");
    expect(profile.location).toContain("Vadodara");
  });

  it("contains both required projects with correct repository URLs", () => {
    expect(projects).toHaveLength(2);

    const pdfProject = projects.find((p) => p.id === "pdf-qa");
    expect(pdfProject).toBeDefined();
    expect(pdfProject?.title).toBe("PDF-Based QA");
    expect(pdfProject?.repoUrl).toBe("https://github.com/nisargshah1109/pdf-question-answering-ai.git");
    expect(pdfProject?.demoUrl).toBe("");

    const kpguProject = projects.find((p) => p.id === "kpgu-assistant");
    expect(kpguProject).toBeDefined();
    expect(kpguProject?.title).toBe("KPGU University AI Assistant");
    expect(kpguProject?.repoUrl).toBe("https://github.com/nisargshah1109/kpgu-ai-assistant.git");
    expect(kpguProject?.demoUrl).toBe("");
  });

  it("organizes skills across relevant domains", () => {
    expect(skillGroups.length).toBeGreaterThanOrEqual(4);
    const titles = skillGroups.map((g) => g.title);
    expect(titles).toContain("Programming");
    expect(titles).toContain("Web");
    expect(titles).toContain("Backend & Data");
    expect(titles).toContain("AI & Retrieval");
  });
});

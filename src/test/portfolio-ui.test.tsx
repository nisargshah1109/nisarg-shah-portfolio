import { describe, expect, it } from "vitest";
import { contact, projects } from "@/data/portfolio";

describe("UI Links and Contact Integrity", () => {
  it("verifies all external links and contact endpoints have correct values", () => {
    expect(contact.email).toBe("nisargshah1109@gmail.com");
    expect(contact.phone).toBe("9904253656");
    expect(contact.github).toBe("https://github.com/nisargshah1109");
    expect(contact.linkedin).toBe("https://www.linkedin.com/in/nisarg-shah-545910354");
  });

  it("verifies PDF QA project links and details", () => {
    const pdf = projects.find((p) => p.id === "pdf-qa");
    expect(pdf).toBeDefined();
    expect(pdf?.repoUrl).toBe("https://github.com/nisargshah1109/pdf-question-answering-ai.git");
    expect(pdf?.demoUrl).toBe("");
  });

  it("verifies KPGU Assistant project links and details", () => {
    const kpgu = projects.find((p) => p.id === "kpgu-assistant");
    expect(kpgu).toBeDefined();
    expect(kpgu?.repoUrl).toBe("https://github.com/nisargshah1109/kpgu-ai-assistant.git");
    expect(kpgu?.demoUrl).toBe("");
  });
});

import { describe, expect, it, vi } from "vitest";
import { renderToString } from "react-dom/server";

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<Record<string, unknown>>("@tanstack/react-router");
  return {
    ...actual,
    HeadContent: () => <meta name="tanstack-head" />,
    Scripts: () => <script id="tanstack-scripts" />,
  };
});

import { RootShell } from "@/routes/__root";

describe("RootShell HTML Rendering", () => {
  it("renders script type=application/ld+json directly inside document head", () => {
    const html = renderToString(
      <RootShell>
        <div>Page Body Content</div>
      </RootShell>
    );

    expect(html).toContain('<script type="application/ld+json">');
    expect(html).toContain("https://schema.org");
    expect(html).toContain("Nisarg Pranitbhai Shah");
    expect(html).toContain("https://nisarg-shah-portfolio-opal.vercel.app/#person");
    expect(html).toContain("https://nisarg-shah-portfolio-opal.vercel.app/#website");
    expect(html).toContain("https://nisarg-shah-portfolio-opal.vercel.app/#webpage");
    expect(html).toContain("PDF-Based QA");
    expect(html).toContain("KPGU University AI Assistant");

    // Exactly 1 JSON-LD script tag (no duplicates)
    const matches = html.match(/application\/ld\+json/g);
    expect(matches).toHaveLength(1);
  });
});



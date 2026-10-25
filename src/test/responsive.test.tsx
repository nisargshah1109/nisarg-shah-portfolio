import { describe, expect, it, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Route } from "@/routes/index";
import { contact, projects, profile } from "@/data/portfolio";

const Component = Route.options.component!;

const VIEWPORTS = [320, 360, 390, 430, 768, 1024, 1280, 1440, 1920];

describe("Responsive Viewport Verification", () => {
  afterEach(() => {
    cleanup();
  });

  VIEWPORTS.forEach((width) => {
    it(`renders cleanly and adaptively at ${width}px width`, () => {
      window.innerWidth = width;
      window.dispatchEvent(new Event("resize"));

      const { container } = render(<Component />);

      // Verify identity and headline are present
      const nameElements = screen.getAllByText(profile.shortName);
      expect(nameElements.length).toBeGreaterThanOrEqual(1);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Building practical AI experiences/i);

      // Verify project cards are rendered
      projects.forEach((p) => {
        expect(screen.getByText(p.title)).toBeInTheDocument();
      });

      // Verify contact elements exist
      expect(screen.getByText("Let's connect.")).toBeInTheDocument();
      expect(screen.getByText(contact.email)).toBeInTheDocument();
      expect(screen.getByText(`+91 ${contact.phone}`)).toBeInTheDocument();

      // Verify navigation structure
      const nav = screen.getByRole("navigation", { name: /Primary/i });
      expect(nav).toBeInTheDocument();

      // Hamburger button is rendered in the nav
      const menuBtn = screen.getByRole("button", { name: /Open navigation menu|Close navigation menu/i });
      expect(menuBtn).toBeInTheDocument();

      // Test toggling mobile menu
      fireEvent.click(menuBtn);
      const mobileMenu = container.querySelector("#mobile-menu");
      expect(mobileMenu).toBeInTheDocument();

      // Close mobile menu
      fireEvent.click(menuBtn);
      expect(container.querySelector("#mobile-menu")).not.toBeInTheDocument();
    });
  });

  it("verifies project details dialog opens with problem, approach, and GitHub repo link", () => {
    render(<Component />);
    const detailButtons = screen.getAllByRole("button", { name: /Project details/i });
    expect(detailButtons.length).toBe(2);

    // Open first dialog (PDF-Based QA)
    fireEvent.click(detailButtons[0]!);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "PDF-Based QA" })).toBeInTheDocument();

    const githubLink = screen.getByRole("link", { name: /View Repository on GitHub/i });
    expect(githubLink).toHaveAttribute("href", "https://github.com/nisargshah1109/pdf-question-answering-ai.git");

    // Close dialog
    const closeBtn = screen.getByRole("button", { name: /Close project details/i });
    fireEvent.click(closeBtn);
  });
});

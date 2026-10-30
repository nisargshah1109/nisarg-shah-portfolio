import { contact, profile, projects } from "@/data/portfolio";

export const siteUrl = "https://nisarg-shah-portfolio-opal.vercel.app";
export const siteTitle = "Nisarg Shah | Computer Science & AI/ML Portfolio";
export const siteDescription =
  "Official technical portfolio of Nisarg Pranitbhai Shah, Computer Science Engineering student at KPGU Vadodara specializing in AI/ML, Generative AI, RAG systems, and full-stack software development.";
export const siteImage = `${siteUrl}/og-image.png`;

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      alternateName: [profile.shortName, "Nisarg Shah"],
      givenName: "Nisarg",
      familyName: "Shah",
      url: `${siteUrl}/`,
      image: siteImage,
      jobTitle: "Computer Science Engineering Student & Software Developer",
      description:
        "Computer Science Engineering student at KPGU Vadodara specializing in AI/ML, Generative AI, Retrieval-Augmented Generation (RAG), and full-stack software engineering.",
      email: `mailto:${contact.email}`,
      telephone: `+91${contact.phone}`,
      sameAs: [contact.linkedin, contact.github],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Drs. Kiran & Pallavi Patel Global University (KPGU)",
        url: "https://kpgu.ac.in",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Vadodara",
          addressRegion: "Gujarat",
          addressCountry: "IN",
        },
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Vadodara",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Generative AI",
        "Retrieval-Augmented Generation (RAG)",
        "Computer Vision",
        "Python",
        "FastAPI",
        "React",
        "JavaScript",
        "TypeScript",
        "FAISS Vector Search",
        "Full-Stack Web Development",
        "Cloud & DevOps Fundamentals",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: siteTitle,
      alternateName: "Nisarg Shah Portfolio",
      description: siteDescription,
      inLanguage: "en-US",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      author: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": ["WebPage", "ProfilePage"],
      "@id": `${siteUrl}/#webpage`,
      url: `${siteUrl}/`,
      name: siteTitle,
      description: siteDescription,
      inLanguage: "en-US",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#person`,
      },
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: siteImage,
        width: "1200",
        height: "630",
      },
    },
    ...projects.map((p) => ({
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#project-${p.id}`,
      name: p.title,
      description: p.description,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Cross-platform",
      author: {
        "@id": `${siteUrl}/#person`,
      },
      codeRepository: p.repoUrl,
    })),
  ],
};

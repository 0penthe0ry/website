import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Open Theory",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "https://opentheory.pages.dev",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
            light: "#fafafa",         // Pure page/paper background
            lightgray: "#e5e5e5",     // Borders and graph lines
            gray: "#737373",          // Subtitles and metadata
            darkgray: "#171717",      // Main text body (almost pure black)
            dark: "#0a0a0a",          // Headings and titles
            secondary: "#2563eb",     // Accent link color (Classic LaTeX blue)
            tertiary: "#93c5fd",      // Hover highlights
            highlight: "rgba(37, 99, 235, 0.05)", // Soft background highlights
        },
        darkMode: {
            light: "#0a0a0a",         // Deep blackboard background
            lightgray: "#262626",     // Dark borders and graph grid
            gray: "#a3a3a3",          // Muted text
            darkgray: "#e5e5e5",      // Main crisp text body
            dark: "#fafafa",          // Bright headings
            secondary: "#60a5fa",     // Accent link color (Soft neon blue)
            tertiary: "#bfdbfe",      // Hover highlights
            highlight: "rgba(96, 165, 250, 0.1)", // Soft highlight overlay
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config

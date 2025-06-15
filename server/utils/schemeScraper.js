import axios from "axios";
import * as cheerio from "cheerio";

// Helper to load and parse a page
async function loadPage(url) {
  try {
    const response = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; MediSetuBot/1.0)" },
    });
    return cheerio.load(response.data);
  } catch (error) {
    console.error(`Failed to load ${url}:`, error.message);
    return cheerio.load(""); // Return empty cheerio object on error
  }
}

export default async function enhancedScraper() {
  const baseUrl = "https://www.nhp.gov.in";
  const urlsToScrape = [
    "/scheme-list",
    "/health-schemes",
    "/central-government-health-schemes_pg",
    "/state-health-schemes_pg",
  ];

  const allSchemes = [];

  for (const path of urlsToScrape) {
    const $ = await loadPage(baseUrl + path);

    // More robust selector for various scheme links/cards
    $("a:contains('scheme'), .scheme-item, .program-card").each((i, el) => {
      const name = $(el).text().trim().replace(/\s+/g, " ");
      const href = $(el).attr("href");
      if (name && href) {
        allSchemes.push({
          name,
          url: href.startsWith("http") ? href : baseUrl + href,
          source: path,
        });
      }
    });
  }

  return allSchemes;
}

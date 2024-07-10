import axios from "axios";
import * as cheerio from "cheerio";

export async function getFullArticle(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // This is a basic example and may need to be adjusted based on the website's structure
    const article = $("article").text();

    if (article) {
      return article.trim();
    } else {
      return "Couldn't extract article content";
    }
  } catch (error) {
    console.error("Error fetching article:", error);
    return "Error fetching article";
  }
}

// Example usage

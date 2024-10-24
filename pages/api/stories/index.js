import fs from "fs";
import path from "path";

const ITEMS_PER_PAGE = 10;

export default function handler(req, res) {
  if (req.method === "GET") {
    const page = parseInt(req.query.page || "1", 10);
    const stories = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "data/stories.json"), "utf-8")
    );

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedStories = stories.slice(startIndex, endIndex);

    res.status(200).json({
      stories: paginatedStories,
      currentPage: page,
      totalPages: Math.ceil(stories.length / ITEMS_PER_PAGE),
    });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

  export default function handler(req, res) {
    if (req.method === 'POST') {
      console.log(req);
    } else {
      // Handle any other HTTP method
    }
  }

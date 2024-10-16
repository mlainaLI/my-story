import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { slug } = req.query;
    const body = req.body;
    const character = {
      name: body.name || "",
      description: body.description || "",
      likes: body.likes || "",
      dislikes: body.dislikes || "",
    };

    const filePath = path.join(process.cwd(), "data/stories.json");
    const stories = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const newStories = stories.map((s) => {
      if (s.slug === slug) {
        if (!s.characters) {
          s.characters = [];
        }

        s.characters.push(character);
      }

      return s;
    });

    fs.writeFileSync(filePath, JSON.stringify(newStories, null, 2));

    res.status(200).json(newStories);
  }
}

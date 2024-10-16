import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body);
    const { slug } = req.query;
    const stories = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'data/stories.json'), 'utf-8')
    );
    const { body } = req;
    let storyIndex = -1;
    const story = stories.find((s, i) => {
      storyIndex = i;
      return s.slug === slug;
    });
    story.characters = [];
    story.characters.push(JSON.parse(body));

    const newStories = [
      ...stories.slice(0, storyIndex),
      ...stories.slice(storyIndex + 1),
    ];

    fs.writeFileSync(
      path.join(process.cwd(), 'data/stories.json'),
      JSON.stringify(newStories)
    );

    res.status(201).json(story);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

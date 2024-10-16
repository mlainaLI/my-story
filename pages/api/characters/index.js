import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  console.log('req.method', req.method)
  console.log('req.body', req.body)
  if (req.method === 'GET') {
    const stories = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data/stories.json'), 'utf-8'))
    const characters = stories.map((s) => s.characters).flat()
    res.status(200).json(characters)
  }
  if (req.method === 'POST') {
    try {
      const { name, description, likes, dislikes, slug } = req.body
      const stories = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data/stories.json'), 'utf-8'))
      const storie = stories.find((s) => s.slug === slug) || [];
      const characters = storie.characters || [];

      const character = {
        id: characters.length + 1,
        name,
        description,
        likes,
        dislikes
      }
      // create a characters array inside the stories.json
      characters.push(character)
      storie.characters = characters
      fs.writeFileSync(path.join(process.cwd(), 'data/stories.json'), JSON.stringify(stories, null, 2))
      res.status(201).json(character)
    } catch (error) {
      console.log('error', error)
    }
  }
  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { slug } = req.query
    const stories = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data/stories.json'), 'utf-8'))
    const story = stories.find((s) => s.slug === slug)

    if (story) {
      res.status(200).json(story)
    } else {
      res.status(404).json({ error: 'Story not found' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

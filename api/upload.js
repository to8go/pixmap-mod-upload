import { createUploadthing } from 'uploadthing/server';

const uploadthing = createUploadthing();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const middleware = uploadthing.middleware();
    await middleware(req, res);
    res.status(200).json({ message: 'File uploaded successfully!', files: req.files });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

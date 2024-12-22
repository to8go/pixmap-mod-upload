import { createUploadthing } from 'uploadthing/server';

const uploadthing = createUploadthing();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const apiKey = process.env.UPLOADTHING_API_KEY; // Access the secret key

    if (!apiKey) {
      return res.status(500).json({ error: 'API key is missing!' });
    }

    const middleware = uploadthing.middleware({ apiKey }); // Pass the key if required
    await middleware(req, res);

    res.status(200).json({ message: 'File uploaded successfully!', files: req.files });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

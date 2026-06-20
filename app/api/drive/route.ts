import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folderId = searchParams.get('folderId');

  if (!folderId) {
    return NextResponse.json({ error: 'Folder ID is required' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Google Drive API Key is not configured' }, { status: 500 });
  }

  try {
    const query = `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`;
    const fields = 'files(id, name, thumbnailLink)';
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=${encodeURIComponent(fields)}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to fetch from Google Drive');
    }

    const files = data.files.map((file: any) => {
      // thumbnailLink comes as https://...=s220
      // Replace =s220 with =s1000 for a larger, high-quality preview without needing direct download auth
      const highResThumbnail = file.thumbnailLink ? file.thumbnailLink.replace(/=s\d+/, '=s1000') : '';
      return {
        id: file.id,
        image_url: highResThumbnail,
        // Optional: you can strip the extension from the file name to use as a caption
        caption: file.name.replace(/\.[^/.]+$/, "")
      };
    });

    return NextResponse.json({ gallery: files });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

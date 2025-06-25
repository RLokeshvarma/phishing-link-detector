import { getLinkPreview } from 'link-preview-js';
import { checkPhishingUrl } from '../../utils/checkPhishing';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { url } = req.body;
  if (!url) return res.status(400).json({ message: 'URL is required' });

  try {
    const previewData = await getLinkPreview(url);
    const parsed = new URL(url);
    const domain = parsed.hostname.replace(/^www\./, '');

    const { riskLevel, status } = checkPhishingUrl(url);

    return res.status(200).json({
      status: 'success',
      data: {
        ...previewData,
        domain,
        protocol: parsed.protocol,
        riskLevel,
        status
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ status: 'error', message: 'Could not fetch preview' });
  }
}

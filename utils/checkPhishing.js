export function checkPhishingUrl(url) {
  const suspiciousKeywords = ['login', 'verify', 'secure', 'account', 'update', 'payment'];
  const shorteningServices = ['bit.ly', 'tinyurl.com', 'rb.gy', 't.co'];
  let score = 0;

  for (const word of suspiciousKeywords) {
    if (url.toLowerCase().includes(word)) score += 1;
  }

  for (const shortener of shorteningServices) {
    if (url.includes(shortener)) score += 2;
  }

  if (url.length > 75) score += 1;

  let riskLevel = '✅ Safe';
  if (score >= 3) riskLevel = '⚠️ Phishing (High Risk)';
  else if (score === 2) riskLevel = '🟠 Suspicious';

  // Assign status field
  let status = 'Valid';
  if (url.includes('unauthorized') || url.includes('restricted')) {
    status = 'Restricted / Unauthorized';
  } else if (!url.startsWith('http')) {
    status = 'Invalid';
  }

  return { riskLevel, status };
}

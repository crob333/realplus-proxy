export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Get parameters from query or use defaults
    const sinceDate = req.query.sinceDate || '2024-01-01 00:00:00';
    const max = req.query.max || '100';
    const offset = req.query.offset || '0';

    // Build RealPlus API URL
    const apiUrl = `http://rpmdata46.airpear.net:8080/ExclusiveListingService/LinkedListings?apiKey=sH3dK8uRiyN4cV6w&company=SSBL&sinceModifiedDate=${encodeURIComponent(sinceDate)}&max=${max}&offset=${offset}`;

    // Fetch from RealPlus
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`RealPlus API returned ${response.status}`);
    }

    const data = await response.json();
    
    // Return the data
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Error fetching listings:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch listings',
      message: error.message 
    });
  }
}

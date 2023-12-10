import type { NextApiRequest, NextApiResponse } from "next";

interface ProjectDetail {
  projectId: string;
  projectName: string;
  projectType: string;
  verraLink: string;
  polygonLink: string;
  beZeroRating: string;
  tco2Address: string;
  quantity: number;
  vintage: number;
  country: string;
  methodology: string;
}

interface Details {
  details: ProjectDetail[];
}

interface Image {
  projectId: string;
  url: string;
}

interface ApiResponse {
  details: Details;
  image: Image;
}

interface ApiErrorResponse {
  message: string;
  error?: string; // Optional error field
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | ApiErrorResponse>
) {
  try {
    const { projectId } = req.query;

    if (!projectId || typeof projectId !== 'string') {
      return res.status(400).json({ message: "Project ID is required" });
    }

    const detailsUrl = `https://aetlas-api.azurewebsites.net/BeZeroTest?projectId=${projectId}`;
    const imageUrl = `https://aetlas-api.azurewebsites.net/BeZeroTest/${projectId}/image`;

    // Fetch project details
    const detailsResponse = await fetch(detailsUrl);
    if (!detailsResponse.ok) {
      throw new Error(`Failed to fetch details: ${detailsResponse.statusText}`);
    }

    const detailsText = await detailsResponse.text();
    let details;
    try {
      details = JSON.parse(detailsText);
    } catch (parseError:any) {
      throw new Error(`Error parsing details JSON: ${parseError.message}`);
    }

    // Fetch project image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
    }

    const imageText = await imageResponse.text();
    let image;
    try {
      image = JSON.parse(imageText);
    } catch (parseError:any) {
      throw new Error(`Error parsing image JSON: ${parseError.message}`);
    }

    res.status(200).json({ details, image });
  } catch (error:any) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
}
// pages/api/bezero.ts
import type { NextApiRequest, NextApiResponse } from "next";

 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Retrieve the projectId from the query parameters
    const { projectId } = req.query;

    // Check if projectId is provided
    if (!projectId || typeof projectId !== 'string') {
      res.status(400).json({ message: "Project ID is required" });
      return;
    }

    // Construct the URLs for details and image
    const detailsUrl = `https://aetlas-api.azurewebsites.net/BeZeroTest?projectId=${projectId}`;
    const imageUrl = `https://aetlas-api.azurewebsites.net/BeZeroTest/${projectId}/image`;

    // Fetch project details
    const detailsResponse = await fetch(detailsUrl);
    const details = await detailsResponse.json();

    // Fetch project image
    const imageResponse = await fetch(imageUrl);
    const image = await imageResponse.json(); // Adjust this line based on the actual response format of the image endpoint

    // Return both details and image data
    res.status(200).json({ details, image });
  } catch (error) {
    console.error('api',error); // Add this line to log the error to the server console

    res.status(500).json({ message: "Error fetching data" });
  }
}


//VCS-439 or VCS-674
import type { NextApiRequest, NextApiResponse } from "next";
import * as pako from 'pako';
import { createGunzip } from 'zlib';
import { promisify } from 'util';
import { pipeline } from 'stream';
import { Readable } from 'stream';
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
}

// Function to safely parse JSON and handle gzip encoding
async function parseJSON(response: Response): Promise<any> {
  const contentType = response.headers.get("content-type");
  const contentEncoding = response.headers.get("content-encoding");

  if (contentType && contentType.includes("application/json")) {
    let text = '';

    if (contentEncoding === 'gzip') {
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const gunzip = createGunzip();
      const decompressedStream = Readable.from(buffer).pipe(gunzip);
      const chunks: Buffer[] = [];
      for await (const chunk of decompressedStream) {
        chunks.push(chunk);
      }
      text = Buffer.concat(chunks).toString('utf-8');
    } else {
      text = await response.text();
    }

    if (!text) {
      throw new Error('Response body is empty');
    }
    return JSON.parse(text);
  } else {
    const responseBody = await response.text();
    console.log(`Response body: ${responseBody}`);
    throw new Error('Response is not JSON');
  }
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

    const detailsUrl = `https://aetlas-api.azurewebsites.net/BeZero?projectId=${projectId}`;
    const imageUrl = `https://aetlas-api.azurewebsites.net/BeZero/${projectId}/image`;

    const detailsResponse = await fetchWithTimeout(detailsUrl);
    if (!detailsResponse.ok) {
      throw new Error(`Failed to fetch details: ${detailsResponse.statusText}`);
    }
    const details = await parseJSON(detailsResponse);

    const imageResponse = await fetchWithTimeout(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
    }
    const image = await parseJSON(imageResponse);

    res.status(200).json({ details, image });
  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: errorMessage });
  }
}

async function fetchWithTimeout(resource: string, options: RequestInit = {}, timeout: number = 5000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  });
  clearTimeout(id);
  return response;
}
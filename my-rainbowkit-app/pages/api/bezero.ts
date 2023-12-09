// pages/api/bezero.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetch('https://aetlas-api.azurewebsites.net/BeZero?projectId=VCS-766');
        const data = await response.json();

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data' });
    }
}

import express, { Request, Response } from 'express';
import { Song } from '../models/song';

const router = express.Router();

router.get('/api/songs', async (_: Request, res: Response) => {
    const songs = await Song.find({});

    return res.status(200).json(songs);
});

export { router as indexSongRouter };
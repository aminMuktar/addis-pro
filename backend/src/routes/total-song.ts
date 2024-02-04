import express, { Request,Response } from 'express';
import { Song } from '../models/song';

const router = express.Router();

router.get(
    '/api/songs/total',
    async ( _:Request,res: Response) => {
        try {
            const totalSongs = await Song.countDocuments();
            res.status(200).json({ total: totalSongs });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
);

export { router as totalSongsRouter };
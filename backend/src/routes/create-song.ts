import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Song } from '../models/song';

const router = express.Router();

router.post(
    '/api/songs',
    [
        body('title').not().isEmpty().withMessage('Title is required!'),
        body('artist').not().isEmpty().withMessage('Artist is required!'),
        body('album').not().isEmpty().withMessage('album is required!'),
        body('genre').not().isEmpty().withMessage('genre is required!'),
    ],
    async (req: Request, res: Response) => {
        const { title, artist, album, genre } = req.body;

        const song = Song.build({
          title,
          artist,
          album,
          genre,
        });

        await song.save();

        res.status(200).json(song);
    },
);

export { router as createSongRouter };
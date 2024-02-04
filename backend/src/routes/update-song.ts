import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Song } from '../models/song';

const router = express.Router();

router.put(
    '/api/songs/:id',
    [
      body('title').not().isEmpty().withMessage('Title is required!'),
      body('artist').not().isEmpty().withMessage('Artist is required!'),
      body('album').not().isEmpty().withMessage('album is required!'),
      body('genre').not().isEmpty().withMessage('genre is required!'),
    ],
    async (req: Request, res: Response) => {
        const song = await Song.findById(req.params.id);

        if (!song) {
            console.log('song not found')
        }
        song?.set({
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            genre: req.body.genre,
        });

        await song?.save();

        res.status(200).json({message:"song updated successfully",data: song});;
    },
);

export { router as updateSongRouter };
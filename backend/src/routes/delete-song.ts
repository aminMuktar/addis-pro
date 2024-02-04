import express, { Request, Response } from 'express';
import { Song } from '../models/song';

const router = express.Router();

router.delete(
  '/api/songs/:id',
  async (req: Request, res: Response) => {
      try {
          const song = await Song.findById(req.params.id);

          if (!song) {
              return res.status(404).json({ message: 'Song not found' });
          }

          await song.deleteOne(); // Delete the song from the database

          return res.json({ message: 'Song deleted successfully' });
      } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
      }
  },
);

export { router as deleteSongRouter };
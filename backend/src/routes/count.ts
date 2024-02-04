import express, { Request, Response } from 'express';
import { Song } from '../models/song';

const router = express.Router();

router.get(
    '/api/artists/total',
    async (_:Request, res: Response) => {
        try {
            const totalArtists = await Song.aggregate([
                { $group: { _id: '$artist' } },
                { $group: { _id: null, count: { $sum: 1 } } }
            ]);

            const count = totalArtists.length > 0 ? totalArtists[0].count : 0;

            res.json({ total: count });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
);
router.get(
    '/api/albums/total',
    async (_:Request, res: Response) => {
        try {
            const totalAlbum = await Song.aggregate([
                { $group: { _id: '$album' } },
                { $group: { _id: null, count: { $sum: 1 } } }
            ]);

            const count = totalAlbum.length > 0 ? totalAlbum[0].count : 0;

            res.json({ total: count });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
);
router.get(
    '/api/genre/total',
    async (_:Request, res: Response) => {
        try {
            const totalGenre = await Song.aggregate([
                { $group: { _id: '$genre' } },
                { $group: { _id: null, count: { $sum: 1 } } }
            ]);

            const count = totalGenre.length > 0 ? totalGenre[0].count : 0;

            res.json({ total: count });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
);
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

router.get('/api/genre/songs', async (_: Request, res: Response) => {
    try {
        const genreCounts = await Song.aggregate([
            { $group: { _id: '$genre', count: { $sum: 1 } } }
        ]);

        res.json({data:genreCounts});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/api/artists/stats', async (_: Request, res: Response) => {
    try {
        const artistStats = await Song.aggregate([
            {
                $group: {
                    _id: '$artist',
                    songsCount: { $sum: 1 },
                    albumsCount: { $addToSet: '$album' }
                }
            },
            {
                $project: {
                    _id: 1,
                    songsCount: 1,
                    albumsCount: { $size: '$albumsCount' }
                }
            }
        ]);

        res.json({data:artistStats});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/api/albums/songs', async (_: Request, res: Response) => {
    try {
        const albumSongsCount = await Song.aggregate([
            { $group: { _id: '$album', songsCount: { $sum: 1 } } }
        ]);

        res.json({data:albumSongsCount});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/api/songs/filter', async (req: Request, res: Response) => {
    try {
        // Extract filter criteria from query parameters
        const { title, artist, album, genre } = req.query;

        // Build the filter object based on provided criteria
        const filter: any = {};
        if (title) filter.title = { $regex: new RegExp(title as string, 'i') };
        if (artist) filter.artist = { $regex: new RegExp(artist as string, 'i') };
        if (album) filter.album = { $regex: new RegExp(album as string, 'i') };
        if (genre) filter.genre = { $regex: new RegExp(genre as string, 'i') };

        // Query the database with the constructed filter
        const filteredSongs = await Song.find(filter);

        res.json(filteredSongs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


export { router as countRouter };

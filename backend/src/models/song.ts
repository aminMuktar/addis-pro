import mongoose from "mongoose";

// fields: title, artist,album,genere
interface SongPropsInterface {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

interface SongModelInterface extends mongoose.Model<SongDocInterface>{
  build(params: SongPropsInterface): SongDocInterface;
}


interface SongDocInterface extends mongoose.Document{
  title: string;
  artist: string;
  album: string;
  genre: string;
  createdAt?: string;
  updatedAt?: string; 
}

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    album: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
   
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(_,ret){
        ret.id = ret._id
        delete ret._id
      }
    }
  }
)

songSchema.statics.build =(params: SongPropsInterface)=> new Song(params);

const Song = mongoose.model<SongDocInterface,SongModelInterface>(
  'Song',
  songSchema
)
export { Song };
import express from "express";
import "express-async-errors"
import { json } from "body-parser";
import { createSongRouter } from "./routes/create-song";
import { indexSongRouter } from "./routes/get-song";
import { updateSongRouter } from "./routes/update-song";
import { deleteSongRouter } from "./routes/delete-song";
import { countRouter } from "./routes/count";
import cors from 'cors'

const app = express()
app.set('trust proxy',true)
app.use(json())
app.use(cors())
app.use(createSongRouter);
app.use(indexSongRouter);
app.use(updateSongRouter);
app.use(deleteSongRouter);
app.use(countRouter);
export { app }
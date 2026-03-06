import dotenv from 'dotenv';
import express from 'express';
import {getWebsiteVideoList} from "./src/VideoList.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8082;
const HOME_URL = process.env.HOME_URL || 'https://example.com/';

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/', async (req, res) => {
  const videoList = await getWebsiteVideoList(HOME_URL);
  res.json(videoList);
})

app.post('/search', async (req, res) => {
  const query = req.query.search || "";
  const videoList = await getWebsiteVideoList(`${HOME_URL}/?s=${query}`);
  res.json(videoList);
});

app.post('/video', async (req, res) => {
  const query = req.query.video || "";
  const videoList = await getWebsiteVideoList(`${HOME_URL}/${query}`);
  res.json(videoList);
})

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
})
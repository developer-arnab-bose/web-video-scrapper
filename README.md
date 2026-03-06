# Node API - Video Scraper

A lightweight Node.js API built with Express and Cheerio to scrape video content from a target website.

## Features

- **Video Listing:** Fetches a list of videos from the home page.
- **Search:** Allows searching for videos by query.
- **Video Details:** Extracts specific video page details, including player source and thumbnails.
- **Pagination Support:** Includes previous and next page indices in the response.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository or navigate to the project directory.
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the root directory (or update the existing one) with the following variables:

```env
HOME_URL=https://example.com  # The base URL of the website to scrape
PORT=8082                     # The port on which the server will run
```

## Running the Application

To start the server in development mode (using nodemon):
```bash
npm run dev
```

The server will be listening at `http://localhost:8082` (or your configured `PORT`).

## API Endpoints

All endpoints use the `POST` method.

### 1. Get Home Video List
**URL:** `/`
**Method:** `POST`
**Description:** Fetches the video list from the home page.

### 2. Search Videos
**URL:** `/search`
**Method:** `POST`
**Query Parameters:**
- `search`: The search query string.
**Example:** `POST /search?search=action`

### 3. Get Specific Video
**URL:** `/video`
**Method:** `POST`
**Query Parameters:**
- `video`: The video page path or identifier.
**Example:** `POST /video?video=awesome-video-slug`

## Response Format

The API returns a JSON array. The first element contains metadata about the request and the results, followed by the video items.

```json
[
  {
    "totalItems": 10,
    "currentPageIndex": 1,
    "previousPageIndex": 0,
    "nextPageIndex": 2,
    "searchQuery": "",
    "videoPlayerThumbnail": "...",
    "videoPlayerVideo": "..."
  },
  {
    "tittle": "Video Title",
    "time": "10:00",
    "thumbnail": "https://...",
    "videoPage": "video-slug"
  },
  ...
]
```

## Technologies Used

- **Express:** Web framework for Node.js.
- **Cheerio:** Fast, flexible, and lean implementation of core jQuery for the server.
- **dotenv:** Loads environment variables from a `.env` file.
- **Nodemon:** Monitor for any changes in your source and automatically restart your server.

## License

This project is licensed under the [ISC License](LICENSE).

## Author

Arnab Bose

import * as cheerio from 'cheerio';

function getPageIndex(url) {
  if (url === 0) return 0;
  const match = url.match(/\/page\/(\d+)\//);
  return match ? parseInt(match[1], 10) : 1;
}

export async function getWebsiteVideoList(url) {
  const response = await fetch(url);
  const $ = cheerio.load(await response.text());
  
  const videos = [];
  const videosDiv = $('div[class="videos"]');
  
  videosDiv.find("a.video.lazy-bg").each((index, elem) => {
    
    const tittle = $(elem).find('h2.vtitle').text();
    const time = $(elem).find('span.clock').text();
    const thumbnail = $(elem).attr("data-bg");
    const videoPage = new URL($(elem).attr("href")).pathname.split('/').filter(Boolean).pop();
    
    videos.push({tittle, time, thumbnail, videoPage});
  });
  
  const previousPageIndex = $('main#primary > nav.navigation > div.nav-links > div.nav-next > a').attr('href') || 0;
  const nextPageIndex = $('main#primary > nav.navigation > div.nav-links > div.nav-previous > a').attr('href') || 0;
  
  videos.unshift({
    totalItems: videos.length,
    currentPageIndex: getPageIndex(url),
    previousPageIndex: getPageIndex(previousPageIndex),
    nextPageIndex: getPageIndex(nextPageIndex),
    searchQuery: new URL(url).searchParams.get('s') || "",
    videoPlayerThumbnail: $("div.video-container > video#my-video").attr("poster") || "",
    videoPlayerVideo: $("div.video-container > video#my-video > source").attr("src") || ""
  })
  
  return videos;
}
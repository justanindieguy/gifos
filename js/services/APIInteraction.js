export const apiKey = "?api_key=p5xaovgXICuZtXq8GIjqPXWisfhx9xN9";
export const API = "https://api.giphy.com/v1/";
export const trendingEndpoint = "trending/searches" + apiKey;
export const trendingGIFsEndpoint = "gifs/trending" + apiKey;
export const searchEndpoint = "gifs/search" + apiKey;
export const suggestionsEndpoint = "gifs/search/tags";
export const uploadEndpoint = "https://upload.giphy.com/v1/gifs" + apiKey;
export const gifsByIdEndpoint = "gifs" + apiKey;

export const checkAndParse = (res) => {
  if (!res.ok) {
    throw { status: res.status, msg: "Something went wrong" };
  }

  return res.json();
};

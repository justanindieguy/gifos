import { checkLocalStorage } from "../utils/utils.js";

export const favoriteGIFsLocalStrg = [];
export const allFavoriteGIFs = [];

checkLocalStorage(favoriteGIFsLocalStrg, "favorites");

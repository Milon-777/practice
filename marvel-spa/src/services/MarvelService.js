import useHtttp from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHtttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _baseOffset = 210;
  const _apiKey = "748e83ba2c9bf92e5102e19762a1d9d9";

  const getAllCharacters = async (offset = _baseOffset) => {
    const result = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`
    );
    return result.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const result = await request(
      `${_apiBase}characters/${id}?apikey=${_apiKey}`
    );
    return _transformCharacter(result.data.results[0]);
  };

  const getAllComics = async (offset = 0) => {
    const result = await request(
      `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
    );

    return result.data.results.map(_transformComic);
  };

  const getComic = async (id) => {
    const result = await request(`${_apiBase}comics/${id}?${_apiKey}`);

    return _transformComic(result.data.results[0]);
  };

  const _transformComic = (comic) => {
    return {
      id: comic.id,
      title: comic.title,
      description: comic.description,
      pageCount: comic.pageCount
        ? `${comic.pageCount} p.`
        : `No information about the number of pages`,
      thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
      language: comic.textObjects.language || "en-us",
      prices: comic.prices,
    };
  };

  const _transformCharacter = (character) => {
    return {
      id: character.id,
      name: character.name,
      description: character.description
        ? `${character.description.slice(0, 210)}...`
        : "There is no description for this character",
      thumbnail: character.thumbnail.path + "." + character.thumbnail.extension,
      homepage: character.urls[0].url,
      wiki: character.urls[1].url,
      comics: character.comics.items,
    };
  };

  return {
    loading,
    error,
    clearError,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComic,
  };
};

export default useMarvelService;

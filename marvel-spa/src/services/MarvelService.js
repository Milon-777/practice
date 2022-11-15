class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";

  getResource = async (url) => {
    let result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
  };

  getAllCharacters = async () => {
    const result = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&apikey=${process.env.REACT_APP_API_KEY}`
    );
    return result.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const result = await this.getResource(
      `${this._apiBase}characters/${id}?apikey=${process.env.REACT_APP_API_KEY}`
    );
    return this._transformCharacter(result.data.results[0]);
  };

  _transformCharacter = (character) => {
    return {
      name: character.name,
      description: character.description
        ? `${character.description.slice(0, 210)}...`
        : "There is no description for this character",
      thumbnail: character.thumbnail.path + "." + character.thumbnail.extension,
      homepage: character.urls[0].url,
      wiki: character.urls[1].url,
    };
  };
}

export default MarvelService;

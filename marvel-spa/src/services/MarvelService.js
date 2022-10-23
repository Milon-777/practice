class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";

  getResource = async (url) => {
    let result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
  };

  getAllCharacters = () => {
    return this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&apikey=${process.env.REACT_APP_API_KEY}`
    );
  };

  getCharacter = (id) => {
    return this.getResource(
      `${this._apiBase}characters/${id}?apikey=${process.env.REACT_APP_API_KEY}`
    );
  };
}

export default MarvelService;

import { Component } from "react";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import MarvelService from "../../services/MarvelService";

import "./charList.scss";
import abyss from "../../resources/img/abyss.jpg";

class CharList extends Component {
  state = {
    characterList: [],
    isLoading: true,
    isError: false,
  };

  marvelService = new MarvelService();

  componentDidMount = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.handleCharacterListLoaded)
      .catch(this.handleError);
  };

  handleCharacterListLoaded = (characterList) => {
    this.setState({ characterList, isLoading: false });
  };

  handleError = () => {
    this.setState({
      isLoading: false,
      isError: true,
    });
  };

  renderItems(array) {
    const items = array.map((item) => {
      let imageStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imageStyle = { objectFit: "unset" };
      }

      return (
        <li className="char__item" key={item.id}>
          <img src={item.thumbnail} alt={item.name} style={imageStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { characterList, isLoading, isError } = this.state;

    const items = this.renderItems(characterList);

    const errorMessage = isError ? <ErrorMessage /> : null;
    const spinner = isLoading ? <Spinner /> : null;
    const content = !(isLoading || isError) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;

import { Component } from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./randomChar.scss";
import thor from "../../resources/img/thor.jpeg";
import mjolnir from "../../resources/img/mjolnir.png";

class RandomChar extends Component {
  state = {
    character: {},
    isLoading: true,
    hasError: false,
  };

  marvelService = new MarvelService();

  componentDidMount = () => {
    this.updateCharacter();
  };

  handleCharacterLoaded = (character) => {
    this.setState({ character, isLoading: false });
  };

  handleCharacterLoading = () => {
    this.setState({ isLoading: true, hasError: false });
  };

  handleError = () => {
    this.setState({
      isLoading: false,
      hasError: true,
    });
  };

  updateCharacter = () => {
    const id = Math.floor(Math.random() * (1010789 - 1009146) + 1009146);
    this.handleCharacterLoading();
    this.marvelService
      .getCharacter(id)
      .then(this.handleCharacterLoaded)
      .catch(this.handleError);
  };

  render() {
    const { character, isLoading, hasError } = this.state;
    const errorMessage = hasError ? <ErrorMessage /> : null;
    const spinner = isLoading ? <Spinner /> : null;
    const content = !(isLoading || hasError) ? (
      <View character={character} />
    ) : null;

    return (
      <div className="randomchar">
        {errorMessage}
        {spinner}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button
            onClick={this.updateCharacter}
            className="button button__main"
          >
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

const View = ({ character }) => {
  const { name, description, thumbnail, homepage, wiki } = character;
  let imageStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imageStyle = { objectFit: "contain" };
  }

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={imageStyle}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;

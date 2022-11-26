import { Component } from "react";
import PropTypes from "prop-types";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";

class CharInfo extends Component {
  state = {
    character: null,
    isLoading: false,
    hasError: false,
  };

  marvelService = new MarvelService();

  componentDidMount = () => {
    this.updateCharacter();
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.characterId !== prevProps.characterId) {
      this.updateCharacter();
    }
  };

  componentDidCatch = () => {
    this.setState({ hasError: true });
  };

  updateCharacter = () => {
    const { characterId } = this.props;
    if (!characterId) {
      return;
    }

    this.handleCharacterLoading();
    this.marvelService
      .getCharacter(characterId)
      .then(this.handleCharacterLoaded)
      .catch(this.handleError);
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

  render() {
    const { character, isLoading, hasError } = this.state;

    const skeleton = character || isLoading || hasError ? null : <Skeleton />;
    const errorMessage = hasError ? <ErrorMessage /> : null;
    const spinner = isLoading ? <Spinner /> : null;
    const content = !(isLoading || hasError || !character) ? (
      <View character={character} />
    ) : null;

    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ character }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = character;

  let imageStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imageStyle = { objectFit: "contain" };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imageStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">Homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "There is no comics with this character."}
        {comics
          .map((item, i) => {
            return (
              <li key={i} className="char__comics-item">
                {item.name}
              </li>
            );
          })
          .slice(0, 10)}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  characterId: PropTypes.number,
};

export default CharInfo;

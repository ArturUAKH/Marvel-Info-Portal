import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import mjolnir from '../../resources/img/mjolnir.png';

import './randomChar.scss';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false
    };

    marvelService = new MarvelService();

    onCharLoaded = char => {
        this.setState({ char, loading: false });
    };

    onCharloading = () => {
        this.setState({ loading: true });
    };
    //prettier-ignore
    updateChar = () => {
        this.onCharloading();
        const id = Math.floor(Math.random() * (1011200 - 1011000) + 1011000);
        this.marvelService.getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError);
    };

    onError = () => {
        this.setState({ loading: false, error: true });
    };

    componentDidMount() {
        this.updateChar();
    }

    render() {
        const { char, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spiner = loading ? <Spinner /> : null;
        const content = spiner || errorMessage || <View char={char} />;

        return (
            <div className="randomchar">
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!
                        <br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">Or choose another one</p>
                    <button
                        className="button button__main"
                        onClick={this.updateChar}
                    >
                        <div className="inner">try it</div>
                    </button>
                    <img
                        src={mjolnir}
                        alt="mjolnir"
                        className="randomchar__decoration"
                    />
                </div>
            </div>
        );
    }
}

const View = ({ char }) => {
    const { name, description, thumbnail, homePage, wiki } = char;

    let imgStyle = { objectFit: 'cover' };
    if (
        thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    ) {
        imgStyle = { objectFit: 'contain' };
    }

    return (
        <div className="randomchar__block">
            <img
                src={thumbnail}
                alt="Random character"
                className="randomchar__img"
                style={imgStyle}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homePage} className="button button__main">
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

import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';
import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
    };

    marvelService = new MarvelService();
    //prettier-ignore
    componentDidMount() {
        this.marvelService.getAllCharacters()
        .then(this.onCharListLoadaded)
        .catch(this.onError);
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    };

    onCharListLoadaded = charList => {
        this.setState({
            charList,
            loading: false
        });
    };

    renderItems = list => {
        let items = list.map(item => {
            let imgStyle = { objectFit: 'cover' };
            if (
                item.thumbnail ===
                'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            ) {
                imgStyle = { objectFit: 'unset' };
            }
            return (
                <li
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}
                >
                    <img
                        src={item.thumbnail}
                        alt={item.name}
                        style={imgStyle}
                    />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });
        return <ul className="char__grid">{items}</ul>;
    };

    render() {
        const { charList, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spiner = loading ? <Spinner /> : null;
        const items = this.renderItems(charList);
        const list = spiner || errorMessage || items;
        return <div className="char__list">{list}</div>;
    }
}

export default CharList;

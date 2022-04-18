import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelServices';
import Rocket from '../errors/Rocket.gif'
import ErrorGif from '../errors/error.gif'
import PropTypes from 'prop-types';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        onEnded: false,
        characterSelected: ''
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.onRequest()
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {

        let ended = false

        if (newCharList.length < 9) {
            ended = true
        }

        this.setState(({ charList, offset }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            onEnded: ended,
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderItems(arr) {
        const items = arr.map((item) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }

            const active = this.state.characterSelected === item.id,
                clazz = active ? 'char__item char__item_selected' : 'char__item';

            return (
                <li
                    className={clazz}
                    key={item.id}
                    onClick={() => {
                        this.setState({ characterSelected: item.id })
                        this.props.onCharSelected(item.id)
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }


    render() {

        const { charList, loading, error, newItemLoading, offset, onEnded } = this.state;

        const items = this.renderItems(charList);

        const errorGif = error ? <img style={{ margin: '0 auto', display: 'block', width: '200px', height: '200px' }} src={ErrorGif} alt='Loading...' /> : null;
        const rocketGif = loading ? <img style={{ margin: '0 auto', display: 'block', width: '100px', height: '100px' }} src={Rocket} alt='Loading...' /> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorGif}
                {rocketGif}
                {content}
                <button
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}
                    style={{ 'display': onEnded ? 'none' : 'block' }}
                    className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;
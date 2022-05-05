import './charList.scss';
import { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelServices';
import Rocket from '../errors/Rocket.gif'
import ErrorGif from '../errors/error.gif'
import PropTypes from 'prop-types';

const CharList = (props) => {

    const [charList, setCharList] = useState([])
    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState(false)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [onEnded, setOnEnded] = useState(false)
    // const [characterSelected, setCharacterSelected] = useState('')

    const {loading, error, getAllCharacters} = useMarvelService()


    // const marvelService = new MarvelService()


    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        // setNewItemLoading(false)
        // onCharListLoading()
        getAllCharacters(offset)
            .then(onCharListLoaded)
            // .catch(onError)
    }

    // const onCharListLoading = () => {
    //     setNewItemLoading(true)
    // }

    const onCharListLoaded = (newCharList) => {

        let ended = false

        if (newCharList.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList])
        // setLoading(false)
        setNewItemLoading(false)
        setOffset(offset => offset + 9)
        setOnEnded(onEnded => ended)

    }

    // const onError = () => {
    //     setError(true)
    //     setLoading(false)
    // }

    const itemRefs = useRef([])


    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'))
        itemRefs.current[id].classList.add('char__item_selected')
        itemRefs.current[id].focus()
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }

            // const active = this.state.characterSelected === item.id,
            //     clazz = active ? 'char__item char__item_selected' : 'char__item';

            return (
                <li
                    className='char__item'
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        // this.setState({ characterSelected: item.id })
                        props.onCharSelected(item.id)
                        focusOnItem(i)
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            props.onCharSelected(item.id)
                            focusOnItem(i)
                        }
                    }}
                >
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


    // const { charList, loading, error, newItemLoading, offset, onEnded } = this.state;

    const items = renderItems(charList);

    const errorGif = error ? <img style={{ margin: '0 auto', display: 'block', width: '200px', height: '200px' }} src={ErrorGif} alt='Loading...' /> : null;
    const rocketGif = loading && !newItemLoading ? <img style={{ margin: '0 auto', display: 'block', width: '100px', height: '100px' }} src={Rocket} alt='Loading...' /> : null;
    // const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {errorGif}
            {rocketGif}
            {items}
            <button
                disabled={newItemLoading}
                onClick={() => onRequest(offset)}
                style={{ 'display': onEnded ? 'none' : 'block' }}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;
import './charInfo.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelServices';
import Skeleton from '../skeleton/Skeleton'
import Rocket from '../errors/Rocket.gif'
import ErrorGif from '../errors/error.gif'
import PropTypes from 'prop-types'

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService()


    componentDidMount() {
        this.updateChar()
    }


    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }


    updateChar = () => {
        const { charId } = this.props

        if (!charId) {
            return
        }


        this.onCharLoading()

        this.marvelService
            .getCharacter(charId)
            .then(this.onCharLoaded)
            .catch(this.onError)

    }


    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {

        const { char, loading, error } = this.state

        const skeleton = char || loading || error ? null : <Skeleton />
        const loadingGif = loading ? <img style={{ margin: '0 auto', display: 'block', width: '100px', height: '100px' }} src={Rocket} alt='Loading...' /> : null
        const errorGif = error ? <img style={{ margin: '0 auto', display: 'block', width: '200px', height: '200px' }} src={ErrorGif} alt='Loading...' /> : null
        const content = !(loading || error || !char) ? <View char={char} /> : null

        return (
            <div className="char__info">
                {skeleton}
                {loadingGif}
                {errorGif}
                {content}
            </div>
        )
    }
}

const View = ({ char }) => {

    const { name, description, thumbnail, homepage, wiki, comics } = char

    let imgStyle = { 'objectFit': 'cover' };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' };
    }


    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">


                {comics.length > 0 ? null : 'There is no comics for this character'}


                {
                    comics.map((item, i) => {
                        if (comics.length > 10) {
                            comics.length = 10
                        }

                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }

            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelServices';
import Rocket from '../errors/Rocket.gif'
import './singleComic.scss';
import Page404 from './Page404';


const SingleComic = () => {

    const { comicId } = useParams()
    const [comic, setComic] = useState(null)
    const { loading, error, clearError, getComic } = useMarvelService()

    useEffect(() => {
        updateComic()
    }, [comicId])


    const updateComic = () => {
        clearError()
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    const loadingGif = loading ? <img style={{ margin: '0 auto', display: 'block', width: '100px', height: '100px' }} src={Rocket} alt='Loading...' /> : null
    const page404 = error ? <Page404/> : null
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null


    return (
        <>
            {loadingGif}
            {page404}
            {content}
        </>
    )
}

const View = ({ comic }) => {

    const { title, description, pageCount, thumbnail, language, price } = comic

    return (
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComic;
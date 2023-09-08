import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import MarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [lazyLoading, setLazyLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnd, setComicsEnd] = useState(false);

    const {loading, error, getAllComics, clearError} = MarvelService();

    useEffect(() => {
        onRequest(offset, 8, true);
    },[]);

    const onComicsReade = (newComics) => {
        let end = false;

        if(comics.length < 9) {
            end = true;
        }

        setComics(comics => [...comics, ...newComics]);
        setLazyLoading(lazyLoading => false);
        setOffset(offset => offset + 9);
        setComicsEnd(comicsEnd => end);

        console.log(comics);
    };

    const onRequest = (offset, limit, lazyLoading) => {
        lazyLoading ? setLazyLoading(false) : setLazyLoading(true);
        getAllComics(offset, limit)
            .then(onComicsReade);
    };

    const renderComics = () => {
        return comics.map((com, i) => {
            const {
                id,
                homepage,
                price,
                thumbnail,
                name
            } = com;

            let imgStyle = {'objectFit': 'cover'};

            if (thumbnail.includes('image_not_available')) {
                imgStyle = {'objectFit': 'contain'};
            }

            const stringPrice = price === 0 ? 
                'NOT AVAILABLE' : 
                `${price}$`; 

            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} style={imgStyle} alt={name} className="comics__item-img"/>
                        <div className="comics__item-name">{name}</div>
                        <div className="comics__item-price">{stringPrice}</div>
                    </Link>
                </li>
            )
        });
    };

    const components = renderComics();

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {/* <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li> */}
                {components}
            </ul>
            <button onClick={() => onRequest(offset, 8, false)} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
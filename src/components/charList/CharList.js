import './charList.scss';

import React, {useEffect, useRef, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const CharList = (props) => {

    const [characters,setCharacters] = useState([]);
    const [lazyLoading, setLazyLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);
    const [offset, setOffset] = useState(210);

    const _refs = useRef([]);


    const {
        loading, 
        error, 
        getAllCharacters
    } = MarvelService();


    useEffect(() => {
        onRequesr(offset, true);
    },[]);

    // setRefs = elem => {
    //     _refs.push(elem); 
    // };

    const onCharLoaded = (newCharacters) => {
        let ended = false;

        if (newCharacters.length < 9) {
            ended = true;
        }

        setCharacters(characters => [...characters, ...newCharacters]);
        setLazyLoading(lazyLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);

        console.log(_refs);
    };

    const onRequesr = (offset, initial) => {
        initial ? setLazyLoading(false) : setLazyLoading(true);
        getAllCharacters(offset)
            .then(onCharLoaded);
    };

    const onSelectedCard = (id) => {
        const currentCard = _refs.current.filter(ref => +ref.dataset.key === id)[0];

        currentCard.focus();
    };

    const cardsRender = () => {
        return characters.map(({name,thumbnail, id} , i) => {
            let imgStyle = {'objectFit': 'cover'};

            if (thumbnail.includes('image_not_available')) {
                imgStyle = {'objectFit': 'unset'};
            }

            

            return (
                

                <li tabIndex={2 + i} ref={el => _refs.current[i] = el} data-key={id} className="char__item" key={i} onClick={() => {
                    props.onCharSelected(id);
                    onSelectedCard(id);
                    }}>
                        <img src={thumbnail} alt={name} style={imgStyle}/>
                        <div className="char__name">{name}</div>
                </li>
            )
        })
    }


    const components = cardsRender();

    return (
        <div className="char__list">
            <ul className="char__grid">
                {components}
                {/* <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item char__item_selected">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li>
                <li className="char__item">
                    <img src={abyss} alt="abyss"/>
                    <div className="char__name">Abyss</div>
                </li> */}
            </ul>
            <button className="button button__main button__long" disabled={lazyLoading} onClick={()=> onRequesr(offset)} style={{'display': charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>

    )
}

export default CharList;
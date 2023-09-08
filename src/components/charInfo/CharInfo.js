import './charInfo.scss';
import {useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';
import SearchChar from '../searchChar/SearchChar';
import setContent from '../../utils/setContent';


const  CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {charId} = props;

    const {getCharacter, setProcess, clearError, process} = MarvelService();

    useEffect(() => {
        updateChar();
    },[charId]);

    const updateChar = () => {
        if (!charId) {
            return;
        }

        clearError();

        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    };

    const onCharLoaded = (char) => {

        setChar(char);

    };


    // const skeleton = char || error || loading ? null : <Skeleton/>;
    // const errorMessage = error ? <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error || !char) ? <View char={char}/>:null;

    return (
        <div className='char__group'>
            <div className="char__info">
                {/* {skeleton}
                {errorMessage}
                {spinner}
                {content} */}

                {setContent(process, View, char)}
            </div>
            <SearchChar/>
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;

    console.log(comics);

    let imgStyle = {'objectFit': 'cover'};

    if (thumbnail.includes('image_not_available')) {
                imgStyle = {'objectFit': 'unset'};
    }

    const contents = comics.map((item, i, self) => {
        if (i > 9) {
            return;
        }
        const id = item.resourceURI.replace(/[\w\:\/\.]+(?<!\/[0-9]+)/g,'');
        return (
            <li className="char__comics-item" key={i}>
                <Link to={`/comics/${id}`}>
                    {item.name}
                </Link>
            </li>
        )
    })

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}        
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    !contents.length ?  
                    <li className="char__comics-item">
                        There are no comics for this character yet.
                    </li>
                        : contents
                }
            </ul>
        </>
    );
}

export default CharInfo;
import './singleComicPage.scss';
import {useParams } from 'react-router-dom';
import {useEffect, useState } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import SingeCharacter from './singeLayout/singeCharacter/singeCharacter';
import SingleComic from './singeLayout/singeComic/singeComic';

const SingleComicPage = ({dataType}) => {
    const {
        id 
    } = useParams();

    const [single, setSingle] = useState(null);

    const {loading, error, getComic, getCharacter, clearError} = MarvelService();

    useEffect(() => {
        update();
    },[id]);

    const update = () => {
        clearError();

        if (dataType === 'comics') {
            getComic(id)
                .then(onLoaded);
        }else {
            getCharacter(id)
                .then(onLoaded);
        }
    };

    const onLoaded = (id) => {
        setSingle(id);
    };

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    let content = null;

    if (!(loading || error || !single) && dataType === 'comics') {
        content = <SingleComic comic={single}/>
    }

    if (!(loading || error || !single) && dataType === 'character') {
        content = <SingeCharacter character={single}/>
    }

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}


export default SingleComicPage;
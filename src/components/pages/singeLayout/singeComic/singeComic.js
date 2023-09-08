import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const SingleComic = ({comic}) => {
    const {
        name, 
        description, 
        pageCount, 
        thumbnail,
        language,
        price
    } = comic;

    console.log(comic);

    return (
        
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} comics book`}
                />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
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
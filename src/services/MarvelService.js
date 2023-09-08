import {
    useHttp
} from "../hooks/http.hook";


const MarvelService = () => {
    const {
        loading,
        request,
        error,
        clearError,
        process,
        setProcess
    } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=9e18a137cc553e80778c9dd6b5715608';
    const _baseOffset = 210;
    const _baseLimit = 9;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=${_baseLimit}&offset=${offset}&${_apiKey}`);
        console.log(res);
        return res.data.results.map(result => _transformCharacter(result));
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        console.log(res);
        return _transformCharacter(res.data.results[0]);
    };

    const getAllComics = async (offset = _baseOffset, limit = _baseLimit) => {
        const res = await request(`${_apiBase}comics?limit=${limit}&offset=${offset}&${_apiKey}`);

        return res.data.results.map(result => _transformComics(result));
    };

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);

        return _transformComics(res.data.results[0]);
    };

    const setSearchCharacter = async(name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);

        return _transformCharacter(res.data.results[0]);
    };

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        };
    };

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            name: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount? `${comics.pageCount} p.` : 'Not information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            homepage: comics.urls[0].url,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices[0].price? `${comics.prices[0].price} $`: 'Not availabe',
        };
    };

    return {
        loading,
        error,
        process,
        setProcess,
        getAllCharacters,
        getCharacter,
        clearError,
        getAllComics,
        getComic,
        setSearchCharacter
    };
};

export default MarvelService;
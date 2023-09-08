import { useForm } from 'react-hook-form';
import './SearchChar.scss';
import MarvelService from '../../services/MarvelService';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchChar = () => {
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [character, setCharacter] = useState({});
    const {setSearchCharacter} = MarvelService();

    return (
        <form className="search" onSubmit={handleSubmit(data => {
            setSearchCharacter(data.character)
                .then(setCharacter)
                .catch(()=> {
                    setCharacter(null);
                });
        })}>
           <fieldset className="search__fieldset">
                <legend className="search__title">
                    Or find a character by name:
                </legend>
                <div className="search__container">
                    <input type="text" id="character" name="character" {...register('character', {required: 'This field is required'})} className='search__input'/>
                    <div className="search__group">
                        <button className="button button__main">
                                <div className='inner'>Find</div>
                        </button>
                    </div>
                </div>
                {character?.id ?
                            <Link to={`/character/${character.id}`} className="button button__main">
                                <div className='inner'>To page</div>
                            </Link> 
                        :null}
           </fieldset>
           <fieldset className="search__fieldset">
            {errors.character ? 
                <p className="search__error">{errors.character.message}</p>
                : !character 
                    ? <p className="search__error">The character was not found. Check the name and try again</p>:null }
            {character.id ? <p className="search__succes">There is! Visit {character.name} page ?</p> :null}
           </fieldset>
        </form>
    );
};

export default SearchChar;
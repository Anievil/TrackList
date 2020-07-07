import React from 'react';
import './formStyle.css';

function Input(props){
        return(
            <form className='searchForm' onSubmit={props.onSubmit}>
                <input type='text' name='search' className='searchFormInput'  />
                <button type='submit' name='button' className='searchFormButton' value=''/>          
            </form>
        );
}

export default Input;
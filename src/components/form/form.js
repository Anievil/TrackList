import React from 'react';
import './formStyle.css';

class Input extends React.Component{
    render(){
        return(
            <form className='searchForm'>
                <input type='text' className='searchFormInput'/>
                <input type='submit' className='searchFormButton' value='' />
                
            </form>
        );
    }
}

export default Input;
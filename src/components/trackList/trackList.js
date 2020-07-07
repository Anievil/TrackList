import React from 'react'
import './trackListStyle.css';
import Input from '../form/form'
import music from '../icons/music.svg';
import load from '../icons/loading.gif';

class TrackList extends React.Component{    
    constructor(props){
        super(props);
        this.state={
            info: undefined
        }
        this.json = this.json.bind(this)
    }

    async json(e){
        let term = 'term';
        if(e){
            e.preventDefault();
            term = e.target.elements.search.value;
        }
        const res = await fetch(`https://itunes.apple.com/search?term=${term}&limit=10&media=music`)
        .then(response => {
            return response.json()
        })
        .then(json => {
                return json
        })                                                                                              //чтения данных из json файла 
        .catch(ex =>{
            console.log('parsing failed', ex)
        })
        this.setState({
            info: res.results
        })
    }

    async componentDidMount(){
        this.json()  
    }

    openAccordeon(e){
        e.preventDefault();

        const cont = e.target.parentNode;                       
        const list = cont.parentNode;

        const contArr = list.querySelectorAll('.trackListLi')

        for(let i = 1; i < contArr.length; i++){
            const hidden = contArr[i].querySelector('.trackInfo'),
            button = contArr[i].querySelector('.trackListButton');                                        //открытие и закрытие аккордеона              
            if(!hidden.classList.contains('visibilityHidden') || e.target.parentNode !== contArr[i]){
                hidden.classList.add('visibilityHidden')
                button.classList.remove('closeIcon')
            }
            else if(e.target.parentNode === contArr[i]){
                hidden.classList.remove('visibilityHidden')
                e.target.classList.add('closeIcon');
            }
        }
    }

    render(){
        const info = this.state.info;
        if(info !== undefined){
            return(    
                <>
                    <Input onSubmit={this.json}/>
                    <ul className='treckList'>
                        <li className='trackListLi'>    
                            <p className='trackListP'>Artist</p>
                            <p className='trackListP'>Track</p>
                            <p className='trackListP'>Colection</p>
                            <p className='trackListP'>Genre</p>
                        </li>
                        {
                            info.map(item => (
                            <li key={item.trackId} className='trackListLi'>
                                <img className='trackListImg' src={item.artworkUrl100} alt='Album preview'/>
                                <p className='trackListP'>{item.artistName}</p>
                                <p className='trackListP'>{item.trackName}</p>
                                <p className='trackListP'>{item.collectionName}</p>
                                <p className='trackListP'>{item.primaryGenreName}</p>
                                <div className='trackListButton' onClick={this.openAccordeon}></div>
                                <div className='trackInfo visibilityHidden'>
                                    <div className='trackInfoName'>
                                        <h2 className='trackInfoNameH2'>{item.artistName} - {item.trackName}</h2>
                                        <img className='trackInfoNameImg' src={music} alt='Music icon'/>
                                    </div>
                                    <div className='trackInfoBlock'>
                                        <div className='trackInfoAlbum'>
                                            <p><strong>Collection: </strong>{item.collectionName}</p>
                                            <p><strong>Track count: </strong>{item.trackCount}</p>
                                            <p><strong>Price: </strong>{item.collectionPrice} USD</p>
                                        </div>
                                        <div className='trackInfoTrack'>
                                            <p><strong>Track duration: </strong>{Math.floor(item.trackTimeMillis / 1000 / 60)}:{ Math.floor(item.trackTimeMillis / 1000 % 60) < 10 ? '0' + Math.floor(item.trackTimeMillis / 1000 % 60) : Math.floor(item.trackTimeMillis / 1000 % 60)} min</p>
                                            <p><strong>Track price: </strong>{item.trackPrice} USD</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                        }
                    </ul>
                </>
            );
        }
        else{
            return(
                <div className='load'><img src={load} alt='loading spinner'/></div>
            )
        }
    }
}

export default TrackList
import React from 'react'
import './trackListStyle.css';
import music from '../icons/music.svg';
import load from '../icons/loading.gif';

class TrackList extends React.Component{    
    constructor(props){
        super(props);
        this.state={
            info: undefined
        }
    }

    async json(){
        const res = await fetch(`https://itunes.apple.com/search?term=term&limit=10&media=music`)
        .then(function(response) {
            return response.json()
        })
        .then(function(json) {
                return json
        })                                                                                              //чтения данных из 
        .catch(function(ex) {
            console.log('parsing failed', ex)
        })

        this.setState({
            info: res.results
        })
    }

    componentDidMount(){
        this.json()     //выполняет метод json() 1 раз сразу после монтирования 
    }

    openAccordeon(e){
        e.preventDefault();
        e.target.classList.toggle('closeIcon');
        const cont = e.target.parentNode;                       //открытие и закрытие аккордеона
        const info = cont.querySelector('.trackInfo');
        info.classList.toggle('visibilityHidden')
    }

    render(){
        const info = this.state.info;
        console.log(info)
        if(info !== undefined){
            return(    
                <>
                    <ul className='treckList'>
                        <li className='trackListLi'>    
                            <p className='trackListP'>Artist</p>
                            <p className='trackListP'>Track</p>
                            <p className='trackListP'>Colection</p>
                            <p className='trackListP'>Genre</p>
                        </li>
                        {
                            info.map(item => (
                            <li key={item.trackName} className='trackListLi'>
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
                                            <p><strong>Track duration: </strong>{Math.floor(item.trackTimeMillis / 1000 / 60)}:{ Math.floor(item.trackTimeMillis / 1000 % 60) < 10 ? '0' + Math.floor(item.trackTimeMillis / 1000 % 60) : Math.floor(item.trackTimeMillis / 1000 % 60)}</p>
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
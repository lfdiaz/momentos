import React from 'react';
import './SongList.css';

class SongList extends React.Component{

    clickHandler(song, currentSong){

        let audio = document.getElementById('audio');
 
        currentSong(song);
        
        if(audio.paused){
            audio.autoplay = true;
            audio.play();
        }else{
            audio.pause();
            audio.autoplay = false;
        }

    }

    render(){

        let songJSX = [];

        if(this.props.data){
            songJSX = this.props.data.tracks.items.map((value,index) => {
                if(index <= 4){
                    return <div key={index} className='row song-list align-items-center'>
                                <div className='col-3'>
                                    <button className='btn btn-light play' onClick={()=>this.clickHandler(value, this.props.currentSong)}><i className="pt-1 material-icons" >play_arrow</i></button>
                                </div>
                                <div className='col-3'>
                                    <p>{value.artists[0].name}</p>
                                </div>
                                <div className='col-3'>
                                    <p>{value.name}</p>
                                </div>
                                <div className='col-3'>
                                    <p>{value.album.name}</p>
                                </div>
                            </div>
                }
            })
        }

        return(
            <div>
                <h3 className='text-center'>Songs</h3>
                {songJSX}
            </div>
        )
    }
}

export default SongList;
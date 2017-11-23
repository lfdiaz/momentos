import React from 'react';
import './AudioPlayer.css';

class AudioPlayer extends React.Component{



    clickHandler(){
        let audio = document.getElementById('audio');
        if(audio.paused){
            audio.play();
            audio.autoplay = true;
        }else{
            audio.pause();
        }
    }

    render(){

        let playerJSX = (
            <div>
                <div className='player'>
                    <div className='album-cover'>
                        <img src="https://pbs.twimg.com/profile_images/635903331383255041/1wOerhPu.png"  />
                    </div>

                    <div className='song-info'>
                        <h1 className='song-title'>{this.props.currentSong.name}</h1>
                        
                    </div>
                    <div className='player-buttons'>
                        {<button className='btn btn-light play' ><i className="material-icons">skip_previous</i></button>}
                        <button className='btn btn-light play' onClick={this.clickHandler}><i className="material-icons" >play_arrow</i>
                            <audio id='audio' src={this.props.currentSong.preview_url}  />
                        </button>
                        <button className='btn btn-light play' ><i className=" material-icons">skip_next</i></button>
                    </div>
                </div>
            </div>
            )

        return (
            <div>
                {playerJSX}
            </div>
        )
    }
}

export default AudioPlayer;
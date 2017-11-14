import React from 'react';
import './SongList.css';

class AudioPlayer extends React.Component{



    clickHandler(){
        let audio = document.getElementById('audio');
        //let source = 'play_arrow';
        if(audio.paused){
            audio.play();
            audio.autoplay = true;
            //Change playing status of the current song
            //source = 'pause';
        }else{
            audio.pause();
        }
        //changeIcon(source);
    }

    render(){

        let musicJSX = (
            <div className='m-3 text-center fixed-bottom'>
              <p>{this.props.currentSong.name}</p>

              <button className='btn btn-light play'><i className="material-icons">skip_previous</i></button>

              <button className='btn btn-light play' onClick={this.clickHandler}><i className="material-icons" >play_arrow</i>
                <audio id='audio' src={this.props.currentSong.preview_url}/>
              </button>

              <button className='btn btn-light play'><i className=" material-icons">skip_next</i></button>
            </div>
        )

        return(
            <div>
                {musicJSX}
            </div>
        )
    }
}

export default AudioPlayer;
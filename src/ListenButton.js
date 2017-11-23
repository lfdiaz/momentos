/* global webkitSpeechRecognition */
/* global SpeechSynthesisUtterance */
import React from 'react';
import './SongList.css';
import axios from 'axios';

class ListenButton extends React.Component{

    constructor(props){
        super(props);
        this.recognition = '';

        this.clickHandler = this.clickHandler.bind(this);
    }

    checkCommand(sentence){

        let audio = document.getElementById('audio');

        let command = sentence.toLowerCase();
        console.log(command);

        if(command === 'play'){
            //If there exists a source then play the song
            if(audio.src){
                audio.autoplay = true;
                audio.play();
            }else{
                //Else ask the user which song to play
                this.speakCommand('Which song do you want to play?');
            }

        }else if(command === 'stop' || command === 'stop playing' || command === 'mute' || command === 'pause'){

            audio.pause();

        }else if(command.indexOf('play') !== -1){

            audio.pause();
            this.getSong(command.slice('play'.length+1));

        }else if(command.indexOf('first') !== -1 || command.indexOf('second') !== -1  || command.indexOf('third') !== -1  || command.indexOf('fourth') !== -1  || command.indexOf('fifth') !== -1 ){
            //Create an array of the possible options to be chosen
            let numbers = ['first','second', 'third', 'fourth', 'fifth'];
            let which = '';
            //Loop thru each to check if it exists on the sentence said by the user
            numbers.forEach( value => {
                if(command.indexOf(value) !== -1){
                    //If it is then return only the number
                    which = command.slice(command.indexOf(value), command.indexOf(value) + value.length)
                }
            })

            switch(which){
                case 'first':
                    this.props.currentSong(this.props.data.tracks.items[0]);
                    console.log(audio.src);
                    audio.play();
                    break;
                case 'second':
                    this.props.currentSong(this.props.data.tracks.items[1]);
                    audio.play();
                    break;
                case 'third':
                    this.props.currentSong(this.props.data.tracks.items[2]);
                    audio.play();
                    break;
                case 'fourth':
                    this.props.currentSong(this.props.data.tracks.items[3]);
                    audio.play();
                    break;
                case 'fifth':
                    this.props.currentSong(this.props.data.tracks.items[4]);
                    audio.play();
                    break;
                default:
                    console.log('None found');
            }

        }else if(command.indexOf('next') !== -1){

            for(let i = 0; i < 5;i++){

                if(this.props.data.tracks.items[i].id === this.props.song.id){
                    audio.pause();
                    this.props.currentSong(this.props.data.tracks.items[i+1]);
                    return;
                }
            }

        }else if(command.indexOf('preview') !== -1){

            for(let i = 0; i < 5;i++){
                
                if(this.props.data.tracks.items[i].id === this.props.song.id){
                    audio.pause();
                    this.props.currentSong(this.props.data.tracks.items[i-1]);
                    return;
                }
            }

        }


    }

    getSong(word){

        let url = 'https://api.spotify.com/v1/search?q=' + word + '&type=track,artist';
        
        //Make the api request to get the information from Spotify 
        axios.get(url, {
            headers: {
            Accept: "application/json",
            Authorization: "Bearer BQDaXZb9DIeKGJhg57ZPXRyNJ1drH1l0cvvYOGak2zLykOL-wxuP5jMVSLiZ7um2KbFrearbX2F8mhmx2tMEKBfvsjmf8q20MMglE244QSxQujfE60MgfhUiyP7-syzeP6CbVPXuhxf302s"
            }
        }).then( value => {

            if(value.data.tracks.items.length > 0){  
                this.props.setWordData(word, value.data);
                this.speakCommand('Which song do you want to play?')
            }else{
                this.speakCommand('Sorry, I did not find that song. Please try again');
            }

        }).catch(error => {
            console.log(error);
        })

    }

    speakCommand(word){
        var msg = new SpeechSynthesisUtterance(word);
        window.speechSynthesis.speak(msg);
    }

    componentDidMount(){
        
        if(!('webkitSpeechRecognition' in window)){
            console.log('Not supported');
        }else{
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-US';
            this.recognition.maxAlternatives = 1;
        }

        window.addEventListener('keydown', (e) => {
            //If space key is pressed start listening
            if(e.keyCode===32){
                this.recognition.start();
            } 
          })
    
        this.recognition.onstart = () => {
            console.log('Listening');
            if(!this.props.displayListening){
                this.props.display();
            }
        }

        this.recognition.onend = ()=> {
            this.recognition.start();
        }

        this.recognition.onresult = (event) => {

            for(let i = event.resultIndex; i < event.results.length; i++){

                if(event.results[i].isFinal){

                    let word = event.results[i][0].transcript;
                    //show what was listened and what will be searched

                    this.checkCommand(word);

                }else{
                    //Display what is being listened but not the final result
                    
                }
            }
        }
        
    }

    clickHandler(e){
    this.recognition.start();
    }

    render(){
        return(
            <div className='m-3 align-middle'>
                <button className='btn btn-light inline' onClick={this.clickHandler}>Listen</button>
                <span className='text-center mx-4'>
                    {this.props.displayListening ? <Display/> : null}
                    <span className='mx-4 float-right'>{this.props.listening? this.props.listening : null}</span>
                </span>
            </div>
        )
    }
}

export default ListenButton;

function Display(){
    return (
        <span className='mx-4'>Listening...</span>
    );
}

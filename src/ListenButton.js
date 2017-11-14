/* global webkitSpeechRecognition */
import React from 'react';
import './SongList.css';
import axios from 'axios';

class ListenButton extends React.Component{

    constructor(props){
        super(props);
        this.recognition = '';

        this.clickHandler = this.clickHandler.bind(this);
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
    
        this.recognition.onstart = () => {
            console.log('Listening');
            this.props.display();
        }

        this.recognition.onend = ()=> {
            this.props.display();
            console.log('Not listening');
        }

        this.recognition.onresult = (event) => {
            if(typeof(event.results) === 'undefined'){
            this.recognition.stop();
            return
            }

            for(let i = event.resultIndex; i < event.results.length; i++){

                if(event.results[i].isFinal){

                    //Stop showing listening... word
                    this.props.display();
                    let word = event.results[i][0].transcript;
                    let data = '';
                    //show what was listened and what will be searched
                    this.props.displayWord(word);

                    console.log('Final: ' + event.results[i][0].transcript);

                    let url = 'https://api.spotify.com/v1/search?q=' + word + '&type=track,artist';
                    
                    //Make the api request to get the information from Spotify 
                    axios.get(url, {
                        headers: {
                        Accept: "application/json",
                        Authorization: "Bearer BQBd8gihwfo38D_AV-c2v224JDV7uxJxp--nBfuK8CshCAl6tXrXmrzu9QRYtabuqdn9beYSLPJG-Z3scTo2xN6VMKMWqw9DIjlaYd9Mzfj_p8-kYyWgYupQHsofE-pR6FqnF2PCpDEjOqbmSw"
                        }
                    }).then( value => {
                        data = value.data;
                        this.props.setWordData(word, data);
                        console.log(value.data);
                    }).catch(error => {
                        console.log(error);
                    })

                }else{
                    //Display what is being listened but not the final result
                    this.props.displayWord(event.results[i][0].transcript);
                }
            }
        }
        
    }

    clickHandler(e){
    this.recognition.start();
    }

    render(){
        return(
            <div className='m-3'>
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

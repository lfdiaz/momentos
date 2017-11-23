/* global webkitSpeechRecognition */
import React, { Component } from 'react';
import './App.css';
import ListenButton from './ListenButton';
import SongList from './SongList'
import AudioPlayer from './AudioPlayer';

class App extends Component {

  constructor(){
    super();

    this.state = {
      word: '',
      data: '',
      currentSong: '',
      displayListening: false,
      listening: ''
    }

    this.setWordData = this.setWordData.bind(this);
    this.currentSong = this.currentSong.bind(this);
    this.display = this.display.bind(this);
    this.displayWord = this.displayWord.bind(this);

  }

  setWordData(word, data){

    console.log(data);
    this.setState({
      word: word,
      data : data
    })

  }

  currentSong(src){

    this.setState({
      currentSong : src
    })

  }

  display(){
    this.setState({
      displayListening: !this.state.displayListening
    })
  }

  displayWord(word){
    this.setState({
      listening: word
    })
  }


  render() {

    return (
      <div className="container-fluid">
        <ListenButton setWord={this.setWord} setWordData={this.setWordData} displayListening={this.state.displayListening} display={this.display} displayWord={this.displayWord} listening={this.state.listening} data={this.state.data} currentSong={this.currentSong} song={this.state.currentSong}/>
        <SongList data={this.state.data} currentSong={this.currentSong}/>
        <AudioPlayer currentSong={this.state.currentSong} data={this.state.data}/>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Card from "./components/Card";
import imagesarray from "./imagesarray.json";
//import logo from './logo.svg';  
import './App.css';

class App extends Component {
  // set the state by using the array of our clickable images in imagesarray.json array
  state = {
    imagesarray,
    score: 0,
    highestscore: 0
  };

  gameOver = () => {
    if (this.state.score > this.state.highestscore) {
      this.setState({highestscore: this.state.score}, function() {
        console.log(this.state.highestscore);
      });
    }
    this.state.imagesarray.forEach(card => {
      card.count = 0;
    });
    console.log(`Game over and your score was: ${this.state.score}`);
    this.setState({score: 0});
    return true;
  }

  clickCount = id => {
    this.state.imagesarray.find((k, i) => {
      if (k.id === id) {
        if(imagesarray[i].count === 0){
          imagesarray[i].count = imagesarray[i].count + 1;
          this.setState({score : this.state.score + 1}, function(){
            console.log(this.state.score);
          });
          this.state.imagesarray.sort(() => Math.random() - 0.5)
          return true; 
        } else {
          this.gameOver();
        }
      }
    });
  }
  // render the image card after it is clicked
  render() {
    return (
      <Wrapper>
        <Header score={this.state.score} highestscore={this.state.highestscore}>Clicky Game</Header>
        {this.state.imagesarray.map(card => (
          <Card
            clickCount={this.clickCount}
            id={card.id}
            key={card.id}
            image={card.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;

import React from 'react';

class Animal extends React.Component {
  constructor() {
    super()
    this.fetchAnimal = this.fetchAnimal.bind(this);    
    this.state = {
      animal: undefined,
      loading: true,      
    }
  }

  async fetchAnimal() {
    this.setState({loading: true}, async () => {
      const urlAPI = 'https://dog.ceo/api/breeds/image/random';
      const requestReturn = await fetch(urlAPI);
      const objectAnimal = await requestReturn.json();                   
      this.setState({
        loading: false, 
        animal: objectAnimal
      })    
    })
  }

  componentDidMount() {
    this.fetchAnimal();
  }

  renderAnimalElement() {
    return(
      <div>
        <h1>Cães</h1>
        <img className="img" src={this.state.animal.message} alt="animais"/> <br/>   
        <button type="button" onClick={this.fetchAnimal}>Next Dog</button>        
      </div>
    );
  }
  render() {
    const { loading } = this.state;
    const loadingElement = <span>Loading...</span>;
    return( 
      <div className="App">
        {
          (loading) ? loadingElement : this.renderAnimalElement() 
        } 
      </div>
    )
  }
}

export default Animal;
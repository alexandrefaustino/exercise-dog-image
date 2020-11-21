import React from 'react';

class Animal extends React.Component {
  constructor() {
    super()
    this.fetchAnimal = this.fetchAnimal.bind(this);
    this.saveAnimal = this.saveAnimal.bind(this);
    this.state = {
      animal: undefined,
      loading: true,
      storeAnimal: []
    }
  }

  async fetchAnimal() {
    const urlAPI = 'https://dog.ceo/api/breeds/image/random';
    const requestReturn = await fetch(urlAPI);
    const objectAnimal = await requestReturn.json();
    this.setState({
      animal: objectAnimal
    })
  }

  componentDidMount() {
    this.fetchAnimal();
  }

  saveAnimal(){
    this.setState(({storeAnimal, animal}) => ({
      storeAnimal: [...storeAnimal, animal]
    }))
    this.fetchAnimal();
  }

  renderAnimalElement() {
    return(
      <div>
        <img className="img" src={this.state.animal.message} alt="animais"/> <br/>   
        <button type="button" onClick={this.saveAnimal}>Salvar</button>
      </div>
    );
  }
  render() {
    const { storeAnimal, animal } = this.state;
    const loadingElement = <span>Loading...</span>;
    return( 
      <div className="App">
        <span>
          {storeAnimal.map(({ message }) => (<img className="img" src={message} alt=""/>))}
        </span>
        {
          (animal) ? this.renderAnimalElement() : <span>{loadingElement}</span>
        } 
      </div>
    )
  }
}

export default Animal;
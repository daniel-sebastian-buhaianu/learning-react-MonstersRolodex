import { Component } from 'react';

import './App.css';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchInput: '',
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }))
  }

  render() {
    return (
      <div className='App'>
        <input
          className='searchBox'
          type='search'
          placeholder='search monsters'
          onChange={event => this.setState({ searchInput: event.target.value })}
        />
        {
          this.state.monsters
            .filter(monster => {
              const monsterName = monster.name.toLowerCase();
              const searchInput = this.state.searchInput.toLowerCase();
              return (
                monsterName.includes(searchInput) 
                || searchInput.includes(monsterName)
              )
              })
              .map(monster => {
                return (
                  <div key={monster.id}>
                    <h1>{monster.name}</h1>
                  </div>
                )
              })
        }
      </div>
    );
  }
}

export default App;

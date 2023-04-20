import { useState, useEffect } from 'react';

import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';

import './App.css';

const App = () => {
  
  const [monsters, setMonsters] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setMonsters(users))
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter(monster => {
      const monsterName = monster.name.toLowerCase();
      const searchInputString = searchInput.toLowerCase();
      return (
        monsterName.includes(searchInputString) 
        || searchInputString.includes(monsterName)
      );
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchInput]);

  return (
    <div className='App'>
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox
        className='monsters-search-box' 
        placeholder='search monsters' 
        onChange={event => setSearchInput(event.target.value)}
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;
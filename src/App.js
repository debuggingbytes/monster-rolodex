import React, { Component } from 'react'
import Header from "./components/Header"
import { CardList } from './components/card-list/card-list';
import SearchBox from "./components/search-box/search-box"


class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    }

    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    //fetch information from website
    fetch('https://jsonplaceholder.typicode.com/users')
      //wait for response
      .then(response => response.json())
      //After response, wait for users to setstate
      .then(users => this.setState({ monsters: users }))
  }

  // Arrow functions BIND "this" statement
  handleChange = (e) => {
    this.setState({ searchField: e.target.value })
  }

  render() {

    //Filter Monsters based off of search from e => this.setState(SearchField)
    const { monsters, searchField } = this.state;
    //                              Filter Monsters array, for each "monster"
    const filteredMonsters = monsters.filter(monster =>
      // Change monster name to lowercase, must include states search field, to lowercase
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    )


    return (
      <div className='container'>
        <Header />
        <SearchBox
          placeholder='Search Monsters'
          //HandleChange event is fired back from child element "SearchBox"
          handleChange={this.handleChange}
        />
        {/* show cards based off of filtered monsters via state */}
        <CardList monsters={filteredMonsters} />
      </div>
    )
  }
}

export default App

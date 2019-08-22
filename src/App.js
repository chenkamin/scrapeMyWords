import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import Page from './Page';


import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


class App extends Component {
  constructor(){
    super()
    this.state = {
      data : [],
    }
  }

//   getData = async () =>  {
//     let data = await axios.get("http://localhost:3001/fetchData")
//     return data
//  }

 postData = async () => {
  let data = await axios.post("http://localhost:3001/fetchData", {
    
    todo: this.state.todo,
    category: this.state.category,
    date: this.state.date,
    status: this.state.status
  })
  return data
}

 componentDidMount = async () =>{
  // let data = await this.getData()
  // console.log(data.data)
  // this.setState({ data: data.data })
}
// handleInput = (e) => {
//   const target = e.target
//   const value =target.value;
//   const name = target.name;
//   console.log(target.value)
//   console.log(this.state)
//   this.setState({[name] : value})
// }

claeanInputs = () => {
  this.setState({
  todo:"",
  date: "",
  category: ""
  })
 
}


  render() { 
    return (
      <Router>
      <div>
        <Route path="/" exact render={() => <Page  handleInput={this.handleInput}/>} />


       
      </div>
      </Router>

      )
  }
}
 
export default App;
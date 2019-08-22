import React, { Component } from 'react';
import axios from 'axios';
import Graph from './Graph';

class Page extends Component {
    constructor(){
        super()
        this.state = {
          data : [],
        }
      }
      
    handleInput = (e) => {
        const target = e.target
        const value =target.value;
        const name = target.name;
        console.log(target.value)
        console.log(this.state)
        this.setState({[name] : value})
      }

    //   config = {
    //     headers: {
    //       header1: value,
    //     }
    //   }
      


    postData = async () => {
        console.log(this.state.words)
        let data = await axios.post("http://localhost:3001/fetchData", {
          words:this.state.words 
        })
        console.log(data)
        this.setState({data:data}, function(){
console.log(this.state.data.data)
        })
        // return data

      }

    render() { 
      console.log(this.state.data.data)


        return ( 
          <div id="all">
            <div class="container">
                <div class="btn" onClick={this.postData}>חפש</div>
                <input type="text" placeHolder ="הכנס את מילות החיפוש שמעניינות אותך למשל שלום , תפוח , פתח תקווה..." name="words" onChange={this.handleInput}/>
            </div >
            <div class="graph">
                {this.state.data.data !== undefined? <Graph dataForGraph={this.state.data.data}/>: null}
            </div>
            </div>
         );
    }
}
 
export default Page;
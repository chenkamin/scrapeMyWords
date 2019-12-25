import React, { Component } from 'react';
import axios from 'axios';
import Graph from './Graph';

class Page extends Component {
    constructor(){
        super()
        this.state = {
          data : [],
          showInput: true,
          showLoader: false
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
      this.setState({showInput:false, showLoader:true})
        console.log(this.state.words)
        let data = await axios.post("http://localhost:3001/fetchData", {
          words:this.state.words 
        })
        console.log(data)

        this.setState({data:data, showLoader:false}, function(){
console.log(this.state)
        })
        // return data

      }

      freshStart = async () =>{
        this.setState({showInput:true, showLoader:false, data: ""})

      }
    render() { 
      console.log(this.state.data.data)


        return ( 
          <div id="all">
            <div class="container">
                {this.state.showInput ?<div class="btn" onClick={this.postData}>חפש</div>: null}
                {this.state.showInput ?<input type="text" placeHolder ="הכנס את מילות החיפוש שמעניינות אותך למשל שלום , תפוח , פתח תקווה..." name="words" onChange={this.handleInput}/>: null}
            </div >
            <div class="graph">
            <div class="loader">
              {this.state.showLoader? <div id="loader"></div>: null}
          </div>
          {this.state.data.data? <Graph dataForGraph={this.state.data.data}/>: null}
          {this.state.data.data?<div className="btn full-btn" onClick={this.freshStart}>חפש מחדש</div> : null}
            </div>
            </div>
         );
    }
}
 
export default Page;
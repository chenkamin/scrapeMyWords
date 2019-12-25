import React, { Component } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


class Graph extends Component {
   



    render() {
        let data =(this.props.dataForGraph)
        console.log(data)
        return (

          <BarChart
          width={250}
          height={300}
          data={data}
          margin={{
            top: 5, right: 60, left: 40, bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#1abc9c" />
        </BarChart>
        );
      }
    }

    export default Graph;

 
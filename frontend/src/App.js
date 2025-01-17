import axios from 'axios'
import React from 'react'
import api from './axios'

class App extends React.Component {

    state = { details: [], }

    componentDidMount() {

       let data;
       api.get('/')
         .then(res => {
          data = res.data;
          console.log("datalog", data);
          
          this.setState({
            details: data
          });
         })
          .catch(err => { console.error("Erro ao pegar dados", err)})
    }
    render() {
      return (
        <div>
          <header>Data Gerated From Django</header>
          <hr></hr>
          {this.state.details.map((output, id) => (
          <div key={id}>
            <h2>{output.employee}</h2>
            <h3>{output.department}</h3>
          </div>  
          ))}
        </div>
      )
    }
}

export default App;

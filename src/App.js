import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [books,setBooks] = useState([]);

  const checkSolr =  async(textsearch) =>{
    const url = `http://localhost:8983/solr/sample_core/select?q=name%3A*${textsearch}*%20or%20publisher%3A*${textsearch}*%20or%20description%3A*${textsearch}*`;
    const res = await axios.get(url)
    const data = res.data;
    console.log(data.response.docs);
    setBooks(data.response.docs);
  }

  return (
    <div className="App">
      <header className="App-header">
          <div className='form-group'>
              <input
                 type={"text"} 
                 name="SearchBar"
                 className='form-control'
                 placeholder='Search Here'
                 onChange={(e)=>checkSolr(e.target.value)}
               />
          </div>
          <div className='form-group'>
              <br />
              <button className='form-control btn btn-primary'>Search</button>
          </div>
          <div>
            {books?.map((book)=>{
                return <div className='container bg-dark'>
                    <p>{book.name[0]}  <small style={{float:"right"}}>--{book.publisher[0]}</small></p>
                   
                </div>
            })}
          </div>
      </header>
    </div>
  );
}

export default App;

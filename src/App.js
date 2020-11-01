import React, { useState }from 'react';
import './App.css';
import Axios from 'axios';
import Recipe from './components/Recipe';
import Alert from './components/Alert';

function App() {
  const[ query, setQuery ] = useState("");
  const[ recipes, setRecipes ]= useState([]);
  const[ alert, setAlert ] = useState("");



  const APP_ID = '439d148a';
  const APP_KEY = '656b9f2c04daa032243be7bf3454c466';
  const url=`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  

  const getData = async ()=>{

    if(query !== ""){
    
    const result = await Axios.get(url);

    if(!result.data.more){
      return setAlert("No food with such name");
    }

    setRecipes(result.data.hits)
    console.log(result);
    setAlert("");
    setQuery("");
  }else{
    setAlert('Please fill the form');
  }    
  };

const onChange=(e)=>{
  setQuery(e.target.value);
};

  const onSubmit =(e)=>{
    e.preventDefault();
    getData();
  };

  return (
    <div className="App">
      <h1 onClick={getData}>Food searching App</h1>
      <form className="search-form" onSubmit={onSubmit}>
        { alert !== "" && <Alert alert={alert}/>}
        <input type="text" placeholder="Search Food" autoComplete="off" onChange={onChange} value={query}/>
        <input type="submit" value="search"/>
      </form>


      <div className="recipes">
        {recipes !== [] && recipes.map(recipe =>
          <Recipe recipe={recipe} />
          )}


      </div>
    </div>
  );
}

export default App;

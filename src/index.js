import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BASE_URL, KEY } from './api/index.js';

// These imports won't work until you fix ./components/index.js
import {
  // Feature,
  Loading,
  Preview,
  Search,
  Title
} from './components';


async function fetchObjects() {
  const url = `${ BASE_URL }/object?${ KEY }`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

fetchObjects()

const App = () => {
  /**
   * We are at the App level component, which is top-most. Any state which needs to be shared between immediate children should
   * be made here, so create state pairs using useState() for:
   * 
   * searchResults, setSearchResults (default should be this object:  {info: {}, records: []} )
   * featuredResult, setFeaturedResult (default should be null)
   * isLoading, setIsLoading (default should be false)
   */

   const [searchResults, setSearchResults] = useState( { info: {}, records: [] } );
   const [featuredResult, setFeaturedResult] = useState(null); 
   const [isLoading, setIsLoading] = useState(false);

  return <div className="app">
    {/* <Title /> is static, doesn't need any props */}
    <Title />
    {/* <Search /> needs props for setIsLoading and setSearchResults (trigger <Loading /> on search start/end, and transfer results to preview) */}
    <Search setIsLoading={ setIsLoading } setSearchResults = { setSearchResults }/>
    {/* <Preview /> needs props for searchResults, setIsLoading and setSearchResults (clicking prev/next buttons), and setFeaturedResult (clicking a preview) */}
    <Preview searchResults = { searchResults } setIsLoading = { setIsLoading } setSearchResults= { setSearchResults } setFeaturedResult={setFeaturedResult}/>
    {/* <Feature /> needs props for featuredResult, as well as setIsLoading and setSearchResults (clicking on searchable properties) */}
    {/* <Feature featuredResult={featuredResult} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/> */}    
    {/* <Loading /> is static, but should only render when isLoading is true */}
    {/* <Loading /> use a ternary and render null if isLoading is false */}
    {
      isLoading ? <Loading /> : null
    }
  </div>
}

/**
 * Boostrap the <App /> component into the '#app' element in the DOM,
 * using ReactDOM.render();
 */

ReactDOM.render(<App />, document.getElementById('app'));
import React, { useEffect, useState} from 'react';
import AudiobookList from './components/List/list';
import Search from './components/Search/search';
import AudioBook from './components/Audiobook/audiobook';
import './css/App.css'
import AudioBooks from './services/Api'


const App = (props) => {

  const [ audiobooks, setAudiobooks ] = useState(); // [ `contenido de audiobooks`, fn()  ]
  const [ filteredAudioBooks, setFilteredAudioBooks ] = useState();
  const [ displayModalAdd, setDisplayModalAdd ] = useState(false);

  useEffect(() => {
    AudioBooks.get()
    .then(response => response.json())
    .then(r => {
      setAudiobooks(r);
      setFilteredAudioBooks(r.items);
    } )
    .catch(error => console.log('error', error));
  },[])

  function searchFilter(query, item) {
    return item.fields.title['es-MX'].toLowerCase().indexOf(query.toLowerCase()) > -1;
  }

  const onSearchUpdate = (filteredList) => {
    setFilteredAudioBooks(filteredList);
  }

  return (
    <div className="page-content">
      <div className="cards">
        <div className="content">
          <h1 className="title">Audiobook List</h1>
          <Search list={audiobooks?.items} filter={searchFilter} onUpdate={onSearchUpdate}/>
          <button onClick={() => setDisplayModalAdd(true)}> Add Audio Book</button>
          { filteredAudioBooks ? (<AudiobookList audiobooks={filteredAudioBooks}/> ) : (<div>No data</div>) }
        </div>
      </div>
      { displayModalAdd ? 
      <div className="modal">
        <div className="modal-content">
          <button onClick={() => setDisplayModalAdd(false) }>x</button>
          <AudioBook actionTitle="add" onAction={(e)=> console.log(e)} data={{title: {'es-MX': 'Harry Potter'}}}/>
        </div>
      </div> : false }
    </div>
  )
}
export default App;

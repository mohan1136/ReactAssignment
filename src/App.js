import './App.css';
import axios from 'axios';
import Pagination from './components/pagination';
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import paginator from './components/paginator';
function App() {
  const [characters, setCharacters] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(setPageSize);
  const [isList, setIsList] = useState(true);
  const [postData, setPostData] = useState(0);
  const [seasons, setSeasons] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [postQuotes, setPostQuotes] = useState([]);
  const [reqCategory, setReqCategory] = useState("all");
  const [tempCharacterData, setTempCharacterData] = useState([]);

  useEffect(() => {
    async function getCharacters() {
      let result = await axios("https://breakingbadapi.com/api/characters");
      setCharacters(result.data);
      setTempCharacterData(result.data);
    }
    getCharacters();
  }, []);

  useEffect(() => {
    async function getEpisodes() {
      let result = await axios("https://breakingbadapi.com/api/episodes");
      setEpisodes(result.data);
    }
    getEpisodes();
  }, []);

  useEffect(() => {
    async function getQuotes() {
      let result = await axios("https://breakingbadapi.com/api/quotes");
      setQuotes(result.data);
    }
    getQuotes();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }
  let handlePost = (c) => {
    let result = episodes.filter(ep => ep.characters.includes(c.name)).map(ep => ep.season.trim());
    result = [...new Set(result)];
    setSeasons(result.toString());
    result = quotes.filter(qt => qt.author === c.name).map(qt => qt.quote);
    setPostQuotes(result);
    setIsList(false);
    setPostData(c);
  }
  let handleReset = () => {
    setIsList(true);
  }
  let handleCategory = (cat) => {
    setReqCategory(cat);
    let result;
    if (cat === "All") {
      setTempCharacterData(characters);
    }
    else {
      result = characters.filter(c => c.category.includes(cat));
      setTempCharacterData(result);

    }
  }
  let rend_characters = paginator({ tempCharacterData, currentPage, pageSize });
  return (
    <React.Fragment>
      <div className="main-div">
        {isList &&
          (<div>
            <h1 className="main-heading">Breaking Bad Characters & their Quotes</h1>
            <select value={reqCategory} onChange={eve => handleCategory(eve.target.value)}>
              <option value="All">All</option>
              <option value="Breaking Bad">Breaking Bad</option>
              <option value="Better Call Saul">Better Call Saul</option>
            </select>
            <table className="table table-hover">
              <thead>
                <tr className="table-dark">
                  <th>Name</th>
                  <th>Occupation</th>
                  <th>Date Of Birth</th>
                  <th>Status</th>
                  <th>More Details</th>
                </tr>
              </thead>
              <tbody>
                {
                  rend_characters.map(c => {
                    return (<tr key={c.char_id}>
                      <td>{c.name}</td>
                      <td>{c.occupation.toString()}</td>
                      <td>{c.birthday}</td>
                      <td style={{ width: "200px" }}>{c.status}</td>
                      <td><button className="btn btn-info" onClick={() => handlePost(c)}>Details</button></td>
                    </tr>)
                  })
                }
              </tbody>
            </table>
            <Pagination itemsCount={tempCharacterData.length} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange} />
          </div>)
        }

        {!isList &&
          (
            <div className="main">
              <div className="post">
                <div className="name-image">
                  <h1>{postData.name}</h1>
                  <img alt="images" src={postData.img}></img>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th> <h6>Date Of Birth</h6></th>
                      <td><h6>:{postData.birthday}</h6></td>
                    </tr>
                    <tr>
                      <th><h6>Occupation</h6></th>
                      <td><h6>:{postData.occupation.toString()}</h6></td>
                    </tr>
                    <tr>
                      <th><h6>Status</h6></th>
                      <td><h6>:{postData.status}</h6></td>
                    </tr>
                    <tr>
                      <th><h6>Nick name</h6></th>
                      <td><h6>:{postData.nickname}</h6></td>
                    </tr>
                    <tr>
                      <th> <h6>Actor</h6></th>
                      <td><h6>:{postData.portrayed}</h6></td>
                    </tr>
                    <tr>
                      <th><h6>Seasons</h6></th>
                      <td><h6>:{seasons}</h6></td>
                    </tr>
                  </thead>
                </table>
                <h3>Quotes:-</h3>
                <ul>
                  {postQuotes.map(qt => (
                    <li key={qt}><p>{qt}</p></li>
                  ))}
                </ul>
              </div>
              <div className="back">
                <button className="btn btn-success" onClick={() => { handleReset() }}>Back To List</button>
              </div>
            </div>
          )
        }
      </div>
    </React.Fragment>
  );
}

export default App;

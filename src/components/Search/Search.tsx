import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import keys from "@app/keys.json";
import { default as searchRequest } from "./SearchRequest";

import { root, list } from "./Search.scss";
import SearchField from "./components/SearchField/SearchField";
import ListItem from "./components/ListItem/ListItem";


const searchThreshold = 0;
const CancelToken = axios.CancelToken;
let cancelRequest;

const Search: React.FC = () => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState<string | never>();

  const { TMDB: { key: apiKey } } = keys;
  const initial = useRef(true);

  /*
  // trending
  - https://api.themoviedb.org/3/trending/movie/week?api_key=b0051197ce34bf52555943ba1b4f5d4d
  // Search
  - https://api.themoviedb.org/3/search/movie?api_key=b0051197ce34bf52555943ba1b4f5d4d&language=en-US&page=1&include_adult=false
  // Genre
  - https://api.themoviedb.org/3/genre/movie/list?api_key=b0051197ce34bf52555943ba1b4f5d4d&language=en-US
  */

  const urls = {
    trending: 'trending/movie/week?api_key=',
    search: 'search/movie?api_key='
  };

  const searchURL = initial.current ? urls.trending + apiKey : urls.search + apiKey + '&language=en-US&page=1&include_adult=true&';

  const getResults = async (url, query?: string) => {
    console.log('getResults URL:', url, initial.current);
    const response: any = await searchRequest.get(url, {
      cancelToken: new CancelToken(c => {
        // this function will receive a cancel function as a parameter
        cancelRequest = c;
      })
    })
      .then(function (response) {
        const { data: { results } } = response;

        return results;
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          return [];
        } else {
          console.log("error", error.message);
        }
        return;
      });
    setResults(response);
  };

  useEffect(() => {
    if (!searchText || searchText.length <= searchThreshold) {
      console.log("useEffect");
      if (cancelRequest) {
        cancelRequest("Request canceled.");
      }
      if (!searchText || initial.current) {
        getResults(urls.trending + apiKey);
        return
      }
      setResults([]);
      return;
    }
    initial.current = false;
    getResults(searchURL + 'query=' + encodeURI(searchText));
  }, [searchText]);

  return (
    <main className={root}>
      <h5>Trending movies</h5>
      <SearchField
        fieldName="search"
        label="Find a movie"
        placeholder="Find a movie..."
        setSearchText={setSearchText}
      />
      {results && results.length > 0 && (
        <ul className={list}>
          {results.map(item => {

            const { id: itemID } = item;
            return (
              <ListItem itemData={item} key={itemID} />
            );
          })}
        </ul>
      ) || <p>nothing found...</p>}
      {/* <pre>{JSON.stringify(results, null, 2)}</pre> */}
    </main>
  );
};

export default Search;

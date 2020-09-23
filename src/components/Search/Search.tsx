import React, { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";

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

  const { TMDB: { key: apiKey } } = keys;
  console.log(apiKey);

  // const testQuery = 'https://api.themoviedb.org/3/search/movie?api_key=b0051197ce34bf52555943ba1b4f5d4d&query=Jack+Reacher';

  /*
  // Search
  - https://api.themoviedb.org/3/search/movie?api_key=b0051197ce34bf52555943ba1b4f5d4d&language=en-US&page=1&include_adult=false
  // Genre
  - https://api.themoviedb.org/3/genre/movie/list?api_key=b0051197ce34bf52555943ba1b4f5d4d&language=en-US
  // trending
  - https://api.themoviedb.org/3/trending/movie/week?api_key=b0051197ce34bf52555943ba1b4f5d4d
  */


  const urls = {
    trending: 'trending/movie/week?api_key=',
    search: 'search/movie?api_key=',
    genre: 'genre/movie/list?api_key=',
  };

  // const testQuery = urls.genre + apiKey + '&language=en-US';
  // const testQuery = urls.search + apiKey + '&language=en-US' + '&query=Jack+Reacher';
  const testQuery = urls.trending + apiKey;

  console.log('testQuery: ' + testQuery);

  const getResults = async (url) => {
    const response: any = await searchRequest.get(url, {
      cancelToken: new CancelToken(c => {
        // this function will receive a cancel function as a parameter
        cancelRequest = c;
      })
    })
      .then(function (response) {
        // handle success
        console.log(
          "searching!! resuts are -> ",
          response,
          // " with firter ->",
          // query,
          "and URL ->",
          url
        );

        // const filteredResults = response.data.filter(result => {
        //   console.log("filteredResults", result);
        //   return result.name.toLowerCase().includes(query.toLowerCase());
        // });

        // console.log('"searching!! filtered resuts are ->', filteredResults);

        // const sortByName = (a, b) => {
        //   const nameA = a.name.toUpperCase();
        //   const nameB = b.name.toUpperCase();
        //   let comparison = 0;
        //   if (nameA > nameB) {
        //     comparison = 1;
        //   } else if (nameA < nameB) {
        //     comparison = -1;
        //   }
        //   return comparison;
        // };

        // const sortResults = results => {
        //   console.log("groups before filtering:", results);
        //   const groups = results.filter(result => {
        //     console.log("filteredResults", result);
        //     return result.type.includes("group");
        //   });

        //   groups.sort(sortByName);

        //   const items = results.filter(result => {
        //     console.log("filteredResults", result);
        //     return result.type.includes("item");
        //   });

        //   items.sort(sortByName);
        //   console.log("groups:", groups, items);
        //   return [...groups, ...items];
        // };

        // console.log("filteredResults: ", filteredResults);
        // return sortResults(filteredResults);

        // const { results } = response.data;

        console.log('results are: ', response.data);
        const { data: { results } } = response;
        return results;
      })
      .catch(error => {
        // handle error
        // console.log(error);
        if (axios.isCancel(error)) {
          console.log("error cancelled", error.message);
          return [];
        } else {
          console.log("error", error.message);
        }
        return;
      });
    setResults(response);
  };

  useEffect(() => {
    console.log('useEffect...');
    if (cancelRequest) {
      cancelRequest("Request canceled.");
    }
    // setResult([]);
    // return;

    getResults(testQuery);
  }, [testQuery]);

  return (
    <div className={root}>
      <SearchField />
      {results && results.length > 0 && (
        <ul className={list}>
          {results.map(item => {

            const { id: itemID } = item;
            return (
              <ListItem itemData={item} key={itemID} />
            );
          })}
        </ul>
      )}
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
};

export default Search;

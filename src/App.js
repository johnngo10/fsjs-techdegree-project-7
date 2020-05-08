import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";

// Import components
import Nav from "./components/Nav";
import NotFound from "./components/NotFound";
import Photo from "./components/Photo";
import apiKey from "./components/config";
import SearchForm from "./components/SearchForm";
import PhotoList from "./components/PhotoList";

// https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a3068f50a631dd9ffb612590d08fb96b&tags=shibas&per_page=&format=json&nojsoncallback=1

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      shibaPhotos: [],
      catPhotos: [],
      friesPhotos: [],
    };
  }

  componentDidMount() {
    axios
      .all([
        axios.get(
          `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=shibas&per_page=24&format=json&nojsoncallback=1`
        ),
        axios.get(
          `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`
        ),
        axios.get(
          `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=fries&per_page=24&format=json&nojsoncallback=1`
        ),
      ])
      .then(
        (axios.spread = (...res) => {
          this.setState({
            shibaPhotos: res[0][0].data.photos.photo,
            catPhotos: res[0][1].data.photos.photo,
            friesPhotos: res[0][2].data.photos.photo,
          });
        })
      );
  }

  performSearch = (query) => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        this.setState({
          photos: response.data.photos.photo,
        });
      })
      .catch((error) => {
        // handle error
        console.log("Error fetching and parsing data", error);
      });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <SearchForm onSearch={this.performSearch} />
          <Nav />
          <Switch>
            <Route exact path="/" />
            <Route
              exact
              path="/shibas"
              render={() => (
                <PhotoList data={this.state.shibaPhotos} title="Shibas" />
              )}
            />
            <Route
              exact
              path="/cats"
              render={() => (
                <PhotoList data={this.state.catPhotos} title="Cats" />
              )}
            />
            <Route
              path="/french-fries"
              render={() => (
                <PhotoList data={this.state.friesPhotos} title="Cats" />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

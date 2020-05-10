import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";

// Import components
import Nav from "./components/Nav";
import NotFound from "./components/NotFound";
import apiKey from "./components/config";
import SearchForm from "./components/SearchForm";
import PhotoList from "./components/PhotoList";
import Error from "./components/Error";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      shibaPhotos: [],
      catPhotos: [],
      friesPhotos: [],
      search: [],
      loading: true,
      home: [],
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
        axios.get(
          `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=puppy&per_page=24&format=json&nojsoncallback=1`
        ),
      ])
      .then(
        (axios.spread = (...res) => {
          this.setState({
            shibaPhotos: res[0][0].data.photos.photo,
            catPhotos: res[0][1].data.photos.photo,
            friesPhotos: res[0][2].data.photos.photo,
            home: res[0][3].data.photos.photo,
            loading: false,
          });
        })
      )
      .catch((error) => {
        // handle error
        console.log("Error fetching and parsing data", error);
      });
  }

  performSearch = (query) => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      )
      .then((response) => {
        this.setState({
          photos: response.data.photos.photo,
          search: query,
          loading: false,
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
            <Route
              exact
              path="/"
              render={() => <PhotoList data={this.state.home} />}
            />
            <Route
              path="/shibas"
              render={() => (
                <PhotoList
                  data={this.state.shibaPhotos}
                  title="Shibas"
                  loading={this.state.loading}
                />
              )}
            />
            <Route
              path="/cats"
              render={() => (
                <PhotoList
                  data={this.state.catPhotos}
                  title="Cats"
                  loading={this.state.loading}
                />
              )}
            />
            <Route
              path="/french-fries"
              render={() => (
                <PhotoList
                  data={this.state.friesPhotos}
                  title="Cats"
                  loading={this.state.loading}
                />
              )}
            />
            <Route
              path="/:query"
              render={() => (
                <PhotoList
                  data={this.state.photos}
                  title={this.state.search}
                  loading={this.state.loading}
                />
              )}
            />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

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
    };
  }

  componentDidMount() {
    axios
      .get(
        "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a3068f50a631dd9ffb612590d08fb96b&tags=shibas&per_page=24&format=json&nojsoncallback=1"
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
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <SearchForm />
          <Nav />
          <Switch>
            <Route path="/" />
            <Route />
          </Switch>
          <PhotoList data={this.state.photos} />
        </div>
      </BrowserRouter>
    );
  }
}

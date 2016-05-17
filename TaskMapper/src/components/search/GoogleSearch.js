/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
var UltimateMap = require('../map/UltimateMap');

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from 'react-native';

const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

class GoogleSearch extends Component {
  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        fetchDetails={true}
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          currentSearch = JSON.stringify({location: details.geometry.location, name: details.name})
          AsyncStorage.setItem("currentSearch", currentSearch)
        }}
        //
        // module.exports = function() {
        //   return details.geometry.location;
        //   console.log("This");
        // }

        getDefaultValue={() => {
          return ''; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyC6Vddmul5fb0LppQnNaMbySTzfzbNI9Gc',
          language: 'en', // language of the results
          types: '', // default: 'geocode'
        }}
        styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}

        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'grocery_or_supermarket',
        }}


        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

        predefinedPlaces={[homePlace, workPlace]}
      / >
    )
  }
}

module.exports = GoogleSearch;

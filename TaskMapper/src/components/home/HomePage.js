'use strict'
import React, { Component } from 'react'
import {
  MapView,
  Text,
  View,
  AppRegistry,
  StyleSheet
} from 'react-native';


var GoogleSearch = require('../search/GoogleSearch');
var UltimateMap = require('../map/UltimateMap');

class HomePage extends React.Component {
  render() {
    return (
      <View
        style={styles.container}
      >
        <UltimateMap
          style={styles.map}
        >
        </UltimateMap>
        <GoogleSearch
          style={styles.search}
        >
        </GoogleSearch>

      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 3,
  },
})

module.exports = HomePage
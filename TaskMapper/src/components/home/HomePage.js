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
      <View style={styles.container}>
        <UltimateMap />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

module.exports = HomePage

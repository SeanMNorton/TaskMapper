'use strict'
import React, { Component } from 'react'
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} from 'react-native'

var UltimateMap = require('./src/components/map/UltimateMap')

class TaskMapper extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.navigator}
        initialRoute={{component: UltimateMap, title: 'Task Mapper'}}
      />
    )
  }
}

var styles = StyleSheet.create({
  navigator: {
    flex: 1,
  }
})

AppRegistry.registerComponent('TaskMapper', () => TaskMapper)

'use strict'
import React, { Component } from 'react'
import {
  AppRegistry,
  MapView,
  NavigatorIOS,
  StyleSheet,
} from 'react-native'

var ListContainer = require('./src/components/list/ListContainer')

class TaskMapper extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.navigator}
        initialRoute={{component: ListContainer, title: 'Task Mapper'}}
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

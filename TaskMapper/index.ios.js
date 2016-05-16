'use strict'
import React, { Component } from 'react'
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} from 'react-native'

var UltimateMap = require('./src/components/map/UltimateMap');
var ListContainer = require('./src/components/list/ListContainer');
var EditTask = require('./src/components/task/EditTask');

class TaskMapper extends React.Component {
  render() {
    return (
      <NavigatorIOS ref = 'nav'
        style={styles.navigator}
        initialRoute={{
          component: UltimateMap,
          title: 'Task Mapper',
          rightButtonTitle: 'Task List',
          onRightButtonPress: () => {
          this.refs.nav.navigator.push({
            title: "List",
            component: ListContainer,
            rightButtonTitle: 'Create',
            onRightButtonPress: () => { this.refs.nav.navigator.push({
              title: "Create Task",
              component: EditTask,
            }); }
          });}
        }}
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

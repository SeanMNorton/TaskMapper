'use strict'
import React, { Component } from 'react'
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} from 'react-native'
console.disableYellowBox = true;
var UltimateMap = require('./src/components/map/UltimateMap');
var ListContainer = require('./src/components/list/ListContainer');
var EditTask = require('./src/components/task/EditTask');
var HomePage = require('./src/components/home/HomePage');

class TaskMapper extends React.Component {
  render() {
    return (
      <NavigatorIOS ref = 'nav'
        style={styles.navigator}
        barTintColor="#1E3A47"
        titleTextColor='#fff'
        tintColor='#1FBBFF'
        initialRoute={{
          component: HomePage,
          title: 'Task Mapper',
          rightButtonTitle: 'Task List',
          onRightButtonPress: () => {
          this.refs.nav.navigator.push({
            title: "List",
            component: ListContainer,
            // rightButtonTitle: 'Create',
            // onRightButtonPress: () => { this.refs.nav.navigator.push({
            //   title: "Create Task",
            //   component: EditTask,
            //   passProps: {item: {}, update: this.state.props.updateItem}
            // }); }
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

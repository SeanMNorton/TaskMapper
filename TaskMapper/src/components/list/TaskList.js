'use strict'
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  ListView,
} from 'react-native'

var TaskItem = require('../task/TaskItem')
var styles = require('../../styles/styles')

class TaskList extends React.Component {
  
  componentWillMount() {
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })
  }
  render() {
    var dataSource = this.dataSource.cloneWithRows(this.props.items)
    return (
      <ListView
        style={styles.listView}
        dataSource={dataSource}
        renderRow={(rowData, sectionID, rowID) =>
          <TaskItem item={rowData}
            onPress={console.log(rowData)}
            onPress={() => this.props.onPressItem(rowData, rowID)}
            onLongPress={() => this.props.onLongPressItem(rowData, rowID)}
          />
        }
      />
    )
  }
}

module.exports = TaskList

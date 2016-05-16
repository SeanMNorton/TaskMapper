'use strict'
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS,
  NavigatorIOS,
  AsyncStorage,
} from 'react-native'

var EditTask = require('../task/EditTask')
var TaskList = require('./TaskList')
var styles = require('../../styles/styles')

// [
//   {txt: 'Learn react native', desc:'woot!', complete: false },
//   {txt: 'Make a to-do app', desc:'woot!', complete: true },
// ]
class ListContainer extends React.Component {
  componentDidMount() {
    // AsyncStorage.removeItem("items")
    AsyncStorage.getItem("items")
      .then( (itemsString) => {
        if (itemsString) {
          var itemsArray = JSON.parse(itemsString)
          for (var i in itemsArray) {
            var currentItem = itemsArray[i]
            var due = currentItem.due
            currentItem.due = new Date(due)
          }
          this.setState({items: itemsArray})
        }
      })
  }
  constructor() {
    super()
    this.state = {items: []}
    this.alertMenu = this.alertMenu.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.updateItem = this.updateItem.bind(this)
    this.openItem = this.openItem.bind(this)
  }
  alertMenu(rowData, rowID) {
    AlertIOS.alert(
      'Quick Menu',
      null,
      [
        {text: 'Delete', onPress: () => this.deleteItem(rowID)},
        {text: 'Edit', onPress: () => this.openItem(rowData, rowID)},
        {text: 'Cancel'}
      ]
    )
  }
  deleteItem(index) {
    var items = this.state.items
    items.splice(index, 1)
    this.setState({items: items})
  }
  updateItem(item, index) {
    AsyncStorage.getItem("currentSearch")
      .then( (searchString) => {
        var searchObject = JSON.parse(searchString)
        var newItem = {}
        for (var property in item) {
          newItem[property] = item[property]
        }
        newItem.location = searchObject.location
        newItem.name = searchObject.name
        item = newItem
      })

        var items = this.state.items
        if (index) {
          items[index] = item
        } else {
          items.push(item)
        }
        this.setState({items: items})
        AsyncStorage.setItem("items", JSON.stringify(this.state.items))
        this.props.navigator.pop()
  }
  openItem(rowData, rowID) {
    this.props.navigator.push({
      title: rowData && rowData.txt || 'New Item',
      component: EditTask,
      passProps: {item: rowData, id: rowID, update: this.updateItem}
    })
  }
 render() {
    return (
      <View style={{flex:1}}>
        <TaskList
          items={this.state.items}
          onPressItem={this.openItem}
          onLongPressItem={this.alertMenu}
        />
        <TouchableHighlight
          style={styles.newButton}
          underlayColor='#99d9f4'
          onPress={this.openItem}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableHighlight>
      </View>
    )
  }
  border(color){
    return {
      borderColor: color,
      borderWidth:4
    }
  }
}

module.exports = ListContainer

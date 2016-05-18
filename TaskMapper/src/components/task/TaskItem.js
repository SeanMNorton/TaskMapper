
'use strict'
import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  AlertIOS,
} from 'react-native'

var moment = require('moment');
var CountDown = require('../common/counter')
var styles = require('../../styles/styles')





  class TaskItem extends React.Component {



  render() {
    var item = this.props.item
    var dueDate = this.props.item.due
    var now = Date.now()
    var thisThang = moment(this.props.item.due).format('lll')

    var diffDays = parseInt((dueDate - now)/ 1000)

    return (
      <View style={styles.allView}>
        <TouchableHighlight
          underlayColor={'#1FBBFF'}
          onPress={this.props.onPress}
          onLongPress={this.props.onLongPress}>
          <View style={[styles.listItem, {justifyContent: 'flex-start'}]}>
            <Text style={[ styles.txt, item.complete && styles.completed]}>
              {item.txt}
              </Text>
              <Text style={{fontSize: 14, paddingLeft: 15, paddingBottom: 5}}> Due: {thisThang}</Text>

          </View>
        </TouchableHighlight>
        <View style={styles.hr}/>
      </View>
    )
  }
}


module.exports = TaskItem


'use strict'
import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  AlertIOS,
} from 'react-native'

var CountDown = require('../common/counter')
var styles = require('../../styles/styles')

class TaskItem extends React.Component {
  render() {
    var item = this.props.item
    var dueDate = this.props.item.due
    var now = Date.now()
    var diffDays = parseInt((dueDate - now)/ 1000)

    return (
      <View style={styles.allView}>
        <TouchableHighlight
          underlayColor={'#1FBBFF'}
          onPress={this.props.onPress}
          onLongPress={this.props.onLongPress}>
          <View style={[styles.listItem, {justifyContent: 'flex-start'}]}>
            <Text style={[styles.allView, styles.txt, item.complete && styles.completed]}>
              {item.txt}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.hr}/>
      </View>
    )
  }
}
// Counter in seconds
// <View>
// <CountDown
//   onPress={this.sendAgain}
//   text={'Due In:'}
//   time={diffDays}
//   dueDate={dueDate}
//   buttonStyle={{padding:20}}
//   textStyle={{color:'black'}}
//   disabledTextStyle={{color:'gray'}}
// />
// </View>

// class TaskItem extends ReactNative.Component {
//
//   constructor() {
//     super()
//     this.state = {
//       item: '',
//       dueDate: '',
//       now: Date.now(),
//       diffDays: 0,
//       Counter: <Text>'this'</Text>,
//     }
//   }
//
// componentWillMount(){
//   this.setState({item: this.props.item}),
//   this.setState({dueDate: this.props.item.due}),
//   this.setState({now: Date.now()}),
//   // this.setState({diffDays: parseInt((this.state.dueDate - this.state.now)/ 1000)}),
//   this.setState({Counter: <CountDown
//     text={'Due In:'}
//     time={diffDays}
//     buttonStyle={{padding:20}}
//     textStyle={{color:'black'}}
//     disabledTextStyle={{color:'gray'}} />
//   })
//   if (Date.now() == this.state.dueDate ) {
//     this.setState({Counter: <Text>Over due</Text>})
//   } else if (diffDays == 1) {
//     AlertIOS.alert(
//       'Hey it is due'
//     )
//   }
//
//   if (this.state.dueDate === null || this.state.item.complete === true) {
//     this.setState({Counter: <Text>Always due</Text>})
//   }
// }
//
//
//     render() {
//         // var item = this.props.item
//         // var dueDate = this.props.item.due
//         // var now = Date.now()
//         var diffDays = parseInt((this.state.dueDate - this.state.now)/ 1000)
//         // var Counter
//
//         return (
//             <View>
//                 <TouchableHighlight
//                     onPress={this.props.onPress}
//                     onLongPress={this.props.onLongPress}>
//                     <View style={styles.container}>
//                         <Text
//                             style={[styles.txt, this.state.item.complete && styles.completed]}>
//                             {this.state.item.txt}
//
//                             </Text>
//                           {this.state.Counter}
//                     </View>
//                 </TouchableHighlight>
//
//                 <View style={styles.hr}/>
//             </View>
//         )
//     }
//
//
//
//
// }

module.exports = TaskItem

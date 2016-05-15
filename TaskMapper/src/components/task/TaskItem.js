'use strict';
var styles = require('../../styles/styles')
var React = require('react-native');
var CountDown = require('react-native-countdown');
var moment = require('moment');

var { Text, View, TouchableHighlight, StyleSheet } = React;


class TaskItem extends React.Component {
    render() {
        var item = this.props.item;
        var dueDate = this.props.item.due;
        var now = Date.now();
        var diffDays = parseInt((dueDate - now)/ 1000);







        return (
            <View>
                <TouchableHighlight
                    onPress={this.props.onPress}
                    onLongPress={this.props.onLongPress}>
                    <View style={styles.container}>
                        <Text
                            style={[styles.txt, item.complete && styles.completed]}>
                            {item.txt}
                            </Text>
                            <CountDown
                              onPress={this.sendAgain}
                              text={'Due In:'}
                              time={diffDays}
                              buttonStyle={{padding:20}}
                              textStyle={{color:'black'}}
                              disabledTextStyle={{color:'gray'}}
                            />
                    </View>
                </TouchableHighlight>
                <View style={styles.hr}/>
            </View>
        );
    }




}
module.exports = TaskItem;

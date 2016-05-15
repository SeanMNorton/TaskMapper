import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS
} from 'react-native';

var styles = require('../../styles/styles');
var EditTask = require('../task/EditTask');
var TaskList = require('./TaskList');


class ListContainer extends React.Component {
  
    constructor() {
        super();
        this.state = {
            items: [
                {txt: 'Learn react native', desc:'woot!', complete: false, due: new Date('2016, 11, 17') },
                {txt: 'Make a to-do app', desc:'woot!', complete: true, due: new Date('2016, 11, 17')},
            ]
        };
        this.alertMenu = this.alertMenu.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.openItem = this.openItem.bind(this);

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
        var items = this.state.items;
        items.splice(index, 1);
        this.setState({items: items})
    }

    updateItem(item, index) {
        var items = this.state.items;
        if (index) {
            items[index] = item;
        }
        else {
            items.push(item)
        }
        this.setState({items: items});
        this.props.navigator.pop();
    }

    openItem(rowData, rowID) {
        this.props.navigator.push({
            title: rowData && rowData.txt || 'New Item',
            component: EditTask,
            passProps: {item: rowData, id: rowID, update: this.updateItem}
        });
    }


 render() {
        return (
            <View style={{flex:1}}>
                <TaskList
                    items={this.state.items}
                    onPressItem={this.openItem}
                    onLongPressItem={this.alertMenu}/>
                <TouchableHighlight
                    style={styles.newButton}
                    underlayColor='#99d9f4'
                    onPress={this.openItem}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableHighlight>



            </View>
        );
      }
  border(color){
    return {
      borderColor: color,
      borderWidth:4
    }
  }
}



module.exports = ListContainer;

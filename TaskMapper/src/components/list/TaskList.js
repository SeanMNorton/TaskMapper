import React, { Component } from 'react';
import {


  StyleSheet,
  Text,
  ListView
} from 'react-native';
var styles = require('../../styles/styles')
var TaskItem = require('../task/TaskItem')

class TaskList extends React.Component {

    componentWillMount() {
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
    }

    render() {
        var dataSource = this.dataSource.cloneWithRows(this.props.items);
        return (
            <ListView
                dataSource={dataSource}
                renderRow={(rowData, sectionID, rowID) =>
          <TaskItem item={rowData}
            onPress={console.log(rowData)}
            onPress={() => this.props.onPressItem(rowData, rowID)}
            onLongPress={() => this.props.onLongPressItem(rowData, rowID)} />
        }
                style={styles.listView}/>
        );
    }
}


module.exports = TaskList;

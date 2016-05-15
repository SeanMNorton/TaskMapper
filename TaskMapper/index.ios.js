
'use strict';

var ListContainer = require('./src/components/list/ListContainer');


var React = require('react-native');
var { AppRegistry, MapView, NavigatorIOS, StyleSheet } = React;

var TaskMapper = React.createClass({
  render() {
        return (

            <NavigatorIOS
                style={styles.navigator}
                initialRoute={{component: ListContainer, title: 'Task Mapper'}}/>

        );
    }
});

var styles = StyleSheet.create({
  navigator: {
    flex: 1,
  }
})

AppRegistry.registerComponent('TaskMapper', () => TaskMapper);

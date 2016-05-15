'use strict';
var React = require('react-native');
var { StyleSheet } = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 3,
    marginTop: 5,
    padding: 2
  },
  buttonText: {
    flex: 1,
    alignSelf: 'center'
  },
  completed: {
    color: 'red',
    fontSize: 30
  },
  txt: {
    color: 'green',
    fontSize: 30
  },

  map: {
    flex: 2,
    marginBottom: 20
  },
    newButton: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'green',
      borderWidth: 1,
      borderRadius: 3,
      marginTop: 0,
      padding: 2,
      height: 200
    },
    buttonText: {
      flex: 1,
      alignSelf: 'center'
    },
    footer: {
      flex: 1,
      marginTop: 200
    },
    button: {

    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 3,
    marginTop: 5,
    padding: 2
  },
  listView: {
    flex: 2,
    marginTop: 20
  }

});

module.exports = styles;

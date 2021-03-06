'use strict'
import React, { Component } from 'react'
import {
  StyleSheet,
} from 'react-native'

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#1E3A47',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 3,
    marginTop: 5,
    padding: 2,
  },
  buttonText: {
    flex: 1,

  },
  completed: {
    color: 'red',
    fontSize: 30,
  },
  listItem: {
    borderBottomColor: 'rgba(30,58,71,.3)',
    borderBottomWidth: 1,

    flex:1,
  },
  shadow: {
    marginBottom: 5,
    shadowColor: 'rgba(30,58,71,.7)',
    shadowOpacity: .3,
    shadowRadius: 1,
    shadowOffset: {
      height: 3,
      width: 0,
    }
  },
  txt: {
    color: '#1E3A47',
    fontWeight: '700',
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 3,
    fontSize: 17,
  },
  map: {
    flex: 2,
    marginBottom: 20,
  },
  newButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E3A47',
    marginTop: 0,
    padding: 0,
    flex: 1,
  },
  honeycomb: {
    fontFamily: 'HONEYCOMBED',
    fontWeight: 'bold',
    marginLeft: 350,
    position: 'absolute',
    bottom: 17,
    transform: [{rotate: '90deg'}]

  },
  buttonText: {
    color: 'white',
    padding: 0,

  },
  footer: {
    flex: 1,
    marginTop: 200,
  },
  button: {
    justifyContent: 'flex-end',
    // alignSelf: 'flex-end',
    backgroundColor: '#1E3A47',
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 10,
    padding: 2,
    paddingBottom: 0,
    marginBottom: 0,
  },
  listView: {
    flex: 9,
  },
})

module.exports = styles

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
    alignSelf: 'center',
  },
  completed: {
    color: 'red',
    fontSize: 30,
  },
  listItem: {
    borderBottomColor: '#1E3A47',
    borderBottomWidth: 1,
  },
  txt: {
    color: '#1E3A47',
    fontWeight: '700',
    padding: 15,
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
    padding: 2,
    height: 60,
  },
  buttonText: {
    flex: 1,
    color: 'white',
    padding: 20,

  },
  footer: {
    flex: 1,
    marginTop: 200,
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
  listView: {
    flex: 2,
    // marginTop: 20,
  },
})

module.exports = styles

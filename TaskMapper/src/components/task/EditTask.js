import React, { Component, PropTypes } from 'react'
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native'

var t = require('tcomb-form-native')
var Task = t.struct({txt: t.Str, desc: t.Str, due: t.Date})
var Form = t.form.Form
var styles = require('../../styles/styles')
var GoogleSearch = require('../search/GoogleSearch');
var options = {
  fields: {
    txt: {
      label: 'Task Name',
      placeholder: 'enter your task',
    },
    desc: {
      label: 'Description',
      placeholder: 'Description',
    },
  },
}

class TaskEdit extends React.Component {
  constructor(){
    super()
    this.onUpdate = this.onUpdate.bind(this)
  }

  onUpdate() {
    var value = this.refs.form.getValue()
    if (value) {
      this.props.update(value, this.props.id)
    }
  }

  render() {
    return (
      <View style={[styles.container, {flexDirection: 'row', padding: 20} ]}>
        <ScrollView style={{flex:1, height: 700}}>
        <Text style={{fontSize: 17, fontWeight: '500', padding: 4}}>Location</Text>
        <GoogleSearch style={{flex:1, padding: 20}} location={this.props.item}/>
        <Form
          ref="form"
          type={Task}
          onChange={this._onChange}
          options={options}
          value={this.props.item}
        />
        <TouchableHighlight
          style={[styles.button,]}
          onPress={this.onUpdate}
          underlayColor='#99d9f4'>
          <Text style={{fontSize: 24, color: 'white', padding: 10}}>Save</Text>
        </TouchableHighlight>
      </ScrollView>
    </View>
    )
  }
}

module.exports = TaskEdit

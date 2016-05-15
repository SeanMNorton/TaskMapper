import React, { Component } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

var styles = require('../../styles/styles')
var t = require('tcomb-form-native');
var Task = t.struct({txt: t.Str, desc: t.Str, complete: t.Bool, due: t.Date});
var Form = t.form.Form;

var options = {
  fields: {
    txt: {
      label: 'Task Name',
      placeholder: 'enter your task',
      autoFocus: true
    },
    desc: {
      label: 'Description',
      placeholder: 'Description',
    },
  }
};

class TaskEdit extends React.Component {
  constructor(){
    super();
    this.onUpdate = this.onUpdate.bind(this);
  }

  onDateChange() {

  }

  onUpdate() {
    var value = this.refs.form.getValue();
    console.log(value)
    if (value) {
            this.props.update(value, this.props.id);
        }
  }


  render() {
          return (
              <View style={styles.container}>
                  <Form
                      ref="form"
                      type={Task}
                      onChange={this._onChange}
                      options={options}
                      value={this.props.item}/>
                  <TouchableHighlight
                    style={[styles.button, styles.saveButton]}
                    onPress={this.onUpdate}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableHighlight>
              </View>
          )
      }


};



module.exports = TaskEdit;

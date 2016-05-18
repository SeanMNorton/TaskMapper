'use strict'
import React, { Component } from 'react'
import {
  MapView,
  AsyncStorage,
  AlertIOS,
  View,
  Text,
} from 'react-native'

var chicagoRegion = {
  latitude: 41.889357,
  longitude: -87.637604,
  latitudeDelta: 0.0922,
  longitudeDelta: .09,
}

function circleCoords(cLat, cLong, rInMeters) {
  var coords = []
  var tau = 2*Math.PI
  var rLat = rInMeters/111111.1
  var rLong = rInMeters/(111111.1 * Math.cos(cLat*tau/360))

  var n = 100 // "circle" = n-sided polygon
  for (var i = 0; i <= n; i++) {
    var lat = cLat + rLat * Math.cos(tau*i/n)
    var long = cLong + rLong * Math.sin(tau*i/n)
    coords.push({latitude: lat, longitude: long})
  }
  return coords
}

function makeOverlay(marker) {
  return {
    coordinates: circleCoords(marker.latitude, marker.longitude, marker.radius),
    strokeColor: marker.color,
    lineWidth: 3,
  }
}

function makeAnnotation(marker) {
  var dueDate = new Date(marker.due)
  var format = {month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'}
  var title = marker.txt + " : " + dueDate.toLocaleDateString('en-US', format)
  return {
    id: marker.id,
    title: title,
    latitude: marker.latitude,
    longitude: marker.longitude,
    tintColor: marker.color,
  }
}

function makeMarker(task) {
  var setTime = new Date(task.set).getTime()
  var dueTime = new Date(task.due).getTime()
  var currentTime = new Date().getTime()

  var fracThrough = (currentTime-setTime)/(dueTime-setTime)

  return {
    txt: task.txt,
    desc: task.desc,
    due: task.due,
    latitude: task.location.lat,
    longitude: task.location.lng,
    radius: impendingRadius(fracThrough),
    color: impendingColor(fracThrough),
    alerted: task.alerted,
  }
}

function impendingRadius(x) {
  if (x < 1) {
    return 200/(1 - x)
  } else {
    return 0
  }
}

function impendingColor(x) {
  if (x < 1) {
    var hue = (x/3)+(2/3)
  } else {
    var hue = 1
  }
  var rgb = hslToRgb(hue, 1, .5);
  return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
}

function hslToRgb(h, s, l){
    var r, g, b;
    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function inCircle(self, marker) {
  var tau = 2 * Math.PI
  var avgY = (self.latitude + marker.latitude)/2

  var yDist = (self.latitude - marker.latitude)*111111.1
  var xDist = (self.longitude - marker.longitude)*(111111.1 * Math.cos(avgY*tau/360))

  var dist = Math.sqrt( Math.pow(xDist, 2) + Math.pow(yDist, 2) )
  return (dist < marker.radius)
}

var UltimateMap = React.createClass({
  getInitialState: function() {
    return {
      region: chicagoRegion,
      markers: [],
      myPosition: {
        latitude: 0,
        longitude: 0,
      },
    }
  },
  componentDidMount: function() {
    setInterval(() => {
      AsyncStorage.getItem("tasks")
      .then( (rawTasks) => JSON.parse(rawTasks))
      .then( (tasks) => {
        this.setState({markers: tasks.map(makeMarker)})
      })
    }, 16)

    setInterval(() => {
      var self = this.state.myPosition
      var newMarkers = []
      for (var i in this.state.markers) {
        var marker = this.state.markers[i]
        if ((!marker.alerted) && inCircle(self, marker)) {
          AlertIOS.alert(marker.name)
          marker.alerted = true
        } else {
          marker.alerted = false
        }
        newMarkers.push(marker)
      }
      this.setState({markers: newMarkers})
    }, 60000)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        var myPosition = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
        }
        this.setState({
          myPosition: myPosition
        })
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 5000}
    )
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = {
        lat: parseFloat(position.coords.latitude),
        long: parseFloat(position.coords.longitude),
      }
      this.setState({
        lastPosition
      })
    })
  },
  render: function() {
    // AsyncStorage.clear()
    return (
      <MapView style={{flex: 1}}
      region={this.state.region}
      showsUserLocation={true}
      annotations={this.state.markers.map(makeAnnotation)}
      overlays={this.state.markers.map(makeOverlay)} />
    )
  },
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  },
})

module.exports = UltimateMap

'use strict'
import React, { Component } from 'react'
import {
  MapView,
  AsyncStorage,
} from 'react-native'

var chicagoRegion = {
  latitude: 41.889357,
  longitude: -87.637604,
  latitudeDelta: 0.0922,
  longitudeDelta: 1.2,
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
  return {
    id: marker.id,
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
    latitude: task.location.lat,
    longitude: task.location.lng,
    radius: impendingRadius(fracThrough),
    color: impendingColor(fracThrough),
  }
}

function impendingRadius(x) {
  return 200/(1 - x)
}

function impendingColor(x) {
  var hue = x
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

var UltimateMap = React.createClass({
  // componentDidMount: function() {
  //   AsyncStorage.getItem("tasks")
  //   .then( (rawTasks) => JSON.parse(rawTasks))
  //   .then( (tasks) => {
  //     this.setState({markers: tasks.map(makeMarker)})
  //   })
  // },
  // componentWillReceiveProps: function() {
  //   AsyncStorage.getItem("tasks")
  //   .then( (rawTasks) => JSON.parse(rawTasks))
  //   .then( (tasks) => {
  //     this.setState({markers: tasks.map(makeMarker)})
  //   })
  // },
  getInitialState: function() {
    return {
      region: chicagoRegion,
      markers: [],
    }
  },
  render: function() {
    // AsyncStorage.clear()
    AsyncStorage.getItem("tasks")
    .then( (rawTasks) => JSON.parse(rawTasks))
    .then( (tasks) => {
      this.setState({markers: tasks.map(makeMarker)})
    })
    return (
      <MapView style={{flex: 1}}
      region={this.state.region}
      showsUserLocation={true}
      annotations={this.state.markers.map(makeAnnotation)}
      overlays={this.state.markers.map(makeOverlay)}
      />
    )
  },
  // componentDidMount() {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       var initialPosition = {
  //         long: parseFloat(position.coords.longitude),
  //         lat: parseFloat(position.coords.latitude)
  //       }
  //       this.setState({
  //         initialPosition
  //       })
  //     },
  //     (error) => alert(error.message),
  //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 5000}
  //   )
  //   this.watchID = navigator.geolocation.watchPosition((position) => {
  //     var lastPosition = {
  //       long: parseFloat(position.coords.longitude),
  //       lat: parseFloat(position.coords.latitude)
  //     }
  //     this.setState({
  //       lastPosition
  //     })
  //   })
  // },
  // componentWillUnmount() {
  //   navigator.geolocation.clearWatch(this.watchID)
  // },
})

module.exports = UltimateMap

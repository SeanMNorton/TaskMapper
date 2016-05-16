'use strict'
import React, { Component } from 'react'
import {
  MapView,
} from 'react-native'

function circleOverlay(marker) {
  var cLat = marker.latitude
  var cLong = marker.longitude
  var rInMeters = marker.radius

  var coords = []
  var tau = 2*Math.PI
  var rLat = rInMeters/111111.1
  var rLong = rInMeters/(111111.1 * Math.cos(cLat*tau/360))
  var n = 100 // roundness of circle
  for (var i = 0; i <= n; i++) {
    var lat = cLat + rLat * Math.cos(tau*i/n)
    var long = cLong + rLong * Math.sin(tau*i/n)
    coords.push({latitude: lat, longitude: long})
  }
  return {
    coordinates: coords,
    strokeColor: marker.color+"8",
    lineWidth: 3,
  }
}

var UltimateMap = React.createClass({
  getInitialState: function() {
    return {
      markers: [
          {
          id: '1',
          latitude: 41.889700,
          longitude: -87.637526,
          radius: 100,
          color: '#f00',
        },
        {
          id: '2',
          latitude: 41.889700,
          longitude: -87.6,
          radius: 300,
          color: '#0f0',
        },
      ]
    }
  },
  render: function() {
    return (
      <MapView style={{flex: 1}}
        annotations={this.annotations(this.state.markers)}
        overlays={this.overlays(this.state.markers)}
      />
    )
  },
  onDragStateChange: function(event) {
    if (event.state === 'ending') {
      var newMarkers = this.state.markers.map(function(marker) {
        if (marker.id === event.annotationId) {
          marker.latitude = event.latitude
          marker.longitude = event.longitude
        }
        return marker
      })
      this.setState({markers: newMarkers})
    }
  },
  annotations: function(markers) {
    return markers.map((marker) => {
      return {
        id: marker.id,
        latitude: marker.latitude,
        longitude: marker.longitude,
        draggable: true,
        onDragStateChange: this.onDragStateChange,
        tintColor: marker.color,
      }
    })
  },
  overlays: function(markers) {
    return markers.map(circleOverlay)
  },
})

module.exports = UltimateMap

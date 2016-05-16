'use strict'
import React, { Component } from 'react'
import {
  MapView,
} from 'react-native'

const LATITUDE = 41.889357;
const LONGITUDE = -87.637604;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 1.2;

function circleOverlay(marker) {
  var cLat = marker.latitude
  var cLong = marker.longitude
  var rInMeters = marker.radius
  var setPinFromSearch = ('../search/GoogleSearch');

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
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    markers: [],
    };
  },
  componentDidMount() {


      navigator.geolocation.getCurrentPosition(
        (position) => {
          var initialPosition = {
            long: parseFloat(position.coords.longitude),
            lat: parseFloat(position.coords.latitude)
          }
          this.setState({
            initialPosition
          })
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 5000}
      );
      this.watchID = navigator.geolocation.watchPosition((position) => {
        var lastPosition = {
          long: parseFloat(position.coords.longitude),
          lat: parseFloat(position.coords.latitude)
        }
        this.setState({
          lastPosition
        });
      });
    },

    componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  },
  render: function() {
    return (
      <MapView style={{flex: 2}}
        annotations={[...this.state.markers]}
        overlays={this.overlays(this.state.markers)}
        region={this.state.region}
        showsUserLocation={true}
      />
    )
  },

  setPinFromSearch: function(location) {
    this.setState({
      pin: {
        longitude: this.lng,
        latitude: this.lat,
      }
    })
    this.state.markers.push(this.state.pin);
    console.log(this.state.markers);
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
        latitudeDelta: marker.latitudeDelta,
        longitudeDelta: marker.longitudeDelta,
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

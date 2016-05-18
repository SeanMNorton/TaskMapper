var React = require('react-native');
var {
  View,
  Text,
  StyleSheet,
} = React;

var CustomCallout = React.createClass({
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.bubble}>
            {this.state}
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
});

module.exports = CustomCallout;

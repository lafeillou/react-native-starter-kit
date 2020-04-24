import React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentDidMount() {

  }


  render() {
    return (
      <View style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      }}
      >
        <Text style={{ fontSize: 40, color: '#000' }}>Test</Text>
      </View>
    );
  }
}

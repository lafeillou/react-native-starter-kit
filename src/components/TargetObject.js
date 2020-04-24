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
      <View style={styles.container}>
        <Text style={{ fontSize: 40, color: '#000' }}>targetObject</Text>
      </View>
    );
  }
}

import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'Do Something',
    };
  }

  render() {
    let {status} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.text}>{status}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  body: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000000',
  },
});

import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Fling from './components/Fling';
import MultiTap from './components/Multitap';
import PanResponderElement from './components/PanResponder';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.body}>
            <MultiTap />
            <PanResponderElement />

            <Fling />
          </View>
        </ScrollView>
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
});

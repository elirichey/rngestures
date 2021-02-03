import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Fling from './components/Fling';
import MultiTap from './components/Multitap';
import PanResponderContainer from './components/PanResponderContainer';
// import PinchableBoxContainer from './components/PinchableBoxContainer';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.body}>
            <Fling />
            <MultiTap />
            <PanResponderContainer />
            {/* <PinchableBoxContainer /> */}
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

import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {
  LongPressGestureHandler,
  ScrollView,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';

export class MultiTapElement extends Component {
  constructor(props) {
    super(props);

    this.doubleTapRef = React.createRef();
  }

  onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      alert("I'm being pressed for so long");
    }
  };

  onSingleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      alert("I'm touched");
    }
  };

  onDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      alert('D0able tap, good job!');
    }
  };

  render() {
    return (
      <LongPressGestureHandler
        onHandlerStateChange={this.onHandlerStateChange}
        minDurationMs={800}>
        <TapGestureHandler
          onHandlerStateChange={this.onSingleTap}
          waitFor={this.doubleTapRef}>
          <TapGestureHandler
            ref={this.doubleTapRef}
            onHandlerStateChange={this.onDoubleTap}
            numberOfTaps={2}>
            <View style={styles.box} />
          </TapGestureHandler>
        </TapGestureHandler>
      </LongPressGestureHandler>
    );
  }
}

export default class MultiTap extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>MULTI-TAP</Text>
        <View style={styles.row}>
          <MultiTapElement />

          <View style={styles.instructions}>
            <Text style={styles.txt}>Tap Once</Text>
            <Text style={styles.txt}>Double Tap</Text>
            <Text style={styles.txt}>Long Press</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width - 30,
    paddingTop: 30,
    paddingBottom: 30,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: '#000000',
    zIndex: 200,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 21,
  },
  row: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 30,
  },
  instructions: {
    flexDirection: 'column',
    paddingLeft: 15,
    justifyContent: 'center',
  },
  txt: {
    flex: 1,
    justifyContent: 'center',
  },
});

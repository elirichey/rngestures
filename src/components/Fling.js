import React, {Component} from 'react';
import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const circleRadius = 30;

class FlingElement extends Component {
  constructor(props) {
    super(props);
    this._touchX = new Animated.Value(windowWidth / 2 - circleRadius);
    this._translateX = Animated.add(
      this._touchX,
      new Animated.Value(-circleRadius),
    );
    this._translateY = new Animated.Value(0);
  }

  _onHorizontalFlingHandlerStateChange = ({nativeEvent}, offset) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(this._touchX, {
        toValue: this._touchX._value + offset,
        useNativeDriver: true,
      }).start();
    }
  };

  _onVerticalFlingHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(this._translateY, {
        toValue: this._translateY._value + 10,
        useNativeDriver: true,
      }).start();
    }
  };

  render() {
    return (
      <FlingGestureHandler
        direction={Directions.UP}
        numberOfPointers={2}
        onHandlerStateChange={this._onVerticalFlingHandlerStateChange}>
        <FlingGestureHandler
          direction={Directions.RIGHT | Directions.LEFT}
          onHandlerStateChange={(ev) =>
            this._onHorizontalFlingHandlerStateChange(ev, -10)
          }>
          <View style={styles.horizontalPan}>
            <Animated.View
              style={[
                styles.circle,
                {
                  transform: [
                    {
                      translateX: this._translateX,
                    },
                    {
                      translateY: this._translateY,
                    },
                  ],
                },
              ]}
            />
          </View>
        </FlingGestureHandler>
      </FlingGestureHandler>
    );
  }
}

export default class Fling extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlingElement />
        <Text>
          Move up (with two fingers) or right/left (with one finger) and watch
          magic happens
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 15,
    paddingRight: 15,
  },
  horizontalPan: {
    backgroundColor: '#f76f41',
    height: 300,
    justifyContent: 'center',
    marginVertical: 10,
  },
  circle: {
    backgroundColor: '#42a5f5',
    borderRadius: circleRadius,
    height: circleRadius * 2,
    width: circleRadius * 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 21,
  },
});

import React, {Component} from 'react';
import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;

class FlingElement extends Component {
  constructor(props) {
    super(props);

    this.touchX = new Animated.Value(windowWidth / 2 - 30);
    this.translateX = Animated.add(this.touchX, new Animated.Value(-30));
    this.translateY = new Animated.Value(0);
  }

  onHorizontalFlingHandlerStateChange = ({nativeEvent}, offset) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(this.touchX, {
        toValue: this.touchX.value + offset,
        useNativeDriver: true,
      }).start();
    }
  };

  onVerticalFlingHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(this.translateY, {
        toValue: this.translateY.value + 10,
        useNativeDriver: true,
      }).start();
    }
  };

  render() {
    return (
      <FlingGestureHandler
        direction={Directions.UP}
        numberOfPointers={2}
        onHandlerStateChange={this.onVerticalFlingHandlerStateChange}>
        <FlingGestureHandler
          direction={Directions.RIGHT | Directions.LEFT}
          onHandlerStateChange={(ev) =>
            this.onHorizontalFlingHandlerStateChange(ev, -10)
          }>
          <View style={styles.horizontalPan}>
            <Animated.View
              style={[
                styles.circle,
                {
                  transform: [
                    {
                      translateX: this.translateX,
                    },
                    {
                      translateY: this.translateY,
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
        <Text style={styles.title}>FLING</Text>

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
  },
  horizontalPan: {
    backgroundColor: '#000011',
    height: 300,
    justifyContent: 'center',
    marginVertical: 10,
  },
  circle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    height: 60,
    width: 60,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 21,
  },
});

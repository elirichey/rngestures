import React, {Component} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

import {
  PanGestureHandler,
  ScrollView,
  State,
} from 'react-native-gesture-handler';

export class DraggableBox extends Component {
  constructor(props) {
    super(props);
    this.translateX = new Animated.Value(0);
    this.translateY = new Animated.Value(0);
    this.lastOffset = {x: 0, y: 0};
    this.onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this.translateX,
            translationY: this.translateY,
          },
        },
      ],
      {useNativeDriver: true},
    );
  }

  onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this.lastOffset.x += event.nativeEvent.translationX;
      this.lastOffset.y += event.nativeEvent.translationY;
      this.translateX.setOffset(this.lastOffset.x);
      this.translateX.setValue(0);
      this.translateY.setOffset(this.lastOffset.y);
      this.translateY.setValue(0);
    }
  };

  render() {
    return (
      <PanGestureHandler
        {...this.props}
        onGestureEvent={this.onGestureEvent}
        onHandlerStateChange={this.onHandlerStateChange}>
        <Animated.View
          style={[
            styles.box,
            {
              transform: [
                {translateX: this.translateX},
                {translateY: this.translateY},
              ],
            },
            this.props.boxStyle,
          ]}
        />
      </PanGestureHandler>
    );
  }
}

export default class DragBox extends Component {
  render() {
    return <DraggableBox />;
  }
}

const styles = StyleSheet.create({
  box: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    backgroundColor: '#000000',
    padding: 10,
    zIndex: 200,
  },
});

import React, {Component, Fragment} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  PanResponder,
  I18nManager,
  Text,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {DraggableBox} from './DragBox';

class PanResponderElement extends Component {
  panResponder = {};
  previousLeft = 0;
  previousTop = 0;
  circleStyles = {};

  constructor(props) {
    super(props);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    });
    this.previousLeft = 20;
    this.previousTop = 84;
    this.circleStyles = {
      style: {
        left: this.previousLeft,
        top: this.previousTop,
        backgroundColor: 'green',
      },
    };
  }

  componentDidMount() {
    this.updateNativeStyles();
  }

  render() {
    return (
      <View
        ref={(circle) => {
          this.circle = circle;
        }}
        style={styles.circle}
        {...this.panResponder.panHandlers}
      />
    );
  }

  highlight = () => {
    this.circleStyles.style.backgroundColor = 'blue';
    this.updateNativeStyles();
  };

  unHighlight = () => {
    this.circleStyles.style.backgroundColor = 'green';
    this.updateNativeStyles();
  };

  updateNativeStyles = () => {
    this.circle && this.circle.setNativeProps(this.circleStyles);
  };

  handleStartShouldSetPanResponder = (e, gestureState) => {
    return true;
  };

  handleMoveShouldSetPanResponder = (e, gestureState) => {
    return true;
  };

  handlePanResponderGrant = (e, gestureState) => {
    this.highlight();
  };

  handlePanResponderMove = (e, gestureState) => {
    this.circleStyles.style.left =
      this.previousLeft + gestureState.dx * (I18nManager.isRTL ? -1 : 1);
    this.circleStyles.style.top = this.previousTop + gestureState.dy;
    this.updateNativeStyles();
  };

  handlePanResponderEnd = (e, gestureState) => {
    this.unHighlight();
    this.previousLeft += gestureState.dx * (I18nManager.isRTL ? -1 : 1);
    this.previousTop += gestureState.dy;
  };
}

export default class PanResponderContainer extends Component {
  onClick = () => {
    alert("I'm so touched");
  };
  render() {
    return (
      <Fragment>
        <Text style={styles.title}>PAN RESPONDER</Text>
        <ScrollView
          waitFor={['dragbox', 'imagepinch', 'imagerotation', 'imagetilt']}
          style={styles.scrollView}>
          <PanResponderElement />
          <DraggableBox />
        </ScrollView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: Dimensions.get('window').width - 30,
    backgroundColor: '#F5F5F5',
    paddingTop: 30,
    paddingBottom: 30,
    marginBottom: 30,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    zIndex: 100,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 21,
    paddingBottom: 15,
  },
});

import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder,
} from 'react-native';
import colors from '../../../styles/colors';

const seekerProps = {
  videoLength: Number,
  currentTime: Number,
  seekHandler: Function,
};

const SeekerThumb = ({anim, clipLength, windowWidth, videoPlayer}) => {
  const [dragging, setDragging] = React.useState(false);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setDragging(true);
      },
      onPanResponderMove: Animated.event( 
        [ 
            null, 
            { 
                dx: anim,
            }, 
        ], 
        { 
          useNativeDriver: false,
        } 
    ),
      onPanResponderRelease: (evt, gesture) => {
        setDragging(false);
        const {dx} = gesture;
        const clipLengthRatio = dx / windowWidth
        const seekTime = clipLength * clipLengthRatio;
        videoPlayer.seek(seekTime)
      }
    }),
  ).current;

  return (
    <Animated.View
    style={[
      dragging ? styles.draggingSeekerThumb : styles.seekerThumb,
      {left: anim},
    ]}
    {...panResponder.panHandlers}
  />
  )
}

const Seeker = (props: seekerProps) => {
  const width = Dimensions.get('window').width;
  const seekAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!(props.videoLength && props.videoLength > 0)) {
      return;
    }
    const newValue = width * (props.currentTime / props.videoLength)
    Animated.timing(seekAnim, {
      toValue: newValue - 11,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [props.currentTime, props.videoLength]);

  if (!props.currentTime && props.videoLength) {
    return <View />;
  }

  return (
    <View style={styles.seekerContainer}>
      <View style={styles.seekerTrack}>
        <Animated.View
          style={[
            styles.seeker,
            {width: seekAnim},
          ]}
        />
       <SeekerThumb 
        anim={seekAnim}
        clipLength={props.videoLength}
        windowWidth={width}
        videoPlayer={props.player} />
      </View>
    </View>
  );
};

export default Seeker;

const thumbBase = {
  backgroundColor: colors.primary,
  position: 'absolute',
  elevation: 10,
  zIndex: 100,
};

const styles = StyleSheet.create({
  seekerContainer: {
    height: 24,
    justifyContent: 'center',
  },
  seekerTrack: {
    width: '100%',
    height: 5,
    backgroundColor: '#ccc',
    position: 'relative',
  },
  seekerThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    top: -8,
    ...thumbBase,
  },
  draggingSeekerThumb: {
    width: 44,
    height: 44,
    borderRadius: 22,
    top: -22,
    ...thumbBase,
  },
  seeker: {
    height: 5,
    left: 0,
    top: 0, 
    backgroundColor: colors.primary,
    position: 'absolute',
  },
});

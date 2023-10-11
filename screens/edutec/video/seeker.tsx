import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import colors from '../../../styles/colors';

const seekerProps = {
  videoLength: Number,
  currentTime: Number,
  seekHandler: Function,
};

const Seeker = (props: seekerProps) => {
  const [seekerPositionPx, setSeekerPositionPx] = React.useState(0);
  const width = Dimensions.get('window').width;
  const seekAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!(props.videoLength && props.videoLength > 0)) {
      return;
    }
    setSeekerPositionPx(width * (props.currentTime / props.videoLength));
  }, [props.currentTime, props.videoLength]);

  React.useEffect(() => {
    Animated.timing(seekAnim, {
        toValue: seekerPositionPx - 11,
        duration: 100,
        useNativeDriver: false,
    }).start()
  }, [seekerPositionPx])

  if (!props.currentTime && props.videoLength) {
    return <View />;
  }

  return (
    <View style={styles.seekerContainer}>
      <View style={styles.seekerTrack}>
        <View
          style={[
            styles.seeker,
            {width: `${(seekerPositionPx / width) * 100}%`},
          ]}
        />
        <Animated.View style={[styles.seekerThumb, {left: seekAnim}]} />
      </View>
    </View>
  );
};

export default Seeker;

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
    backgroundColor: colors.primary,
    borderRadius: 11,
    position: 'absolute',
    top: -8,
    elevation: 10,
    zIndex: 100,
  },
  seeker: {
    height: 5,
    backgroundColor: colors.primary,
  },
 
});

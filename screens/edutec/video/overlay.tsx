import React from 'react';
import {View, StyleSheet, Pressable, Dimensions} from 'react-native';
import Centered, {Row} from '../../../components/layout';

import {
  faCog,
  faEllipsisH,
  faPlay,
  faFastForward,
  faFastBackward,
  faAngleRight,
  faAngleLeft,
  faPause,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {useNavigation} from '@react-navigation/native';
import Seeker from './seeker';

const VideoOverlay = props => {
  const width = Dimensions.get('window').width;
  const [playing, setPlaying] = React.useState(false);
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.overlay,
        {
          backgroundColor: 'rgba(0,0,0,0.3)',
        },
      ]}>
      <View style={styles.seekerView}>
        <Seeker 
          currentTime={props.position} 
          videoLength={props.videoLength}
          player={props.player} />
      </View>
      <Row styles={styles.controls}>
        <Row styles={{flex: 1}}>
          <Row styles={styles.playControls}>
            {props.videoData && props.videoData.previous_video && (
              <Pressable
                onPress={() => {
                  navigation.navigate('Video', {
                    video_id: props.videoData.previous_video,
                  });
                }}>
                <FontAwesomeIcon
                  icon={faFastBackward}
                  size={36}
                  color={'white'}
                />
              </Pressable>
            )}
            <Pressable
              onPress={() => {
                if (!props.player) {
                  return;
                }
                props.player.seek(parseInt(props.position) - 5);
              }}>
              <FontAwesomeIcon icon={faAngleLeft} size={36} color={'white'} />
            </Pressable>
            <Pressable
              onPress={() => {
                if (!props.player) {
                  return;
                }
                setPlaying(!playing);
                props.togglePlayback();
              }}>
              <FontAwesomeIcon
                icon={playing ? faPlay : faPause}
                size={36}
                color={'white'}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                if (!props.player) {
                  return;
                }
                props.player.seek(parseInt(props.position) + 15);
              }}>
              <FontAwesomeIcon icon={faAngleRight} size={36} color={'white'} />
            </Pressable>
            {props.videoData.videos.length > 0 && (
              <Pressable
                onPress={() => {
                  navigation.navigate('Video', {
                    video_id: props.videoData.videos[0].item_name,
                  });
                }}>
                <FontAwesomeIcon
                  icon={faFastForward}
                  size={36}
                  color={'white'}
                />
              </Pressable>
            )}
          </Row>
          <Centered style={{width: 44}}>
            <Pressable onPress={props.toggleOptions}>
              <FontAwesomeIcon icon={faEllipsisH} size={36} color={'white'} />
            </Pressable>
          </Centered>
        </Row>
      </Row>
    </View>
  );
};

export default VideoOverlay;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  controls: {
    padding: 8,
  },
  playControls: {
    justifyContent: 'center',
    gap: 12,
    flex: 2,
  },
  seekerView: {
    flex: 1,
    justifyContent: 'flex-end',
  }
});

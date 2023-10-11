import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  Switch,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import axios from 'axios';
import Loading from '../../components/loading';
import constants from '../../constants';
import Centered, {Row} from '../../components/layout';
import ImageIcon from '../../components/image';
import CourseItem from '../../components/edutec/course';
import {
  faCog,
  faTimes,
  faPlay,
  faFastForward,
  faFastBackward,
  faAngleRight,
  faAngleLeft,
  faPause,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Picker} from '@react-native-picker/picker';
import {card, text} from '../../styles/inputs';
import colors from '../../styles/colors';
import {useNavigation} from '@react-navigation/native';
import VideoOverlay from './video/overlay';

const OptionsModal = props => {
  return (
    <Modal
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onClose}>
      <View style={styles.modal}>
        <View style={{justifyContent: 'flex-end', flexDirection: 'row'}}>
          <Pressable onPress={props.onClose}>
            <FontAwesomeIcon icon={faTimes} size={24} color={'crimson'} />
          </Pressable>
        </View>
        <Text style={styles.title}>Playback Options</Text>
        <Text style={styles.subTitle}>FullScreen</Text>
        <Switch value={props.fullScreen} onValueChange={props.onFullScreen} />
        <Text style={styles.subTitle}>Default Quality</Text>
        <Picker
          selectedValue={props.quality}
          onValueChange={props.onQualityChange}>
          <Picker.Item label="360p" value="url_360p" />
          <Picker.Item label="480p" value="url_480p" />
          <Picker.Item label="720p" value="url_720p" />
        </Picker>
      </View>
    </Modal>
  );
};


export default function VideoPlayer(props) {
  const [data, setData] = React.useState(null);
  const playerRef = React.useRef(null);
  const [error, setError] = React.useState(false);
  const [fullScreen, setFullScreen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [overlay, setOverlay] = React.useState(false);
  const [showOptions, setShowOptions] = React.useState(false);
  const [position, setPosition] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [quality, setQuality] = React.useState('url_360p');
  const [paused, setPaused] = React.useState(true);

  React.useEffect(() => {
    if (!(playerRef && playerRef.current)) {
      return;
    }
    if (fullScreen) {
      playerRef.current.presentFullscreenPlayer();
    } else {
      playerRef.current.dismissFullscreenPlayer();
    }
  }, [fullScreen]);

  React.useEffect(() => {
    setQuality('url_360p');
    axios
      .get(
        `${constants.server_url}/api/method/edutec_courses.edutec_courses.api.get_course_video`,
        {
          params: {video_id: props.route.params.video_id},
        },
      )
      .then(res => {
        setData(res.data.message);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }, [props.route.params.video_id]);

  if (data === null) {
    return <Loading />;
  }

  const onProgress = progressData => {
    setPosition(parseInt(progressData.currentTime));
    setDuration(parseInt(progressData.playableDuration));
    if (parseInt(progressData.currentTime) % 3 != 0) {
      return;
    }

    axios
      .get(
        `${constants.server_url}/api/method/edutec_courses.edutec_courses.api.update_video_progress`,
        {
          params: {
            video_id: props.route.params.video_id,
            position: parseInt(progressData.currentTime),
            course_id: data.course,
          },
        },
      )
      .catch(err => {
        console.log(err.response.data);
      });
  };

  return (
    <View style={{flex: 1}}>
      <View style={{position: 'relative', flex: 1}}>
        <Pressable
          style={{width: '100%', flex: 1}}
          onPress={() => {
            setOverlay(!overlay);
            setTimeout(() => setOverlay(false), 2000);
          }}>
          <Video
            progressUpdateInterval={1000}
            loop
            paused={paused}
            onProgress={onProgress}
            source={{uri: data[quality]}}
            style={{width: '100%', flex: 1}}
            resizeMode="contain"
            ref={ref => {
              playerRef.current = ref;
            }}
            onLoad={stats => {
              setLoading(false);
              setPaused(false);
            }}
          />
        </Pressable>
        {loading ? <Loading styles={styles.overlay} /> : null}
        {overlay ? (
          <VideoOverlay
            player={playerRef.current}
            videoData={data}
            toggleOptions={() => setShowOptions(true)}
            position={position}
            videoLength={duration}
            togglePlayback={() => setPaused(!paused)}
          />
        ) : null}
      </View>
      {fullScreen ? null : (
        <View style={styles.card}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.subTitle}>{data.course}</Text>
          <Row styles={{alignItems: 'center'}}>
            <ImageIcon
              url={`${constants.server_url}/${data.publisher_image}`}
              width={50}
              height={50}
            />
            <Text style={styles.subTitle}>{data.publisher}</Text>
          </Row>

          <Text style={styles.description}>{data.description}</Text>
          <ScrollView>
            {data.videos.map((video, index) => {
              return (
                <CourseItem
                  key={index}
                  handler={() => {
                    if (video.item_type == 'Video') {
                      return props.navigation.navigate('Video', {
                        video_id: video.item_name,
                      });
                    }
                    return props.navigation.navigate('Article', {
                      article_id: video.item_name,
                    });
                  }}
                  video={video.item_type == 'Video'}
                  title={video.item_name}
                  progress={video.progress}
                  duration={video.duration}
                />
              );
            })}
          </ScrollView>
        </View>
      )}
      <OptionsModal
        visible={showOptions}
        onClose={() => setShowOptions(false)}
        fullScreen={fullScreen}
        onFullScreen={setFullScreen}
        quality={quality}
        onQualityChange={setQuality}
      />
    </View>
  );
}

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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    ...text,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  description: {
    marginTop: 8,
    fontSize: 14,
  },
  card: {
    ...card,
    flex: 2,
    padding: 8,
  },
  modal: {
    ...card,
    flex: 2,
    padding: 12,
    margin: 24,
    maxHeight: 200,
  },
});

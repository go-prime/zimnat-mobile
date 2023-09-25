import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  Switch
} from 'react-native';
import Video from 'react-native-video';
import axios from 'axios';
import Loading from '../../components/loading';
import constants from '../../constants';
import {Row} from '../../components/layout';
import ImageIcon from '../../components/image';
import CourseItem from '../../components/edutec/course';
import {faEllipsis, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Picker} from '@react-native-picker/picker';
import { card, text } from '../../styles/inputs';

const OptionsModal = props => {
  return (
    <Modal
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onClose}
    >
      <View style={styles.modal}>
        <View style={{justifyContent: "flex-end", flexDirection: "row"}}>
          <Pressable onPress={props.onClose}>
            <FontAwesomeIcon icon={faTimes} size={24} color={"crimson"} />
          </Pressable>
        </View>
        <Text style={styles.title}>Playback Options</Text>
        <Text style={styles.subTitle}>FullScreen</Text>
        <Switch
          value={props.fullScreen}
          onValueChange={props.onFullScreen}
        />
        <Text style={styles.subTitle}>Default Quality</Text>
        <Picker
          selectedValue={props.quality}
          onValueChange={props.onQualityChange}
        >
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
  const [showOptions, setShowOptions] = React.useState(false);
  const [quality, setQuality] = React.useState("url_480p")

  React.useEffect(() => {
    if(!(playerRef && playerRef.current)) return 
    console.log(playerRef.current)
    // return 
    if(fullScreen) {
      playerRef.current.presentFullscreenPlayer()
    } else {
      playerRef.current.dismissFullscreenPlayer()
    }
  }, [fullScreen])

  React.useEffect(() => {
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
  return (
    <View style={{flex: 1}}>
      <View style={{position: 'relative', flex: 1}}>
        <Video
          source={{uri: data[quality]}}
          style={{width: '100%', flex: 1}}
          controls={true}
          resizeMode="contain"
          ref={ref => {
            playerRef.current = ref
          }}
          onLoad={stats => {
            setLoading(false);
          }}
        />
        {loading ? (
          <Loading
            styles={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        ) : null}
      </View>
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            padding: 8,
          }}>
          <Pressable onPress={() => {
            setShowOptions(true)
          }}>
            <FontAwesomeIcon icon={faEllipsis} size={24} />
          </Pressable>
        </View>
        <Text style={styles.description}>{data.description}</Text>
        <ScrollView>
          {data.videos.map((video, index) => { console.log(video); return (
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
            />
          )})}
        </ScrollView>
      </View>
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
    maxHeight: 200
  },
});

import React from 'react';

import {
  View,
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import colors from '../../styles/colors';
import {card, shadow, text} from '../../styles/inputs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import axios from 'axios';
import constants from '../../constants';
import {
  faImage,
  faVideo,
  faFileAlt,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import Centered, {Row} from '../../components/layout';
import SearchBar from '../../components/search';
import {RoundedRectButton} from '../../components/partner_store/buttons';
import ImageIcon from '../../components/image';
import Loading from '../../components/loading';
import Rating from '../../components/rating';
import ProgressBar from '../../components/edutec/progress';
import CourseItem from '../../components/edutec/course';
import {SquareBundleButton} from '../../components/partner_store/bundle';
import {SquareProductButton} from '../../components/partner_store/product';
import {Appearance} from 'react-native';
import {Heading, SubTitle, Title} from '../../components/text';
import {useIsFocused} from '@react-navigation/native';
import ProduceCard from '../../components/marketplace/produce';

export default function MarketplaceCategoryScreen(props) {
  const [data, setData] = React.useState(null);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    axios
      .get(
        `${constants.server_url}/api/method/open_marketplace.open_marketplace.api.get_category`,
        {params: {category_id: props.route.params.category}},
      )
      .then(res => {
        console.log(res.data.message);
        setData(res.data.message);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }, [isFocused]);

  if (!data) {
    return <Loading />;
  }

  const width = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Centered styles={{position: 'relative'}}>
        <ImageIcon
          width={width}
          height={200}
          url={`${constants.server_url}/${data.image}`}
        />
        <Text style={styles.title}>{data.name}</Text>
      </Centered>

      <View>
        <Text style={styles.description}>{data.description}</Text>
      </View>
      <View style={styles.half_card}>
        <ScrollView>
          <Row styles={styles.row}>
            <View style={styles.column}>
              {data.produce
                .map((p, index) => ({...p, index: index}))
                .filter(p => p.index % 2 == 0)
                .map(p => (
                  <ProduceCard {...p} image={p.cover_image} key={p.index} />
                ))}
            </View>
            <View style={[styles.column, {paddingTop: 36}]}>
              {data.produce
                .map((p, index) => ({...p, index: index}))
                .filter(p => p.index % 2 == 1)
                .map(p => (
                  <ProduceCard {...p} image={p.cover_image} key={p.index} />
                ))}
            </View>
          </Row>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  column: {
    flex: 1,
    padding: 16,
  },
  row: {
    paddingLeft: 4,
    paddingRight: 4,
  },
  half_card: {
    marginTop: 24,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    ...shadow,
    backgroundColor:
      Appearance.getColorScheme() === 'dark' ? '#111' : '#f5f5f5',
    elevation: 5,
    flex: 1,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    paddingBottom: 4,
    margin: 12,
    ...text,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 18,
    padding: 8,
    ...text,
    fontWeight: 'bold',
  },
  description: {
    ...text,
    padding: 12,
  },
  card: {
    ...shadow,
    margin: 12,
    elevation: 5,
    borderRadius: 12,
  },
  number: {
    color: '#ccc',
    fontSize: 36,
    textAlign: 'center',
    paddingLeft: 18,
    paddingRight: 18,
    fontWeight: 'bold',
  },
  subscribeBtn: {
    backgroundColor: colors.primary,
    padding: 12,
    width: 200,
    position: 'absolute',
    borderRadius: 24,
    top: -24,
  },
  subscribedBtn: {
    borderColor: colors.primary,
    ...card,
    borderWidth: 3,
    padding: 12,
    width: 200,
    position: 'absolute',
    borderRadius: 24,
    top: -24,
  },
  subscribeBtnText: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: '#fff',
  },
  subscribedBtnText: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: colors.primary,
  },
  studentCount: {
    fontSize: 36,
    ...text,
    fontWeight: 'bold',
  },
  studentLabel: {
    fontSize: 16,
    ...text,
    fontWeight: 'bold',
  },
});

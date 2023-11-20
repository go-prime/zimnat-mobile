import React from 'react';
import {View, Modal, Pressable} from 'react-native';
import colors from '../styles/colors';
import {useNavigation} from '@react-navigation/native';
import getColors from '../hooks/colors';
import {Title, Paragraph, SubTitle} from './text';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Centered, {Row} from './layout';
import {Dimensions} from 'react-native';
import {Text} from 'react-native';

export default function NotPermitted(props) {
  const navigation = useNavigation();
  const colorScheme = getColors(navigation);
  const {width, height} = Dimensions.get('screen');

  return (
    <Modal animationType="slide" transparent visible={props.visible}>
      <View style={{flex: 1, backgroundColor: colorScheme.tertiary}}>
        <Centered styles={{flex: 1}}>
          <Centered styles={{width: width - 50}}>
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              color={colors.primary}
              size={96}
            />
            <Title color={colors.primary}>Not Permitted</Title>
            <Paragraph color={colors.primary}>
              The currently signed in account has insufficient permissions to
              perform this action.
            </Paragraph>
            <Paragraph color={colors.primary}>
              Sign in with a different account or subscribe to a higher tier of
              Hustle Hub to continue
            </Paragraph>
          </Centered>
          <Row styles={{margin: 12}}>
            <Pressable
              style={{padding: 8}}
              onPress={() => navigation.navigate('Login')}>
              <SubTitle color={colors.primary}>Sign In</SubTitle>
            </Pressable>
            <Pressable
              style={{
                padding: 8,
                borderWidth: 2,
                borderColor: colors.primary,
                borderRadius: 8,
              }}
              onPress={() => navigation.navigate('Subscriptions')}>
              <SubTitle color={colors.primary}>Upgrade</SubTitle>
            </Pressable>
          </Row>
        </Centered>
      </View>
    </Modal>
  );
}

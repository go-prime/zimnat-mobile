import React from 'react';
import {Pressable, StyleSheet, View, Text} from 'react-native';
import Loading from '../loading';
import {Label, Paragraph, SubTitle} from '../text';
import ProgressBar from '../edutec/progress';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCaretDown,
  faCaretRight,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {Row} from '../layout';
import { shadow } from '../../styles/inputs';

const OnboardingStep = props => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <View>
      <Pressable onPress={() => setExpanded(!expanded)}>
        <Row styles={{justifyContent: 'space-between'}}>
          <Row>
            <FontAwesomeIcon
              icon={expanded ? faCaretDown : faCaretRight}
              size={24}
            />
            <Label>{props.step}</Label>
          </Row>
          <FontAwesomeIcon
            icon={props.complete == 1 ? faCheck : faTimes}
            size={24}
          />
        </Row>
      </Pressable>
      {expanded && (
        <View>
          <Paragraph>{props.description}</Paragraph>
          <Pressable>
            <Text>Start</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const OnboardingCard = () => {
  const [data, setData] = React.useState({
    target: "I want to sell tangible goods",
    description: "Determine how to configure, what to sell, at what price and to whom.",
    steps: [
        {
            step: "Create a Item",
            description: "Items are master files that describe your products, keep track of them here.",
            complete: 1
        },
        {
            step: "Create an Item Price",
            description: "Prices allow you to configure what you buy and sell products for",
            complete: 0
        },
        {
            step: "Create a Warehouse",
            description: "Warehouses exist to organize your inventory.",
            complete: 0
        },
    ]
  });
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    if(!(data && data.steps)) return;
    const completed = data.steps.filter(s => s.complete == 1).length;
    setProgress((completed / data.steps.length) * 100);
  }, [data])

  if (!data) {
    return <Loading />;
  }
  //render data
  return (
    <View style={styles.card}>
      <SubTitle>{data.target}</SubTitle>
      <Paragraph>{data.description}</Paragraph>
      {data.steps.map(s => (
        <OnboardingStep key={s.name} {...s} />
      ))}
      <View style={{padding: 6, marginTop: 12}}>
      <ProgressBar progress={progress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
card: {
...shadow,
elevation: 3,
margin: 36,
padding: 24,
borderRadius: 12,
}
})

export default OnboardingCard
import {Appearance} from 'react-native';

const text = {
    color: Appearance.getColorScheme() === 'dark' ? 'white' : 'black',
  };

const label = {
  fontSize: 18,
  fontWeight: 'bold',
  ...text,
  marginBottom: 8,
};


const paragraph = {
    ...text, 
};

const heading = {
    fontSize: 28,
    marginBottom: 12,
    ...text
}

const title = {
    fontSize: 24,
    marginBottom: 8,
    ...text
};

const subTitle = {
    fontSize: 18,
    marginBottom: 8,
    color: "#999"

};


export {label, text, paragraph, title, subTitle}

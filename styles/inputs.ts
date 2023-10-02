import { Appearance } from "react-native";

const card = {
  backgroundColor: Appearance.getColorScheme() === 'dark' ? '#282C34' : 'white',
}

const shadow = {
    ...card,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
}

const inputContainer = {
  ...shadow,
  padding: 6,
  paddingLeft: 12,
  paddingRight: 12,
  borderRadius: 8,
  
  flexDirection: 'row',
  gap: 12,
  alignItems: 'center',
  elevation: 5,
};

const inputText = {
    fontSize: 16,
    padding: 6,
    flex: 1,
}

const label = {
  fontSize: 18,
  fontWeight: 'bold',
  ...text,
  marginBottom: 8,
};

const text = {
  color: Appearance.getColorScheme() === 'dark' ? 'white' : 'black',
}




export {label, inputContainer, inputText, shadow, card, text};
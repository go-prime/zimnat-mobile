const shadow = {
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
  backgroundColor: 'white',
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
  color: 'black',
  marginBottom: 8,
};




export {label, inputContainer, inputText, shadow };
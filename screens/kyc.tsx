import React from 'react';

import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';

import {Heading, Label, Paragraph, SmallLabel} from '../components/text';
import Field from '../components/form';
import ImagePicker from '../components/image_picker';
import colors from '../styles/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

const KYCForm = () => {
  const [data, setData] = React.useState('');
  const [fullname, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [iDImgData, setIDImgData] = React.useState(null);
  const [iDImgName, setIDImgName] = React.useState('');
  const [faceImgData, setFaceImgData] = React.useState(null);
  const [faceImgName, setFaceImgName] = React.useState('');
  const [proofImgData, setProofImgData] = React.useState(null);
  const [proofImgName, setProofImgName] = React.useState('');

  return (
    <ScrollView>
       <Paragraph>
        Please fill in the details below to complete your KYC process.
        To complete your KYC process, you will need to upload your ID,
        a clear front facing photo of yourself, and a proof of residence.
        Our A.I tools will verify your details and provide you with an indication
        to show whether your KYC process is successful or not.
      </Paragraph>
      <Paragraph>
        If you are unsuccessful and feel a mistake has been made, please get 
        in touch with our support team.
      </Paragraph>
      <Heading>Personal Details</Heading>
      <Paragraph>
        This is basic information collected about who you are and where you live. 
        Please make sure the name matches the one printed on your ID, and that your 
        address is the same one as is  printed  on your proof of residence.
      </Paragraph>
      <Field
        value={fullname}
        onTextChange={setFullName}
        label={'Full Name (as appearing on ID)'}
      />
      <Field value={phone} onTextChange={setPhone} label={'Phone'} />
      <Field value={email} onTextChange={setEmail} label={'Email'} />
      <Field
        value={address}
        multiline
        onTextChange={setAddress}
        label={'Address'}
      />

      <Heading>National ID</Heading>
      <Paragraph>
        A valid national identity document that can be uploaded via this 
        platform must clearly state your name and have a picture. 
        Acceptable identity documents for this platform are your national
         ID (metal or plastic), your passport or driver's license.
         Since the pictures on your ID will be compared with the one you take, 
         please make sure your face is clearly visible in your photo.
      </Paragraph>
      <ImagePicker 
        label={'Upload your ID here:'}
        onImageChange={setIDImgData}
        onNameChange={setIDImgName} />

      <ImagePicker
        cameraOnly
        label={'Take a clear front facing photo of yourself here:'}
        onImageChange={setFaceImgData}
        onNameChange={setFaceImgName}
      />
      <Heading>Proof of Residence</Heading>
      <Paragraph>
        Your proof of residence must clearly state your name and the 
        address you've filled in earlier. The document you upload must be a picture 
        and may be in the form of a letter from your employer, a bill in your name
        or a bank statement.
      </Paragraph>
      <ImagePicker 
        label={'Upload your proof of residence:'}
        onImageChange={setProofImgData}
        onNameChange={setProofImgName}
      />
      <Pressable style={styles.save}>
        <FontAwesomeIcon color={'white'} size={24} icon={faCheck} />
        <Text style={styles.tierText}>Submit</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  save: {
    padding: 12,
    backgroundColor: colors.tertiary,
    margin: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 24,
  },
  tierText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 12,
  },
});

export default KYCForm;

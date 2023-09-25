import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios'
import Loading from '../../components/loading';
import constants from '../../constants';
import { Row } from '../../components/layout';
import ImageIcon from '../../components/image';
import CourseItem from '../../components/edutec/course';
import RenderHtml from 'react-native-render-html';
import { shadow, text } from '../../styles/inputs';


export default function ArticleViewer(props) {

    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        axios.get(`${constants.server_url}/api/method/edutec_courses.edutec_courses.api.get_course_article`, {
            params: {article_id: props.route.params.article_id}
        }).then(res => {
            console.log(res.data.message)
            setData(res.data.message)
        })
        .catch(err => {
          console.log(err.response.data);
        });
    }, [])
    if (data === null) {
        return <Loading />
    }
    return (
        <ScrollView style={{padding: 8}}>
            <View style={styles.card} >
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.subTitle}>{data.course}</Text>
                <Row styles={{alignItems:"center"}}>
                    <ImageIcon url={`${constants.server_url}/${data.publisher_image}`} width={50} height={50} />
                    <Text style={styles.subTitle}>{data.publisher}</Text>
                </Row>
            </View>
            <RenderHtml source={{html: data.content}} contentWidth={200}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        ...text
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
        ...shadow,
    margin: 12,
    elevation: 5,
    borderRadius: 12,
    padding: 8,
    }
})
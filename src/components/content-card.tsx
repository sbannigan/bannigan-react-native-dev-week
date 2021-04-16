import React from 'react';
import { ImageBackground, StyleSheet, Text, TextStyle, View } from 'react-native';

export const ContentCard = ({ content }: any) => {

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.thumbnail} source={{uri: content?.thumbnailUrl}}>

            </ImageBackground>
            <View style={styles.metadataContainer}>
                <Text style={styles.title} numberOfLines={99} ellipsizeMode='middle'>
                    {content?.title}
                </Text>
                <Text style={styles.contentType}>{content?.contentType}</Text>
            </View>
        </View>
    );

}

const text: TextStyle = {
    fontFamily: 'Larsseit-Medium',
    fontSize: 16
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        padding: 4,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 23,
        aspectRatio: 0.83,
        display: 'flex'
    },
    thumbnail: {
        width: '100%',
        aspectRatio: 1.77,
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 8,
        backgroundColor: 'lightgray'
    },
    metadataContainer: {
        paddingHorizontal: 4,
        display: 'flex',
        flex: 1
    },
    title: {
        ...text,
        flex: 1
    },
    contentType: {
        fontFamily: 'Larsseit',
        paddingTop: 8
    }
});
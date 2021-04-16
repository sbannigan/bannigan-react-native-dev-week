import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HTML from 'react-native-render-html';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../context';

export const ContentBanner = ({ banner, detail, onPress }: any) => {

    const { config } = useAuth();

    return (
        <View style={{
            ...styles.container,
            backgroundColor: detail?.backgroundColor || 'white'
        }}>
            { detail?.backgroundImageUrl ? <Image style={styles.image} source={{
                uri: detail.backgroundImageUrl
            }} /> : null}

            <View style={styles.contentContainer}>
                <Text style={{
                    ...styles.title,
                    color: detail?.headerColor || '#2c2c2e'
                }} numberOfLines={3}>
                    {banner.title}
                </Text>

                {banner.descriptionHtml ?
                    <HTML
                        baseFontStyle={{
                            ...styles.description,
                            color: detail?.bodyColor || '#2c2c2e'
                        }}
                        defaultTextProps={{
                            numberOfLines: 3
                        }}
                        source={{ html: banner.descriptionHtml }} />
                    : null}


                {detail ? <TouchableOpacity
                    style={styles.button}
                    onPress={onPress}>
                    <Text style={{
                        ...styles.buttonText,
                        color: detail?.buttonColor || config.configurations.accentColor
                    }}>
                        {detail.buttonLabel}
                    </Text>
                    <Ionicons style={{ marginLeft: 4 }} name='arrow-forward-outline' size={12} color={detail?.buttonColor || config.configurations.accentColor} />
                </TouchableOpacity> : null}
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        padding: 8,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 8,
        display: 'flex'
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        overflow: 'hidden'
    },
    contentContainer: {
        paddingTop: 28,
        paddingHorizontal: 8,
        paddingBottom: 8
    },
    title: {
        fontFamily: 'Larsseit-ExtraBold',
        fontSize: 20
    },
    description: {
        fontFamily: 'Larsseit',
        fontSize: 16
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,.05)',
        borderRadius: 999,
        paddingVertical: 12,
        marginTop: 20
    },
    buttonText: {
        fontFamily: 'Larsseit-Medium',
        fontSize: 16
    }
});
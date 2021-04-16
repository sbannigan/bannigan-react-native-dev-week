import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Text, View } from 'react-native';

export const ContentDetailScreen = ({ route, navigation }: StackScreenProps<any, 'ContentDetail'>) => {
    const { identity } = route.params as any;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Content Detail Screen</Text>
            <Text>{identity}</Text>
        </View>
    );

}

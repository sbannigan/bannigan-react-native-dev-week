import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Text, View } from 'react-native';

export const ContentScreen = ({ navigation }: StackScreenProps<any, 'Content'>) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Button
                title="Go to Details... again"
                onPress={() => navigation.push('ContentDetail', {
                    itemId: Math.floor(Math.random() * 100),
                })}
            />
        </View>
    );

}

import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, StyleSheet, Text } from 'react-native';
import { useAuth } from '../../context';
import { LargeTitleScrollView } from '../../components';
import LinearGradient from 'react-native-linear-gradient';

export const HomeScreen = ({ navigation }: StackScreenProps<any, 'Home'>) => {

    const { signOut, currentUser, config } = useAuth();
    return (
        <LargeTitleScrollView>
            <LinearGradient useAngle={true} angle={70} angleCenter={{ x: 0.5, y: 0.5 }} colors={[
                config?.configurations.bannerInitialColor,
                config?.configurations.bannerTransitionColor
            ]} style={styles.bannerContainer}>
                <Text style={styles.bannerText}>
                    <Text>Good afternoon, </Text>
                    <Text style={{ fontFamily: 'Larsseit-Bold' }}>{currentUser.firstName}!</Text>
                </Text>
            </LinearGradient>

            <Button
                title='Sign Out'
                onPress={() => {
                    signOut();
                }}
            />

        </LargeTitleScrollView>
    );

}

const styles = StyleSheet.create({
    bannerContainer: {
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 16,
        borderRadius: 10
    },
    bannerText: {
        fontFamily: 'Larsseit-Medium',
        fontSize: 18,
        color: 'white'
    }
});
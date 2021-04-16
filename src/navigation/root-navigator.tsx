import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { AuthStack } from './auth-navigator';
import { TabStack } from './tab-navigator';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { useAuth } from '../context';

enableScreens();

const Stack = createStackNavigator();

export const RootNavigator = () => {

    const { loading, currentUser } = useAuth();

    if (loading) {
        return (
            <View/>
        );
    }      

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                animationEnabled: !!currentUser
            }}>
                {
                    currentUser ? (
                        <Stack.Screen name='Tabs' component={TabStack} />
                    ) : (
                        <Stack.Screen name='Auth' component={AuthStack} />
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

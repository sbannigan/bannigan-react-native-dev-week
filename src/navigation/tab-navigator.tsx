import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ContentDetailScreen, ContentScreen, ExploreScreen, HomeScreen } from '../screens';
import { createNativeStackNavigator, NativeStackNavigationOptions } from 'react-native-screens/native-stack';
import { useTheme } from '@react-navigation/native';
import { Platform } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

export const largeHeaderOptions = (): NativeStackNavigationOptions => {
    const { colors } = useTheme();
    if (Platform.OS === 'ios') {
        return {
            headerTranslucent: true,
            headerLargeTitle: true,
            headerLargeTitleHideShadow: true,
            headerLargeStyle: {
                backgroundColor: colors.background
            },
            headerLargeTitleStyle: {
                fontFamily: 'Larsseit-Bold'
            },
            headerTitleStyle: {
                fontFamily: 'Larsseit-Medium'
            }
        }
    }
    else {
        return {
            headerTopInsetEnabled: false,
            headerTitleStyle: {
                fontFamily: 'Larsseit-Medium'
            }
        }
    }
}

export const HomeTabNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeScreen} options={largeHeaderOptions()}/>
            <Stack.Screen
                name='ContentDetail'
                component={ContentDetailScreen}
            />
        </Stack.Navigator>
    );
}

export const ContentTabNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name='Content' component={ContentScreen} options={largeHeaderOptions()}/>
            <Stack.Screen
                name='ContentDetail'
                component={ContentDetailScreen}
            />
        </Stack.Navigator>
    );
}

export const ExploreTabNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name='Explore' component={ExploreScreen} options={largeHeaderOptions()}/>
            <Stack.Screen
                name='ContentDetail'
                component={ContentDetailScreen}
            />
        </Stack.Navigator>
    );
}

export const TabStack = () => {
    const Tab = createBottomTabNavigator();
    
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName = '';
                switch (route.name) {
                    case 'Home':
                        iconName = focused
                            ? 'home'
                            : 'home-outline';
                        break;
                    case 'Content':
                        iconName = focused
                            ? 'document'
                            : 'document-outline';
                        break;
                    case 'Explore':
                        iconName = focused
                            ? 'compass'
                            : 'compass-outline';
                        break;
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}>

            <Tab.Screen name='Home' component={HomeTabNavigator} />
            {/* <Tab.Screen name='Content' component={ContentTabNavigator} /> */}
            <Tab.Screen name='Explore' component={ExploreTabNavigator} />
        </Tab.Navigator>
    );
}

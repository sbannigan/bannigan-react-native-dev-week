import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, ScrollViewProps } from 'react-native';

export const LargeTitleScrollView = ({ children, ...props }: any) => {

    // Hack to fix largeTitle being collapsed on load
    // https://github.com/software-mansion/react-native-screens/issues/645
    const [showScrollView, setShowScrollView] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setShowScrollView(true);
        }, 0);
    });

    if (showScrollView) {
        return (
            <ScrollView contentInsetAdjustmentBehavior='automatic' {...props}>
                {children}
            </ScrollView>
        );
    }
    return null;

}

export const LargeTitleFlatList = ({ children, ...props }: any) => {

    // Hack to fix largeTitle being collapsed on load
    // https://github.com/software-mansion/react-native-screens/issues/645
    const [showFlatList, setShowFlatList] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setShowFlatList(true);
        }, 0);
    });

    if (showFlatList) {
        return (
            <FlatList contentInsetAdjustmentBehavior='automatic' {...props}/>
        );
    }
    return null;

}

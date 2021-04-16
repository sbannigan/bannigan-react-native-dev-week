import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, ViewToken } from 'react-native';
import { ContentBanner, ContentCard, LargeTitleFlatList, LargeTitleScrollView } from '../../components';
import { fetchCollectionItems, fetchContentBanners, fetchFeaturedContent } from '../../services';

export const ExploreScreen = ({ navigation }: StackScreenProps<any, 'Explore'>) => {

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await _fetchFeaturedContent();
        await _fetchBanners(banners.map(banner => banner.identity), true);
        setTimeout(() => {
            setRefreshing(false);
        }, 500);
    }, []);

    useEffect(() => {
        _fetchFeaturedContent();
    }, []);

    const _fetchFeaturedContent = async () => {
        const result = await fetchFeaturedContent();
        setFeaturedContent(result.content);
    };

    const _fetchBanners = async (identities: string[], replace = false) => {
        const result = await fetchContentBanners(identities);
        if (replace) {
            setBanners(result.content)
        }
        else {
            setBanners((currentBanners: any) => 
                [...currentBanners, ...result.content]
            );
        }
    }

    const _fetchCollectionItems = async (identity: string) => {
        const result = await fetchCollectionItems(identity);
        setCollectionItems((currentCollectionItems: any) => {
            return {
                ...currentCollectionItems,
                [identity]: result.content
            }
        });
    }

    const [featuredContent, setFeaturedContent] = useState<any[]>([]);
    const [banners, setBanners] = useState<any[]>([]);
    const [collectionItems, setCollectionItems] = useState<any>({});
    
    const renderContentItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    navigation.push('ContentDetail', {
                        identity: item?.identity,
                    })
                }}>

                <View style={styles.slide}>
                    <ContentCard content={item}/>
                </View>
            </TouchableOpacity>
        );
    }

    const renderContentBanner = (banner: any) => {
        const detail = banners.find(x => x.identity === banner.identity);
        return (
            <View style={styles.contentBanner}>
                <ContentBanner
                    onPress={() => {
                        navigation.push('ContentDetail', {
                            identity: detail?.folder?.identity || detail?.content?.contentIdentity,
                        })
                    }}
                    style={styles.contentBanner}
                    key={banner.identity}
                    banner={banner}
                    detail={detail}/>
            </View>
        )
    }

    const EmptyContentCard = () => {
        return (
            <>
            <View key='1' style={styles.slide}>
                <ContentCard/>
            </View>
            <View key='2' style={styles.slide}>
                <ContentCard/>
            </View>
            <View key='3' style={styles.slide}>
                <ContentCard/>
            </View>
            </>
        )
    }

    const renderFeaturedContentItems = ({ item, index }: any) => {
        if (item) {
            switch (item.featuredContentType) {
                case 'Collection': {
                    return renderCollection(item);
                }
                case 'ContentBanner': {
                    return renderContentBanner(item);
                }
            }
        }
    }

    const renderCollection = (collection: any) => {
        let data = [];
        if (collectionItems && collectionItems[collection.identity]) {
            data = collectionItems[collection.identity];
        }
        return (
            <>
                <Text style={styles.collectionTitle} numberOfLines={1}>{collection.title}</Text>
                { collection.description ?
                    <Text style={styles.collectionDescription} numberOfLines={1}>{collection.description}</Text>
                : null }

                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0}
                    snapToInterval={styles.slide.width + styles.slide.marginLeft}
                    snapToAlignment='center'
                    disableScrollViewPanResponder={true}
                    contentContainerStyle={{
                        paddingRight: styles.slide.marginLeft
                    }}
                    style={styles.collection}
                    data={data}
                    ListEmptyComponent={EmptyContentCard}
                    scrollEnabled={data.length > 0}
                    keyExtractor={(item: any, index: any) => item.identity}
                    renderItem={renderContentItem}/>
            </>
        )
    }

    const bannerStateRef = useRef(banners);
    const collectionItemsStateRef = useRef(collectionItems);
    useEffect(() => {
        bannerStateRef.current = banners;
        collectionItemsStateRef.current = collectionItems;
    }, [banners, collectionItems]);

    const featuredContentViewableItemsChanged = useRef((viewableItems: {changed: ViewToken[]})=> {
        const bannersToFetch = viewableItems.changed
            .filter(item =>
                item.isViewable &&
                item.item.featuredContentType === 'ContentBanner' &&
                !bannerStateRef.current.some(banner => banner.identity === item.item.identity)
            ).map(item => item.item.identity);

        if (bannersToFetch?.length > 0) {
            _fetchBanners(bannersToFetch);
        }

        const collectionItemsToFetch = viewableItems.changed
            .filter(item =>
                item.isViewable &&
                item.item.featuredContentType === 'Collection' &&
                !collectionItemsStateRef.current[item.item.identity]
            ).map(item => item.item.identity);

        if (collectionItemsToFetch?.length > 0) {
            collectionItemsToFetch.forEach((identity: string) => {
                _fetchCollectionItems(identity);
            });
        }    
    });

    return (
        <LargeTitleFlatList
            contentContainerStyle={{
                paddingVertical: 20
            }}
            keyExtractor={(item: any, index: any) => item.identity}
            renderItem={renderFeaturedContentItems}
            onViewableItemsChanged={featuredContentViewableItemsChanged.current}
            data={featuredContent}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
        }/>
    );
}

const styles = StyleSheet.create({
    slide: {
        width: 200,
        marginLeft: 16
    },
    collection: {
        marginTop: 10,
        marginBottom: 30,
        overflow: 'visible'
    },
    collectionTitle: {
        fontFamily: 'Larsseit-Medium',
        fontSize: 20,
        paddingHorizontal: 16
    },
    collectionDescription: {
        fontFamily: 'Larsseit',
        fontSize: 16,
        paddingHorizontal: 16
    },
    contentBanner: {
        width: '100%',
        marginBottom: 30,
        paddingHorizontal: 16
    }
});

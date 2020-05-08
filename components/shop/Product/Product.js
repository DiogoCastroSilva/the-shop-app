// React
import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';


// Components
import Card from '../../UI/Card/Card';

// Component
const Product = ({
    image,
    title,
    price,
    onSelect,
    children
}) => {
    let Touchable = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        Touchable = TouchableNativeFeedback;
    }
    return (
            <Card style={styles.product}>
                <View style={styles.touchable}>
                    <Touchable onPress={onSelect} useForeground>
                        <View>
                            <View style={styles.imageContainer}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: image }}
                                />
                            </View>
                            <View style={styles.details}>
                                <Text style={styles.title}>{title}</Text>
                                <Text style={styles.price}>${price.toFixed(2)}</Text>
                            </View>
                            <View style={styles.actions}>
                                {children}
                            </View>
                        </View>
                    </Touchable>
                </View>
            </Card>
    );
};

// Styles
const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10,
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '17%',
        padding: 10
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 2
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20
    }
});

export default Product;
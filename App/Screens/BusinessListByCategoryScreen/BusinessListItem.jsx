import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import Entypo from '@expo/vector-icons/Entypo';

export default function BusinessListItem({ business }) {
    return (
        <View style={styles.container}>
            <Image source={{ uri: business?.images[0]?.url }}
                style={styles.image} />
            <View style={styles.subContainer}>
                <Text style={{ fontFamily: 'outfit', color: Colors.GRAY, fontSize: 15 }}>{business.contactPerson}</Text>
                <Text style={{ fontFamily: 'outfit-medium', fontSize: 18 }}>{business.name}</Text>
                <Text style={{ fontFamily: 'outfit', color: Colors.GRAY, fontSize: 13 }}>
                    <Entypo name="location-pin" size={24} color={Colors.PRIMARY} style={{ marginRight: 10 }} />
                    {business.address}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10

    },
    subContainer: {
        display: 'flex',
        gap: 8,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 15,
    }
})
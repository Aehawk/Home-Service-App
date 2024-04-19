import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalApi'
import Heading from '../../Components/Heading';

export default function Slider() {

    const [slider, setSlider] = useState([]);
    useEffect(() => {
        getSliders();
    }, [])

    // Get Slider List
    const getSliders = () => {
        GlobalApi.getSlider().then(resp => {
            setSlider(resp?.sliders)
        })
    }
    return (
        <View>
            <Heading text={'Offes For You'}/>
            <FlatList
                data={slider}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View style={{ marginRight: 20 }}>
                        <Image source={{uri:item?.image?.url }}
                            style={styles.sliderImage}
                        />
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    sliderImage: {
        width: 270,
        height: 120,
        borderRadius: 20,
        objectFit: 'contain'
    }
})
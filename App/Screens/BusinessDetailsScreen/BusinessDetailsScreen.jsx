import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Linking, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import BusinessPhotos from './BusinessPhotos';
import BookingModel from './BookingModel';

export default function BusinessDetailsScreen() {
  const route = useRoute();
  const param = route.params;
  const [business, setBusiness] = useState(param?.business);
  const [isReadMore, setIsReadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
  }, [])

  const onMessageBtnClick = () => {
    Linking.openURL('mailto:' + business?.email + "?subject=I am looking for your Service&body=Hi There,")
  }

  return business && (
    <View>
      <FlatList
        data={business.photos}
        ListHeaderComponent={
          <View>
            <TouchableOpacity style={styles.backBtnContainer} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-outline" size={30} color="white" />
            </TouchableOpacity>
            {business.images && business.images.length > 0 && (
              <Image source={{ uri: business.images[0].url }} style={{ width: '100%', height: 300 }} />
            )}
            <View style={styles.infoContainer}>
              <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>
                {business.name}
              </Text>
              <View style={styles.subContainer}>
                <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, color: Colors.PRIMARY }}>
                  {business.contactPerson}
                </Text>
                {business.category && (
                  <Text style={{ color: Colors.PRIMARY, backgroundColor: Colors.PRIMARY_LIGHT, padding: 5, borderRadius: 5, fontSize: 15 }}>
                    {business.category.name}
                  </Text>
                )}
              </View>
              <Text style={{ fontFamily: 'outfit', fontSize: 17, color: Colors.GRAY }}>
                <Entypo name="location-pin" size={25} color={Colors.PRIMARY} style={{ marginRight: 10 }} />
                {business.address}
              </Text>

              {/* Horizontal Line */}
              <View style={{ borderWidth: 0.4, borderColor: Colors.GRAY, marginTop: 20, marginBottom: 20 }}></View>

              {/* About Me Section */}
              <View>
                <Heading text={'About Me'} />
                <Text style={{ fontFamily: 'outfit', lineHeight: 28, color: Colors.GRAY, fontSize: 16 }} numberOfLines={isReadMore ? 20 : 6}>
                  {business.about}
                </Text>
                <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
                  <Text style={{ color: Colors.PRIMARY, fontSize: 16 }}>{isReadMore ? 'Read Less' : 'Read More'}</Text>
                </TouchableOpacity>
              </View>

              {/* Horizontal Line */}
              <View style={{ borderWidth: 0.4, borderColor: Colors.GRAY, marginTop: 20, marginBottom: 20 }}></View>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <Image source={{ uri: item.url }} style={{ width: '100%', height: 200 }} />
        )}

        keyExtractor={(item, index) => index.toString()}

        ListFooterComponent={
          <View style={{ display: 'flex', flexDirection: 'row', margin: 6, gap: 8 }}>
            <TouchableOpacity style={styles.messageBtn} onPress={() => onMessageBtnClick()}>
              <Text style={{ textAlign: 'center', fontFamily: 'outfit-medium', color: Colors.PRIMARY, fontSize: 18 }}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bookingBtn} onPress={() => setShowModal(true)}>
              <Text style={{ textAlign: 'center', fontFamily: 'outfit-medium', color: Colors.WHITE, fontSize: 18 }}>Book Now</Text>
            </TouchableOpacity>
          </View>
        }

      />

      {/* Booking Screen Model */}
      <Modal
        animationType='slide'
        visible={showModal}
      >
        <BookingModel
          businessId={business.id}
          hideModal={() => setShowModal(false)} />
      </Modal>
      
    </View>
  )
}

const styles = StyleSheet.create({
  backBtnContainer: {
    position: 'absolute',
    zIndex: 10,
    padding: 20,
  },
  infoContainer: {
    padding: 20,
    display: "flex",
    gap: 7,
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
  },
  messageBtn: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    textAlign: 'center',
    flex: 1,
  },
  bookingBtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    textAlign: 'center',
    flex: 1,
  }
})
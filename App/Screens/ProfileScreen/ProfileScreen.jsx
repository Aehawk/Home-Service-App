import { View, Text, Image, FlatList, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { SignedOut, useAuth, useUser } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors';

export default function ProfileScreen() {

  const { isLoaded, signOut } = useAuth();
  const { user } = useUser();

  const profileMenu = [
    {
      id: 1,
      name: 'Contact Us',
      icon: 'mail'
    },
    {
      id: 2,
      name: 'Logout',
      icon: 'log-out',
    }
  ]
  const onContactUsBtnClick = () => {
    Linking.openURL('mailto:test@gmail.com' + "?subject=I have a question&body=Hi There,")
  }

  const logOut = async () => {
    if (isLoaded) {
      try {
        await signOut();
      } catch (err) {
        console.error('Logout error', err);
      }
    }
  }

  return (
    <View>
      <View style={{ padding: 20, paddingTop: 20, backgroundColor: Colors.PRIMARY }}>
        <Text style={{ fontSize: 30, fontFamily: 'outfit-bold', color: Colors.WHITE }}>Profile</Text>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Image source={{ uri: user.imageUrl }} style={{ width: 90, height: 90, borderRadius: 99 }} />
          <Text style={{ marginTop: 8, fontSize: 26, fontFamily: 'outfit-medium', color: Colors.WHITE }}>{user.fullName}</Text>
          <Text style={{ marginTop: 8, fontSize: 18, fontFamily: 'outfit-medium', color: Colors.WHITE }}>{user.primaryEmailAddress.emailAddress}</Text>
        </View>
      </View>
      <View style={{ paddingTop: 60 }}>
        <FlatList
          data={profileMenu}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 40, paddingHorizontal: 80 }}
              onPress={() => {
                if (item.id === 1) { onContactUsBtnClick() }
                if (item.id === 2) { logOut() }
              }}
            >
              <Ionicons name={item.icon} size={44} color={Colors.PRIMARY} />
              <Text style={{ fontFamily: 'outfit', fontSize: 20 }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}
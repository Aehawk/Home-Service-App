import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import CalendarPicker from "react-native-calendar-picker";
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import moment from 'moment';

export default function BookingModel({ businessId, hideModal }) {

    const [timeList, setTimeList] = useState();
    const [selectedTime, setSelectedTime] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [note, setNote] = useState();
    const { user } = useUser();
    useEffect(() => {
        getTime();
    }, [])

    const getTime = () => {
        const _timeList = [];
        for (let i = 8; i < 12; i++) {
            _timeList.push({
                time: i + ':00 AM'
            })
            _timeList.push({
                time: i + ':30 AM'
            })
        }
        for (let i = 1; i < 7; i++) {
            _timeList.push({
                time: i + ':00 PM'
            })
            _timeList.push({
                time: i + ':30 PM'
            })
        }
        setTimeList(_timeList);
    }

    // Create Booking Method
    const createNewBooking = () => {
        if (!selectedTime || !selectedDate) {
            ToastAndroid.show('Please select Date and Time', ToastAndroid.LONG);
            return;
        }
        const data = {
            userName: user?.fullName,
            userEmail: user?.primaryEmailAddress.emailAddress,
            time: selectedTime,
            date: moment(selectedDate).format('DD-MMM-yyyy'),
            businessId: businessId,
        }
        GlobalApi.createBooking(data).then(resp => {
            console.log("Response", resp);
            ToastAndroid.show('Booking Created Successfully', ToastAndroid.LONG);
            hideModal();
        })
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView style={{ padding: 20 }}>
                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 20 }}
                    onPress={() => hideModal()}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                    <Text style={{ fontSize: 25, fontFamily: 'outfit-medium' }}>Booking</Text>
                </TouchableOpacity>

                {/* Calendar Section  */}
                <Heading text={'Select Date'} />
                <View style={styles.calendarContainer}>
                    <CalendarPicker
                        onDateChange={setSelectedDate}
                        width={340}
                        minDate={Date.now()}
                        todayBackgroundColor={Colors.BLACK}
                        todayTextStyle={{ color: Colors.WHITE }}
                        selectedDayColor={Colors.PRIMARY}
                        selectedDayTextColor={Colors.WHITE}
                    />
                </View>

                {/* Time Select Section */}
                <View style={{ marginTop: 20 }}>
                    <Heading text={'Select Time Slot'} />
                    <FlatList
                        data={timeList}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={{ marginRight: 10 }}
                                onPress={() => setSelectedTime(item.time)}>
                                <Text style={[selectedTime == item.time
                                    ? styles.selectedTime
                                    : styles.unselectedTime]}>
                                    {item.time}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {/* Note Section */}
                <View>
                    <Heading text={'Any Suggestion Note'} />
                    <TextInput placeholder='None' numberOfLines={4} multiline={true} style={styles.noteTextArea}
                        onChange={(text) => setNote(text)} />
                </View>

                {/* Confirmation Button */}
                <TouchableOpacity style={{ marginTop: 15 }}
                    onPress={() => createNewBooking()}>
                    <Text style={styles.confirmButton}>
                        Confirm & Book
                    </Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    calendarContainer: {
        backgroundColor: Colors.PRIMARY_LIGHT,
        padding: 20,
        borderRadius: 15,
    },
    selectedTime: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
        paddingHorizontal: 18,
        backgroundColor: Colors.PRIMARY,
        color: Colors.WHITE,
    },
    unselectedTime: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        borderRadius: 99,
        paddingHorizontal: 18,
        color: Colors.PRIMARY,
    },
    noteTextArea: {
        borderWidth: 1,
        borderRadius: 15,
        textAlignVertical: 'top',
        padding: 20,
        fontSize: 16,
        fontFamily: 'outfit',
        borderColor: Colors.PRIMARY,
    },
    confirmButton: {
        textAlign: 'center',
        fontFamily: 'outfit-medium',
        fontSize: 17,
        backgroundColor: Colors.PRIMARY,
        color: Colors.WHITE,
        padding: 13,
        borderRadius: 99,
        elevation: 2,
    },
})
import React, { useState, useEffect } from 'react'
import Timeline from 'react-native-timeline-flatlist'
import { View, StyleSheet, TextInput } from 'react-native'
import { Button, Icon, Overlay, Input } from 'react-native-elements'

const TimelineScreen = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/events')
            .then(res => { return res.json() })
            .then(data => { setEvents(data) })
    }, [])

    // Display the overlay Input
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    // ??? Need to check how to add event to db
    const addEvent = async (event) => {
        const res = await fetch('http://localhost:5000/events', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(event)
        })
        const data = await res.json()
        setEvents([...events, data])
    }

    const [time, onChangeTime] = useState('')
    const [title, onChangeTitle] = useState('')
    const [description, onChangeDescription] = useState('')

    return (
        <View style={styles.container}>
            <Icon name="add" color="blue" size={30} onPress={toggleOverlay} />
            <Overlay isVisible={visible} overlayStyle={styles.overlay} onBackdropPress={toggleOverlay} >
                <Input placeholder='Time'
                    onChangeText={onChangeTime}
                    value={time} />
                <Input placeholder='Title'
                    onChangeText={onChangeTitle}
                    value={title} />
                <Input
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholder="Description"
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                    onChangeText={onChangeDescription}
                    value={description}
                />
                <Button title='Done' />
            </Overlay>
            <Timeline data={events}
                circleSize={20}
                circleColor='rgb(45,156,219)'
                lineColor='rgb(45,156,219)'
                timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
                timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13 }}
                descriptionStyle={{ color: 'gray' }}
                options={{
                    style: {
                        paddingTop: 20,
                        paddingLeft: 20,
                    }
                }}
            >
            </Timeline>
        </View>
    )
}

export default TimelineScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 0.5,
        width: '80%',
        height: '80%',
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    }
});
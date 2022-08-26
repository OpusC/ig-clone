import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Divider } from 'react-native-elements'

export const bottomTabIcons = [
    {
        name: 'Home',
        active: 'https://i.ibb.co/n8hvdTT/home-active.png',
        inactive: 'https://i.ibb.co/Nr0tKZx/home-inactive.png'
    },
    {
        name: 'Search',
        active: 'https://i.ibb.co/vQ3cDKP/search-active.png',
        inactive: 'https://i.ibb.co/9qY2kC0/search-inactive.png'
    },
    {
        name: 'Reels',
        active: 'https://i.ibb.co/c1G7w5Z/reels-activepdn.png',
        inactive: 'https://i.ibb.co/k5Fyg6B/reels-inactive.png'
    },
    {
        name: 'Shop',
        active: 'https://i.ibb.co/k0RQ2hK/shop-activepng.png',
        inactive: 'https://i.ibb.co/m5Jvt0W/shop-inactive.png'
    },
    {
        name: 'Profile',
        active: 'https://i.ibb.co/QHK1Sfq/profile-active.png',
        inactive: 'https://i.ibb.co/b2kthm3/profile-inactive.png'
    }
]

const BottomTabs = ({ icons }) => {
    const [activeTab, setActiveTab] = useState('Home')

    const Icon = ({ icon }) => (
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
            <Image source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }} style={styles.icon} />
        </TouchableOpacity>
    )
    return (
        <View style={styles.wrapper}>
            <Divider width={1} orientation='vertical' />
            <View style={styles.container}>
                {icons.map((icon, index) => (
                    <Icon key={index} icon={icon} />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        width: '100%',
        bottom: '0%',
        zIndex: 999,
        backgroundColor: '#000'
    },
    container: {
        flexDirection: 'row',
        marginRight: 5,
        justifyContent: 'space-around',
        height: 50,
        paddingTop: 10
    },
    icon: {
        width: 30,
        height: 30
    }
})

export default BottomTabs
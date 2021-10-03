import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from "tailwind-react-native-classnames";
import { Icon } from 'react-native-elements'

const data = [
    {
        id: 1,
        icon:"home",
        location: "Home",
        destination: "Vilnius"
    },
    {
        id: 2,
        icon:"briefcase",
        location: "Work",
        destination: "Vilnius, Gedimino pr."
    }
]

const NavFavorites = () => {
    return <FlatList data={data} keyExtractor={(item) => item.id.toString()}
    ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, {height: 0.5}]} />
    )}
        renderItem={({item: { icon, location, destination }}) => (
            <TouchableOpacity style={tw`flex-row items-center p-5`}>
                <Icon
                    style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                    name={icon}
                    type="ionicon"
                    color="white"
                    size={18}
                />
                <View>
                    <Text style={tw`font-semibold text-lg`}>{location}</Text>
                    <Text style={tw`text-gray-500`}>{destination}</Text>
                </View>
            </TouchableOpacity>
        )}
    />
}

export default NavFavorites

const styles = StyleSheet.create({})

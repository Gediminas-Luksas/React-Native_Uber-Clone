import React, {useState} from "react";
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, FlatList, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from 'react-native-elements'
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { selectTravelTimeInformation, selectDestination, setUserInformation } from "../slices/navSlice";

const data = [
  {
    id: "UberX",
    title: "Uber X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "UberXL",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "UberLUX",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const dispatch = useDispatch();
  const userDestination = useSelector(selectDestination);
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const count = parseInt(travelTimeInformation.distance.text) * 1.6;
  const convertCountToKm = count.toFixed(1);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity 
        onPress={() => navigation.navigate("NavigateCard")}
        style={tw`absolute top-3 left-5 p-3 z-50 rounded-full`}>
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a Ride - { convertCountToKm } Km
        </Text>
      </View>

    <FlatList data={data} keyExtractor={item => item.id}
      renderItem={({item: {id, title, multiplier, image}, item}) => (
        <TouchableOpacity onPress={() => setSelected(item)}
          style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && "bg-gray-200"}`}>
          <Image 
            style={{width:100, height:100, resizeMode:'contain'}}
            source={{ uri: image }}
          />
          <View style={tw`-ml-6`}>
            <Text style={tw`text-xl font-semibold`}>{title}</Text>
            <Text>{travelTimeInformation?.duration.text} Travel time</Text>
          </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('en-GB', {
                style: 'currency',
                currency: "EUR"
              }).format(
                (travelTimeInformation?.duration.value * CHARGE_RATE * multiplier / 100)
              )
              }
            </Text>
        </TouchableOpacity>
      )}
    />
    <View style={tw`mt-auto border-t border-gray-200`}>
    <TouchableOpacity 
      disabled={!selected}
      style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}>
      <Text style={tw`text-center text-white text-xl`}>
        Choose { selected?.title }
      </Text>
    </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});

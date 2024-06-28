import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react';
import { useNavigation , useRoute} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const FooterMenu = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <FontAwesome5 name="home" style={styles.iconStyle} color={route.name === "Home" && "brown"} />
        <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddNew')} >
        <FontAwesome5 name="plus-square" style={styles.iconStyle} color={route.name === "AddNew" && "brown"}/>
        <Text>Add New</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Details')} >
        <FontAwesome5 name="list" style={styles.iconStyle} color={route.name === "Details" && "brown"} />
        <Text>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('User')} >
        <FontAwesome5 name="user" style={styles.iconStyle} color={route.name === "User" && "brown"} />
        <Text>User</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      margin: 10,
      justifyContent: "space-between",
    },
    iconStyle: {
      marginBottom: 3,
      alignSelf: "center",
      fontSize: 25,
    },
  });

export default FooterMenu;
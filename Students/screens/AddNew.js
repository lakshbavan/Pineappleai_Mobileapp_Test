import { View, Text, StyleSheet,  TextInput, ScrollView, TouchableOpacity, } from 'react-native'
import React, {useState, useContext} from 'react'
import { PostContext } from "../context/postContext";
import FooterMenu from '../components/Menus/FooterMenu';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";


const AddNew = ({navigation}) => {
  // global state
  const [posts, setPosts] = useContext(PostContext);

  //local state
  const [name, setName ] = useState('');
  const [address, setAddress ] = useState('');
  const [phone, setPhone ] = useState('');
  const [module, setModule ] = useState('');
  const [loading, setLoading ] = useState(false);

  //handle form data student data
  const handlePost = async () => {
    try {
      setLoading(true);
      if (!name) {
        alert("Please add student name ");
      }
      if (!address) {
        alert("Please add student  address");
      }
      if (!phone) {
        alert("Please add student  phone");
      }
      if (!module) {
        alert("Please add student  module");
      }
      const { data } = await axios.post("/post/create-post", {
        name,
        address,
        phone,
        module,
      });
      setLoading(false);
      setPosts([...posts, data?.post]);
      alert(data?.message);
      navigation.navigate("Home");
    } catch (error) {
      alert(error.response.data.message || error.message);
      setLoading(false);
      console.log(error);
    }
  };



  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={{alignItems: 'center',}}>
        <Text style={styles.heading}>Create a Student</Text>
        <TextInput style={styles.inputBox} placeholder='Student Name' placeholderTextColor={"gray"} value={name} onChangeText={(text) => setName(text)} />
        <TextInput style={styles.inputBox} placeholder='Student Address' placeholderTextColor={"gray"} multiline={true} numberOfLines={6} value={address} onChangeText={(text) => setAddress(text)} />
        <TextInput style={styles.inputBox} placeholder='Student Phone No' placeholderTextColor={"gray"} value={phone} onChangeText={(text) => setPhone(text)} />
        <TextInput style={styles.inputBox} placeholder='Student Module' placeholderTextColor={"gray"} value={module} onChangeText={(text) => setModule(text)} />
      </View>
      <View style={{alignItems: 'center',}}>
        <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
          <Text style={styles.postBtnText}>
          <FontAwesome5 name="plus-square" size={20} /> {"  "} Create Student</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
       <View style={{flex: 1, justifyContent: "flex-end"}}>
       <FooterMenu />
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
    marginTop: 40,
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  inputBox: {
    backgroundColor: "#ffffff",
    textAlignVertical: "top",
    paddingTop: 10,
    width: 320,
    marginTop: 30,
    fontSize: 16,
    paddingLeft: 15,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  postBtn: {
    backgroundColor: "black",
    width: 300,
    marginTop: 30,
    height: 40,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  postBtnText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddNew;
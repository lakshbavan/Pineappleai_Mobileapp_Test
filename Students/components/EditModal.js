import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const EditModal = ({ modalVisible, setModalVisible, post }) => {
  const navigation = useNavigation();
  const [name, setName ] = useState('');
  const [address, setAddress ] = useState('');
  const [phone, setPhone ] = useState('');
  const [module, setModule ] = useState('');
  const [loading, setLoading] = useState(false);

  //handle update post
  const updatePostHandler = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/post/update-post/${id}`, {
        name,
        address,
        phone,
        module,
      });
      setLoading(false);
      alert(data?.message);
      navigation.push("Details");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(erorr);
    }
  };

  //inital post data\
  useEffect(() => {
    setName(post?.name);
    setAddress(post?.address);
    setPhone(post?.phone);
    setModule(post?.module);
  }, [post]);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text>{JSON.stringify(post, null, 4)}</Text> */}
            <Text style={styles.modalText}>Update Your Details</Text>
            <Text>Name</Text>
            <TextInput
              style={styles.inputBox}
              value={name}
              onChangeText={(text) => {
                setName(text);
              }}
            />
            <Text>Address</Text>
            <TextInput
              style={styles.inputBox}
              multiline={true}
              numberOfLines={4}
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
            <Text>Phone</Text>
            <TextInput
              style={styles.inputBox}
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
              }}
            />
            <Text>Module</Text>
            <TextInput
              style={styles.inputBox}
              value={module}
              onChangeText={(text) => {
                setModule(text);
              }}
            />
            <View style={styles.btnContainer}>
              <Pressable
                style={styles.button}
                onPress={() => {
                  updatePostHandler(post && post._id),
                    setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>
                  {loading ? "Please Wait" : "UPDATE"}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputBox: {
    marginBottom: 20,
    paddingTop: 10,
    textAlignVertical: "top",
    backgroundColor: "lightgray",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
  },
  btnContainer: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "black",
    elevation: 2,
    width: 100,
    margin: 10,
  },
  buttonOpen: {
    // backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default EditModal;
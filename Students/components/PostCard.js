import { View, Text, StyleSheet, Alert  } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment/moment';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import EditModal from './EditModal';
//import EditModal from "./EditModal";

const PostCard = ({posts,myPostScreen}) => {
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState({});
  const navigation = useNavigation();

  //handle delete prompt
  const handleDeletePropmt = (id) => {
    Alert.alert("Attention!", "Are You Sure Want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("cancel press");
        },
      },
      {
        text: "Delete",
        onPress: () => handleDeletePost(id),
      },
    ]);
  };

   //delete post data
   const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/post/delete-post/${id}`);
      setLoading(false);
      alert(data?.message);
      navigation.push("Details");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };


  return (
    <View>
      <Text style={styles.heading}>Total Students {posts?.length}</Text>
      {myPostScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post={post}
        />
      )}
      {posts?.map( (post,i) => (
        <View style={styles.card} key={i}>
          {myPostScreen && (
            <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
              <Text style={{ marginHorizontal: 20 }}>
                <FontAwesome5
                  name="pen"
                  size={16}
                  color={"darkblue"}
                  onPress={() => {
                    setPost(post), setModalVisible(true);
                  }}
                />
              </Text>
            <Text>
            <FontAwesome5 name="trash" size={16} color={"red"} onPress={() => handleDeletePropmt(post?._id)} />
            </Text>
          </View>
          )}
            <Text style={styles.title}>Name : {post?.name}</Text>
            <Text style={styles.title}>Address : {post?.address}</Text>
            <Text style={styles.title}>Phone no : {post?.phone}</Text>
            <Text style={styles.title}>Module : {post?.module}</Text>
            <View style={styles.footer}>
              {post?.postedBy?.name && (
                  <Text style={styles.title} >{" "}<FontAwesome5 name="user" color={"brown"} /> {" "} {post?.postedBy?.name}</Text>
              )}
                <Text style={styles.title}>{" "}<FontAwesome5 name="clock" color={"brown"} /> {" "} {moment(post?.createdAt).format('DD:MM:YYYY')}</Text>
            </View>
        </View>
      ))}
    </View>
  )
};

const styles = StyleSheet.create({
    heading: {
      color: "green",
      textAlign: "center",
    },
    card: {
      width: "97%",
      backgroundColor: "#ffffff",
      borderWidth: 0.2,
      borderColor: "gray",
      padding: 20,
      borderRadius: 5,
      marginVertical: 10,
    },
    title: {
      fontWeight: "bold",
      paddingBottom: 10,
      borderBottomWidth: 0.2,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    desc: {
      marginTop: 10,
    },
  });
  

export default PostCard;
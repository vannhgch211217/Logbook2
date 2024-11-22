import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "@/app/(tabs)/index";
import { useState } from "react";

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderBlockColor: "black",
    paddingVertical: 5,
    borderRadius: 5,
  },
  text: {
    fontWeight: 400,
    fontSize: 20,
    marginVertical: 10,
    color: "black"
  }
});

const DetailScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, "Edit"> = useRoute();
  const [title, setTitle] = useState(route.params?.title || "");

  const handleUpdate = () => {
    if (!title) {
      Alert.alert("Empty", "Please enter a title");
      return;
    }

    const updatedTodo = { id: route.params.id, title };

    navigation.navigate("Home", { updatedTodo });
  };

  return (
    <ThemedView style={{ padding: 30, flex:1, backgroundColor: "#E5E5E5" }}>
      <ThemedText style={styles.text}>Title</ThemedText>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} />
      <Button title="Update" onPress={handleUpdate} />
    </ThemedView>
  );
};

export default DetailScreen;

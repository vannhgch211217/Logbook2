import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "@/app/(tabs)/index";
import CreateModal from "./create.modal";
import { FontAwesome } from "@expo/vector-icons";

interface ITodo {
  id: number;
  title: string;
}

const HomeScreen = (props: any) => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "Home">>();
  const [todos, setTodos] = useState<ITodo[]>([{ id: 1, title: "Do housework" }]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (route.params?.updatedTodo) {
      updateTodo(route.params.updatedTodo);
    }
  }, [route.params]);

  const addNew = (item: ITodo) => {
    const newId = todos.length ? todos[todos.length - 1].id + 1 : 1;
    setTodos([...todos, { ...item, id: newId }]);
  };

  const deleteTodo = (deleteId: number) => {
    const newTodo = todos.filter((item) => item.id !== deleteId);
    setTodos(newTodo);
  };

  const updateTodo = (updatedTodo: ITodo) => {
    const newTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    setTodos(newTodos);
  };

  return (
    <ThemedView style={styles.container}>
      <Button title="Add" onPress={() => setModalVisible(true)} />
      <ThemedView style={styles.container}>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <ThemedView style={styles.reviewItem}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Edit", item)}
                  style={{ flex: 1 }}
                >
                  <ThemedText style={{ color: "black" }}>{item.title}</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                  <FontAwesome name="trash" size={24} color="black" />
                </TouchableOpacity>
              </ThemedView>
            );
          }}
        />
      </ThemedView>
      <CreateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        addNew={addNew}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E5E5E5",
    flex: 1,
  },
  reviewItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    margin: 15,
    backgroundColor: "white",
    borderRadius: 100,
  },
});

export default HomeScreen;

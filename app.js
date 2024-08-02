import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import Crud from './src/Screens/crud/crud';
// import Home from './src/Screens/Home';
// import Counter from './src/Screens/CounterRedux/counter';
// import UserList from './src/Screens/UserList/userList';
// import TodoList from './src/Screens/TodoListApp/todoList';
// import Splash from './src/Splash';
// import NewTodoList from './src/Screens/NewTodoList/newTodoList';
// import ApiRequest from './src/ApiRequest/ApiRequest';
// import ProfileScreen from './src/Screens/ProfileScreen';
// import RadioButton from './src/RadioButtons';
import AppNavigator from './src/AppNavigator';


const App = () => {
  return (
    <AppNavigator />
  )
}

export default App;

const styles = StyleSheet.create({});

// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react'
// import NavigationScreen from './src/NavigationScreen';
// const App = () => {
//   return (
//     <NavigationScreen />
//   )
// }

// export default App;

// const styles = StyleSheet.create({})

// import React, { useState } from 'react';
// import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// const App = () => {
//   const [todos, setTodos] = useState([
//     { id: 1, text: 'Learn React Native', completed: false },
//     { id: 2, text: 'Write an article', completed: false },
//     { id: 3, text: 'Go for a walk', completed: false },
//   ]);

//   const toggleTodo = (id) => {
//     setTodos(todos.map(todo => 
//       todo.id === id ? { ...todo, completed: !todo.completed } : todo
//     ));
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.todoItem}>
//       <TouchableOpacity onPress={() => toggleTodo(item.id)}>
//         <View style={[styles.checkbox, item.completed && styles.completedCheckbox]}>
//           {item.completed && <Text style={styles.checkmark}>✔</Text>}
//         </View>
//       </TouchableOpacity>
//       <Text style={[styles.todoText, item.completed && styles.completedText]}>{item.text}</Text>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={todos}
//         renderItem={renderItem}
//         keyExtractor={item => item.id.toString()}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   todoItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   checkbox: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#555',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   completedCheckbox: {
//     backgroundColor: '#555',
//   },
//   checkmark: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   todoText: {
//     fontSize: 18,
//   },
//   completedText: {
//     textDecorationLine: 'line-through',
//     color: '#555',
//   },
// });

// export default App;


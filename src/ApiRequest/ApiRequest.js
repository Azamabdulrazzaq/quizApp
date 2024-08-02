// import { Button, StyleSheet, Text, View } from 'react-native'
// import React, { useEffect } from 'react'
// import axios from 'axios';
// const ApiRequest = () => {

//     // const getApiData1 = async () => {
//     //     const res = await axios.get('https://fakestoreapi.com/products/categories');
//     //     console.log(res.data);
//     // }

//     // // for fetch all categeries api...!

//     useEffect(() => {
//         // getApiData();
//         addNewProduct();
//     }, []);

//     // const getApiData = () => {
//     //     axios.get('https://fakestoreapi.com/products/categories', {
//     //         Headers: {
//     //             Authorization: "",
//     //             'Content-Type': 'application/json'
//     //         }
//     //     })
//     //         .then(res => {
//     //             console.log(res.data);

//     //         })
//     // }

//     const addNewProduct = async () => {
//         const data = {
//             title: 'test product',
//             price: 13.5,
//             description: 'lorem ipsum set',
//             image: 'https://i.pravatar.cc',
//             category: 'electronic'
//         }
//         const res = await axios.post("https://fakestoreapi.com/products/categories", data)
//         console.log(res.data);
//     }
//     return (
//         <View>
//             <Text style={{ fontSize: 40, textAlign: "center" }}>ApiRequest</Text>
//             <Button onPress={() => {
//                 getApiData()
//             }}></Button>
//         </View>
//     )
// }

// export default ApiRequest;

// const styles = StyleSheet.create({});
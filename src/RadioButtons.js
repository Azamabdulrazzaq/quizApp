import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const RadioButton = ({ label, value, status, onPress }) => (
    <View style={styles.mainContainer}>
        <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
            <View style={[styles.radioButton, status && styles.radioButtonSelected]}>
                {status && <View style={styles.radioButtonInner} />}
            </View>
            <Text style={styles.radioButtonLabel}>{label}</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FC2569',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    radioButtonSelected: {
        borderColor: '#FC2569',
        backgroundColor: '#FC2569',
        display: "flex",
        flexDirection: "row",
    },
    radioButtonInner: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    radioButtonLabel: {
        fontSize: 18,
        color: '#fff',
    },
});

export default RadioButton;

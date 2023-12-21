import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import { View } from 'react-native';

const Timex = ({ time}) => {
   

    return (
        <View style={styles.container}>
          
            <Text style={styles.time}>{`${Math.floor(time/60).toString().padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}` }</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
       
        flex : 0.3,
        justifyContent: 'center',
        backgroundColor : '#f2f2f2',
        padding: 15,
        borderRadius: 15,
      
    },
    time :{
        fontSize: 80,
        fontWeight: 'bold',
        textAlign: 'center',
       
    }
   
});
export default Timex;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';

const options = ["Pomodoro", "Short Break", "Long Break"];

const Header = ({  setTime, timeType, setTimeType}) => {
    return (
        <View style={styles.container}>
            {options.map((option, index) => (
                <TouchableOpacity key={index} onPress={() => {
                    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;
                    setTimeType(index); // set to option instead of newTime
                    setTime(newTime * 60);
                }} style={[styles.items , timeType !== index && {borderColor: "transparent"}, ] }>
                    <Text style={styles.title}>
                        {option}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    
      
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
textAlign: 'center',
      
        
    },
    items : {
        flex: 1,
        borderWidth: 3,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        marginVertical: 20,
        padding : 5,
    }
});

export default Header;
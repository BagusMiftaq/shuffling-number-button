import {StatusBar} from 'expo-status-bar';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import reloadInstructions from "react-native/Libraries/NewAppScreen/components/ReloadInstructions";
import React, {useEffect, useMemo, useState} from "react";

export default function App() {
    const [val, setVal] = useState("");
    const [seen, isSeen] = useState("");
    const [pw, setPw] = useState(true);
    const [reset, setReset] = useState(false);

    const [number, setNumber] = useState(()=>{
        return [
            {value: "7"},
            {value: "8"},
            {value: "9"},
            {value: "4"},
            {value: "5"},
            {value: "6"},
            {value: "1"},
            {value: "2"},
            {value: "3"},
            {value: "0"},
        ].sort(() => Math.random() - 0.5);
    })
    const clear = () => {
        setVal("");
        isSeen("");
        setReset(!reset);
        setPw(false);
        shuffle(number)
    }

    const look = () => {
        setPw(!pw)
    }

    const MASKING = [
        {mask: "*"},
        {mask: "*"},
        {mask: "*"},
        {mask: "*"},
        {mask: "*"},
        {mask: "*"},
    ]

    const getDigit = (digit) => {
        if (val.length < 12) {
            setVal(val + "* ");
            isSeen(seen + digit + " ");
        }
    }

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }


    return (
        <View style={styles.container}>
            <View style={styles.display}>
                {pw ? <Text style={styles.maskingText}>{val}</Text> : <Text style={styles.maskingText}>{seen}</Text>}
            </View>
            <View style={styles.reset}>
                <Pressable style={styles.seentbtn} android_ripple={{color: 'grey', radius: 200}}>
                    <Text style={styles.t2} onPress={look}>SEEN</Text>
                </Pressable>
            </View>
            <View style={styles.reset}>
                <Pressable style={styles.resetbtn} android_ripple={{color: 'grey', radius: 200}}>
                    <Text style={styles.t2} onPress={clear}>RESET</Text>
                </Pressable>
            </View>
            <View style={styles.buttonWrap}>
                {number.map((item, index) => (
                    <Pressable key={index} style={styles.button} android_ripple={{color: 'grey'}}
                               onPress={() => getDigit(item.value)}>
                        <Text>{item.value}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 400,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    display: {
        flex: 3,
        width: 400,
        backgroundColor: 'lightgrey',
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    reset: {
        flex: 1,
    },
    resetbtn: {
        flex: 1,
        backgroundColor: 'red',
        width: 400,
        justifyContent: 'center',
        alignItems: "center",
    },
    seentbtn: {
        flex: 1,
        backgroundColor: 'green',
        width: 400,
        justifyContent: 'center',
        alignItems: "center",
    },
    buttonWrap: {
        flex: 5,
        width: 400,
        backgroundColor: 'white',
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    maskingText: {
        fontSize: 40,
        margin: 10,
        fontWeight: 'bold',
    },
    button: {
        width: 133,
        height: 110,
        borderWidth: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },
    t2: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold'
    },
});

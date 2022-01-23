import React, {
    useState
} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    TextInput
} from 'react-native'

export default function TaskAddScreen(props){

    const [taskDescription, setTaskDescription] = useState('');

    const [taskTitle, setTaskTitle] = useState('');

    return (
        <View style={styles.contianer}>
            <View style={{...styles.textInputContainer, marginTop: 5}}>
                <TextInput 
                    placeholder="Enter task title"
                    value={taskTitle}
                    onChangeText={text => setTaskTitle(text)}
                />
            </View>
            <View style={styles.textInputContainer}>
                <TextInput 
                    placeholder="Enter your new task"
                    value={taskDescription}
                    onChangeText={text => setTaskDescription(text)}
                />
            </View>
            <TouchableOpacity 
                style={styles.buttonStyle}
                onPress={_ => {
                    props.route.params.addTasksCallback(taskTitle, taskDescription)
                    props.navigation.pop()
                }}
            >
                <Text>Add</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    contianer: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    textInputContainer: {
        height: 50,
        width: '100%',
        fontSize: 20,
        backgroundColor: '#C8C8C8',
        borderRadius: 20,
        justifyContent: 'center',
        paddingLeft: 10,
        marginTop: 30
    },
    buttonStyle: {
        width: '50%',
        height: 50,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 20,

    }
});
import React, {
    useState
} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native'
import CheckBox from '@react-native-community/checkbox';

export default function TaskListScreen(props){

    const [tasks, setTasks] = useState([
        {id: 0, activity: "Wake up", completed: false},
        {id: 1, activity: "Pray", completed: false},
        {id: 2, activity: "Excercise", completed: false},
        {id: 3, activity: "Breakfast", completed: false},
        {id: 4, activity: "Assignment", completed: false},
    ]);

    const pushTask = (title, taskDiscription) => {
        const allTasks = tasks;
        setTasks([...allTasks, {
            id: tasks.length,
            title,
            activity: taskDiscription,
            completed: false
        }]);
    }

    const deleteTask = id => {
        const updatedTasksList = tasks.filter(task => task.id !== id);
        setTasks([...updatedTasksList]);
    }

    return (
        <View style={styles.contianer}>
            { tasks.length > 0 ? <FlatList 
                data={tasks}
                renderItem={({item, index}) => {
                    return (
                        
                        <View style={styles.taskItemContainer}>
                            <View>
                                <Text style={styles.taskDiscriptionStyle}>{item.activity}</Text>
                            </View>
                            <View
                                style={styles.secondaryContainer}
                            >
                                <View>
                                    <CheckBox
                                        disabled={false}
                                        value={item.completed}
                                        onValueChange={newValue => {
                                            const allTasks = tasks;
                                            allTasks[index].completed = newValue
                                            setTasks([...allTasks]);
                                        }}
                                        tintColor="black"
                                        onTintColor="white"
                                        onCheckColor="white"
                                    />
                                </View>
                                <TouchableOpacity 
                                    style={styles.binView}
                                    onPress={_ => {
                                        deleteTask(item.id)
                                    }}
                                >
                                    <Image 
                                        source={require('../../assets/bin.png')}
                                        style={{
                                            width: 30,
                                            height: 30
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}
                showsVerticalScrollIndicator={false}
            /> : <View style={styles.noTaskTextContainer}>
                    <Text style={styles.noTaskTextStyle}>You are all done!</Text>
                </View>}
            <View style={styles.addIconContainer}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={_ => props.navigation.navigate('Add Task', {
                        addTasksCallback: (title, taskDesc) => {
                            pushTask(title, taskDesc)
                        }
                    })}
                >
                    <Image 
                        source={require('../../assets/add.png')}
                        style={styles.addIconStyle}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contianer: {
        flex: 1,
        paddingHorizontal: 20
    },
    headingTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },  
    taskItemContainer: {
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: 'orange',
        marginVertical: 10,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    taskDiscriptionStyle: {
        fontSize: 20
    },
    addIconContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    headingTextStyle: {
        fontSize: 30,
    },
    buttonStyle: {
        borderRadius: 50,
        width: 60,
        height: 60,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    plusIcon: {
        fontSize: 30,
        color: 'white'
    },
    taskItemParentContainer: {
        flexDirection: 'row',
        width: '80%'
    },
    binImageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    noTaskTextContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    noTaskTextStyle: {
        fontSize: 30
    },
    addIconStyle: {
        width: 40,
        height: 40
    },
    secondaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    binView: {
        marginLeft: 20
    }
});
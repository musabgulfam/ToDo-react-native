import React, {
    useState,
    useEffect
} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    TextInput
} from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function TaskListScreen(props) {

    const [tasks, setTasks] = useState([
        // {id: 0, activity: "Wake up", completed: false},
        // {id: 1, activity: "Pray", completed: false},
        // {id: 2, activity: "Excercise", completed: false},
        // {id: 3, activity: "Breakfast", completed: false},
        // {id: 4, activity: "Assignment", completed: false},
    ]);

    useEffect(_ => {
        getTasksFromLS();
    }, []);

    const getTasksFromLS = async _ => {
        try {
            const jsonValue = await AsyncStorage.getItem('tasks');
            console.log('Array: ', jsonValue);
            jsonValue != null ? setTasks(JSON.parse(jsonValue)) : null
        } catch (e) {
            // read error
        }
    }

    const pushTask = async (title, taskDiscription) => {
        const allTasks = tasks;
        setTasks([...allTasks, {
            id: tasks.length,
            title,
            activity: taskDiscription,
            completed: false
        }]);

        try {
            const jsonValue = JSON.stringify([...allTasks, {
                id: tasks.length,
                title,
                activity: taskDiscription,
                completed: false
            }])
            await AsyncStorage.setItem('tasks', jsonValue)
        } catch (e) {
            // save error
            console.error(e);
        }
        console.log('Done.')
    }

    const deleteTask = async id => {
        const updatedTasksList = tasks.filter(task => task.id !== id);
        setTasks([...updatedTasksList]);
        try {
            const jsonValue = JSON.stringify(updatedTasksList)
            await AsyncStorage.setItem('tasks', jsonValue)
        } catch (e) {
            // save error
            console.error(e);
        }
        console.log('Done.')
    }

    const [searchText, setSearchText] = useState('');

    return (
        <View style={styles.contianer}>
            <View style={{
                marginVertical: 20,
                backgroundColor: '#C8C8C8',
                height: 50,
                justifyContent: 'center',
                borderRadius: 20,
                paddingLeft: 20
            }}>
                <TextInput
                    value={searchText}
                    onChangeText={text => setSearchText(text)}
                />
            </View>
            {
                searchText.length > 0 ? tasks.filter(task => {
                    return task.title === searchText
                }).map((item, index) => {
                    return (
                        <View style={styles.taskItemContainer}>
                            <View>
                                <Text style={styles.itemTitleStyle}>{item.title}</Text>
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
                }) :
                    tasks.length > 0 ? <FlatList
                        data={tasks}
                        renderItem={({ item, index }) => {
                            return (

                                <View style={styles.taskItemContainer}>
                                    <View>
                                        <Text style={styles.itemTitleStyle}>{item.title}</Text>
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
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    binView: {
        marginLeft: 20
    },
    itemTitleStyle: {
        fontSize: 30
    }
});
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';

const initialState = function () {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    var groups = JSON.parse(localStorage.getItem('groups')) || {};
    return {
        tasks: tasks,
        groups: groups,
    };
}();

const dataSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {
        createTask: (state, action) => {
            const id = uuid();
            const task = {
                uuid: id,
                title: action.payload.title,
                description: action.payload.description,
                done: false,
                group: action.payload.group,
            };
            if (action.payload.group) {
                state.groups[action.payload.group].tasks.push(id);
            }
            state.tasks[id] = task;
            // localStorage.setItem('tasks', JSON.stringify(state.tasks));
            // localStorage.setItem('groups', JSON.stringify(state.groups));
        },
        updateTaskTitle: (state, action) => {
            state.tasks[action.payload.id].title = action.payload.title;
        },
        updateTaskDescription: (state, action) => {
            state.tasks[action.payload.id].description = action.payload.description;
        },
        toggleDone: (state, action) => {   
            const group = state.tasks[action.payload].group;
            state.tasks[action.payload].done = !state.tasks[action.payload].done;
            if (group) {
                if (state.tasks[action.payload].done) {
                    state.groups[group].tasksDone += 1;
                } else {
                    state.groups[group].tasksDone -= 1;
                }
            }
        },
        deleteTask: (state, action) => {
            const taskId = action.payload;
            const groupId = state.tasks[taskId].group;
            if (groupId) {
                const index = state.groups[groupId].tasks.indexOf(taskId);
                state.groups[groupId].tasks.splice(index, 1);
            }
            delete state.tasks[taskId];
        },
        createGroup: (state, action) => {
            const id = uuid();
            const group = {
                uuid: id,
                name: action.payload.name,
                tasks: action.payload.tasks,
                tasksDone: action.payload.tasksDone,
            };
            for (let taskId of action.payload.tasks) {
                state.tasks[taskId].group = id;
            }
            state.groups[id] = group;
        },
        updateGroupName: (state, action) => {
            state.groups[action.payload.id].name = action.payload.name;
        },
    },
});

export const {
    createTask,
    updateTaskTitle,
    updateTaskDescription,
    toggleDone,
    deleteTask,
    createGroup,
    updateGroupName
} = dataSlice.actions;

export default dataSlice.reducer;
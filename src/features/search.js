import { createSlice } from "@reduxjs/toolkit";
import { createTask } from "./data";
import { cloneDeep } from "lodash";

const initialState = function() {
    var groups = localStorage.getItem('groups');
    var tasks = localStorage.getItem('tasks');
    groups = JSON.parse(groups);
    tasks = JSON.parse(tasks);
    if (!tasks) tasks={};
    if (!groups) groups={};
    return {
        query: '',
        groups: groups,
        tasks: tasks,
    };
};

const searchSlice = createSlice({
    name: 'search',
    initialState: initialState(),
    reducers: {
        updateSearch: (state, action) => {
            var initialStateInstance = initialState();
            var searchedGroups = {};
            var searchedTasks = {};
            for (let id in initialStateInstance.groups) {
                if (
                    initialStateInstance.groups[id].name.toLowerCase().includes(action.payload.toLowerCase())
                ) {
                    searchedGroups[id] = initialStateInstance.groups[id];
                }
            }
            for (let id in initialStateInstance.tasks) {
                if (
                    initialStateInstance.tasks[id].title.toLowerCase().includes(action.payload.toLowerCase()) ||
                    initialStateInstance.tasks[id].description.toLowerCase().includes(action.payload.toLowerCase())
                ) {
                    searchedTasks[id] = initialStateInstance.tasks[id];
                }
            }
            state = {
                query: action.payload,
                groups: searchedGroups,
                tasks: searchedTasks,
            };
            console.log(state);
            return state;
        },
        clearSearch: (state, action) => initialState()
    },
    extraReducers: {
        [createTask]: (state, action) => {
            state = initialState();
            console.log(state);
            return state;
        }
    }
});

export const { updateSearch, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
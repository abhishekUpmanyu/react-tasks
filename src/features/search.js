import { createSlice } from "@reduxjs/toolkit";

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
}();

const searchSlice = createSlice({
    name: 'search',
    initialState: {value: initialState},
    reducers: {
        updateSearch: (state, action) => {
            var searchedGroups = {};
            var searchedTasks = {};
            console.log(initialState);
            for (let id in initialState.groups) {
                if (
                    initialState.groups[id].name.toLowerCase().includes(action.payload.toLowerCase())
                ) {
                    searchedGroups[id] = initialState.groups[id];
                }
            }
            for (let id in initialState.tasks) {
                if (
                    initialState.tasks[id].title.toLowerCase().includes(action.payload.toLowerCase()) ||
                    initialState.tasks[id].description.toLowerCase().includes(action.payload.toLowerCase())
                ) {
                    searchedTasks[id] = initialState.tasks[id];
                }
            }
            state.value = {
                query: action.payload,
                groups: searchedGroups,
                tasks: searchedTasks,
            };
        },
        clearSearch: (state, action) => {
            state.value = initialState;
        }
    }
});

export const { updateSearch, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
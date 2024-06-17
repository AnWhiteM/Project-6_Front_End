import { createSlice } from "@reduxjs/toolkit";
import { addTask, fetchTasks, updateTask, deleteTask, updateOwner, getTask } from "./operations";

const taskSlice = createSlice({
    name: "tasks",
    initialState: { 
        items: [], 
        loading: false, 
        error: null,
        currentTask: null,
    },

    extraReducers: (builder) => 
        builder
        .addCase(fetchTasks.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.items = action.payload;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(addTask.pending, (state) => {
            state.loading = true;
        })
        .addCase(addTask.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.items.push(action.payload);
            state.currentTask = action.payload;
        })
        .addCase(addTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(getTask.pending, (state) => {
            state.loading = true;
        })
        .addCase(getTask.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.currentTask = action.payload;
        })
        .addCase(getTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateTask.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateTask.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.items = state.items.map(task => 
                task._id === action.payload._id ? action.payload : task
            );
        })
        .addCase(updateTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateOwner.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateOwner.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.items = state.items.map(task => 
                task._id === action.payload._id ? action.payload : task
            );
        })
        .addCase(updateOwner.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteTask.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.items = state.items.filter(
                (task) => task._id !== action.payload._id
            );
            state.currentTask = null
        })
        .addCase(deleteTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
})

export const tasksReducer = taskSlice.reducer;
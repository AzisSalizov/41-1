import {createSlice} from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        activeTask: null,
        isPaused: false,
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push({
                id: Date.now(),
                title: action.payload,
                timeSpent: 0,
                status: "pending",
            });
        },
        setActiveTask: (state, action) => {
            state.activeTask = action.payload;
            state.isPaused = false;
        },
        incrementTimeSpent: (state) => {
            if (state.activeTask) {
                const task = state.tasks.find((task) => task.id === state.activeTask);
                if (task) {
                    task.timeSpent += 1;
                    task.status = "active";
                }
            }
        },
        completeTask: (state) => {
            const task = state.tasks.find((task) => task.id === state.activeTask);
            if (task) {
                task.status = "completed";
            }
            state.activeTask = null;
            state.isPaused = false;
        },
        pauseTask: (state) => {
            state.isPaused = true;
            const task = state.tasks.find((task) => task.id === state.activeTask);
            if (task) {
                task.status = "paused";
            }
        },
        resumeTask: (state) => {
            state.isPaused = false;
        },
        setTaskTitle: (state, action) => {
            const {id, title} = action.payload;
            const task = state.tasks.find((task) => task.id === id);
            if (task) {
                task.title = title;
            }
        },
    },
});

export const {
    addTask,
    setActiveTask,
    incrementTimeSpent,
    completeTask,
    pauseTask,
    resumeTask,
    setTaskTitle,
} = tasksSlice.actions;

export default tasksSlice.reducer;

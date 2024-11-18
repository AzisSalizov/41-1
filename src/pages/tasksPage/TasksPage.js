import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addTask,
    completeTask,
    incrementTimeSpent,
    setActiveTask,
    setTaskTitle,
    pauseTask,
    resumeTask,
} from "../../store/tasksSlice";

const TasksPage = () => {
    const dispatch = useDispatch();
    const {tasks, activeTask, isPaused} = useSelector((state) => state.tasksReducer);
    const [taskTitle, setTaskTitleState] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskTitle, setEditingTaskTitle] = useState("");

    const handleAddTask = () => {
        if (taskTitle.trim() !== "") {
            dispatch(addTask(taskTitle));
            setTaskTitleState("");
        }
    };

    const handleEditTask = (taskId, title) => {
        setEditingTaskId(taskId);
        setEditingTaskTitle(title);
    };

    const handleSaveTask = (taskId) => {
        if (editingTaskTitle.trim() !== "") {
            dispatch(setTaskTitle({id: taskId, title: editingTaskTitle}));
            setEditingTaskId(null);
        }
    };

    useEffect(() => {
        let interval;
        if (activeTask && !isPaused) {
            interval = setInterval(() => {
                dispatch(incrementTimeSpent());
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [activeTask, isPaused, dispatch]);

    const handleStartTask = (taskId) => {
        dispatch(setActiveTask(taskId));
    };

    const handlePauseTask = () => {
        dispatch(pauseTask());
    };

    const handleResumeTask = () => {
        dispatch(resumeTask());
    };

    const handleCompleteTask = () => {
        dispatch(completeTask());
    };

    return (
        <div className="tasksContainer">
            <h1>Task Manager with Timer</h1>
            <div className="task-input">
                <input
                    type="text"
                    placeholder="Enter task name"
                    value={taskTitle}
                    onChange={(e) => setTaskTitleState(e.target.value)}
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>

            <div className="task-list">
                <h2>Task List</h2>
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <div>
                                {editingTaskId === task.id ? (
                                    <input
                                        type="text"
                                        value={editingTaskTitle}
                                        onChange={(e) => setEditingTaskTitle(e.target.value)}
                                    />
                                ) : (
                                    <strong>{task.title}</strong>
                                )}
                                <span> - Time Spent: {task.timeSpent} sec</span>
                            </div>
                            <div className="task-btn">
                                {activeTask === task.id ? (
                                    <>
                                        {isPaused ? (
                                            <button onClick={handleResumeTask}>Start</button>
                                        ) : (
                                            <button onClick={handlePauseTask}>Pause</button>
                                        )}
                                    </>
                                ) : (
                                    <button onClick={() => handleStartTask(task.id)}>Start</button>
                                )}

                                {editingTaskId === task.id ? (
                                    <button onClick={() => handleSaveTask(task.id)}>Save</button>
                                ) : (
                                    <button
                                        onClick={() => handleEditTask(task.id, task.title)}
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {activeTask && (
                <div className="active-task">
                    <h2>Active Task</h2>
                    <div>
                        <p>
                            Task: {tasks.find((task) => task.id === activeTask)?.title}
                        </p>
                        <p>
                            Time: {tasks.find((task) => task.id === activeTask)?.timeSpent}{" "}
                            seconds
                        </p>
                        <button onClick={handleCompleteTask}>Complete Task</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TasksPage;

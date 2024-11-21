import React from "react";
import Counter from "./components/Counter";
import Posts from "./components/Posts";

function App() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Counter & API Example</h1>
            <Counter />
            <Posts />
        </div>
    );
}

export default App;

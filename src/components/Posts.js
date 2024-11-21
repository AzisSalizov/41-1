import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../store/apiSlice";

const Posts = () => {
    const dispatch = useDispatch();
    const { posts, status, error } = useSelector((state) => state.api);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <div>
            <h2>Posts</h2>
            {status === "loading" && <p>Loading...</p>}
            {status === "failed" && <p>Error: {error}</p>}
            {status === "succeeded" && (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <strong>{post.title}</strong>
                            <p>{post.body}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Posts;

import React, { useState, useEffect } from "react";

const Posts = () => {
    const [posts, setPosts] = useState([]);

    // Fetch posts from the backend (replace with actual API)
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("http://localhost:5000/posts"); // Replace with your backend endpoint
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>Your Instagram Posts</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", margin: "20px" }}>
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <div key={index} style={{ border: "1px solid #ccc", padding: "10px" }}>
                            <img
                                src={post.image_url || "https://via.placeholder.com/150"} // Replace `image_url` with your actual field
                                alt={`Post ${index + 1}`}
                                style={{ width: "100%" }}
                            />
                            <p>{post.caption || "No caption"}</p>
                        </div>
                    ))
                ) : (
                    <p>No posts to display</p>
                )}
            </div>
        </div>
    );
};

export default Posts;

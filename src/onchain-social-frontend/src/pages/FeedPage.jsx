import "./FeedPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FeedPage() {
  const [postContent, setPostContent] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [searchQuery, setSearchQuery] = useState("");

  const dummyUsers = [
    {
      id: 1,
      username: "muskan",
      isFollowing: false,
      avatar: "https://i.pravatar.cc/40?img=10",
    },
    {
      id: 2,
      username: "anisha",
      isFollowing: false,
      avatar: "https://i.pravatar.cc/40?img=20",
    },
    {
      id: 3,
      username: "devraj",
      isFollowing: false,
      avatar: "https://i.pravatar.cc/40?img=30",
    },
  ];
  const [users, setUsers] = useState(dummyUsers);

  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "muskan",
      avatar: "https://i.pravatar.cc/40?img=10",
      content: "Just launched my on-chain social app! 🚀 #web3",
      likes: ["you"],
      timestamp: new Date().toISOString(),
      visible: true,
      author: "muskan",
    },
    {
      id: 2,
      username: "anisha",
      avatar: "https://i.pravatar.cc/40?img=20",
      content: "Coffee + code = ❤️",
      likes: [],
      timestamp: new Date().toISOString(),
      visible: true,
      author: "anisha",
    },
  ]);

  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const handlePostUpload = () => {
    if (postContent.trim()) {
      const newPost = {
        id: Date.now(),
        username: "you",
        avatar: "https://i.pravatar.cc/40?img=1",
        content: postContent.trim(),
        likes: [],
        timestamp: new Date().toISOString(),
        visible: visibility === "public",
        author: "you",
      };
      setPosts([newPost, ...posts]);
      setPostContent("");
    }
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const startEdit = (id, currentContent) => {
    setEditingPostId(id);
    setEditContent(currentContent);
  };

  const handleSaveEdit = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, content: editContent } : post
      )
    );
    setEditingPostId(null);
  };

  const handleToggleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const hasLiked = post.likes.includes("you");
          const updatedLikes = hasLiked
            ? post.likes.filter((user) => user !== "you")
            : [...post.likes, "you"];
          return { ...post, likes: updatedLikes };
        }
        return post;
      })
    );
  };

  const formatTime = (timestamp) => {
    const diff = Math.floor((new Date() - new Date(timestamp)) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const handleFollowToggle = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
    );
    setUsers(updatedUsers);
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="feed-container">
      <div className="feed-box">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="logo">
            <img
              src="https://mintlify.s3.us-west-1.amazonaws.com/base-a060aa97/images/hero.png"
              alt="Onchain Logo"
              className="logo-img"
            />
            Onchain Social
          </div>
          <div className="icons">
            <i className="fas fa-bell"></i>
            <i className="fas fa-paper-plane"></i>
          </div>
        </div>

        {/* 🔍 Search Bar Below Logo */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* 🔍 Search Results with Avatar */}
        {searchQuery && (
          <div className="search-results">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div key={user.id} className="search-user-card">
                  <div className="search-user-info">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="search-avatar"
                    />
                    <span>@{user.username}</span>
                  </div>
                  <button
                    className={user.isFollowing ? "unfollow-btn" : "follow-btn"}
                    onClick={() => handleFollowToggle(user.id)}
                  >
                    {user.isFollowing ? "Unfollow" : "Follow"}
                  </button>
                </div>
              ))
            ) : (
              <p>No users found.</p>
            )}
          </div>
        )}

        {/* Post Creation */}
        <div className="upload-section">
          <textarea
            placeholder="Share your thoughts..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            rows={3}
          />
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="public">🌐 Public</option>
            <option value="private">🔒 Private</option>
          </select>
          <button onClick={handlePostUpload}>Post</button>
        </div>

        {/* Posts */}
        {posts
          .filter((post) => post.visible || post.username === "you")
          .map((post) => (
            <div className="post" key={post.id}>
              <div className="post-header">
                <img src={post.avatar} className="avatar" alt={post.username} />
                <div>
                  <span
                    className="clickable-username"
                    onClick={() => {
                      if (post.username === "you") {
                        window.open("/edit-profile", "_blank");
                      }
                    }}
                  >
                    @{post.username}
                  </span>{" "}
                  ·{" "}
                  <span className="timestamp">{formatTime(post.timestamp)}</span>
                  {!post.visible && (
                    <span className="private-tag">🔒 Private</span>
                  )}
                </div>
              </div>

              <div className="post-actions">
                <button
                  className={`like-button ${
                    post.likes.includes("you") ? "liked" : ""
                  }`}
                  onClick={() => handleToggleLike(post.id)}
                >
                  ❤️ {post.likes.length}
                </button>
              </div>

              {editingPostId === post.id ? (
                <div className="edit-box">
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <button onClick={() => handleSaveEdit(post.id)}>Save</button>
                  <button onClick={() => setEditingPostId(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <div className="content">{post.content}</div>
                  {post.author === "you" && (
                    <div className="post-buttons">
                      <button onClick={() => startEdit(post.id, post.content)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(post.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}

              <div className="comment-box">
                <input type="text" placeholder="Add a comment..." />
              </div>
            </div>
          ))}

        {/* Bottom Navigation */}
        <div className="bottom-nav">
          <i className="nav-icon fas fa-home active"></i>
          <i className="nav-icon fas fa-search"></i>
          <i className="nav-icon fas fa-cog"></i>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;

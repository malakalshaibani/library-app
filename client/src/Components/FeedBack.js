import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePost, getPosts, likePost } from "../Features/PostSlice";
import { Button, Col, Container, Row, Input, Table } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa6";
import { deletePost } from "../Features/PostSlice";
import { updatePost } from "../Features/PostSlice";

const FeedBack = () => {
  const [postMsg, setPostMsg] = useState("");
  const [editingPostId, setEditingPostId] = useState(null); // Track the post being edited
  const [editMessage, setEditMessage] = useState(""); // Store the new message for the post being edited

  const { user, isLogin } = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch posts on component load or when login status changes
  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    } else {
      dispatch(getPosts()); // Fetch all posts
    }
  }, [isLogin, navigate, dispatch]);

  // Handle feedback post submission
  const handleFeed = () => {
    if (!postMsg.trim()) {
      alert("Post message is required.");
      return;
    }
    if (!user || !user.email) {
      alert("User is not logged in.");
      return;
    }
    const postData = {
      postMsg: postMsg,
      email: user.email,
    };
    dispatch(savePost(postData)) // Save post to backend
      .then(() => dispatch(getPosts())); // Refresh posts after saving
    setPostMsg(""); // Clear input field after posting
  };

  // Handle liking a post
  const handleLikePost = (postId) => {
    if (!user || !user._id) {
      alert("User is not logged in.");
      return;
    }
    const postData = {
      postId: postId,
      userId: user._id,
    };
    dispatch(likePost(postData)) // Like post action
      .then(() => dispatch(getPosts())); // Refresh posts after liking
  };

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(postId));
    }
  };

  const handleUpdatePost = (postId) => {
    if (!editMessage.trim()) {
      alert("Post message cannot be empty.");
      return;
    }
    console.log("Updating post:", postId, "Message:", editMessage); // Debugging
    dispatch(updatePost({ postId, postMsg: editMessage }))
      .then(() => {
        dispatch(getPosts()); // Refresh the posts
        setEditingPostId(null); // Exit editing mode
      });
  };

  // Render loading state if user data is not available yet
  if (!user || !user.email) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {/* Feedback Section */}
      <Row className="mb-4">
        <Col>
          <Input
            id="share"
            name="share"
            placeholder="Share your Feedback..."
            type="textarea"
            value={postMsg}
            onChange={(e) => setPostMsg(e.target.value)}
          />
          <Button onClick={handleFeed} className="mt-2">Share</Button>
        </Col>
      </Row>

      {/* Posts Section */}
      <Row>
        <Col>
          <Table className="table table-striped">
            <thead>
              <tr>
                <th>Email</th>
                <th>Feedback Message</th>
                <th>Actions</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td>{post.email}</td>
                  <td>
                    <p>{moment(post.createdAt).fromNow()}</p>
                    {editingPostId === post._id ? (
                      <Input
                        type="text"
                        value={editMessage}
                        onChange={(e) => setEditMessage(e.target.value)} // Update the `editMessage` state as user types
                        className="form-control"
                      />
                    ) : (
                      post.postMsg
                    )}
                  </td>
                  <td>
                    <p className="likes">
                      <Link onClick={() => handleLikePost(post._id)}>
                        <FaThumbsUp />
                      </Link>
                      ({post.likes.count})
                    </p>
                  </td>
                  <td>
                    {post.email === user.email ? (
                      <Button
                        color="primary"
                        className="mx-2"
                        onClick={() => {
                          if (editingPostId === post._id) {
                            handleUpdatePost(post._id); // Save the updated post
                          } else {
                            setEditingPostId(post._id); // Enter editing mode
                            setEditMessage(post.postMsg); // Pre-fill the input with the current message
                          }
                        }}
                      >
                        {editingPostId === post._id ? "Save" : "Edit"}
                      </Button>
                    ) : (
                      <span style={{ color: "gray" }}>Not Allowed</span>
                    )}
                  </td>
                  <td>
                    {post.email === user.email ? (
                      <Button
                        color="danger"
                        onClick={() => handleDeletePost(post._id)}
                      >
                        Delete
                      </Button>
                    ) : (
                      <span style={{ color: "gray" }}>Not Allowed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default FeedBack;

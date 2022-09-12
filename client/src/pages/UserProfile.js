import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getUserDetails,updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import AlertMessage from "../components/AlertMessage";
import Spiner from "../components/Spiner";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    // default state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    //REDUX STUFF
    const dispatch = useDispatch();
    // details
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    // login info
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
        } else {
            if (!user || !user.name ) {
                
                dispatch(getUserDetails("profile"));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, navigate, userInfo, user,success]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            // dispatch update profile
            dispatch(
                updateUserProfile({ id: user._id, name, email, password })
            );
        }
    };

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <AlertMessage variant="danger">{message}</AlertMessage>}
                {success && <AlertMessage variant='success'>Profile Updated</AlertMessage>}
                {loading ? (
                    <Spiner />
                ) : error ? (
                    <AlertMessage variant="danger">{error}</AlertMessage>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="primary" className="my-2">
                            Update
                        </Button>
                    </Form>
                )}
            </Col>
        </Row>
    );
};

export default UserProfile;
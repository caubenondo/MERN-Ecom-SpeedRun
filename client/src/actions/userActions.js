import axios from "axios";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
} from "../constants/userConstants";

// LOGIN HANDLING
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            "/api/users/login",
            { email, password },
            config
        );
        // update redux states
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
        // add to local
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    // erase user in local storate
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");

    dispatch({ type: USER_LOGOUT });

    document.location.href = "/login";
};

export const signup = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        });
        // set config for api call
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        // sumit payload to the POST api/users/ to add user to the database
        const { data } = await axios.post(
            "/api/users",
            { name, email, password },
            config
        );
        // change state of user to sign up
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        });
        // Change state of user to loggin
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
        //local storage: add userInfo
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        });
        //   destructure the userLogin State to get userInfo
        const {
            userLogin: { userInfo },
        } = getState();

        //   axious header config with token
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        //   fetch
        const { data } = await axios.get(`/api/users/${id}`, config);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message,
        });
    }
};

// update
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        });
        // get login info and token
        const {
            userLogin: { userInfo },
        } = getState();
        // setup fetch header with token
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        // fetch
        const { data } = await axios.put(`/api/users/profile`, user, config);
        // Update user info
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        });
        // login user with new info
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
        // update local storage
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message,
        });
    }
};
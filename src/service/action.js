import actionType from "./actionType";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export const getDataService = () => dispatch => {
  axios.get("https://my-json-server.typicode.com/Srinivasan47/mockjson/posts")
    .then(res => {
      if (res.status === 200) {
        dispatch({
          payLoad: res.data,
          type: actionType.GETDATA_SUCCESS
        });
      }
      else {
        dispatch({
          error: res.data.message,
          type: actionType.GETDATA_FAILURE
        });
      }

    })

    .catch(error => {
      dispatch({
        error: error,
        type: actionType.GETDATA_FAILURE
      });
    })


};


export const addUserInfoService = data => dispatch => {
  axios.post("https://my-json-server.typicode.com/Srinivasan47/mockjson/posts", data)
    .then(res => {

console.log("resssss", res)
      if (res.status === 201) {
        dispatch({
          payLoad: res.data,
          type: actionType.ADDUSER_SUCCESS
        });
        console.log("res add", res)
      }
      else {
        dispatch({
          error: res.data.message,
          type: actionType.ADDUSER_FAILURE
        });
      }

    })

    .catch(error => {
      dispatch({
        error: error,
        type: actionType.ADDUSER_FAILURE
      });
    })
}

export const editUserInfoService = data => dispatch => {
  axios.put("https://my-json-server.typicode.com/Srinivasan47/mockjson/posts", data)
    .then(res => {
      if (res.status === 200) {
        dispatch({
          payLoad: res.data,
          type: actionType.EDITUSER_SUCCESS
        });
        console.log("res 2", res)
      }
      else {
        dispatch({
          error: res.data.message,
          type: actionType.EDITUSER_FAILURE
        });
      }

    })

    .catch(error => {
      dispatch({
        error: error,
        type: actionType.EDITUSER_FAILURE
      });
    })
}
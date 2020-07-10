import * as actions from "../api";
import axios from "axios";
import { showToast } from "../utils";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const {
    url,
    data,
    method,
    onSuccess,
    onError,
    onStart,
    toast,
  } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const response = await axios.request({
      baseURL: "http://localhost:9000",
      url,
      method,
      data,
    });

    dispatch(actions.apiCallSuccess(response.data));

    const payload = method === "delete" ? data : response.data;

    if (onSuccess) {
      setTimeout(() => {
        onSuccess.map((action) => dispatch({ type: action, payload }));
        if (toast) {
          dispatch({
            type: toast,
            payload: { type: "success", message: "action successful" },
          });
        }
      }, 2000);
    }
  } catch (error) {
    dispatch(actions.apiCallFailed(error.message));

    if (onError) dispatch({ type: onError, payload: error.message });
    dispatch(showToast({ type: "error", message: "action not completed" }));
  }
};

export default api;

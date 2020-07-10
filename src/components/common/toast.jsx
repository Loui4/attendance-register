import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { hideToast } from "../../store/utils";

const Toastify = (props) => {
  const { toastNotify, hideToast } = props;
  if (toastNotify) {
    const notify = () => toast[toastNotify.type](toastNotify.message);
    notify();
    hideToast();
  }
  return <ToastContainer />;
};

const mapStateToProps = (state) => {
  return { toastNotify: state.utils.toast };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideToast: () => dispatch(hideToast),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Toastify);

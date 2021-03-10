import React, { Component } from "react";
import LoginPage from "../login-page";
// Simple Wrapper for application's login and signup page
//TO-DO Properly handle fallbacks
interface Props {}
interface State {}
export default class Wrapper extends Component<Props, State> {
  render() {
    const outer = {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      fontFamily: "sans-serif",
      background:
        "linear-gradient(to right, #f64f59, #c471ed, #12c2e9)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
    };
    const inner = {
      width: "450px",
      margin: "auto",
      background: "#ffffff",
      boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
      padding: "40px 55px 45px 55px",
      borderRadius: "15px",
      transition: "all .3s",
    };
    return (
      <div style={outer}>
        <div style={inner}>
          <LoginPage></LoginPage>
        </div>
      </div>
    );
  }
}

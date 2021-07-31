import React from "react";
export default function loginWrapper(WrappedComponent: React.ComponentType) {
  return class extends React.Component {
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
            <WrappedComponent />
          </div>
        </div>
      );
    }
  };
}

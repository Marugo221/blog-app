import "./Like.css";
import { ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import React from "react";

const Like = ({ checked, callback, likes = 0, status }) => {
  const statusNot200 = (
    <ExclamationCircleOutlined
      style={{
        color: "red",
        marginLeft: 5,
      }}
    />
  );

  const statusLoad = (
    <LoadingOutlined
      style={{
        color: "green",
        marginLeft: 5,
      }}
    />
  );

  return (
    <>
      <div className="like-container">
        <input id="toggle-heart" type="checkbox" checked={checked} readOnly />
        <label htmlFor="toggle-heart" aria-label="like" onClick={callback}>
          ❤{" "}
        </label>
      </div>
      <span className="like-count">{likes}</span>
      {status === 50 && statusLoad}
      {status >= 300 && statusNot200}
    </>
  );
};

export default Like;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import cn from "classnames";

import avatar from "../../../assets/user-avatar.png";
import { logOut } from "../../../action/action";
import { validateURL } from "../../../tools/tools";

const UserMenu = (props) => {
  const { loading } = props;
  const isLogged = useSelector((state) => state.user.isLogged);
  const { username, image } = useSelector((state) => state.user);

  const imageUrl = validateURL(image);
  const userAvatar = imageUrl ? image : avatar;
  const dispatch = useDispatch();

  if (loading) {
    return (
      <div className={cn("user-menu")}>
        <span>…</span>
      </div>
    );
  }

  return isLogged ? (
    <div className={cn("user-menu")}>
      <Link
        to="/new-article"
        className={cn("link", "link_new-article")}
        title="Create new article"
      >
        Create article
      </Link>
      <Link
        to="/profile"
        className={cn("link", "link_edit-profile")}
        title="Edit profile"
      >
        {username}
        <img src={userAvatar} alt="Avatar" className={cn("avatar")} />
      </Link>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        className={cn("link", "link_logout")}
        onClick={() => dispatch(logOut())}
      >
        Log Out
      </a>
    </div>
  ) : (
    <div className={cn("user-menu")}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link to="signin" className={cn("link", "link_sign-in")}>
        Sign In
      </Link>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link to="signup" className={cn("link", "link_sign-up")}>
        Sign Up
      </Link>
    </div>
  );
};

export default UserMenu;

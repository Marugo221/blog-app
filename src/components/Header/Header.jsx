import React from "react";
import UserMenu from "./UserMenu";
import cn from "classnames";
import { Link } from "react-router-dom";

const Header = () => (
  <header className={cn("app-header")}>
    <h1 className={cn("app-title")}>
      <Link to="/">Realworld Blog</Link>
    </h1>
    <UserMenu />
  </header>
);

export default Header;

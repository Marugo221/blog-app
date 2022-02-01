import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import style from "./App.scss";
import Header from "../Header";
import ArticleList from "../ArticleList";
import ArticleView from "../ArticleView";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import Profile from "../Profile";
import ArticleForm from "../ArticleForm";
import ArticleEdit from "../ArticleEdit";

const App = () => {
  return (
    <Router>
      <div className={style["app"]}>
        <Header />
        <main className={style["app-main"]}>
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/article" element={<Navigate to="/" replace />} />
            <Route path="/article/:slug" element={<ArticleView />} />
            <Route path="/article/:slug/edit" element={<ArticleEdit />} />
            <Route path="/new-article" element={<ArticleForm />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

import cn from "classnames";
import React from "react";
import {
  addEditArticleTag,
  removeEditArticleTag,
  updateEditArticleTags,
} from "../../../action/action";
import { useDispatch, useSelector } from "react-redux";

function TagsList(props) {
  let { tags } = props;
  const maxKey = useSelector((state) => state.editArticle.maxUniqueKey);
  const dispatch = useDispatch();

  function addTagField(key) {
    console.log("addTagField", maxKey, key);
    dispatch(addEditArticleTag(maxKey + 1));
  }

  function removeTagField(key) {
    dispatch(removeEditArticleTag(key));
    if (tags.length === 1) {
      dispatch(addEditArticleTag(maxKey + 1));
    }
  }

  function handleChange(event, key) {
    const tag = event.target.value;
    dispatch(updateEditArticleTags({ key, tag }));
  }

  return tags.map((elem) => {
    const key = elem.key;

    return (
      <li className={cn("tag-line")} key={key}>
        <input
          type="text"
          className={cn("control", "control_input", "control_tag")}
          placeholder="Tag"
          autoComplete="off"
          defaultValue={elem.tag}
          name={`tag.${key}`}
          onChange={(event) => handleChange(event, key)}
        />
        <button
          type="button"
          className={cn("btn_delete", "btn_tag")}
          onClick={() => removeTagField(key)}
        >
          Delete
        </button>
        <button
          type="button"
          className={cn("btn_add", "btn_tag")}
          onClick={() => addTagField(key)}
        >
          Add Tag
        </button>
      </li>
    );
  });
}

export default TagsList;

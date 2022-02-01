import cn from "classnames";

const TagList = ({ tags }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  const tagList =
    tags &&
    tags.map((el) => (
      <li key={el} className={cn("tag", "tag_main")}>
        <button>{el}</button>
      </li>
    ));
  return <ul className={cn("article__tag-list", "nolist")}>{tagList}</ul>;
};

export default TagList;

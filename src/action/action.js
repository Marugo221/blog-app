import {getArticles} from "../getAPI/getArticles";
import {getArticlesTotal} from "../getAPI/getArticlesTotal";

export const setArticles = payload => {
  return {
    type: 'SET_ARTICLES',
    payload
  }
}

export const setArticlesTotal = payload => {
  return {
    type: 'SET_ARTICLES_TOTAL',
    payload
  }
}

export const setPageNum = payload => {
  return {
    type: 'SET_PAGE_NUM',
    payload
  }
}

export const setEditArticleBody = payload => {
  return {
    type: 'SET_EDIT_ARTICLE_BODY',
    payload
  }
}

export const setArticlesTotalAsync = () => {
  return (dispatch) => {
    getArticlesTotal().then((data) => {
      dispatch(setArticlesTotal(data.articlesCount))
    })
  }
}

export const setArticlesAsync = (page = 1, limit = 2, ) => {
  const offset = (page * limit) - limit

  return (dispatch) => {
    getArticles(limit, offset).then(res => {
      dispatch(setArticles(res.articles))
    })
    // blogApi.getArticles(limit, offset).then((data) => {
    //   console.log(data)
    //   dispatch(setArticles(data))
    // })
  }
}



///////////////
export const setEditArticleTags = payload => {
  return {
    type: 'SET_EDIT_ARTICLE_TAGS',
    payload
  }
}

export const addEditArticleTag = payload => {
  return {
    type: 'ADD_EDIT_ARTICLE_TAG',
    payload
  }
}

export const removeEditArticleTag = payload => {
  return {
    type: 'REMOVE_EDIT_ARTICLE_TAG',
    payload
  }
}

export const updateEditArticleTags = payload => {
  return {
    type: 'UPDATE_EDIT_ARTICLE_TAG',
    payload
  }
}





/////////////////
export const setUser = payload => {
  return {
    type: 'SET_USER',
    payload
  }
}

export const logOut = () => {
  return {
    type: 'LOG_OUT'
  }
}


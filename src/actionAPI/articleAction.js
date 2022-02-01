export const updateArticleAction = (slug, article) => {
  return {
    type: 'UPDATE_ARTICLE',
    payload: {
      slug,
      article,
    },
  }
}

export const setArticleAction = (slug, article) => {
  return {
    type: 'SET_ARTICLE',
    payload: {
      slug,
      article,
    },
  }
}

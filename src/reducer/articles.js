
const defaultState = {
  articles: [],

  editArticles: {
    title: '',
    description: '',
    body: '',
    tagList: [
      {key: 1, tag: 'Eakjan'},
      {key: 2, tag: 'Kmlkaaf'},
      {key: 3, tag: 'Adsdfs'},
    ],
  },
  pageNum: 1,
  articlesTotal: 0,
};

export const articlesReduсer = (state = defaultState, action ) => {
    switch (action.type) {
      case 'SET_ARTICLES':
        return {
          ...state,
          articles: action.payload
        }
      case 'SET_ARTICLE':
        return {
          ...state,
          articles: [
            ...state.articles,
            action.payload
          ]
        }
      case 'UPDATE_ARTICLE':
        const newArticles = state.articles.map(el => {
          if(el.slug === action.payload.slug){
            return action.payload.article
          }
          return el
        })
        return {
          ...state,
          articles: newArticles
        }
      case 'SET_ARTICLES_TOTAL':
        return {
          ...state,
          articlesTotal: action.payload
        }
      case 'SET_EDIT_ARTICLE_BODY':
        return {
          ...state,
          editArticles: {
            ...state.editArticles,
            ...action.payload
          }
        }
      case 'SET_EDIT_ARTICLE_TAGS':
        return {
          ...state,
          editArticles: {
            ...state.editArticles,
            tagList: {
              ...action.payload
            }
          }
        }
      case 'SET_PAGE_NUM':
        return {
          ...state,
          pageNum: action.payload
        }

      default:
        return state
    }
}

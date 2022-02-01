const defaultState = {
  title: '',
  description: '',
  body: '',
  tagList: [
    {key: 1, tag: ''},
  ],
  maxUniqueKey: 100,
};


export const editArticle = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_EDIT_ARTICLE_BODY':
      return {
        ...state,
        ...action.payload
      }
    case 'SET_EDIT_ARTICLE_TAGS':
      return {
        ...state,
        tagList: {
          ...action.payload
        }
      }
    case 'ADD_EDIT_ARTICLE_TAG':
      const newTag = {key: action.payload, tag: ''}
      return {
        ...state,
        tagList: [
          ...state.tagList,
          newTag
        ],
        maxUniqueKey: action.payload

      }
    case 'REMOVE_EDIT_ARTICLE_TAG':
      let newTagsList = state.tagList.filter(el => {
        return el.key !== action.payload
      } )
      return {
        ...state,
        tagList: newTagsList
      }
    case 'UPDATE_EDIT_ARTICLE_TAG':
      const newTags = state.tagList.map(el => {
        if(el.key === action.payload.key) {
          el.tag = action.payload.tag
          return el
        }
        return el
      })

      return {
        ...state,
        tagList: newTags
      }
    default:
      return state
  }
}

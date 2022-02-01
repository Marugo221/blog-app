import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {articlesReduсer} from "./articles";
import {userReduсer} from "./users";
import {editArticle} from "./editArticle";
import reduxThunk from "redux-thunk";


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;


const loadState = () => {
  try {
 
    const serialisedState = window.sessionStorage.getItem('app_state');

    if (!serialisedState) return undefined;


    return JSON.parse(serialisedState);
  } catch (err) {
    return undefined;
  }
}

const saveState = (state) => {
  try {
    const serialisedState = JSON.stringify(state)
    window.sessionStorage.setItem('app_state', serialisedState)
  } catch (err) {
    console.log("Данные не было сохранены локально")
    console.log("Ошибка ", err)
  }
}

const oldState = loadState();

const rootReducer = combineReducers({
  articles: articlesReduсer,
  user: userReduсer,
  editArticle,

})


const store = createStore(rootReducer, oldState, composeEnhancers(applyMiddleware(
  reduxThunk,
)))

store.subscribe(() => {
  saveState(store.getState())
})


export {store}

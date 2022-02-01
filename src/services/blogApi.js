import axios from "axios";
import {store} from "../reducer/store";
const state = store.getState()


class blogAPI {
  // baseURL = 'http://kata.academy:8022/'
  baseURL = 'https://api.realworld.io/api/'
  async getArticles(limit = 2, offset = 0) {
    try {
      const response = await axios.get(`${this.baseURL}articles/?offset=${offset}&limit=${limit}`);
      return response.data.articles
    } catch (error) {
      console.error(error);
    }
  }

  async getArticle(slug) {
    try {
      const response = await axios.get(`${this.baseURL}articles/${slug}`);
      return response.data.article
    } catch (error) {
      console.error(error);
    }
  }

  async getArticlesTotal() {
    try {
      const response = await axios.get(`${this.baseURL}articles`);
      return response.data.articlesCount
    } catch (error) {
      console.error(error);
    }
  }

  async createArticle(article) {
    const {title, description, body, tagList} = article
    try {
      const token = state.user.token
      console.log(title, description, body, tagList, token)
      const response = await axios({
        method: 'put',
        headers: {
          "Access-Control-Allow-Origin": `*`,
          "Authorization": `Token ${token}`
        },
        url: `${this.baseURL}articles`,
        data: {
          "article": {
            "title": title,
            "description": description,
            "body": body,
            "tagList": tagList
          }
        }
      });
      console.log("response", response)
      return response
    } catch (error) {
      console.log(title, description, body, tagList)

      console.error(error);
    }
  }

  async registerUser(username, email, password) {
    console.log(username, email, password)
    try {
      return await axios({
        method: 'post',
        headers: {
          "Access-Control-Allow-Origin": `*`,
          "Content-Type": "application/json"
        },
        url: `https://api.realworld.io/api/users`,
        data: {
          "user": {
            "username": username,
            "email": email,
            "password": password
          }
        }
      });
    } catch (error) {
      console.log('пал хилла')
      console.error(error);
    }
  }

  async loginUser(email, password) {
    try {
      return await axios({
        method: 'post',
        headers: {
          "Access-Control-Allow-Origin": '*'
        },
        url: `${this.baseURL}users/login`,
        data: {
          "user": {
            "email": email,
            "password": password
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  async editProfile(username, email, bio, image) {
    try {
      const token = state.user.token
      const response = await axios({
        method: 'put',
        headers: {
          "Access-Control-Allow-Origin": `*`,
          "Authorization": `Token ${token}`

        },
        url: `${this.baseURL}user`,
        data: {
          "user": {
            "username": username,
            "email": email,
            "bio": bio,
            "image": image
          }
        }
      });
      console.log("response", response)
      return response
    } catch (error) {
      console.error(error);
    }
  }

}

const blogApi = new blogAPI()
export default blogApi

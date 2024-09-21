import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

// const [token] = useLocalStorage('token')

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    console.debug("URL", url)
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get companies. filtered by name. if no name, get all */

  static async getCompanies(name) {
    let data = { name: name }
    let res = await this.request(`companies`, (name ? data : {}));
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get jobs. filtered by title. if no title, get all */

  static async getJobs(title) {
    let data = { title: title }
    let res = await this.request(`jobs`, (title ? data : {}));
    return res.jobs;
  }

  /** Get token for registered user */

  static async login(data) {
    try {
      let res = await this.request(`auth/token`, data, 'post')
      return res.token
    } catch (e) {
      return { error: e }
    }
  }

  /** register new user */

  static async signup(data) {
    try {
      let res = await this.request(`auth/register`, data, 'post')
      return res.token
    } catch (e) {
      return { error: e }
    }
  }

  /** Get current user */

  static async getUser(username) {
    try {
      let res = await this.request(`users/${username}`)
      return res.user
    } catch (e) {
      return false 
    }
  }

  /** Update current user data */

  static async editUser(username, data) {
    try {
      let res = await this.request(`users/${username}`, data, 'patch')
      return res
    } catch (e) {
      return { error: e }
    }
  }

  /** Apply to a job*/

  static async applyToJob(username,jobId) {
    try {
      await this.request(`users/${username}/jobs/${jobId}`, {}, 'post')
      
    } catch (error) {
      console.log(error)
    }
  }

}



export default JoblyApi;
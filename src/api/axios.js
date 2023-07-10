import axios from "axios";
import { apiUrl } from "../tools/constants";

axios.defaults.baseURL = apiUrl;

export default axios;

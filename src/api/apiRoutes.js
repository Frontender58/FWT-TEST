import { pageLimit } from "../tools/constants";
import { constructApiParams } from "../tools/functions";
import axios from "./axios";

const fetchLocations = () => {
  return axios.get("/locations");
};

const fetchAuthors = () => {
  return axios.get("/authors");
};

const fetchPaintings = (
  page = 1,
  filter = null,
  authorId = null,
  locationId = null,
  created = null
) => {
  var data = constructApiParams(filter, authorId, locationId, created);

  data._page = page;
  data._limit = pageLimit;

  return axios.get("/paintings", {
    params: data,
  });
};
const fetchPaintingsFull = (
  filter = null,
  authorId = null,
  locationId = null,
  created = null
) => {
  var data = constructApiParams(filter, authorId, locationId, created);

  return axios.get("/paintings", {
    params: data,
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  fetchLocations,
  fetchAuthors,
  fetchPaintings,
  fetchPaintingsFull,
};

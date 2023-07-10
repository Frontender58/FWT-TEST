import { apiUrl } from "./constants";

export const getPages = (rowCount, limit) => {
  let count = Math.ceil(rowCount / limit);
  if (count < 1) count = 1;

  const result = [];

  for (let i = 1; i <= count; i++) {
    result.push({ id: i });
  }

  return result;
};

export const getFullImageUrl = (url) => {
  return apiUrl + url;
};

export const getAllCreatedFromData = (data) => {
  let res = [];

  data.forEach((element) => {
    if (!res.some((obj) => obj.created === element.created)) {
      res.push({
        id: element.id,
        created: element.created,
      });
    }
  });
  return res;
};

export const constructApiParams = (
  filter = null,
  authorId = null,
  locationId = null,
  created = null
) => {
  let data = {};

  if (filter) data.q = filter;
  if (authorId) data.authorId = authorId;
  if (locationId) data.locationId = locationId;
  if (created) data.created = created;

  return data;
};

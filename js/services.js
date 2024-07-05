const API_KEY = "01b951c93657a63d7c1842c6a900d805";
const BASE_URL = "https://api.themoviedb.org/3/";
const LANGUAGE = "&language=uk-UA";

const getData = (url) =>
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw `Ой, щось пішло не так, помилка ${response.status}`;
    })
    .catch((err) => console.error(err));

export const getTriends = async (type = "all", period = "day", page = 1) => {
  const url = `${BASE_URL}trending/${type}/${period}?api_key=${API_KEY}${LANGUAGE}&page=${page}`;

  const data = await getData(url);
  const next = getTriends.bind(null, type, period, page + 1);
  const prev = getTriends.bind(null, type, period, page - 1);
  return {
    next,
    prev,
    data,
  };
};

export const getTop = async (type, page = 1) => {
  const url = `${BASE_URL}${type}/top_rated?api_key=${API_KEY}${LANGUAGE}&page=${page}`;
  return await getData(url);
};

export const getPopular = async (type, page = 1) => {
  const url = `${BASE_URL}${type}/popular?api_key=${API_KEY}${LANGUAGE}&page=${page}`;
  return await getData(url);
};

export const getVideo = async (id, type) => {
  const url = `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}${LANGUAGE}`;
  return await getData(url);
};

export const search = async (query, page = 1) => {
  const url = `${BASE_URL}search/multi?api_key=${API_KEY}${LANGUAGE}' + 
  '&page=${page}&include_adult=false&query=${query}`;
  return await getData(url);
};

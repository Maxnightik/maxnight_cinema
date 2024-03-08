import renderCard from "./renderCard.js";
import { getTriends, getVideo } from "./services.js";

const filmWeek = document.querySelector(".film-week");

const firstRender = (data, keyVideo) => {
  const key = keyVideo?.key;
  const {
    vote_average: voteAverage,
    backdrop_path: backdropPath,
    name,
    original_title: originalTitle,
    title,
    original_name: originalName,
  } = data;

  filmWeek.innerHTML = `
   <div class="container film-week__container" data-rating="${voteAverage}">
                <div class="film-week__poster-wrapper">
                    <img class="film-week__poster"
                        src="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdropPath}"
                        alt="постер ${title || name}">
                    <p class="film-week__title_origin">${
                      originalTitle || originalName
                    }</p>
                </div>
                <h2 class="film-week__title">${title || name}</h2>
                ${
                  key
                    ? `<a class="film-week__watch-trailer tube" href="https://youtu.be/${key}"
                    aria-label="дивитись трейлер"></a> `
                    : ""
                }
                
            </div>
    `;
};

const renderVideo = async () => {
  const data = await getTriends();

  const [firstCard, ...otherCard] = data.results;
  otherCard.length = 20;

  const video = await getVideo(firstCard.id, firstCard.media_type);

  firstRender(firstCard, video.results[0]);
  renderCard(otherCard);
};

export default renderVideo;

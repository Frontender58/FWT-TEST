import { getFullImageUrl } from "../tools/functions";

export default function GalleryItem(props) {
  return (
    <figure className="main__name">
      <img
        src={getFullImageUrl(props.image)}
        alt=""
        className="main__name_adaptation"
      />
      <figcaption className="main__name-style">
        <p>{props.title}</p>
        <p className="main__name-style__item">
          <strong>Author:</strong> {props.author}
        </p>
        <p className="main__name-style__item">
          <strong>Created:</strong> {props.created}
        </p>
        <p className="main__name-style__item">
          <strong>Location:</strong> {props.location}
        </p>
      </figcaption>
    </figure>
  );
}

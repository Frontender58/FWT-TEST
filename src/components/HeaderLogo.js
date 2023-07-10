export default function HeaderLogo({ darkTheme, clickAction }) {
  return (
    <div className="header__logo">
      <img src="./images/logo.png" alt="Logo" />
      <img
        src={darkTheme ? "./images/star.png" : "./images/star-light.jpg"}
        style={{ cursor: "pointer" }}
        onClick={() => clickAction()}
        alt="Star"
      />
    </div>
  );
}

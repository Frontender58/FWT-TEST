export default function Pagination({
  pages,
  activePageId,
  handleClick,
  darkTheme,
}) {
  const pagesLinks = pages.map((item, index) => (
    <div
      key={index}
      onClick={() => handleClick(item.id)}
      className={
        "pagination__rectangle " + (activePageId === item.id ? "active" : "")
      }
    >
      {item.id} {activePageId === item.id}
    </div>
  ));
  return (
    <div className="pagination">
      <div
        onClick={() => handleClick("first")}
        className="pagination__rectangle no-hover"
      >
        <img
          src={
            darkTheme
              ? "./images/quotes left.png"
              : "./images/quotes left white.jpg"
          }
          alt=""
        />
      </div>
      <div
        onClick={() => handleClick("prev")}
        className="pagination__rectangle no-hover"
      >
        <img
          src={
            darkTheme
              ? "./images/quotaton mark left.png"
              : "./images/quotaton mark left white.jpg"
          }
          alt=""
        />
      </div>
      {pagesLinks}
      <div
        onClick={() => handleClick("next")}
        className="pagination__rectangle no-hover"
      >
        <img
          src={
            darkTheme
              ? "./images/quotation mark right.png"
              : "./images/quotation mark right white.jpg"
          }
          alt=""
        />
      </div>
      <div
        onClick={() => handleClick("last")}
        className="pagination__rectangle no-hover"
      >
        <img
          src={
            darkTheme
              ? "./images/quotes right.png"
              : "./images/quotes right white.jpg"
          }
          alt=""
        />
      </div>
    </div>
  );
}

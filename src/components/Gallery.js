import React, { useEffect, useState } from "react";
import "../assets/css/reset.css";
import "../assets/css/default.css";
import "../assets/css/header.css";
import "../assets/css/main.css";
import "../assets/css/mediaquery1024-1365(height-1347).css";
import "../assets/css/mediaquery768-1023(1948-height).css";
import "../assets/css/mediaquery320-767(height-3171).css";
import "../assets/css/pagination.css";

import GalleryItem from "./GalleryItem";
import Pagination from "./Pagination";
import SelectComponent from "./SelectComponent";
import HeaderLogo from "./HeaderLogo";
import apiRoutes from "../api/apiRoutes";
import { getAllCreatedFromData, getPages } from "../tools/functions";
import { pageLimit } from "../tools/constants";
import DateIntervalComponent from "./DateIntervalComponent";

export default function Gallery() {
  const [galleryList, setGalleryList] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);

  const [createdFrom, setcreatedFrom] = useState(null);
  const [createdTo, setcreatedTO] = useState(null);

  const updateDarkTheme = () => {
    if (darkTheme) setDarkTheme(false);
    else setDarkTheme(true);
  };

  const handleInvervalChange = (start, end) => {
    setcreatedFrom(start);
    setcreatedTO(end);
    getFilteredData(start, end);
  };
  const fetchData = (
    currentPage = 1,
    name = null,
    author = null,
    location = null,
    start = null,
    end = null
  ) => {
    apiRoutes.fetchPaintingsFull(name, author, location).then((res) => {
      setPages(getPages(res.data.length, pageLimit));
      apiRoutes
        .fetchPaintings(currentPage, name, author, location)
        .then((res) => {
          setFetchedData(res.data, start, end);
        });
    });
  };
  const getAuthor = (id) => {
    let val = authors.filter((item) => item.id === id);
    if (val.length > 0) return val[0].name;
    return "not found";
  };
  const getLocation = (id) => {
    let val = locations.filter((item) => item.id === id);
    if (val.length > 0) return val[0].location;
    return "not found";
  };
  const setFetchedData = (res_data, start = null, end = null) => {
    setCreateds(getAllCreatedFromData(res_data));

    let filtered = [];

    if (start || end) {
      res_data.forEach((element) => {
        let isFrom = start !== "" && start != null;
        let isTo = end !== "" && end != null;

        if (isFrom && isTo) {
          if (start <= +element.created && end >= +element.created) {
            filtered.push(element);
          }
        } else if (isTo) {
          if (end >= +element.created) {
            filtered.push(element);
          }
        } else if (isFrom) {
          if (start <= +element.created) {
            filtered.push(element);
          }
        }
      });
    } else {
      filtered = res_data;
    }
    let data = filtered.map((item, index) => (
      <GalleryItem
        key={index}
        image={item.imageUrl}
        title={item.name}
        created={item.created}
        author={getAuthor(item.authorId)}
        location={getLocation(item.locationId)}
      />
    ));
    setGalleryList(data);
    setDataInited(true);
  };

  useEffect(() => {
    apiRoutes.fetchAuthors().then((res) => {
      setAuthors(res.data);
    });
    apiRoutes.fetchLocations().then((res) => {
      setLocations(res.data);
    });

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFilteredData = (start = null, end = null) => {
    setDataInited(false);
    setCurrentPage(1);

    console.log("created to - ", createdFrom);
    fetchData(currentPage, name, author, location, start, end);
  };
  const switchToPage = () => {
    setDataInited(false);
    fetchData(currentPage);
  };
  function eventClickPagination(pageId = null) {
    if (!pageId) {
      return;
    }

    let resId = currentPage;
    if (pageId === "first") {
      resId = 1;
    } else if (pageId === "prev") {
      if (currentPage > 1) resId = currentPage - 1;
    } else if (pageId === "next") {
      if (currentPage < pages.length) resId = currentPage + 1;
    } else if (pageId === "last") {
      resId = pages.length;
    } else {
      resId = pageId;
    }

    setCurrentPage(resId);
  }

  const [name, setName] = useState("");
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleNameBlur = () => {
    getFilteredData();
  };

  const [pages, setPages] = useState([""]);
  const [dataInited, setDataInited] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [location, setLocation] = useState(null);
  const [author, setAuthor] = useState(null);
  const [created, setCreated] = useState(null);

  const [locations, setLocations] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [createds, setCreateds] = useState([]);

  useEffect(() => {
    if (dataInited) {
      getFilteredData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, author, created]);
  useEffect(() => {
    if (dataInited) {
      switchToPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  return (
    <div className={darkTheme ? "" : "light_theme"}>
      <div className="body_wrapper">
        <section className="container">
          <header className="header">
            <HeaderLogo darkTheme={darkTheme} clickAction={updateDarkTheme} />
            <div className="header__inputs">
              <input
                value={name}
                onChange={handleNameChange}
                onBlur={handleNameBlur}
                type="text"
                className="header__name"
                placeholder="Name"
              />
              <span className="header__arrow1">
                <img
                  src={
                    darkTheme
                      ? "./images/arrow.png"
                      : "./images/arrow light.jpg"
                  }
                  alt=""
                />
              </span>
              <SelectComponent
                titleFieldName="name"
                valueFieldName="id"
                options={authors}
                placeholder="Author"
                onValueChangeEvent={setAuthor}
              />
              <SelectComponent
                titleFieldName="location"
                valueFieldName="id"
                options={locations}
                placeholder="Location"
                onValueChangeEvent={setLocation}
              />
              {/* <SelectComponent
                titleFieldName="created"
                valueFieldName="created"
                options={createds}
                placeholder="Created"
                onValueChangeEvent={setCreated}
              /> */}
              <DateIntervalComponent handleDataChange={handleInvervalChange} />
              <span className="header__arrow2">
                <img
                  src={
                    darkTheme
                      ? "./images/arrow.png"
                      : "./images/arrow light.jpg"
                  }
                  alt=""
                />
              </span>
              <span className="header__arrow3">
                <img
                  src={
                    darkTheme
                      ? "./images/arrow.png"
                      : "./images/arrow light.jpg"
                  }
                  alt=""
                />
              </span>
            </div>
          </header>
          <main className="main">{galleryList}</main>
          <Pagination
            pages={pages}
            activePageId={currentPage}
            handleClick={eventClickPagination}
            darkTheme={darkTheme}
          />
        </section>
      </div>
    </div>
  );
}

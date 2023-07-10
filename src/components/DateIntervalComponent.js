import React, { useEffect, useState } from "react";

export default function DateIntervalComponent({ handleDataChange }) {
  const [opened, setOpened] = useState("");

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleStartChange = (event) => {
    setStart(event.target.value);
  };

  const handleEndChange = (event) => {
    setEnd(event.target.value);
  };

  const sendUpdates = () => {
    setOpened(!opened);
    handleDataChange(start, end);
  };
  const getLabel = () => {
    if (start || end) {
      return start + " - " + end;
    }
    return "Created";
  };
  return (
    <div className="created__wrapper">
      <input
        placeholder={getLabel()}
        readOnly
        className="header__location"
        onClick={() => sendUpdates()}
      />
      {opened && (
        <div class="created">
          <div class="from__before">
            <div class="from">
              <input
                value={start}
                onChange={handleStartChange}
                type="number"
                class="from__size"
                placeholder="from"
              />
            </div>
            <div class="line">
              <img src="./images/line.png" alt="" />
            </div>
            <div class="before">
              <input
                value={end}
                onChange={handleEndChange}
                type="number"
                class="befor__size"
                placeholder="before"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

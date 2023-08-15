import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const CardItem = ({ title, imageUrl, last_update, id }) => {
  return (
    <div className="flex p-2 bg-white ">
      <div className="flex md:w-[200px] h-[140px]">
        <img
          src={`${imageUrl}`}
          alt="Image"
          className="max-w-full h-auto rounded-[30px] md:w-[200px] "
        />
      </div>
      <div className="flex-1 flex-col">
        <div className="flex md:pl-[2px] pl-2 ml-4 w-[200px]">
          <p
            key={id}
            className="text-lg font-semibold mb-2"
            data-tooltip-id={`tooltip-${id}`}
            data-tooltip-content={title}
          >
            {title.length > 22 ? title.substring(0, 22) + "..." : title}
          </p>
          <Tooltip id={`tooltip-${id}`} content={title}>
            {title}
          </Tooltip>
        </div>
        <div className="flex md:pl-[2px] pl-2 ml-4">
          <p className="text-lg font-semibold mb-2 text-[grey]">
            {last_update}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardItem;

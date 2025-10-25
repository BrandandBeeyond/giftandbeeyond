import React from "react";
import { BeatLoader } from "react-spinners";

const Buttondice = ({ text, disabled, onClick, loading }) => {
  return (
    <div className="scene font-bruno">
      <div
        className={`cube cursor-pointer ${disabled ? "opacity-70" : ""}`}
        onClick={!disabled && !loading ? onClick : null}
      >
        {loading ? (
          <>
            <span className="side top flex justify-center items-center">
              <BeatLoader
                color="#fff"
                loading={true}
                size={8}
                speedMultiplier={0.8}
              />
            </span>
            <span className="side front flex justify-center items-center">
              <BeatLoader
                color="#fff"
                loading={true}
                size={8}
                speedMultiplier={0.8}
              />
            </span>
          </>
        ) : (
          <>
            {" "}
            <span class="side top">{text}</span>
            <span class="side front">{text}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Buttondice;

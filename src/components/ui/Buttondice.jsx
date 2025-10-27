import React from "react";
import { BeatLoader } from "react-spinners";

const Buttondice = ({ text, disabled, onClick, loading }) => {
  return (
    <div className="scene font-della">
      <div
        className={`cube cursor-pointer ${disabled ? "opacity-70" : ""}`}
        onClick={!disabled && !loading ? onClick : null}
      >
        <span className="side top text-sm flex items-center justify-center">
          {loading ? (
            <BeatLoader color="#fff" loading={true} size={8} speedMultiplier={0.8} />
          ) : (
            text
          )}
        </span>

        <span className="side front text-sm flex items-center justify-center">
          {loading ? (
            <BeatLoader color="#fff" loading={true} size={8} speedMultiplier={0.8} />
          ) : (
            text
          )}
        </span>
      </div>
    </div>
  );
};

export default Buttondice;

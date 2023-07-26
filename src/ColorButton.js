import React, { useState, useReducer, createContext } from "react";

const colors = ["red", "green", "blue", "black", "orange"];

const randomColor = (prevColor) => {
  const filteredColors =
    prevColor === "blue" ? colors.filter((color) => color !== "green") : colors;
  const randomIndex = Math.floor(Math.random() * filteredColors.length);
  return filteredColors[randomIndex];
};

const initialState = {
  currentColor: "red",
  previousColor: null,
  colorHistory: [],
};

const colorReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      const nextColor = randomColor(state.previousColor);
      return {
        currentColor: nextColor,
        previousColor: state.currentColor,
        colorHistory: [...state.colorHistory, state.currentColor],
      };
    default:
      return state;
  }
};

export const ColorContext = createContext();

const ColorButton = () => {
  const [state, dispatch] = useReducer(colorReducer, initialState);
  const { currentColor, colorHistory } = state;

  return (
    <ColorContext.Provider value={{ colorHistory }}>
      <div>
        <button
          style={{ backgroundColor: currentColor }}
          onClick={() => dispatch({ type: "CHANGE_COLOR" })}
        >
          Click me!
        </button>
        <div>
          Color history:{" "}
          {colorHistory.map((color, index) => (
            <span
              key={index}
              style={{ color: color, marginRight: "5px", fontWeight: "bold" }}
            >
              {color}
            </span>
          ))}
        </div>
      </div>
    </ColorContext.Provider>
  );
};

export default ColorButton;

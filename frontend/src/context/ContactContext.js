import { createContext, useReducer } from "react";

export const UploadsContext = createContext();

export const uploadsReducer = (state, action) => {
  switch (action.type) {
    case "GET_POST":
      return {
        postList: action.payload,
      };

    case "ADD_POST":
      return {
        postList: [action.payload, ...state.contacts],
      };

    case "DELETE_POST":
      return {
        postList: state.postList.filter(
          (post) => post._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

export const UploadsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uploadsReducer, {
    postList: null,
  });
  return (
    <UploadsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UploadsContext.Provider>
  );
};

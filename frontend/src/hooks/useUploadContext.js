import { UploadsContext } from "../context/ContactContext";

import { useContext } from "react";

export const useUploadContext = () => {
  const context = useContext(UploadsContext);

  if (!context) {
    throw new Error(
      "useUploadContext must be used within a ContactContextProvider"
    );
  }

  return context;
};

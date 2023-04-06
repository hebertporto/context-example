import React from "react";
import { UserSettingsProvider } from "./UserSettings/UserSettingsContext";

export const ContextProvider: React.FC = ({ children }) => {
  return (
    <>
      <UserSettingsProvider>{children}</UserSettingsProvider>
    </>
  );
};

import { UnitSystem } from "@app/@types/common";
import { getItem, setItem } from "@app/data/localStorage";
import React, { createContext, useContext, useReducer } from "react";
import { useQuery } from "react-query";

export type UserSettings = {
  unitSystem: UnitSystem;
  pushNotificationsEnabled: boolean;
};

type UserSettingsAction = {
  type: "UPDATE_SETTINGS";
  payload: Partial<UserSettings>;
};

const initialState: UserSettings = {
  unitSystem: "Metric",
  pushNotificationsEnabled: true,
};

const defaultDispatch: React.Dispatch<UserSettingsAction> = () => initialState;

const reducer = (
  state: UserSettings = initialState,
  action: UserSettingsAction
) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_SETTINGS":
      const newState = {
        ...state,
        ...payload,
      };
      setItem("@user_settings", JSON.stringify(newState));

      return newState;
    default:
      return state;
  }
};

export const UserSettingsContext = createContext({
  state: initialState,
  dispatch: defaultDispatch,
});

export const UserSettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useQuery("@user_settings", () => getItem("@user_settings"), {
    staleTime: Number.POSITIVE_INFINITY,
    onSuccess: async (res) => {
      dispatch({
        type: "UPDATE_SETTINGS",
        payload: res ? (JSON.parse(res) as UserSettings) : initialState,
      });
    },
    onError: (err) => {
      console.log("🚀 => getItem:@user_settings:error =>", err);
    },
  });

  return (
    <UserSettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </UserSettingsContext.Provider>
  );
};

export const useUserSettings = () => useContext(UserSettingsContext);

export const UserSettingsConsumer = UserSettingsContext.Consumer;

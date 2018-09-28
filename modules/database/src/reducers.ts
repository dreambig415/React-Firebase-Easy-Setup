import { produce } from "immer";
import { FirebaseDatabaseNodeState, FirebaseDatabaseNodeProps } from "./types";

const dataNodeProps = [
  "firebase",
  "path",
  "orderByChild",
  "orderByKey",
  "orderByValue",
  "limitToFirst",
  "limitToLast",
  "startAt",
  "endAt",
  "equalTo",
  "keysOnly",
  "once",
  "isList",
  "unsub"
] as Array<keyof FirebaseDatabaseNodeProps>;

export const getPropsOrNull = (props: FirebaseDatabaseNodeProps) => {
  const cleanProps = {} as FirebaseDatabaseNodeProps;
  for (let propName of dataNodeProps) {
    if (props[propName]) {
      cleanProps[propName] = props[propName];
    } else {
      cleanProps[propName] = null;
    }
  }
  return cleanProps;
};

export const havePropsChanged = (
  prevProps: FirebaseDatabaseNodeProps,
  props: FirebaseDatabaseNodeProps
) => {
  for (let propName of dataNodeProps) {
    if (props[propName] !== prevProps[propName]) {
      return true;
    }
  }
  return false;
};

export const hasStateChanged = (
  prevState: FirebaseDatabaseNodeState,
  state: FirebaseDatabaseNodeState
) => {
  const keysICareAbout = ["firebase", "value", "isLoading", "path"] as Array<
    keyof FirebaseDatabaseNodeState
  >;
  for (let propName of keysICareAbout) {
    if (state[propName] !== prevState[propName]) {
      return true;
    }
  }
  return false;
};

export const reducers = {
  setIsLoading: (isLoading: boolean) => (state: FirebaseDatabaseNodeState) =>
    produce(state, draft => {
      draft.isLoading = isLoading;
    }),
  setValue: (value: any) => (state: FirebaseDatabaseNodeState) =>
    produce(state, draft => {
      draft.value = value;
    }),
  setPath: (path: string) => (state: FirebaseDatabaseNodeState) =>
    produce(state, draft => {
      draft.path = path;
    }),
  addToList: (value: any, key: string) => (state: FirebaseDatabaseNodeState) =>
    produce(state, draft => {
      if (!Array.isArray(draft.value)) {
        draft.value = [{ data: value, key }];
        return;
      }
      draft.value = [
        ...draft.value.filter(v => v.key !== key),
        { data: value, key }
      ];
    }),
  clearList: () => (state: FirebaseDatabaseNodeState) =>
    produce(state, draft => {
      draft.value = [];
    }),

  removeFromList: (value: any, key: string) => (
    state: FirebaseDatabaseNodeState
  ) =>
    produce(state, draft => {
      console.warn("removing from list ", value);
      if (!Array.isArray(draft.value)) {
        draft.value = [];
        return;
      }
      draft.value = draft.value.filter(v => v.key !== key);
    })
};
export const isObject = (value: any) =>
  typeof value === "object" && value !== null;

import * as React from "react";
import * as firebase from "firebase";
import { FirebaseDatabaseProviderState, FirebaseQuery } from "./types";

export const firebaseDatabaseDefaultContext = {
  listenTo: ({  }: FirebaseQuery) => {},
  stopListeningTo: (path: string) => {},
  dataTree: {},
  firebase
} as FirebaseDatabaseProviderState;

export const {
  Provider: FirebaseDatabaseContextProvider,
  Consumer: FirebaseDatabaseContextConsumer
} = React.createContext(firebaseDatabaseDefaultContext);

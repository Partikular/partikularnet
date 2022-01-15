import { combineReducers } from "redux";
import { firebaseReducer, FirebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import navButton from "./content/reducer";
import { DBUser } from "../types/db";

type FirestoreData<T> = Record<string, T>;

interface FirestoreState {
  data: {
    users?: FirestoreData<DBUser>;
  };
  ordered: {};
  composite: {};
  errors: {
    byQuery: {
      [queryId: string]: any;
    };
    allIds: any[];
  };
  [id: string]: any;
}

interface State {
  firebase: FirebaseReducer.Reducer<DBUser>;
  firestore: any;
  navButton: NavLinkButtonBackgroundPosState;
}

export const rootReducer = combineReducers<State>({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  navButton,
});

export type RootState = ReturnType<typeof rootReducer>;

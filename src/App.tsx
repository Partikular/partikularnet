import Pages from "./components/Pages";
import { Toaster } from "react-hot-toast";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { RootState } from "./store";

const App = () => {
  return (
    <>
      <Pages />
      <Toaster position="bottom-center" />
    </>
  );
};

// pass todos list from redux as props.todosList
export default compose(
  connect((state: RootState) => ({
    articles: state.firestore.data.articles,
  })),
  firestoreConnect(() => ["articles"])
)(App) as any;

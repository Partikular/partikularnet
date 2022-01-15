import { Wrapper } from "./EditorStyles";
import Document from "./Document";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const Editor: React.FC = () => {
  const location = useLocation();
  const articleId = new URLSearchParams(location.search).get("articleId");

  const article = useSelector((state: RootState) =>
    "articles" in state.firestore.data
      ? state.firestore.data.articles[`${articleId}`]
      : "loading"
  );

  return (
    <Wrapper>
      {article === "loading" ? (
        <div>Laddar artikeln...</div>
      ) : (
        <Document article={article} articleId={articleId} />
      )}
    </Wrapper>
  );
};

export default Editor;

import { useNavigate } from "react-router";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { useFirestore } from "react-redux-firebase";
import { db } from "../../lib/firebase";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import Modal from "../Modal";

const ArticleListActionBar = () => {
  const { uid, displayName } = useSelector(
    (state: RootState) => state.firebase.auth
  );

  const navigate = useNavigate();

  const firestore = useFirestore();

  const createNewArticle = async () => {
    const newArticle = db.collection("articles").doc();
    const { id: articleId } = newArticle;
    newArticle.set({
      title: "Ny artikel",
      content: [
        {
          element: "Paragraph",
          id: uuid(),
          type: "text",
          value: "dwawaw",
        },
      ],
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp(),
      deadline: null,
      lastUpdatedBy: uid,
      createdBy: uid,
      authors: { [uid]: { name: displayName } },
      feedback: null,
      editingStatus: "Utkast",
      published: false,
    });
    navigate(`/editor?articleId=${articleId}`);
  };
  return (
    <Wrapper>
      <Container>
        <TopCover />
        <ActionsContainer>
          <h2 style={{ margin: 0 }}>Artiklar</h2>
          <button onClick={createNewArticle}>Ny artikel</button>
        </ActionsContainer>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
  top: 30px;
  z-index: 1;
`;

const Container = styled.div`
  background: white;
  box-shadow: 0 5px 10px 0px #9c9c9c25;
  height: 60px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 10px 20px;
`;

const TopCover = styled.div`
  position: absolute;
  top: -30px;
  z-index: -1;
  left: 0;
  height: 60px;
  width: 100%;
  background: #f2fcfb;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export default ArticleListActionBar;

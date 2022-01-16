import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { db } from "../../lib/firebase";
import { RootState } from "../../store";
import ArticleListActionBar from "./ArticleListActioBar";
import ArticleListItem from "./ArticleListItem";

const ArticleList = () => {
  const articles = useSelector(
    (state: RootState) => state.firestore.data.articles
  );

  const articleList = articles
    ? Object.keys(articles).map((articleId: string) => ({
        ...articles[articleId],
        articleId,
      }))
    : [];

  /*     .sort(
      (a: any, b: any) =>
        // @ts-ignore
        new Date(b.updatedAt.seconds) - new Date(a.updatedAt.seconds)
    ) */

  const [filterSetting, setFilterSetting] = useState<string>("");

  return (
    <Container>
      <ArticleListActionBar />
      {articleList.length < 1 ? (
        "Laddar artiklarna..."
      ) : (
        <ArticlesList>
          {articleList
            .filter((article: any) => article)
            .map((article: any, index) => (
              <ArticleListItem key={article.articleId} article={article} />
            ))}
        </ArticlesList>
      )}
    </Container>
  );
};

const Container = styled.div`
  background: white;
  border-radius: 20px;
`;

const ArticlesList = styled.ul`
  padding: 10px 20px;
  margin: 0;
`;

export default ArticleList;

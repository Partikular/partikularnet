import styled, { css } from "styled-components";
import { Edit } from "@styled-icons/fluentui-system-filled/Edit";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Margin } from "../common";

const Section = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.125rem;
`;

const Caption = styled.p`
  color: #8c9b9a;
  margin: 0;
`;

const ArticleSection: React.FC<{ caption: string; info: string }> = ({
  caption,
  info,
}) => {
  return (
    <Section>
      <Caption> {caption} </Caption>
      <ArticleListItemTitle> {info} </ArticleListItemTitle>
    </Section>
  );
};

const ArticleListItemTitle = styled.p`
  font-weight: 500;
  margin: 0;
  max-width: 230px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Icon = () => {
  return (
    <IconWrapper>
      <EditIconContainer>
        <Edit size={30} />
      </EditIconContainer>
    </IconWrapper>
  );
};

const IconWrapper = styled.div`
  width: 54px;
`;

const EditIconContainer = styled.div`
  position: relative;
  margin-top: -5px;
  color: #0eec97;
  &:after {
    content: "";
    background: #0eec97;
    position: absolute;
    bottom: -5px;
    left: 3px;
    width: 30px;
    height: 5px;
    border-radius: 10px;
    border-top-left-radius: 0;
  }
`;

const ArticleListitem: React.FC<{ article: any }> = ({ article }) => {
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState<boolean>(false);

  const parsedDeadline = () => {
    if (!("deadline" in article)) return "Ingen deadline";
    let deadline = new Date(
      article.deadline?.seconds * 1000
    ).toLocaleDateString("sv", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    return deadline;
  };

  return (
    <div>
      <Container
        onClick={() => navigate(`/editor?articleId=${article.articleId}`)}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        isActive={isActive}
        key={article.articleId}
      >
        <Icon />
        {/* TODO: fix flex: 54px 1 1 auto; */}
        <div style={{ width: 250 }}>
          <ArticleSection caption="Titel" info={article.title} />
        </div>
        <ArticleSection caption="Deadline" info={parsedDeadline()} />
        <div style={{ marginLeft: "auto" }}></div>
      </Container>
    </div>
  );
};

const Container = styled.li<{ isActive: boolean }>`
  ${({ isActive }) => css`
    display: flex;

    cursor: pointer;
    transition: ease-in-out 0.1s all;
    height: 40px;
    align-items: center;
    background: white;
    box-shadow: ${isActive
      ? "0 5px 10px 0px #9c9c9c50"
      : "0 5px 10px 0px #9c9c9c25"};
    list-style: none;
    padding: 20px;
    margin: 15px 0;
    border-radius: 10px;
    border-left: 10px solid #0eec97;
  `}
`;

export default ArticleListitem;

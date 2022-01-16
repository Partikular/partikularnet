import { motion } from "framer-motion";
import { pageTransitions } from "../../lib/transitions";
import { Margin } from "../common";
import { PageTitle } from "../CommonStyledComponents";
import ArticleList from "./ArticleList";

const ArticleView = () => {
  return (
    <motion.div
      initial="initial"
      exit="out"
      animate="in"
      variants={pageTransitions}
    >
      <PageTitle>Artikelvyn</PageTitle>
      <Margin y={30} />
      <ArticleList />
    </motion.div>
  );
};

export default ArticleView;

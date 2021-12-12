import { motion } from "framer-motion";
import styled from "styled-components";
import { pageTransitions } from "../../lib/transitions";
import Card from "../card/Card";
import { PageTitle } from "../CommonStyledComponents";

const Dashboard = () => {
  return (
    <motion.div
      initial="initial"
      exit="out"
      animate="in"
      variants={pageTransitions}
    >
      <PageTitle>Aktivitetscentrum</PageTitle>
      <StatsSection>
        <Card header>
          <h2>Hello world</h2>
        </Card>
      </StatsSection>
    </motion.div>
  );
};

const StatsSection = styled.div`
  padding-top: 20px;
  font-weight: 400;
`;

export default Dashboard;

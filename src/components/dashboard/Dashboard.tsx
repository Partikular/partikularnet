import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { pageTransitions } from "../../lib/transitions";
import { RootState } from "../../store";
import Card from "../card/Card";
import { Margin } from "../common";
import { PageTitle } from "../CommonStyledComponents";

const Dashboard = () => {
  const { uid, displayName } = useSelector(
    (state: RootState) => state.firebase.auth
  );

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
          <h2 style={{ display: "flex", alignItems: "center" }}>
            Tjena {displayName?.split(" ")[0]} <Margin x={10} />
            <span style={{ fontSize: "2rem" }}>👋</span>
          </h2>
          <h2 style={{ fontWeight: 500 }}>
            Här kan du se allt det senaste på Partikular!
          </h2>
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

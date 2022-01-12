import { Wrapper } from "./EditorStyles";
import { Logo } from "../common";
import Document from "./Document";

const Editor = () => {
  return (
    <Wrapper>
      <Logo
        style={{ position: "absolute", zIndex: 10000, top: 60, left: 60 }}
        src="/assets/logo.png"
        alt=""
      />
      <Document />
    </Wrapper>
  );
};

export default Editor;

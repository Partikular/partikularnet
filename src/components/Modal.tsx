import { useRef } from "react";
import styled from "styled-components";

// TODO: find a solution where this can be called anywhere

const Modal: React.FC = ({ children }) => {
  const modalRef = useRef<any>();

  console.log(modalRef);

  // @ts-ignore
  console.log(modalRef.current?.getBoundingClientRect().top);

  console.log();

  return (
    <ModalWrapper ref={modalRef}>
      <ModalContainer>
        <h1>Hello World</h1>
        {children}
      </ModalContainer>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10000;
  background: #00000025;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 30px;
`;

export default Modal;

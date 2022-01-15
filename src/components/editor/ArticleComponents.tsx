import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";

// Canvas and wrapper

export const EditorContainer = styled.div`
  display: grid;
  grid-template-rows: 80px 1fr auto;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: white;
`;

export const Canvas = styled.form`
  width: 740px;
  top: 180px;
  position: relative;
  height: 200vh;
`;

/* 
const StyledTextarea = styled.textarea`
  font-family: Roboto;
  font-size: 1.3125rem;
  resize: none;
  outline: none;
  border: none;
  margin: 18px 0;
  width: 100%;
`; */

// Helper components

/* const AutoSizeTextArea = React.forwardRef<
  HTMLTextAreaElement,
  GeneralComponentProps
>(
  (
    { onFocus, onChange }: GeneralComponentProps,
    ref: React.ForwardedRef<HTMLTextAreaElement>
  ): JSX.Element => {
    // Couldn't get forwardRef to work => indirectly grab textarea component form container. Also adds row structure.
    const inputContainerRef = useRef<any>(null);

    useEffect(() => {
      autoSize(inputContainerRef?.current?.children[0]);
    }, []);

    const autoSize = (el: any) => {
      el.style.height = "5px"; // Resets it to 5px
      el.style.height = `${el.scrollHeight}px`; // Sets the height to the textareas scrollHeight i.e. the height for each new row with content
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter") {
        // Prevent the a new field to be created
        e.preventDefault();
      }
    };

    return (
      <div ref={inputContainerRef}>
        <StyledTextarea
          placeholder={
            inputContainerRef?.current?.children[0].length > 0
              ? "Skriv din text här..."
              : ""
          }
          onFocus={onFocus}
          onChange={() => {
            autoSize(inputContainerRef?.current?.children[0]);
            onChange();
          }}
          onKeyPress={(e: React.KeyboardEvent<HTMLTextAreaElement>) =>
            handleKeyPress(e)
          }
          ref={ref}
        />
      </div>
    );
  }
); */

// Content components

export const ArticleTitle = styled.h1`
  ${() => css`
    font-size: 2.626rem;
    outline: none;
  `}
`;

interface GeneralComponentProps {
  onFocus: () => void;
  onChange: () => void;
  onInput: () => void;
}

export const Paragraph = React.forwardRef<
  HTMLParagraphElement,
  GeneralComponentProps
>(
  (
    { onFocus, onChange, onInput }: GeneralComponentProps,
    ref: React.ForwardedRef<HTMLParagraphElement>
  ): JSX.Element => {
    return (
      <p
        style={{
          fontFamily: "Roboto",
          fontSize: "1.3125rem",
          resize: "none",
          outline: "none",
          border: "none",
          margin: "18px 0",
          width: "100%",
        }}
        onFocus={onFocus}
        onChange={onChange}
        // @ts-ignore
        onInput={onInput}
        ref={ref}
        contentEditable="true"
      />
    );
  }
);

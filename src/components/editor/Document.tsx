import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  EditorContainer,
  Canvas,
  ArticleTitle,
  Paragraph,
} from "./ArticleComponents";
import { v4 as uuid } from "uuid";
import { ArticleContentItem } from "../../types/db";
import { UserContext } from "../../lib/context";

const Document = () => {
  const {
    user: { uid },
  } = useContext(UserContext);
  const [activeElement, setActiveElement] = useState<number>(0);
  const elementsRef = useRef<HTMLTextAreaElement[]>([]);

  const components = {
    Paragraph,
  };

  const [data, setData] = useState<ArticleContentItem[]>([
    {
      id: uuid(),
      type: "text",
      element: "Paragraph",
      content: "Sample text",
    },
  ]);

  console.log(data);

  const handleChange = () => {
    let newData: ArticleContentItem[] = [...data];

    newData[activeElement].content = elementsRef.current[activeElement].value;

    // Set the new data to match the element value
    setData(newData);
  };

  const reassignTextAfterNewEl = (e: React.KeyboardEvent) => {
    // Get current active element
    // TODO: type this better
    const el: any = elementsRef.current[activeElement];

    // @ts-ignore
    const { selectionStart, selectionEnd } = e.target;

    const textBeforeCursor = el.value.substring(0, selectionStart);
    const textAfterCursor = el.value.substring(selectionEnd, el.value.length);

    let newData: ArticleContentItem[] = [...data];

    newData[activeElement].content = textBeforeCursor;

    // Set the new data to match the element value
    setData(newData);
    // Update DOM
    elementsRef.current[activeElement].value = textBeforeCursor;

    // Return the text after cursor to set the next elements value
    return textAfterCursor;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // If nothing is selected => ignore
    if (!(typeof activeElement === "number")) return null;

    if (e.code === "Enter") {
      let newContent: ArticleContentItem = {
        id: uuid(),
        type: "text",
        element: "Paragraph",
        content: "",
      };

      if (data[activeElement].type === "text") {
        newContent.content = reassignTextAfterNewEl(e);
      }

      let newData: ArticleContentItem[] = [...data];

      // New insert item
      newData.splice(activeElement + 1, 0, newContent);

      setData(newData);

      console.log(activeElement);

      // Update DOM el focus at next tick after state has been updated
      process.nextTick(() => {
        elementsRef.current[activeElement + 1].focus();
      });
    }

    if (elementsRef.current[activeElement + 1] && e.code === "ArrowDown") {
      elementsRef.current[activeElement + 1].focus();
    }
    if (elementsRef.current[activeElement - 1] && e.code === "ArrowUp") {
      elementsRef.current[activeElement - 1].focus();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    // If nothing is selected => ignore
    if (!(typeof activeElement === "number")) return null;

    // Delete text and
    if (
      e.code === "Backspace" &&
      activeElement > 0 &&
      elementsRef.current[activeElement].value.length === 0
    ) {
      let newData: ArticleContentItem[] = [...data];

      // Select the item before
      elementsRef.current[activeElement - 1].focus();

      // Remove item
      newData.splice(activeElement, 1);

      setData(newData);
    }
  };

  // Assign values to all data when loaded in
  useEffect(() => {
    if (elementsRef && data) {
      data.forEach((item, index) => {
        elementsRef.current[index].value = item.content;
      });
    }
  }, []);

  // TODO: better way?
  // Update the focused element with the data corresponding to its index if it is a text type
  useEffect(() => {
    if (data[activeElement].type === "text") {
      elementsRef.current[activeElement].value = data[activeElement].content;
    }
  }, [activeElement]);

  // TODO: Check if context can be used here to simplify

  return (
    <EditorContainer>
      <Canvas
        onSubmit={(e: any) => e.preventDefault()}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      >
        <ArticleTitle />
        {data.map((item, index) => {
          // @ts-ignore
          const Component = components[item.element];

          return (
            <Component
              key={item.id}
              ref={(el: HTMLTextAreaElement) =>
                (elementsRef.current[index] = el)
              }
              onChange={handleChange}
              onFocus={() => setActiveElement(index)}
            />
          );
        })}
      </Canvas>
    </EditorContainer>
  );
};

export default Document;

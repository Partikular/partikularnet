import React, { useEffect, useRef, useState } from "react";
import {
  EditorContainer,
  Canvas,
  ArticleTitle,
  Paragraph,
} from "./ArticleComponents";
import { v4 as uuid } from "uuid";
import { ArticleContentItem } from "../../types/db";
import ActionsBar from "./ActionsBar";
import { useFirestore } from "react-redux-firebase";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { db } from "../../lib/firebase";

const components = {
  Paragraph,
};

interface DocumentProps {
  article?: any;
  articleId: string | null;
}

const Document: React.FC<DocumentProps> = ({ article, articleId }) => {
  const firestore = useFirestore();
  const uid = useSelector((state: RootState) => state.firebase.auth.uid);

  const [activeElement, setActiveElement] = useState<number>(0);
  const elementsRef = useRef<any[]>([]);

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [data, setData] = useState<ArticleContentItem[]>(
    article
      ? article.content.map((item: ArticleContentItem) =>
          Object.assign({}, item)
        )
      : [
          {
            id: uuid(),
            type: "text",
            element: "Paragraph",
            value: "Sample",
          },
        ]
  );

  const handleChange = () => {
    let newData: ArticleContentItem[] = [...data];

    newData[activeElement].value = elementsRef.current[activeElement].innerText;

    // Set the new data to match the element value
    setData(newData);
    console.log(data);
  };

  const reassignTextAfterNewEl = (e: React.KeyboardEvent) => {
    // Get current active element
    // TODO: type this better
    const el: any = elementsRef.current[activeElement];

    const cursorPos = window.getSelection()?.focusOffset;

    const textBeforeCursor = el.innerText.substring(0, cursorPos);
    const textAfterCursor = el.innerText.substring(
      cursorPos,
      el.innerText.length
    );

    let newData: ArticleContentItem[] = [...data];

    newData[activeElement].value = textBeforeCursor;

    // Set the new data to match the element value
    setData(newData);
    // Update DOM
    elementsRef.current[activeElement].innerText = textBeforeCursor;

    // Return the text after cursor to set the next elements value
    return textAfterCursor;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // If nothing is selected => ignore
    if (!(typeof activeElement === "number")) return null;

    if (e.code === "Enter") {
      e.preventDefault();
      let newvalue: ArticleContentItem = {
        id: uuid(),
        type: "text",
        element: "Paragraph",
        value: "",
      };

      if (data[activeElement].type === "text") {
        newvalue.value = reassignTextAfterNewEl(e);
      }

      let newData: ArticleContentItem[] = [...data];

      // New insert item
      newData.splice(activeElement + 1, 0, newvalue);

      setData(newData);

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
      elementsRef.current[activeElement].innerText.length === 0
    ) {
      let newData: ArticleContentItem[] = [...data];

      // Select the item before
      elementsRef.current[activeElement - 1].focus();

      // Remove item
      newData.splice(activeElement, 1);

      setData(newData);
    }
  };

  const handleTitle = (e: any) => {
    setTitle(e.target.innerText);
  };

  const saveArticle = async () => {
    if (!articleId) return null;
    const articleUpdates = {
      title,
      content: data,
      updatedAt: firestore.FieldValue.serverTimestamp(),
      lastUpdatedBy: uid,
    };
    setIsSaving(true);
    await db.collection("articles").doc(articleId).update(articleUpdates);
    setIsSaving(false);
  };

  // Assign values to all data when loaded in
  useEffect(() => {
    if (elementsRef && data) {
      data.forEach((item, index) => {
        elementsRef.current[index].innerText = item.value;
      });
    }
  }, []);

  return (
    <EditorContainer>
      <ActionsBar>
        <button disabled={isSaving} onClick={saveArticle}>
          {isSaving ? "Sparar..." : "Spara"}
        </button>
      </ActionsBar>
      <Canvas
        onSubmit={(e: any) => e.preventDefault()}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      >
        {/* @ts-ignore */}
        <ArticleTitle
          contentEditable="true"
          onInput={handleTitle}
          placeholder="Skriv din titel..."
        />
        {data.map((item, index) => {
          // @ts-ignore
          const Component = components[item.element];

          return (
            <Component
              key={item.id}
              ref={(el: any) => (elementsRef.current[index] = el)}
              onChange={handleChange}
              onInput={handleChange}
              onFocus={() => setActiveElement(index)}
            />
          );
        })}
      </Canvas>
    </EditorContainer>
  );
};

export default Document;

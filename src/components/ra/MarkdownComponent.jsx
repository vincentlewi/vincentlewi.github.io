import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import RANavbar from './RANavbar'
// import "./App.css"; // Make sure your custom CSS is imported

const MarkdownComponent = ({ filePath }) => {
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    if (filePath) {
      fetch(filePath)
        .then((response) => response.text())
        .then((text) => setMarkdownContent(text))
        .catch((error) => console.error("Error loading Markdown file:", error));
    }
  }, [filePath]);

  return (
    <>
    <RANavbar currentPath={window.location.hash.substring(1)} />
    <div className="medium-markdown">
      <Markdown remarkPlugins={[remarkGfm]}>{markdownContent}</Markdown>
    </div>
    </>
  );
};

export default MarkdownComponent;

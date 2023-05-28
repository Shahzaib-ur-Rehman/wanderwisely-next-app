import React, { useEffect, useState } from "react";
const regexConetnt =
  /(Morning|Afternoon|Night)\s*-\s*([\s\S]*?)(?=(Morning|Afternoon|Night)|$)/g;

const Content = ({ content }) => {
  const [Description, setDescription] = useState();
  useEffect(() => {
    if (content) {
      const matches = content.matchAll(regexConetnt);
      const sections = [];
      for (const match of matches) {
        const section = {
          time: match[1],
          content: match[2].trim(),
        };
        sections.push(section);
      }
      setDescription(sections);
    }
  }, [content]);

  console.log(Description);
  return (
    <div>
      <h2 className="text-center">
        <strong>DAY 1 : </strong>
        <small className="text-center">MAY 28</small>
      </h2>
    </div>
  );
};

export default Content;

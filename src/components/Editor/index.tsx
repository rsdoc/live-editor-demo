import copy from "copy-to-clipboard";
import theme from "prism-react-renderer/themes/vsDark";
import React, { useEffect, useState } from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";

const scope = {
  ...React,
  // any module which you want to have access to like, Chakra
};

export default function Editor({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const [editorCode, setEditorCode] = useState(code);

  useEffect(() => {
    if (copied && editorCode) {
      copy(editorCode);
    }

    const timeoutId = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [copied]);

  const handleEditorChange = (newCode: string) => {
    setEditorCode(newCode);
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-3xl mx-auto space-y-2">
      <LiveProvider code={editorCode} theme={theme} scope={scope}>
        <LivePreview className="border border-gray-300 rounded-md p-2 w-full" />
        <div className="relative p-2 rounded-md bg-[#1E1E1E] flex flex-col items-center justify-center w-full">
          <button
            className="uppercase bg-teal-600 text-gray-100 px-2 hover:bg-teal-500 py-1 rounded-md absolute top-3 right-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            onClick={() => setCopied(true)}
          >
            {copied ? "Code Copied ..." : "Copy"}
          </button>
          <p className="text-gray-400 text-sm uppercase text-center font-bold tracking-wider">
            EDITABLE
          </p>
          <LiveEditor className="py-2 w-full" onChange={handleEditorChange} />
        </div>
        <LiveError className="text-gray-50 w-full bg-red-500 rounded-md p-2" />
      </LiveProvider>
    </div>
  );
}

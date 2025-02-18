'use client'
import CodeEditor from './components/Editor';

export default function Home() {
  const handleEditorChange = (value: string | undefined) => {
    console.log('Code changed:', value);
  };

  return (
    <div className="w-full h-screen p-4">
      <CodeEditor
        // defaultLanguage="javascript"
        // defaultValue="// Write your code here"
        onChange={handleEditorChange}
      />
    </div>
  );
}

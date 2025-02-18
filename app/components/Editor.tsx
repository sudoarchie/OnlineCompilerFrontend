'use client'
import { Editor } from '@monaco-editor/react';
import { useState } from 'react';

interface CodeEditorProps {
  onChange?: (value: string | undefined) => void;
}

const LANGUAGES = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'cpp', name: 'C++' },
  { id: 'csharp', name: 'C#' },
] as const;

export default function CodeEditor({ onChange }: CodeEditorProps) {
  const [selectedLang, setSelectedLang] = useState<string>(LANGUAGES[0].id);
  const [code, setCode] = useState<string>('// Start coding here');

  const handleRunCode = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/compiler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: selectedLang,
          code: code,
        }),
      });
      
      const data = await response.json();
      console.log('Compilation result:', data);
    } catch (error) {
      console.error('Error running code:', error);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)]">
      <div className="flex justify-between items-center mb-4 p-2 bg-gray-800 rounded-t">
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
        
        <button
          onClick={handleRunCode}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded transition-colors"
        >
          Run Code
        </button>
      </div>

      <div className="flex-grow">
        <Editor
          height="100%"
          language={selectedLang}
          value={code}
          theme="vs-dark"
          onChange={(value) => {
            setCode(value || '');
            onChange?.(value);
          }}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            wordWrap: "on",
            folding: true,
            lineNumbersMinChars: 3,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
} 
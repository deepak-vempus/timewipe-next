"use client";

import { useState, useRef } from "react";
import { removeTimestamps } from "../utils/timestampRemover";

interface TranscriptCleanerProps {
  title?: string;
  description?: string;
  placeholder?: string;
  inputLabel?: string;
  fileLabel?: string;
}

export default function TranscriptCleaner({
  title = "Remove timestamps from transcripts",
  description = "Remove timestamps from video transcripts or any type of text file with ease. Simply copy & paste or upload your text files, then hit the Clean timestamps button to do the job.",
  placeholder = "Paste your transcript here...",
  inputLabel = "Paste your text with timestamps here:",
  fileLabel = "Or, choose a text file with timestamps:",
}: TranscriptCleanerProps = {}) {
  const [inputText, setInputText] = useState("");
  const [cleanedText, setCleanedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedExtensions = [".txt", ".srt", ".vtt", ".sbv"];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf("."));
    const isValidType = file.type === "text/plain" || 
                       file.type === "text/vtt" || 
                       file.type === "text/srt" ||
                       allowedExtensions.includes(fileExtension);

    if (!isValidType) {
      alert("Please upload a supported transcript file (.txt, .srt, .vtt, or .sbv)");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setInputText(content);
    };
    reader.onerror = () => {
      alert("Error reading file. Please try again.");
    };
    reader.readAsText(file);
  };

  const handleClean = () => {
    if (!inputText.trim()) {
      alert("Please paste text or upload a file first");
      return;
    }

    setIsProcessing(true);
    // Small delay to show processing state (timestamp removal is instant)
    setTimeout(() => {
      const cleaned = removeTimestamps(inputText);
      setCleanedText(cleaned);
      setIsProcessing(false);
    }, 100);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanedText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      alert("Failed to copy text. Please try again.");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([cleanedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const now = new Date();
    const dateStr = now.toISOString().replace(/[:.]/g, "-").slice(0, -5); // Format: YYYY-MM-DDTHH-MM-SS
    const filename = `cleaned-transcript-${dateStr}.txt`;
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInputText("");
    setCleanedText("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleLoadSample = () => {
    const sampleText = `[00:00] Welcome to this sample transcript.
[00:05] This is how timestamps appear in various formats.
[00:10] Some transcripts use brackets.
00:25 Some use simple format without brackets.
00:30:45 Others include seconds and milliseconds.
[00:35:50] You can see different timestamp patterns here.
00:40:00 This helps test the timestamp removal feature.
[00:45] After cleaning, you'll have just the text.
00:50:15 Without any timestamp interference.`;
    setInputText(sampleText);
    setCleanedText("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-[#2d1f14] mb-4">
        {title}
      </h1>

      {/* Description */}
      <p className="text-lg text-[#4a3c2f] mb-8 max-w-2xl">
        {description}
      </p>

      {/* Input Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#2d1f14] mb-2">
          {inputLabel}
        </label>
        <textarea
          id="transcript-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg bg-white text-[#2d1f14] resize-y focus:outline-none focus:ring-2 focus:ring-[#e07a5f] focus:border-transparent shadow-sm"
          aria-label={inputLabel}
        />
      </div>

      {/* File Upload */}
      <div className="mb-6">
        <label htmlFor="file-upload" className="block text-sm font-medium text-[#2d1f14] mb-2">
          {fileLabel}
        </label>
        <input
          id="file-upload"
          ref={fileInputRef}
          type="file"
          accept=".txt,.srt,.vtt,.sbv,text/plain,text/vtt"
          onChange={handleFileUpload}
          className="block w-full text-sm text-[#2d1f14] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#e07a5f] file:text-white hover:file:bg-[#d4694e] cursor-pointer"
          aria-label={fileLabel}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={handleClean}
          disabled={isProcessing || !inputText.trim()}
          className="flex-1 px-6 py-3 bg-[#e07a5f] text-white font-semibold rounded-lg hover:bg-[#d4694e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          aria-label="Clean timestamps from transcript"
          aria-busy={isProcessing}
        >
          {isProcessing ? "Cleaning..." : "Clean timestamps"}
        </button>
        {inputText && (
          <button
            onClick={handleClear}
            className="px-6 py-3 border border-gray-300 text-[#2d1f14] font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            aria-label="Clear all text"
          >
            Clear
          </button>
        )}
      </div>

      {/* Sample Button */}
      {!inputText && (
        <div className="mb-8 text-center">
          <p className="text-xs text-gray-500">
            Don&apos;t have a file yet?{" "}
            <span
              onClick={handleLoadSample}
              className="text-gray-600 hover:text-[#e07a5f] underline cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleLoadSample();
                }
              }}
              aria-label="Load sample transcript"
            >
              Try with a sample
            </span>
          </p>
        </div>
      )}

      {/* Output Section */}
      {cleanedText && (
        <div className="mb-6">
          <label htmlFor="cleaned-output" className="block text-sm font-medium text-[#2d1f14] mb-2">
            Cleaned text:
          </label>
          <textarea
            id="cleaned-output"
            value={cleanedText}
            readOnly
            className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg bg-white text-[#2d1f14] resize-y focus:outline-none shadow-sm"
            aria-label="Cleaned transcript without timestamps"
          />
        </div>
      )}

      {/* Copy and Download Buttons */}
      {cleanedText && (
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleCopy}
            className="flex-1 px-6 py-3 bg-[#e07a5f] text-white font-semibold rounded-lg hover:bg-[#d4694e] transition-colors shadow-sm"
            aria-label="Copy cleaned text to clipboard"
            aria-live="polite"
          >
            {copySuccess ? "✓ Copied!" : "Copy cleaned text"}
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 px-6 py-3 border border-gray-300 text-[#2d1f14] font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            aria-label="Download cleaned text as file"
          >
            Download
          </button>
        </div>
      )}

      {/* Privacy/Footer note */}
      {cleanedText && (
        <p className="text-sm text-gray-600 mt-6">
          Your text is processed locally in your browser. No data is sent to any server.
        </p>
      )}
    </div>
  );
}


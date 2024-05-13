import React, { useState, useEffect } from "react";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

function VoiceTranscription() {
  const [transcript, setTranscript] = useState("");
  const [isRecognitionStarted, setIsRecognitionStarted] = useState(false);

  useEffect(() => {
    try {
      if (!isRecognitionStarted) {
        recognition.start();
        setIsRecognitionStarted(true);
      }
    } catch (error) {
      console.error("Speech recognition error:", error);
    }

    recognition.onresult = (event) => {
      const transcriptText = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      const highlightedText = transcriptText.replace(/(create|delete)/gi, (match) => `<span style="background-color: yellow;">${match}</span>`);
      setTranscript(highlightedText);
    };

    return () => {
      recognition.stop();
      setIsRecognitionStarted(false);
    };
  }, [isRecognitionStarted]);

  return <div style={{ position: "absolute", bottom: "10px", left: "10px", background: "white", padding: "10px", borderRadius: "5px", zIndex: 10 }} dangerouslySetInnerHTML={{ __html: transcript }} />;
}

export default VoiceTranscription;

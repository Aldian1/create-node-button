import React, { useState, useEffect } from "react";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;

function VoiceTranscription() {
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    recognition.start();

    recognition.onresult = (event) => {
      const transcriptText = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setTranscript(transcriptText);
    };

    return () => {
      recognition.stop();
    };
  }, []);

  return <div style={{ position: "absolute", bottom: "10px", left: "10px", background: "white", padding: "10px", borderRadius: "5px", zIndex: 10 }}>{transcript}</div>;
}

export default VoiceTranscription;

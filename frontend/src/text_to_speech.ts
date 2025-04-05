export default function speak(
    text: string,
    options: {
      lang?: string;
      rate?: number;
      pitch?: number;
      volume?: number;
    } = {}
  ): void {
    const synth: SpeechSynthesis | null = window.speechSynthesis;
  
    // Abort if TTS isn't supported
    if (!synth) {
      console.warn("Speech synthesis not supported in this browser.");
      return;
    }
  
    const utterance: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(text);
  
    // Basic config
    utterance.lang = options.lang || "en-US";
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;
  
    // Try to find a Google voice
    const voices: SpeechSynthesisVoice[] = synth.getVoices();
    let selectedVoice: SpeechSynthesisVoice | undefined = voices.find(
      (voice: SpeechSynthesisVoice) =>
        voice.lang === utterance.lang &&
        voice.name.toLowerCase().includes("google")
    );
  
    // Fallback to any voice with the correct language
    if (!selectedVoice) {
      console.warn("No Google voice found. Falling back to default voice.");
      selectedVoice = voices.find(
        (voice: SpeechSynthesisVoice) => voice.lang === utterance.lang
      );
    }
  
    // Final fallback to first available voice
    if (!selectedVoice && voices.length > 0) {
      selectedVoice = voices[0];
      console.warn("No matching voice found. Using first available voice.");
    }
  
    // Set the selected voice
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
  
    // Cancel current speech if needed
    synth.cancel();
    synth.speak(utterance);
  }
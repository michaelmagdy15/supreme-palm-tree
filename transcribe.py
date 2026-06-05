import sys
import glob
import os
from faster_whisper import WhisperModel

def transcribe_all():
    print("Loading model...")
    model = WhisperModel("base", device="cpu", compute_type="int8")
    mp3_files = glob.glob("*.mp3")
    
    with open("transcripts.txt", "w", encoding="utf-8") as f:
        for file in mp3_files:
            f.write(f"\n--- Transcribing {file} ---\n")
            print(f"Transcribing {file}...")
            segments, info = model.transcribe(file, beam_size=5)
            for segment in segments:
                f.write("[%.2fs -> %.2fs] %s\n" % (segment.start, segment.end, segment.text))
    print("Done transcribing!")

if __name__ == "__main__":
    transcribe_all()

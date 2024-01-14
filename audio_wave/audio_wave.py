import wave 
import numpy as np
import sys
import matplotlib.pyplot as plt

w = wave.open("test.wav", "r")

raw = w.readframes(-1)
raw = np.frombuffer(raw, "Int16")

if w.getnchannels() == 2:
    print("stero Files are not supported. Use Mono Files")

    sys.exit(0)

plt.title("waveform of Wave File")

plt.plot(raw, color = "blue")
plt.ylabel("Amplitude")
plt.show()

# import pyaudio
# import struct
# import numpy as np
# import matplotlib.pyplot as plt

# %matplotlib tk

# CHUNK = 1024 * 4
# FORMAT = pyaudio.paInt16
# CHANNELS = 1
# RATE = 44100
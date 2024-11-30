const API_KEY = 'sk_390859b5823a39020f3102f67291b0ae2ee8208495e1aaf8';
const API_URL = 'https://api.elevenlabs.io/v1/sound-generation';

document.getElementById('generateBtn').addEventListener('click', async () => {
  const text = document.getElementById('textInput').value;
  const duration = parseFloat(document.getElementById('duration').value);
  const influence = parseFloat(document.getElementById('influence').value);

  if (!text || duration < 0.5 || duration > 22 || influence < 0 || influence > 1) {
    alert('Please ensure all inputs are valid.');
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': API_KEY
      },
      body: JSON.stringify({
        text,
        duration_seconds: duration,
        prompt_influence: influence
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate sound');
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = audioUrl;
    audioPlayer.play();
  } catch (error) {
    console.error(error);
    alert('An error occurred while generating the sound.');
  }
});

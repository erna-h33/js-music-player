const elements = {
  cover: document.getElementById('cover'),
  title: document.getElementById('title'),
  artist: document.getElementById('artist'),
  audio: document.getElementById('audio'),
  progressContainer: document.getElementById('progress-container'),
  progress: document.getElementById('progress'),
  currentTimeEl: document.getElementById('current-time'),
  durationEl: document.getElementById('duration'),
  prevBtn: document.getElementById('prev'),
  playBtn: document.getElementById('play'),
  nextBtn: document.getElementById('next'),
  trackCount: document.getElementById('track-count'),
  trackTitle: document.getElementById('track-title'),
};

const tracks = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Jacinto Design',
  },
];

let activeIndex = 0;

function initPlayer() {
  loadTrack(activeIndex);
  elements.playBtn.addEventListener('click', togglePlayback);
  elements.prevBtn.addEventListener('click', prevTrack);
  elements.nextBtn.addEventListener('click', nextTrack);
  elements.progressContainer.addEventListener('click', seekTrack);
  elements.audio.addEventListener('loadedmetadata', updateDuration);
  elements.audio.addEventListener('timeupdate', updateProgress);
  elements.audio.addEventListener('play', updatePlayButton);
  elements.audio.addEventListener('pause', updatePlayButton);
  elements.audio.addEventListener('ended', nextTrack);
}

function loadTrack(index) {
  const track = tracks[index];

  elements.cover.src = `img/${track.name}.jpg`;
  elements.cover.alt = `Album art for ${track.displayName}`;
  elements.title.textContent = track.displayName;
  elements.artist.textContent = track.artist;
  elements.trackTitle.textContent = track.displayName;
  elements.trackCount.textContent = `${index + 1} / ${tracks.length}`;
  elements.audio.src = `music/${track.name}.mp3`;
  elements.audio.currentTime = 0;
  elements.currentTimeEl.textContent = '0:00';
  elements.progress.style.width = '0%';
  elements.durationEl.textContent = '0:00';
  updatePlayButton();
}

function togglePlayback() {
  if (elements.audio.paused) {
    elements.audio.play();
  } else {
    elements.audio.pause();
  }
}

function updatePlayButton() {
  const isPaused = elements.audio.paused;
  elements.playBtn.innerHTML = `<i class="fas ${isPaused ? 'fa-play' : 'fa-pause'}"></i>`;
  elements.playBtn.setAttribute('aria-label', isPaused ? 'Play' : 'Pause');
}

function prevTrack() {
  activeIndex = (activeIndex - 1 + tracks.length) % tracks.length;
  loadTrack(activeIndex);
  elements.audio.play();
}

function nextTrack() {
  activeIndex = (activeIndex + 1) % tracks.length;
  loadTrack(activeIndex);
  elements.audio.play();
}

function updateDuration() {
  elements.durationEl.textContent = formatTime(elements.audio.duration);
}

function updateProgress() {
  const { currentTime, duration } = elements.audio;
  const percent = duration ? (currentTime / duration) * 100 : 0;
  elements.progress.style.width = `${percent}%`;
  elements.currentTimeEl.textContent = formatTime(currentTime);
}

function seekTrack(event) {
  const width = elements.progressContainer.clientWidth;
  const clickX = event.offsetX;
  const duration = elements.audio.duration;

  if (!duration) return;
  elements.audio.currentTime = (clickX / width) * duration;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = String(Math.floor(seconds % 60)).padStart(2, '0');
  return `${minutes}:${secs}`;
}

initPlayer();

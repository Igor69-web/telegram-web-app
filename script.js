// Переключение между страницами
document.getElementById('calculator-btn').addEventListener('click', function() {
    showPage('calculator-page');
  });
  
  document.getElementById('music-btn').addEventListener('click', function() {
    showPage('music-page');
  });
  
  // Функция для отображения нужной страницы
  function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active')); // Скрыть все страницы
    
    const activePage = document.getElementById(pageId);
    activePage.classList.add('active'); // Отобразить выбранную страницу
  }
  
  // Функции для калькулятора
  function appendToDisplay(value) {
    document.getElementById('display').value += value;
  }
  
  function clearDisplay() {
    document.getElementById('display').value = '';
  }
  
  function calculate() {
    try {
      const result = eval(document.getElementById('display').value);
      document.getElementById('display').value = result;
    } catch (e) {
      document.getElementById('display').value = 'Ошибка';
    }
  }
  
  // Функция для загрузки треков
  function loadMusicTracks() {
    const musicList = document.getElementById('music-list');
    
    // Пример: данные треков
    const tracks = [
      { title: 'Трек 1', artist: 'Исполнитель 1', url: 'https://example.com/track1.mp3' },
      { title: 'Трек 2', artist: 'Исполнитель 2', url: 'https://example.com/track2.mp3' },
      { title: 'Трек 3', artist: 'Исполнитель 3', url: 'https://example.com/track3.mp3' }
    ];
    
    tracks.forEach(track => {
      const trackElement = document.createElement('div');
      trackElement.classList.add('music-track');
      
      const trackInfo = document.createElement('span');
      trackInfo.textContent = `${track.title} - ${track.artist}`;
      
      const playButton = document.createElement('button');
      playButton.textContent = 'Играть';
      playButton.addEventListener('click', () => {
        const audio = new Audio(track.url);
        audio.play();
      });
      
      trackElement.appendChild(trackInfo);
      trackElement.appendChild(playButton);
      
      musicList.appendChild(trackElement);
    });
  }
  
  // Загружаем музыкальные треки при инициализации
  window.onload = function() {
    loadMusicTracks();
  };
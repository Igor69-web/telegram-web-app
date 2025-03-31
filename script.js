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
  
  // Функция загрузки треков из LocalStorage
  function loadSavedTracks() {
    const savedTracks = JSON.parse(localStorage.getItem('tracks')) || [];
    const musicList = document.getElementById('music-list');
    musicList.innerHTML = ''; // Очищаем перед загрузкой
  
    savedTracks.forEach(track => {
      addTrackToList(track.name, track.url);
    });
  }
  
  // Функция добавления трека в список
  function addTrackToList(name, url) {
    const musicList = document.getElementById('music-list');
  
    const trackElement = document.createElement('div');
    trackElement.classList.add('music-track');
  
    const trackInfo = document.createElement('span');
    trackInfo.textContent = name;
  
    const playButton = document.createElement('button');
    playButton.textContent = 'Играть';
    playButton.addEventListener('click', () => {
      const audio = new Audio(url);
      audio.play();
    });
  
    trackElement.appendChild(trackInfo);
    trackElement.appendChild(playButton);
    musicList.appendChild(trackElement);
  }
  
  // Функция загрузки треков
  document.getElementById('load-tracks-btn').addEventListener('click', function() {
    const fileInput = document.getElementById('file-input');
    const files = fileInput.files;
    
    if (files.length === 0) {
      alert("Пожалуйста, загрузите хотя бы один трек!");
      return;
    }
  
    let savedTracks = JSON.parse(localStorage.getItem('tracks')) || [];
  
    Array.from(files).forEach(file => {
      const fileUrl = URL.createObjectURL(file);
      const trackData = { name: file.name, url: fileUrl };
  
      savedTracks.push(trackData); // Добавляем трек в список LocalStorage
      addTrackToList(file.name, fileUrl);
    });
  
    localStorage.setItem('tracks', JSON.stringify(savedTracks)); // Сохраняем обновленный список треков
  });
  
  // Загружаем сохраненные треки при загрузке страницы
  window.onload = function() {
    loadSavedTracks();
  };
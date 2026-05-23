/* ================================================
   script.js — CineVault
   ================================================ */

/* 1. ПЕРЕКЛЮЧЕНИЕ ТЕМЫ */

var themeToggle = document.getElementById('themeToggle');
var savedTheme  = localStorage.getItem('cineTheme') || 'dark';
document.documentElement.dataset.theme = savedTheme;

themeToggle.addEventListener('click', function () {
  var current = document.documentElement.dataset.theme;
  var next    = current === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('cineTheme', next);
});


/* 2. ДАННЫЕ ФИЛЬМОВ */

var allMovies = [
  {
    title:  'Интерстеллар',
    genre:  'Фантастика',
    rating: 9.1,
    year:   2014,
    poster: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg',
    desc:   'Земля умирает: бури из пыли уничтожают урожай, человечество обречено на голод. Бывший пилот НАСА Купер соглашается возглавить экспедицию сквозь червоточину в поисках новой пригодной для жизни планеты. За это ему придётся заплатить временем — и, возможно, жизнью своих детей.'
  },
  {
    title:  'Начало',
    genre:  'Триллер',
    rating: 8.8,
    year:   2010,
    poster: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg',
    desc:   'Кобб — вор особого рода: он крадёт секреты из глубин подсознания во время сна. Ему предлагают сделку: вместо кражи идеи внедрить её в разум жертвы. Операция называется «начало» и считается невозможной. Но Кобб готов рискнуть — ради возвращения домой.'
  },
  {
    title:  'Довод',
    genre:  'Экшен',
    rating: 7.4,
    year:   2020,
    poster: 'https://upload.wikimedia.org/wikipedia/en/a/a3/Tenet_film_poster.jpg',
    desc:   'Агент ЦРУ без имени получает одно слово — «Довод» — и задание, от выполнения которого зависит судьба мира. Он учится управлять временем в обратном направлении, чтобы предотвратить Третью мировую войну, которая начнётся... из будущего.'
  },
  {
    title:  'Оппенгеймер',
    genre:  'Биография',
    rating: 8.9,
    year:   2023,
    poster: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg',
    desc:   'История блестящего физика Роберта Оппенгеймера, возглавившего Манхэттенский проект и создавшего первую атомную бомбу. Триумф науки обернулся моральным кошмаром: учёный понял, что изменил мир навсегда — и не в лучшую сторону.'
  },
  {
    title:  'Матрица',
    genre:  'Фантастика',
    rating: 8.7,
    year:   1999,
    poster: 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg',
    desc:   'Программист Томас Андерсон живёт двойной жизнью: днём — офисный клерк, ночью — хакер по кличке Нео. Однажды он узнаёт страшную правду: привычный мир — иллюзия, созданная машинами, а люди служат им источником энергии. Нео — избранный, способный разрушить систему.'
  },
  {
    title:  'Паразиты',
    genre:  'Триллер',
    rating: 8.5,
    year:   2019,
    poster: 'https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png',
    desc:   'Семья Ки-тхэка живёт в полуподвале и перебивается случайными заработками. Когда сын устраивается репетитором к богатым Паркам, вся семья постепенно проникает в их дом. Классовое противостояние нарастает до взрыва — жёсткого, неожиданного и беспощадного.'
  },
  {
    title:  'Дюна',
    genre:  'Эпик',
    rating: 8.0,
    year:   2021,
    poster: 'https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_%282021_film%29.jpg',
    desc:   'Юный Пол Атрейдес прибывает на Арракис — единственную планету, где добывают меланж, самое ценное вещество во вселенной. Предательство уничтожает его семью, но именно здесь Пол обретает своё предназначение среди воинов-фременов пустыни.'
  },
  {
    title:  'Побег из Шоушенка',
    genre:  'Драма',
    rating: 9.3,
    year:   1994,
    poster: 'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg',
    desc:   'Банкир Энди Дюфрейн осуждён за убийство, которого не совершал, и попадает в жестокую тюрьму Шоушенк. Годами он сохраняет достоинство, помогает заключённым и ждёт своего часа. История о том, что надежда — самая несокрушимая вещь на свете.'
  },
  {
    title:  'Джокер',
    genre:  'Драма',
    rating: 8.4,
    year:   2019,
    poster: 'https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg',
    desc:   'Артур Флек — неудачливый стендап-комик с психическими расстройствами — живёт в жестоком Готэм-сити 1980-х. Череда унижений и предательств ломает его личность, рождая одного из самых известных злодеев в истории кино.'
  },
  {
    title:  'Ла-Ла Ленд',
    genre:  'Мюзикл',
    rating: 8.0,
    year:   2016,
    poster: 'https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png',
    desc:   'Лос-Анджелес. Джазовый пианист Себастьян и начинающая актриса Миа влюбляются друг в друга на фоне мечтаний о большом искусстве. Им предстоит выбрать: любовь или карьера. Фильм-поэма об амбициях, романтике и невозможных компромиссах.'
  },
  {
    title:  'Барби',
    genre:  'Комедия',
    rating: 7.0,
    year:   2023,
    poster: 'https://upload.wikimedia.org/wikipedia/en/6/6b/Barbie_%28film%29_poster.jpg',
    desc:   'Барби живёт в идеальном Барбиленде — пока внезапно не начинает думать о смерти. Вместе с Кеном она отправляется в реальный мир, чтобы найти ответы. Яркая сатира о стандартах красоты, гендерных ролях и том, что значит быть настоящим человеком.'
  },
  {
    title:  '1+1 (Неприкасаемые)',
    genre:  'Драма',
    rating: 8.5,
    year:   2011,
    poster: 'https://upload.wikimedia.org/wikipedia/en/f/f2/The_Intouchables_poster.jpg',
    desc:   'Богатый аристократ Филипп, прикованный к инвалидному креслу, нанимает сиделкой Дрисса — парня из неблагополучного района. Двое людей из разных миров становятся лучшими друзьями. Реальная история о том, как дружба способна изменить жизнь.'
  }
];


/* 3. КНОПКА «ПОКАЗАТЬ ЕЩЁ» */

var moviesGrid  = document.getElementById('moviesGrid');
var showMoreBtn = document.getElementById('showMoreBtn');
var BATCH_SIZE  = 6;
var shownCount  = 0;

function createMovieCard(movie, index) {
  var card = document.createElement('div');
  card.className = 'movie-card';
  card.style.animationDelay = (index * 0.07) + 's';

  card.innerHTML =
    '<div class="movie-poster">' +
      '<img src="' + movie.poster + '" alt="' + movie.title + '" onerror="this.style.display=\'none\'" />' +
      '<div class="poster-fallback">🎬</div>' +
      '<div class="poster-overlay">' +
        '<button class="play-btn">Подробнее</button>' +
      '</div>' +
    '</div>' +
    '<div class="movie-info">' +
      '<div class="movie-title">' + movie.title + '</div>' +
      '<div class="movie-meta">' +
        '<span class="movie-genre">' + movie.genre + ' · ' + movie.year + '</span>' +
        '<span class="movie-rating">★ ' + movie.rating + '</span>' +
      '</div>' +
    '</div>';

  card.addEventListener('click', function () {
    openModal(movie);
  });

  return card;
}

function loadMoreMovies() {
  var slice = allMovies.slice(shownCount, shownCount + BATCH_SIZE);

  slice.forEach(function (movie, index) {
    var card = createMovieCard(movie, index);
    moviesGrid.appendChild(card);
  });

  shownCount += slice.length;

  if (shownCount >= allMovies.length) {
    showMoreBtn.style.display = 'none';
  }
}

loadMoreMovies();

showMoreBtn.addEventListener('click', function () {
  loadMoreMovies();
});


/* 4. МОДАЛЬНОЕ ОКНО */

var modalOverlay = document.getElementById('modalOverlay');
var modalClose   = document.getElementById('modalClose');
var modalPoster  = document.getElementById('modalPoster');
var modalGenre   = document.getElementById('modalGenre');
var modalTitle   = document.getElementById('modalTitle');
var modalYear    = document.getElementById('modalYear');
var modalRating  = document.getElementById('modalRating');
var modalDesc    = document.getElementById('modalDesc');

function openModal(movie) {
  modalPoster.src    = movie.poster;
  modalPoster.alt    = movie.title;
  modalGenre.textContent  = movie.genre;
  modalTitle.textContent  = movie.title;
  modalYear.textContent   = movie.year;
  modalRating.textContent = '★ ' + movie.rating;
  modalDesc.textContent   = movie.desc;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', function (e) {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});


/* 5. ФОРМА ОБРАТНОЙ СВЯЗИ */

var contactForm  = document.getElementById('contactForm');
var nameInput    = document.getElementById('name');
var emailInput   = document.getElementById('email');
var messageInput = document.getElementById('message');
var nameErr      = document.getElementById('nameErr');
var emailErr     = document.getElementById('emailErr');
var messageErr   = document.getElementById('messageErr');
var formSuccess  = document.getElementById('formSuccess');

function validateForm() {
  var isValid = true;

  if (nameInput.value.trim() === '') {
    nameErr.textContent = 'Введите ваше имя';
    nameInput.classList.add('error');
    isValid = false;
  } else {
    nameErr.textContent = '';
    nameInput.classList.remove('error');
  }

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() === '') {
    emailErr.textContent = 'Введите email';
    emailInput.classList.add('error');
    isValid = false;
  } else if (!emailRegex.test(emailInput.value)) {
    emailErr.textContent = 'Некорректный email (пример: ivan@mail.ru)';
    emailInput.classList.add('error');
    isValid = false;
  } else {
    emailErr.textContent = '';
    emailInput.classList.remove('error');
  }

  if (messageInput.value.trim() === '') {
    messageErr.textContent = 'Напишите сообщение';
    messageInput.classList.add('error');
    isValid = false;
  } else if (messageInput.value.trim().length < 10) {
    messageErr.textContent = 'Сообщение слишком короткое (минимум 10 символов)';
    messageInput.classList.add('error');
    isValid = false;
  } else {
    messageErr.textContent = '';
    messageInput.classList.remove('error');
  }

  return isValid;
}

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!validateForm()) return;

  var formData = {
    name:    nameInput.value.trim(),
    email:   emailInput.value.trim(),
    message: messageInput.value.trim()
  };

  console.log('Данные формы:', formData);

  formSuccess.style.display = 'block';
  contactForm.reset();

  setTimeout(function () {
    formSuccess.style.display = 'none';
  }, 5000);
});

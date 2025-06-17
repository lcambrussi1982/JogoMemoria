const cardsData = [
  { type: 'pergunta', text: '5 + 3' },
  { type: 'resposta', text: '8' },

  { type: 'pergunta', text: '9 - 4' },
  { type: 'resposta', text: '5' },

  { type: 'pergunta', text: '6 x 2' },
  { type: 'resposta', text: '12' },

  { type: 'pergunta', text: '15 ÷ 3' },
  { type: 'resposta', text: '5' },

  { type: 'pergunta', text: '7 + 6' },
  { type: 'resposta', text: '13' },

  { type: 'pergunta', text: '10 - 7' },
  { type: 'resposta', text: '3' },

  { type: 'pergunta', text: '4 x 4' },
  { type: 'resposta', text: '16' },

  { type: 'pergunta', text: '18 ÷ 6' },
  { type: 'resposta', text: '3' }
];

function shuffle(array) {
  for(let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const gameGrid = document.getElementById('gameGrid');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

function normalizeText(text) {
  return text.trim().toLowerCase();
}

function checkPairs(card1, card2) {
  const pairs = [
    ['5 + 3', '8'],
    ['9 - 4', '5'],
    ['6 x 2', '12'],
    ['15 ÷ 3', '5'],
    ['7 + 6', '13'],
    ['10 - 7', '3'],
    ['4 x 4', '16'],
    ['18 ÷ 6', '3']
  ];

  return pairs.some(pair => {
    return (
      (normalizeText(card1.dataset.text) === normalizeText(pair[0]) && normalizeText(card2.dataset.text) === normalizeText(pair[1])) ||
      (normalizeText(card1.dataset.text) === normalizeText(pair[1]) && normalizeText(card2.dataset.text) === normalizeText(pair[0]))
    );
  });
}

function createCard(cardObj, index) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.type = cardObj.type;
  card.dataset.text = cardObj.text;
  card.dataset.index = index;

  card.innerText = '?';

  card.addEventListener('click', () => {
    if(lockBoard) return;
    if(card === firstCard) return;

    card.classList.add('flipped');
    card.innerText = cardObj.text;

    if(!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    lockBoard = true;

    checkForMatch();
  });

  return card;
}

function checkForMatch() {
  const isMatch =
    (firstCard.dataset.type !== secondCard.dataset.type) &&
    checkPairs(firstCard, secondCard);

  if(isMatch) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matches++;

    resetBoard();

    if(matches === cardsData.length / 2) {
      setTimeout(() => alert('Parabéns! Você acertou todas as perguntas!'), 300);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      firstCard.innerText = '?';
      secondCard.classList.remove('flipped');
      secondCard.innerText = '?';
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function startGame() {
  matches = 0;
  resetBoard();
  gameGrid.innerHTML = '';

  const shuffledCards = shuffle(cardsData.slice());

  shuffledCards.forEach((cardData, i) => {
    const cardElement = createCard(cardData, i);
    gameGrid.appendChild(cardElement);
  });
}

startGame();
const restartBtn = document.getElementById('restartBtn');
restartBtn.addEventListener('click', () => {
  startGame();
});

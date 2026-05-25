// ============================================================================
// VanaSpotify - Music Academy Escape Game
// A first-person escape horror-comedy adventure
// ============================================================================

// Game State
const gameState = {
    currentRoom: 0,
    keysFound: 0,
    totalKeys: 4,
    sanity: 100,
    timeRemaining: 300, // 5 minutes
    isChasing: false,
    inBathroom: false,
    gameActive: true,
    roomsVisited: [],
    quizzesAnswered: 0,
    correctAnswers: 0
};

// Room Definitions
const rooms = [
    {
        id: 0,
        name: 'Music Office',
        description: 'You wake up in VanaSpotify\'s cluttered music office. Sheet music covers every surface. You need to escape!',
        objects: ['📚', '🎹', '📋'],
        objectNames: ['Shelf', 'Piano', 'Bulletin Board'],
        hasKey: true,
        keyLocation: 'Piano',
        quiz: null,
        exits: [1, 2]
    },
    {
        id: 1,
        name: 'Main Hallway',
        description: 'A long hallway with lockers lining the walls. You can hear accordion music echoing in the distance...',
        objects: ['🚪', '🏫', '🎵'],
        objectNames: ['Door', 'Locker', 'Speaker'],
        hasKey: false,
        quiz: null,
        exits: [0, 2, 3]
    },
    {
        id: 2,
        name: 'Practice Room',
        description: 'A soundproof practice room filled with instruments. Something glints under the music stand...',
        objects: ['🎸', '🥁', '🪑'],
        objectNames: ['Guitar', 'Drums', 'Chair'],
        hasKey: true,
        keyLocation: 'Chair',
        quiz: null,
        exits: [0, 1, 4]
    },
    {
        id: 3,
        name: 'Library',
        description: 'The music library is eerily quiet. You notice a hidden compartment in one of the bookshelves...',
        objects: ['📖', '📚', '🔦'],
        objectNames: ['Book', 'Encyclopedia', 'Flashlight'],
        hasKey: true,
        keyLocation: 'Book',
        quiz: null,
        exits: [1, 4, 5]
    },
    {
        id: 4,
        name: 'Concert Hall',
        description: 'The grand concert hall echoes with silence. A single spotlight illuminates the stage...',
        objects: ['🎤', '🎧', '🎬'],
        objectNames: ['Microphone', 'Headphones', 'Spotlight'],
        hasKey: true,
        keyLocation: 'Microphone',
        quiz: {
            question: 'How many strings does a standard violin have?',
            answers: ['3 strings', '4 strings', '5 strings', '6 strings'],
            correct: 1 // Index of correct answer
        },
        exits: [2, 3, 5]
    },
    {
        id: 5,
        name: 'Front Entrance',
        description: 'The front doors! Freedom is so close... but are you ready to escape?',
        objects: ['🚪', '🪟', '🏛️'],
        objectNames: ['Main Door', 'Window', 'Arch'],
        hasKey: false,
        quiz: null,
        exits: [3, 4],
        isExit: true
    }
];

// Quizzes Database
const quizzes = [
    {
        question: 'How many strings does a standard violin have?',
        answers: ['3 strings', '4 strings', '5 strings', '6 strings'],
        correct: 1
    },
    {
        question: 'What is the lowest note a standard piano can play?',
        answers: ['A0', 'C1', 'B0', 'A#0'],
        correct: 0
    },
    {
        question: 'How many keys does a standard piano have?',
        answers: ['78 keys', '88 keys', '92 keys', '100 keys'],
        correct: 1
    },
    {
        question: 'What instrument is known as the "King of Instruments"?',
        answers: ['Violin', 'Organ', 'Piano', 'Trumpet'],
        correct: 1
    },
    {
        question: 'What does "allegro" mean in musical tempo?',
        answers: ['Slow', 'Fast', 'Moderate', 'Very Slow'],
        correct: 1
    }
];

// Game Elements
const elements = {
    roomContainer: document.getElementById('roomContainer'),
    roomNav: document.getElementById('roomNav'),
    interactionPanel: document.getElementById('interactionPanel'),
    keysCount: document.getElementById('keysCount'),
    locationName: document.getElementById('locationName'),
    timeDisplay: document.getElementById('timeDisplay'),
    sanityFill: document.getElementById('sanityFill'),
    sanityText: document.getElementById('sanityText'),
    chaseIndicator: document.getElementById('chaseIndicator'),
    quizModal: document.getElementById('quizModal'),
    chaseModal: document.getElementById('chaseModal'),
    caughtModal: document.getElementById('caughtModal'),
    gameOverModal: document.getElementById('gameOverModal'),
    winModal: document.getElementById('winModal')
};

// Initialize Game
function initGame() {
    console.log('🎵 VanaSpotify - Music Academy Escape initialized!');
    startGameLoop();
    loadRoom(0);
    addLog('You wake up in VanaSpotify\'s office. You need to find all 4 keys to escape!');
}

// Load Room
function loadRoom(roomId) {
    const room = rooms[roomId];
    gameState.currentRoom = roomId;
    
    // Update HUD
    elements.locationName.textContent = room.name;
    
    // Clear and render room
    elements.roomContainer.innerHTML = '';
    
    const title = document.createElement('div');
    title.className = 'room-title';
    title.textContent = room.name;
    elements.roomContainer.appendChild(title);
    
    const description = document.createElement('div');
    description.className = 'room-description';
    description.textContent = room.description;
    elements.roomContainer.appendChild(description);
    
    // Add room objects
    const objectsDiv = document.createElement('div');
    objectsDiv.className = 'room-objects';
    
    room.objects.forEach((obj, idx) => {
        const objEl = document.createElement('div');
        objEl.className = 'object';
        objEl.textContent = obj;
        objEl.title = room.objectNames[idx];
        objEl.style.cursor = 'pointer';
        
        // Check if this object has a key
        if (room.hasKey && room.keyLocation === room.objectNames[idx]) {
            objEl.onclick = () => findKey(roomId, idx);
        } else {
            objEl.onclick = () => inspectObject(room.objectNames[idx]);
        }
        
        objectsDiv.appendChild(objEl);
    });
    
    elements.roomContainer.appendChild(objectsDiv);
    
    // Render navigation
    renderNavigation(room);
    
    // Random quiz chance
    if (Math.random() < 0.4 && !room.quiz && gameState.quizzesAnswered < 3) {
        setTimeout(() => triggerRandomQuiz(), 1500);
    }
}

// Render Navigation Buttons
function renderNavigation(room) {
    elements.roomNav.innerHTML = '';
    
    room.exits.forEach(exitId => {
        const exitRoom = rooms[exitId];
        const btn = document.createElement('button');
        btn.className = 'btn-nav';
        btn.textContent = `→ ${exitRoom.name}`;
        btn.onclick = () => {
            // Chance of being chased
            if (Math.random() < 0.6) {
                triggerChase();
            } else {
                loadRoom(exitId);
                addLog(`Moved to ${exitRoom.name}`);
            }
        };
        elements.roomNav.appendChild(btn);
    });
}

// Find Key
function findKey(roomId, objIdx) {
    const room = rooms[roomId];
    if (gameState.keysFound >= gameState.totalKeys) return;
    
    gameState.keysFound++;
    elements.keysCount.textContent = `${gameState.keysFound}/${gameState.totalKeys}`;
    
    addLog(`🔑 Found a key in the ${room.objectNames[objIdx]}!`);
    
    // Disable the object
    const objects = document.querySelectorAll('.object');
    objects[objIdx].classList.add('found');
    
    // Check if all keys found
    if (gameState.keysFound === gameState.totalKeys) {
        addLog('✨ You have all the keys! Rush to the front entrance!');
    }
    
    // Random chase trigger
    if (Math.random() < 0.5) {
        triggerChase();
    }
}

// Inspect Object
function inspectObject(name) {
    const messages = [
        `The ${name} looks interesting but doesn't help your escape.`,
        `Nothing useful about the ${name}.`,
        `You examine the ${name}. It's just a regular object.`,
        `The ${name} is not what you're looking for.`
    ];
    addLog(messages[Math.floor(Math.random() * messages.length)]);
}

// Trigger Random Quiz
function triggerRandomQuiz() {
    const quiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    showQuiz(quiz);
}

// Show Quiz Modal
function showQuiz(quiz) {
    elements.quizModal.classList.remove('hidden');
    
    const questionEl = document.getElementById('quizQuestion');
    questionEl.textContent = quiz.question;
    
    const answersContainer = document.getElementById('quizAnswers');
    answersContainer.innerHTML = '';
    
    quiz.answers.forEach((answer, idx) => {
        const btn = document.createElement('div');
        btn.className = 'quiz-answer';
        btn.textContent = answer;
        btn.onclick = () => answerQuiz(idx, quiz.correct);
        answersContainer.appendChild(btn);
    });
}

// Answer Quiz
function answerQuiz(selectedIdx, correctIdx) {
    const resultDiv = document.getElementById('quizResult');
    resultDiv.classList.remove('hidden');
    
    if (selectedIdx === correctIdx) {
        resultDiv.className = 'quiz-result success';
        resultDiv.textContent = '✓ Correct! VanaSpotify smiles and walks away...';
        gameState.correctAnswers++;
        addLog('✓ You answered the quiz correctly!');
    } else {
        resultDiv.className = 'quiz-result failure';
        resultDiv.textContent = '✗ Wrong! VanaSpotify\'s eyes glow red...';
        addLog('✗ You got it wrong! VanaSpotify is coming for you!');
        setTimeout(() => triggerChase(), 1000);
    }
    
    gameState.quizzesAnswered++;
    
    setTimeout(() => {
        elements.quizModal.classList.add('hidden');
        resultDiv.classList.add('hidden');
    }, 3000);
}

// Trigger Chase
function triggerChase() {
    if (gameState.isChasing || !gameState.gameActive) return;
    
    gameState.isChasing = true;
    elements.chaseIndicator.style.display = 'block';
    addLog('🎵 You hear the accordion! VanaSpotify is chasing you!');
    
    // Show chase animation
    elements.chaseModal.classList.remove('hidden');
    
    setTimeout(() => {
        elements.chaseModal.classList.add('hidden');
        
        // Decide if caught or escaped
        if (Math.random() < 0.6) {
            caughtByVana();
        } else {
            elements.chaseIndicator.style.display = 'none';
            gameState.isChasing = false;
            addLog('You managed to escape!');
        }
    }, 2000);
}

// Caught By VanaSpotify
function caughtByVana() {
    elements.caughtModal.classList.remove('hidden');
    gameState.inBathroom = true;
    gameState.sanity = Math.max(0, gameState.sanity - 25);
    updateSanity();
    addLog('💀 You were caught and locked in the bathroom!');
    
    setTimeout(() => {
        elements.caughtModal.classList.add('hidden');
        elements.chaseIndicator.style.display = 'none';
        gameState.isChasing = false;
        gameState.inBathroom = false;
    }, 3000);
}

// Resume From Bathroom
function resumeFromBathroom() {
    elements.caughtModal.classList.add('hidden');
    elements.chaseIndicator.style.display = 'none';
    gameState.isChasing = false;
    gameState.inBathroom = false;
}

// Escape (Try to leave through exit)
function attemptEscape() {
    if (gameState.keysFound < gameState.totalKeys) {
        addLog('❌ You need all 4 keys to escape!');
        triggerChase();
        return;
    }
    
    // You made it!
    endGameWin();
}

// End Game - Win
function endGameWin() {
    gameState.gameActive = false;
    elements.winModal.classList.remove('hidden');
    
    const stats = `
        Keys Found: ${gameState.keysFound}/${gameState.totalKeys}
        Time Taken: ${300 - gameState.timeRemaining}s
        Quizzes Answered: ${gameState.quizzesAnswered}
        Correct Answers: ${gameState.correctAnswers}
    `;
    
    document.getElementById('winStats').textContent = stats;
    addLog('🎉 YOU ESCAPED! You are free!');
}

// End Game - Lose
function endGameLose() {
    gameState.gameActive = false;
    elements.gameOverModal.classList.remove('hidden');
    
    document.getElementById('gameOverTitle').textContent = 'GAME OVER - SANITY LOST';
    document.getElementById('gameOverMessage').textContent = 
        'Your sanity has been completely destroyed by VanaSpotify\'s accordion music. You are trapped forever in the Music Academy.';
}

// Update HUD
function updateHUD() {
    elements.keysCount.textContent = `${gameState.keysFound}/${gameState.totalKeys}`;
    updateSanity();
    updateTime();
}

// Update Sanity
function updateSanity() {
    const sanityPercent = (gameState.sanity / 100) * 100;
    elements.sanityFill.style.width = sanityPercent + '%';
    elements.sanityText.textContent = `SANITY: ${Math.max(0, gameState.sanity)}%`;
    
    if (gameState.sanity <= 0) {
        endGameLose();
    }
}

// Update Time
function updateTime() {
    const mins = Math.floor(gameState.timeRemaining / 60);
    const secs = gameState.timeRemaining % 60;
    elements.timeDisplay.textContent = 
        `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    
    if (gameState.timeRemaining <= 0) {
        endGameLose();
    }
}

// Add Log Message
function addLog(message) {
    elements.interactionPanel.innerHTML = `<p>> ${message}</p>` + elements.interactionPanel.innerHTML;
    
    // Keep only last 5 messages
    const messages = elements.interactionPanel.querySelectorAll('p');
    if (messages.length > 5) {
        messages[messages.length - 1].remove();
    }
}

// Game Loop
function startGameLoop() {
    // Update every second
    setInterval(() => {
        if (!gameState.gameActive) return;
        
        gameState.timeRemaining--;
        gameState.sanity = Math.max(0, gameState.sanity - 0.1); // Slow sanity drain
        
        if (gameState.isChasing) {
            gameState.sanity = Math.max(0, gameState.sanity - 0.5); // Faster drain when chased
        }
        
        updateHUD();
    }, 1000);
}

// Check for exit room and allow escape
document.addEventListener('DOMContentLoaded', () => {
    // Add escape check
    const originalLoadRoom = loadRoom;
    window.loadRoom = function(roomId) {
        originalLoadRoom(roomId);
        
        if (rooms[roomId].isExit && gameState.keysFound === gameState.totalKeys) {
            // Add escape button
            setTimeout(() => {
                const escapeBtn = document.createElement('button');
                escapeBtn.className = 'btn-nav';
                escapeBtn.textContent = '🚀 ESCAPE! (Click to exit)';
                escapeBtn.style.background = '#008800';
                escapeBtn.style.boxShadow = '0 0 20px #00ff00';
                escapeBtn.onclick = attemptEscape;
                elements.roomNav.appendChild(escapeBtn);
            }, 100);
        }
    };
});

// Start the game when page loads
window.addEventListener('load', initGame);

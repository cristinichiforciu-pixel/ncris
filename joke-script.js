// ============================================================================
// Joke Generator - Using JokeAPI (https://jokeapi.dev/)
// ============================================================================

// Configuration
const API_BASE_URL = 'https://v2.jokeapi.dev/joke';
const MAX_HISTORY = 10;

// State
let jokeHistory = [];
let jokeCount = 0;
let isLoading = false;

// DOM Elements
const elements = {
    jokeText: document.getElementById('jokeText'),
    getJokeBtn: document.getElementById('getJokeBtn'),
    shareBtn: document.getElementById('shareBtn'),
    jokeTypeSelect: document.getElementById('jokeType'),
    jokeCount: document.getElementById('jokeCount'),
    notification: document.getElementById('notification'),
    notificationText: document.getElementById('notificationText'),
    historyList: document.getElementById('historyList'),
    clearHistoryBtn: document.getElementById('clearHistoryBtn'),
    spinner: document.getElementById('spinner')
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    elements.getJokeBtn.addEventListener('click', fetchJoke);
    elements.shareBtn.addEventListener('click', shareJoke);
    elements.jokeTypeSelect.addEventListener('change', fetchJoke);
    elements.clearHistoryBtn.addEventListener('click', clearHistory);
    
    // Load history from localStorage
    loadHistoryFromStorage();
    
    console.log('✅ Joke Generator initialized!');
});

// Fetch Joke from API
async function fetchJoke() {
    if (isLoading) return;
    
    isLoading = true;
    elements.getJokeBtn.disabled = true;
    
    try {
        const jokeType = elements.jokeTypeSelect.value;
        const url = `${API_BASE_URL}/${jokeType}`;
        
        console.log(`🔄 Fetching joke from: ${url}`);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Check if joke was found
        if (data.error) {
            showNotification('No joke found. Try again!', 'error');
            return;
        }
        
        // Format and display the joke
        let jokeText = '';
        
        if (data.type === 'twopart') {
            jokeText = `${data.setup}\n\n${data.delivery}`;
        } else {
            jokeText = data.joke;
        }
        
        // Display the joke
        displayJoke(jokeText, data);
        
        // Add to history
        addToHistory(jokeText);
        
        // Increment counter
        jokeCount++;
        elements.jokeCount.textContent = jokeCount;
        
        console.log('✅ Joke fetched successfully!');
        showNotification('😂 Joke loaded!', 'success');
        
    } catch (error) {
        console.error('❌ Error fetching joke:', error);
        showNotification(`Error: ${error.message}`, 'error');
        elements.jokeText.textContent = 'Oops! Could not load joke. Please try again.';
    } finally {
        isLoading = false;
        elements.getJokeBtn.disabled = false;
    }
}

// Display Joke
function displayJoke(jokeText, jokeData = {}) {
    elements.jokeText.textContent = jokeText;
    elements.jokeText.style.animation = 'none';
    
    // Trigger animation
    setTimeout(() => {
        elements.jokeText.style.animation = 'fadeIn 0.5s ease';
    }, 10);
}

// Add Joke to History
function addToHistory(jokeText) {
    // Limit text length for display
    const displayText = jokeText.length > 100 
        ? jokeText.substring(0, 100) + '...' 
        : jokeText;
    
    jokeHistory.unshift({
        text: jokeText,
        displayText: displayText,
        timestamp: new Date().toLocaleTimeString()
    });
    
    // Keep only last MAX_HISTORY jokes
    if (jokeHistory.length > MAX_HISTORY) {
        jokeHistory.pop();
    }
    
    updateHistoryDisplay();
    saveHistoryToStorage();
}

// Update History Display
function updateHistoryDisplay() {
    const historyList = elements.historyList;
    
    if (jokeHistory.length === 0) {
        historyList.innerHTML = '<li class="empty-message">No jokes yet. Get started!</li>';
        elements.clearHistoryBtn.style.display = 'none';
        return;
    }
    
    historyList.innerHTML = '';
    
    jokeHistory.forEach((joke, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${joke.timestamp}</strong><br>${joke.displayText}`;
        li.title = joke.text;
        li.addEventListener('click', () => {
            elements.jokeText.textContent = joke.text;
            showNotification('Joke loaded from history!', 'success');
        });
        historyList.appendChild(li);
    });
    
    elements.clearHistoryBtn.style.display = 'inline-block';
}

// Share/Copy Joke
function shareJoke() {
    const jokeText = elements.jokeText.textContent;
    
    if (jokeText === 'Click "Get Joke" to start laughing!') {
        showNotification('No joke to share yet!', 'error');
        return;
    }
    
    // Copy to clipboard
    navigator.clipboard.writeText(jokeText).then(() => {
        showNotification('✅ Joke copied to clipboard!', 'success');
        
        // Change button text temporarily
        const originalText = elements.shareBtn.textContent;
        elements.shareBtn.textContent = '✓ Copied!';
        setTimeout(() => {
            elements.shareBtn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        showNotification('Failed to copy joke', 'error');
    });
}

// Show Notification
function showNotification(message, type = 'success') {
    elements.notification.textContent = message;
    elements.notification.className = `notification ${type === 'error' ? 'error' : 'success'}`;
    
    setTimeout(() => {
        elements.notification.classList.add('hidden');
    }, 3000);
}

// Clear History
function clearHistory() {
    if (confirm('Are you sure you want to clear all jokes?')) {
        jokeHistory = [];
        updateHistoryDisplay();
        saveHistoryToStorage();
        showNotification('History cleared!', 'success');
    }
}

// LocalStorage Management
function saveHistoryToStorage() {
    try {
        localStorage.setItem('jokeHistory', JSON.stringify(jokeHistory));
    } catch (error) {
        console.error('Failed to save history:', error);
    }
}

function loadHistoryFromStorage() {
    try {
        const saved = localStorage.getItem('jokeHistory');
        if (saved) {
            jokeHistory = JSON.parse(saved);
            updateHistoryDisplay();
        }
    } catch (error) {
        console.error('Failed to load history:', error);
    }
}

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// API Info
console.log('🎉 Joke Generator loaded!');
console.log('📡 Using JokeAPI v2: https://jokeapi.dev/');

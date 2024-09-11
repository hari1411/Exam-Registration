const essayQuestions = {
    easy: [
        "What is your favorite hobby and why?",
        "Describe a memorable event from your childhood.",
        "What are the benefits of reading books?",
        "Why is it important to have good friends?",
        "Describe your favorite vacation."
    ],
    moderate: [
        "Discuss the role of technology in education.",
        "Explain the importance of environmental conservation.",
        "Describe the advantages and disadvantages of online learning.",
        "What makes a good leader?",
        "Discuss how globalization affects local cultures."
    ],
    hard: [
        "Explain the impact of artificial intelligence on job markets.",
        "Discuss the ethical implications of genetic engineering.",
        "How can countries address climate change effectively?",
        "Analyze the effects of the digital age on human relationships.",
        "Examine the role of governments in regulating the internet."
    ]
};

const timeLimits = {
    easy: 5 * 60, // 5 minutes in seconds
    moderate: 10 * 60, // 10 minutes in seconds
    hard: 15 * 60 // 15 minutes in seconds
};

const wordLimits = {
    easy: {
        min: 100,
        max: 150
    },
    moderate: {
        min: 150,
        max: 200
    },
    hard: {
        min: 200,
        max: 250
    }
};

let selectedMode = '';
let timerInterval;
let timeRemaining;
let maxWords = 0;

function selectMode(mode) {
    selectedMode = mode;

    document.getElementById('selectModeText').classList.add('hidden');
    document.getElementById('modeSelection').classList.add('hidden');
    document.getElementById('essayQuestion').classList.remove('hidden');
    document.getElementById('timer').classList.remove('hidden');
    document.getElementById('essayArea').classList.remove('hidden');
    document.getElementById('submitButton').classList.remove('hidden');

    const questions = essayQuestions[mode];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    document.getElementById('questionText').textContent = randomQuestion;
    document.getElementById('questionText').style.fontSize = '24px'; // Adjust size as needed
    document.getElementById('questionText').style.fontWeight = 'bold'; // Make text bold

    const minWords = wordLimits[mode].min;
    maxWords = wordLimits[mode].max;
    document.getElementById('minWords').textContent = minWords;
    document.getElementById('maxWords').textContent = maxWords;

    clearInterval(timerInterval);
    startTimer(timeLimits[mode]);
}


function startTimer(duration) {
    timeRemaining = duration;
    const timerDisplay = document.getElementById('timeDisplay');

    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeRemaining--;

        if (timeRemaining === 120) {
            alert("Warning: Only 2 minutes remaining!");
            document.getElementById('warningMessage').classList.remove('hidden');
        }

        if (timeRemaining < 0) {
            clearInterval(timerInterval);
            submitEssay();
        }
    }, 1000);
}

function countWords() {
    const essayText = document.getElementById('essayText').value;
    const wordArray = essayText.split(/\s+/).filter(word => word.length > 0);
    const wordCount = wordArray.length;
    document.getElementById('wordCount').textContent = wordCount;

    let formattedText = '';
    if (wordCount > maxWords) {
        document.getElementById('wordWarningMessage').classList.remove('hidden');
        formattedText = wordArray.slice(0, maxWords).join(' ') + " " + wordArray.slice(maxWords).join(' ');
    } else {
        document.getElementById('wordWarningMessage').classList.add('hidden');
        formattedText = wordArray.join(' ');
    }

    // Display formatted text
    document.getElementById('essayTextDisplay').innerHTML = formattedText.split(' ').map((word, index) =>
        (index >= maxWords ? `<span style="color: red;">${word}</span>` : `<span>${word}</span>`)
    ).join(' ');
}

function submitEssay() {
    const wordCount = document.getElementById('wordCount').textContent;
    if (wordCount > maxWords) {
        alert("Maximum word limit exceeded! Please reduce your word count before submitting.");
        return;
    }

    clearInterval(timerInterval);
    document.getElementById('essayText').disabled = true;
    const submittedText = document.getElementById('essayText').value;
    document.getElementById('submittedEssay').value = submittedText;
    document.getElementById('submittedText').classList.remove('hidden');
    document.getElementById('essayArea').classList.add('hidden');
    document.getElementById('submitButton').classList.add('hidden');
}

// Add event listener to textarea for input changes
document.getElementById('essayText').addEventListener('input', countWords);

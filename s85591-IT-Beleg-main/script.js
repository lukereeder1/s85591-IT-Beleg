// Globale Variablen für die aktuelle Kategorie, den aktuellen Frageindex und die Anzahl der richtigen Antworten
let currentCategory = '';
let currentQuestionIndex = 0;
let correctAnswers = 0;
let progressData = {
    'mathematik': { currentQuestionIndex: 0, correctAnswers: 0 },
    'internettechnologien': { currentQuestionIndex: 0, correctAnswers: 0 },
    'allgemeines-wissen': { currentQuestionIndex: 0, correctAnswers: 0 },
    'noten-lernen': { currentQuestionIndex: 0, correctAnswers: 0 } // ← hinzugefügt
};


// Lade den Fortschritt aus dem localStorage, falls vorhanden
window.onload = function() {
    if (localStorage.getItem('progressData')) {
        progressData = JSON.parse(localStorage.getItem('progressData'));
    }
    goToMainMenu(); // Starte immer mit dem Hauptmenü
};

const questions = {
    'mathematik': shuffle([
        { question: "Potenzgesetze: $x^2+x^2$", options: ["2x^2", "x^4", "x^8", "2x^4"], answer: "2x^2" },
        { question: "Potenzgesetze: $x^2*x^2$", options: ["x^4", "x^2", "2x^2", "4x"], answer: "x^4" },
        { question: "Potenzgesetze: $\\frac{x^3}{x^2}$", options: ["x", "x^2", "x^3", "1"], answer: "x" },
        { question: "Analysis: $\\frac{d}{dx} x^2$", options: ["2x", "2", "4", "x^3"], answer: "2x" },
        { question: "Analysis: $\\frac{d}{dx} \\sin(x)$", options: ["\\cos(x)", "-\\sin(x)", "\\sin(x)", "\\pi"], answer: "\\cos(x)" },
        { question: "Wurzelrechnung: $\\sqrt{169}$", options: ["13", "19", "9", "14"], answer: "13" },
        { question: "Wurzelrechnung: $\\sqrt{484}$", options: ["22", "21", "20", "48"], answer: "22" },
        { question: "Potenzrechnung: $16^2$", options: ["256", "160", "162", "600"], answer: "256" },
        { question: "Analysis: $\\lim\\limits_{x\\rightarrow\\infty} x^2$", options: ["\\infty", "0", "2", "-\\infty"], answer: "\\infty" },
        { question: "Analysis: $\\lim\\limits_{x\\rightarrow\\infty} \\frac{1}{x}$", options: ["0", "\\infty", "1", "-\\infty"], answer: "0" }
    ]),
    'internettechnologien': shuffle([
        { question: "Was bedeutet HTML?", options: ["HyperText Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyperlinks Text Markup Language"], answer: "HyperText Markup Language" },
        { question: "Was ist CSS?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Cascading System Sheets"], answer: "Cascading Style Sheets" },
        { question: "Welche Programmiersprache wird für Webentwicklung verwendet?", options: ["Java", "Python", "JavaScript", "C++"], answer: "JavaScript" },
        { question: "Was ist ein Framework für JavaScript?", options: ["React", "Django", "Laravel", "Spring"], answer: "React" },
        { question: "Was bedeutet HTTP?", options: ["HyperText Transfer Protocol", "Hyperlink Text Transfer Protocol", "Hyper Transfer Text Protocol", "Hyperlink Transfer Protocol"], answer: "HyperText Transfer Protocol" },
        { question: "Welcher Statuscode steht für 'Nicht gefunden'?", options: ["404", "200", "500", "301"], answer: "404" },
        { question: "Was ist ein API?", options: ["Application Programming Interface", "Applied Protocol Interface", "Application Protocol Interface", "Applied Programming Interface"], answer: "Application Programming Interface" },
        { question: "Was ist eine IP-Adresse?", options: ["Internet Protocol Address", "Internet Page Address", "Internal Protocol Address", "Internal Page Address"], answer: "Internet Protocol Address" },
        { question: "Was bedeutet SEO?", options: ["Search Engine Optimization", "Search Engine Operation", "Server Engine Optimization", "Server Engine Operation"], answer: "Search Engine Optimization" },
        { question: "Was ist ein Cookie?", options: ["Ein kleiner Datensatz, den Websites auf dem Computer des Benutzers speichern", "Ein Bildformat", "Ein Videoformat", "Ein Webbrowser"], answer: "Ein kleiner Datensatz, den Websites auf dem Computer des Benutzers speichern" }
    ]),
    'allgemeines-wissen': shuffle([
        { question: "Was ist die Hauptstadt von Frankreich?", options: ["Berlin", "Madrid", "Paris", "Rom"], answer: "Paris" },
        { question: "Wie viele Kontinente gibt es auf der Erde?", options: ["5", "6", "7", "8"], answer: "7" },
        { question: "Wer schrieb 'Faust'?", options: ["Johann Wolfgang von Goethe", "Friedrich Schiller", "Heinrich Heine", "Thomas Mann"], answer: "Johann Wolfgang von Goethe" },
        { question: "Welches Element hat das chemische Symbol 'O'?", options: ["Gold", "Silber", "Osmium", "Sauerstoff"], answer: "Sauerstoff" },
        { question: "In welchem Jahr landete der erste Mensch auf dem Mond?", options: ["1965", "1969", "1972", "1980"], answer: "1969" },
        { question: "Wie viele Planeten hat unser Sonnensystem?", options: ["7", "8", "9", "10"], answer: "8" },
        { question: "Welcher ist der längste Fluss der Welt?", options: ["Nil", "Amazonas", "Yangtze", "Mississippi"], answer: "Amazonas" },
        { question: "Wer malte die Mona Lisa?", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], answer: "Leonardo da Vinci" },
        { question: "Welches Land hat die größte Bevölkerung?", options: ["Indien", "USA", "China", "Russland"], answer: "China" },
        { question: "Welches ist das größte Säugetier der Welt?", options: ["Elefant", "Blauwal", "Nashorn", "Giraffe"], answer: "Blauwal" }
    ])
};

// Funktion zum Mischen eines Arrays
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Funktion zur Auswahl einer Kategorie
function selectCategory(category) {
    currentCategory = category; // Setze die aktuelle Kategorie
    currentQuestionIndex = progressData[category].currentQuestionIndex; // Lade den aktuellen Frageindex
    correctAnswers = progressData[category].correctAnswers; // Lade die Anzahl der korrekten Antworten
    document.getElementById('category-selection').style.display = 'none'; // Verberge die Kategorieauswahl
    document.getElementById('question-container').style.display = 'block'; // Zeige den Fragencontainer
    loadQuestion(category); // Lade die erste Frage
}

// Funktion zum Laden einer Frage
function loadQuestion(category) {
    const questionObj = questions[category][currentQuestionIndex]; // Hole die aktuelle Frage
    document.getElementById('question-text').innerHTML = questionObj.question; // Zeige die Frage an
    const answerOptionsDiv = document.getElementById('answer-options'); // Container für Antwortoptionen
    answerOptionsDiv.innerHTML = ''; // Leere den Container
    shuffle(questionObj.options).forEach(option => { // Mische die Antwortoptionen
        const button = document.createElement('button'); // Erstelle einen neuen Button
        button.classList.add('answer-btn'); // Füge die Klasse 'answer-btn' hinzu
        button.innerHTML = `$${option}$`; // Setze den Text des Buttons als mathematische Formel
        button.onclick = () => checkAnswer(category, option, button); // Füge die Klickfunktion hinzu
        answerOptionsDiv.appendChild(button); // Füge den Button zum Container hinzu
    });
    MathJax.typesetPromise();  // Rendere LaTeX Formeln
    updateProgressBar(category); // Aktualisiere den Fortschrittsbalken
}

// Funktion zur Überprüfung der Antwort
function checkAnswer(category, selectedAnswer, button) {
    const questionObj = questions[category][currentQuestionIndex]; // Hole die aktuelle Frage
    if (selectedAnswer === questionObj.answer) { // Überprüfe, ob die Antwort korrekt ist
        correctAnswers++; // Erhöhe die Anzahl der korrekten Antworten
        button.classList.add('correct'); // Füge die Klasse 'correct' hinzu
    } else {
        button.classList.add('wrong'); // Füge die Klasse 'wrong' hinzu
    }
    setTimeout(() => {
        currentQuestionIndex++; // Erhöhe den Frageindex
        progressData[category].currentQuestionIndex = currentQuestionIndex; // Speichere den neuen Frageindex
        progressData[category].correctAnswers = correctAnswers; // Speichere die neue Anzahl der korrekten Antworten
        if (currentQuestionIndex < questions[category].length) { // Wenn es noch mehr Fragen gibt
            loadQuestion(category); // Lade die nächste Frage
        } else {
            showStatistics(); // Zeige die Statistik
        }
        // Speichere den Fortschritt im localStorage
        localStorage.setItem('progressData', JSON.stringify(progressData));
    }, 1000);
}

// Funktion zur Aktualisierung des Fortschrittsbalkens
function updateProgressBar(category) {
    const progressBar = document.getElementById('progress-bar'); // Fortschrittsbalken-Element
    const progress = (currentQuestionIndex / questions[category].length) * 100; // Berechne den Fortschritt in Prozent
    progressBar.style.width = progress + '%'; // Setze die Breite des Fortschrittsbalkens
}

// Funktion zum Anzeigen der Statistik
function showStatistics() {
    document.getElementById('question-container').style.display = 'none'; // Verberge den Fragencontainer
    document.getElementById('statistics-container').style.display = 'block'; // Zeige den Statistikcontainer
    document.getElementById('statistics-text').innerText = `Du hast ${correctAnswers} von ${currentQuestionIndex} Fragen richtig beantwortet.`; // Zeige die Statistik an
}

// Funktion zum Zurückkehren zum Hauptmenü
function goToMainMenu() {
    document.getElementById('question-container').style.display = 'none'; // Verberge den Fragencontainer
    document.getElementById('category-selection').style.display = 'block'; // Zeige die Kategorieauswahl
}

// Funktion zum Neustart des Quiz
function restartQuiz() {
    progressData[currentCategory].currentQuestionIndex = 0; // Setze den Frageindex zurück
    progressData[currentCategory].correctAnswers = 0; // Setze die Anzahl der korrekten Antworten zurück
    currentQuestionIndex = 0; // Setze den globalen Frageindex zurück
    correctAnswers = 0; // Setze die globale Anzahl der korrekten Antworten zurück
    document.getElementById('statistics-container').style.display = 'none'; // Verberge den Statistikcontainer
    document.getElementById('category-selection').style.display = 'block'; // Zeige die Kategorieauswahl
    const progressBar = document.getElementById('progress-bar'); // Fortschrittsbalken-Element
    progressBar.style.width = '0%'; // Setze die Breite des Fortschrittsbalkens zurück
    // Speichere den Fortschritt im localStorage
    localStorage.setItem('progressData', JSON.stringify(progressData));
}

// Funktion zum Zurücksetzen aller Fortschritte
function resetAll() {
    progressData = {
        'mathematik': { currentQuestionIndex: 0, correctAnswers: 0 },
        'internettechnologien': { currentQuestionIndex: 0, correctAnswers: 0 },
        'allgemeines-wissen': { currentQuestionIndex: 0, correctAnswers: 0 },
        'noten-lernen': { currentQuestionIndex: 0, correctAnswers: 0 } // ← hinzugefügt
    };
    currentQuestionIndex = 0;
    correctAnswers = 0;
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('category-selection').style.display = 'block';
    document.getElementById('statistics-container').style.display = 'none';
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = '0%';
    localStorage.removeItem('progressData');
}

// Funktion zum Überspringen einer Frage
function skipQuestion() {
    currentQuestionIndex++; // Erhöhe den Frageindex
    if (currentQuestionIndex < questions[currentCategory].length) { // Wenn es noch mehr Fragen gibt
        loadQuestion(currentCategory); // Lade die nächste Frage
    } else {
        showStatistics(); // Zeige die Statistik
    }
    // Speichere den Fortschritt im localStorage
    localStorage.setItem('progressData', JSON.stringify(progressData));
}

// Funktion zum Laden einer externen Frage
// Hinweis: ab diesem part wurde sich Hilfe durch u.a  gpt genommen  
function loadExternalQuestion() {
    console.log("Loading external question...");
    fetch('http://localhost:8888/api/quizzes/2', { // Hole eine externe Frage von der API
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa('s85619@htw-dresden.de:secret'), // Basic Authentifizierung
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log("Response received:", response);
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Fehlerbehandlung
        }
        return response.json(); // Konvertiere die Antwort in JSON
    })
    .then(data => {
        console.log("Data received:", data);
        const externalQuestion = { // Erstelle ein Objekt für die externe Frage
            question: data.text,
            options: data.options,
            id: data.id
        };
        displayExternalQuestion(externalQuestion); // Zeige die externe Frage an
    })
    .catch(error => console.error('Error:', error)); // Fehlerbehandlung
}

// Funktion zum Anzeigen der externen Frage
function displayExternalQuestion(questionObj) {
    console.log("Displaying external question:", questionObj);
    document.getElementById('category-selection').style.display = 'none'; // Verberge die Kategorieauswahl
    document.getElementById('question-container').style.display = 'block'; // Zeige den Fragencontainer
    document.getElementById('question-text').innerText = questionObj.question; // Zeige die Frage an
    const answerOptionsDiv = document.getElementById('answer-options'); // Container für Antwortoptionen
    answerOptionsDiv.innerHTML = ''; // Leere den Container
    shuffle(questionObj.options).forEach((option, index) => { // Mische die Antwortoptionen
        const button = document.createElement('button'); // Erstelle einen neuen Button
        button.classList.add('answer-btn'); // Füge die Klasse 'answer-btn' hinzu
        button.innerHTML = `$${option}$`; // Setze den Text des Buttons als mathematische Formel
        button.onclick = () => checkExternalAnswer(questionObj.id, [index], button); // Füge die Klickfunktion hinzu
        answerOptionsDiv.appendChild(button); // Füge den Button zum Container hinzu
    });
    MathJax.typesetPromise();  // Rendere LaTeX Formeln
    document.getElementById('progress').style.display = 'none'; // Verberge den Fortschrittsbalken
}

// Funktion zur Überprüfung der Antwort einer externen Frage
function checkExternalAnswer(questionId, selectedAnswer, button) {
    console.log("Checking answer for question ID:", questionId);
    fetch(`http://localhost:8888/api/quizzes/${questionId}/solve`, { // Überprüfe die Antwort über die API
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa('s85619@htw-dresden.de:secret'), // Basic Authentifizierung
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedAnswer) // Sende die gewählte Antwort
    })
    .then(response => {
        console.log("Response received:", response);
        if (!response.ok) {
            throw new Error('Network response was not ok'); // Fehlerbehandlung
        }
        return response.json(); // Konvertiere die Antwort in JSON
    })
    .then(data => {
        console.log("Data received:", data);
        if (data.success) {
            button.classList.add('correct'); // Markiere den Button als korrekt
        } else {
            button.classList.add('wrong'); // Markiere den Button als falsch
        }
        setTimeout(() => {
            showExternalStatistics(data.success); // Zeige die Statistik an
        }, 1000);
    })
    .catch(error => console.error('Error:', error)); // Fehlerbehandlung
}

// Funktion zum Anzeigen der Statistik für eine externe Frage
function showExternalStatistics(success) {
    console.log("Showing statistics, success:", success);
    document.getElementById('question-container').style.display = 'none'; // Verberge den Fragencontainer
    document.getElementById('statistics-container').style.display = 'block'; // Zeige den Statistikcontainer
    document.getElementById('statistics-text').innerText = success ? 
        "Herzlichen Glückwunsch, Sie haben die Frage richtig beantwortet!" : 
        "Falsche Antwort! Bitte versuchen Sie es erneut."; // Zeige das Ergebnis an
}
function selectCategory(category) {
    currentCategory = category;
    currentQuestionIndex = progressData[category] ? progressData[category].currentQuestionIndex : 0;
    correctAnswers = progressData[category] ? progressData[category].correctAnswers : 0;

    document.getElementById('category-selection').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';

    if (category === 'noten-lernen') {
        document.getElementById('music-score').style.display = 'block'; // Zeige Noten an
        loadMusicQuestion();
    } else {
        document.getElementById('music-score').style.display = 'none';  // Verstecke Noten
        loadQuestion(category);
    }
}


function loadMusicQuestion() {
    // Fortschrittsdaten für noten-lernen initialisieren, falls noch nicht vorhanden
    if (!progressData['noten-lernen']) {
        progressData['noten-lernen'] = { currentQuestionIndex: 0, correctAnswers: 0 };
    }

    // Prüfen, ob 10 Fragen bereits beantwortet wurden → zeige Statistik
    if (currentQuestionIndex >= 10) {
        showStatistics();
        return;
    }

    // Notenanzeige leeren
    document.getElementById('music-score').innerHTML = '';

    // Initialisiere VexFlow zum Zeichnen von Musiknoten (SVG-Renderer)
    const VF = Vex.Flow;
    const div = document.getElementById("music-score");
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(500, 200);
    const context = renderer.getContext();

    // Erzeuge ein Notensystem mit Violinschlüssel
    const stave = new VF.Stave(10, 40, 400);
    stave.addClef("treble").setContext(context).draw();

    // Liste möglicher Noten
    const notesList = ["c/4", "d/4", "e/4", "f/4", "g/4", "a/4", "b/4"];
    const randomNotes = [];            // Für VexFlow-StaveNotes
    const correctAnswerNames = [];     // Richtige Buchstabenantworten (C D E F ...)

    // Wähle 4 zufällige Noten und speichere sie
    for (let i = 0; i < 4; i++) {
        let note = notesList[Math.floor(Math.random() * notesList.length)];
        randomNotes.push(new VF.StaveNote({ clef: "treble", keys: [note], duration: "q" }));
        correctAnswerNames.push(note[0].toUpperCase()); // z. B. "c/4" → "C"
    }

    // Erzeuge Stimme (Rhythmus) und füge die Noten hinzu
    const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(randomNotes);
    new VF.Formatter().joinVoices([voice]).format([voice], 350);
    voice.draw(context, stave);

    // Frage anzeigen
    document.getElementById('question-text').innerText = "Welche Noten sind dargestellt?";

    // Antwortmöglichkeiten definieren (inkl. korrekt)
    const allPossibleAnswers = ["C D E F", "D E F G", "E F G A", "F G A B", "A B C D"];
    const correctAnswer = correctAnswerNames.join(' ');

    // Zufällige Antwortoptionen generieren (inkl. richtige)
    let options = [correctAnswer];
    while (options.length < 4) {
        let opt = allPossibleAnswers[Math.floor(Math.random() * allPossibleAnswers.length)];
        if (!options.includes(opt)) options.push(opt);
    }

    // Antworten mischen
    shuffle(options);

    // Alte Antwortbuttons entfernen
    const answerOptionsDiv = document.getElementById('answer-options');
    answerOptionsDiv.innerHTML = '';

    // Neue Antwortbuttons erzeugen
    options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('answer-btn');
        button.innerText = option;

        button.onclick = () => {
            // Alle Buttons deaktivieren nach Klick
            const allButtons = document.querySelectorAll('.answer-btn');
            allButtons.forEach(btn => btn.disabled = true);

            // Antwort überprüfen
            if (option === correctAnswer) {
                button.classList.add('correct');
                correctAnswers++;
            } else {
                button.classList.add('wrong');
            }

            // Fragenzähler erhöhen
            currentQuestionIndex++;

            // Fortschritt speichern
            progressData['noten-lernen'].currentQuestionIndex = currentQuestionIndex;
            progressData['noten-lernen'].correctAnswers = correctAnswers;
            localStorage.setItem('progressData', JSON.stringify(progressData));

            // Nächste Frage oder Statistik nach kurzer Pause anzeigen
            setTimeout(() => {
                if (currentQuestionIndex < 10) {
                    loadMusicQuestion();
                } else {
                    showStatistics();
                }
            }, 1200);
        };

        // Button zur Oberfläche hinzufügen
        answerOptionsDiv.appendChild(button);
    });

    // Fortschrittsbalken anzeigen und aktualisieren
    document.getElementById('progress').style.display = 'block';
    const progressBar = document.getElementById('progress-bar');
    const progress = (currentQuestionIndex / 10) * 100;
    progressBar.style.width = progress + '%';
}



# s85591-IT-Beleg

# Lernprogramm - Quiz-Applikation

Dies ist ein Lernprogramm, das Benutzern ermöglicht, Fragen aus verschiedenen Kategorien zu beantworten und ihren Fortschritt zu verfolgen. Das Projekt verwendet HTML, CSS und JavaScript und bindet MathJax für die Darstellung von mathematischen Formeln ein.

## Inhaltsverzeichnis
- [Projektübersicht](#projektübersicht)
- [Installation und Nutzung](#installation-und-nutzung)
- [Projektstruktur](#projektstruktur)
- [Erklärung des Codes](#erklärung-des-codes)
- [Genutzte Technologien](#genutzte-technologien)
- [Mögliche Probleme](#mögliche-probleme)
- [Erweiterungs- und Verbesserungsvorschläge](#erweiterungs-und-verbesserungsvorschläge)


## Projektübersicht
Das Lernprogramm besteht aus einem Quiz-System, bei dem Benutzer aus drei Kategorien wählen können: Mathematik, Internettechnologien und Allgemeines Wissen. Jede Kategorie enthält eine Reihe von Fragen, und der Fortschritt des Benutzers wird gespeichert und kann später wieder aufgenommen werden. Das Programm bietet auch die Möglichkeit, externe Fragen zu laden.

## Installation und Nutzung
1. Klonen Sie das Repository:
   ```sh
   git clone https://github.com/HTWDD-RN/s85619-IT-Beleg.git

2. Navigieren in Projektverzeichnis
   ```sh
   cd lernprogramm

4. Öffnen Sie die Datei index.html in Ihrem bevorzugten Browser.



 ## Projektstruktur
```
Lernprogramm
 
    ├── index.html         
    ├── style.css                 
    ├── script.js    
    └── README.md
```          
   

## Erklärung des Codes

### index.html
Dies ist die Haupt-HTML-Datei, die die Struktur der Anwendung definiert. Sie enthält Verweise auf die CSS-Datei styles.css und die JavaScript-Datei script.js.

### styles.css
Diese Datei enthält alle CSS-Stile für das Projekt, um das Layout und das Design der Anwendung zu definieren. Dazu gehören Stile für den Hintergrund, Schaltflächen und verschiedene Container.

### script.js
In dieser Datei befindet sich die gesamte Logik der Anwendung. Sie enthält Funktionen zur Verwaltung der Fragen, Überprüfung der Antworten, Aktualisierung des Fortschritts und zum Laden externer Fragen. 

> [!NOTE]
> ## Genutzte Technologien
>HTML: Für die Struktur der Webseite.
> 
>CSS: Für das Styling der Webseite.
> 
>JavaScript: Für die Funktionalität der Webseite.
> 
>MathJax: Für die Darstellung von mathematischen Formeln.

> [!IMPORTANT]
> ## Mögliche Probleme
>Kompatibilität mit älteren Browsern: Die Anwendung verwendet moderne JavaScript-Features, die möglicherweise nicht in älteren Browsern unterstützt werden.
> 
>MathJax Ladezeiten: MathJax kann beim ersten Laden der Seite etwas Zeit in Anspruch nehmen, was die Ladegeschwindigkeit der Fragen beeinflussen könnte.
> 
>Externe API: Beim Laden externer Fragen kann es zu Problemen kommen, wenn die API nicht erreichbar ist oder die Authentifizierung fehlschlägt.

> [!TIP]
> ## Erweiterungs- und Verbesserungsvorschläge
> Mehr Fragenkategorien: hinzufügen zusätzlicher Kategorien und Fragen , um das Quiz abwechslungsreicher zu gestalten.
>
> Multiplayer-Modus: Implementieren eines  Modus, in dem mehrere Benutzer gegeneinander antreten können.
>
> Fortschrittssynchronisierung: Speichern des Fortschritts der Benutzer auf einem Server, sodass sie von verschiedenen Geräten darauf zugreifen können.
>
> Erweiterte Statistiken: hinzufügen detailliertere Statistiken, wie z.B. die durchschnittliche Antwortzeit oder die häufigsten Fehler.

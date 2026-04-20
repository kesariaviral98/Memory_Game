# Memory Game

A simple browser-based memory card game built with HTML, CSS, and vanilla JavaScript using DOM manipulation.

## Description

This project is a classic card matching game where players flip two cards at a time and try to find all matching pairs. The interface is generated and updated through the DOM, including:

- creating the game cards dynamically with JavaScript
- handling click events for card flips
- tracking moves and elapsed time
- checking matches and showing the win message

Font Awesome icons are used as the card symbols.

## Features

- 4x4 memory card grid
- randomized card order on load
- move counter
- timer that starts on the first move
- match detection and win message

## Tech Stack

- HTML
- CSS
- JavaScript
- DOM manipulation

## Project Structure

```text
Memory_Game/
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore
```

## How to Run

1. Clone the repository.
2. Open `index.html` in your browser.

## GitHub Repository Description

Vanilla JavaScript memory card game built with HTML, CSS, and DOM manipulation.

## Add GitHub Without Affecting GitLab

Your GitLab remote can stay exactly as it is by keeping it as `origin` and adding GitHub as a second remote.

Example:

```bash
git remote -v
git remote add github git@github.com:<your-username>/memory-game.git
git remote -v
git push -u github <your-branch-name>
```

If your current branch is `main`, the last command becomes:

```bash
git push -u github main
```

This keeps GitLab untouched because pushes to GitLab will still use `origin`.

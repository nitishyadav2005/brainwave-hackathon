# 🚀 CodeTrack — 60-Day Developer Challenge

> **Build. Commit. Share. Repeat.**

CodeTrack is a 60-day developer challenge platform built for college students to develop coding consistency, build real projects, maintain a public learning streak, and create visible proof of their work.

Instead of just watching tutorials, students **build something every day**, submit their work through GitHub and LinkedIn, track their progress, unlock achievements, and earn milestone certificates.

---

## 🌐 Live Demo

**[Visit CodeTrack →](https://codetrack-60.vercel.app/)**

---

## ✨ Features

### 🗓️ 60-Day Coding Challenge

- Daily coding missions
- Day-by-day progression
- Completed, current, and upcoming day states
- 60-day journey tracker
- Progress percentage
- Daily challenge tracking

### 🔥 Streak System

- Daily coding streak tracking
- Active streak indicator
- Streak milestones
- Limited Streak Saver system
- Protect coding progress when a streak is missed

### 🔗 Proof of Work

CodeTrack focuses on **real proof of work**, not just task completion.

Users can submit:

- GitHub commits/repository proof
- LinkedIn posts

This helps students build a public record of what they actually created during the challenge.

### 🏆 Achievements

Users can unlock achievements based on their activity:

| Achievement | Requirement |
|---|---|
| 🌙 Late Night Coder | Complete a task after 10 PM |
| ☀️ Early Bird | Complete a task before 8 AM |
| 🔗 LinkedIn Builder | Submit your first LinkedIn post |
| 📢 Build in Public | Submit 10 LinkedIn posts |
| ⚡ Commit Machine | Submit 10 GitHub commits |
| 🏆 Challenge Champion | Complete all 60 days with required submissions |

Unlocked achievements are visually highlighted to make progress feel rewarding.

### 🏅 Milestones & Certificates

Certificate milestones are integrated directly into the 60-day Journey Grid.

Certificates are available at:

**Day 10 → Day 20 → Day 30 → Day 40 → Day 50 → Day 60**

Milestones visually indicate whether they are:

- 🔒 Locked
- 🏅 Upcoming
- 🏆 Unlocked

Users can access their milestone certificate when the required progress is completed.

### 👤 User Profile

Each user has a personal profile with:

- Profile picture
- Name
- College
- Development track
- Current streak
- Current challenge day
- Achievements

Users can upload and update their profile picture.

### 📱 Responsive Design

CodeTrack is designed to work across:

- 📱 Mobile
- 📲 Tablet
- 💻 Laptop
- 🖥️ Desktop

The dashboard, Journey Grid, achievements, profile, and navigation adapt to different screen sizes.

---

## 🎨 Design

CodeTrack uses a clean, modern, student-focused interface with:

- Responsive layouts
- Claymorphism-inspired UI
- Rounded components
- Clear visual hierarchy
- Progress visualization
- Achievement states
- Milestone indicators
- Smooth animations
- Mobile-first considerations

The goal is to make a student's coding progress **visible, motivating, and easy to understand**.

---

## 🛠️ Tech Stack

### Frontend

- **React 19**
- **TypeScript 5**
- **Vite 6**

### Styling & UI

- **Tailwind CSS v4**
- **Lucide React**
- **Motion (Framer Motion)**

### Data & Utilities

- **LocalStorage** — Persistent client-side data for authentication state, challenge progress, streak history, achievements, proof data, and certificate unlocks.
- **HTML2PDF.js** — Client-side PDF generation for milestone certificates.

### Backend

- **Java**
- **Spring Boot**
- **Maven**
- **REST APIs**

The project includes a Spring Boot backend inside the `/backend` directory for API and server-side integration.

---

## 🏗️ Project Architecture

```text
                         CodeTrack
                            │
             ┌──────────────┴──────────────┐
             │                             │
          Frontend                      Backend
             │                             │
     React + TypeScript              Java + Spring Boot
             │                             │
          Vite 6                         Maven
             │                             │
     ┌───────┼────────┐                    │
     │       │        │                    │
 Tailwind  Motion  LocalStorage        REST APIs
     │       │        │                    │
     └───────┴────────┴────────────────────┘

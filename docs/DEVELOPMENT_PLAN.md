# SpeakEasy AAC - 5-Day Development Plan

**Version:** 1.0  
**Date:** December 5, 2024  
**Sprint Goal:** Build a functional MVP communication board with text-to-speech

---

## Overview

This document outlines a segmented 5-day development plan to create the foundational MVP of SpeakEasy AAC. Each day has specific goals, tasks, and deliverables.

### MVP Scope (5 Days)
- ✅ Project setup and infrastructure
- ✅ Core UI components (board, symbols, navigation)
- ✅ Text-to-speech integration
- ✅ Basic symbol library with categories
- ✅ Offline-first PWA functionality
- ✅ Settings panel (voice, display)
- ✅ Basic customization (grid size)

### Out of Scope (Future Sprints)
- Sentence building strip
- Custom image upload
- Visual schedules
- User profiles
- Cloud backup

---

## Day 1: Project Foundation & Setup

### 🎯 Goal
Establish the development environment, project structure, and core infrastructure.

### Tasks

#### Morning (4 hours)

| Task | Description | Time |
|------|-------------|------|
| 1.1 | Create Vite + React + TypeScript project | 30min |
| 1.2 | Configure Tailwind CSS with custom theme | 30min |
| 1.3 | Set up project directory structure | 30min |
| 1.4 | Configure ESLint, Prettier, and TypeScript strict mode | 30min |
| 1.5 | Install and configure core dependencies | 30min |
| 1.6 | Set up Dexie.js database schema | 1hr |

#### Afternoon (4 hours)

| Task | Description | Time |
|------|-------------|------|
| 1.7 | Configure Vite PWA plugin | 1hr |
| 1.8 | Create base Layout component | 1hr |
| 1.9 | Implement theme system (CSS variables) | 1hr |
| 1.10 | Write initial test setup | 30min |
| 1.11 | Update development log | 30min |

### Deliverables
- [ ] Running development server at `localhost:5173`
- [ ] TypeScript compiling without errors
- [ ] Tailwind styles working
- [ ] Basic app shell rendering
- [ ] PWA manifest configured
- [ ] Database schema defined

### Dependencies to Install
```bash
# Core
npm create vite@latest speakeasy-aac -- --template react-ts
cd speakeasy-aac

# Styling
npm install -D tailwindcss postcss autoprefixer
npm install @tailwindcss/forms

# State & Storage
npm install zustand dexie

# PWA
npm install -D vite-plugin-pwa workbox-window

# Utilities
npm install nanoid clsx

# Development
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @types/node
```

### Success Criteria
- `npm run dev` starts without errors
- `npm run build` completes successfully
- App installs as PWA on mobile device
- Theme toggle changes colors

---

## Day 2: Core UI Components

### 🎯 Goal
Build the main visual components: symbol grid, symbol cards, and navigation.

### Tasks

#### Morning (4 hours)

| Task | Description | Time |
|------|-------------|------|
| 2.1 | Create SymbolCard component with animations | 1.5hr |
| 2.2 | Create SymbolGrid component (responsive grid) | 1.5hr |
| 2.3 | Implement grid size variants (2x2 to 6x6) | 1hr |

#### Afternoon (4 hours)

| Task | Description | Time |
|------|-------------|------|
| 2.4 | Create Header component with navigation | 1hr |
| 2.5 | Create CategoryNav breadcrumb component | 1hr |
| 2.6 | Build BoardView page component | 1.5hr |
| 2.7 | Add loading and error states | 30min |

### Deliverables
- [ ] SymbolCard displays image + label, handles tap
- [ ] SymbolGrid renders configurable grid of symbols
- [ ] Header with Home, Settings, and Edit buttons
- [ ] Category navigation with back button
- [ ] Responsive layout for tablet and phone

### Component Specifications

#### SymbolCard
```
┌─────────────────────┐
│                     │
│      [IMAGE]        │
│                     │
├─────────────────────┤
│       Label         │
└─────────────────────┘
- Tap: trigger speech
- Visual feedback on tap
- Min touch target: 44x44px
```

#### SymbolGrid (4x4 example)
```
┌─────┬─────┬─────┬─────┐
│  □  │  □  │  □  │  □  │
├─────┼─────┼─────┼─────┤
│  □  │  □  │  □  │  □  │
├─────┼─────┼─────┼─────┤
│  □  │  □  │  □  │  □  │
├─────┼─────┼─────┼─────┤
│  □  │  □  │  □  │  □  │
└─────┴─────┴─────┴─────┘
```

### Success Criteria
- Grid displays correctly on iPad and iPhone
- Tapping symbol shows visual feedback
- Grid size changes dynamically
- Navigation stack works (Home → Category → Back)

---

## Day 3: Text-to-Speech & Symbol Library

### 🎯 Goal
Implement speech synthesis and load initial symbol library.

### Tasks

#### Morning (4 hours)

| Task | Description | Time |
|------|-------------|------|
| 3.1 | Build SpeechService class | 1.5hr |
| 3.2 | Create useSpeech hook | 1hr |
| 3.3 | Implement voice selection logic | 1hr |
| 3.4 | Test TTS across browsers | 30min |

#### Afternoon (4 hours)

| Task | Description | Time |
|------|-------------|------|
| 3.5 | Create symbol data structure | 30min |
| 3.6 | Build core vocabulary symbol set (100 symbols) | 2hr |
| 3.7 | Organize symbols into categories | 30min |
| 3.8 | Connect symbols to TTS on tap | 30min |
| 3.9 | Add speech state indicators | 30min |

### Deliverables
- [ ] Speech service with speak/stop methods
- [ ] Voice selection from available system voices
- [ ] 100+ core vocabulary symbols loaded
- [ ] Symbols organized in categories
- [ ] Tapping symbol speaks the word
- [ ] Visual indicator while speaking

### Symbol Categories (MVP)
```
home/
├── core/         (I, you, want, need, go, stop, help, more, yes, no)
├── people/       (mom, dad, brother, sister, teacher, friend)
├── feelings/     (happy, sad, angry, tired, hungry, thirsty)
├── food/         (eat, drink, water, milk, apple, cookie)
├── actions/      (play, read, watch, listen, walk, sleep)
├── places/       (home, school, bathroom, outside, car)
└── things/       (phone, tablet, ball, book, toy, TV)
```

### Success Criteria
- Tapping any symbol speaks the word aloud
- Works on iOS Safari and Chrome
- Voice is clear and appropriately paced
- All 100+ symbols display correctly

---

## Day 4: State Management & Persistence

### 🎯 Goal
Implement state management, local storage, and board navigation.

### Tasks

#### Morning (4 hours)

| Task | Description | Time |
|------|-------------|------|
| 4.1 | Create boardStore (Zustand) | 1.5hr |
| 4.2 | Create settingsStore (Zustand) | 1hr |
| 4.3 | Create speechStore (Zustand) | 1hr |
| 4.4 | Connect stores to components | 30min |

#### Afternoon (4 hours)

| Task | Description | Time |
|------|-------------|------|
| 4.5 | Implement StorageService for IndexedDB | 1.5hr |
| 4.6 | Add default data initialization | 1hr |
| 4.7 | Persist settings to LocalStorage | 30min |
| 4.8 | Add category navigation (tap category → new board) | 1hr |

### Deliverables
- [ ] Board state persists across page refreshes
- [ ] Settings persist (voice, grid size, theme)
- [ ] Navigation: Home → Category → Symbol selection
- [ ] Back button returns to previous board
- [ ] Data initializes correctly on first load

### Data Flow
```
User taps symbol
      │
      ▼
SymbolCard onClick
      │
      ├──► Is category? ──► boardStore.navigateToBoard()
      │                            │
      │                            ▼
      │                      Load new board
      │                      Update navigation stack
      │
      └──► Is symbol? ──► speechStore.speakWord()
                               │
                               ▼
                         SpeechService.speak()
                               │
                               ▼
                         Audio output
```

### Success Criteria
- App remembers last viewed board
- Settings persist after closing app
- Navigation history enables back button
- First launch initializes default data

---

## Day 5: Settings, Polish & PWA

### 🎯 Goal
Complete settings panel, polish UI, ensure offline functionality, and prepare for deployment.

### Tasks

#### Morning (4 hours)

| Task | Description | Time |
|------|-------------|------|
| 5.1 | Build SettingsPanel component | 1.5hr |
| 5.2 | Implement VoiceSettings (voice, rate, pitch) | 1hr |
| 5.3 | Implement DisplaySettings (theme, grid size) | 1hr |
| 5.4 | Add settings persistence | 30min |

#### Afternoon (4 hours)

| Task | Description | Time |
|------|-------------|------|
| 5.5 | Complete service worker caching | 1hr |
| 5.6 | Test offline functionality | 30min |
| 5.7 | Add PWA install prompt | 30min |
| 5.8 | UI polish and accessibility review | 1hr |
| 5.9 | Write README and documentation | 30min |
| 5.10 | Final testing and bug fixes | 30min |

### Deliverables
- [ ] Settings panel with voice and display options
- [ ] Theme switching (light/dark/high-contrast)
- [ ] App works 100% offline
- [ ] PWA installable on iOS and Android
- [ ] README with setup instructions
- [ ] All known bugs fixed

### Settings Panel Layout
```
┌────────────────────────────────┐
│         ⚙️ Settings            │
├────────────────────────────────┤
│                                │
│  Voice                         │
│  ├─ Voice: [Dropdown ▼]       │
│  ├─ Speed: [────●────]        │
│  └─ Pitch: [────●────]        │
│                                │
│  Display                       │
│  ├─ Theme: ○ Light ● Dark     │
│  ├─ Grid Size: [4x4 ▼]        │
│  └─ Show Labels: [✓]          │
│                                │
│  Accessibility                 │
│  ├─ High Contrast: [ ]        │
│  └─ Haptic Feedback: [✓]      │
│                                │
│  About                         │
│  └─ Version 0.1.0              │
│                                │
└────────────────────────────────┘
```

### Success Criteria
- Settings changes apply immediately
- Settings persist after app restart
- App loads and works with no internet
- PWA can be installed from browser
- Passes basic accessibility checks

---

## Daily Schedule Template

```
┌────────────────────────────────────────────────────────────────┐
│                     DAILY SCHEDULE                              │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  09:00 - 09:15  │  Review goals, check dev log                 │
│  09:15 - 12:00  │  Morning tasks (deep work)                   │
│  12:00 - 13:00  │  Lunch break                                 │
│  13:00 - 17:00  │  Afternoon tasks                             │
│  17:00 - 17:30  │  Testing & bug fixes                         │
│  17:30 - 18:00  │  Update dev log, commit code, plan tomorrow  │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| TTS not working on Safari | Medium | High | Test early, have fallback messaging |
| Symbol loading slow | Low | Medium | Optimize images, lazy load |
| IndexedDB issues | Low | High | Test on all browsers, have localStorage fallback |
| Scope creep | High | Medium | Strictly follow MVP scope, defer to backlog |
| Accessibility gaps | Medium | High | Run axe-core daily, test with screen reader |

---

## End of Sprint Checklist

### Functionality
- [ ] Can tap symbols to hear words
- [ ] Can navigate between categories
- [ ] Settings persist across sessions
- [ ] Works offline after first load

### Quality
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Passes ESLint checks
- [ ] Basic accessibility (touch targets, contrast)

### Documentation
- [ ] README is complete
- [ ] Dev log is updated
- [ ] Code has JSDoc comments

### Deployment
- [ ] Builds without errors
- [ ] PWA manifest valid
- [ ] Service worker registered
- [ ] Ready for hosting deployment

---

## Post-Sprint Planning

### Week 2 Priorities
1. Sentence building strip
2. Custom image upload
3. More symbols (expand to 500+)
4. Quick phrases panel

### Week 3 Priorities
1. Visual schedules
2. User profiles
3. Data export/import
4. Performance optimization

### Week 4 Priorities
1. Beta testing with families
2. Accessibility audit
3. Bug fixes from feedback
4. Deployment to production

---

*This plan will be updated daily based on progress and learnings.*


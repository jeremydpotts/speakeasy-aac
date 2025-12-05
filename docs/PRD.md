# SpeakEasy AAC - Product Requirements Document

**Document Version:** 1.0  
**Date:** December 5, 2024  
**Author:** Development Team  
**Status:** Draft

---

## 1. Introduction

### 1.1 Purpose
This Product Requirements Document (PRD) defines the specifications, features, and requirements for **SpeakEasy AAC**, a free, open-source Augmentative and Alternative Communication application designed primarily for nonverbal autistic children and their families.

### 1.2 Scope
SpeakEasy AAC will be a Progressive Web Application (PWA) that provides symbol-based communication tools, text-to-speech output, visual schedules, and customization capabilities—all without cost barriers.

### 1.3 Vision Statement
> *"Every voice deserves to be heard. SpeakEasy AAC empowers nonverbal individuals to communicate freely, without financial barriers."*

### 1.4 Project Goals
1. Provide a **free**, fully-functional AAC solution
2. Ensure **cross-platform** accessibility (any device with a browser)
3. Enable **offline** functionality for reliability
4. Deliver a **beautiful, intuitive** user experience
5. Support **easy customization** for families
6. Maintain **privacy-first** design principles

---

## 2. Target Users

### 2.1 Primary Users

#### Nonverbal Children (Ages 2-18)
- **Needs:** Simple, reliable communication tool
- **Characteristics:** 
  - Varying cognitive abilities
  - Different motor skill levels
  - May have sensory sensitivities
  - Need predictable, consistent interface
- **Goals:** Express needs, wants, feelings, and thoughts

#### Parents/Caregivers
- **Needs:** Easy setup, customization, reliability
- **Characteristics:**
  - Often non-technical
  - Time-constrained
  - Emotionally invested in child's communication
- **Goals:** Help child communicate, reduce frustration

### 2.2 Secondary Users

#### Speech-Language Pathologists (SLPs)
- **Needs:** Professional-grade features, progress tracking
- **Goals:** Implement effective AAC intervention

#### Educators
- **Needs:** Classroom-compatible tools
- **Goals:** Support student communication in educational settings

---

## 3. User Stories

### 3.1 Child/User Stories

| ID | Story | Priority |
|----|-------|----------|
| U-01 | As a user, I want to tap a picture to hear a word spoken so I can communicate my needs | P0 |
| U-02 | As a user, I want to see large, clear pictures so I can easily find what I want to say | P0 |
| U-03 | As a user, I want to build sentences by tapping multiple pictures so I can express complex thoughts | P1 |
| U-04 | As a user, I want to see my daily schedule so I know what's happening next | P1 |
| U-05 | As a user, I want quick access to common phrases like "I need help" or "bathroom" | P0 |

### 3.2 Caregiver Stories

| ID | Story | Priority |
|----|-------|----------|
| C-01 | As a caregiver, I want to add photos of family members so my child can talk about people they know | P0 |
| C-02 | As a caregiver, I want to customize categories based on my child's interests and needs | P0 |
| C-03 | As a caregiver, I want the app to work without internet so it's reliable everywhere | P0 |
| C-04 | As a caregiver, I want to adjust grid size based on my child's motor abilities | P1 |
| C-05 | As a caregiver, I want to back up my customizations so I don't lose them | P1 |
| C-06 | As a caregiver, I want to see which symbols my child uses most so I can understand their needs | P2 |

### 3.3 SLP/Educator Stories

| ID | Story | Priority |
|----|-------|----------|
| S-01 | As an SLP, I want to create multiple user profiles for different clients | P1 |
| S-02 | As an SLP, I want to implement core vocabulary strategy with quick access to high-frequency words | P1 |
| S-03 | As an educator, I want to use the app on classroom tablets without expensive licenses | P0 |

---

## 4. Feature Specifications

### 4.1 Core Features (MVP - Phase 1)

#### 4.1.1 Communication Board
**Description:** Grid-based interface displaying symbols that speak when tapped

**Requirements:**
- FR-01: Display symbols in configurable grid (2x2, 3x3, 4x4, 5x5, 6x6)
- FR-02: Each symbol tap triggers text-to-speech output
- FR-03: Support category navigation (Home → Food → specific foods)
- FR-04: Provide "back" navigation to return to previous boards
- FR-05: Include "home" button to return to main board
- FR-06: Support both tap and hold gestures

**Acceptance Criteria:**
- [ ] User can tap symbol and hear word within 200ms
- [ ] Grid adjusts responsively to screen size
- [ ] Navigation is clear and intuitive
- [ ] Works on tablets and phones

#### 4.1.2 Text-to-Speech Engine
**Description:** Converts symbol text to spoken audio

**Requirements:**
- FR-07: Use Web Speech API for cross-browser support
- FR-08: Provide multiple voice options (male, female, child-like)
- FR-09: Allow adjustable speech rate (0.5x to 2x)
- FR-10: Allow adjustable pitch
- FR-11: Support offline speech synthesis
- FR-12: Queue multiple words for sentence building

**Acceptance Criteria:**
- [ ] Speech works without internet connection
- [ ] At least 3 voice options available
- [ ] Speech rate and pitch persist across sessions

#### 4.1.3 Symbol Library
**Description:** Pre-loaded collection of communication symbols

**Requirements:**
- FR-13: Include 500+ core vocabulary symbols (MVP)
- FR-14: Use ARASAAC symbols (CC BY-NC-SA license)
- FR-15: Organize symbols into logical categories
- FR-16: Support symbol search functionality
- FR-17: Cache symbols locally for offline access

**Categories (MVP):**
- Core Words (I, you, want, need, go, stop, help, more, done, yes, no)
- People (family, friends, teachers)
- Actions/Verbs
- Feelings/Emotions
- Food & Drink
- Places
- Things/Objects
- Time (now, later, today, tomorrow)
- Questions (what, where, who, when, why)
- Social (hello, goodbye, please, thank you)

#### 4.1.4 Offline Support
**Description:** Full functionality without internet connection

**Requirements:**
- FR-18: Service worker for offline caching
- FR-19: Store all symbols locally after first load
- FR-20: Store user customizations in IndexedDB
- FR-21: Sync capabilities when online (future)

**Acceptance Criteria:**
- [ ] App functions 100% after initial load without internet
- [ ] All user data persists across sessions

### 4.2 Customization Features (MVP - Phase 1)

#### 4.2.1 Custom Images
**Description:** Add personal photos/images to communication board

**Requirements:**
- FR-22: Upload images from device camera/gallery
- FR-23: Crop/resize images to fit symbol format
- FR-24: Associate text/audio with custom images
- FR-25: Record custom audio for any symbol

**Acceptance Criteria:**
- [ ] User can add photo in under 60 seconds
- [ ] Photos display correctly on all grid sizes

#### 4.2.2 Board Customization
**Description:** Modify communication boards to user needs

**Requirements:**
- FR-26: Add/remove symbols from boards
- FR-27: Rearrange symbol order via drag-and-drop
- FR-28: Create new categories/boards
- FR-29: Rename categories and symbols
- FR-30: Adjust grid size per board

#### 4.2.3 User Settings
**Description:** Global app preferences

**Requirements:**
- FR-31: Color themes (light, dark, high contrast)
- FR-32: Voice selection and settings
- FR-33: Grid size default
- FR-34: Sound effects on/off
- FR-35: Haptic feedback on/off

### 4.3 Advanced Features (Phase 2)

#### 4.3.1 Sentence Building
**Description:** Combine multiple symbols into sentences

**Requirements:**
- FR-36: Sentence strip at top of screen
- FR-37: Add symbols to strip by tapping
- FR-38: "Speak" button to vocalize entire sentence
- FR-39: Clear sentence with one tap
- FR-40: Reorder words in sentence strip

#### 4.3.2 Visual Schedules
**Description:** Display daily routines and task sequences

**Requirements:**
- FR-41: Create schedule templates
- FR-42: Add/remove/reorder schedule items
- FR-43: Mark items as completed
- FR-44: Support time-based and sequence-based schedules
- FR-45: Visual countdown/timer integration

#### 4.3.3 Quick Phrases
**Description:** Rapid access to common phrases

**Requirements:**
- FR-46: Pre-configured common phrases
- FR-47: User-customizable quick phrases
- FR-48: Single-tap to speak phrase
- FR-49: Categorized phrase organization

### 4.4 Future Features (Phase 3+)

- Multiple user profiles
- Progress/usage analytics
- Cloud backup and sync
- Social stories module
- Word prediction
- Partner-assisted scanning
- Switch access support
- Eye gaze integration
- Bilingual support

---

## 5. Non-Functional Requirements

### 5.1 Performance

| Metric | Requirement |
|--------|-------------|
| Initial Load | < 3 seconds on 4G connection |
| Time to Interactive | < 2 seconds |
| Symbol Tap Response | < 200ms |
| Speech Latency | < 300ms from tap |
| Offline Load | < 1 second |

### 5.2 Accessibility (WCAG 2.1 AA Compliance)

- **Color Contrast:** Minimum 4.5:1 for normal text, 3:1 for large text
- **Touch Targets:** Minimum 44x44 CSS pixels
- **Focus Indicators:** Visible focus states for all interactive elements
- **Screen Reader:** Compatible with VoiceOver (iOS) and TalkBack (Android)
- **Reduced Motion:** Respect prefers-reduced-motion setting
- **Text Scaling:** Support 200% browser zoom

### 5.3 Security & Privacy

- **No Account Required:** App works without sign-up
- **Local-First:** All data stored locally on device
- **No Tracking:** No analytics or user tracking in MVP
- **No Ads:** Completely ad-free experience
- **Data Export:** Users can export their data
- **COPPA Compliance:** Designed for children's privacy

### 5.4 Compatibility

| Platform | Minimum Version |
|----------|-----------------|
| Chrome | 90+ |
| Safari | 14+ |
| Firefox | 90+ |
| Edge | 90+ |
| iOS Safari | 14+ |
| Android Chrome | 90+ |

### 5.5 Reliability

- **Availability:** 99.9% uptime for hosted version
- **Offline:** 100% core functionality without internet
- **Data Persistence:** Zero data loss on app restart/update

---

## 6. User Interface Requirements

### 6.1 Design Principles

1. **Simplicity First:** Every screen should have a single, clear purpose
2. **Consistency:** Same interactions work the same way everywhere
3. **Visibility:** Important actions are always visible, not hidden in menus
4. **Feedback:** Every action provides immediate visual/audio feedback
5. **Forgiveness:** Easy to undo mistakes, difficult to cause damage
6. **Accessibility:** Designed for users with motor/visual/cognitive differences

### 6.2 Visual Design

- **Color Palette:** High-contrast, colorblind-friendly
- **Typography:** Large, clear sans-serif fonts (minimum 16px)
- **Icons:** Universally recognizable, labeled with text
- **Layout:** Consistent grid system, generous spacing
- **Animation:** Subtle, purposeful, respects reduced-motion

### 6.3 Key Screens

1. **Home Board:** Main communication grid
2. **Category Board:** Symbols within a category
3. **Settings:** App configuration
4. **Editor Mode:** Customize boards and symbols
5. **Schedule View:** Visual schedule display

---

## 7. Technical Specifications

### 7.1 Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Frontend Framework | React 18 | Component-based, large ecosystem |
| Build Tool | Vite | Fast development, optimized builds |
| Styling | Tailwind CSS | Utility-first, consistent design |
| State Management | Zustand | Lightweight, simple API |
| Local Storage | IndexedDB (via Dexie.js) | Structured offline data |
| PWA | Workbox | Service worker management |
| TTS | Web Speech API | Native, free, offline-capable |
| Icons/Symbols | ARASAAC | Free, comprehensive library |
| Testing | Vitest + Testing Library | Fast, React-focused |
| Linting | ESLint + Prettier | Code quality |

### 7.2 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    SpeakEasy AAC PWA                    │
├─────────────────────────────────────────────────────────┤
│  UI Layer (React Components)                            │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│  │ Board   │ │ Symbol  │ │ Settings│ │ Editor  │       │
│  │ View    │ │ Grid    │ │ Panel   │ │ Mode    │       │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │
├─────────────────────────────────────────────────────────┤
│  State Layer (Zustand)                                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │ Board State │ │ User Prefs  │ │ Speech Queue│       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
├─────────────────────────────────────────────────────────┤
│  Service Layer                                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │ Speech      │ │ Storage     │ │ Symbol      │       │
│  │ Service     │ │ Service     │ │ Service     │       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
├─────────────────────────────────────────────────────────┤
│  Data Layer                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│  │ IndexedDB   │ │ LocalStorage│ │ Cache API   │       │
│  │ (Dexie)     │ │ (Settings)  │ │ (Symbols)   │       │
│  └─────────────┘ └─────────────┘ └─────────────┘       │
├─────────────────────────────────────────────────────────┤
│  PWA Infrastructure                                     │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Service Worker (Workbox) - Offline Caching       │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 7.3 Data Models

```typescript
// Core data structures

interface Symbol {
  id: string;
  label: string;
  imageUrl: string;
  audioUrl?: string;       // Custom audio recording
  category: string;
  isCustom: boolean;
  isCore: boolean;         // Core vocabulary flag
  createdAt: Date;
  updatedAt: Date;
}

interface Board {
  id: string;
  name: string;
  parentId?: string;       // For nested boards
  symbols: string[];       // Array of symbol IDs
  gridSize: GridSize;
  backgroundColor?: string;
  isDefault: boolean;
  sortOrder: number;
}

interface UserSettings {
  gridSize: GridSize;
  voiceId: string;
  speechRate: number;      // 0.5 - 2.0
  speechPitch: number;     // 0.5 - 2.0
  theme: 'light' | 'dark' | 'high-contrast';
  soundEffects: boolean;
  hapticFeedback: boolean;
}

type GridSize = '2x2' | '3x3' | '4x4' | '5x5' | '6x6' | '8x8';

interface QuickPhrase {
  id: string;
  text: string;
  category: string;
}
```

---

## 8. Release Plan

### Phase 1: MVP (Weeks 1-4)
- Core communication board
- Text-to-speech
- Basic symbol library (500+ symbols)
- Offline support
- Basic customization (add images, edit boards)
- Settings panel

### Phase 2: Enhanced (Weeks 5-8)
- Sentence building
- Visual schedules
- Quick phrases
- Extended symbol library (2000+)
- Improved editor mode

### Phase 3: Advanced (Weeks 9-12)
- User profiles
- Usage analytics
- Cloud backup (optional)
- Social stories
- Word prediction

---

## 9. Success Metrics

### Quantitative
- **Downloads/Installs:** Track PWA installations
- **Weekly Active Users:** Target 1,000 within 6 months
- **Session Duration:** Average 10+ minutes
- **Symbols per Session:** Average 20+ taps
- **Retention:** 50% 30-day retention

### Qualitative
- Positive user reviews/testimonials
- SLP recommendations
- Featured in autism/AAC communities
- Accessibility audit pass (WCAG 2.1 AA)

---

## 10. Open Questions

1. Should we include a "professional/therapy mode" with additional features?
2. What's the right balance of pre-loaded symbols vs. user customization?
3. How do we handle symbol licensing for any commercial use?
4. Should we support data import from other AAC apps?
5. What analytics (if any) are acceptable for a children's app?

---

## 11. Appendix

### A. Glossary
- **AAC:** Augmentative and Alternative Communication
- **Core Vocabulary:** High-frequency words used across contexts
- **Fringe Vocabulary:** Context-specific, less frequent words
- **Symbol:** Image representing a word or concept
- **TTS:** Text-to-Speech
- **PWA:** Progressive Web Application
- **SLP:** Speech-Language Pathologist

### B. References
- [ARASAAC Symbol Library](https://arasaac.org/)
- [CBoard (Open Source AAC)](https://cboard.io/)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*This is a living document. Updates will be tracked via version control.*


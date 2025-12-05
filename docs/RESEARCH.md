# SpeakEasy AAC - Market Research & Landscape Analysis

**Date:** December 5, 2024  
**Version:** 1.0

---

## Executive Summary

This document captures comprehensive research on the Augmentative and Alternative Communication (AAC) app landscape, focusing on solutions for nonverbal autistic children. The research identifies market gaps, pricing barriers, and opportunities for creating an affordable, open-source alternative.

---

## 1. Problem Statement

### The Communication Gap
- **1 in 36 children** in the US are diagnosed with autism spectrum disorder (CDC, 2023)
- **25-30%** of autistic individuals are minimally verbal or nonverbal
- AAC tools are **essential** for communication, education, and social participation
- Current commercial solutions are **prohibitively expensive** for many families

### Financial Barriers
Average family costs for special needs children include:
- Therapy sessions: $150-300/hour
- Educational interventions: $40,000-60,000/year
- AAC devices: $5,000-15,000 for dedicated devices
- AAC apps: $250-400 per app (one-time) or $10-30/month subscriptions

---

## 2. Commercial AAC Solutions Analysis

### High-Cost Applications

| App | Price | Platform | Key Features | Limitations |
|-----|-------|----------|--------------|-------------|
| **Proloquo2Go** | $249.99 | iOS only | 25,000+ symbols, robust vocabulary, SLP-approved | Expensive, iOS-only, steep learning curve |
| **TouchChat HD** | $299.99 | iOS | WordPower vocabularies, Pixon system | Very expensive, complex setup |
| **LAMP Words for Life** | $299.99 | iOS | Motor planning approach, research-based | Expensive, specific methodology |
| **GoTalk NOW** | $79.99-149.99 | iOS | Simple interface, page-based navigation | Limited customization |
| **Avaz** | $99.99 (Lite free) | iOS/Android | Designed for autism, predictive text | Full version costly |
| **CoughDrop** | $50/year subscription | Web/iOS/Android | Cloud-based, cross-platform | Recurring costs add up |
| **Speak for Yourself** | $299.99 | iOS | Motor planning, 11,000+ words | Expensive, iOS only |

### Dedicated AAC Devices
- **Tobii Dynavox**: $5,000-15,000+
- **PRC-Saltillo Accent**: $7,000-10,000
- **Forbes AAC devices**: $3,000-8,000

---

## 3. Open-Source & Free Alternatives

### Available Free Solutions

| Solution | Platform | Pros | Cons |
|----------|----------|------|------|
| **CBoard** | Web (PWA) | Free, open-source, 40+ languages, ARASAAC symbols | Web-only, requires internet for initial load |
| **LetMeTalk** | Android | Free, 9,000+ images, offline capable | Android only, dated interface |
| **Amelia's Voice** | Windows | Free, open-source, high-quality recordings | Desktop only, limited portability |
| **FreeSpeech** | iOS/Web | Free basic version | Limited features in free tier |
| **LifeCompanion** | Desktop | Open-source, highly customizable | Complex setup, desktop-only |
| **AAC For All** | Android | Free apps + affordable tablets | Limited app features |

### Symbol Libraries (Free/Open)

| Library | License | Symbols | Notes |
|---------|---------|---------|-------|
| **ARASAAC** | CC BY-NC-SA | 15,000+ | Most comprehensive free library, Spanish origin |
| **Mulberry Symbols** | CC BY-SA | 3,000+ | UK-based, clear simple designs |
| **OpenSymbols** | Various CC | Aggregated | Meta-library combining multiple sources |
| **Tawasol** | CC | 500+ | Arabic symbols |
| **Sclera** | CC | 7,000+ | Belgian origin, simple black/white |

---

## 4. Key Feature Requirements

### Core Features (Must-Have)
1. **Symbol-Based Communication Boards**
   - Grid layouts (2x2 to 10x10+)
   - Category organization
   - Quick access to core vocabulary

2. **Text-to-Speech (TTS)**
   - High-quality, natural voices
   - Multiple voice options (male/female/child)
   - Adjustable speed and pitch

3. **Offline Functionality**
   - Critical for reliability
   - All core features must work without internet

4. **Customization**
   - Add personal photos/images
   - Record custom audio
   - Create custom categories
   - Adjust grid sizes

5. **Core Vocabulary Strategy**
   - Research shows ~400 core words cover 80% of daily communication
   - Quick access to frequently used words
   - Fringe vocabulary for specific contexts

### Advanced Features (Should-Have)
1. **Visual Schedules** - Daily routines, task sequences
2. **Sentence Building** - Combine symbols into phrases
3. **Word Prediction** - Suggest likely next words
4. **Social Stories** - Narrative templates for social situations
5. **Progress Tracking** - Usage analytics for caregivers/SLPs
6. **Multiple User Profiles** - Support different users on one device
7. **Backup/Sync** - Cloud backup of customizations

### Accessibility Features
- High contrast modes
- Large touch targets (minimum 44x44 points)
- Adjustable font sizes
- Dwell selection (for users with motor difficulties)
- Switch access support
- Haptic feedback

---

## 5. Technical Landscape

### Platform Considerations

| Platform | Pros | Cons |
|----------|------|------|
| **Progressive Web App (PWA)** | Cross-platform, no app store, easy updates | Limited native features, Safari TTS issues |
| **React Native** | Near-native performance, single codebase | Requires app store approval, larger bundle |
| **Flutter** | Excellent performance, single codebase | Dart learning curve |
| **Native iOS/Android** | Best performance, full platform access | Two codebases, expensive to maintain |

### Recommended Approach: PWA + React
- **Primary:** PWA for immediate accessibility
- **Future:** React Native wrapper for app store presence

### Text-to-Speech Options
1. **Web Speech API** - Free, browser-native, works offline
2. **ResponsiveVoice.js** - Freemium, consistent cross-browser
3. **Azure Speech** - High quality, costs at scale
4. **Google Cloud TTS** - High quality, costs at scale

### Symbol Libraries Integration
- **ARASAAC API** - Free, 15,000+ symbols, CC licensed
- **OpenSymbols API** - Aggregated symbols
- **Local bundling** - Download and include core symbols offline

---

## 6. User Research Insights

### Primary Users
1. **Nonverbal Children (ages 2-18)**
   - Varying cognitive abilities
   - Different motor skill levels
   - Sensory sensitivities (visual, auditory)

2. **Parents/Caregivers**
   - Need easy setup and customization
   - Often not tech-savvy
   - Time-constrained

3. **Speech-Language Pathologists (SLPs)**
   - Need progress tracking
   - Want vocabulary customization
   - Require professional-grade features

4. **Educators**
   - Need classroom-compatible tools
   - Multi-student management
   - Curriculum integration

### Pain Points with Current Solutions
1. **Cost** - Single biggest barrier
2. **Complexity** - Overwhelming for new users
3. **Platform Lock-in** - iOS-only excludes many families
4. **Learning Curve** - Takes weeks to months to set up properly
5. **Customization Difficulty** - Adding personal content is tedious
6. **Inconsistent Quality** - Free apps often lack polish

---

## 7. Competitive Advantages for SpeakEasy

### Our Differentiators
1. **100% Free and Open Source** - No cost barrier
2. **Cross-Platform PWA** - Works on any device with a browser
3. **Offline-First Design** - Reliable without internet
4. **Modern, Beautiful UI** - Not "medical device" aesthetic
5. **Easy Customization** - Simple photo upload and category creation
6. **Privacy-First** - No data collection, local-first storage
7. **Community-Driven** - Open for contributions and improvements

### Target Market Positioning
- **Primary:** Families who cannot afford commercial AAC apps
- **Secondary:** Schools and programs seeking cost-effective solutions
- **Tertiary:** SLPs wanting accessible tools for clients

---

## 8. Success Metrics

### Key Performance Indicators
1. **Downloads/Active Users** - Adoption rate
2. **Session Duration** - Engagement
3. **Symbols Used per Session** - Communication effectiveness
4. **Customizations Created** - Personalization uptake
5. **User Retention** - 30/60/90 day retention
6. **Community Contributions** - GitHub stars, PRs, issues

### Qualitative Metrics
- User testimonials
- SLP recommendations
- Accessibility audit scores
- Community feedback

---

## 9. Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Symbol licensing issues | High | Use CC-licensed ARASAAC/Mulberry |
| TTS quality variations | Medium | Test across browsers, provide voice options |
| Offline storage limits | Medium | Optimize symbol sizes, prioritize core vocabulary |
| Accessibility compliance | High | Follow WCAG 2.1 AA, test with actual users |
| Competition from free versions of paid apps | Low | Focus on community and simplicity |

---

## 10. References & Resources

### Organizations
- **ASHA** (American Speech-Language-Hearing Association)
- **Autism Speaks**
- **ISAAC** (International Society for AAC)
- **OpenAAC** (Open AAC standards)

### Research Papers
- Beukelman & Light, "Augmentative and Alternative Communication" (5th ed.)
- Brady et al., "Communication Services and Supports for Individuals with Severe Disabilities"
- ARASAAC research publications

### Open Source Projects
- [CBoard GitHub](https://github.com/cboard-org/cboard)
- [OpenAAC](https://www.openaac.org/)
- [LifeCompanion](https://github.com/lifecompanionaac/lifecompanion)

---

*This research document will be updated as new findings emerge during development.*


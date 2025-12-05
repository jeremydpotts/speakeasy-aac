// Script to generate placeholder SVG symbols
// Run with: node scripts/generatePlaceholderSymbols.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const symbolsDir = path.join(__dirname, '..', 'public', 'symbols');

// Symbol definitions by category
const symbols = {
  core: [
    { id: 'i', label: 'I', emoji: '👤' },
    { id: 'you', label: 'you', emoji: '👉' },
    { id: 'want', label: 'want', emoji: '🙏' },
    { id: 'need', label: 'need', emoji: '❗' },
    { id: 'help', label: 'help', emoji: '🆘' },
    { id: 'more', label: 'more', emoji: '➕' },
    { id: 'stop', label: 'stop', emoji: '✋' },
    { id: 'go', label: 'go', emoji: '▶️' },
    { id: 'yes', label: 'yes', emoji: '✅' },
    { id: 'no', label: 'no', emoji: '❌' },
    { id: 'please', label: 'please', emoji: '🙏' },
    { id: 'thank-you', label: 'thanks', emoji: '💝' },
    { id: 'hello', label: 'hello', emoji: '👋' },
    { id: 'goodbye', label: 'bye', emoji: '👋' },
    { id: 'like', label: 'like', emoji: '👍' },
    { id: 'dont-like', label: "don't like", emoji: '👎' },
  ],
  categories: [
    { id: 'cat-feelings', label: 'feelings', emoji: '😊', bg: '#ec4899' },
    { id: 'cat-food', label: 'food', emoji: '🍎', bg: '#f97316' },
    { id: 'cat-drinks', label: 'drinks', emoji: '🥤', bg: '#3b82f6' },
    { id: 'cat-people', label: 'people', emoji: '👨‍👩‍👧‍👦', bg: '#8b5cf6' },
    { id: 'cat-places', label: 'places', emoji: '🏠', bg: '#10b981' },
    { id: 'cat-actions', label: 'actions', emoji: '🏃', bg: '#ef4444' },
    { id: 'cat-things', label: 'things', emoji: '📦', bg: '#6366f1' },
    { id: 'cat-time', label: 'time', emoji: '⏰', bg: '#f59e0b' },
  ],
  feelings: [
    { id: 'happy', label: 'happy', emoji: '😊' },
    { id: 'sad', label: 'sad', emoji: '😢' },
    { id: 'angry', label: 'angry', emoji: '😠' },
    { id: 'scared', label: 'scared', emoji: '😨' },
    { id: 'tired', label: 'tired', emoji: '😴' },
    { id: 'hungry', label: 'hungry', emoji: '🤤' },
    { id: 'thirsty', label: 'thirsty', emoji: '💧' },
    { id: 'sick', label: 'sick', emoji: '🤒' },
    { id: 'hurt', label: 'hurt', emoji: '🤕' },
    { id: 'excited', label: 'excited', emoji: '🤩' },
    { id: 'bored', label: 'bored', emoji: '😑' },
    { id: 'confused', label: 'confused', emoji: '😕' },
    { id: 'proud', label: 'proud', emoji: '😤' },
    { id: 'nervous', label: 'nervous', emoji: '😰' },
    { id: 'calm', label: 'calm', emoji: '😌' },
    { id: 'love', label: 'love', emoji: '❤️' },
  ],
  food: [
    { id: 'eat', label: 'eat', emoji: '🍽️' },
    { id: 'apple', label: 'apple', emoji: '🍎' },
    { id: 'banana', label: 'banana', emoji: '🍌' },
    { id: 'bread', label: 'bread', emoji: '🍞' },
    { id: 'cheese', label: 'cheese', emoji: '🧀' },
    { id: 'chicken', label: 'chicken', emoji: '🍗' },
    { id: 'cookie', label: 'cookie', emoji: '🍪' },
    { id: 'pizza', label: 'pizza', emoji: '🍕' },
    { id: 'sandwich', label: 'sandwich', emoji: '🥪' },
    { id: 'snack', label: 'snack', emoji: '🍿' },
    { id: 'cereal', label: 'cereal', emoji: '🥣' },
    { id: 'egg', label: 'egg', emoji: '🥚' },
    { id: 'fruit', label: 'fruit', emoji: '🍇' },
    { id: 'vegetables', label: 'veggies', emoji: '🥦' },
    { id: 'ice-cream', label: 'ice cream', emoji: '🍦' },
    { id: 'pasta', label: 'pasta', emoji: '🍝' },
  ],
  drinks: [
    { id: 'drink', label: 'drink', emoji: '🥤' },
    { id: 'water', label: 'water', emoji: '💧' },
    { id: 'milk', label: 'milk', emoji: '🥛' },
    { id: 'juice', label: 'juice', emoji: '🧃' },
    { id: 'hot-chocolate', label: 'hot cocoa', emoji: '☕' },
    { id: 'smoothie', label: 'smoothie', emoji: '🥤' },
    { id: 'soda', label: 'soda', emoji: '🥤' },
    { id: 'tea', label: 'tea', emoji: '🍵' },
  ],
  people: [
    { id: 'mom', label: 'mom', emoji: '👩' },
    { id: 'dad', label: 'dad', emoji: '👨' },
    { id: 'brother', label: 'brother', emoji: '👦' },
    { id: 'sister', label: 'sister', emoji: '👧' },
    { id: 'grandma', label: 'grandma', emoji: '👵' },
    { id: 'grandpa', label: 'grandpa', emoji: '👴' },
    { id: 'teacher', label: 'teacher', emoji: '👩‍🏫' },
    { id: 'friend', label: 'friend', emoji: '🧑‍🤝‍🧑' },
    { id: 'doctor', label: 'doctor', emoji: '👩‍⚕️' },
    { id: 'baby', label: 'baby', emoji: '👶' },
    { id: 'boy', label: 'boy', emoji: '👦' },
    { id: 'girl', label: 'girl', emoji: '👧' },
    { id: 'man', label: 'man', emoji: '👨' },
    { id: 'woman', label: 'woman', emoji: '👩' },
    { id: 'family', label: 'family', emoji: '👨‍👩‍👧' },
    { id: 'pet', label: 'pet', emoji: '🐕' },
  ],
  places: [
    { id: 'home', label: 'home', emoji: '🏠' },
    { id: 'school', label: 'school', emoji: '🏫' },
    { id: 'bathroom', label: 'bathroom', emoji: '🚽' },
    { id: 'bedroom', label: 'bedroom', emoji: '🛏️' },
    { id: 'kitchen', label: 'kitchen', emoji: '🍳' },
    { id: 'outside', label: 'outside', emoji: '🌳' },
    { id: 'park', label: 'park', emoji: '🏞️' },
    { id: 'store', label: 'store', emoji: '🏪' },
    { id: 'car', label: 'car', emoji: '🚗' },
    { id: 'bus', label: 'bus', emoji: '🚌' },
    { id: 'hospital', label: 'hospital', emoji: '🏥' },
    { id: 'restaurant', label: 'restaurant', emoji: '🍽️' },
    { id: 'pool', label: 'pool', emoji: '🏊' },
    { id: 'library', label: 'library', emoji: '📚' },
    { id: 'playground', label: 'playground', emoji: '🎠' },
    { id: 'gym', label: 'gym', emoji: '🏋️' },
  ],
  actions: [
    { id: 'play', label: 'play', emoji: '🎮' },
    { id: 'read', label: 'read', emoji: '📖' },
    { id: 'watch', label: 'watch', emoji: '👀' },
    { id: 'listen', label: 'listen', emoji: '👂' },
    { id: 'walk', label: 'walk', emoji: '🚶' },
    { id: 'run', label: 'run', emoji: '🏃' },
    { id: 'sit', label: 'sit', emoji: '🪑' },
    { id: 'sleep', label: 'sleep', emoji: '😴' },
    { id: 'wash', label: 'wash', emoji: '🧼' },
    { id: 'brush', label: 'brush', emoji: '🪥' },
    { id: 'draw', label: 'draw', emoji: '✏️' },
    { id: 'write', label: 'write', emoji: '✍️' },
    { id: 'open', label: 'open', emoji: '📂' },
    { id: 'close', label: 'close', emoji: '📁' },
    { id: 'give', label: 'give', emoji: '🤲' },
    { id: 'take', label: 'take', emoji: '✊' },
  ],
  things: [
    { id: 'phone', label: 'phone', emoji: '📱' },
    { id: 'tablet', label: 'tablet', emoji: '📱' },
    { id: 'tv', label: 'TV', emoji: '📺' },
    { id: 'book', label: 'book', emoji: '📕' },
    { id: 'toy', label: 'toy', emoji: '🧸' },
    { id: 'ball', label: 'ball', emoji: '⚽' },
    { id: 'game', label: 'game', emoji: '🎲' },
    { id: 'music', label: 'music', emoji: '🎵' },
    { id: 'clothes', label: 'clothes', emoji: '👕' },
    { id: 'shoes', label: 'shoes', emoji: '👟' },
    { id: 'blanket', label: 'blanket', emoji: '🛏️' },
    { id: 'pillow', label: 'pillow', emoji: '🛏️' },
    { id: 'backpack', label: 'backpack', emoji: '🎒' },
    { id: 'pencil', label: 'pencil', emoji: '✏️' },
    { id: 'paper', label: 'paper', emoji: '📄' },
    { id: 'scissors', label: 'scissors', emoji: '✂️' },
  ],
  time: [
    { id: 'now', label: 'now', emoji: '⏰' },
    { id: 'later', label: 'later', emoji: '⏳' },
    { id: 'today', label: 'today', emoji: '📅' },
    { id: 'tomorrow', label: 'tomorrow', emoji: '📆' },
    { id: 'yesterday', label: 'yesterday', emoji: '📆' },
    { id: 'morning', label: 'morning', emoji: '🌅' },
    { id: 'afternoon', label: 'afternoon', emoji: '☀️' },
    { id: 'night', label: 'night', emoji: '🌙' },
    { id: 'wait', label: 'wait', emoji: '⏸️' },
    { id: 'soon', label: 'soon', emoji: '🔜' },
    { id: 'finished', label: 'finished', emoji: '✅' },
    { id: 'again', label: 'again', emoji: '🔄' },
    { id: 'first', label: 'first', emoji: '1️⃣' },
    { id: 'then', label: 'then', emoji: '2️⃣' },
    { id: 'before', label: 'before', emoji: '⬅️' },
    { id: 'after', label: 'after', emoji: '➡️' },
  ],
};

// Generate SVG with emoji
function generateSVG(emoji, bgColor = '#f1f5f9') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="${bgColor}" rx="12"/>
  <text x="50" y="60" text-anchor="middle" font-size="48" font-family="Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif">${emoji}</text>
</svg>`;
}

// Create all symbols
function createSymbols() {
  for (const [category, categorySymbols] of Object.entries(symbols)) {
    const categoryDir = path.join(symbolsDir, category);
    
    // Ensure directory exists
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
    }
    
    for (const symbol of categorySymbols) {
      const svgContent = generateSVG(symbol.emoji, symbol.bg || '#f1f5f9');
      const filePath = path.join(categoryDir, `${symbol.id}.svg`);
      fs.writeFileSync(filePath, svgContent);
      console.log(`Created: ${category}/${symbol.id}.svg`);
    }
  }
  
  console.log('\n✅ All placeholder symbols created!');
}

createSymbols();


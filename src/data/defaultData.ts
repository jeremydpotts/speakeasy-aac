// Default boards and symbols for initial app setup
import type { Board, Symbol } from '../types';

const now = new Date();

// Helper to create symbol
const createSymbol = (
  id: string,
  label: string,
  category: string,
  isCategory: boolean = false,
  isCore: boolean = false,
  backgroundColor?: string
): Symbol => ({
  id,
  label,
  imageUrl: `/symbols/${category}/${id}.svg`,
  category,
  isCategory,
  isCustom: false,
  isCore,
  backgroundColor,
  createdAt: now,
  updatedAt: now,
});

// Core vocabulary symbols (high-frequency words)
const coreSymbols: Symbol[] = [
  createSymbol('i', 'I', 'core', false, true),
  createSymbol('you', 'you', 'core', false, true),
  createSymbol('want', 'want', 'core', false, true),
  createSymbol('need', 'need', 'core', false, true),
  createSymbol('help', 'help', 'core', false, true),
  createSymbol('more', 'more', 'core', false, true),
  createSymbol('stop', 'stop', 'core', false, true),
  createSymbol('go', 'go', 'core', false, true),
  createSymbol('yes', 'yes', 'core', false, true),
  createSymbol('no', 'no', 'core', false, true),
  createSymbol('please', 'please', 'core', false, true),
  createSymbol('thank-you', 'thank you', 'core', false, true),
  createSymbol('hello', 'hello', 'core', false, true),
  createSymbol('goodbye', 'goodbye', 'core', false, true),
  createSymbol('like', 'like', 'core', false, true),
  createSymbol('dont-like', "don't like", 'core', false, true),
];

// Category symbols (navigate to sub-boards)
const categorySymbols: Symbol[] = [
  createSymbol('cat-feelings', 'feelings', 'categories', true, false, '#ec4899'),
  createSymbol('cat-food', 'food', 'categories', true, false, '#f97316'),
  createSymbol('cat-drinks', 'drinks', 'categories', true, false, '#3b82f6'),
  createSymbol('cat-people', 'people', 'categories', true, false, '#8b5cf6'),
  createSymbol('cat-places', 'places', 'categories', true, false, '#10b981'),
  createSymbol('cat-actions', 'actions', 'categories', true, false, '#ef4444'),
  createSymbol('cat-things', 'things', 'categories', true, false, '#6366f1'),
  createSymbol('cat-time', 'time', 'categories', true, false, '#f59e0b'),
];

// Feelings symbols
const feelingsSymbols: Symbol[] = [
  createSymbol('happy', 'happy', 'feelings'),
  createSymbol('sad', 'sad', 'feelings'),
  createSymbol('angry', 'angry', 'feelings'),
  createSymbol('scared', 'scared', 'feelings'),
  createSymbol('tired', 'tired', 'feelings'),
  createSymbol('hungry', 'hungry', 'feelings'),
  createSymbol('thirsty', 'thirsty', 'feelings'),
  createSymbol('sick', 'sick', 'feelings'),
  createSymbol('hurt', 'hurt', 'feelings'),
  createSymbol('excited', 'excited', 'feelings'),
  createSymbol('bored', 'bored', 'feelings'),
  createSymbol('confused', 'confused', 'feelings'),
  createSymbol('proud', 'proud', 'feelings'),
  createSymbol('nervous', 'nervous', 'feelings'),
  createSymbol('calm', 'calm', 'feelings'),
  createSymbol('love', 'love', 'feelings'),
];

// Food symbols
const foodSymbols: Symbol[] = [
  createSymbol('eat', 'eat', 'food'),
  createSymbol('apple', 'apple', 'food'),
  createSymbol('banana', 'banana', 'food'),
  createSymbol('bread', 'bread', 'food'),
  createSymbol('cheese', 'cheese', 'food'),
  createSymbol('chicken', 'chicken', 'food'),
  createSymbol('cookie', 'cookie', 'food'),
  createSymbol('pizza', 'pizza', 'food'),
  createSymbol('sandwich', 'sandwich', 'food'),
  createSymbol('snack', 'snack', 'food'),
  createSymbol('cereal', 'cereal', 'food'),
  createSymbol('egg', 'egg', 'food'),
  createSymbol('fruit', 'fruit', 'food'),
  createSymbol('vegetables', 'vegetables', 'food'),
  createSymbol('ice-cream', 'ice cream', 'food'),
  createSymbol('pasta', 'pasta', 'food'),
];

// Drinks symbols
const drinksSymbols: Symbol[] = [
  createSymbol('drink', 'drink', 'drinks'),
  createSymbol('water', 'water', 'drinks'),
  createSymbol('milk', 'milk', 'drinks'),
  createSymbol('juice', 'juice', 'drinks'),
  createSymbol('hot-chocolate', 'hot chocolate', 'drinks'),
  createSymbol('smoothie', 'smoothie', 'drinks'),
  createSymbol('soda', 'soda', 'drinks'),
  createSymbol('tea', 'tea', 'drinks'),
];

// People symbols
const peopleSymbols: Symbol[] = [
  createSymbol('mom', 'mom', 'people'),
  createSymbol('dad', 'dad', 'people'),
  createSymbol('brother', 'brother', 'people'),
  createSymbol('sister', 'sister', 'people'),
  createSymbol('grandma', 'grandma', 'people'),
  createSymbol('grandpa', 'grandpa', 'people'),
  createSymbol('teacher', 'teacher', 'people'),
  createSymbol('friend', 'friend', 'people'),
  createSymbol('doctor', 'doctor', 'people'),
  createSymbol('baby', 'baby', 'people'),
  createSymbol('boy', 'boy', 'people'),
  createSymbol('girl', 'girl', 'people'),
  createSymbol('man', 'man', 'people'),
  createSymbol('woman', 'woman', 'people'),
  createSymbol('family', 'family', 'people'),
  createSymbol('pet', 'pet', 'people'),
];

// Places symbols
const placesSymbols: Symbol[] = [
  createSymbol('home', 'home', 'places'),
  createSymbol('school', 'school', 'places'),
  createSymbol('bathroom', 'bathroom', 'places'),
  createSymbol('bedroom', 'bedroom', 'places'),
  createSymbol('kitchen', 'kitchen', 'places'),
  createSymbol('outside', 'outside', 'places'),
  createSymbol('park', 'park', 'places'),
  createSymbol('store', 'store', 'places'),
  createSymbol('car', 'car', 'places'),
  createSymbol('bus', 'bus', 'places'),
  createSymbol('hospital', 'hospital', 'places'),
  createSymbol('restaurant', 'restaurant', 'places'),
  createSymbol('pool', 'pool', 'places'),
  createSymbol('library', 'library', 'places'),
  createSymbol('playground', 'playground', 'places'),
  createSymbol('gym', 'gym', 'places'),
];

// Actions symbols
const actionsSymbols: Symbol[] = [
  createSymbol('play', 'play', 'actions'),
  createSymbol('read', 'read', 'actions'),
  createSymbol('watch', 'watch', 'actions'),
  createSymbol('listen', 'listen', 'actions'),
  createSymbol('walk', 'walk', 'actions'),
  createSymbol('run', 'run', 'actions'),
  createSymbol('sit', 'sit', 'actions'),
  createSymbol('sleep', 'sleep', 'actions'),
  createSymbol('wash', 'wash', 'actions'),
  createSymbol('brush', 'brush', 'actions'),
  createSymbol('draw', 'draw', 'actions'),
  createSymbol('write', 'write', 'actions'),
  createSymbol('open', 'open', 'actions'),
  createSymbol('close', 'close', 'actions'),
  createSymbol('give', 'give', 'actions'),
  createSymbol('take', 'take', 'actions'),
];

// Things symbols
const thingsSymbols: Symbol[] = [
  createSymbol('phone', 'phone', 'things'),
  createSymbol('tablet', 'tablet', 'things'),
  createSymbol('tv', 'TV', 'things'),
  createSymbol('book', 'book', 'things'),
  createSymbol('toy', 'toy', 'things'),
  createSymbol('ball', 'ball', 'things'),
  createSymbol('game', 'game', 'things'),
  createSymbol('music', 'music', 'things'),
  createSymbol('clothes', 'clothes', 'things'),
  createSymbol('shoes', 'shoes', 'things'),
  createSymbol('blanket', 'blanket', 'things'),
  createSymbol('pillow', 'pillow', 'things'),
  createSymbol('backpack', 'backpack', 'things'),
  createSymbol('pencil', 'pencil', 'things'),
  createSymbol('paper', 'paper', 'things'),
  createSymbol('scissors', 'scissors', 'things'),
];

// Time symbols
const timeSymbols: Symbol[] = [
  createSymbol('now', 'now', 'time'),
  createSymbol('later', 'later', 'time'),
  createSymbol('today', 'today', 'time'),
  createSymbol('tomorrow', 'tomorrow', 'time'),
  createSymbol('yesterday', 'yesterday', 'time'),
  createSymbol('morning', 'morning', 'time'),
  createSymbol('afternoon', 'afternoon', 'time'),
  createSymbol('night', 'night', 'time'),
  createSymbol('wait', 'wait', 'time'),
  createSymbol('soon', 'soon', 'time'),
  createSymbol('finished', 'finished', 'time'),
  createSymbol('again', 'again', 'time'),
  createSymbol('first', 'first', 'time'),
  createSymbol('then', 'then', 'time'),
  createSymbol('before', 'before', 'time'),
  createSymbol('after', 'after', 'time'),
];

// Combine all symbols
export const defaultSymbols: Symbol[] = [
  ...coreSymbols,
  ...categorySymbols,
  ...feelingsSymbols,
  ...foodSymbols,
  ...drinksSymbols,
  ...peopleSymbols,
  ...placesSymbols,
  ...actionsSymbols,
  ...thingsSymbols,
  ...timeSymbols,
];

// Default boards
export const defaultBoards: Board[] = [
  // Home board - mix of core vocab and categories
  {
    id: 'home',
    name: 'Home',
    parentId: null,
    symbolIds: [
      'i', 'want', 'need', 'help',
      'yes', 'no', 'more', 'stop',
      'cat-feelings', 'cat-food', 'cat-drinks', 'cat-people',
      'cat-places', 'cat-actions', 'cat-things', 'cat-time',
    ],
    gridSize: '4x4',
    isDefault: true,
    sortOrder: 0,
    createdAt: now,
    updatedAt: now,
  },
  // Feelings board
  {
    id: 'feelings',
    name: 'Feelings',
    parentId: 'home',
    symbolIds: feelingsSymbols.map(s => s.id),
    gridSize: '4x4',
    isDefault: false,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  // Food board
  {
    id: 'food',
    name: 'Food',
    parentId: 'home',
    symbolIds: foodSymbols.map(s => s.id),
    gridSize: '4x4',
    isDefault: false,
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
  },
  // Drinks board
  {
    id: 'drinks',
    name: 'Drinks',
    parentId: 'home',
    symbolIds: drinksSymbols.map(s => s.id),
    gridSize: '4x4',
    isDefault: false,
    sortOrder: 3,
    createdAt: now,
    updatedAt: now,
  },
  // People board
  {
    id: 'people',
    name: 'People',
    parentId: 'home',
    symbolIds: peopleSymbols.map(s => s.id),
    gridSize: '4x4',
    isDefault: false,
    sortOrder: 4,
    createdAt: now,
    updatedAt: now,
  },
  // Places board
  {
    id: 'places',
    name: 'Places',
    parentId: 'home',
    symbolIds: placesSymbols.map(s => s.id),
    gridSize: '4x4',
    isDefault: false,
    sortOrder: 5,
    createdAt: now,
    updatedAt: now,
  },
  // Actions board
  {
    id: 'actions',
    name: 'Actions',
    parentId: 'home',
    symbolIds: actionsSymbols.map(s => s.id),
    gridSize: '4x4',
    isDefault: false,
    sortOrder: 6,
    createdAt: now,
    updatedAt: now,
  },
  // Things board
  {
    id: 'things',
    name: 'Things',
    parentId: 'home',
    symbolIds: thingsSymbols.map(s => s.id),
    gridSize: '4x4',
    isDefault: false,
    sortOrder: 7,
    createdAt: now,
    updatedAt: now,
  },
  // Time board
  {
    id: 'time',
    name: 'Time',
    parentId: 'home',
    symbolIds: timeSymbols.map(s => s.id),
    gridSize: '4x4',
    isDefault: false,
    sortOrder: 8,
    createdAt: now,
    updatedAt: now,
  },
];

// Category ID to Board ID mapping
export const categoryToBoardMap: Record<string, string> = {
  'cat-feelings': 'feelings',
  'cat-food': 'food',
  'cat-drinks': 'drinks',
  'cat-people': 'people',
  'cat-places': 'places',
  'cat-actions': 'actions',
  'cat-things': 'things',
  'cat-time': 'time',
};


import type { HeadshotStyle } from './types';

export const SKIN_RETOUCHING_OPTIONS = ['None', 'Subtle Blemish Removal', 'Professional Smoothing'];

export const HAIRSTYLE_OPTIONS = ['Keep Original', 'Sleek Ponytail', 'Modern Bob', 'Short & Styled', 'Let AI Decide', 'Custom...'];

export const FACIAL_EXPRESSION_OPTIONS = ['Keep Original', 'Confident', 'Friendly & Approachable', 'Serious & Focused', 'Let AI Decide', 'Custom...'];

export const WARDROBE_OPTIONS = ['Keep Original', 'Business Suit (Dark)', 'Button-down Shirt', 'Blouse', 'Turtleneck', 'Let AI Decide', 'Custom...'];

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  {
    id: 'corporate',
    name: 'Classic Corporate',
    prompt: 'The background should be a modern, softly blurred office environment. Ensure the lighting is bright and even, highlighting the subject professionally.',
  },
  {
    id: 'studio_gray',
    name: 'Studio Gray',
    prompt: 'Use a solid, neutral medium-gray studio backdrop. The lighting should be a classic three-point setup, creating a timeless and professional look.',
  },
  {
    id: 'outdoor',
    name: 'Outdoor Natural',
    prompt: 'Use an outdoor setting. The background should be a pleasantly blurred park or green space. Use warm, natural sunlight as the primary light source.',
  },
  {
    id: 'dark_moody',
    name: 'Dark & Moody',
    prompt: 'Use a dramatic, moody style with a dark, textured background like brushed charcoal or dark wood. The lighting should be high-contrast and from the side to create a powerful, cinematic feel.',
  },
  {
    id: 'bookshelf',
    name: 'Warm Bookshelf',
    prompt: 'Place the subject in front of a warm, inviting library with a tastefully blurred bookshelf in the background. Lighting should be soft and warm.',
  },
  {
    id: 'minimalist_white',
    name: 'Minimalist White',
    prompt: 'Use a clean, minimalist style. The background must be a completely clean, pure white wall. Ensure the subject is well-lit and pops against the simple background.',
  },
  {
    id: 'urban_chic',
    name: 'Urban Chic',
    prompt: 'Use a modern, urban style. The background should be a stylish but heavily blurred city street scene, suggesting a dynamic environment. Lighting should feel natural and contemporary.',
  },
  {
    id: 'tech_office',
    name: 'Tech Office',
    prompt: 'Use a modern tech office vibe. The background should feature blurred elements like glass walls, whiteboards, and subtle background activity, giving a sense of innovation and collaboration.',
  },
  {
    id: 'gradient_blue',
    name: 'Gradient Blue',
    prompt: 'Use a clean, abstract background. The background should be a smooth studio gradient from a deep navy blue to a lighter sky blue.',
  },
  {
    id: 'cozy_cafe',
    name: 'Cozy Cafe',
    prompt: 'Use a friendly, approachable style. The background should be the interior of a bright, modern cafe, softly out of focus. The lighting should be warm and inviting.',
  },
  {
    id: 'creative_abstract',
    name: 'Creative Abstract',
    prompt: 'Use a creative and artistic style. The background should be an abstract, subtly textured pattern with a complementary color palette. The lighting can be more creative, perhaps with a hint of color.',
  },
  {
    id: 'custom',
    name: 'Custom Scene',
    prompt: '',
  },
];

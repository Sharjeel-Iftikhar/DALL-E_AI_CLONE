import {surpriseMePrompts} from '../constants/index.js';

export const getRandomPrompt = (prompt) => {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const RandomPrompt = surpriseMePrompts[randomIndex];

    if(prompt === RandomPrompt) {
        return getRandomPrompt(prompt);
    }

    return RandomPrompt;
};
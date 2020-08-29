const section = document.querySelector('#search');

export const searchNav = document.querySelector('#search-nav');
export const container = section.querySelector('#input-container');
export const box = section.querySelector('#search-box');
export const btn = section.querySelector('#search-btn');
export const suggestions = section.querySelector('#suggestions');
export const suggestionsLi = Array.from(suggestions.children);
export const suggestionTerms = Array.from(
  section.querySelectorAll('.suggestion-text')
);

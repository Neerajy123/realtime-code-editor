import React from 'react';

const editorlanguages = ['javascript', 'css', 'sql'];
const editorTheme = [
  'dracula',
  'blackboard',
  'ambiance',
  'midnight',
  'idea',
  'twilight',
  'vibrant-ink',
  'tomorrow-night-bright',
  'rubyblue',
  'mdn-like',
  'erlang-dark',
  '3024-night',
  'cobalt',
];

export const PageNav = ({ language, theme, onSetLanguage, onSetTheme }) => {
  function handleLanguage(e) {
    onSetLanguage(e.target.value);
  }
  function handleTheme(e) {
    onSetTheme(e.target.value);
  }

  return (
    <div className='pageNav'>
      <div className='editorsLanguage'>
        <label className='headings'>Language </label>
        <select className='minimal' value={language} onChange={handleLanguage}>
          {editorlanguages.map((lang, index) => {
            return (
              <option value={lang} key={index}>
                {lang}
              </option>
            );
          })}
        </select>
      </div>
      <div className='editorTheme'>
        <label className='headings'>Theme </label>
        <select className='minimal' value={theme} onChange={handleTheme}>
          {editorTheme.map((themei, index) => {
            return (
              <option value={themei} key={index}>
                {themei}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

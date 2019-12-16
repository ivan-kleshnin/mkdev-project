import { SYMBOLS } from './constants';

export const renderDom = () => {
  const dom = document.querySelector('.grid');
  return html => {
    dom.innerHTML = html;
  };
};

export const renderGrid = grid => {
  const html = grid.reduce((accHtml, row) => {
    const rowHtml = row.reduce((accRow, cell) => `${accRow}${SYMBOLS[cell]}`, '');
    return `${accHtml}${rowHtml}\n`;
  }, '');

  return `<pre><code>${html}</code></pre>`;
};

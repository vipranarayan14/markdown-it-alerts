'use strict';

const container = require('markdown-it-container');
const Sanscript = require('./sanscript');

const isInSanscriptSchemes = vtransScheme => [
  'bengali',
  'devanagari',
  'gujarati',
  'gurmukhi',
  'kannada',
  'malayalam',
  'oriya',
  'tamil',
  'telugu'
].indexOf(vtransScheme) > -1;

module.exports = function vtrans_plugin(md, options) {

  md.use(container, 'vtrans', {

    render: function (tokens, idx) {

      const openingTag = 1;
      const isOpeningTag = tokens[idx].nesting === openingTag;
      const containerInfo = tokens[idx].info;
      const getScheme = containerInfo.match(/^\svtrans\s(.*)$/);
      const vtransScheme = (getScheme) ? getScheme[1] : '';

      if (isOpeningTag && isInSanscriptSchemes(vtransScheme)) {

        md.renderer.rules.text = (tokens, idx) =>
          `${Sanscript.t(tokens[idx].content, 'itrans_dravidian', vtransScheme)}`;

        return `<div class="vtrans vtrans-${vtransScheme}">\n`;

      } else {

        return '</div>\n';

      }

    }

  });

};
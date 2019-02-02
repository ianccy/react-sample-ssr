import path from 'path';
import fs from 'fs';

import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';

import App from '../src/app';

export default (req, res) => {
    fs.readFile(path.resolve(__dirname, '../build/index.html'), 'utf8', (err, htmlData) => {
        if (err) {
            console.error(`Error page ${err}`);
            return res.status(404).end();
        }

        const helmet = Helmet.renderStatic();

        const html = injectHTML(htmlData, {
            html: helmet.htmlAttributes.toString(),
            title: helmet.title.toString(),
            meta: helmet.meta.toString(),
            body:  renderToString(<App wording="THIS IS Server Side Render"/>)
        });
        res.send(html);
        }
    );
};

const injectHTML = (data, { html, title, meta, body, state }) => {
    data = data.replace('<html>', `<html ${html}>`);
    data = data.replace(/<title>.*?<\/title>/g, title);
    data = data.replace('</head>', `${meta}</head>`);
    data = data.replace(
        '<div id="root"></div>',
        `<div id="root">${body}</div>`
    );
    return data;
};
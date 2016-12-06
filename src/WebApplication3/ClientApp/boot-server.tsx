import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { createServerRenderer } from 'aspnet-prerendering';
import { SearchForm } from './react-app';

export default createServerRenderer(params => {
    return new Promise((resolve, reject) => {
        const app = <SearchForm />;
        const html = renderToString(app);
        resolve({ html });
    });
});
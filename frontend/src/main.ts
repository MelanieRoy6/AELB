import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .then(() => console.log('Application bootstrapped successfully'))
  .catch((err) => {
    console.error('Bootstrap error:', err);
    const div = document.createElement('div');
    div.style.color = 'red';
    div.style.padding = '20px';
    div.style.background = 'black';
    div.style.position = 'fixed';
    div.style.top = '0';
    div.style.zIndex = '10000';
    div.innerHTML = `<h1>BOOTSTRAP ERROR</h1><pre>${err.stack || err}</pre>`;
    document.body.appendChild(div);
  });

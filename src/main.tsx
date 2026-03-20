import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';
import { BrowserRouter } from 'react-router-dom';
import '@vkontakte/vkui/dist/cssm/styles/themes.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider>
        <AdaptivityProvider>
          <App />
        </AdaptivityProvider>
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>,
);

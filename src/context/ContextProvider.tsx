import { Provider } from 'react-redux';
import { Store } from '@reduxjs/toolkit';
import { ThemeProvider } from 'styled-components';
import { ToastProvider } from '@context/Toast';
import ModalProvider from '@components/Common/Modal/ModalContext';
import { useDarkMode } from 'hooks/useDarkMode';
import { light, dark } from 'theme';
import ResetCSS from 'styles/ResetCSS';
import GlobalStyle from 'styles/Global';

const ContextProvider: React.FC<{ children: any; store: Store }> = ({
  children,
  store
}) => {
  const [themeMode, toggleTheme] = useDarkMode();
  const theme = themeMode === 'light' ? light : dark;

  return (
    <ThemeProvider theme={theme}>
      <ResetCSS />
      <GlobalStyle />
      <Provider store={store}>
        <ToastProvider>
          <ModalProvider>{children}</ModalProvider>
        </ToastProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default ContextProvider;

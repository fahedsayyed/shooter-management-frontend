import { FC } from 'react';
import './App.scss'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'src/store/Store';
import { ThemeSettings } from './theme/Theme';
import RTL from './layouts/full/shared/customizer/RTL';
import ScrollToTop from './components/shared/ScrollToTop';
import Router from './routes/Router';
import { AppState } from './store/Store';
import 'react-toastify/dist/ReactToastify.css';


const App: FC = () => {
  const routing = useRoutes(Router);
  const theme = ThemeSettings();
  const customizer = useSelector((state: AppState) => state.customizer);



  return (
    <ThemeProvider theme={theme}>
      <RTL direction={customizer.activeDir}>
        <CssBaseline />
        <ToastContainer />
        <ScrollToTop>{routing}</ScrollToTop>
      </RTL>
    </ThemeProvider>
  );
};

export default App;

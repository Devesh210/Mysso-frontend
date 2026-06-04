import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FilterContextProvider } from './services/FilterContext.jsx';
import { AuthProvider } from './services/AuthContext.jsx';
import { NetworkFilterContextProvider } from './services/NetworkFilterContext.jsx';
import { StartupFilterContextProvider } from './services/StartupFllterContext.jsx';
import { InvestorFilterContextProvider } from './services/InvestorFilterContext.jsx';
import { EducationFilterContextProvider } from './services/EducationFilterContext.jsx';
import  MedicalFilterContextProvider from './services/MedicalFiltercontext.jsx';
import  NgofilterContextProvider from './services/NgofilterContext.jsx';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react'
import { SpinLoader } from './hooks/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <PersistGate loading={<SpinLoader />} persistor={persistor}>
        <AuthProvider>
          <FilterContextProvider>
            <NetworkFilterContextProvider>
              <StartupFilterContextProvider>
                <InvestorFilterContextProvider>
                  <EducationFilterContextProvider>
                    <MedicalFilterContextProvider>
                      <NgofilterContextProvider>
                      <App />
                      </NgofilterContextProvider>
                    </MedicalFilterContextProvider>
                  </EducationFilterContextProvider>
                </InvestorFilterContextProvider>
              </StartupFilterContextProvider>
            </NetworkFilterContextProvider>
          </FilterContextProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  </>
)

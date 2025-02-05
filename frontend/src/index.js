import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Shto BrowserRouter
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

//import { positions, transitions, Provider as AlertProvider } from 'react-alert';
// import AlertTemplate from 'react-alert-template-basic';

// const options = {
//     timeout: 5000,
//     position: positions.BOTTOM_CENTER,
//     transition: transitions.SCALE,
// };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        {/* <AlertProvider {...options}> */}
        <BrowserRouter> {/* Mbështille App me BrowserRouter */}
            <App />
        </BrowserRouter>
        {/* </AlertProvider> */}
    </Provider>
);
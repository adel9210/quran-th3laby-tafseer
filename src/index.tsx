import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux'
import {store} from "./redux/store";
import {ThemeProvider} from "react-bootstrap";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <ThemeProvider breakpoints={['xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint='xxl' >
            <App/>
        </ThemeProvider>
    </Provider>
);

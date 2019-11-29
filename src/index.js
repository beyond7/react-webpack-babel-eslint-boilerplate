// Global Packages 
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// Local Components & Services
import App from './App';
// import store from './store';

// Styling 
import './styles/index.scss';

ReactDOM.render(
	// <Provider store={store}>
	<BrowserRouter>
		<App />
	</BrowserRouter>
	// </Provider>,
	,
	document.getElementById('root')
);

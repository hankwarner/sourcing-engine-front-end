import React from 'react';
import Header from '../Header/Header';
import MainContent from '../MainContent/MainContent';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import { OrderProvider } from '../../context/order.context';
import { RefreshProvider } from '../../context/refresh.context';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<OrderProvider>
				<RefreshProvider>
					<CssBaseline />
					<div className="App">
						<Header />
						<MainContent />
					</div>
				</RefreshProvider>
			</OrderProvider>
		</ThemeProvider>
	);
}
export default App;

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
// import { Provider } from 'react-redux';
// import store from './src/redux/store';
import App from './app';
AppRegistry.registerComponent(appName, () => App);

// const rootComponent = () => {
//     return (
//         <Provider store={store}>
//             <App />
//         </Provider>
//     );
// };


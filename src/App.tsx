import React from 'react';
import { AuthProvider } from './context';
import { RootNavigator } from './navigation';

import axios from 'axios';
axios.defaults.baseURL = 'https://dev.myloopaccount.com';

function App() {
    return (
        <AuthProvider>
            <RootNavigator/>
        </AuthProvider>
    );
}

export default App;
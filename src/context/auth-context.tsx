import axios from 'axios';
import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { getConfiguration, getCurrentUser } from '../services';
import { getAccessToken, removeAccessToken, setAccessToken } from '../utils';

type Action =
    | { type: 'SignIn'; currentUser: any; config: any }
    | { type: 'SignOut' }

type AuthState = {
    currentUser: any;
    config: any;
    loading: boolean;
}

interface AuthContextActions {
    signIn: (accessToken: string) => void;
    signOut: () => void;
}

interface AuthContextType extends AuthState, AuthContextActions { }

const AuthStateContext = createContext<AuthContextType | undefined>(undefined);

function authReducer(state: AuthState, action: Action): AuthState {
    switch (action.type) {
        case 'SignIn': {
            return {
                ...state,
                loading: false,
                currentUser: action.currentUser,
                config: action.config
            }
        }
        case 'SignOut': {
            return {
                ...state,
                loading: false,
                currentUser: undefined,
                config: undefined
            }
        }
    }
}

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(authReducer, {
        loading: true,
        currentUser: undefined,
        config: undefined
    });

    useEffect(() => {
        const initState = async () => {
            try {
                const accessToken = await getAccessToken();
                if (accessToken) {
                    authActions.signIn(accessToken);
                } else {
                    authActions.signOut();
                }
            } catch (e) {
                authActions.signOut();
            }
        };

        initState();
    }, []);

    const authActions: AuthContextActions = useMemo(
        () => ({
            signIn: async (accessToken: string) => {
                await setAccessToken(accessToken);
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                const currentUser = await getCurrentUser();
                const config = await getConfiguration();

                dispatch({ type: 'SignIn', currentUser, config });
            },
            signOut: async () => {
                await removeAccessToken();
                delete axios.defaults.headers.common['Authorization'];
                dispatch({ type: 'SignOut' })
            },
        }),
        []
    );

    const value = { ...state, ...authActions };

    return (
        <AuthStateContext.Provider value={value}>
            {children}
        </AuthStateContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthStateContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context;
}

export { AuthProvider, useAuth }

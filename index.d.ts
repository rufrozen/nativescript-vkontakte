
export type VKAccessToken = any;
export type VKError = any;

export function initialize();
export function onActivityResult(requestCode: number, resultCode: number, data: any, onResult: (token: VKAccessToken) => void, onError: (error: VKError) => void);

export function login(scope: string[]);
export function logout();
export function isLoggedIn(): boolean;
export function getApiVersion(): string;
export function getAccessToken(): VKAccessToken;

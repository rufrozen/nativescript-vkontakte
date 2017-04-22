
export type VKAccessToken = any;
export type VKError = any;

export function initialize();
export function onActivityResult(requestCode: number, resultCode: number, data: any, onResult: (token: VKAccessToken) => void, onError: (error: VKError) => void);

export function login(scope: string[]);
export function logout();
export function isLoggedIn(): boolean;
export function getApiVersion(): string;
export function getAccessToken(): VKAccessToken;

export const enum Constants
{
    VK_API_ERROR = -101,
    VK_API_CANCELED = -102,
    VK_API_REQUEST_NOT_PREPARED = -103,
    VK_API_JSON_FAILED = -104,
    VK_API_REQUEST_HTTP_FAILED = -105,
}

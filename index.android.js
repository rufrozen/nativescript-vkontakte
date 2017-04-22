
var application = require("application");
var VKSdk = com.vk.sdk.VKSdk;
var VKAccessToken = com.vk.sdk.VKAccessToken;
var VKCallback = com.vk.sdk.VKCallback;

module.exports = 
{
    initialize: function() 
    {
        VKSdk.initialize(application.android.context);
    },

    login: function(scope) 
    {
        VKSdk.login(application.android.foregroundActivity, scope);
    },

    logout: function() 
    {
        VKSdk.logout();
    },

    isLoggedIn: function() 
    {
        return  VKSdk.isLoggedIn();
    },

    getApiVersion: function() 
    {
        return VKSdk.getApiVersion();
    },

    getAccessToken: function() 
    {
        return VKAccessToken.currentToken();
    },

    onActivityResult: function(requestCode, resultCode, data, onResult, onError) 
    {
        return VKSdk.onActivityResult(requestCode, resultCode, data, new VKCallback({
            onResult: onResult,
            onError: onError,
        }));
    },
};

var application = require("application");

var vkCallback = null;
var vkInstance = null;

function JSArrayToNSArray(jsArray)
{
    let nsArray = new NSMutableArray();
    for (let currentJSObject of jsArray)
    {
        // Objective-C Arrays can't contain nil, so use NSNull object instead.
        // Marshalling of each element of the array is still done in native.
        nsArray.addObject(currentJSObject != null ? currentJSObject : NSNull.null());
    }
    return nsArray;
}

function createVkSignInDelegate()
{
    var MySignInDelegate = (function (_super)
    {
        __extends(MySignInDelegate, _super);

        function MySignInDelegate()
        {
            _super.apply(this, arguments);
        }

        MySignInDelegate.prototype.vkSdkAccessAuthorizationFinishedWithResult = function(result) // VKAuthorizationResult
        {
            console.log("vkSdkAccessAuthorizationFinishedWithResult");
            if (result.token)
                vkCallback({code: 0, userId: result.token.userId, accessToken: result.token.accessToken, email: result.token.email});
            else if (result.error)
                vkCallback({code: -1, error: -102, vk_code: result.error.code});
            else
                vkCallback({code: 4});
        }

        MySignInDelegate.prototype.vkSdkUserAuthorizationFailed = function()
        {
            vkCallback({code: 1});
        }

        MySignInDelegate.prototype.vkSdkShouldPresentViewController = function(controller) // UIViewController
        {
            console.log("vkSdkShouldPresentViewController");
            application.ios.rootController.presentViewControllerAnimatedCompletion(controller, true, null);
            //vkCallback({code: 2});
        }

        MySignInDelegate.prototype.vkSdkNeedCaptchaEnter = function(captchaError) // VKError
        {
            vkCallback({code: 3});
        }

        MySignInDelegate.ObjCProtocols = [VKSdkDelegate, VKSdkUIDelegate];
        return MySignInDelegate;
    }(NSObject));

    return new MySignInDelegate();
}

module.exports = 
{
    initialize: function(context) 
    {
        vkCallback = context.callback;
        var delegate = createVkSignInDelegate();
        vkInstance = VKSdk.initializeWithAppId(context.appId);
        vkInstance.registerDelegate(delegate);
        vkInstance.uiDelegate = delegate;
    },

    login: function(scope) 
    {
        VKSdk.forceLogout();
        VKSdk.authorizeWithOptions(JSArrayToNSArray(scope), 3);
    },

    logout: function() 
    {
        VKSdk.forceLogout();
    },

    isLoggedIn: function() 
    {
        return null;
    },

    getApiVersion: function() 
    {
        return null;
    },

    getAccessToken: function() 
    {
        return null;
    },

    onProcessOpenURLFromApplication: function(url, sourceApplication)
    {
        VKSdk.processOpenURLFromApplication(url, sourceApplication);
    },
};

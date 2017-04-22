# nativescript-vkontakte
A VKontakte NativeScript module for Android and iOS

install [npm package](https://www.npmjs.com/package/nativescript-vkontakte)
```
tns plugin add nativescript-vkontakte
```

## Setup

### Android

Initialize inside application *onCreate* 
([extend application doc](https://docs.nativescript.org/runtimes/android/advanced-topics/extend-application-activity))
```javascript
var vk = require("nativescript-vkontakte");
    ...
    onCreate: function() 
    {
        superProto.onCreate.call(this);
        // Enter custom initialization code here
        vk.initialize();
    },
```

Subscribe on activityResult

```typescript
import * as application from "application";
import * as vk from "nativescript-vkontakte";

application.android.on('activityResult', data => 
{
    let res = vk.onActivityResult(data.requestCode, data.resultCode, data.intent, token => 
    {
        console.log('VKCallback userId: ' + token.userId);
    }, error => 
    {
        console.log('VKCallback error: ' + error.errorCode);
    });
    console.log('onActivityResult ' + res.toString());
});
```

Add activity to *AndroidManifest.xml*

```xml
<activity android:name="com.vk.sdk.VKServiceActivity" android:label="ServiceActivity" android:theme="@style/VK.Transparent" />
```

Add AppID to *strings.xml*

```xml
<integer name="com_vk_sdk_AppId">YOUR_APP_ID</integer>
```

## Links:
* [vk android docs](https://vk.com/dev/android_sdk)
* [vk-android-sdk](https://github.com/VKCOM/vk-android-sdk)

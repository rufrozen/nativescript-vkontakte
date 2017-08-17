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
        var context = this.getApplicationContext();
        vk.initialize(context);
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

Add AppID to *strings.xml*

```xml
<integer name="com_vk_sdk_AppId">YOUR_APP_ID</integer>
```

### iOS

Add AppID to *Info.plist*
```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>Editor</string>
        <key>CFBundleURLName</key>
        <string>vkYOUR_APP_ID</string>
    </dict>
</array>
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>vk</string>
    <string>vk-share</string>
    <string>vkauthorize</string>
</array>
```

## Links:
* [vk android docs](https://vk.com/dev/android_sdk)
* [vk-android-sdk](https://github.com/VKCOM/vk-android-sdk)

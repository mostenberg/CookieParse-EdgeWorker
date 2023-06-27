# Overview

EdgeWorker Code to capture cookie field values and store them in a PM Variable so that they can be collected by DataStream 2 for enhanced analysis and logging.

## Contents

1. main.js : The EdgeWorker Code which can be run on Akamai platform
2. bundle.json : Edgeworker JSON object containing version number and description
3. test-for-vscode.js : A testing stub used for runnning the EW code in local Visual Studio Environment. Used during development onlu (stub out some properties for easier testing)

## Purpose

Takes a list of cookieNames defined in 'cookieData' grabs the values for all those cookies or fields, then stores into a JSON object which is then written to Akamai variable PMUSER_COOKIEDATA. This variable can then be collected and reported by DS2 to allow for enhanced data logging.

## Logic Overivew

- The object 'cookieData' contains the list of field/cookie names which we will capture into the final JSON object.
  If there is a cookie with the same name as the cookieData entry, we will capture the full value of the cookie as the value. If there is not a cookie with that name, we will parse the cookies into fields and look for a field value within the cookie which matches the name. For example, if the cookieData has a field called 'RC.ACCT', we would first look for a cookie named 'RC.ACCT', and if that doesn't exist then we'd look within the cookies for a field named 'RC.ACCT'
- This code looks at both 'cookie' fields (from an incoming request) and 'Set-Cookie' headers (on an outgoing response) to capture the value of named fields.
- If a field to be collected is available in both the cookie and 'Set-Cookie', we will use the one from 'Set-Cookie'. (This is because a 'Set-Cookie' would overwrite the cookie once it gets back to the browser).
- The code looks for fields in all Set-Cookies. To mitigate the risk of field name collisions, you can look in only a specific list of cookies by changing the code around
  -- let currentCookieValue = setCookieParser.getValueFromAnyCookieorField(currentCookie);
  -to
  -- let currentCookieValue = setCookieParser..getFieldValueFromCookieList(currentCookie,[ListOfCookies]);
- If there are more than one Set-Cookie values for a particular cookie name (which isn't officially supported by the W3C standard) this code will ignore all Set-Cookie values except the last one.
- When stored to a PM variable the values are URL encoded by default.
- For debug purposes, the JSON object is added to a header 'CookieString'. This code should probably be removed when deployed to production.

## Setup and Usage

- Create a new EdgeWorker on the Akamai platform using the main.js and bundle.json provided.
- In the code, modify the object 'cookieData' to have the names of the cookies or cookie fields that you would like to capture.
- In your Akamai configuration, create a variable called PMUSER_COOKIEDATA [Figure 1](/images/PMUSER_COOKIEDATA.jpg)
- In your Akamai configuration, add the EdgeWorker behavior and set it to use the Edgeworker you created.
- To reduce the number of EdgeWorker executions, it is recommended that you only execute the EdgeWorker for the base page and omit resources (omit extensions jpg,png,js,css,gif,woff2 etc)
- In your Akamai configuration, adjust your 'Log Request Details' to capture the field 'PMUSER_COOKIEDATA' [Figure 2](/images/logrequestdetails.jpg)
- Confirm that your DataStream2 setup is configured to capture 'Custom Fields' [Figure 3](/images/ds2setup.jpg)

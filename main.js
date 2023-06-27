/*
(c) Copyright 2023 Akamai Technologies, Inc. Licensed under Apache 2 license.

Version: 1.0
Purpose:  Takes a list of cookieNames defined in 'cookieData' and converts the names and values of all of the cookies into a JSON object
          which is then written to Akamai variable PMUSER_COOKIEDATA.  This variable can then be collected and reported by DS2 to allow for
          enhanced data logging.

Notes: 
1) This code looks at both 'cookie' fields (from an incoming request) and Set-Cookie headers (on an outgoing response).
   If a field to be collected is available in both the cookie and 'Set-Cookie', we will use the one from 'Set-Cookie.
2) If there are more than one Set-Cookie values (which isn't officially supported by the W3C standard) then we will ignore all
   Set-Cookie values except the last one.

Repo: 
*/

// Import logging module
import { logger } from "log";
// Import Cookies module
import { Cookies, SetCookie } from "cookies";

export function onClientRequest(request) {
  const cookieData = {
    cookieBytes: "",
    cookieCount: "",
    "ASP.NET_SessionId": "",
    CTY: "",
    EX: "",
    L1ID: "",
    L2ID: "",
    L3ID: "",
    L4ID: "",
    "RC.ACCT": "",
    "RC.IFL": "",
    "RC.MKT": "",
    "RC.RLOC": "",
    "RC.SEG": "",
    "RC.SP": "",
    "RC.USID": "",
    REC: "",
    ST: "",
    UCID: "",
    Z: "",
  };

  try {
    let cookies = new Cookies(request.getHeader("Cookie"));
    let cookieHeader = request.getHeader("Cookie")[0];
    if (cookieHeader && cookieHeader.length > 0) {
      cookieData.cookieBytes = request.getHeader("Cookie")[0].length;
    } else {
      cookieData.cookieBytes = 0;
    }
    //logger.log("Cookie length is "+cookieData.cookieBytes);
    cookieData.cookieCount = cookies.names().length;
    //logger.log("Cookies.count is:"+cookieData.cookieCount)

    //Set the value for requestCookieData by grabbing the values from cookies on request
    for (var currentCookie in cookieData) {
      if (currentCookie == "cookieBytes") {
        continue;
      } //CookieBytes isn't actually a name of cookie, so skip it.
      if (currentCookie == "cookieCount") {
        continue;
      } //CookieCount isn't actually name of a cookie, so skip it
      let currentCookieValue = cookies.get(currentCookie);
      //logger.log("CurrentCookie is:"+currentCookie+" value is: "+currentCookieValue);
      if (currentCookieValue) {
        cookieData[currentCookie] = cookies.get(currentCookie);
      }
    }

    let cookieString = JSON.stringify(cookieData);
    //logger.lot("Cookie String Length is: "+cookieString.length);
    //logger.log('Cookie String is: %s', cookieString );
    request.setVariable("PMUSER_COOKIEDATA", cookieString);
  } catch (error) {
    logger.log(error.toString());
  }
}

//################################################
export function onClientResponse(request, response) {
  try {
    class parseSetCookieHeaders {
      //Pass in an array of 'set cookie' headers and it will parse into cookies and fields
      //Which you can access with getValueOfCookieField(cookieName,fieldName);
      //obj.cookieName.fieldName
      constructor(arrayOfSetCookies) {
        //Using format of each setCookie as:  cookieName=field1=value1&field2=value2&field3=value3; Domain=domain.com; Expires=somedate; Path=somepath;

        let cookieCount = arrayOfSetCookies.length;
        for (let cookieNumber = 0; cookieNumber < cookieCount; cookieNumber++) {
          let currentCookie = arrayOfSetCookies[cookieNumber].trim(); //remove whitespace at end;
          currentCookie = currentCookie.split("; ")[0]; //Use the first item as the cookie value. Dump domain, expires, path etc.
          if (currentCookie.endsWith(";")) {
            currentCookie = currentCookie.slice(0, currentCookie.length - 1);
          } //Remove end semicolon
          let cookieName = currentCookie.slice(0, currentCookie.indexOf("="));
          //logger.log("Set Cookie Name is: " + cookieName);
          //Now iterate through the field values
          //Using 'cookieName=cookieText', then cookieText is after first equal sign (cookie text will be list)
          let cookieValue = currentCookie.slice(currentCookie.indexOf("=") + 1);
          this[cookieName] = {}; //Note: If there are multiple set-cookies with the same name, this will only use the last one (will throw away earlier ones)
          this[cookieName]["cookieValue"] = cookieValue;
          let fieldValuePairs = cookieValue.split("&");
          //logger.log("fieldValuePairs.length:" + fieldValuePairs.length);
          for (let fieldNum in fieldValuePairs) {
            let fieldValuePair = fieldValuePairs[fieldNum];
            let fieldName = fieldValuePair.slice(
              0,
              fieldValuePair.indexOf("=")
            );
            let fieldValue = fieldValuePair.slice(
              fieldValuePair.indexOf("=") + 1
            );
            this[cookieName][fieldName] = fieldValue;
          }
        }
      }

      getFullCookieValue(cookieName) {
        if (this[cookieName]) {
          return this[cookieName].cookieValue;
        } else {
          return;
        }
      }

      getValueOfCookieField(cookieName, fieldName) {
        if (!this[cookieName]) {
          logger.log("NOTE: Cookie named " + cookieName + " does not exist.");
          return; //Cookie doesn't exist so return nothing
        } else if (!this[cookieName][fieldName]) {
          //logger.log("WARNING: Field named " + fieldName +" does not exist in cookie named " +cookieName);
          return; //Field doesn't exist to return nothing
        } else {
          return this[cookieName][fieldName];
        }
      }
      //Given a list of cookie names, return the field value from the first cookie to have that field
      getFieldValueFromCookieList(cookieList, fieldName) {
        for (let cookieIndex in cookieList) {
          let cookieName = cookieList[cookieIndex];
          let cookieValue = this.getValueOfCookieField(cookieName, fieldName);
          if (cookieValue) {
            return cookieValue;
          } //If cookie has a value for that field, return it and done.
        }
      }

      getFieldValueFromAnyCookie(fieldName) {
        let allCookies = Object.keys(this); //Get lis of all cookies
        return this.getFieldValueFromCookieList(allCookies, fieldName); //Look for that field in all cookies
      }

      getValueFromAnyCookieorField(cookieOrFieldName) {
        //Look for the value as either a cookneName or a field Name
        let allCookies = Object.keys(this);
        //If it matches the name of a cookie, then return the full value of the cookie
        if (allCookies.includes(cookieOrFieldName)) {
          return this.getFullCookieValue(cookieOrFieldName);
        }
        return this.getFieldValueFromCookieList(allCookies, cookieOrFieldName);
      }
    }

    let PMUSER_COOKIEDATA = request.getVariable("PMUSER_COOKIEDATA"); //Grab the cookie data from the request
    //logger.log("PMUSER_COOKIE is:"+PMUSER_COOKIEDATA);
    let cookieData = JSON.parse(PMUSER_COOKIEDATA); //Convert string to object called 'cookieData'

    let setCookieHeaders = response.getHeader("Set-Cookie");
    let setCookieParser = new parseSetCookieHeaders(setCookieHeaders);

    //Set the value for cookieData by grabbing the values from cookies on request
    //Note: Choosing to override request cookie since a stale value (like stale sessionid)
    //from the client will be overwritten by a set-cookie response from server with fresh values
    for (var currentCookie in cookieData) {
      if (currentCookie == "cookieBytes") {
        continue;
      } //CookieBytes isn't actually a name of cookie, so skip it.
      if (currentCookie == "cookieCount") {
        continue;
      } //CookieCount isn't actually name of a cookie, so skip it
      //logger.log("Current cookie:"+currentCookie);
      let currentCookieValue =
        setCookieParser.getValueFromAnyCookieorField(currentCookie);
      //logger.log("Cookie and value: ("+currentCookie+" , "+currentCookieValue+")");
      if (currentCookieValue && currentCookieValue.length > 0) {
        cookieData[currentCookie] = currentCookieValue;
      }
    }
    //Now write the updated cookie back to the PM_VARIABLE
    let cookieString = JSON.stringify(cookieData);
    logger.log("Cookie String length is" + cookieString.length);
    logger.log("Cookie String is: %s", cookieString);
    request.setVariable("PMUSER_COOKIEDATA", cookieString);

    response.addHeader("CookieString", cookieString); //For Debug only. Remove for prod
  } catch (error) {
    logger.log(error.toString());
  }
}

// This is a code stub used for testing the Edgeworker Code in Visual Studio Code on local laptop

let request = {
  setVariable: function (arg1, arg2) {
    this[arg1] = arg2;
  },
};

let response = {
  addHeader: function (arg1, arg2) {
    this[arg1] = arg2;
  },
};

let setCookieHeaders = [
  "SC=RC.USID=d147f78b-6478-491b-ad32-42e207ecb221&VA=1026&CTY=Ranchocordova&ST=CA&Z=95670&ISP=comcast&GEO=True&RC.MKT=9062&L1ID=8617&L2ID=11493&L3ID=9049&L4ID=8928; domain=xfinity.com; expires=Sun, 25-Jun-2023 22:27:27 GMT; path=/; secure; SameSite=Lax; Secure",
  "PSC=UCID=aaaaa3ba-41b0-4960-bd04-388ba65a4046&CTY=CLEMENTON&ST=NJ&Z=08021&EX=True&REC=Y&RC.MKT=13319&RC.RLOC=208229447; expires=Tue, 25-Jun-2024 22:07:27 GMT; path=/; secure; SameSite=Lax; Secure ",
  "PSC=UCID=bbbbb13ba-41b0-4960-bd04-388ba65a4046&CTY=SANTACLARA&ST=NJ&Z=08021&EX=True&REC=Y&RC.MKT=13319&RC.RLOC=208229447; expires=Tue, 25-Jun-2024 22:07:27 GMT; path=/; secure; SameSite=Lax; Sec>",
  "PSC=UCID=fcfa7ea3-d8de-4caf-aeab-7b6a9607155e&CTY=Ranchocordova&ST=CA&Z=95670&EX=True&REC=N&RC.MKT=9062; expires=Tue, 25-Jun-2024 22:07:27 GMT; path=/; secure; SameSite=Lax; Secure",
  "SC=RC.USID=404fdd8c-b84a-4131-986b-59ef71541a24&VA=-2113929214&L1ID=11599&L2ID=1187&L3ID=1739&L4ID=13152&RC.IPL=N&RC.SP=9cccf161-2727-4522-a1e5-708088bc1e45&Z=08021&CTY=CLEMENTON&ST=NJ&RC.MKT=13319&RC.LOC=208229447&RC.BIL=CSG&RC.SYS=8499&RC.PRIN=500&RC.AGT=1490&RC.CORP=0&RC.CRPN=0&RC.FRCH=0&RC.FRCHN=1680&RC.HK=EEB5FDFAFAEBA6EE7176FD311B0E7950&RC.IFL=Y&RC.CID=9E7DF8735668919EF986D871638663DFDAA77C50A3E5CB81BD3C06D2B31231D6A501E0CB393D2C3C&RC.AGID=8F8E45C1AA7FADA25EE83293785BC90EA1079BB18C45D7198D47C7EDD9BF21F0&RC.ACCTS=D1A9CF0026B5624C336654D640E5E90AB7623CDA69A244C9B8A99F53FE610878E9AE0BDB34C352D6&RC.ACCT=D1A9CF0026B5624C336654D640E5E90AC32FCBFD6F536419; expires=Sun, 25-Jun-2024 22:27:27 GMT; path=/; secure; SameSite=Lax; Secure",
  //"SC=RC.USID=d147f78b-6478-491b-ad32-42e207ecb221&VA=1026&CTY=Ranchocordova&ST=CA&Z=95670&ISP=comcast&GEO=True&RC.MKT=9062&L1ID=8617&L2ID=11493&L3ID=9049&L4ID=8928; expires=Sun, 25-Jun-2024 22:27:27 GMT; path=/; secure; SameSite=Lax; Secure",
  "bm_mi=B1EC0967A5348F56040939F4CD889D52~YAAQ0E9DF6DjaOmIAQAA5geZ9BSZMGidLMGf646v7bpWtKNcQU0uCeGXBvHcp9O6paFuL5B7Xm1PqD1AjpsOAVbzZGIPq4Ue/gIFrM1YsHzdoctt1JQe768dhgnMxMg+hCEKBc1vTce3ajP4FmM8lA2DNBvuU5bgiWyVvDNyQjfZAod04+NJgZ/OXfdf3Gz/0laspzhP8FHlZ+kXOGk0MBhzTCbZuM3q8HPtOgxaVXLBVILOUGO9DDO2s5fEHihiHjT2Vc3nwTJ9I+VBctkBe7yrKRVlJtTmVJXmaypzeKLa1fb/ARs0CiXB15tvcI11t1wsKgScPQ==~1; Path=/; Expires=Sun, 25 Jun 2024 22:07:29 GMT; Max-Age=0; Secure",
  "bm_sz=9F7AEDD31900AB6AABA284461482FB9C~YAAQ0E9DF6HjaOmIAQAA5geZ9BRXqfOJ84iFInfPlFW6hYc4owSiMCLG9Vny6vh5Xd1mxNDO000hKXVakkSqN/VCC9d2Hz9xA+A24AdbpNeABu9SYUNkqjJXDutDTeLlxPZpoQ0gxluqd5OrlPJ/FqBelU2mt3bpxtY4y04j+kzpzAw4iRWw0MPyiOIJbXzrPBuES006VVaBTz1sgX+JAkky3cw5vSXex8Wdy9VzG37b0yYpBo00B4asdmjcL+yNrf1Ql2i1hU+TxSgotB/AcXh2zpmS92bEhkPK014tufkAY4Eh~3687223~4600120; Path=/; Expires=Mon, 26 Jun 2024 02:07:27 GMT; Max-Age=14398",
  "sc_session=hszbi4nmhxbopd2q2mxm0gxr; domain=.xfinity.com; path=/; secure; HttpOnly; SameSite=Lax; Secure",
  "xfinity-learn-ui#lang=en; path=/; secure; SameSite=Lax; Secure",
  "ASP.NET_SessionId=forv1mtggmw5oveim0x2cq0i;",
];

let logger = {};

logger.log = function (thang) {
  console.log(thang);
};

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
      logger.log("Set Cookie Name is: " + cookieName);
      //Now iterate through the field values
      //Using 'cookieName=cookieText', then cookieText is after first equal sign (cookie text will be list)
      let cookieValue = currentCookie.slice(currentCookie.indexOf("=") + 1);
      if (!this[cookieName]) {
        this[cookieName] = {};
      } //Note: Option 1: If there are 2 set-cookies with same name, this will merge them
      //this[cookieName] = {}; //Note: Option 2: If there are 2 set-cookies with same name this will only use the latest.
      this[cookieName]["cookieValue"] = cookieValue;
      let fieldValuePairs = cookieValue.split("&");
      //logger.log("fieldValuePairs.length:" + fieldValuePairs.length);
      for (let fieldNum in fieldValuePairs) {
        let fieldValuePair = fieldValuePairs[fieldNum];
        let fieldName = fieldValuePair.slice(0, fieldValuePair.indexOf("="));
        let fieldValue = fieldValuePair.slice(fieldValuePair.indexOf("=") + 1);
        if (fieldValue.length > 0) {
          this[cookieName][fieldName] = fieldValue;
        }
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
    //Look for the value as either a cookieName or a field Name
    let allCookies = Object.keys(this);
    //If it matches the name of a cookie, then return the full value of the cookie
    if (allCookies.includes(cookieOrFieldName)) {
      return this.getFullCookieValue(cookieOrFieldName);
    }
    return this.getFieldValueFromCookieList(allCookies, cookieOrFieldName);
  }
}

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
logger.log("Cookie String is: " + cookieString);
request.setVariable("PMUSER_COOKIEDATA", cookieString);

response.addHeader("CookieString", cookieString); //For Debug

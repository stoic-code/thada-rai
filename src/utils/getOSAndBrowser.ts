export function getBrowserOrOSDetails() {
  const userAgent = window.navigator.userAgent;

  const browser = {
    name: "Unknown",
    version: "Unknown",
  };
  const os = {
    name: "Unknown",
    version: "Unknown",
  };

  // Browser detection
  if (/chrome|crios|crmo/i.test(userAgent)) {
    browser.name = "Chrome";
    browser.version = (userAgent.match(/chrome\/([0-9.]+)/i) || [])[1];
  } else if (/firefox|fxios/i.test(userAgent)) {
    browser.name = "Firefox";
    browser.version = (userAgent.match(/firefox\/([0-9.]+)/i) || [])[1];
  } else if (/safari/i.test(userAgent)) {
    browser.name = "Safari";
    browser.version = (userAgent.match(/version\/([0-9.]+)/i) || [])[1];
  } else if (/msie|trident/i.test(userAgent)) {
    browser.name = "Internet Explorer";
    browser.version = (userAgent.match(/(?:msie |trident.*rv:)([0-9.]+)/i) ||
      [])[1];
  } else if (/edge/i.test(userAgent)) {
    browser.name = "Edge";
    browser.version = (userAgent.match(/edge\/([0-9.]+)/i) || [])[1];
  }

  // OS detection
  if (/windows nt/i.test(userAgent)) {
    os.name = "Windows";
    os.version = (userAgent.match(/windows nt ([0-9.]+)/i) || [])[1];
  } else if (/mac os x/i.test(userAgent)) {
    os.name = "macOS";
    os.version = (userAgent.match(/mac os x ([0-9_]+)/i) || [])[1].replace(
      /_/g,
      "."
    );
  } else if (/android/i.test(userAgent)) {
    os.name = "Android";
    os.version = (userAgent.match(/android ([0-9.]+)/i) || [])[1];
  } else if (/iphone|ipad/i.test(userAgent)) {
    os.name = "iOS";
    os.version = (userAgent.match(/os ([0-9_]+)/i) || [])[1].replace(/_/g, ".");
  }

  return { browser, os };
}

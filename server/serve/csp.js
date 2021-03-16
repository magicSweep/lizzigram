exports.makeCspHeader = (isReport = true) => {
  const header = isReport
    ? "Content-Security-Policy-Report-Only"
    : "Content-Security-Policy";
  let rule = "";

  rule += this.getDefaultSrc();

  rule += this.getScriptSrc();

  rule += this.getStyleSrc();

  rule += this.getConnectSrc();

  rule += this.getManifestSrc();

  rule += this.getImageSrc();

  //rule += this.getOtherDirectives();

  //rule += this.getReportUri();

  return [header, rule];
};

exports.getDefaultSrc = () => {
  return "default-src 'none';";
};

exports.getScriptSrc = function () {
  return "script-src 'self';";
};

exports.getStyleSrc = function () {
  return "style-src 'self';";
};

//Ajax requests
exports.getConnectSrc = function () {
  return "connect-src 'self' https://www.googleapis.com https://firestore.googleapis.com;";
};

exports.getImageSrc = function () {
  return "img-src 'self' data: https://res.cloudinary.com;";
};

//manifest-src
exports.getManifestSrc = function () {
  return "manifest-src 'self';";
};

//img-src
//font-src
//object-src
//media-src
//child-src

//report-uri /your_csp_report_parser;

exports.getOtherDirectives = function () {
  return "form-action 'none'; font-src 'none'; object-src 'none'; media-src 'none'; child-src 'none';";
};

exports.getReportUri = function () {
  return "report-uri /your_csp_report_parser;";
};

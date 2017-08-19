var templateUrlRegex = /templateUrl\s*:(\s*['"`](.*?)['"`]\s*)/gm,
    stylesUrlsRegex  = /styleUrls *:(\s*\[[^\]]*?\])/g,
    stringRegex      = /(['`"])((?:[^\\]\\\1|.)*?)\1/g;

module.exports.translate = function (load) {

    var url, basePathParts, basePath, baseHref;

    if (load.source.indexOf("moduleId") !== -1) {
        return load;
    }

    url = document.createElement("a");
    url.href = load.address;

    basePathParts = url.pathname.split("/");
    basePathParts.pop();

    basePath = basePathParts.join("/");

    baseHref = document.createElement("a");
    baseHref.href = this.baseURL;
    baseHref = baseHref.pathname;

    if (!baseHref.startsWith("/base/")) { // Non-Karma context
        basePath = basePath.replace(baseHref, "");
    }

    load.source = load.source
                      .replace(templateUrlRegex, function (match, quote, url) {

                          var templateUrl = url;

                          if (url.startsWith(".")) {
                              templateUrl = basePath + url.substr(1);
                          }

                          return 'templateUrl: "' + templateUrl + '"';
                      })
                      .replace(stylesUrlsRegex, function (match, urls) {

                          var styleUrls = [];

                          while ((match = stringRegex.exec(urls)) !== null) {

                              var urlString = match[2];

                              if (urlString.startsWith(".")) {
                                  styleUrls.push('"' + basePath + urlString.substr(1) + '"');
                              } else {
                                  styleUrls.push('"' + urlString + '"');
                              }
                          }

                          return "styleUrls: [" + styleUrls.join(", ") + "]";
                      });

    return load;
};
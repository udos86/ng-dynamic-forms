"use strict";
exports.AUTOCOMPLETE_OFF = "off";
exports.AUTOCOMPLETE_ON = "on";
exports.AUTOFILL_TOKEN_BILLING = "billing";
exports.AUTOFILL_TOKEN_SHIPPING = "shipping";
exports.AUTOFILL_TOKENS_ADDRESS = [exports.AUTOFILL_TOKEN_BILLING, exports.AUTOFILL_TOKEN_SHIPPING];
exports.AUTOFILL_TOKEN_HOME = "home";
exports.AUTOFILL_TOKEN_WORK = "work";
exports.AUTOFILL_TOKEN_MOBILE = "mobile";
exports.AUTOFILL_TOKEN_FAX = "fax";
exports.AUTOFILL_TOKEN_PAGER = "pager";
exports.AUTOFILL_TOKENS_CONTACT = [
    exports.AUTOFILL_TOKEN_FAX, exports.AUTOFILL_TOKEN_HOME, exports.AUTOFILL_TOKEN_MOBILE, exports.AUTOFILL_TOKEN_PAGER, exports.AUTOFILL_TOKEN_WORK
];
exports.AUTOFILL_FIELD_STREET_ADDRESS = "street-address";
exports.AUTOFILL_FIELD_ADDRESS_LINE_1 = "address-line1";
exports.AUTOFILL_FIELD_ADDRESS_LINE_2 = "address-line2";
exports.AUTOFILL_FIELD_ADDRESS_LINE_3 = "address-line3";
exports.AUTOFILL_FIELD_ADDRESS_LEVEL_4 = "address-level4";
exports.AUTOFILL_FIELD_ADDRESS_LEVEL_3 = "address-level3";
exports.AUTOFILL_FIELD_ADDRESS_LEVEL_2 = "address-level2";
exports.AUTOFILL_FIELD_ADDRESS_LEVEL_1 = "address-level1";
exports.AUTOFILL_FIELD_NAME = "name";
exports.AUTOFILL_FIELD_HONORIFIC_PREFIX = "honorific-prefix";
exports.AUTOFILL_FIELD_GIVEN_NAME = "given-name";
exports.AUTOFILL_FIELD_ADDITIONAL_NAME = "additional-name";
exports.AUTOFILL_FIELD_FAMILY_NAME = "family-name";
exports.AUTOFILL_FIELD_HONORIFIC_SUFFIX = "honorific-suffix";
exports.AUTOFILL_FIELD_NICKNAME = "nickname";
exports.AUTOFILL_FIELD_USERNAME = "username";
exports.AUTOFILL_FIELD_NEW_PASSWORD = "new-password";
exports.AUTOFILL_FIELD_CURRENT_PASSWORD = "current-password";
exports.AUTOFILL_FIELD_ORGANIZATION_TITLE = "organization-title";
exports.AUTOFILL_FIELD_ORGANIZATION = "organization";
exports.AUTOFILL_FIELD_COUNTRY = "country";
exports.AUTOFILL_FIELD_COUNTRY_NAME = "country-name";
exports.AUTOFILL_FIELD_POSTAL_CODE = "postal-code";
exports.AUTOFILL_FIELD_CC_NAME = "cc-name";
exports.AUTOFILL_FIELD_CC_GIVEN_NAME = "cc-given-name";
exports.AUTOFILL_FIELD_CC_ADDITIONAL_NAME = "cc-additional-name";
exports.AUTOFILL_FIELD_CC_FAMILY_NAME = "cc-family-name";
exports.AUTOFILL_FIELD_CC_NUMBER = "cc-number";
exports.AUTOFILL_FIELD_CC_EXP = "cc-exp";
exports.AUTOFILL_FIELD_CC_EXP_MONTH = "cc-exp-month";
exports.AUTOFILL_FIELD_CC_EXP_YEAR = "cc-exp-year";
exports.AUTOFILL_FIELD_CC_CSC = "cc-csc";
exports.AUTOFILL_FIELD_CC_TYPE = "cc-type";
exports.AUTOFILL_FIELD_TRANSACTION_CURRENCY = "transaction-currency";
exports.AUTOFILL_FIELD_TRANSACTION_AMOUNT = "transaction-amount";
exports.AUTOFILL_FIELD_LANGUAGE = "language";
exports.AUTOFILL_FIELD_BDAY = "bday";
exports.AUTOFILL_FIELD_BDAY_DAY = "bday-day";
exports.AUTOFILL_FIELD_BDAY_MONTH = "bday-month";
exports.AUTOFILL_FIELD_BDAY_YEAR = "bday-year";
exports.AUTOFILL_FIELD_SEX = "sex";
exports.AUTOFILL_FIELD_URL = "url";
exports.AUTOFILL_FIELD_PHOTO = "photo";
exports.AUTOFILL_FIELDS = [
    exports.AUTOFILL_FIELD_STREET_ADDRESS, exports.AUTOFILL_FIELD_ADDRESS_LINE_1, exports.AUTOFILL_FIELD_ADDRESS_LINE_2,
    exports.AUTOFILL_FIELD_ADDRESS_LINE_3, exports.AUTOFILL_FIELD_ADDRESS_LEVEL_4, exports.AUTOFILL_FIELD_ADDRESS_LEVEL_3,
    exports.AUTOFILL_FIELD_ADDRESS_LEVEL_2, exports.AUTOFILL_FIELD_ADDRESS_LEVEL_1, exports.AUTOFILL_FIELD_NAME,
    exports.AUTOFILL_FIELD_HONORIFIC_PREFIX, exports.AUTOFILL_FIELD_GIVEN_NAME, exports.AUTOFILL_FIELD_ADDITIONAL_NAME,
    exports.AUTOFILL_FIELD_FAMILY_NAME, exports.AUTOFILL_FIELD_HONORIFIC_SUFFIX, exports.AUTOFILL_FIELD_NICKNAME, exports.AUTOFILL_FIELD_USERNAME,
    exports.AUTOFILL_FIELD_NEW_PASSWORD, exports.AUTOFILL_FIELD_CURRENT_PASSWORD, exports.AUTOFILL_FIELD_ORGANIZATION_TITLE,
    exports.AUTOFILL_FIELD_ORGANIZATION, exports.AUTOFILL_FIELD_COUNTRY, exports.AUTOFILL_FIELD_COUNTRY_NAME, exports.AUTOFILL_FIELD_POSTAL_CODE,
    exports.AUTOFILL_FIELD_CC_NAME, exports.AUTOFILL_FIELD_CC_GIVEN_NAME, exports.AUTOFILL_FIELD_CC_ADDITIONAL_NAME,
    exports.AUTOFILL_FIELD_CC_FAMILY_NAME, exports.AUTOFILL_FIELD_CC_NUMBER, exports.AUTOFILL_FIELD_CC_EXP, exports.AUTOFILL_FIELD_CC_EXP_MONTH,
    exports.AUTOFILL_FIELD_CC_EXP_YEAR, exports.AUTOFILL_FIELD_CC_CSC, exports.AUTOFILL_FIELD_CC_TYPE, exports.AUTOFILL_FIELD_TRANSACTION_CURRENCY,
    exports.AUTOFILL_FIELD_TRANSACTION_AMOUNT, exports.AUTOFILL_FIELD_LANGUAGE, exports.AUTOFILL_FIELD_BDAY, exports.AUTOFILL_FIELD_BDAY_DAY,
    exports.AUTOFILL_FIELD_BDAY_MONTH, exports.AUTOFILL_FIELD_BDAY_YEAR, exports.AUTOFILL_FIELD_SEX, exports.AUTOFILL_FIELD_URL, exports.AUTOFILL_FIELD_PHOTO
];
exports.AUTOFILL_FIELD_TEL = "tel";
exports.AUTOFILL_FIELD_TEL_COUNTRY_CODE = "tel-country-code";
exports.AUTOFILL_FIELD_TEL_NATIONAL = "tel-national";
exports.AUTOFILL_FIELD_TEL_AREA_CODE = "tel-area-code";
exports.AUTOFILL_FIELD_TEL_LOCAL = "tel-local";
exports.AUTOFILL_FIELD_TEL_LOCAL_PREFIX = "tel-local-prefix";
exports.AUTOFILL_FIELD_TEL_LOCAL_SUFFIX = "tel-local-suffix";
exports.AUTOFILL_FIELD_TEL_LOCAL_EXTENSION = "tel-extension";
exports.AUTOFILL_FIELD_EMAIL = "email";
exports.AUTOFILL_FIELD_IMPP = "impp";
exports.AUTOFILL_FIELDS_CONTACT = [
    exports.AUTOFILL_FIELD_TEL, exports.AUTOFILL_FIELD_TEL_COUNTRY_CODE, exports.AUTOFILL_FIELD_TEL_NATIONAL, exports.AUTOFILL_FIELD_TEL_AREA_CODE,
    exports.AUTOFILL_FIELD_TEL_LOCAL, exports.AUTOFILL_FIELD_TEL_LOCAL_PREFIX, exports.AUTOFILL_FIELD_TEL_LOCAL_SUFFIX,
    exports.AUTOFILL_FIELD_TEL_LOCAL_EXTENSION, exports.AUTOFILL_FIELD_EMAIL, exports.AUTOFILL_FIELD_IMPP
];
var DynamicFormAutoFillService = (function () {
    function DynamicFormAutoFillService() {
    }
    DynamicFormAutoFillService.prototype.isAddressToken = function (token) {
        return exports.AUTOFILL_TOKENS_ADDRESS.indexOf(token) > -1;
    };
    DynamicFormAutoFillService.prototype.isContactField = function (token) {
        return exports.AUTOFILL_FIELDS_CONTACT.indexOf(token) > -1;
    };
    DynamicFormAutoFillService.prototype.isContactToken = function (token) {
        return exports.AUTOFILL_TOKENS_CONTACT.indexOf(token) > -1;
    };
    DynamicFormAutoFillService.prototype.isField = function (token) {
        return exports.AUTOFILL_FIELDS.indexOf(token) > -1;
    };
    DynamicFormAutoFillService.prototype.isSectionToken = function (token) {
        return token.startsWith("section-");
    };
    DynamicFormAutoFillService.prototype.validate = function (tokens) {
        function toExpression(total, currentValue) {
            return total + "|" + currentValue;
        }
        var tokensAddress = exports.AUTOFILL_TOKENS_ADDRESS.reduce(toExpression);
        var tokensContact = exports.AUTOFILL_TOKENS_CONTACT.reduce(toExpression);
        var fields = exports.AUTOFILL_FIELDS.reduce(toExpression);
        var fieldsContact = exports.AUTOFILL_FIELDS_CONTACT.reduce(toExpression);
        var regex = new RegExp("^(section-\\w+\\s{1})?((" + tokensAddress + "){1}\\s)?((" + fields + "){1}|((" + tokensContact + "){1}\\s{1}(" + fieldsContact + ")))$");
        return regex.test(tokens);
    };
    return DynamicFormAutoFillService;
}());
exports.DynamicFormAutoFillService = DynamicFormAutoFillService;

//# sourceMappingURL=dynamic-form-autofill.service.js.map

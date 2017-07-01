export const AUTOCOMPLETE_OFF = "off";
export const AUTOCOMPLETE_ON = "on";

export const AUTOFILL_TOKEN_BILLING = "billing";
export const AUTOFILL_TOKEN_SHIPPING = "shipping";

export const AUTOFILL_TOKENS_ADDRESS = [AUTOFILL_TOKEN_BILLING, AUTOFILL_TOKEN_SHIPPING];

export const AUTOFILL_TOKEN_HOME = "home";
export const AUTOFILL_TOKEN_WORK = "work";
export const AUTOFILL_TOKEN_MOBILE = "mobile";
export const AUTOFILL_TOKEN_FAX = "fax";
export const AUTOFILL_TOKEN_PAGER = "pager";

export const AUTOFILL_TOKENS_CONTACT = [
    AUTOFILL_TOKEN_FAX, AUTOFILL_TOKEN_HOME, AUTOFILL_TOKEN_MOBILE, AUTOFILL_TOKEN_PAGER, AUTOFILL_TOKEN_WORK
];

export const AUTOFILL_FIELD_STREET_ADDRESS = "street-address";
export const AUTOFILL_FIELD_ADDRESS_LINE_1 = "address-line1";
export const AUTOFILL_FIELD_ADDRESS_LINE_2 = "address-line2";
export const AUTOFILL_FIELD_ADDRESS_LINE_3 = "address-line3";
export const AUTOFILL_FIELD_ADDRESS_LEVEL_4 = "address-level4";
export const AUTOFILL_FIELD_ADDRESS_LEVEL_3 = "address-level3";
export const AUTOFILL_FIELD_ADDRESS_LEVEL_2 = "address-level2";
export const AUTOFILL_FIELD_ADDRESS_LEVEL_1 = "address-level1";

export const AUTOFILL_FIELD_NAME = "name";
export const AUTOFILL_FIELD_HONORIFIC_PREFIX = "honorific-prefix";
export const AUTOFILL_FIELD_GIVEN_NAME = "given-name";
export const AUTOFILL_FIELD_ADDITIONAL_NAME = "additional-name";
export const AUTOFILL_FIELD_FAMILY_NAME = "family-name";
export const AUTOFILL_FIELD_HONORIFIC_SUFFIX = "honorific-suffix";
export const AUTOFILL_FIELD_NICKNAME = "nickname";
export const AUTOFILL_FIELD_USERNAME = "username";

export const AUTOFILL_FIELD_NEW_PASSWORD = "new-password";
export const AUTOFILL_FIELD_CURRENT_PASSWORD = "current-password";

export const AUTOFILL_FIELD_ORGANIZATION_TITLE = "organization-title";
export const AUTOFILL_FIELD_ORGANIZATION = "organization";

export const AUTOFILL_FIELD_COUNTRY = "country";
export const AUTOFILL_FIELD_COUNTRY_NAME = "country-name";
export const AUTOFILL_FIELD_POSTAL_CODE = "postal-code";

export const AUTOFILL_FIELD_CC_NAME = "cc-name";
export const AUTOFILL_FIELD_CC_GIVEN_NAME = "cc-given-name";
export const AUTOFILL_FIELD_CC_ADDITIONAL_NAME = "cc-additional-name";
export const AUTOFILL_FIELD_CC_FAMILY_NAME = "cc-family-name";
export const AUTOFILL_FIELD_CC_NUMBER = "cc-number";
export const AUTOFILL_FIELD_CC_EXP = "cc-exp";
export const AUTOFILL_FIELD_CC_EXP_MONTH = "cc-exp-month";
export const AUTOFILL_FIELD_CC_EXP_YEAR = "cc-exp-year";
export const AUTOFILL_FIELD_CC_CSC = "cc-csc";
export const AUTOFILL_FIELD_CC_TYPE = "cc-type";

export const AUTOFILL_FIELD_TRANSACTION_CURRENCY = "transaction-currency";
export const AUTOFILL_FIELD_TRANSACTION_AMOUNT = "transaction-amount";

export const AUTOFILL_FIELD_LANGUAGE = "language";

export const AUTOFILL_FIELD_BDAY = "bday";
export const AUTOFILL_FIELD_BDAY_DAY = "bday-day";
export const AUTOFILL_FIELD_BDAY_MONTH = "bday-month";
export const AUTOFILL_FIELD_BDAY_YEAR = "bday-year";

export const AUTOFILL_FIELD_SEX = "sex";

export const AUTOFILL_FIELD_URL = "url";

export const AUTOFILL_FIELD_PHOTO = "photo";

export const AUTOFILL_FIELDS = [

    AUTOFILL_FIELD_STREET_ADDRESS, AUTOFILL_FIELD_ADDRESS_LINE_1, AUTOFILL_FIELD_ADDRESS_LINE_2,
    AUTOFILL_FIELD_ADDRESS_LINE_3, AUTOFILL_FIELD_ADDRESS_LEVEL_4, AUTOFILL_FIELD_ADDRESS_LEVEL_3,
    AUTOFILL_FIELD_ADDRESS_LEVEL_2, AUTOFILL_FIELD_ADDRESS_LEVEL_1, AUTOFILL_FIELD_NAME,
    AUTOFILL_FIELD_HONORIFIC_PREFIX, AUTOFILL_FIELD_GIVEN_NAME, AUTOFILL_FIELD_ADDITIONAL_NAME,
    AUTOFILL_FIELD_FAMILY_NAME, AUTOFILL_FIELD_HONORIFIC_SUFFIX, AUTOFILL_FIELD_NICKNAME, AUTOFILL_FIELD_USERNAME,
    AUTOFILL_FIELD_NEW_PASSWORD, AUTOFILL_FIELD_CURRENT_PASSWORD, AUTOFILL_FIELD_ORGANIZATION_TITLE,
    AUTOFILL_FIELD_ORGANIZATION, AUTOFILL_FIELD_COUNTRY, AUTOFILL_FIELD_COUNTRY_NAME, AUTOFILL_FIELD_POSTAL_CODE,
    AUTOFILL_FIELD_CC_NAME, AUTOFILL_FIELD_CC_GIVEN_NAME, AUTOFILL_FIELD_CC_ADDITIONAL_NAME,
    AUTOFILL_FIELD_CC_FAMILY_NAME, AUTOFILL_FIELD_CC_NUMBER, AUTOFILL_FIELD_CC_EXP, AUTOFILL_FIELD_CC_EXP_MONTH,
    AUTOFILL_FIELD_CC_EXP_YEAR, AUTOFILL_FIELD_CC_CSC, AUTOFILL_FIELD_CC_TYPE, AUTOFILL_FIELD_TRANSACTION_CURRENCY,
    AUTOFILL_FIELD_TRANSACTION_AMOUNT, AUTOFILL_FIELD_LANGUAGE, AUTOFILL_FIELD_BDAY, AUTOFILL_FIELD_BDAY_DAY,
    AUTOFILL_FIELD_BDAY_MONTH, AUTOFILL_FIELD_BDAY_YEAR, AUTOFILL_FIELD_SEX, AUTOFILL_FIELD_URL, AUTOFILL_FIELD_PHOTO
];

export const AUTOFILL_FIELD_TEL = "tel";
export const AUTOFILL_FIELD_TEL_COUNTRY_CODE = "tel-country-code";
export const AUTOFILL_FIELD_TEL_NATIONAL = "tel-national";
export const AUTOFILL_FIELD_TEL_AREA_CODE = "tel-area-code";
export const AUTOFILL_FIELD_TEL_LOCAL = "tel-local";
export const AUTOFILL_FIELD_TEL_LOCAL_PREFIX = "tel-local-prefix";
export const AUTOFILL_FIELD_TEL_LOCAL_SUFFIX = "tel-local-suffix";
export const AUTOFILL_FIELD_TEL_LOCAL_EXTENSION = "tel-extension";
export const AUTOFILL_FIELD_EMAIL = "email";
export const AUTOFILL_FIELD_IMPP = "impp";

export const AUTOFILL_FIELDS_CONTACT = [

    AUTOFILL_FIELD_TEL, AUTOFILL_FIELD_TEL_COUNTRY_CODE, AUTOFILL_FIELD_TEL_NATIONAL, AUTOFILL_FIELD_TEL_AREA_CODE,
    AUTOFILL_FIELD_TEL_LOCAL, AUTOFILL_FIELD_TEL_LOCAL_PREFIX, AUTOFILL_FIELD_TEL_LOCAL_SUFFIX,
    AUTOFILL_FIELD_TEL_LOCAL_EXTENSION, AUTOFILL_FIELD_EMAIL, AUTOFILL_FIELD_IMPP
];

export class AutoFillUtils {

    static isAddressToken(token: string): boolean {
        return AUTOFILL_TOKENS_ADDRESS.indexOf(token) > -1;
    }

    static isContactField(token: string): boolean {
        return AUTOFILL_FIELDS_CONTACT.indexOf(token) > -1;
    }

    static isContactToken(token: string): boolean {
        return AUTOFILL_TOKENS_CONTACT.indexOf(token) > -1;
    }

    static isField(token: string): boolean {
        return AUTOFILL_FIELDS.indexOf(token) > -1;
    }

    static isSectionToken(token: string): boolean {
        return token.startsWith("section-");
    }

    static validate(tokens: string): boolean {

        let toExpression = (total: string, currentValue: string) => `${total}|${currentValue}`,
            tokensAddress = AUTOFILL_TOKENS_ADDRESS.reduce(toExpression),
            tokensContact = AUTOFILL_TOKENS_CONTACT.reduce(toExpression),
            fields = AUTOFILL_FIELDS.reduce(toExpression),
            fieldsContact = AUTOFILL_FIELDS_CONTACT.reduce(toExpression),
            regex = new RegExp(`^(section-\\w+\\s{1})?((${tokensAddress}){1}\\s)?((${fields}){1}|((${tokensContact}){1}\\s{1}(${fieldsContact})))$`);

        return regex.test(tokens);
    }
}
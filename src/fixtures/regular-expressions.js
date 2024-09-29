export const RegExp = {
    NAME: /^(?!\s*$).+/,
    DATE: /(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/,
    PAYMENT_TYPE: /(Bankovní převod|FKSP|Hotově|Složenka)/,
    TO_PAY: /\d{1,3}(| \d{0,3}) Kč/,
}

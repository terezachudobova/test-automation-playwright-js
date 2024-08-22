export const username = 'da-app.admin@czechitas.cz';
export const password = 'Czechitas123';
export const userFullName = 'Lišák Admin';
export const applicationsPageSize = 30;
export const applicationsSearchText = 'Albert';

export const RegExp = {
    NAME: /^(?!\s*$).+/,
    DATE: /(\d{2}.\d{2}.\d{4}|\d{2}.\d{2}. - \d{2}.\d{2}.\d{4})/,
    PAYMENT_TYPE: /(Bankovní převod|FKSP|Hotově|Složenka)/,
    TO_PAY: /\d{1,3}(| \d{0,3}) Kč/
}

export const ApplicationTexts = {
    loginPage: {
        title:'Přihlášení - Czechitas',
        emailFieldLabel: 'Email',
        passwordFieldLabel: 'Heslo',
        loginButtonLabel: 'Přihlásit',
    },
    applicationsPage: {
        title: 'Přihlášky - Czechitas',
        applicationsSectionName: 'Přihlášky'
    }
}

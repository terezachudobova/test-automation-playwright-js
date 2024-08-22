/**
 * Page object describing the applications page
 */
const {AppPage} = require("./app.page");
exports.ApplicationsPage = class ApplicationsPage extends AppPage {

    constructor(page) {
        super(page, 'admin/prihlasky');
        this.aplicationsLink = this.page.getByRole('link', {name: 'Přihlášky'});
        this.loadingIndicator = this.page.locator('#DataTables_Table_0_processing');
        this.applicationsTable = this.page.locator('.dataTable');
        this.applicationsTableRows = this.applicationsTable.locator('tbody').locator('tr');
        this.searchField = this.page.locator('input[type="search"]');
    }

    async goToApplicationsPage() {
        await this.aplicationsLink.click();
    }

    async waitForTableToLoad() {
        await this.page.waitForLoadState();
        await this.loadingIndicator.waitFor({state: 'hidden'});
    }

    async getApplicationsTableRows() {
        await this.waitForTableToLoad();
        const rows = await this.applicationsTableRows.all();
        return rows.map(async row => {
            return new TableRow(row);
        });
    }

    async searchInApplicationsTable(text) {
        await this.searchField.fill(text);
        await this.loadingIndicator.waitFor({state: 'visible'});
    }

}

class TableRow {

    constructor(rowElement) {
        this.rowElement = rowElement;
    }

    async getValues() {
        const cols = await this.rowElement.locator('td').all();
        return {
            name: await cols[0].textContent(),
            date: await cols[1].textContent(),
            paymentType: await cols[2].textContent(),
            toPay: await cols[3].textContent()
        }
    }

    async getInfo() {
        await this.rowElement.locator('[data-can="view"]').click();
        return new ApplicationInfoPage();
    }

}

class ApplicationInfoPage {

    get table() { return $('.table-twocols') }

    async getDetail() {
        return Promise.all(await (this.table.$$('tr')).map(async row => {
            return Promise.all(await (row.$$('td')).map(async col => {
                return await col.getText();
            }));
        }));
    }
}

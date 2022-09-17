
module.exports = class BasePage {
    async open (link) {
        return await browser.url(link)
    }
    async maximize () {
        return await browser.maximizeWindow()
    }
}

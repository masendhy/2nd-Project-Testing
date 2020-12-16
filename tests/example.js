const puppeteer = require('puppeteer');
const expect = require('chai').expect;

const config = require('../lib/config');

const utils = require('../lib/utils');

const {
    getCount
} = require('../lib/helpers');
const click = require('../lib/helpers').click
const typeText = require('../lib/helpers').typeText
const loadUrl = require('../lib/helpers').loadUrl
const waitForText = require('../lib/helpers').waitForText
const pressKey = require('../lib/helpers').pressKey
const shouldExist = require('../lib/helpers').shouldExist
const shouldNotExist = require('../lib/helpers').shouldNotExist

const generateID = require('../lib/utils').generateID
const generateEmail = require('../lib/utils').generateEmail
const generateNumbers = require('../lib/utils').generateNumbers


describe('My first puppeteer test', () => {
    let browser
    let page

    before(async () => {
        browser = await puppeteer.launch({
            headless: config.isHeadless,
            slowMo: config.slowMo,
            devtools: config.isDevtools,
            timeout: config.launchTimeout,
        })
        page = await browser.newPage();
        await page.setDefaultTimeout(config.waitingTimeout)
        await page.setViewport({
            width: config.viewportWidth,
            height: config.viewportHeight
        })
    })
    after(async () => {
        await browser.close()
    })

    describe('Login Test', () => {
        it('should navigate to homepage', async () => {
            await loadUrl(page, config.baseUrl)
            await shouldExist(page, '#online_banking_features')
        })

        it('should click on signin button', async () => {
            await click(page, '#signin_button')
            await shouldExist(page, '#login_form')
        })

        it('should type login form', async () => {
            await typeText(page, utils.generateID(), '#user_login')
            await typeText(page, utils.generateNumbers(), '#user_password')
            await click(page, '.btn-primary')
        })

        it('should get error alert', async () => {
            await waitForText(page, 'body', 'Login and/or password are wrong.')
            await shouldExist(page, '#login_form')
        })
    })

    describe('Search Test', () => {
        it('should navigate to homepage', async () => {
            await loadUrl(page, config.baseUrl)
            await shouldExist(page, '#online_banking_features')
        })

        it('sholud submit search phrase', async () => {
            await typeText(page, 'hello world', '#searchTerm')
            await pressKey(page, 'Enter')
        })

        it('should display search results', async () => {
            await waitForText(page, 'h2', 'Search Results')
            await waitForText(page, 'body', 'No results were found for the query')
        })
    })

    describe('Navbar Links Test', () => {
        it('should navigate to homepage', async () => {
            await loadUrl(page, config.baseUrl)
            await shouldExist(page, '#online_banking_features')
        })

        it('should have correct number of links', async () => {
            // get count of links
            const numberOfLinks = await getCount(page, '#pages-nav >li')

            // assert the count
            expect(numberOfLinks).to.equal(3)
        })
    })

    describe('Feedback Test', () => {
        it('should navigate to homepage', async () => {
            await loadUrl(page, config.baseUrl)
            await shouldExist(page, '#online_banking_features')
        })

        it('should click on feedback link', async () => {
            await click(page, '#feedback')
            await shouldExist(page, 'form')
        })

        it('sholud entry feedback form', async () => {
            await typeText(page, 'Amel', '#name')
            await typeText(page, utils.generateEmail(), '#email')
            await typeText(page, 'My Subject', '#subject')
            await typeText(page, 'My comment', '#comment')
            await click(page, 'input[type="submit"]')
        })

        it('should display success message', async () => {
            await shouldExist(page, '#feedback-title')
            await waitForText(page, 'body', 'Thank you for your comments')
        })

    })

    describe('Forgotten Password', () => {
        it('should navigate to homepage', async () => {
            await loadUrl(page, config.baseUrl)
            await shouldExist(page, '#online_banking_features')
        })

        it('should load forgotten password form', async () => {
            await loadUrl(page, 'http://zero.webappsecurity.com/forgot-password.html')
            await waitForText(page, 'p', 'So you forgot your password? ')
        })

        it('should submit email', async () => {
            await typeText(page, utils.generateEmail(), '#user_email')
            await click(page, '.btn-primary')
        })

        it('should display success alert', async () => {
            await waitForText(page, 'body', 'Your password will be sent to the following email')
        })

    })


})
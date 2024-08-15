require('dotenv').config();
const { Telegraf, Markup } = require('telegraf'); // Added Markup for inline keyboards.
const puppeteer = require('puppeteer');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Welcome message with inline keyboard.
bot.start((ctx) => {
    ctx.reply(
        'Welcome to the IRH Bot! 😊\nHere are some quick actions you can perform:',
        Markup.inlineKeyboard([
            [Markup.button.callback('Show Total Debt', 'show_borc')],
            [Markup.button.callback('Take a Screenshot', 'take_screenshot')]
        ])
    );
});

// Handler for the inline keyboard buttons.
bot.action('show_borc', async (ctx) => {
    await ctx.answerCbQuery(); // Acknowledge the button press.
    ctx.reply('/borc'); // Simulate the command.
});

bot.action('take_screenshot', async (ctx) => {
    await ctx.answerCbQuery(); // Acknowledge the button press.
    ctx.reply('/ss'); // Simulate the command.
});

bot.command('info', (ctx) => {
    ctx.reply('Here are the available commands:\n\n/borc - Shows your total debt\n/ss - Takes a screenshot of the page\n/info - Displays the list of commands');
});

// /borc command implementation.
bot.command('borc', async (ctx) => {
    console.log(`User ${ctx.from.username} requested total debt.`); // Log user action.
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto('https://portal.irhliving.com/', { waitUntil: 'networkidle2' });
        await page.type('input[name="email"]', process.env.LOGIN_USERNAME);
        await page.type('input[name="password"]', process.env.LOGIN_PASSWORD);
        await page.click('button[type="submit"]');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        const selector = 'div.row.text-align-center.margin-0 label.color-red';
        await page.waitForSelector(selector, { timeout: 10000 });

        const balanceText = await page.$eval(selector, el => el.innerText);
        await browser.close();

        await ctx.reply(`Total Debt: ${balanceText}`);
    } catch (error) {
        console.error('An error occurred:', error);
        ctx.reply('An error occurred.');
    }
});

// /ss command implementation.
bot.command('ss', async (ctx) => {
    console.log(`User ${ctx.from.username} requested a screenshot.`); // Log user action.
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto('https://portal.irhliving.com/', { waitUntil: 'networkidle2' });
        await page.type('input[name="email"]', process.env.LOGIN_USERNAME);
        await page.type('input[name="password"]', process.env.LOGIN_PASSWORD);
        await page.click('button[type="submit"]');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });

        const screenshotPath = 'screenshot.png';
        await page.screenshot({ path: screenshotPath, fullPage: true });

        await browser.close();

        await ctx.replyWithPhoto({ source: screenshotPath });
    } catch (error) {
        console.error('An error occurred:', error);
        ctx.reply('An error occurred.');
    }
});

bot.launch();

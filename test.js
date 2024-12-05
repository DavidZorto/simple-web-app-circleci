/**
 * @jest-environment jsdom
 */

const { getByText, getByTestId } = require('@testing-library/dom');
const userEvent = require('@testing-library/user-event').default;

document.body.innerHTML = `
    <h1>Dynamic Text Generator</h1>
    <button id="generateTextButton">Click Me to Generate Text</button>
    <p id="textContainer"></p>
`;

const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

document.getElementById("generateTextButton").addEventListener("click", function() {
    const newMessage = makeid(30);  // Generates a 30-character random string
    document.getElementById("textContainer").textContent = newMessage;
});


test('Text container should start empty', () => {
    const textContainer = document.getElementById('textContainer');

    // The text container should be empty when the page is first loaded
    expect(textContainer.textContent).toBe('');
});


test('Displays text when button is clicked', async () => {
    const button = document.getElementById('generateTextButton');
    const textContainer = document.getElementById('textContainer');


    // Simulate button click using userEvent
    await userEvent.click(button);

    // Verify that text is updated in the textContainer and is not empty (using toBeTruthy)
    expect(textContainer.textContent).toBeTruthy();


});

test('Text output has a lenght of 30 ', async () => {
    const button = document.getElementById('generateTextButton');
    const textContainer = document.getElementById('textContainer');



    // Simulate button click using userEvent
    await userEvent.click(button);


    // Verify that text is updated in the textContainer
    expect(textContainer.textContent.length).toBe(30);
});

test('Generates a new text each time button is clicked', async () => {
    const button = document.getElementById('generateTextButton');
    const textContainer = document.getElementById('textContainer');

    // First click
    await userEvent.click(button);
    const firstText = textContainer.textContent;

    // Second click
    await userEvent.click(button);
    const secondText = textContainer.textContent;

    // Ensure the second generated text is different from the first
    expect(secondText).toBeTruthy();
    expect(secondText.length).toBe(30);
    expect(firstText).not.toBe(secondText);
});
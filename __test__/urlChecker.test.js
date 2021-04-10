import { checkForInput } from "../src/client/js/inputChecker";

describe("Check URL", () => {
    const demoURL = "http://www.wooden-joy.com"; 
    test("Valid URL", () => {
        expect(checkForInput(demoURL)).toBeTruthy();
    });
});
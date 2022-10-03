import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import RequestAPI from "../services/RequestAPI"

describe("Generic test", () => {
    beforeAll(() => {
        jest.spyOn(RequestAPI.prototype, 'makeRequest').mockImplementation(() => Promise.resolve({ data: undefined }));
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test('Loads with no errors', async () => {
        render(<App />);
    });
});

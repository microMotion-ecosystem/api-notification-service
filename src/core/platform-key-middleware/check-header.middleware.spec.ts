import {CheckHeaderMiddleware} from './check-header.middleware';

describe('CheckHeaderMiddleware', () => {
    it('should be defined', () => {
        expect(new CheckHeaderMiddleware()).toBeDefined();
    });
});

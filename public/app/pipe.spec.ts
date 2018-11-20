import { LowerCasePipe } from '@angular/common';

describe('LowerCasePipe tests', () => {
    let pipe = new LowerCasePipe;

    it('should capitalize', () => {
        expect(pipe.transform('MEAN')).toEqual('mean');
    });
});
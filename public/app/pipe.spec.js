System.register(['@angular/common'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var common_1;
    return {
        setters:[
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            describe('LowerCasePipe tests', function () {
                var pipe = new common_1.LowerCasePipe;
                it('should capitalize', function () {
                    expect(pipe.transform('MEAN')).toEqual('mean');
                });
            });
        }
    }
});
//# sourceMappingURL=pipe.spec.js.map
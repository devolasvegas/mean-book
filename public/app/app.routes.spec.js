System.register(['@angular/core/testing', '@angular/router/testing', '@angular/common', './app.module', './app.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var testing_1, testing_2, common_1, app_module_1, app_component_1;
    var router, location;
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (testing_2_1) {
                testing_2 = testing_2_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (app_module_1_1) {
                app_module_1 = app_module_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
            describe('AppComponent Routing', function () {
                beforeEach(testing_1.async(function () {
                    testing_1.TestBed.configureTestingModule({
                        imports: [app_module_1.AppModule, testing_2.RouterTestingModule]
                    }).compileComponents();
                }));
                beforeEach(testing_1.fakeAsync(function () {
                    var injector = testing_1.TestBed.createComponent(app_component_1.AppComponent).debugElement.injector;
                    location = injector.get(common_1.Location);
                }));
                it('Should navigate to home', testing_1.fakeAsync(function () {
                    location.go('/');
                    expect(location.path()).toEqual('/');
                }));
                it('Should navigate to signin', testing_1.fakeAsync(function () {
                    location.go('/authentication/signin');
                    expect(location.path()).toEqual('/authentication/signin');
                }));
                it('Should navigate to signup', testing_1.fakeAsync(function () {
                    location.go('/authentication/signup');
                    expect(location.path()).toEqual('/authentication/signup');
                }));
            });
        }
    }
});
//# sourceMappingURL=app.routes.spec.js.map
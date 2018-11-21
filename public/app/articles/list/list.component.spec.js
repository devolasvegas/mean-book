System.register(['rxjs/Rx', '@angular/core', '@angular/core/testing', '../articles.service', './list.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var Rx_1, core_1, testing_1, articles_service_1, list_component_1;
    var MockArticlesService, RouterLinkStubDirective;
    return {
        setters:[
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (articles_service_1_1) {
                articles_service_1 = articles_service_1_1;
            },
            function (list_component_1_1) {
                list_component_1 = list_component_1_1;
            }],
        execute: function() {
            MockArticlesService = (function () {
                function MockArticlesService() {
                    this.articles = [{
                            _id: '12345678',
                            title: 'An Article about MEAN',
                            content: 'MEAN rocks!',
                            created: new Date(),
                            creator: {
                                fullName: 'John Doe'
                            }
                        }];
                }
                MockArticlesService.prototype.list = function () {
                    return Rx_1.Observable.of(this.articles);
                };
                return MockArticlesService;
            }());
            ;
            RouterLinkStubDirective = (function () {
                function RouterLinkStubDirective() {
                    this.navigatedTo = null;
                }
                RouterLinkStubDirective.prototype.onClick = function () {
                    this.navigatedTo = this.linkParams;
                };
                __decorate([
                    core_1.Input('routerLink'), 
                    __metadata('design:type', Object)
                ], RouterLinkStubDirective.prototype, "linkParams", void 0);
                RouterLinkStubDirective = __decorate([
                    core_1.Directive({
                        selector: '[routerLink]',
                        host: {
                            '(click)': 'onClick()'
                        }
                    }), 
                    __metadata('design:paramtypes', [])
                ], RouterLinkStubDirective);
                return RouterLinkStubDirective;
            }());
            exports_1("RouterLinkStubDirective", RouterLinkStubDirective);
            describe('List component tests', function () {
                var componentFixture;
                beforeEach(testing_1.async(function () {
                    testing_1.TestBed.configureTestingModule({
                        declarations: [list_component_1.ListComponent, RouterLinkStubDirective],
                        providers: [{
                                provide: articles_service_1.ArticlesService,
                                useClass: MockArticlesService
                            }]
                    }).compileComponents;
                }));
                beforeEach(testing_1.fakeAsync(function () {
                    componentFixture = testing_1.TestBed.createComponent(list_component_1.ListComponent);
                }));
                it('Should render list', function () {
                    componentFixture.detectChanges();
                    var mockArticleService = new MockArticlesService();
                    var listComponentElement = componentFixture.nativeElement;
                    var articleElements = listComponentElement.querySelectorAll('li');
                    var articleElement = articleElements[0];
                    var articleTitleElement = articleElement.querySelector('a');
                    var articleContentElement = articleElement.querySelector('p');
                    var mockArticleList = mockArticleService.articles;
                    var mockArticle = mockArticleList[0];
                    var mockArticleTitle = mockArticle.title;
                    var mockArticleContent = mockArticle.content;
                    expect(articleElements.length).toBe(mockArticleList.length);
                    expect(articleTitleElement.innerHTML).toBe(mockArticleTitle);
                    expect(articleContentElement.innerHTML).toBe(mockArticleContent);
                });
            });
        }
    }
});
//# sourceMappingURL=list.component.spec.js.map
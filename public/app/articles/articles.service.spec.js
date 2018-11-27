System.register(['@angular/core/testing', '@angular/http/testing', '@angular/http', './articles.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var testing_1, testing_2, http_1, articles_service_1;
    var backend, service, mockArticle;
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (testing_2_1) {
                testing_2 = testing_2_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (articles_service_1_1) {
                articles_service_1 = articles_service_1_1;
            }],
        execute: function() {
            mockArticle = {
                title: 'An Article about MEAN',
                content: 'MEAN Rocks!',
                creator: {
                    fullName: 'John Doe'
                }
            };
            describe('Articles service tests', function () {
                beforeEach(testing_1.async(function () {
                    testing_1.TestBed.configureTestingModule({
                        imports: [http_1.HttpModule],
                        providers: [
                            articles_service_1.ArticlesService,
                            {
                                provide: http_1.XHRBackend,
                                useClass: testing_2.MockBackend
                            }
                        ]
                    })
                        .compileComponents();
                }));
                beforeEach(testing_1.inject([http_1.Http, http_1.XHRBackend], function (_http, _mockBackend) {
                    backend = _mockBackend;
                    service = new articles_service_1.ArticlesService(_http);
                }));
                it('Should create a single article', function (done) {
                    var options = new http_1.ResponseOptions({
                        status: 200,
                        body: mockArticle
                    });
                    var response = new http_1.Response(options);
                    backend.connections.subscribe(function (connection) { return connection.mockRespond(response); });
                    service.create(mockArticle).do(function (article) {
                        expect(article).toBeDefined();
                        expect(article.title).toEqual(mockArticle.title);
                        expect(article.content).toEqual(mockArticle.content);
                        done();
                    }).toPromise();
                });
            });
        }
    }
});
//# sourceMappingURL=articles.service.spec.js.map
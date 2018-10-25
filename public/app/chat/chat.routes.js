System.register(["./chat.component"], function (exports_1, context_1) {
    "use strict";
    var chat_component_1, ChatRoutes;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (chat_component_1_1) {
                chat_component_1 = chat_component_1_1;
            }
        ],
        execute: function () {
            exports_1("ChatRoutes", ChatRoutes = [{
                    path: 'chat',
                    component: chat_component_1.ChatComponent
                }]);
        }
    };
});
//# sourceMappingURL=chat.routes.js.map
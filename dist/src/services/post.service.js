"use strict";
(function () {
    'use strict';
    angular
        .module('itApprovalApp')
        .service('PostService', PostService);
    PostService.$inject = ['$http', '$q', '$timeout', 'APP_CONFIG'];
    function PostService($http, $q, $timeout, APP_CONFIG) {
        var post = {
            id: 1,
            username: 'Change can',
            postDate: new Date(2021, 9, 16, 16, 0, 0),
            imageUrl: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20960%20540%22%3E%3Crect%20width%3D%22960%22%20height%3D%22540%22%20fill%3D%22%23dfeadf%22%2F%3E%3Cpath%20d%3D%22M0%20412%20L250%20248%20L420%20358%20L620%20182%20L960%20440%20L960%20540%20L0%20540Z%22%20fill%3D%22%2374a678%22%2F%3E%3Ccircle%20cx%3D%22742%22%20cy%3D%22122%22%20r%3D%2264%22%20fill%3D%22%23f6c667%22%2F%3E%3Crect%20x%3D%2270%22%20y%3D%2268%22%20width%3D%22334%22%20height%3D%22104%22%20rx%3D%2212%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.72%22%2F%3E%3Ctext%20x%3D%22104%22%20y%3D%22134%22%20font-family%3D%22Arial%2C%20Tahoma%2C%20sans-serif%22%20font-size%3D%2252%22%20font-weight%3D%22700%22%20fill%3D%22%23305235%22%3EIT%2008-1%3C%2Ftext%3E%3C%2Fsvg%3E',
            comments: [
                {
                    id: 1,
                    username: 'Blend 285',
                    commentText: 'have a good day',
                    createdDate: new Date(2021, 9, 16, 16, 15, 0)
                }
            ]
        };
        this.getPost = function () {
            if (!APP_CONFIG.useMockApi) {
                return $http
                    .get(APP_CONFIG.urlApi + '/api/Comment/GetFeedPost')
                    .catch(function () {
                    return mockResponse(angular.copy(post));
                });
            }
            return mockResponse(angular.copy(post));
        };
        this.addComment = function (payload) {
            if (!APP_CONFIG.useMockApi) {
                return $http
                    .post(APP_CONFIG.urlApi + '/api/Comment/AddComment', payload)
                    .catch(function () {
                    return saveMockComment(payload);
                });
            }
            return saveMockComment(payload);
        };
        function saveMockComment(payload) {
            var comment = {
                id: getNextCommentId(),
                username: payload.username,
                commentText: payload.commentText,
                createdDate: new Date()
            };
            post.comments.push(comment);
            return mockResponse(angular.copy(comment));
        }
        function getNextCommentId() {
            if (post.comments.length === 0) {
                return 1;
            }
            return Math.max.apply(null, post.comments.map(function (comment) {
                return comment.id;
            })) + 1;
        }
        function mockResponse(data) {
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve({
                    data: data
                });
            }, 250);
            return deferred.promise;
        }
    }
})();

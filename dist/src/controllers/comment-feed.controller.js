"use strict";
(function () {
    'use strict';
    angular
        .module('itApprovalApp')
        .controller('CommentFeedController', CommentFeedController);
    CommentFeedController.$inject = ['$scope', 'PostService'];
    function CommentFeedController($scope, PostService) {
        $scope.post = null;
        $scope.newCommentText = '';
        // $scope.comment.text = '';
        $scope.comment = { text: '' };
        $scope.commentError = null;
        $scope.isPostLoading = false;
        $scope.isCommentSaving = false;
        $scope.maxCommentLength = 250;
        $scope.loadPost = function () {
            $scope.isPostLoading = true;
            $scope.commentError = null;
            return PostService.getPost()
                .then(function (response) {
                $scope.post = response.data;
            })
                .catch(function () {
                $scope.commentError = 'Unable to load post. Please try again.';
            })
                .then(function () {
                $scope.isPostLoading = false;
            });
        };
        $scope.submitComment = function (event) {
            if (event) {
                event.preventDefault();
            }
            if (!$scope.post || $scope.isCommentSaving) {
                return;
            }
            // var trimmedText = $scope.newCommentText ? $scope.newCommentText.trim() : '';
            var trimmedText = $scope.comment.text ? $scope.comment.text.trim() : '';
            if (!trimmedText) {
                $scope.commentError = 'Please enter a comment.';
                return;
            }
            if (trimmedText.length > $scope.maxCommentLength) {
                $scope.commentError = 'Comment must be 250 characters or fewer.';
                return;
            }
            $scope.isCommentSaving = true;
            $scope.commentError = null;
            PostService.addComment({
                postId: $scope.post.id,
                username: 'Blend 285',
                commentText: trimmedText
            })
                .then(function (response) {
                if ($scope.post) {
                    $scope.post.comments.push(response.data);
                }
                $scope.newCommentText = '';
            })
                .catch(function () {
                $scope.commentError = 'Unable to save comment. Please try again.';
            })
                .then(function () {
                $scope.isCommentSaving = false;
            });
            $scope.loadPost();
        };
        $scope.getRemainingChars = function () {
            var currentLength = $scope.newCommentText ? $scope.newCommentText.length : 0;
            return $scope.maxCommentLength - currentLength;
        };
        $scope.loadPost();
    }
})();

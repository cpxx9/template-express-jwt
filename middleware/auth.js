const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');
const CustomNotFoundError = require('../errors/CustomNotFoundError');
const CustomForbiddenError = require('../errors/CustomForbiddenError');

const prisma = new PrismaClient();

const notFound = asyncHandler(async (req, res, next) => {
  throw new CustomNotFoundError('This api route does not exist');
});

const checkIfAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.admin) {
    next();
  } else {
    throw new CustomForbiddenError('Only admins can access this route');
  }
});

const checkIfUserMatch = asyncHandler(async (req, res, next) => {
  if (req.user.id === req.params.userId || req.user.admin) {
    next();
  } else {
    throw new CustomForbiddenError(
      'You must be logged in as this user to access this account'
    );
  }
});

const checkUserAuthorMatch = asyncHandler(async (req, res, next) => {
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: req.params.postId,
      },
    });
    if (!post) {
      throw new CustomNotFoundError(
        'This post ID does not reference a valid post'
      );
    }
    if (post.authorId === req.user.id) {
      next();
    } else {
      throw new CustomForbiddenError('You must be the author of this post');
    }
  } catch (err) {
    next(err);
  }
});

const checkUserCommentMatch = asyncHandler(async (req, res, next) => {
  try {
    const comment = await prisma.comment.findFirst({
      where: {
        id: req.params.commentId,
      },
    });
    if (!comment) {
      throw new CustomNotFoundError(
        'This post ID does not reference a valid post'
      );
    }
    if (comment.authorId === req.user.id) {
      next();
    } else {
      throw new CustomForbiddenError('You must be the author of this comment');
    }
  } catch (err) {
    next(err);
  }
});

module.exports = {
  // checkIfLoggedIn,
  notFound,
  checkIfAdmin,
  checkIfUserMatch,
  checkUserAuthorMatch,
  checkUserCommentMatch,
};

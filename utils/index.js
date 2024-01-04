const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt');
const createTokenUser = require('./createTokenUser');
const checkPermissions = require('./checkPermissions');
const sendVerificationEmail = require('./sendVerificationEmail'); 
const sendPasswordResetEmail = require('./sendPasswordResetEmail'); 
const createHash = require('./createHash'); 
module.exports = {
  createJWT,
  createHash,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
  sendVerificationEmail,
  sendPasswordResetEmail
};

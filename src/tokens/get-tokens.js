const _ = require('lodash');
const memoryCache = require('memory-cache');
const ms = require('ms');

const Token = require('../model/token');

const getTokens = async ({ ttl = ms('1 minute') } = {}) => {
  const cached = memoryCache.get('tokens');

  if (cached !== null) {
    return cached;
  }

  const tokens = await Token.find({}).lean();
  const keyedTokens = _.keyBy(tokens, 'address');

  memoryCache.put('tokens', keyedTokens, ttl);

  return keyedTokens;
};

module.exports = getTokens;
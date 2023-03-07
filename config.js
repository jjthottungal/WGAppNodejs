// config.js

const S_KEY = 'MySecretKeyForEncryptionAndDecry';
const S_IV = 'helloworldhellow';
const ECNRYPTION_METHOD = 'aes-256-cbc';

module.exports = {
  secret_key: S_KEY,
  secret_iv: S_IV,
  ecnryption_method: ECNRYPTION_METHOD,
}
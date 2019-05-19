const fs = require('fs');

const answers = JSON.parse(fs.readFileSync('./src/data/answers.json', 'utf8'));

module.exports = answers;

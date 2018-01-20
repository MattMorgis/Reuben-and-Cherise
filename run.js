const {lamda} = require('./src/main');

lamda(null, null, (error, caption) => {
  if (error) console.log(error);
  if (caption) console.log(caption);
});

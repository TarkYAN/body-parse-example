// Note this object is purely in memory
// When node shuts down this will be cleared.
// Same when your heroku app shuts down from inactivity
// We will be working with databases in the next few weeks.
const users = {
  'Austin': {
    name: 'Austin',
    age: 2
  }
};

const respondJSON = (request, response, status, object) => {
  const content = JSON.stringify(object);

  response.writeHead(status, { 
    'Content-Type': 'application/json', 
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });

  if(request.method !== 'HEAD' || status !== 204) {
    response.write(JSON.stringify(object));
  }

  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  respondJSON(request, response, 200, responseJSON);
};


// request.body = {
//   name: 'Austin',
//   age: 2
// };

const addUser = (request, response) => {
  const responseJSON = {
    message: 'Name and age are both required',
  }
  
  const {name, age} = request.body;

  //same as one line above
  //const name = request.body.name;
  //const age = request.body.age;

  if(!name || !age){
    responseJSON.id = 'addUserMissingParams';
    return responseJSON(request, respnse, 400, responseJSON);
  }

  let responseCode = 204;

  if(!users[name]){
    responseCode = 201;
    users[name] = {name};

  }

  users[name].age = age;

  if(responseCode === 201){
    return respondJSON(request, response, responseCode, users[name]);
  }

  return respondJSON(request, response, responseCode, {});
};

module.exports = {
  getUsers,
  addUser,
};

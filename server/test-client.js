var PROTO_PATH = __dirname + '/proto/todo.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');

var grpcUrl = '172.19.0.3:50051'; // docker inspect server -> "IPAddress": "x.x.x.x"

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var todo = protoDescriptor.todo;

var client = new todo.TodoService(grpcUrl, grpc.credentials.createInsecure());

function printResponse(error, response) {
    if (error)
        console.log('Error: ', error);
    else
        console.log('Response: ', response);
}

// #region request functions

function runGetTodo(id) {
    client.getTodo({ id: parseInt(id) }, (error, todo) => {
        printResponse(error, todo);
    });
}

function runListTodos() {
    client.listTodos({}, (error, todos) => {
        printResponse(error, todos);
    });
}

function runInsertTodo(id, title, body) {
    const todo = { id: parseInt(id), title: title, body: body };
    client.insertTodo(todo, (error, {}) => {
        printResponse(error, {});
    });
}

function runDeleteTodo(id) {
    client.deleteTodo({ id: parseInt(id) }, (error, todo) => {
        printResponse(error, todo);
    });
}

function runWatchTodos() {
    var call = client.watchTodos({});
    call.on('data', (todo) => {
        console.log('On data: ', todo);
    });
}
// #endregion

function main() {
    // runWatchTodos();
    // runInsertTodo(6, 'New Task', 'much wow');
    runListTodos();
    // runDeleteTodo(1);
}

if (require.main === module) {
    main();
}

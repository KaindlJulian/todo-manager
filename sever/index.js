var PROTO_PATH = __dirname + '/proto/todo.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var events = require('events');
var MongoClient = require('mongodb').MongoClient

var grpcUrl = require(`${__dirname}/config/grpc.json`).url;
var mongoUrl = "mongodb://localhost:27017/todoDB";

var collection;

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
var todoStream = new events.EventEmitter();

class Todo {
    constructor(id, title, body) {
        this.id = id;
        this.title = title;
        this.body = body;
    }
}

var todoList = [];

// #region handler functions
function getTodo(call, callback) {
    const id = call.request.id;
    if (id < todoList.length) {
        callback(null, todoList.filter(todo => {return todo.id === id})[0]);
    } else {
        callback(new Error('Invalid requested'));
    }
}

function insertTodo(call, callback) {
    const todo = call.request;
    if (todo) {
        todoList.push(todo);
        todoStream.emit('new_todo', todo);
        console.log('New todo: ', todo);
    } else {
        callback(new Error('Invalid requested'));
    }
    callback(null, {});
}

function listTodos(call, callback) {
    callback(null, { todos: todoList });
}

function deleteTodo(call, callback) {
    const id = call.request.id;
    if(id < todoList.length) {
        var deleted = todoList.splice(id - 1, 1);
        console.log('Deleted todo: ', deleted);
    } else {
        callback(new Error('Invalid requested'));
    }
    callback(null, {});
}

function watchTodos(stream) {
    todoStream.on('new_todo', (todo) => {
        console.log('emit', todo);
        stream.write(todo);
    });
}
// #endregion

function getServer() {
    MongoClient.connect(mongoUrl, (err, client) => {
        if (err) { 
            console.log(err);
        } else {
            console.log(`\n connected to ${mongoUrl}\n`);
        }
        collection = client.db('todo').collection('todos');
    });

    var server = new grpc.Server();
    server.addService(todo.TodoService.service, {
        getTodo: getTodo,
        listTodos: listTodos,
        insertTodo, insertTodo,
        deleteTodo, deleteTodo,
        watchTodos, watchTodos
    });
    return server;
}

function initList() {
    todoList.push(
        new Todo(1,'Task A', 'this is important'),
        new Todo(2, 'Task B'),
        new Todo(4, 'Task D', 'this is very important'),
        new Todo(3, 'Task C'),
        new Todo(5, 'Task E', 'this is not important'),
    )
}

if (require.main === module) {
    initList()
    var todoServer = getServer();
    todoServer.bind(grpcUrl, grpc.ServerCredentials.createInsecure());
    todoServer.start();
    console.log(`listening on ${grpcUrl}`);
}

exports.getServer = getServer;

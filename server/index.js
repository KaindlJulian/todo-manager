var PROTO_PATH = __dirname + '/proto/todo.proto';
var grpcConfig = require('./config/grpc.js');
var mongoConfig = require('./config/mongo.js');

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var events = require('events');
var MongoClient = require('mongodb').MongoClient

var collection

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

/**
 *Todo class used in this application containing id, tite and
 *optionally a body
 *
 * @class Todo
 */
class Todo {
    constructor(id, title, body) {
        this.id = id;
        this.title = title;
        this.body = body;
    }
}

// #region handler functions
/**
 *Handles the `GetTodo` grpc method. 
 *
 * @param {*} call containing the received `TodoIdRequest` grpc message
 * @param {*} callback the sent `Todo` or error message
 */
async function getTodo(call, callback) {
    const todo = await collection.findOne({id: call.request.id}, {'_id': 0});
    if (todo) {
        callback(null, todo);
    } else {
        callback(new Error('Invalid requested'));
    }
}

/**
 *Handles the `InsertTodo` grpc method
 *
 * @param {*} call containing the received `Todo` grpc message
 * @param {*} callback empty or error message
 */
function insertTodo(call, callback) {
    const todo = call.request;
    if (todo) {
        collection.insertOne(todo);
        todoStream.emit('new_todo', todo);
        console.log('New todo: ', todo);
    } else {
        callback(new Error('Invalid requested'));
    }
    callback(null, {});
}

/**
 *Handles the `ListTodos` grpc method
 *
 * @param {*} call empty
 * @param {*} callback the sent `TodoList` grpc message
 */
async function listTodos(call, callback) {
    const allTodos = await collection.find({}, {'_id': 0}).toArray();
    callback(null, { todos: allTodos });
}

/**
 *Handles the `DeleteTodo` grpc method
 *
 * @param {*} call containing the received `Todo` grpc message
 * @param {*} callback empty
 */
async function deleteTodo(call, callback) {
    collection.deleteMany({id: call.request.id}, err => {
        if (err) { console.log(err) }
    });
    callback(null, {});
}

/**
 *Stream to subscribe on via the `StreamTodos` grpc method
 *
 * @param {*} stream containing new todos
 */
function watchTodos(stream) {
    todoStream.on('new_todo', (todo) => {
        console.log('emit', todo);
        stream.write(todo);
    });
}
// #endregion

/**
 *
 *
 * @returns
 */
function getServer() {
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

function initDb() {
    testList = [
        new Todo(1, 'Task A', 'this is important'),
        new Todo(2, 'Task B'),
        new Todo(4, 'Task D', 'this is very important'),
        new Todo(3, 'Task C'),
        new Todo(5, 'Task E', 'this is not important'),
    ]
    collection.insertMany(testList);
}

if (require.main === module) {
    MongoClient.connect(mongoConfig.url, mongoConfig.options, (err, client) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`connected to ${mongoConfig.url}`);

            collection = client.db('todo').collection('todos');
            const todoServer = getServer();

            if (todoServer) {
                todoServer.bind(grpcConfig.url, grpc.ServerCredentials.createInsecure());
                todoServer.start();
                console.log(`listening on ${grpcConfig.url}`);
            } else {
                console.log(`invalid server: ${todoServer}`);
            }
        }
    });
}

exports.getServer = getServer;

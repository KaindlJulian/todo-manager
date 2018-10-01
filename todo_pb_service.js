// package: todo
// file: todo.proto

var todo_pb = require("./todo_pb");
var grpc = require("grpc-web-client").grpc;

var TodoService = (function () {
  function TodoService() {}
  TodoService.serviceName = "todo.TodoService";
  return TodoService;
}());

TodoService.GetTodo = {
  methodName: "GetTodo",
  service: TodoService,
  requestStream: false,
  responseStream: false,
  requestType: todo_pb.TodoIdRequest,
  responseType: todo_pb.Todo
};

TodoService.ListTodos = {
  methodName: "ListTodos",
  service: TodoService,
  requestStream: false,
  responseStream: false,
  requestType: todo_pb.Empty,
  responseType: todo_pb.TodoList
};

TodoService.InsertTodo = {
  methodName: "InsertTodo",
  service: TodoService,
  requestStream: false,
  responseStream: false,
  requestType: todo_pb.Todo,
  responseType: todo_pb.Empty
};

TodoService.DeleteTodo = {
  methodName: "DeleteTodo",
  service: TodoService,
  requestStream: false,
  responseStream: false,
  requestType: todo_pb.TodoIdRequest,
  responseType: todo_pb.Empty
};

exports.TodoService = TodoService;

function TodoServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

TodoServiceClient.prototype.getTodo = function getTodo(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(TodoService.GetTodo, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

TodoServiceClient.prototype.listTodos = function listTodos(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(TodoService.ListTodos, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

TodoServiceClient.prototype.insertTodo = function insertTodo(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(TodoService.InsertTodo, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

TodoServiceClient.prototype.deleteTodo = function deleteTodo(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  grpc.unary(TodoService.DeleteTodo, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          callback(Object.assign(new Error(response.statusMessage), { code: response.status, metadata: response.trailers }), null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
};

exports.TodoServiceClient = TodoServiceClient;


/* eslint-disable */
/**
 * @fileoverview gRPC-Web generated client stub for todo
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.todo = require('./todo_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.todo.TodoServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.todo.TodoServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.todo.TodoServiceClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.todo.TodoServiceClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.todo.TodoIdRequest,
 *   !proto.todo.Todo>}
 */
const methodInfo_GetTodo = new grpc.web.AbstractClientBase.MethodInfo(
  proto.todo.Todo,
  /** @param {!proto.todo.TodoIdRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.todo.Todo.deserializeBinary
);


/**
 * @param {!proto.todo.TodoIdRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.todo.Todo)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.todo.Todo>|undefined}
 *     The XHR Node Readable Stream
 */
proto.todo.TodoServiceClient.prototype.getTodo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/todo.TodoService/GetTodo',
      request,
      metadata,
      methodInfo_GetTodo,
      callback);
};


/**
 * @param {!proto.todo.TodoIdRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.todo.Todo>}
 *     The XHR Node Readable Stream
 */
proto.todo.TodoServicePromiseClient.prototype.getTodo =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.getTodo(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.todo.Empty,
 *   !proto.todo.TodoList>}
 */
const methodInfo_ListTodos = new grpc.web.AbstractClientBase.MethodInfo(
  proto.todo.TodoList,
  /** @param {!proto.todo.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.todo.TodoList.deserializeBinary
);


/**
 * @param {!proto.todo.Empty} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.todo.TodoList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.todo.TodoList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.todo.TodoServiceClient.prototype.listTodos =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/todo.TodoService/ListTodos',
      request,
      metadata,
      methodInfo_ListTodos,
      callback);
};


/**
 * @param {!proto.todo.Empty} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.todo.TodoList>}
 *     The XHR Node Readable Stream
 */
proto.todo.TodoServicePromiseClient.prototype.listTodos =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.listTodos(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.todo.Todo,
 *   !proto.todo.Empty>}
 */
const methodInfo_InsertTodo = new grpc.web.AbstractClientBase.MethodInfo(
  proto.todo.Empty,
  /** @param {!proto.todo.Todo} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.todo.Empty.deserializeBinary
);


/**
 * @param {!proto.todo.Todo} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.todo.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.todo.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.todo.TodoServiceClient.prototype.insertTodo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/todo.TodoService/InsertTodo',
      request,
      metadata,
      methodInfo_InsertTodo,
      callback);
};


/**
 * @param {!proto.todo.Todo} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.todo.Empty>}
 *     The XHR Node Readable Stream
 */
proto.todo.TodoServicePromiseClient.prototype.insertTodo =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.insertTodo(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.todo.TodoIdRequest,
 *   !proto.todo.Empty>}
 */
const methodInfo_DeleteTodo = new grpc.web.AbstractClientBase.MethodInfo(
  proto.todo.Empty,
  /** @param {!proto.todo.TodoIdRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.todo.Empty.deserializeBinary
);


/**
 * @param {!proto.todo.TodoIdRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.todo.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.todo.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.todo.TodoServiceClient.prototype.deleteTodo =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/todo.TodoService/DeleteTodo',
      request,
      metadata,
      methodInfo_DeleteTodo,
      callback);
};


/**
 * @param {!proto.todo.TodoIdRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.todo.Empty>}
 *     The XHR Node Readable Stream
 */
proto.todo.TodoServicePromiseClient.prototype.deleteTodo =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.deleteTodo(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.todo.Empty,
 *   !proto.todo.Todo>}
 */
const methodInfo_WatchTodos = new grpc.web.AbstractClientBase.MethodInfo(
  proto.todo.Todo,
  /** @param {!proto.todo.Empty} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.todo.Todo.deserializeBinary
);


/**
 * @param {!proto.todo.Empty} request The request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.todo.Todo>}
 *     The XHR Node Readable Stream
 */
proto.todo.TodoServiceClient.prototype.watchTodos =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/todo.TodoService/WatchTodos',
      request,
      metadata,
      methodInfo_WatchTodos);
};


module.exports = proto.todo;


// package: todo
// file: todo.proto

import * as todo_pb from "./todo_pb";
import {grpc} from "grpc-web-client";

type TodoServiceGetTodo = {
  readonly methodName: string;
  readonly service: typeof TodoService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof todo_pb.TodoIdRequest;
  readonly responseType: typeof todo_pb.Todo;
};

type TodoServiceListTodos = {
  readonly methodName: string;
  readonly service: typeof TodoService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof todo_pb.Empty;
  readonly responseType: typeof todo_pb.TodoList;
};

type TodoServiceInsertTodo = {
  readonly methodName: string;
  readonly service: typeof TodoService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof todo_pb.Todo;
  readonly responseType: typeof todo_pb.Empty;
};

type TodoServiceDeleteTodo = {
  readonly methodName: string;
  readonly service: typeof TodoService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof todo_pb.TodoIdRequest;
  readonly responseType: typeof todo_pb.Empty;
};

export class TodoService {
  static readonly serviceName: string;
  static readonly GetTodo: TodoServiceGetTodo;
  static readonly ListTodos: TodoServiceListTodos;
  static readonly InsertTodo: TodoServiceInsertTodo;
  static readonly DeleteTodo: TodoServiceDeleteTodo;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }
export type ServiceClientOptions = { transport: grpc.TransportConstructor; debug?: boolean }

interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: () => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}

export class TodoServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: ServiceClientOptions);
  getTodo(
    requestMessage: todo_pb.TodoIdRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: todo_pb.Todo|null) => void
  ): void;
  getTodo(
    requestMessage: todo_pb.TodoIdRequest,
    callback: (error: ServiceError, responseMessage: todo_pb.Todo|null) => void
  ): void;
  listTodos(
    requestMessage: todo_pb.Empty,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: todo_pb.TodoList|null) => void
  ): void;
  listTodos(
    requestMessage: todo_pb.Empty,
    callback: (error: ServiceError, responseMessage: todo_pb.TodoList|null) => void
  ): void;
  insertTodo(
    requestMessage: todo_pb.Todo,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: todo_pb.Empty|null) => void
  ): void;
  insertTodo(
    requestMessage: todo_pb.Todo,
    callback: (error: ServiceError, responseMessage: todo_pb.Empty|null) => void
  ): void;
  deleteTodo(
    requestMessage: todo_pb.TodoIdRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError, responseMessage: todo_pb.Empty|null) => void
  ): void;
  deleteTodo(
    requestMessage: todo_pb.TodoIdRequest,
    callback: (error: ServiceError, responseMessage: todo_pb.Empty|null) => void
  ): void;
}


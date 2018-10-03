// package: todo
// file: todo.proto

import * as jspb from "google-protobuf";

export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class Todo extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getTitle(): string;
  setTitle(value: string): void;

  getBody(): string;
  setBody(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Todo.AsObject;
  static toObject(includeInstance: boolean, msg: Todo): Todo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Todo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Todo;
  static deserializeBinaryFromReader(message: Todo, reader: jspb.BinaryReader): Todo;
}

export namespace Todo {
  export type AsObject = {
    id: number,
    title: string,
    body: string,
  }
}

export class TodoIdRequest extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TodoIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TodoIdRequest): TodoIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TodoIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TodoIdRequest;
  static deserializeBinaryFromReader(message: TodoIdRequest, reader: jspb.BinaryReader): TodoIdRequest;
}

export namespace TodoIdRequest {
  export type AsObject = {
    id: number,
  }
}

export class TodoList extends jspb.Message {
  clearTodosList(): void;
  getTodosList(): Array<Todo>;
  setTodosList(value: Array<Todo>): void;
  addTodos(value?: Todo, index?: number): Todo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TodoList.AsObject;
  static toObject(includeInstance: boolean, msg: TodoList): TodoList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TodoList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TodoList;
  static deserializeBinaryFromReader(message: TodoList, reader: jspb.BinaryReader): TodoList;
}

export namespace TodoList {
  export type AsObject = {
    todosList: Array<Todo.AsObject>,
  }
}


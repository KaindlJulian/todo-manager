import { grpc } from 'grpc-web-client';
import { Empty, TodoIdRequest, Todo } from '../proto-stubs/todo_pb.js';
import { TodoService } from '../proto-stubs/todo_pb_service.js';

const url = 'http://172.20.0.4:9211';

export default class GrpcClient {

    /**
     * - Request message
     * message TodoIdRequest {
     *     int32 id = 1;
     * }
     * 
     * - Response message
     * message Todo {
     *     int32 id = 1; 
     *     string title = 2;
     *     string body = 3;
     * }
     * 
     * - Service method
     * rpc GetTodo (TodoIdRequest) returns (Todo)  {}
     * 
     * @param {number} id
     */
    getTodo(id) {
        const todoIdRequest = new TodoIdRequest();
        todoIdRequest.setId(id);
        return new Promise(
            (resolve, reject) => {
                grpc.unary(TodoService.GetTodo, {
                    request: todoIdRequest,
                    host: url,
                    onEnd: (res) => {
                        if (res.status === grpc.Code.OK && res.message) {
                            console.log('getTodo', res.message.toObject());
                            resolve(res.message.toObject());
                        } else {
                            reject(new Error(`Error in response: ${res}`));
                        }
                    }
                });
            }
        )
    }

    /**
     * - Request message
     * message Empty {}
     * 
     * - Response message
     * message TodoList {
     *     repeated Todo todos = 1;
     * }
     * 
     * - Service method
     * rpc ListTodos (Empty) returns (TodoList) {}
     */
    listTodos() {
        const empty = new Empty();
        return new Promise(
            (resolve, reject) => {
                grpc.unary(TodoService.ListTodos, {
                    request: empty,
                    host: url,
                    onEnd: (res) => {
                        if (res.status === grpc.Code.OK && res.message) {
                            console.log('listTodos', res.message.toObject());
                            resolve(res.message.toObject());
                        } else {
                            reject(new Error(`Error in response: ${res}`));
                        }
                    }
                });
            }
        );
    } 

    /**
     * - Request message
     * message TodoIdRequest {
     *     int32 id = 1;
     * }
     * 
     * - Response message
     * message Empty {}
     * 
     * - Service method
     * rpc DeleteTodo (TodoIdRequest) returns (Empty) {}
     * @param {number} id 
     */
    deleteTodo(id) {
        const deleteTodoRequest = new TodoIdRequest();
        deleteTodoRequest.setId(id);

        return new Promise(
            (resolve, reject) => {
                grpc.unary(TodoService.DeleteTodo, {
                    request: deleteTodoRequest,
                    host: url,
                    onEnd: (res) => {
                        if (res.status === grpc.Code.OK && res.message) {
                            console.log('deleteTodo', res.message.toObject());
                            resolve(res.message.toObject());
                        } else {
                            reject(new Error(`Error in response: ${res}`));
                        }
                    }
                });
            }
        )
    }

    /**
     * - Request message
     * message Todo {
     *     int32 id = 1; 
     *     string title = 2;
     *     string body = 3;
     * }
     * 
     * - Response message
     * message Empty {}
     * 
     * - Service method
     * rpc InsertTodo (Todo) returns (Empty) {}
     * 
     * @param {number} id 
     * @param {string} title 
     * @param {string} body 
     */
    insertTodo(id, title, body) {
        const insertTodoRequest = new Todo();
        insertTodoRequest.setId(id);
        insertTodoRequest.setTitle(title);
        insertTodoRequest.setBody(body);
        
        // .unary also fits the needs of a simple insert (we also only use the onEnd event here)
        // you only need this when you are streaming (server -> client, only this direction)
        // works like ws with .onMessage you listen to server emits with .onEnd is called when the server closes the connection
        const insertClient  = grpc.client(TodoService.InsertTodo, {
            host: url
        });

        return new Promise(
            (resolve, reject) => {
                insertClient.onEnd((code, message, trailers) => {
                    if (code === grpc.Code.OK && message) {
                        console.log('insertTodo', message);
                        resolve(message)
                    } else {
                        reject(new Error('insert failed'))
                    }
                });  
                insertClient.start();
                insertClient.send(insertTodoRequest);
            }
        );
    }
}

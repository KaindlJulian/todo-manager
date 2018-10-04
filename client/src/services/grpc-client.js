import { grpc } from 'grpc-web-client';
import { Empty } from '../proto-stubs/todo_pb.js';
import { TodoService } from '../proto-stubs/todo_pb_service.js';

const grpcUrl = '172.19.0.3:50051';
    
export default class GrpcClient {

    listTodos() {
        const empty = new Empty();
        grpc.unary(TodoService.ListTodos, {
            request: empty,
            host: grpcUrl,
            onEnd: (res) => {
                console.log(res);
            }
        })
    } 

    /*printResponse(error, response) {
        if (error)
            console.log('Error: ', error);
        else
            console.log('Response: ', response);
    }

    getTodo(id) {
        this.client.getTodo({ id: parseInt(id, 10) }, (error, todo) => {
            this.printResponse(error, todo);
            return todo;
        });
    }

    listTodos() {
        this.client.listTodos({}, (error, todos) => {
            this.printResponse(error, todos);
            return todos;
        });
    }

    insertTodo(id, title, body) {
        const todo = { id: parseInt(id, 10), title: title, body: body };
        this.client.insertTodo(todo, (error, msg) => {
            this.printResponse(error, msg);
        });
    }

    deleteTodo(id) {
        this.client.deleteTodo({ id: parseInt(id, 10) }, (error, todo) => {
            this.printResponse(error, todo);
            return todo;
        });
    }*/

    get instance(){
        return this.client
    }
}

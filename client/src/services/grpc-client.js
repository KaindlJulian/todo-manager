import TodoServiceClient from '../proto/todo_pb';

const grpcUrl = 'http://localhost:8080';

export default class GrpcClient {
    constructor() {
        this.client = new TodoServiceClient(grpcUrl);
    }

    printResponse(error, response) {
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
    }

    watchTodos() {
        var call = this.client.watchTodos({});
        call.on('data', (todo) => {
            console.log('On data: ', todo);
        });
    }

    get instance(){
        return this.client
    }
}

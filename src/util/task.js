
class Task {
    constructor() {
        Task.idx++
        this.id = Task.idx;
    }
    
}
Task.idx = 0;
export default Task;
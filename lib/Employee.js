class Employee {
    constructor(id, name, last_name, manager_id) {
        this.id = id;
        this.name = name;
        this.last_name = last_name;
        this.manager_id = manager_id;
    }
    getID() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getLastName() {
        return this.last_name;
    }
    getManagerId() {
        return this.manager_id;
    }

}
module.exports = Employee;
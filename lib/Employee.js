class Employee {
    constructor(name, last_name,role_id, manager_id) {
       
        this.name = name;
        this.last_name = last_name;
        this.role_id=role_id;
        this.manager_id = manager_id;
    }
  
    getName() {
        return this.name;
    }
    getLastName() {
        return this.last_name;
    }
    getRoled() {
        return this.role_id;
    }
    getManagerId() {
        return this.manager_id;
    }

}
module.exports = Employee;
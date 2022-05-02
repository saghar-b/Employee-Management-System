class Role{
    constructor(title, salary,depId) {
        this.depId = depId;
        this.title=title;
        this.salary=salary
    }
    getdepartmentId(){
        return this.depId
    }

    getTitle(){
        return this.title
    }

    getSalary(){
        return this.salary
    }
}
module.exports = Role;
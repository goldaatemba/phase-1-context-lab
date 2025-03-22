function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    let employee = {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
    console.log("Created Employee Record:", employee);
    return employee;
}

function createEmployeeRecords(employeeData) {
    let records = employeeData.map(createEmployeeRecord);
    console.log("Created Employee Records:", records);
    return records;
}

function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    let event = { type: "TimeIn", hour: parseInt(hour), date };
    employee.timeInEvents.push(event);
    console.log("Added TimeIn Event:", event);
    return employee;
}

function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    let event = { type: "TimeOut", hour: parseInt(hour), date };
    employee.timeOutEvents.push(event);
    console.log("Added TimeOut Event:", event);
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    let inEvent = employee.timeInEvents.find(e => e.date === date);
    let outEvent = employee.timeOutEvents.find(e => e.date === date);
    let hoursWorked = (outEvent.hour - inEvent.hour) / 100;
    console.log(`Hours worked on ${date}:`, hoursWorked);
    return hoursWorked;
}

function wagesEarnedOnDate(employee, date) {
    let wages = hoursWorkedOnDate(employee, date) * employee.payPerHour;
    console.log(`Wages earned on ${date}:`, wages);
    return wages;
}

function allWagesFor(employee) {
    let totalWages = employee.timeInEvents.reduce((total, event) => {
        return total + wagesEarnedOnDate(employee, event.date);
    }, 0);
    console.log("Total wages for employee:", totalWages);
    return totalWages;
}

function findEmployeeByFirstName(srcArray, firstName) {
    let employee = srcArray.find(emp => emp.firstName === firstName);
    console.log(`Found employee ${firstName}:`, employee);
    return employee;
}

function calculatePayroll(employeeRecords) {
    let payroll = employeeRecords.reduce((total, emp) => total + allWagesFor(emp), 0);
    console.log("Total payroll:", payroll);
    return payroll;
}

// Example usage
const employees = createEmployeeRecords([
    ["John", "Doe", "Developer", 50],
    ["Jane", "Smith", "Designer", 60]
]);

createTimeInEvent(employees[0], "2025-03-22 0800");
createTimeOutEvent(employees[0], "2025-03-22 1600");

createTimeInEvent(employees[1], "2025-03-22 0900");
createTimeOutEvent(employees[1], "2025-03-22 1700");

console.log("Payroll Calculation:", calculatePayroll(employees));

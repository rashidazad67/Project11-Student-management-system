import inquirer from "inquirer"; 
import choice from "inquirer/lib/objects/choice.js";
import Choice from "inquirer/lib/objects/choice.js";

// Define the student class
class Student{
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name:string){
        this.id=Student.counter++;
        this.name=name;
        this.courses=[];     // initialize an empty array
        this.balance=100;
    }

    // method to enroll a student in a course
    enroll_course(course:string){
        this.courses.push(course);
    }

    // method to view balance
    view_balance(){
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }

    // method to pay student fees
    pay_fees(amount:number){
        this.balance -= amount;
        console.log(`$${amount} Fees paid successfully for ${this.name}.`);
        console.log(`Remaining Balance: $${this.balance}`);
    }

    // method to display students status
    show_status(){
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: $${this.balance}`);
    }
}

// defining student_manager class to manage student
class Student_manager {
    students: Student[]
    constructor(){
        this.students = [];
    }

    // methode to add new students
    add_student(name:string){
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully. Student ID: ${student.id}`);
    }

    // methode to enroll a student in a course
    enroll_student(student_id: number, course:string){
        let student = this.find_student(student_id);
        if(student){
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} successfully.`);
        }
    }

    // method to view students balance
    view_student_balance(student_id:number){
        let student = this.find_student(student_id);
        if(student){
            student.view_balance();
        }
        else{
            console.log("Student not found, please enter correct student ID.")
        }
    }

    // method to pay student fees
    pay_student_fees(student_id: number, amount:number){
        let student = this.find_student(student_id);
        if(student){
            student.pay_fees(amount)
       
        }
        else{
            console.log("Student not found, please enter correct student ID.")
        }
    }
    // method to display student status
    show_student_status(student_id:number){
        let student = this.find_student(student_id);
        if(student){
         student.show_status();   

        }
    }

// method to find student through student id
find_student(student_id: number){
    return this.students.find(std => std.id === student_id);
}
}

// Main funtion to run the program
async function main(){
    console.log("Welcome to Student Management System.");
    console.log("-".repeat(50));
    let student_manager = new Student_manager()

    // while loop to keep program running
    while(true){
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option.",
                choices: [
                    "Add Student", 
                    "Enroll Student",
                    "Fees Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit",
                ]
            }
        ]);
       
        // using switch case to handle user choice.
        switch(choice.choice){
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name:",
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Student ID.",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter Course Name."
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "Fees Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "input",
                        message: "Enter Student ID.",
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter Student ID.",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay.",
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Stident ID.",
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting.");
                process.exit();
        }
        }
    }

    // calling a main function

    main();

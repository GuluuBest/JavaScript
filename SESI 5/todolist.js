import { Task, DEFAULT_PRIORITY } from "./task.js";

const task1 = new Task("Belajar Javascript");
const task2 = new Task("Membayar Tagihan", "high");

console.log(`Prioritas Default: ${DEFAULT_PRIORITY}`);
console.log(`Task 1: ${task1.title}, Prioritas ${task1.priority}`);
console.log(`Task 1: ${task2.title}, Prioritas ${task2.priority}`);

   
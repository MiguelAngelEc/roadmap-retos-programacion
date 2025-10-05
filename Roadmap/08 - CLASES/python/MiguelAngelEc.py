"""
Ejercicio 1
"""
from typing import Any


class Programmer:
    def __init__(self, name: str, age: int, languange: str) -> None:
        self.name = name
        self.age = age
        self.languange = languange
        
    def greatting(self) -> str:
        return f"Hello, my name is {self.name}. I'm {self.age} years old and my favorite language is {self.languange}."
    
my_programmer = Programmer("Miguel Angel Castillo", 37, "Python")
my_programmer.languange = "JavaScript"
print(my_programmer.greatting())    

"""
Extra
"""

class Stack:
    def __init__(self) -> None:
        self.items = []
        
    def push(self, item: Any) -> None:
        self.items.append(item)
        
    def pop(self):
        if self.count() == 0:
            return None
        return self.items.pop()
    
    def count(self) -> Any:
        return len(self.items)
    
    def print(self) -> None:
        for item in reversed(self.items):
            print(item)
            
print("LIFO")
my_stack = Stack()
my_stack.push(1)
my_stack.push(2)
my_stack.push(3)
my_stack.print()

class Queue:
    def __init__(self) -> None:
        self.items = []
        
    def push(self, item: Any) -> None:
        self.items.append(item)
        
    def pop(self):
        if self.count() == 0:
            return None
        return self.items.pop(0)
    
    def count(self) -> Any:
        return len(self.items)
    
    def print(self) -> None:
        for item in self.items:
            print(item)
print("FIFO")
my_queue = Queue()
my_queue.push(1)
my_queue.push(2)
my_queue.push(3)
my_queue.print()

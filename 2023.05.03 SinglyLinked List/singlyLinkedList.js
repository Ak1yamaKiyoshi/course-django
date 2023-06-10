class tNode {
  constructor(value, next = null) {
    // node value 
    this.value = value;
    // node link ( null by default )
    this.next = next;
  }
}


class SinglyLinkedList {
  constructor() {
    // head of the list
    this.head = null;
  }

  /** 
   * inserts node with given value at the end of the list
   * @param value value of node to append list with 
  */
  append(value) {
    if (!this.head) { // if head is null
      this.head = new tNode(value); // assign node to head 
      // now head is newly created node with given value 
      return; // leave from the function 
    }

    // if head is not null 
    // we need to reach last node in the list 
    let node = this.head; // create temporary value to iterate trought list 
    while (node.next) // if node next is not null
      node = node.next; // move to next node 
    // cycle will stop, when next will be null 
    // now we at the end of list 
    // append new node as pointer of last node 
    node.next = new tNode(value);
  }

  /**
   * Prints whole list 
   * @returns list string that represents list 
  */
  print() {
    let output = '';// output string 
    let node = this.head; // create temporary variable to iterate trought list 
    while (node != null) { // while node.next is not null 
      output += node.value + ' '; // add value to output string 
      node = node.next; // move to next node 
    }
    return output; // return output 
  }

  /**
   * counts nodes in singly linked list   
   * @returns counter length of singly linked list from head  
   */
  lengthCycle() {
    let ptr = this.head; // pointer to head 
    let counter = 0; // node counter e.g. length  
    while (ptr) { // while pointer is not null ( we can move to the next node )
      counter++; // increment counter 
      ptr = ptr.next; // move to the next node 
    }
    return counter; // return length of the list 
  }

  /**
   * counts nodes in singly linked list; limited by recursion depth (10000)
   * @param ptr pointer to count nodes from
   * @param counter current length
   * @returns counter length of singly linked list from head  
  */
  lengthRecursion(ptr = this.head, counter = 0) {
    if (!ptr) return counter; // if pointer is null, return counter 
    return this.lengthRecursion(ptr.next, counter + 1); // return result of called function on next node
  }


  /** 
   * Removes all existing nodes with given value from list
   * @param value - value to delete from list 
  */
  removeAllValueAppearences1(value) {
    if (!this.head) return;

    let tmp = this.head; // (current) pointer to iterate trought list 
    let tmp2 = null; // (previous) pointer for deleting operation 

    while (tmp.next) { // iterate throught list 
      tmp2 = tmp; // assign value of previous node 
      tmp = tmp.next; // move to the next node

      if (tmp == this.head && tmp.value == value) this.head = this.head.next;

      else if (tmp.value == value) { // if we found node with needed value 
        while (tmp.next && tmp.next.value == value) tmp = tmp.next;
        tmp2.next = tmp.next; // delete (unlinlk) current ( tmp ) node from list
      }
    }
  }


  removeAllValueAppearences(value) {
    if (!this.head) return;

    let tmp = this.head; // pointer to iterate trought list 
    let tmp2 = null; // pointer for deleting operation 

    while (tmp) { // iterate throught list 
      if (tmp.value == value && tmp2 == null) // if current head is value to delete  
        this.head = this.head.next; // move head to next node 
      else if (tmp.value == value) // else if current node contains value to delete  
        tmp2.next = tmp.next; // delete (unlink) current node 
      else
        tmp2 = tmp; // assign value of previous node 

      tmp = tmp.next; // move to the next node
    }
  }


  /**
   * Deletes first occurence of value in list 
   * @param value - value to delete 
  */
  removeFirst(value) {
    let tmp = this.head; // pointer to iterate trought all list 
    let tmp1 = null; // will be used for deletion 

    if (value == this.head.value) // if value to delete is first value in list 
      // move head pointer to delete it 
      return this.head = this.head.next

    while (tmp && !(tmp.value == value)) { // wile tmp is not null 
      tmp1 = tmp; // save previous value 
      tmp = tmp.next; // iterate trougth list 
    }

    tmp1.next = tmp.next // unlink middle node (tmp) so it will be deleted 
  }

  /**
   * Inserts given value after index
   * @param value - value to insert 
   * @param index - index after to insert 
  */
  insert(value, index) {
    // if index is incorrect return from function s
    if (index < 0 || index >= this.lengthCycle()) return;

    if (index == 0) // if inserting at head 
      // insert node with pointer to head before head 
      return this.head = new tNode(value, this.head);

    let counter = 0; // value to track current index 
    let tmp = this.head; // value to iterate trougth list 

    while (counter++ < index) // go to needed index in list  
      tmp = tmp.next; // iterate trought list   

    // insert value after that index 
    tmp.next = new tNode(value, tmp.next)
  }
}

class TestSinglyLinkedList {
  appendTest() {
    // create list object
    let list = new SinglyLinkedList();
    // insert short sequence of numbers
    list.append(1);
    list.append(2);
    list.append(3);
    // now list should look like:
    // 1 -> 2 -> 3
    let test = new Set(); // create set of test results 
    test.add(list.head.value == 1) // check if head value == 1 
    test.add(list.head.next.value == 2) // check if next node value == 2 
    test.add(list.head.next.next.value == 3) // check if last node value == 3
    // if test has one false, test will be failed 
    console.log(` > Append test passed: ${!test.has(false)}`)
  }

  printTest() {
    // create list object
    let list = new SinglyLinkedList();
    // insert short sequence of numbers
    list.append(1);// 1
    list.append(2);// 1 -> 2
    list.append(3);// 1 -> 2 -> 3
    // now list will look like 1 -> 2 -> 3
    console.log(` > Print test passed:  ${list.print() == '1 2 3 '}`);
  }

  lengthCycleTest() {
    let list = new SinglyLinkedList(); // list 
    let tests = new Set(); // set for tests ( if one test is false or true, that value will be in set )
    tests.add(list.lengthCycle() == 0); // if list is empty, length would be zero, and test is true 
    list.append(1); // 1
    list.append(1); // 1 -> 1
    list.append(1); // 1 -> 1 -> 1
    tests.add(list.lengthCycle() == 3);
    list.append(2); // 1 -> 1 -> 1 -> 2
    list.append(2); // 1 -> 1 -> 1 -> 2 -> 2
    list.append(2); // 1 -> 1 -> 1 -> 2 -> 2 -> 2
    tests.add(list.lengthCycle() == 6);

    console.log(` > Length test passed: ${!tests.has(false)}`)
  }

  lengthRecursionTest() {
    let list = new SinglyLinkedList(); // list 
    let tests = new Set(); // set for tests ( if one test is false or true, that value will be in set )
    tests.add(list.lengthRecursion() == 0); // if list is empty, length would be zero, and test is true 
    list.append(1); // 1
    list.append(1); // 1 -> 1
    list.append(1); // 1 -> 1 -> 1
    tests.add(list.lengthRecursion() == 3);
    list.append(2); // 1 -> 1 -> 1 -> 2
    list.append(2); // 1 -> 1 -> 1 -> 2 -> 2
    list.append(2); // 1 -> 1 -> 1 -> 2 -> 2 -> 2
    tests.add(list.lengthRecursion() == 6);

    console.log(` > Length test passed: ${!tests.has(false)}`)
  }

  removeAllTest() {
    let list = new SinglyLinkedList(); // list 
    let tests = new Set(); // set for tests ( if one test is false or true, that value will be in set )
    // list.append(1); // 1 -> 1list.append(1); 
    list.append(1); list.append(1); list.append(1);
    list.append(9); list.append(1); list.append(1);
    list.append(3); list.append(1); list.append(1);
    list.append(2); list.append(1); list.append(1);
    list.append(4); list.append(1); list.append(1);
    list.append(1); list.append(1);
    // list should look like: 1 1 1 1 9 1 1 3 1 1 2 1 1 4 1 1 1 1 
    list.removeAllValueAppearences(1);
    tests.add(list.print() == "9 3 2 4 ");
    console.log(` > RemoveAppearences test passed: ${!tests.has(false)}`)
  }

  removeFirstTest() {
    let list = new SinglyLinkedList(); // list 
    let tests = new Set(); // set for tests ( if one test is false or true, that value will be in set )

    // list.append(1); // 1 -> 1
    list.append(1);
    list.append(3);
    list.append(2);
    list.append(5);
    // now list looks like: "1 3 2 5 "
    list.removeFirst(1);
    tests.add("3 2 5 " == list.print());
    list.removeFirst(2);
    tests.add("3 5 " == list.print());
    list.removeFirst(5);
    tests.add("3 " == list.print());
    console.log(` > RemoveFirst test passed: ${!tests.has(false)}`)
  }

  insertTests() {
    let list = new SinglyLinkedList(); // list 
    let tests = new Set(); // set for tests ( if one test is false or true, that value will be in set )
    list.insert(1, 0); // insert at head case
    tests.add(list.print() == "1 ");
    list.append(8);
    list.append(8);
    list.append(8);
    list.insert(2, 1);
    list.insert(3, 2);
    list.insert(4, 1);
    tests.add("8 8 2 8 " == list.print());
    list.insert(40, list.lengthCycle() - 1);
    list.insert(90, list.lengthCycle());
    console.log(list.print())
  }
}

test1 = new TestSinglyLinkedList();
test1.appendTest();
test1.printTest();
test1.lengthCycleTest();
test1.lengthRecursionTest();
test1.removeAllTest()
test1.removeFirstTest()
test1.insertTests()
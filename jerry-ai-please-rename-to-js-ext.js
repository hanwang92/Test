class RangeList {
  /**
   * Adds a range to the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */

  constructor() {
    // list that stores all range values
    this.rangeArr = [];
  }

  add(range) {
    // add input range to end of list if list is empty or
    // if the input range start point is greater than the end point of last entry in list
    if(this.rangeArr.length == 0 || range[0] > this.rangeArr[this.rangeArr.length-1][1]){
      this.rangeArr.push(range);
      return;
    }

    // update start/end point of each entry in list
    // use the minimum start point and maximum end point of input range and list entry if they overlap
    for(var i=0; i<this.rangeArr.length; i++){
      if(range[0] >= this.rangeArr[i][0] && range[0] <= this.rangeArr[i][1] 
         || range[1] >= this.rangeArr[i][0] && range[1] <= this.rangeArr[i][1]
         || (range[0] <= this.rangeArr[i][0] && range[1] >= this.rangeArr[i][1])){
        this.rangeArr[i][0] = Math.min(range[0], this.rangeArr[i][0]);
	this.rangeArr[i][1] = Math.max(range[1], this.rangeArr[i][1]);
      }
    }

    // check each list entry and its next neighbor
    // remove entry and update neighbor if overlap
    for(var i=0; i<this.rangeArr.length-1; i++){
      if(this.rangeArr[i][0] >= this.rangeArr[i+1][0] && this.rangeArr[i][0] <= this.rangeArr[i+1][1] 
         || this.rangeArr[i][1] >= this.rangeArr[i+1][0] && this.rangeArr[i][1] <= this.rangeArr[i+1][1]){
        this.rangeArr[i+1][0] = Math.min(this.rangeArr[i][0], this.rangeArr[i+1][0]);
	this.rangeArr[i+1][1] = Math.max(this.rangeArr[i][1], this.rangeArr[i+1][1]);
        this.rangeArr.splice(i, 1);
        i--;
      }
    }
  }

  /**
   * Removes a range from the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range) {
    // update list entries
    for(var i=0; i<this.rangeArr.length; i++){
      // split list entry into two entries when input range start/end points are within list entry
      if(range[0] >= this.rangeArr[i][0] && range[0] <= this.rangeArr[i][1] 
         && range[1] >= this.rangeArr[i][0] && range[1] <= this.rangeArr[i][1]){
	var r = [range[1], this.rangeArr[i][1]];
	this.rangeArr[i][1] = range[0];
        this.rangeArr.splice(i+1, 0, r);
	break;
      }
      // remove list entry when its start/end points are within input range
      // else update the list entry start/end points
      if(range[0] <= this.rangeArr[i][0] && range[1] >= this.rangeArr[i][1]){
        this.rangeArr.splice(i, 1);
        i--;
      }
      else if(range[0] >= this.rangeArr[i][0] && range[0] <= this.rangeArr[i][1]){
        this.rangeArr[i][1] = Math.min(range[0], this.rangeArr[i][1]);
      }
      else if(range[1] >= this.rangeArr[i][0] && range[1] <= this.rangeArr[i][1]){
        this.rangeArr[i][0] = Math.max(range[1], this.rangeArr[i][0]);
      }
    }

    // clean up empty list entries
    for(var i=0; i<this.rangeArr.length; i++){
      if(this.rangeArr[i][0] == this.rangeArr[i][1]){
        this.rangeArr.splice(i, 1);
        i--;
      }
    }
  }

  /**
   * Prints out the list of ranges in the range list
   */
  print() {
    var str = "";
    for(var i=0; i<this.rangeArr.length; i++){
      str += "[" + this.rangeArr[i][0] + ", " + this.rangeArr[i][1] + ") ";
    }
    console.log(str.trim());
  }

  /**
   * Tests the list entries against expected outcome and prints the result
   */
  test(expected) {
    var str = "";
    for(var i=0; i<this.rangeArr.length; i++){
      str += "[" + this.rangeArr[i][0] + ", " + this.rangeArr[i][1] + ") ";
    }
    if(str.trim() == expected){
      console.log("PASS");
    }
    else{
      console.log("FAIL");
    }
  }
}

// Example run
const rl = new RangeList();

rl.add([1, 5]);
rl.print();
rl.test("[1, 5)");
// Should display: [1, 5)

rl.add([10, 20]);
rl.print();
rl.test("[1, 5) [10, 20)");
// Should display: [1, 5) [10, 20)

rl.add([20, 20]);
rl.print();
rl.test("[1, 5) [10, 20)");
// Should display: [1, 5) [10, 20)

rl.add([20, 21]);
rl.print();
rl.test("[1, 5) [10, 21)");
// Should display: [1, 5) [10, 21)

rl.add([2, 4]);
rl.print();
rl.test("[1, 5) [10, 21)");
// Should display: [1, 5) [10, 21)

rl.add([3, 8]);
rl.print();
rl.test("[1, 8) [10, 21)");
// Should display: [1, 8) [10, 21)

rl.remove([10, 10]);
rl.print();
rl.test("[1, 8) [10, 21)");
// Should display: [1, 8) [10, 21)

rl.remove([10, 11]);
rl.print();
rl.test("[1, 8) [11, 21)");
// Should display: [1, 8) [11, 21)

rl.remove([15, 17]);
rl.print();
rl.test("[1, 8) [11, 15) [17, 21)");
// Should display: [1, 8) [11, 15) [17, 21)

rl.remove([3, 19]);
rl.print();
rl.test("[1, 3) [19, 21)");
// Should display: [1, 3) [19, 21)

rl.add([19, 19]);
rl.print();
rl.test("[1, 3) [19, 21)");
// Should display: [1, 3) [19, 21)

rl.add([3, 19]);
rl.print();
rl.test("[1, 21)");
// Should display: [1, 21)

rl.add([24, 25]);
rl.print();
rl.test("[1, 21) [24, 25)");
// Should display: [1, 21) [24, 25)

rl.remove([1, 6]);
rl.print();
rl.test("[6, 21) [24, 25)");
// Should display: [6, 21) [24, 25)

rl.add([4, 24]);
rl.print();
rl.test("[4, 25)");
// Should display: [4, 25)

rl.add([27, 30]);
rl.print();
rl.test("[4, 25) [27, 30)");
// Should display: [4, 25) [27, 30)

rl.add([33, 38]);
rl.print();
rl.test("[4, 25) [27, 30) [33, 38)");
// Should display: [4, 25) [27, 30) [33, 38)

rl.add([3, 40]);
rl.print();
rl.test("[3, 40)");
// Should display: [3, 40)

rl.add([43, 47]);
rl.print();
rl.test("[3, 40) [43, 47)");
// Should display: [3, 40) [43, 47)

rl.add([56, 59]);
rl.print();
rl.test("[3, 40) [43, 47) [56, 59)");
// Should display: [3, 40) [43, 47) [56, 59)

rl.remove([3, 45]);
rl.print();
rl.test("[45, 47) [56, 59)");
// Should display: [45, 47) [56, 59)

rl.remove([40, 60]);
rl.print();
rl.test("");
// Should display: 
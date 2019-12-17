'use strict';

const Antl = use ('Antl');

class Task {
  get validateAll () {
    return true;
  }

  get rules () {
    return {
      title: 'required',
      description: 'required|unique:tasks',
      due_date: 'date',
    };
  }

  get messages () {
    return Antl.list ('validation');
  }
}

module.exports = Task;

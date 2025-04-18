var create = document.getElementById('create');
var newtask = "",
  d,
  saved = false;
var storage = window.localStorage;

window.onload = function(e) {
  tasks = storage.getItem('tasks');
  if (storage.getItem('tasks') == null) {
    storage.setItem('tasks', '');
  } else {
    var t = tasks.split(" ");
    for (var i = 0; i < t.length; i++) {
      CreateTask(t[i], 'loading');
    }
  }
  d = document.querySelectorAll('.done');
  x = document.querySelectorAll('.del');
  for (var i = 0; i < d.length; i++) {
    d[i].onclick = function() {
      this.parentNode.style.textDecoration = 'line-through';
    }
  }
}

create.addEventListener('shown.bs.modal', function() {
  saved = false;
  document.getElementById('title').focus();
})

document.getElementById('save').onclick = function() {
  saved = true;
}

create.addEventListener('hidden.bs.modal', function() {
  newtask = document.getElementById('title').value;
  if (newtask != "" && saved == true) {
    CreateTask(newtask);
  }
})

function CreateTask(name, status) {
  if (name != '') {
    var elem = document.createElement('div');
    elem.className = 'tasks';
    document.body.appendChild(elem);
    var n = document.createElement('span');
    n.innerHTML = name;
    var del = document.createElement('button');
    del.className = "del"
    del.innerHTML = '<i class="fa fa-times"></i>';
    var done = document.createElement('button');
    done.className = "done"
    done.innerHTML = '<i class="fa fa-check"></i>';
    elem.appendChild(n);
    elem.appendChild(del);
    elem.appendChild(done);
    if (status != 'loading') {
      storage.setItem('tasks', storage.getItem('tasks') + " " + name);
    }
  }
}

function ripple(elem) {
  if (elem.id == 'l' || elem.id == 'd') {
    return 0;
  }
  elem.classList.add('ripple');
  elem.ontouchend = function() {
    setTimeout(function() {
      elem.classList.remove('ripple');
    }, 1000);
  }
}

/*
<i class="bi bi-alarm" style="float:left;"></i>
<i class="bi bi-calendar" style="float:left;margin-left: 9%;"></i>
*/

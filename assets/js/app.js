// Variables
const noteList = document.getElementById('note-list');

// Event Listener
function eventListeners(){
    // form submission
    document.querySelector('#form').addEventListener('submit', newNote);
    // remove note from the list
    noteList.addEventListener('click', removeNote);
    // document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

// Function

function newNote(e){
    e.preventDefault();
    //console.log("Form submited");
    const note = document.getElementById('note').value; // Đọc value trong phần tử textarea
    //console.log(note);

    // Tạo phần tử <li>
    const li = document.createElement('li');
    li.textContent = note;
    // Thêm nút Xóa vào sau mỗi note
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-note';
    removeBtn.textContent = 'X';
    li.appendChild(removeBtn);

    // Thêm note vào Note List
    noteList.appendChild(li);

    // Thêm note vào local storage

    addNoteLocalStorage(note);

    // hiện thông báo khi add note

    alert('Đã thêm Note!');

    // reset value in textarea

    this.reset();
}
// Hàm xóa note
function removeNote(e){
    //console.log(n)
    if(e.target.classList.contains('remove-note')){
        e.target.parentElement.remove();
    }
    // remove note from local storage
    //console.log(e.target.parentElement.textContent); // còn chứa dấu 'X' đằng sau chuỗi cần xóa
    removeNoteLocalStorage(e.target.parentElement.textContent); 
}
// Hàm thêm note vào local storage
function addNoteLocalStorage(note){
    let notes = getNoteLocalStorage();
    // Thêm note vào mảng
    notes.push(note);
    // Convert note từ mảng sang chuỗi
    localStorage.setItem('notes', JSON.stringify(notes))
}   

// Hàm get note từ local storage
function getNoteLocalStorage(){
    let notes;
    const notesLS = localStorage.getItem('notes');
    // get giá trị, nếu null thì trả về mảng rỗng
    if(notesLS === null){
        notes = [];
    }else{
        notes = JSON.parse(notesLS);
    }
    return notes;
}
// Load notes from Local Storage
function localStorageOnLoad(){
    let notes = getNoteLocalStorage();
    //console.log(notes);
    notes.forEach(function(note){
        // Tạo phần tử <li>
    const li = document.createElement('li');
    li.textContent = note;
    // Thêm nút Xóa vào sau mỗi note
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-note';
    removeBtn.textContent = 'X';
    li.appendChild(removeBtn);

    // Thêm note vào Note List
    noteList.appendChild(li);
    });

}
// Hàm xóa note từ local storage
function removeNoteLocalStorage(note){
    let notes = getNoteLocalStorage(); // get notes from local storage
    // xóa kí tự 'X' sau chuỗi note
    const noteDelete = note.substring(0, note.length - 1);
    //console.log(noteDelete); => đã mất 'X'
    /*
    -- Dùng forEach 
    notes.forEach(function(notesLS, index){ // vòng lặp chạy từng phần tử của mảng notesLS
        //console.log(notesLS);
        if(noteDelete === notesLS){ // khi tìm thấy giá trị trong mảng notesLS bằng với giá trị cần xóa thì thực thi
            notes.splice(index, 1); // xóa 1 phần tử bắt đầu từ vị trí index
            break;
        }
    }); 
    */
    //debugger;
    // -- Dùng for truyền thống
    for(let i = 0; i < notes.length ; i++){
        if(noteDelete === notes[i]){ // khi tìm thấy giá trị trong mảng notesLS bằng với giá trị cần xóa thì thực thi
            //console.log(notes[i])
            notes.splice(i, 1); // xóa 1 phần tử bắt đầu từ vị trí index
            break; // khi có phần tử giống nhau, vòng lặp sẽ dừng ngay sau khi xóa giá trị giống đầu tiên => vị trí sẽ bị thay đổi so với phần tử muốn xóa
        }
    }
    // lưu lại dữ liệu sau khi xóa
    // console.log(notes) // kiểm tra dữ liệu sau khi xóa
    localStorage.setItem('notes', JSON.stringify(notes))

}
eventListeners();
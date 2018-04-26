let $ = require('jquery')
let fs = require('fs')
let filename = 'contacts'
let sno = 0
let currentRow = null;

$('#add-to-list').on('click', () => {
   let name = $('#Name').val()
   let email = $('#Email').val()

   if(!currentRow){
      if(name && email){
      fs.appendFile('contacts', name + ',' + email + '\n')
      }
   }
   if(currentRow){
      let s = currentRow[0].innerText[0]
      updateentry(s,name,email)
   }

   addEntry(name, email)
   $('#Name').val("");
   $('#Email').val("");


})

function addEntry(name, email) {
   if(name && email) {

      sno++
      let updateString = '<tr><td colspan="2">'+ sno + '</td><td colspan="5" class="Name">'+ name +'</td><td colspan="10" class="Email">' 
         + email +'</td><td colspan="4"><button onclick="deleteentry('+sno+')" class="btnDelete">Delete</button></td><td colspan="4"><button class="btnUpdate">Update</button></td></tr>'
      
      if(currentRow){
         $("#contact-table").find($(currentRow)).replaceWith(updateString);
         currentRow = null;
      }
      else{
         
         $('#contact-table').append(updateString)
      }
      
   }
}

function loadAndDisplayContacts() {  
   
   //Check if file exists
   if(fs.existsSync(filename)) {
      let data = fs.readFileSync(filename, 'utf8').split('\n')
      
      data.forEach((contact, index) => {
         let [ name, email ] = contact.split(',')
         addEntry(name, email)
      })
   
   } else {
      console.log("File Doesn\'t Exist. Creating new file.")
      fs.writeFile(filename, '', (err) => {
         if(err)
            console.log(err)
      })
   }
}

function deleteentry(sno){
   console.log("deleted")
   if(fs.existsSync(filename)) {
      let data = fs.readFileSync(filename, 'utf8')
      let entries = data.split('\n')
      let s = sno -1
      console.log(entries[s])
      entries[s] = ""
      data = entries.join('\n')
      fs.writeFile('contacts', data,  function(err) {
         if (err) {
            return console.error(err);
         }
      })
   }
}

function updateentry(sno,name,email){
   if(fs.existsSync(filename)) {
      let data = fs.readFileSync(filename, 'utf8')
      let entries = data.split('\n')
      let s = sno -1
      
      let updated = [name,email].join(',')
      entries[s] = updated

      data = entries.join('\n')
      fs.writeFile('contacts', data,  function(err) {
         if (err) {
            return console.error(err);
         }
      })
   }
}

$("#contact-table").on('click', '.btnDelete', function () {
   $(this).closest('tr').remove();
});


$("#contact-table").on('click', '.btnUpdate', function () {
  currentRow= $(this).parents('tr');
  $("#Name").val($(this).closest('tr').find('td.Name').text());
  $("#Email").val($(this).closest('tr').find('td.Email').text());
})

loadAndDisplayContacts()
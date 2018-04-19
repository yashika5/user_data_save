let $ = require('jquery')
let fs = require('fs')
let filename = 'contacts'
let sno = 0

$('#add-to-list').on('click', () => {
   let name = $('#Name').val()
   let email = $('#Email').val()

   fs.appendFile('contacts', name + ',' + email + '\n')

   addEntry(name, email)
   $('#Name').val("");
   $('#Email').val("");
})

function addEntry(name, email) {
   if(name && email) {
      sno++
      let updateString = '<tr><td colspan="2">'+ sno + '</td><td colspan="5">'+ name +'</td><td colspan="10">' 
         + email +'</td><td colspan="4"><button onclick="deleteentry('+sno+')" class="btnDelete">Delete</button></td><td colspan="4"><button onclick="updateentry('+sno+')" class="btnUpdate">Update</button></td></tr>'
      $('#contact-table').append(updateString)
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

function updateentry(sno,name){
   console.log("updated "+name)
   if(fs.existsSync(filename)) {
      let data = fs.readFileSync(filename, 'utf8')
      let entries = data.split('\n')
      let s = sno -1
      console.log(entries[s])
      let [n,e] = entries[s].split(',')
      console.log(n+ " "+e)
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


loadAndDisplayContacts()
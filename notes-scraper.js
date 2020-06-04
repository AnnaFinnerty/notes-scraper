
var app = Application.currentApplication();
app.includeStandardAdditions = true;
var notesApp = Application('Notes');
notesApp.includeStandardAdditions = true;

var folders = notesApp.folders;
var notes = notesApp.notes;

var dialogText = "Plaintext or HTML?";
var type = app.displayDialog(dialogText, {
    buttons: ["Cancel", "HTML", "Text"],
    defaultButton: "Text",
    cancelButton: "Cancel"
})

var whichNotes = app.chooseFromList(notes.name(), { withPrompt: "Which Notes? Cmd+A for All", multipleSelectionsAllowed: true });


if (type) {
	if(whichNotes){
		var saveWhere = app.chooseFolder().toString();
		if (saveWhere) {
			for(var i=0; i<notes.length; i++) {
				if (whichNotes.indexOf(notes[i].name()) > -1) {
					// save file as html
					var name = notes[i].name().replace(/[\/:]/g,'_');
					var filename = type === "HTML" ? saveWhere+"/"+name+".html" : saveWhere+"/"+name+".txt" ;
					var file = app.openForAccess(Path(filename), { writePermission: true });
					app.setEof(file, { to: 0 });
					var content = type === "HTML" ? notes[i].body() : 
					notes[i].body().replace(/(<div>|<\/div>|<br>|<u>|<\/u>|<ul>|<\/ul>|<ol>|<\/ol>|<li>|<\/li>)/g,'');
					//not working?
			        notes[i].body().replace(/<li>/g,"bullet")
					
					app.write(content, {to: file});
					app.closeAccess(file);
				}
			}
		}
	}
	
}
//Announce that the script has been injected properly
console.log("Preview Script Injected!");

//Initializing static varaibles

//Placeholder text
lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..."

//Pencil Icon from font-awesome
Pencil = '<i class="fa fa-pencil fa-fw fag2b" aria-hidden="true"></i>'

//Create the container for the preview
preview = document.createElement("div");
preview.id = "preview";
preview.className = "sitewidth"
preview.style = "margin-top:2em;"
preview.innerHTML = "<h2>Live Preview</h2>"

//Create the container for the content of the preview
content = document.createElement("div");
content.style = "display:block;width:100%;border:1px solid black;padding:10px;";
content.className = "blog";

//Create the title of the preview
title = document.createElement("h2");
title.id ="pTitle" ;
title.className = "skiptranslate";

//Check if this is an edit or a new discussion
if ($("#EN_title")[0].value.replace('\n',"<br />") === ""){
	
	//if it's a new discussion, use a placeholder name
	title.innerHTML = 'Lorem Ipsum' + Pencil;
}
else{

	//if it's and edit, load the current title into the preview
	title.innerHTML = $("#EN_title")[0].value.replace('\n',"<br />") + Pencil;
}

//Create the date part of the header
date = document.createElement("div");
date.className = "date";

//Use moment.js to get the current date in the correct format
date.innerHTML = moment().format('MMMM Do, YYYY');
date.style = "font-size:10pt;display: inline-block;";

//create the by part of the header
by = document.createElement("div");
by.className = "by";
by.innerHTML = "&nbsp;by&nbsp;"
by.style = "font-size:10pt;display: inline-block;color:gray;"

//create the nickname part of the header
nickname = document.createElement("div");
nickname.className = "nickname";
nickname.className += "skiptranslate";

//Grab the user's nickname from elsewhere on the site.
nickname.innerHTML = document.getElementById("headername").innerHTML;
nickname.style = "font-size:10pt;display: inline-block;";

//create the like button part of the header (the heart icon from font-awesome)
heart = document.createElement("div");
heart.innerHTML = '<i class="skiptranslate likeb fa fa-heart-o fa-fw" aria-hidden="true" style="font-size:10pt;"></i>'
heart.style= "display: inline-block;";

//create the body for the content of the preview
body = document.createElement("div");
body.id = "pBody"
body.className = "content";
body.className += "skiptranslate";
body.style = "clear:both;border-top:1px solid silver;padding-top: 5px;"

//Check if this is an edit or a new discussion
if ($("#EN_body")[0].value.replace('\n',"<br />") === ""){

	//if it's a new discussion, use placeholder text
	body.innerHTML = lorem;
}
else{

	//if it's and edit, load the current content into the preview
	body.innerHTML = $("#EN_body")[0].value.replace('\n',"<br />");
}

//add all of parts of the header into the content of the preview
content.appendChild(title);
content.appendChild(date);
content.appendChild(by);
content.appendChild(nickname);
content.appendChild(heart);
content.appendChild(body);

//add the content into the preview
preview.appendChild(content);

//add the preview into the page above the editor
nav = document.getElementsByClassName("graynav")[0];
nav.parentElement.insertBefore(preview, nav.nextSibling);

//execute this code whenever the title input field changes
$( "#EN_title" ).on("input", function() {
	
	//change the preview's title to what's in the title input field
	$( "#pTitle" ).html( $("#EN_title")[0].value + Pencil);
	
	//check if the title input field is empty
	if ($( "#pTitle" ).html().trim() === Pencil){
		
		//if it's empty, change it to a placeholder title
		$( "#pTitle" ).html('Lorem Ipsum' + Pencil);
	}
});

//execute this code whenever the content input field changes
$("#EN_body").on('input', function() {


	//change the preview's title to what's in the title input field, eliminate un-allowed tags (using regex), replace newline chars with <br \> tags and then correct the spacing to match the live versions.
    $( "#pBody" ).html( $("#EN_body")[0].value.replace(/<^(?!b|ul|ol|li|i)[^>]*>/gm, "").replace('\n',"<br />").replace("<ul>", "<ul><br />").replace("<ol>", "<ol><br />").replace("</ul>", "</ul><br />").replace("</ol>", "</ol><br />"));
    
    //check if the title input field is empty
    if ( $( "#pBody" ).html().trim() === ""){
    
    	//if it's empty, change it to a placeholder text
    	$( "#pBody" ).html(lorem);
    }
});
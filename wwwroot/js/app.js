//The URIs of the REST endpoint
IUPS = "https://prod-42.northeurope.logic.azure.com:443/workflows/cd4f8cabc95b4d1884a29090d6f75b23/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=-YNTZaPxDB2jxOYCeUSQ_9ZUomWpOSEr8srfWJ0Nznk";
RAI = "https://prod-47.northeurope.logic.azure.com:443/workflows/2dff56beec0f4cfeb6fbf1043026eb54/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=2k6RVuP_vxGdlDRlMJxuwAwNPxdFtT-Aned_OhHJ6kU";
CNC="https://prod-54.northeurope.logic.azure.com:443/workflows/934969073a5446368e8bc590be3a77b8/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=0lj3D5aFYZStdLTcMF-Y_-xyGpoGTWj0TkgmqUBaNEA";

BLOB_ACCOUNT = " https://storageb000963005.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint
function submitNewAsset(){

//Create a form data object

submitData = new FormData();

// *****************************************
//Get form variables and append them to the form data object

submitData.append('vidID', $('#vidID').val());
submitData.append('vidTitle', $('#vidTitle').val());
submitData.append('vidPublisher', $('#vidPublisher').val());
submitData.append('vidProducer', $('#vidProducer').val());
submitData.append('vidGenre', $('#vidGenre').val());
submitData.append('vidRating', $('#vidRating').val());
submitData.append('vidRelease', $('#vidRelease').val()); 
submitData.append('vidAdded', $('#vidAdded').val());
submitData.append('File', $("#UpFile")[0].files[0]);

const settings = {
  "async": true,
  "crossDomain": true,
  "url": IUPS,
  "method": "POST",
  "headers": {
    "cookie": "ARRAffinity=25e507f5a5d29209064d22de333d89d06a91f2a90cbd911c309208035503cfa2; ARRAffinitySameSite=25e507f5a5d29209064d22de333d89d06a91f2a90cbd911c309208035503cfa2"
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": submitData
};

$.ajax(settings).done(function (response) {
  console.log(response);
});

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div

function getImages(){

// *****************************************
//Get form variables and append them to the form data object


//Replace the current HTML in that div with a loading message

 $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

 $.getJSON(RAI, function( data ) {
 
//Create an array to hold all the retrieved assets
 var items = [];

 //Iterate through the returned records and build HTML, incorporating the key values of the record in the data

 $.each( data, function( key, val ) {
 items.push( "<hr />");
 items.push( "Date Added : <b>" + val["vidAdded"] + "</b>");
 items.push( " Video Id : <b>" + JSON.stringify(val["vidID"])+ "</b>");
 items.push( " Video Title : <a href='"+BLOB_ACCOUNT + val["filePath"] + "'> <b>" + val["vidTitle"] + "</b></a> <br/>");
 items.push( "Publisher : <b>" + val["vidPublisher"] + "</b>");
 items.push( " Producer : <b>" + val["vidProducer"] + "</b><br/>");
 items.push( "Genre : <b>" + val["vidGenre"]+ "</b>");
 items.push( " Rating : <b>" + val["vidRating"]+ "</b>");
 items.push( " Release Date : <b>" + val["vidRelease"] + "</b><br/>");
  });

 //Clear the assetlist div
 $('#ImageList').empty();

 //Append the contents of the items array to the ImageList Div
 $( "<ul/>", {
 "class": "my-new-list",
    html: items.join( "" )
 }).appendTo( "#ImageList" );
 
});

}

//A function to delete an asset with a specific ID.
//The id paramater is provided to the function as defined in the relevant onclick handler

function commentAsset(id){

//Create a form data object

commentData = new FormData();
commentData.append('vidCommentVidID', id);
commentData.append('vidComment', $('#vidComment').val());

const settings = {
  "async": true,
  "crossDomain": true,
  "method": "POST",
  "url": CNC,
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": commentData
};

$.ajax(settings).done(function (response) {
  console.log(response);
});

}




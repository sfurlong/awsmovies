// JavaScript Document
//Set up vairaibles
module.exports = {

    loadTweets: function(dir, callback) {

        console.log("Data Directory: " + dir);


        var filesystem = require("fs");
        var results = [];

        filesystem.readdirSync(dir).forEach(function(file) {

            file = dir + '/' + file;
            var stat = filesystem.statSync(file);

            if (stat && stat.isDirectory()) {
                results = results.concat(_getAllFilesFromFolder(file))
            } else {
                var tweet = JSON.parse(filesystem.readFileSync(file, 'utf8'));
                results.push(tweet);
                console.log(tweet);
            }
        });

        console.log("!!!Loaded Data!!");

        /*
                var destDoc, sourceDoc, sourceFolder, newLayer;

                // Select the source folder.
                sourceFolder = Folder.selectDialog('Select the folder with Illustrator files that you want to mere into one', '~');
                destDoc = app.documents.add();

                // If a valid folder is selected
                if (sourceFolder != null) {
                    files = new Array();

                    // Get all files matching the pattern
                    files = sourceFolder.getFiles();

                    if (files.length > 0) {
                        // Get the destination to save the files
                        for (i = 0; i < files.length; i++) {
                            sourceDoc = app.open(files[i]); // returns the document object
                            var myLayers = sourceDoc.layers; // Select All layers in Active Document
                            //Go through all layers of source document and copy artwork
                            for (i = 0; i < myLayers.length; i++) {
                                myLayers[i].hasSelectedArtwork = true;
                            };

                            with(sourceDoc) {
                                var count = pageItems.length;
                                for (var i = 0; i < count; i++) {
                                    pageItems[i].selected = true;
                                }
                                redraw();
                                copy();
                                for (var i = 0; i < count; i++) {
                                    pageItems[i].selected = false;
                                }
                            }

                            //Create a new title variable that has the title of the source document
                            var title = sourceDoc.name;
                            var title = title.substring(0, title.length - 4); //(remove extension from name)
                            //Close the Source Document
                            sourceDoc.close(SaveOptions.DONOTSAVECHANGES);

                            //Open the Destination Document and create a new layer in it that is named after the title variation
                            newLayer = destDoc.layers.add();
                            newLayer.name = title;

                            //Paste into this new layer
                            newLayer = app.paste();

                        }
                    } else {
                        alert('No matching files found');
                    }
                }
                */
    }
};
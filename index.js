const cron = require("node-cron");
const Crawler = require("crawler");
const DataSetItem = require('./models/listingItemModel');
const fileservice = require('./services/file.service');


var c = new Crawler({
  maxConnections : 10,
  callback : function (error, res, done) {
      if(error){
          console.log(error);
      }else{
          var $ = res.$;
          var keywords = $("meta[name='sailthru.tags']").attr("content");
          //console.log($("meta[name='sailthru.tags']").attr("content"));
          var pond5_image_url = $(".u-imageResponsive").attr("src");
          if(pond5_image_url) {
            var image_save_path = "./images/";

            var image_pond5_id = pond5_image_url.split('-');
            image_pond5_id = image_pond5_id[image_pond5_id.length - 1];
            image_pond5_id = image_pond5_id.split('_iconl.jpeg')[0];

            image_save_path += image_pond5_id;
            image_save_path += ".jpeg";
            fileservice.download_image(pond5_image_url,image_save_path, (result) => {
              console.log("NEW FILE WAS SAVED: " + result);
              payload = {
                "itemId":image_pond5_id,
                "keywords":keywords
              }
              DataSetItem.createItem(payload).then((result) => {console.log(result);});
            })
          } else {
            //console.log("ID: ", res.options.uri, " is empty")
          }
      }
      done();
  }
});
index = 143650;
index = 130000000;

cron.schedule("*/1 * * * * *", function() {
  for(var i = 0; i < 10; i++) {
    index++;
    console.log("Getting index: " + index);
    var url = 'https://www.pond5.com/stock-images/photos/item/' + index + '-';
    c.queue(url);
  }
});


//ListingItemModel.createItem(payload).then((result) => {console.log(result);});


//get last id from mongo
//start execution

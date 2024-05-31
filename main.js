song="";
img = "";
status = "";
objects = [];
function preload()
{
   song = loadSound("music.mp3");
}
function setup()
 {
    canvas = createCanvas(380 , 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380 ,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects";
 }
 function modelLoaded()
 {
   console.log("ModelLoaded!");
   status = true;
 }
 function gotResult(error , results)
 {
      if(error)
         {
            console.log(error);
         }
         else{
            console.log(results);
            objects = results;
         }
 }
 function draw()
 {
    image(video , 0 , 0 , 380 , 380);

    if (status = "person")
      {
         r = random(255);
         g = random(255);
         b = random(255);
         objectDetector.detect(video ,gotResult);
         for(i = 0; i < objects.length ; i++)
         {
             document.getElementById("status").innerHTML = "status : object detected";
             document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Are = "+ objects.length;
             song.stop();
             fill(r ,g ,b);
             percent = floor(objects[i].confidence * 100);
             text(objects[i].label+ " " + percent + "%" , objects[i].x +15 , objects[i].y +15);
             noFill();
             stroke(r ,g ,b);
             rect(objects[i].x ,objects[i].y ,objects[i].width ,objects[i].height ,);
         }
      }
      else{
         document.getElementById("status").innerHTML = "status : object detected";
             document.getElementById("number_of_objects").innerHTML = "person not found"+ objects.length;
             song.play();
      }
 }
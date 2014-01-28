// Connecting to ROS
// -----------------

var ros = new ROSLIB.Ros({
  url : 'ws://localhost:9090'
});

// Publishing a Topic
// ------------------

var cmdVel = new ROSLIB.Topic({
  ros : ros,
  name : '/cmd_vel',
  messageType : 'geometry_msgs/Twist'
});

var twist = new ROSLIB.Message({
  linear : {
    x : 0.1,
    y : 0.2,
    z : 0.3
  },
  angular : {
    x : -0.1,
    y : -0.2,
    z : -0.3
  }
});
cmdVel.publish(twist);

// Subscribing to a Topic
// ----------------------

var listener = new ROSLIB.Topic({
  ros : ros,
  name : '/listener',
  messageType : 'std_msgs/String'
});

listener.subscribe(function(message) {
  console.log('Received message on ' + listener.name + ': ' + message.data);
  //listener.unsubscribe();
});

// Calling a service
// -----------------

var addTwoIntsClient = new ROSLIB.Service({
  ros : ros,
  name : '/add_two_ints',
  serviceType : 'rospy_tutorials/AddTwoInts'
});

var request = new ROSLIB.ServiceRequest({
  A : 1,
  B : 2
});

addTwoIntsClient.callService(request, function(result) {
  console.log('Result for service call on '
    + addTwoIntsClient.name
    + ': '
    + result.sum);
});

// Getting and setting a param value
// ---------------------------------

ros.getParams(function(params) {
  console.log(params);
});

var maxVelX = new ROSLIB.Param({
  ros : ros,
  name : 'max_vel_y'
});

maxVelX.set(0.8);
maxVelX.get(function(value) {
  console.log('MAX VAL: ' + value);
});

// WMH added 2013-01-27
function rgb(r, g, b){
  return ["rgb(",r,",",g,",",b,")"].join(""); //Joining array of strings
}

var id = 1; 
var val = 10;
// example of how to set cell contents
$('#cell'+id).html(val.toString());
// example of how to set cell color
$('#cell'+id).css('background-color',rgb(250,150,0));

var listener = new ROSLIB.Topic({
  ros : ros,
  name : '/biotac_pub',
  messageType : 'biotac_sensors/BioTacHand'
});

listener.subscribe(function(message) {
  console.log('Received message on ' + listener.name + ': ' + message.bt_data[0].electrode_data);
  //console.log(message.bt_data[0].electrode_data);
  var data = message.bt_data[0].electrode_data;
  $('#cell3').html(data[6]);
  $('#cell7').html(data[8]);
  $('#cell9').html(data[7]);
  $('#cell11').html(data[10]);
  $('#cell13').html(data[9]);
  $('#cell15').html(data[0]);
  $('#cell17').html(data[11]);
  $('#cell18').html(data[16]);
  $('#cell19').html(data[1]);
  $('#cell22').html(data[12]);
  $('#cell24').html(data[2]);
  $('#cell26').html(data[13]);
  $('#cell30').html(data[3]);
  $('#cell32').html(data[14]);
  $('#cell33').html(data[17]);
  $('#cell34').html(data[4]);
  $('#cell36').html(data[15]);
  $('#cell38').html(data[18]);
  $('#cell40').html(data[5]);

  //listener.unsubscribe();
});
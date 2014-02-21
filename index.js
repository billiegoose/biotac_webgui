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

var max_values = [];
var nailUp = true;
for (var i = 0; i < 20; i ++)
{
  max_values[i] = 0;
}

$("flip_gui").on ("click", function() {
  nailUp = !nailUp;
  console.log('nailUp: ' + nailUp);
});


function cell(n){
  return $('#c'+n);
}

//Found on stack overflow
function getColor(length, max)
{
    var i = (length * 255 / max);
    var r = Math.round(Math.sin(0.014 * i + 2) * 127 + 128);
    var g = Math.round(Math.sin(0.014 * i + 4) * 127 + 128);
    //var b = Math.round(Math.sin(0.024 * i + 0) * 127 + 128);
    return 'rgb(' + r + ',' + g + ',' + 128 + ')';
}

var scale = '<p>Scale (<-High Low->)</p>';
scale += '<table style="border-collapse:collapse; height:100px; width=400px;"><tr id="scale">';
for (var i = 0; i < 100; i++) {
  scale += '<td style="background-color:'+getColor(i,100)+'"> </td>';
};
scale += '</tr></table>';
$('body').append($(scale));


var id = 1; 
var val = 10;
// example of how to set cell contents
//$('#cell'+id).html(val.toString());
// example of how to set cell color
//$('#cell'+id).css('background-color',rgb(250,150,0));

var listener = new ROSLIB.Topic({
  ros : ros,
  name : '/biotac_pub',
  messageType : 'biotac_sensors/BioTacHand'
});

listener.subscribe(function(message) {
  //console.log('Received message on ' + listener.name + ': ' + message.bt_data[0].electrode_data);
  //console.log(message.bt_data[0].electrode_data);
  var data = message.bt_data[0].electrode_data;

  for (var i = 0; i < 19; i++) {
    if (i==0) {
      //console.log(i + ' : ' + max_values[i] + ' : ' + data[i]);
    }
    if (data[i] > max_values[i]) {
      max_values[i] = data[i];
    }
    //console.log(i + ' : ' + max_values[i] + ' : ' + data[i]);
    if(!nailUp)
    {
      cell(i).html(data[i]);
    } 
    else
    {
      if(i == 8)
      {
        cell(i).html(data[7]);
      }
      if(i == 7)
      {
        cell(i).html(data[8]);
      }
      if(i == 1)
      {
        cell(i).html(data[11]);
      }
      if(i == 2)
      {
        cell(i).html(data[12]);
      }
      if(i == 3)
      {
        cell(i).html(data[13]);
      }
      if(i == 4)
      {
        cell(i).html(data[14]);
      }
      if(i == 5)
      {
        cell(i).html(data[15]);
      }
      if(i == 6)
      {
        cell(i).html(data[16]);
      }
      if(i == 11)
      {
        cell(i).html(data[1]);
      }
      if(i == 12)
      {
        cell(i).html(data[2]);
      }
      if(i == 13)
      {
        cell(i).html(data[3]);
      }
      if(i == 14)
      {
        cell(i).html(data[4]);
      }
      if(i == 15)
      {
        cell(i).html(data[5]);
      }
      if(i == 16)
      {
        cell(i).html(data[6]);
      }

    }
    cell(i).css('background-color', getColor(data[i], max_values[i]));
  };

  //listener.unsubscribe();
});

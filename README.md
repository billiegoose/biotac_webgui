biotac_webgui
=============

A webpage visualization of the Biotac finger data from ROS using rosbridge.

### Fuerte Instructions: ###
Do the following in order.

1. In one terminal run ```roscore```
2. In another terminal run ```rosrun biotac_sensors biotac_pub```
3. In a third terminal run ```roslaunch rosbridge_launch simple.launch```
4. Open ```index.html``` a browser.

### Resources: ###
Here is a link to the [basic Rosbridge tutorial](http://wiki.ros.org/roslibjs/Tutorials/BasicRosFunctionality#Running_the_Example). Note that for ROS Fuerte the launcher for the rosbridge websocket server is ```roslaunch rosbridge_launch simple.launch``` instead of whatever the tutorial says.

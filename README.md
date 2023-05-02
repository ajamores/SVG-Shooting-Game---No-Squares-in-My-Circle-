# SVG-Shooting-Game---No-Squares-in-My-Circle-

This file is responsible for creating and dynamically producing/removing SVG elements. It also includes the logic for animating various elements, such as the movement of lasers and enemy squares. Although it was a challenging project, I found it enjoyable to see how trigonometry can be applied in programming, and how it can be used in real-world scenarios outside of a classroom. This project allowed me to gain valuable knowledge in math, SVG graphics, animation, and collision detection.

## Key Concepts

    - SVG elements and their attributes: SVG (Scalable Vector Graphics) is an XML-based vector image format used to create graphics for the web. In this project, SVG elements      were used to create the player ball, lasers, and enemy squares. The attributes of these elements were manipulated to set their position, size, color, and other                properties.

    - Animations with requestAnimationFrame(): The requestAnimationFrame() method is used to animate elements by updating their properties every frame. In this project, the         animate() function was called every frame to update the position of lasers and enemy squares, creating the illusion of movement.
    
    - Collision detection: Another key concept utilized in this project is collision detection. In this project, collision detection was implemented by calculating the               distance between the player ball and the enemy squares or lasers. If the distance between them was less than a certain value, it was considered a collision and the             appropriate actions were taken, such as reducing the player's health or removing the enemy square from the screen. This concept is crucial in creating immersive and          challenging games.

    - Trigonometry: Trigonometry is the branch of mathematics that deals with the relationships between the sides and angles of triangles. In this project, trigonometry was        used to calculate the angle and velocity of lasers fired by the player ball towards the mouse click position. 

    - DOM manipulation with JavaScript: The Document Object Model (DOM) is a programming interface for HTML and XML documents. In this project, JavaScript was used to              manipulate the DOM by creating, removing, and updating SVG elements and their attributes.
    
## Known Issues

Please note that the laser movement is not perfect and multiple attempts were done to try and figure out. Also, there are issues with scaling screen and unable to scale contents within the screen due to dimensions of the canvas being set upon document load.

## Screenshots

![image](https://i.imgur.com/BMfcV8o.mp4)

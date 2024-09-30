## Eye Gaze detector

### Problem Statement
In virtual interview settings, maintaining eye contact is crucial for effective communication and engagement. However, many candidates struggle with this aspect, leading to a perception of disengagement or lack of confidence. Current virtual interview platforms lack a reliable way to monitor and provide feedback on eye contact, which can negatively impact the interview process for both candidates and interviewers.

### Proposed Solution
The solution involves leveraging an algorithm in conjunction with Google's Mediapipe. Specifically, the Mediapipe Facemesh model is used to extract facial landmarks, focusing on the iris coordinates to determine gaze direction. Each eye has two key points—one on the left and one on the right—but only one iris is used for gaze estimation. The Euclidean distance between the iris and these key points is calculated, and this distance is then divided by the total distance between the left and right coordinates of the same eye to obtain a ratio. This ratio is subsequently used to determine whether the gaze is directed to the left, right, or center.


### Code Documentation
```__init__()``` : Initializes the GazeDetectionModel class, setting up required libraries and constants.

**Constants:**
- mp_face_mesh: Imports the MediaPipe face mesh module for facial landmark detection.
- LEFT_IRIS, RIGHT_IRIS: Lists of landmark indices for left and right irises.
- L_H_LEFT, L_H_RIGHT: Lists of reference points for left and right eye.
---

```euclidean_distance()```: Calculates the Euclidean distance between two points in 2D space.

**Inputs:**
- ```point1, point2 (numpy.ndarray)```: Two points in the form of arrays.

**Output:**
-	```distance (float)```: Euclidean distance between point1 and point2.

--- 

```iris_position()```: Determines the position of the iris (left, center, right) based on the relative distances.
**Inputs:**
- ```iris_center (numpy.ndarray):``` Center coordinates of the iris.
- ```right_point, left_point (numpy.ndarray)```: Reference points for right and left eye.

**Output:**
- ```iris_position (str)```: Position of the iris ('left', 'center', 'right').
- ```ratio (float)```: Ratio of distance from the center to the right point compared to total distance.
----

```plot_eye Method()```: Draws circles on the eyes and reference points on the frame.
**Inputs:**
- ```frame (numpy.ndarray)```: Image frame to draw on.
- ```center_left, center_right (tuple)```: Center coordinates of the left and right iris.
- ```mesh_points (numpy.ndarray)```: Array of facial landmark points.
-	```l_radius, r_radius (float)```: Radii of the left and right iris circles.
--- 

```start_prediction()```: Starts the prediction process for gaze detection using facial landmark analysis.
**Inputs:**
-	```image_path (str)```: Path to the image file containing a face.
**Output:**
- ```the_value (dict)```: Dictionary containing iris position ('position'), left and right iris coordinates ('left', 'right'), and ratio of distances ('ratio').


### Research Approach:

**First Approach:**

Initially, Mediapipe was employed to extract eye landmarks and iris coordinates. By averaging these coordinates and normalizing them, the positions of the left and right irises were mapped onto the screen. This approach was refined by scaling these normalized coordinates to match the image dimensions, converting them to integer values to determine precise pixel positions. Despite these efforts, the method proved unpredictable, primarily biased towards left and center gaze directions, and struggled in low-light environments.

**Second Approach:**

The second approach focused on preprocessing the eye images to enhance accuracy. Gaussian and median blurring techniques were applied to reduce noise, followed by thresholding to create binary images using OpenCV. Each eye was segmented into three vertical sections, and the number of black pixels in each section determined the direction of gaze. While this method showed promising results, it still fell short of achieving reliable accuracy.

**Third Approach:**
The third approach involved leveraging open-source datasets from Kaggle to train machine learning models on eye position data. Various classifiers such as Logistic Regression, MLPClassifier, K-Nearest Neighbors, Random Forest, and Support Vector Machine (SVM) were employed in a Jupyter notebook environment. Although SVM showed promising results before the notebook was restarted, the approach overall proved to be partially successful but lacked sufficient robustness.

**Fourth Approach:**
In the final approach, the strategy focused on fine-tuning conditions to classify gaze directions as left, right, or center. Through iterative testing, the optimal thresholds were identified at 0.42 and 0.57. This method provided a straightforward yet effective solution, achieving moderate success in accurately classifying gaze directions based on predefined thresholds.


References:
- https://blog.roboflow.com/gaze-direction-position/
- https://github.com/antoinelame/GazeTracking
- https://medium.com/@amit.aflalo2/eye-gaze-estimation-using-a-webcam-in-100-lines-of-code-570d4683fe23


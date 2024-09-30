## Camera Distance
### Problem statement

Ensuring Optimal Person-Camera Distance in Virtual Interviews.

### Proposed solution
- Initialization:Sets up MediaPipe for face detection and defines known parameters for distance and face width.
-	Focal Length Calculation: Computes the camera's focal length based on a reference image.
-	Object Detection: Detects the face in the image and calculates its width.
-	Distance Calculation: Uses the focal length and detected face width to estimate the distance from the camera.
-	Image Processing: Processes an input image to detect the face, compute the focal length, and estimate the distance, annotating the image with the distance value.

## Obstacles
The project functions exceptionally well with the web camera but faces kind of  issues with static images. During the research, the distance obtained from images was erroneously equal to the known constant distance with is contstant , which is not the case with the webcam. Resolving this discrepancy took considerable time. Ultimately, plotting a rectangle around the detected face allowed us to obtain the correct distance from images. This part of the project needs further research.

## Code Documentation

```__init__()``` 

**Inputs**: 
- None.

**Output:**
- None.

**Function Dependencies:** Initializes necessary components and reference values.

**Function Usage:** Sets up the DistanceEstimator class.

---

```focal_length_finder()```

**Inputs:**
- real_width (float)
- width_in_rf_image (float)

**Output:**
- focal_length (float)

**Function Dependencies**: None.

**Function Usage:** Computes the camera's focal length.

---

```obj_data()```

**Inputs:**
- img (numpy.ndarray)

**Output:**
-	obj_width (int)

**Function Dependencies:** Utilizes MediaPipe and OpenCV.
**Function Usage: Detects** faces and measures their width.

---

```distance_finder()```

**Inputs:**
- focal_length (float)
- obj_width_in_frame (int)

**Output:**
- distance (float)

**Function Dependencies**: None.

**Function Usage:** Calculates the distance to the detected face.

---

```process_image()```

**Inputs:** 
  - img_path (str)

**Output:**
  - the_value (dict)

**Function Dependencies:** Uses obj_data and focal_length_finder.

**Function Usage:** Processes the image, detects the face, calculates focal length, estimates distance, and returns the result.

## References
- https://medium.com/@susanne.thierfelder/create-your-own-depth-measuring-tool-with-mediapipe-facemesh-in-javascript-ae90abae2362
- https://www.youtube.com/watch?v=qZcVs_CZbag
- https://github.com/Asadullah-Dal17/Distance_measurement_using_single_camera


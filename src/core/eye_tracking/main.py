import sys
import os
import cv2 
import mediapipe as mp
import  math
import numpy as np
    
from src.utils.exception import QbitException

class GazeDetectionModel:
    def __init__(self):
        try:
            self.mp_face_mesh = mp.solutions.face_mesh.FaceMesh(
                max_num_faces=1, 
                refine_landmarks=True, 
                min_detection_confidence=0.5, 
                min_tracking_confidence=0.5
            )
            self.LEFT_IRIS = [474, 475, 476, 477]
            self.RIGHT_IRIS = [469, 470, 471, 472]

            self.L_H_LEFT = [33]     # Right eye reference point
            self.L_H_RIGHT = [133]   # Left eye reference point

        except Exception as e:
            raise QbitException(e, sys)
    
    def euclidean_distance(self, point1, point2):
        x1, y1 = point1.ravel()
        x2, y2 = point2.ravel()
        distance = math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
        return distance

    # Function to determine iris position based on distances
    def iris_position(self, iris_center, right_point, left_point):
        center_to_right_dist = self.euclidean_distance(iris_center, right_point)
        total_distance = self.euclidean_distance(right_point, left_point)
        ratio = center_to_right_dist / total_distance
        iris_position = ""
        if ratio <= 0.54:
            iris_position = "right"
        elif ratio > 0.54 and ratio <= 0.60:
            iris_position = "center"
        else:
            iris_position = "left"
        return iris_position, ratio

    def start_prediction(self,frame: np.array):
        try:
            img_h, img_w = frame.shape[:2]
            results = self.mp_face_mesh.process(frame)
            
            if results.multi_face_landmarks:
                mesh_points = np.array([np.multiply([p.x, p.y], [img_w, img_h]).astype(int) for p in results.multi_face_landmarks[0].landmark])
                (l_cx, l_cy), _ = cv2.minEnclosingCircle(mesh_points[self.LEFT_IRIS])
                (r_cx, r_cy), _ = cv2.minEnclosingCircle(mesh_points[self.RIGHT_IRIS])

                center_left = np.array([l_cx, l_cy], dtype=np.int32)
                center_right = np.array([r_cx, r_cy], dtype=np.int32)
              
                iris_pos, ratio = self.iris_position(center_right, mesh_points[self.L_H_RIGHT], mesh_points[self.L_H_LEFT][0])
                
                return {"position":iris_pos,"left":center_left,"right":center_right,"ratio":ratio}
            else:
                return {"position":None,"left":None,"right":None,"ratio":None}
            
        except Exception as e:
            raise QbitException(e, sys)
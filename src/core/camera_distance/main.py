import cv2
import mediapipe as mp
import sys
import numpy as np
import logging


from src.utils.exception import QbitException

class DistanceEstimator:
    def __init__(self):
        self.mp_drawing = mp.solutions.drawing_utils
        self.mp_face = mp.solutions.face_detection.FaceDetection(model_selection=1, min_detection_confidence=0.5)
        self.known_distance = 69.0
        self.known_width = 14.0
        self.a = []
        self.width = None
        self.height = None

    def focal_length_finder(self, real_width, width_in_rf_image):
        focal_length = (width_in_rf_image * self.known_distance) / real_width
        return focal_length

    def obj_data(self, img):
        obj_width = 0
        results = self.mp_face.process(img)
        if not results.detections:
            raise Exception("No Face Found")
        else:
            for detection in results.detections:
                bbox = detection.location_data.relative_bounding_box
                x, y, w, h = int(bbox.xmin * self.width), int(bbox.ymin * self.height), int(bbox.width * self.width), int(
                    bbox.height * self.height)
                self.a.append([x, y])
                obj_width = w
            return obj_width


    def distance_finder(self, focal_length, obj_width_in_frame):
        distance = (self.known_width * focal_length) / obj_width_in_frame
        return distance

    def process_image(self, img: np.array):
        try:
            self.width = img.shape[1]
            self.height = img.shape[0]

            ref_image_obj_width = self.obj_data(img)
            focal_length_found = self.focal_length_finder(self.known_width, ref_image_obj_width)
            distance = self.distance_finder(focal_length_found, ref_image_obj_width)

            return {'distance_to_camera':(round(distance, 2)), "face_found": True}
        except Exception as e:
            return {'distance_to_camera':0, "face_found": False}
            



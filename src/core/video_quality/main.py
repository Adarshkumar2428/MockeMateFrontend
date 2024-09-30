import cv2
import os
import pdb
import numpy as np
from src.utils.utils import singleton, time_execution, convert_to_grayscale
import logging


@singleton
class VideoQuality:
    def __init__(self):
        self.logger = logging.getLogger(self.__class__.__name__)

    def _calculate_sharpness(self, image):
        return cv2.Laplacian(image, cv2.CV_64F).var()

    def _calculate_brightness(self, image):
        brightness = np.mean(image)
        brightness_percentage = (brightness / 255) * 100
        return round(brightness_percentage, 2) / 100

    def _classify_metric(self, value, thresholds):
        if value < thresholds[0]:
            return "Poor"
        elif value < thresholds[1]:
            return "Good"
        else:
            return "High"

    def _process_image(self, image):
        sharpness = self._calculate_sharpness(image)
        brightness = self._calculate_brightness(image)
        self.logger.info(f"Sharpness: {sharpness}, Brightness: {brightness}")
        return sharpness, brightness

    def calculate(self, image_arr):
        sharpness_values = []
        brightness_values = []
        gray_images = convert_to_grayscale(image_arr)

        result = list(map(self._process_image, gray_images))

        for sharpness, brightness in result:
            sharpness_values.append(sharpness)
            brightness_values.append(brightness)

        min_val = min(sharpness_values)
        max_val = max(sharpness_values)
        normalized_scores = [
            (val - min_val) / (max_val - min_val) for val in sharpness_values
        ]

        sharpness_avg = np.mean(normalized_scores)
        brightness_avg = np.mean(brightness_values)

        sharpness_classification = self._classify_metric(sharpness_avg, [0.5, 0.8])
        brightness_classification = self._classify_metric(brightness_avg, [0.4, 0.8])

        overall_quality = self._classify_metric(
            (sharpness_avg + brightness_avg) / 2, [0.5, 1]
        )

        stats = {
            "sharpness": sharpness_avg,
            "sharpness_classification": sharpness_classification,
            "brightness": brightness_avg,
            "brightness_classification": brightness_classification,
            "overall_quality": overall_quality,
        }

        return stats


@time_execution
def run():
    # directory = "/Users/juniorquerol/Documents/personal/loyalist/MockMate/720p/frames"
    # directory = "/Users/juniorquerol/Documents/personal/loyalist/MockMate/frames"
    directory = (
        "/Users/juniorquerol/Documents/personal/loyalist/MockMate/.local/happy/frames/"
    )
    # directory = "/Users/juniorquerol/Downloads/TEST_FRAMES/1717033446"
    # directory = (
    #     "/Users/juniorquerol/Documents/personal/loyalist/MockMate/saranya/frames/"
    # )
    image_arr = []
    for image in os.listdir(directory):
        if image.endswith(".jpg") or image.endswith(".jpeg") or image.endswith(".png"):
            image_path = os.path.join(directory, image)
            image = cv2.imread(image_path)
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            image_arr.append(image)

    image_arr = np.array(image_arr)
    vq = VideoQuality()
    print(vq.calculate(image_arr))


if __name__ == "__main__":
    run()

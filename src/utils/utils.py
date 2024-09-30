import time
import os
import subprocess
import os
import numpy as np


def chop_video(video_path, frame_dir_path):
  if not os.path.exists(video_path):
    # create dir
    raise Exception("Video Doesnot Exists")
  

  if not os.path.exists(frame_dir_path):
    # create dir
    os.makedirs(frame_dir_path)
    
  # read video file
  ffmpeg_command = f'ffmpeg -i {video_path} -vf fps=5/1 {frame_dir_path}/frame_%04d.png -q:a 0 -map a {frame_dir_path}/output.wav' # TODO : change fps
  ffmpeg_command_arr = ffmpeg_command.split(" ")

  command_op = subprocess.call(ffmpeg_command_arr, stdout=subprocess.DEVNULL,stderr=subprocess.STDOUT)
  if command_op == 0:
    return frame_dir_path
  else:
    raise Exception("Frame extraction failed")

def singleton(cls):
    instances = {}
    def wrapper(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return wrapper


def time_execution(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        elapsed_time = end_time - start_time
        print(f"Elapsed Time: {elapsed_time:.6f} seconds")
        return result
    return wrapper

def convert_to_grayscale(image_arr: np.array) -> np.array:
  weights = np.array([0.299, 0.587, 0.114])
  return np.dot(image_arr, weights)
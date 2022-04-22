#!/usr/bin/bash
aws s3 cp ./build s3://iot-f-web/ --recursive --exclude "*" --include "*.*"

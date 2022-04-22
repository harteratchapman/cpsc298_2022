iot_f api documentation

# Devices

## GET /iot_f/device/{device_id}
### description
Get the current list of devices.
Without device_id this endpoint will return the complete list of devices
If device_id is specified, a list with a single device will be returned.

### optional path parameters
limit=x where x is the number of records to return<br/>
offset=x where x is the starting record number
#### example
GET /iot_f/device/42<br/>
Return information about device_id 42

GET /iot_f?limit=10&offset=30<br/>
Return information about the ten devices starting at offset 30

### return
{'results':{'device_list':['device_id':device_id,'description':'device description'...]}}

## POST /iotf/device
### description
Add a new device to the current list of devices.  The device will be asssigned a unique device id which is returned in the results.
### input
{'description':'device description'}

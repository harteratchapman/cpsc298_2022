#!/usr/bin/bash
yum update -y
yum install httpd -y
mkdir /wcode
cd /wcode
git clone --branch wood https://github.com/harteratchapman/cpsc298_2022.git
service httpd start
chkconfig httpd on

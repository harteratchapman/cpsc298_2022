#!/usr/bin/bash
yum update -y
yum install httpd -y
yum install git -y
mkdir /wcode
cd /wcode
git clone --branch wood https://github.com/harteratchapman/cpsc298_2022.git
cp cpsc298_2022/wood/html/index.html /var/www/html/index.html
service httpd start
chkconfig httpd on

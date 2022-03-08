#!/usr/bin/bash
sudo yum -y update
sudo yum -y install httpd
sudo yum -y install git 
mkdir /dcode
cd /dcode
git clone --branch dylan https://github.com/harteratchapman/cpsc298_2022.git
git push --set-upstream origin dylan
cp cpsc298_2022/wood/html/index.html /var/www/html/index.html
export da=`date`
sed -i "s/DATE_REPLACE/${da}/g" index.html
service httpd start
chkconfig httpd on

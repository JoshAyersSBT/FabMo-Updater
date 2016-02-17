#!/bin/bash

set -e

echo "Stopping the engine..."
systemctl stop fabmo

echo "Mounting disks..."
mount /dev/mmcblk0p1 /mnt
cd /mnt/fabmo/engine

echo "Fetching new versions..."
git fetch origin

echo "Updating to version $1..."
git checkout $1
git merge

echo "Saving version information..."
set +e
git describe
INVALID_VERSION=$?
set -e
if [ $INVALID_VERSION -eq 0 ]; then
	VERSION=`git describe`
	echo "{\"version\" : \"$VERSION\" }" > /fabmo/engine/version.json
else
	rm /fabmo/engine/version.json || true
fi


echo "Clearing the approot..."
rm -rf /opt/fabmo/approot
cd /
umount /mnt
systemctl start fabmo

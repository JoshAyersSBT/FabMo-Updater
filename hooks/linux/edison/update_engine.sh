#!/bin/bash

set -e

echo "Stopping the engine..."
systemctl stop fabmo

echo "Remounting root partition read-write"
mount -w -o remount /

# DANGER ZONE

echo "Resetting..."
cd /fabmo/engine
git reset --hard HEAD
echo "Fetching tags..."
git fetch origin --tags
echo "Checking out master..."
git checkout master

echo "Fetching master branch..."
git fetch

echo "Fetching release branches..."
git fetch origin release:release
git fetch origin rc:rc

echo "Updating to version $1..."
git checkout $1
sync

echo "Installing dependencies..."
npm install --production
sync

echo "Saving version information..."
set +e
git describe
INVALID_VERSION=$?
set -e
if [ $INVALID_VERSION -eq 0 ]; then
	VERSION=`git describe`
	echo "{\"number\" : \"$VERSION\" }" > /fabmo/engine/version.json
else
	rm /fabmo/engine/version.json || true
fi
sync

sleep 3
echo "Remounting root partition read only"
mount -r -o remount /
#echo u > /proc/sysrq-trigger
#sleep 1
#mount -w -o remount /home

# END DANGER ZONE

echo "Clearing the approot..."
rm -rf /opt/fabmo/approot
sync

echo "Restarting the engine..."
systemctl start fabmo

sleep 10

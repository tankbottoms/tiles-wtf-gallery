#! /bin/sh

date=$(date '+%Y-%m-%d %H:%M:%S')
commit=$(git rev-parse HEAD)
echo $commit $date >./static/commit-hash.txt

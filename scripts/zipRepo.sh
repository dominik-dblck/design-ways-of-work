#!/bin/zsh
# - `yarn backup` · the repository zipped beside itself: tracked and new files, no .env
# - the history at the zip's root as one git bundle: every branch, tag and stash
# - restore: unzip, then `git clone {name}.bundle restored` · the index is not kept
set -euo pipefail

repo=${0:A:h:h}
name=${repo:t}
parent=${repo:h}
stamp=$(date +%Y-%m-%d-%H%M)
sha=$(git -C $repo rev-parse --short HEAD)
dirty=$([[ -n $(git -C $repo status --porcelain) ]] && print -- -dirty || true)
out=$parent/$name-$stamp-$sha$dirty.zip

cd $parent
# what git ignores stays out: node_modules, .next, coverage, reports, .env and .git · dist, build and out too
git -C $repo ls-files -co --exclude-standard -z |
  while IFS= read -r -d '' file; do
    [[ $file == (dist|build|out)/* || $file == */(dist|build|out)/* ]] && continue
    [[ -e $repo/$file ]] && print -r -- $name/$file
  done |
  zip -q -X $out -@

tmp=$(mktemp -d)
# the bundle moves into the zip, so its folder ends empty: rmdir takes a folder that holds nothing, never more
trap 'rmdir $tmp 2>/dev/null || true' EXIT
bundle=$tmp/$name.bundle
git -C $repo bundle create $bundle --all 2>/dev/null
git -C $repo bundle verify $bundle >/dev/null 2>&1
weight=$(du -h $bundle | cut -f1)
zip -q -X -j -m $out $bundle

print "$out · $(du -h $out | cut -f1) · $(unzip -l $out | tail -1 | awk '{print $2}') files · history $weight, $(git -C $repo for-each-ref --format=x refs/heads | wc -l | tr -d ' ') branches"

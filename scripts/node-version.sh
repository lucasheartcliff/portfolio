#!/usr/bin/env sh
# Prints the nodejs version pinned in .tool-versions (single source of truth).
set -eu
awk '$1 == "nodejs" { print $2 }' "$(dirname "$0")/../.tool-versions"

#!/bin/bash
# Temporarily move the (payload) folder out of the way
mv "src/app/(payload)" "src/app/_payload"

# Build and export the static site
npx next build && npx next export

# Move the folder back
mv "src/app/_payload" "src/app/(payload)"